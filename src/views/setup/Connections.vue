<template>
  <a-card>
    <tree :data="tree" node-text="tin" style="height: 100vh" @clickedText="updateDetails">
      <!-- <div slot="node" slot-scope="data">{{data.name}} {{data.tin ? `: ${data.tin}` : ''}}</div> -->
    </tree>
    <span
      @click="skip"
      style="cursor: pointer; color: #3894D5;text-decoration:underline;margin-right:25px;float:right;"
    >Skip</span>
    <a-modal :visible="showAddTP" @cancel="$emit('showAddTP', false)" title="Add Taxpayer">
      <a-form>
        <a-form-item>
          <a-input-search
            placeholder="input search text"
            @search="handleSearch($event)"
            enterButton
            :loading="loading"
          />
          <span v-if="taxpayer.individual_details"></span>
          <a-card v-if="taxpayer.individual_details">
            <a-avatar :src="user.avatar.location">{{user.name.first[0]}}</a-avatar>
            {{taxpayer.individual_details.firstName}} {{taxpayer.individual_details.lastName}}
          </a-card>
          <span v-else-if="taxpayer.tin" style="font-style: italic;">Taxpayer not exist</span>
          <!-- <a-select
            showSearch
            placeholder="Search by TIN"
            style="width: 100%"
            @search="handleSearch($event)"
            @change="handleChange($event)"
            :loading="loading"
          >
            <a-select-option
              v-for="(d, index) in taxpayers"
              :key="index"
              :value="d.tin"
            >{{d.tin}}{{d.branch_code}} {{d.individual_details ? `- ${d.individual_details.firstName} ${d.individual_details.lastName}`: '- New Taxpayer'}}</a-select-option>
          </a-select>-->
        </a-form-item>
        <a-divider>OR</a-divider>
        <a-form-item></a-form-item>
      </a-form>
    </a-modal>
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
      tree: {
        name: "You",
        children: [
          {
            tin: "Spouse"
          },
          {
            tin: "Employer"
          }
        ]
      },
      taxpayer: {},
      user: {},
      selected: {},
      loading: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    skip() {
      this.$router.push("/app");
      window.location.reload();
    },
    init() {
      this.tree.tin = "111222333444";
      //   this.tree.tin = this.details.taxpayer.tin;
    },
    updateDetails(element) {
      console.log(`element`, JSON.stringify(element.data));
      this.$emit("showAddTP", true);
      this.selected = element.data;
    },
    getConnections(tin) {
      this.$store
        .dispatch("GET_CONNECTIONS_BY_TIN", tin)
        .then(result => {})
        .catch(err => {});
    },
    handleSearch(value) {
      if (value.length >= 12) {
        this.taxpayer.tin = value;
        this.getDataByTIN(value);
      }
    },
    handleChange(value) {
      this.taxpayer.tin = value;
      this.getDataByTIN(value);
    },
    getDataByTIN(tin) {
      this.loading = true;
      this.$store
        .dispatch("GET_TAXPAYER_BY_TIN", tin)
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
  }
};
</script>

<style>
</style>