<template>
  <a-card>
    <tree
      :data="tree"
      v-if="!reload_tree"
      node-text="name"
      style="height: 100vh"
      @clickedText="updateDetails"
    >
      <!-- <div slot="node" slot-scope="data">{{data.name}} {{data.tin ? `: ${data.tin}` : ''}}</div> -->
    </tree>
    <a-button-group style="float: right">
      <span style="margin-right: 2vh; color: #4bacfc; text-decoration: underline; cursor: pointer;" @click="skip">Skip</span>
      <!-- <a-button @click="submit" type="primary">Done</a-button> -->
    </a-button-group>
    <!-- Connect or Add Taxpayer -->
    <add-taxpayer :showAddTP="showAddTP" @showAddTP="$emit('showAddTP', $event)" @reloadTree="reload_tree=$event" />

    <!-- Update Taxpayer -->
  </a-card>
</template>

<script>
import { tree } from "vued3tree";
import AddTaxpayer from "./Connections/AddConnection";

export default {
  components: {
    tree,
    AddTaxpayer
  },
  props: {
    showAddTP: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      reload_tree: false
    };
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
    }
  },
  methods: {
    skip() {
      this.$router.push("/app");
      window.location.reload();
    },
    init() {
      this.reload_tree = true;
      this.$store
        .dispatch("GET_CONNECTIONS", { tin: this.account_user.tin })
        .then(result => {
          this.reload_tree = false;
        })
        .catch(err => {
          this.reload_tree = false;
          console.log("GET_CONNECTIONS err :", err);
        });
    },
    submit(){

    },
    updateDetails(element) {
      console.log(`element`, JSON.stringify(element.data));
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