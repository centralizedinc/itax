<template>
  <a-card>
    <tree :data="tree" node-text="tin" style="height: 100vh" @clickedText="showDetails">
      <div slot="node" slot-scope="data">{{data.name}} {{data.tin ? `: ${data.tin}` : ''}}</div>
    </tree>
    <span
      @click="skip"
      style="cursor: pointer; color: #3894D5;text-decoration:underline;margin-right:25px;float:right;"
    >Skip</span>
    <a-modal :visible="showAddTP" @cancel="$emit('hideAddTP')" title="Add Taxpayer">
      <a-card>
        <a-form>
          <a-form-item>
            <!-- <a-select
              showSearch
              placeholder="Search by TIN"
              style="width: 100%"
              @search="handleSearch($event, 'employer')"
              @change="handleChange($event, 'employer')"
              :loading="loading"
            >
              <a-select-option
                v-for="(d, index) in employer_taxpayers"
                :key="index"
                :value="d.tin"
              >{{d.tin}}{{d.branch_code}} {{d.individual_details ? `- ${d.individual_details.firstName} ${d.individual_details.lastName}`: '- New Taxpayer'}}</a-select-option>
            </a-select>-->
          </a-form-item>
        </a-form>
      </a-card>
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
            name: "Spouse"
          },
          {
            name: "Employer"
          }
        ]
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    skip() {
      console.log("test");
      this.$router.push("/app");
      window.location.reload();
    },
    init() {
      this.tree.tin = "111222333444";
      //   this.tree.tin = this.details.taxpayer.tin;
    },
    showDetails(element, data, target) {
      console.log(`element`, JSON.stringify(element.data));
      console.log(`data`, JSON.stringify(data));
      console.log(`target`, JSON.stringify(target));
      //   this.showAddTP = true;
    },
    getConnections(tin) {
      this.$store
        .dispatch("GET_CONNECTIONS_BY_TIN", tin)
        .then(result => {})
        .catch(err => {});
    }
  }
};
</script>

<style>
</style>