<template>
  <a-layout>
    <a-back-top>
      <a-avatar>
        <a-icon type="up" :size="42"></a-icon>
      </a-avatar>
    </a-back-top>
    <a-affix :offsetTop="0">
      <a-layout-header style="background: linear-gradient(to left, #000046, #1cb5e0);">
        <a-row type="flex" justify="start" data-aos="fade-up">
          <a-col :span="23">
            <h2 style="color:white;">Smart Tax Admin</h2>
          </a-col>
          <a-col :span="1">
            <a-popover title="User" trigger="click" placement="bottomRight">
              <a-avatar
                :size="35"
                src="https://icon-library.net/images/my-profile-icon-png/my-profile-icon-png-3.jpg"
                style="cursor:pointer"
              />
              <template slot="content">
                <a-menu>
                  <a-menu-item>
                    <a-icon type="idcard" />Account
                  </a-menu-item>
                  <a-menu-item>
                    <a-icon type="lock" />Security
                  </a-menu-item>
                  <a-menu-item>
                    <a-icon type="logout" />Logout
                  </a-menu-item>
                </a-menu>
              </template>
            </a-popover>
          </a-col>
        </a-row>
        <a-divider style="margin-top: -2vh" v-if="topLocation<=50"></a-divider>
      </a-layout-header>
    </a-affix>
    <a-layout-content>
      <a-affix :offsetTop="64">
        <a-row>
          <a-col :xs="{ span: 24 }" :sm="{ span: 0 }">
            <a-button type="primary" @click="collapsed=!collapsed" style="margin-bottom: 2px">
              <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
            </a-button>
            <a-menu v-model="current_nav" mode="inline" :inlineCollapsed="collapsed">
              <a-menu-item :key="0">
                <a-icon type="area-chart" />
                <span>Summary</span>
              </a-menu-item>
              <a-menu-item :key="1">
                <a-icon type="team" />
                <span>Taxpayers</span>
              </a-menu-item>
              <a-menu-item :key="2">
                <a-icon type="environment" />
                <span>RDO</span>
              </a-menu-item>
            </a-menu>
          </a-col>
          <a-col :xs="{ span: 0 }" :sm="{ span: 24 }">
            <a-menu v-model="current_nav" mode="horizontal">
              <a-menu-item :key="0">
                <a-icon type="area-chart" />Summary
              </a-menu-item>
              <a-menu-item :key="1">
                <a-icon type="team" />Taxpayers
              </a-menu-item>
              <a-menu-item :key="2">
                <a-icon type="environment" />RDO
              </a-menu-item>
            </a-menu>
          </a-col>
        </a-row>
      </a-affix>
      <a-row :gutter="20" style="margin: 15px;">
        <a-col :xs="{ span: 24 }" :sm="{ span: 18 }">
          <component :is="component_list[current_nav[0]]" />
        </a-col>
        <a-col :xs="{ span: 0 }" :sm="{ span: 6 }">
          <summary-layout />
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
      collapsed: true,
      current_nav: [0],
      component_list: ["Dashboard", "TaxpayersTable", "RDOMap"],
      topLocation: 0
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll(event) {
      this.topLocation = window.top.scrollY;
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
