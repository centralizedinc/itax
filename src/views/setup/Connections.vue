<template>
  <a-card>
    <tree
      :data="tree"
      v-if="!loading_tree"
      node-text="name"
      style="height: 100vh"
      @clickedText="updateDetails"
    >
      <!-- <div slot="node" slot-scope="data">{{data.name}} {{data.tin ? `: ${data.tin}` : ''}}</div> -->
    </tree>
    <a-button @click="skip" type="primary" style="float:right;">DONE</a-button>
    <!-- Connect or Add Taxpayer -->
    <a-modal
      :visible="showAddTP"
      @cancel="$emit('showAddTP', false)"
      title="Add Taxpayer"
      :footer="null"
    >
      <a-form>
        <a-form-item
          label="Search By TIN"
          :validate-status="relationship_status"
          :help="relationship_status === 'error' ? 'Relationship is required.' : ''"
        >
          <a-select
            style="width: 25%"
            @change="relationship = $event"
            v-bind="default_relationship ? { defaultValue: default_relationship } : {}"
            placeholder="Relationship"
            :disabled="loading_submit"
          >
            <a-select-option
              v-for="(item, index) in relationships"
              :key="index"
              :value="item"
            >{{item}}</a-select-option>
          </a-select>
          <a-input-search
            style="width: 75%"
            v-model="search_tin"
            placeholder="Search TIN"
            @search="getDataByTIN"
            enterButton
            :loading="loading"
            :disabled="loading_submit"
          />
        </a-form-item>
      </a-form>
      <div v-if="loading" class="align-items-middle">
        <a-spin />
      </div>
      <template v-else-if="is_busy">
        <a-card
          :bodyStyle="{ padding: '2vh' }"
          v-if="taxpayer && Object.keys(taxpayer).length && user && Object.keys(user).length"
        >
          <a-avatar
            :src="user && user.avatar ? user.avatar.location : null"
          >{{user && user.name && user.name.first ? user.name.first[0] : '?' }}</a-avatar>
          <span
            style="margin-left: 1vh;font-weight:bold;"
          >{{taxpayer.individual_details.firstName}} {{taxpayer.individual_details.lastName}}</span>
          <a-button
            style="float: right;"
            :type="check_connectivity ? 'danger' : 'primary'"
            @click="connect"
          >{{ check_connectivity ? 'Remove Connection' : 'Connect'}}</a-button>
        </a-card>
        <div v-else-if="search_tin && search_tin.length > 12">
          <p
            style="font-style: italic;font-size: 12px;"
          >Taxpayer does not exist. Please input the details of the TIN owner.</p>
          <a-form>
            <a-form-item
              label="Taxpayer Type"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-radio-group
                buttonStyle="solid"
                v-model="new_taxpayer.taxpayer_type"
                :disabled="loading_submit"
              >
                <a-radio-button value="I">Individual</a-radio-button>
                <a-radio-button value="C">Corporate</a-radio-button>
              </a-radio-group>
            </a-form-item>
            <a-form-item
              label="Email"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                v-model="new_taxpayer.email"
                placeholder="Email"
                :disabled="loading_submit"
                @keypress.enter="addTaxpayer"
              />
            </a-form-item>
            <a-form-item
              label="First Name"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                v-model="new_taxpayer.first_name"
                placeholder="First Name"
                :disabled="loading_submit"
                @keypress.enter="addTaxpayer"
              />
            </a-form-item>
            <a-form-item
              label="Last Name"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                v-model="new_taxpayer.last_name"
                placeholder="Last Name"
                :disabled="loading_submit"
                @keypress.enter="addTaxpayer"
              />
            </a-form-item>
            <a-button block type="primary" @click="addTaxpayer" :loading="loading_submit">Submit</a-button>
          </a-form>
        </div>
        <span v-else style="font-style: italic;">Invalid input TIN</span>
      </template>
    </a-modal>

    <!-- Update Taxpayer -->
  </a-card>
</template>

<script>
import { tree } from "vued3tree";

