<template>
  <a-card>
    <div v-if="reload_tree" class="align-items-middle">
      <a-spin />
    </div>
    <tree
      :data="tree"
      v-else
      node-text="name"
      style="height: 100vh"
      @clickedText="updateDetails"
    >
      <!-- <div slot="node" slot-scope="data">{{data.name}} {{data.tin ? `: ${data.tin}` : ''}}</div> -->
    </tree>
    <span style="font-style: italic; font-size: 12px;">
      <b style="color: red">*</b> Changes will take effect once you click <b>DONE</b>.
    </span>
    <a-button-group style="float: right">
      <span
        style="margin-right: 2vh; color: #4bacfc; text-decoration: underline; cursor: pointer;"
        @click="skip"
      >Skip</span>
      <a-button @click="submit" type="primary">Done</a-button>
    </a-button-group>
    <!-- Connect or Add Taxpayer -->
    <add-taxpayer
      :showAddTP="showAddTP"
      @showAddTP="$emit('showAddTP', $event)"
      @connect="connect"
      @removeConnection="removeConnection"
    />

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
      reload_tree: false,
      new_taxpayers: [],
      new_connections: []
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
        name: `${this.account_user.tin || ""} (ME)`,
        tin: this.account_user.tin,
        children: [...this.new_connections, ...this.new_taxpayers]
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
    connect(data) {
      this.reload_tree = true;
      setTimeout(() => {
        if (data.tin) this.new_taxpayers.push(data);
        else this.new_connections.push(data);
        console.log("this.new_taxpayers :", this.new_taxpayers);
        console.log("this.new_connections :", this.new_connections);
        this.reload_tree = false;
      }, 1000);
    },
    removeConnection(tin) {
      this.reload_tree = true;
      setTimeout(() => {
        this.new_connections = this.new_connections.filter(v => v.to !== tin);
        this.new_taxpayers = this.new_taxpayers.filter(v => v.tin !== tin);
        console.log("this.new_taxpayers :", this.new_taxpayers);
        console.log("this.new_connections :", this.new_connections);
        this.reload_tree = false;
      }, 1000);
    },
    submit() {},
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