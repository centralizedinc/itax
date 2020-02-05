<template>
  <a-layout style="background: linear-gradient(to top, #8e9eab, #eef2f3);">
    <a-back-top>
      <a-avatar>
        <a-icon type="up" :size="42"></a-icon>
      </a-avatar>
    </a-back-top>
    <a-layout-header class="header">
      <a-row type="flex" justify="start" :gutter="8">
        <a-col :span="10">
          <h2 style="color:white;">Smart Tax.</h2>
        </a-col>
        <a-col :span="11">
          <a-input-search placeholder="Search" @search="onSearch" />
        </a-col>
        <a-col :span="1">
          <a-icon type="notification" style="color:#ffffff; cursor:pointer"></a-icon>
        </a-col>
        <a-col :span="1">
          <a-icon type="setting" style="color:#ffffff; cursor:pointer"></a-icon>
        </a-col>
        <a-col :span="1">
          <a-popover
            :title="`${user.name.first} ${user.name.last}`"
            trigger="click"
            placement="bottomRight"
          >
            <a-avatar
              shape="square"
              :size="35"
              :src="user && user.avatar ? user.avatar.location : null"
              style="border: 1px solid #FFFFFF; cursor:pointer"
            >{{user && user.name && user.name.first ? user.name.first[0] : '?'}}</a-avatar>
            <template slot="content">
              <a-menu @click="nav">
                <a-menu-item key="/app/user">
                  <a-icon type="idcard" />Account
                </a-menu-item>
                <a-menu-item key="/app/security">
                  <a-icon type="lock" />Security
                </a-menu-item>
                <a-menu-item key="logout">
                  <a-icon type="logout" />Logout
                </a-menu-item>
              </a-menu>
            </template>
          </a-popover>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content>
      <a-row
        style="min-height:100vh; margin-top:15vh; margin-left:1vw; margin-right:1vw;"
        type="flex"
        justify="center"
      >
      
    <a-col :span="4">
          <a-row type="flex" justify="center" style="margin-bottom: 2vh">
            <a-col :span="24">
              <a-card
                style=" min-height: 10vh; background: linear-gradient(to right, #000046, #1cb5e0); border-color:#199ECD"
              ></a-card>
            </a-col>
            <a-col :span="6">
              <a-avatar
                style="z-index: 1; margin-top: -7vh; border: 3px solid #FFFFFF"
                :size="60"
                :src="user && user.avatar ? user.avatar.location : null"
              >{{user && user.name && user.name.first ? user.name.first[0] : '?' }}</a-avatar>
            </a-col>
            <a-col :span="24">
              <a-card style="text-align: center; margin-top: -5vh; height: 12vh; border-color:#199ECD">
                <div style="margin-top: 1vh">
                  <span style="text-transform: uppercase; font-weight: bold;">{{user.name.first}} {{user.name.last}}</span>
                  <p v-if="user.tin">
                    <a
                      style="font-size:12px"
                      @click="$router.push('/app/user')"
                    >{{formatTIN(user.tin)}}</a>
                  </p>
                  <!-- <p v-else>
                    <a-icon type="warning" style="color:red"></a-icon>
                    <a
                      style="font-size:10px"
                      @click="$router.push('/app/user')"
                    >No taxpayer details. Click here.</a>
                  </p> -->
                </div>
              </a-card>
            </a-col>
          </a-row>
          <a-affix :offsetTop="100">
            <a-menu @click="nav" :selectedKeys="active_menu" >
              <a-menu-item key="/app">
                <a-icon type="layout" />Dashboard
              </a-menu-item>
              <a-menu-item key="/app/taxpayer">
                <a-icon type="solution" />Taxpayers
              </a-menu-item>
              <!-- <a-menu-item key="/app/taxpayer/network">
                <a-icon type="deployment-unit" />Taxpayer Network
              </a-menu-item>-->
              <a-menu-item key="/app/tax">
                <a-icon type="form" />Tax Returns
              </a-menu-item>
              <a-menu-item key="/app/pay">
                <a-icon type="credit-card" />Payments
              </a-menu-item>
              <a-divider></a-divider>
              <a-menu-item key="/app/user">
                <a-icon type="idcard" />Account
              </a-menu-item>
              <!-- <a-menu-item key="/app/security"><a-icon type="lock" />Security</a-menu-item> -->
              <a-menu-item key="logout">
                <a-icon type="logout" />Logout
              </a-menu-item>
            </a-menu>
          </a-affix>
        </a-col>
        <a-col :span="15" style="margin-left:2vw; margin-right:2vw">
          <a-row>
            <a-col :span="24" v-if="session_mode !== 'SETUP'">
              <a-card style="background: linear-gradient(to right, #000046, #1cb5e0)">
                <h2 style="color: #FFFFFF">{{$route.name}}</h2>
              </a-card>
            </a-col>
            <a-col :span="24">
              <h1>{{$route.name}}</h1>
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="4">
          <!-- <a-row style="margin-bottom: 1vh">
            <a-col :span="24">
              <a-card style="background: linear-gradient(to right, #000046, #1cb5e0)">
                <h2 style="color: #FFFFFF">Summary</h2>
              </a-card>
            </a-col>
          </a-row> -->
          <a-card style="margin-bottom:0.5vh; border: 1px solid; border-color:#199ECD" class="avatar_btn" @click="$router.push('/app/pay')">
            <a-row type="flex" align="middle" justify="left">
              <a-col :span="8">
                <a-badge dot>
                  <a-icon type="credit-card" style="font-size: 46px"></a-icon>
                </a-badge>
              </a-col>
              <a-col :span="16" style="text-align:right">
                <h4>For Payments</h4>
                <h2>10</h2>
              </a-col>
              <a-divider></a-divider>
              <span style="font-size:10px">Total Number of submitted forms but not yet paid. To pay these resturns, go to the 'Payments' menu then click 'For Payments' tab.</span>           
            </a-row>
          </a-card>
          <a-card style="margin-bottom:0.5vh;border: 1px solid;border-color:#199ECD" class="avatar_btn" @click="$router.push('/app/tax')">
            <a-row type="flex" align="middle" justify="left">
              <a-col :span="8">
                <a-badge dot>
                  <a-icon type="snippets" style="font-size: 46px"></a-icon>
                </a-badge>
              </a-col>
              <a-col :span="16" style="text-align:right">
                <h4>For Submission</h4>
                <h2>10</h2>
              </a-col>
              <a-divider></a-divider>
              <span style="font-size:10px">Total Number of Tax Returns saved but not submitted. All un-submitted forms can be found under tax returns menu and in the drafts tab. </span>
            </a-row>
          </a-card>
          <!-- <a-card style="margin-bottom:0.5vh; border: 1px solid;" class="avatar_btn">
            <a-row type="flex" align="middle" justify="left">
              <a-col :span="8">
                <a-icon type="credit-card" style="font-size: 46px"></a-icon>
              </a-col>
              <a-col :span="16" style="text-align:right">
                <h4>Total Payments</h4>
                <h2>45,538</h2>
              </a-col>
            </a-row>
          </a-card> -->
        </a-col>
      </a-row>
    </a-layout-content>
    <a-layout-footer
      class="footer"
      style="text-align:right;margin-top: 2vh"
    >Copyright Ⓒ 2019 - Centralized Cloud Computing International Inc.</a-layout-footer>
  </a-layout>
