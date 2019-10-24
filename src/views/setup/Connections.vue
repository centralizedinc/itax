<template>
  <a-card>
    <div v-if="reload_tree" class="align-items-middle">
      <a-spin />
    </div>
    <tree :data="tree" v-else node-text="name" style="height: 100vh" @clickedText="updateDetails">
      <!-- <div slot="node" slot-scope="data">{{data.name}} {{data.tin ? `: ${data.tin}` : ''}}</div> -->
    </tree>
    <span style="font-style: italic; font-size: 12px;">
      <b style="color: red">*</b> Changes will take effect once you click
      <b>DONE</b>.
    </span>
    <a-button-group style="float: right">
      <a-popconfirm title="Do you really want to skip?" @confirm="skip">
        <span :disabled="reload_tree"
          style="margin-right: 2vh; color: #4bacfc; text-decoration: underline; cursor: pointer;"
        >Skip</span>
      </a-popconfirm>
      <a-popconfirm title="Do you really want to submit?" @confirm="submit">
        <a-button type="primary" :disabled="reload_tree">Done</a-button>
      </a-popconfirm>
    </a-button-group>
    <!-- Connect or Add Taxpayer -->
    <add-taxpayer
      :tree="tree"
      :showAddTP="showAddTP"
      @showAddTP="$emit('showAddTP', $event)"
      @connect="connect"
      @removeConnection="removeConnection"
    />

    <!-- Update Taxpayer -->
    <update-connection
      :show="showUpdate"
      :taxpayer="update_details"
      @hide="showUpdate=false"
      @update="update"
      @removeConnection="removeConnection"
    />
  </a-card>
</template>

<script>
import { tree } from "vued3tree";
import AddTaxpayer from "./Connections/AddConnection";
import UpdateConnection from "./Connections/UpdateConnection";

export default {
  components: {
    tree,
    AddTaxpayer,
    UpdateConnection
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
      new_connections: [],
      showUpdate: false,
      update_details: {}
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
        children: [...this.new_connections, ...this.new_taxpayers, ...this.connections]
      };
    }
  },
  methods: {
    skip() {
      this.$store.commit("UPDATE_SESSION_MODE");
      this.$router.push("/app");
      window.location.reload();
    },
    init() {
      this.reload_tree = true;
      this.$store
        .dispatch("GET_CONNECTIONS", { tin: this.account_user.tin, refresh: true })
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
        this.showUpdate = false;
      }, 1000);
    },
    submit() {
      this.reload_tree = true;
      var actions = [];
      if (this.new_connections && this.new_connections.length) {
        actions.push(this.$store.dispatch("CONNECT_ALL", this.new_connections));
      }
      if (this.new_taxpayers && this.new_taxpayers.length) {
        var parsed_data = { taxpayers: [], invitations: [], connections: [] };
        this.new_taxpayers.forEach(data => {
          parsed_data.taxpayers.push({
            tin: data.tin,
            taxpayer_type: data.taxpayer_type,
            individual_details: {
              firstName: data.first_name,
              lastName: data.last_name
            },
            contact_details: {
              email: data.email
            }
          });
          parsed_data.invitations.push({
            email: data.email,
            name: {
              first: data.first_name,
              last: data.last_name
            },
            tin: data.tin,
            sender: data.sender
          });
          parsed_data.connections.push({
            relationship: data.relationship,
            to: data.tin,
            from: data.from
          });
        });
        actions.push(this.$store.dispatch("CONNECT_ALL_NEW", parsed_data));
      }

      Promise.all(actions)
        .then(result => {
          console.log("submit result :", result);
          this.reload_tree = false;
          this.skip();
        })
        .catch(err => {
          console.log("err :", err);
          this.reload_tree = false;
        });
    },
    updateDetails(element) {
      console.log(`element`, JSON.stringify(element.data));
      if (element.data.tin === this.account_user.tin) {
      } else {
        console.log("test");
        this.update_details = {};
        this.update_details = element.data;
        this.showUpdate = true;
      }
    },
    update(data) {
      this.reload_tree = true;
      setTimeout(() => {
        if (data.new) {
          const index = this.new_taxpayers.findIndex(v => v.tin === data.tin);
          this.new_taxpayers[index] = data;
        } else {
          const index = this.new_connections.findIndex(v => v.tin === data.tin);
          this.new_connections[index] = data;
        }
        this.reload_tree = false;
      }, 1000);
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