export default {
  components: {
    tree
  },
  props: {
    showAddTP: {
      type: Boolean,
      default: false
    },
    details: {
      type: Object,
      default: () => {
        return {
          taxpayer: { individual_details: {}, contact_details: {} }
        };
      }
    }
  },
  data() {
    return {
      search_tin: "",
      relationship: "",
      loading_tree: false,
      taxpayer: null,
      user: null,
      selected: {},
      is_busy: false,
      loading: false,
      loading_submit: false,
      default_relationship: null,
      new_taxpayer: {},
      relationships: [
        "Employer",
        "Employee",
        "Spouse",
        "Officemate",
        "Siblings"
      ],
      relationship_status: "",
      formItemLayout: {
        labelCol: {
          span: 5
        },
        wrapperCol: {
          span: 19
        }
      }
    };
  },
  watch: {
    search_tin() {
      this.is_busy = false;
      this.taxpayer = null;
      this.user = null;
    }
  },
  created() {
    this.init();
  },
  computed: {
    account_user() {
      return this.deepCopy(this.$store.state.account_session.user);
    },
    connections() {
      return this.deepCopy(this.$store.state.relationship.connections);
    },
    tree() {
      return {
        name: `${this.account_user.tin} (ME)`,
        tin: this.account_user.tin,
        children: this.connections.length
          ? this.connections
          : [
              {
                relationship: "Spouse",
                tin: "Spouse"
              },
              {
                relationship: "Employer",
                tin: "Employer"
              }
            ]
      };
    },
    check_connectivity() {
      const index = this.connections.findIndex(v => v.tin === this.search_tin);
      return index > -1;
    }
  },
  methods: {
    skip() {
      this.$router.push("/app");
      window.location.reload();
    },
    init() {
      this.loading_tree = true;
      this.$store
        .dispatch("GET_CONNECTIONS", { tin: this.account_user.tin })
        .then(result => {
          this.loading_tree = false;
        })
        .catch(err => {
          this.loading_tree = false;
          console.log("GET_CONNECTIONS err :", err);
        });
    },
    updateDetails(element) {
      console.log(`element`, JSON.stringify(element.data));
      this.selected = element.data;
    },
    getConnections(tin) {
      this.$store
        .dispatch("GET_CONNECTIONS_BY_TIN", tin)
        .then(result => {})
        .catch(err => {});
    },
    getDataByTIN() {
      this.is_busy = true;
      this.taxpayer = null;
      this.user = null;
      if (this.search_tin && this.search_tin.length > 12) {
        this.loading = true;
        this.$store
          .dispatch("GET_TAXPAYER_BY_TIN", this.search_tin)
          .then(data => {
            console.log("data :", data);
            this.loading = false;
            this.taxpayer = data.taxpayer;
            this.user = data.user;
          })
          .catch(err => {
            this.loading = false;
            console.log("err :", err);
          });
      }
    },
    connect() {
      this.loading_tree = true;
      this.loading = true;
      const action = this.check_connectivity ? "REMOVE_CONNECTION" : "CONNECT";
      this.$store
        .dispatch(action, {
          relationship: this.relationship,
          from: this.account_user.tin,
          to: this.search_tin
        })
        .then(result => {
          this.loading_tree = false;
          this.loading = false;
        })
        .catch(err => {
          this.loading_tree = false;
          this.loading = false;
          console.log("CONNECT err :", err);
        });
    },
    addTaxpayer() {
      this.loading_submit = true;
      this.loading_tree = true;
      this.new_taxpayer.tin = this.search_tin;
      this.new_taxpayer.relationship = this.relationship;
      this.new_taxpayer.from = this.account_user.tin;
      this.new_taxpayer.sender = `${this.account_user.name.first} ${this.account_user.name.last}`;
      console.log("this.new_taxpayer :", this.new_taxpayer);
      this.$store
        .dispatch("ADD_AND_CONNECT_TAXPAYER", this.new_taxpayer)
        .then(result => {
          this.loading_submit = false;
          this.loading_tree = false;
          this.$emit("showAddTP", false);
        })
        .catch(err => {
          this.loading_submit = false;
          this.loading_tree = false;
          console.log("CONNECT err :", err);
        });
    }
  }
};
</script>

<style>
.align-items-middle {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>