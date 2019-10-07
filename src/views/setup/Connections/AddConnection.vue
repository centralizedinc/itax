<template>
  <a-modal
    :visible="showAddTP"
    @cancel="$emit('showAddTP', false)"
    title="Add Taxpayer"
    :footer="null"
  >
    <a-form>
      <a-form-item
        label="Search By TIN"
        :validate-status="error_message ? 'error' : ''"
        :help="error_message"
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
    <template v-else-if="is_busy && !error_message">
      <a-card
        :bodyStyle="{ padding: '2vh' }"
        v-if="taxpayer && Object.keys(taxpayer).length"
      >
        <a-avatar
          :src="user && user.avatar ? user.avatar.location : default_user_icon"
        />
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
            :validate-status="validation.taxpayer_type ? 'error' : ''"
            :help="validation.taxpayer_type"
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
            :validate-status="validation.email ? 'error' : ''"
            :help="validation.email"
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
            :validate-status="validation.first_name ? 'error' : ''"
            :help="validation.first_name"
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
            :validate-status="validation.last_name ? 'error' : ''"
            :help="validation.last_name"
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
    </template>
  </a-modal>
</template>

<script>
export default {
  props: ["showAddTP", "tree"],
  data() {
    return {
      search_tin: "",
      relationship: "",
      taxpayer: null,
      user: null,
      selected: {},
      is_busy: false,
      loading: false,
      loading_submit: false,
      default_relationship: null,
      new_taxpayer: {},
      relationships: ["Employer", "Employee", "Officemate", "Siblings"],
      error_message: "",
      formItemLayout: {
        labelCol: {
          span: 5
        },
        wrapperCol: {
          span: 19
        }
      },
      validation: {
        taxpayer_type: "",
        email: "",
        first_name: "",
        last_name: ""
      },
      default_user_icon: "https://img.pngio.com/circled-user-icon-user-profile-icon-png-png-image-transparent-profile-icon-png-820_860.png"
    };
  },
  watch: {
    showAddTP(val) {
      if (val) this.search_tin = "";
    },
    search_tin(val) {
      this.is_busy = false;
      this.taxpayer = null;
      this.user = null;
      this.error_message = "";
    }
  },
  computed: {
    account_user() {
      return this.deepCopy(this.$store.state.account_session.user);
    },
    connections() {
      return this.deepCopy(this.$store.state.relationship.connections);
    },
    check_connectivity() {
      const index = this.connections.findIndex(v => v.tin === this.search_tin);
      return index > -1;
    }
  },
  methods: {
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
      this.error_message = "";
      if (this.search_tin && this.search_tin.length > 12) {
        // check tin

        const index = this.tree.children.findIndex(
          v => v.to === this.search_tin
        );
        if (this.search_tin === this.tree.tin) {
          this.error_message = "Oops! This is your TIN.";
        } else if (index > -1) {
          this.error_message = "This TIN is already in your list.";
          return;
        } else {
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
      } else this.error_message = "Invalid TIN";
    },
    connect() {
      this.loading = true;
      if (this.check_connectivity) {
        this.$emit("removeConnection", this.search_tin);
      } else {
        if (this.validate(false)) {
          const connection = {
            relationship: this.relationship,
            from: this.account_user.tin,
            to: this.search_tin,
            name: `${this.search_tin} (${this.relationship})`,
            new: false
          };
          this.$emit("connect", connection);
        }
      }
      this.loading = false;
    },
    validate(validate_all) {
      this.validation = {};
      if (validate_all) {
        if (!this.new_taxpayer.taxpayer_type) {
          this.validation.taxpayer_type = "Taxpayer type is required.";
          return false;
        }
        if (!this.new_taxpayer.email) {
          this.validation.email = "Email is required.";
          return false;
        }
        if (!this.new_taxpayer.first_name) {
          this.validation.first_name = "First Name is required.";
          return false;
        }
        if (!this.new_taxpayer.last_name) {
          this.validation.last_name = "Last Name is required.";
          return false;
        }
      }
      console.log("this.relationship :", this.relationship);
      if (!this.relationship) {
        this.error_message = "Relationship is required.";
        return false;
      }
      return true;
    },
    addTaxpayer() {
      this.loading_submit = true;
      if (this.validate(true)) {
        this.new_taxpayer.tin = this.search_tin;
        this.new_taxpayer.relationship = this.relationship;
        this.new_taxpayer.from = this.account_user.tin;
        this.new_taxpayer.to = this.search_tin;
        this.new_taxpayer.sender = `${this.account_user.name.first} ${this.account_user.name.last}`;
        this.new_taxpayer.name = `${this.search_tin} (${this.relationship})`;
        this.new_taxpayer.new = true;
        this.$emit("connect", this.new_taxpayer);
        this.$emit("showAddTP", false);
      }
      this.loading_submit = false;
    }
    // connect() {
    //   this.$emit('reloadTree', true);
    //   this.loading = true;
    //   const action = this.check_connectivity ? "REMOVE_CONNECTION" : "CONNECT";
    //   this.$store
    //     .dispatch(action, {
    //       relationship: this.relationship,
    //       from: this.account_user.tin,
    //       to: this.search_tin
    //     })
    //     .then(result => {
    //       this.$emit('reloadTree', false);
    //       this.loading = false;
    //     })
    //     .catch(err => {
    //       this.$emit('reloadTree', false);
    //       this.loading = false;
    //       console.log("CONNECT err :", err);
    //     });
    // },
    // addTaxpayer() {
    //   this.loading_submit = true;
    //   this.$emit('reloadTree', true);
    //   this.new_taxpayer.tin = this.search_tin;
    //   this.new_taxpayer.relationship = this.relationship;
    //   this.new_taxpayer.from = this.account_user.tin;
    //   this.new_taxpayer.sender = `${this.account_user.name.first} ${this.account_user.name.last}`;
    //   console.log("this.new_taxpayer :", this.new_taxpayer);
    //   this.$store
    //     .dispatch("ADD_AND_CONNECT_TAXPAYER", this.new_taxpayer)
    //     .then(result => {
    //       this.loading_submit = false;
    //       this.$emit('reloadTree', false);
    //       this.$emit("showAddTP", false);
    //     })
    //     .catch(err => {
    //       this.loading_submit = false;
    //       this.$emit('reloadTree', false);
    //       console.log("CONNECT err :", err);
    //     });
    // }
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