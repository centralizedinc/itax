<template>
  <a-layout style="background: linear-gradient(to top, #8e9eab, #eef2f3);">
    <!-- Scroll in top -->
    <a-back-top>
      <a-avatar>
        <a-icon type="up" :size="42"></a-icon>
      </a-avatar>
    </a-back-top>

    <!-- Main Menu -->
    <a-affix :offsetTop="0">
      <a-layout-header
        style="background: linear-gradient(to left, #000046, #1cb5e0);padding: 0 20px;"
      >
        <a-row type="flex" align="top" justify="start" data-aos="fade-up">
          <!-- Main menu for mobile layout -->
          <a-col :xs="{ span: 4 }" :sm="{ span: 0 }">
            <a-button type="ghost" @click="collapsed=!collapsed">
              <a-icon :type="collapsed ? 'menu-fold' : 'menu-unfold'" />
            </a-button>
            <a-drawer title="Menu" placement="left" :visible="collapsed" @close="collapsed=false">
              <a-menu v-model="current_nav" mode="inline">
                <a-menu-item :key="0">
                  <a-icon type="area-chart" />Summary
                </a-menu-item>
                <a-menu-item :key="1">
                  <a-icon type="team" />Taxpayers
                </a-menu-item>
                <a-menu-item :key="2">
                  <a-icon type="environment" />RDO Map
                </a-menu-item>
              </a-menu>
            </a-drawer>
            <!-- <a-popover title="Menu" placement="bottomLeft">
              <a-button type="ghost" @click="collapsed=!collapsed">
                <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
              </a-button>
              <template slot="content">
                <a-menu v-model="current_nav" mode="inline">
                  <a-menu-item :key="0">
                    <a-icon type="area-chart" />Summary
                  </a-menu-item>
                  <a-menu-item :key="1">
                    <a-icon type="team" />Taxpayers
                  </a-menu-item>
                  <a-menu-item :key="2">
                    <a-icon type="environment" />RDO Map
                  </a-menu-item>
                </a-menu>
              </template>
            </a-popover> -->
          </a-col>

          <!-- Title -->
          <a-col :xs="{ span: 12 }" :sm="{ span: 19 }">
            <h2 style="color:white;">Smart Tax Admin</h2>
          </a-col>

          <!-- Account Settings -->
          <a-col
            :xs="{ span: 0 }"
            :sm="{ span: 3 }"
            style="text-align: right;"
          >
            <a-popover :title="admin_user" trigger="click" placement="bottomRight">
              <span
                style="color: white; font-size: 14px; font-weight: bold; margin-right: 1.5vh;"
              >{{admin_user}}</span>
              <a-avatar
                :size="35"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBv-cKu1_1zauuxCU7oaieOQw7LSLgfi3OgjwGXA-gQrIjmRzUtw&s"
                style="cursor:pointer; color: white;"
              />
              <template slot="content">
                <a-menu>
                  <a-menu-item>
                    <a-icon type="idcard" />Account
                  </a-menu-item>
                  <a-menu-item>
                    <a-icon type="lock" />Security
                  </a-menu-item>
                  <a-menu-item @click="logout">
                    <a-icon type="logout" />Logout
                  </a-menu-item>
                </a-menu>
              </template>
            </a-popover>
          </a-col>

          <!-- Account Settings for mobile layout -->
          <a-col :xs="{ span: 8 }" :sm="{ span: 0 }" style="text-align: right;">
            <a-popover :title="admin_user" trigger="click" placement="bottomRight">
              <a-avatar
                :size="35"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBv-cKu1_1zauuxCU7oaieOQw7LSLgfi3OgjwGXA-gQrIjmRzUtw&s"
                style="cursor:pointer; color: white;"
              />
              <template slot="content">
                <a-menu>
                  <a-menu-item>
                    <a-icon type="idcard" />Account
                  </a-menu-item>
                  <a-menu-item>
                    <a-icon type="lock" />Security
                  </a-menu-item>
                  <a-menu-item @click="logout">
                    <a-icon type="logout" />Logout
                  </a-menu-item>
                </a-menu>
              </template>
            </a-popover>
          </a-col>
          <a-col :xs="{ span: 0 }" :sm="{ span: 2 }" style="text-align: center;">
            <a-button type="default" @click="logout">Logout</a-button>
          </a-col>
        </a-row>
      </a-layout-header>
    </a-affix>

    <a-layout-content>
      <!-- Main Menu -->
      <a-affix :offsetTop="64">
        <a-row>
          <a-col :xs="{ span: 0 }" :sm="{ span: 24 }">
            <a-menu v-model="current_nav" mode="horizontal">
              <a-menu-item :key="0">
                <a-icon type="area-chart" />Summary
              </a-menu-item>
              <a-menu-item :key="1">
                <a-icon type="team" />Taxpayers
              </a-menu-item>
              <a-menu-item :key="2">
                <a-icon type="environment" />RDO Map
              </a-menu-item>
            </a-menu>
          </a-col>
        </a-row>
      </a-affix>

      <!-- Content -->
      <a-row type="flex" justify="space-around" style="margin: 15px 0;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 17 }">
          <component :is="component_list[current_nav[0]]" />
        </a-col>
        <a-col :xs="{ span: 0 }" :sm="{ span: 6 }">
          <!-- <a-affix :offsetTop="127"> -->
          <summary-layout />
          <!-- </a-affix> -->
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script>
import SummaryLayout from "./dashboard/SummaryLayout";
import Dashboard from "./dashboard/Dashboard";
import TaxpayersTable from "./dashboard/TaxpayersTable";
import RDOMap from "./dashboard/RDOMap";

export default {
  components: {
    SummaryLayout,
    Dashboard,
    TaxpayersTable,
    RDOMap
  },
  data() {
    return {
      collapsed: false,
      current_nav: [0],
      component_list: ["Dashboard", "TaxpayersTable", "RDOMap"],
      topLocation: 0
    };
  },
  created() {
    this.createMockRDO();
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    admin_user() {
      return this.$store.state.account_session.admin_user;
    }
  },
  methods: {
    handleScroll(event) {
      this.topLocation = window.top.scrollY;
    },
    logout() {
      clearInterval(this.rdo_interval);
      this.$store.dispatch("LOGOUT");
      this.$router.push("/admin");
    },
    createMockRDO() {
      // Create mock data
      clearInterval(this.rdo_interval);
      var rdos = this.deepCopy(this.$store.state.tax_form.rdos);
      function getRandomArbitrary(max, min) {
        return Math.floor(Math.random() * (max - min) + min);
      }
      rdos.forEach(rdo => {
        rdo.collections = Math.floor(Math.random() * 5000000 + 1000000);
        rdo.is_increased = true;
      });
      // console.table(rdos);
      this.$store.commit("SET_RDOS", rdos);
      // Mock interval
      this.rdo_interval = setInterval(() => {
        console.log("add rdo collection...");
        var mock_rdos = this.deepCopy(this.$store.state.tax_form.rdos);
        if (this.$store.state.tax_form.login_rdo) {
          const index = mock_rdos.findIndex(
            v => v.code === this.$store.state.tax_form.login_rdo
          );
          var random = Math.floor(Math.random() * 5000);
          mock_rdos[index].collections += random;
        } else {
          mock_rdos.forEach(rdo => {
            var random = Math.floor(Math.random() * 5000);
            rdo.collections += random;
          });
        }
        mock_rdos.sort((a, b) => b.collections - a.collections);
        this.$store.commit("SET_RDOS", mock_rdos);
      }, 1000);
    }
  }
};
</script>

<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
