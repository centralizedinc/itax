<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header" :style="headerStyle">
      <a-row type="flex" justify="start" :gutter="8" data-aos="fade-up">
        <a-col :span="23">
          <h2 style="color:white;">Smart Tax Admin</h2>
        </a-col>
        <a-col :span="1">
          <a-popover title="User" trigger="click" placement="bottomRight">
            <a-avatar
              :size="35"
              src="https://www.logolynx.com/images/logolynx/03/039b004617d1ef43cf1769aae45d6ea2.png"
              style="border: 1px solid #FFFFFF; cursor:pointer"
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
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="user" /> Dashboard
            </span>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="laptop" />subnav 2
            </span>
            <a-menu-item key="5">option5</a-menu-item>
            <a-menu-item key="6">option6</a-menu-item>
            <a-menu-item key="7">option7</a-menu-item>
            <a-menu-item key="8">option8</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title">
              <a-icon type="notification" />subnav 3
            </span>
            <a-menu-item key="9">option9</a-menu-item>
            <a-menu-item key="10">option10</a-menu-item>
            <a-menu-item key="11">option11</a-menu-item>
            <a-menu-item key="12">option12</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >Content</a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false
    };
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
