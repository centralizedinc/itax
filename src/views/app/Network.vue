<template>
  <div>
    <a-card title="My Network">
      <tree :data="tree" v-if="reload_tree" style="height:100vh" @clickedText="showDetails"></tree>
    </a-card>
  </div>
</template>

<script>
import { tree } from "vued3tree";

export default {
  components: {
    tree
  },
  data() {
    return {
      visible: false,
      reload_tree: false
    };
  },
  computed: {
    user() {
      return this.deepCopy(this.$store.state.account_session.user);
    },
    connections() {
      return this.deepCopy(this.$store.state.relationship.connections);
    },
    tree: {
        name: `${this.user.tin} (ME)`,
        tin: this.user.tin,
        children: this.connections
      }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log("test");
      this.reload_tree = true;
      this.$store
        .dispatch("GET_CONNECTIONS", {
          tin: this.user.tin,
          refresh: true
        })
        .then(result => {
          this.reload_tree = false;
        })
        .catch(err => {
          this.reload_tree = false;
          console.log("GET_CONNECTIONS err :", err);
        });
    },
    showDetails(element, data) {
      console.log("data :", JSON.stringify(data));
      console.log(`element`, element);
      console.log(`visible`, this.visible);
      this.visible = true;
    }
  }
};
</script>

<style>
</style>