</template>

 <script>
// import VueTrend from "vuetrend";
// import TrendChart from "vue-trend-chart";
export default {
  // components: {
  //   VueTrend,
  //   TrendChart
  // },
  data() {
    return {
      // active_menu:['/app'],
      user: {
        name: {}
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.user = this.$store.state.account_session.user;
      this.$store.dispatch("GET_RDOS");
      console.log("user :", this.user);
    },
    nav(e) {
      if (e.key === "logout") {
        var _self = this;
        this.$confirm({
          title: "Logout Confirmation",
          content: "Are you sure you want to logout?",
          onOk() {
            _self.$store.dispatch("LOGOUT");
            _self.$router.push("/");
            _self.$forceUpdate();
          },
          onCancel() {}
        });
      } else {
        // this.active_menu = [e.key]
        this.$router.push(e.key);
      }
    },
    randomArray() {
      var arr = [];
      for (var i = 0; i < 10; i++) {
        arr.push(this.random());
      }
      return arr;
    },
    random() {
      return Math.floor(Math.random() * 10);
    },
    onSearch(e) {}
  },
  computed: {
    active_menu() {
      console.log("PATH :::: ", this.$route.path);
      return [this.$route.path];
    },
    ttrend() {
      return this.randomArray();
    },
    rtrend() {
      return this.randomArray();
    },
    ptrend() {
      return this.randomArray();
    },
    account_status() {
      return this.$store.state.account_session.account.status;
    },
    session_mode() {
      return this.$store.state.account_session.mode;
    }
  }
};
</script>

<style>
.curve-vue.stroke {
  stroke: #39af77;
}
.curve-vue.fill {
  fill: #39af77;
}
.curve-vue.point {
  fill: #39af77;
  stroke: #39af77;
}
</style>
