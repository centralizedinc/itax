<template>
  <a-layout>
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
          <a-icon type="notification" style="color:#ffffff"></a-icon>
        </a-col>
        <a-col :span="1">
          <a-icon type="setting" style="color:#ffffff"></a-icon>
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
              :src="user.avatar"
              style="border: 1px solid #FFFFFF"
            ></a-avatar>
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
        justify="start">
        <a-col :span="4">
          <a-row type="flex" justify="center" style="margin-bottom: 2vh">
            <a-col :span="24">
              <a-card
                style=" min-height: 10vh; background: linear-gradient(to bottom, #000046, #1cb5e0);"
              ></a-card>
            </a-col>
            <a-col :span="6">
              <a-avatar style="z-index: 1; margin-top: -5vh; border: 1px solid #FFFFFF" :size="60" :src="user.avatar"></a-avatar>
            </a-col>
            <a-col :span="24">
              <a-card style="text-align: center; margin-top: -5vh; height: 12vh; ">
                <div style="margin-top: 2vh">
                  <p>{{user.name.first}} {{user.name.last}}</p>
                </div>
              </a-card>
            </a-col>
          </a-row>
          <a-affix :offsetTop="100">
            <a-menu @click="nav">
              <a-menu-item key="/app">
                <a-icon type="layout" />Dashboard
              </a-menu-item>
              <a-menu-item key="/app/taxpayer">
                <a-icon type="solution" />Taxpayers
              </a-menu-item>
              <a-menu-item key="/app/taxpayer/network">
                <a-icon type="deployment-unit" />Taxpayer Network
              </a-menu-item>
              <a-menu-item key="/app/tax">
                <a-icon type="form" />Tax Returns
              </a-menu-item>
              <a-menu-item key="/app/pay">
                <a-icon type="credit-card" />Payments
              </a-menu-item>
              <!-- <a-divider></a-divider> -->
              <!-- <a-menu-item key="/app/user"><a-icon type="idcard" />Account</a-menu-item>
              <a-menu-item key="/app/security"><a-icon type="lock" />Security</a-menu-item>-->
              <a-menu-item key="logout">
                <a-icon type="logout" />Logout
              </a-menu-item>
            </a-menu>
          </a-affix>
          <!-- </a-card> -->
        </a-col>
        <a-col :span="15" style="margin-left:2vw; margin-right:2vw">
          <h3>{{$route.name}}</h3>
          <a-divider></a-divider>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </a-col>
        <a-col :span="4">
          <!-- <a-card title="Activities" style="margin-top: 2vh">
            <a-timeline>
              <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
              <a-timeline-item>Solve initial network problems 2015-09-01</a-timeline-item>
              <a-timeline-item>Technical testing 2015-09-01</a-timeline-item>
              <a-timeline-item>Network problems being solved 2015-09-01</a-timeline-item>
            </a-timeline>
          </a-card> -->
          <h3>My Daily Stats</h3>
          <a-divider></a-divider>

          <a-card>
            TaxPayers
            <vue-trend
              :data="ttrend"
              :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
              auto-draw
              smooth
              strokeWidth="5"
            >
            </vue-trend>
            <!-- <trend-chart :datasets="[
    {
      data: ttrend,
      fill: true,
      className:`curve-vue`
    }
  ]" :min="0" padding="5 5 0" :interactive="true" @mouseMove="onMouseMove"></trend-chart> -->
          </a-card>
           <a-card>
             Tax Returns
            <vue-trend
              :data="rtrend"
              :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
              auto-draw
              smooth
            >
            </vue-trend>
          </a-card>
           <a-card style="background: ">
             Payments
            <vue-trend
              :data="ptrend"
              :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
              auto-draw
              smooth
            >
            </vue-trend>
          </a-card>
        </a-col>
      </a-row>
    </a-layout-content>
    <a-layout-footer class="footer" style="margin-top: 2vh">
      <!-- <a-icon type="facebook"></a-icon>
      <a-icon type="google-plus"></a-icon>-->
    </a-layout-footer>
  </a-layout>
</template>


<script>
import VueTrend from 'vuetrend'
import TrendChart from "vue-trend-chart";
export default {
  components:{
    VueTrend,
    TrendChart
  },
  data() {
    return {
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
          },
          onCancel() {}
        });
      } else {
        this.$router.push(e.key);
      }
    },
    randomArray(){
      var arr = []
      for(var i=0; i<10; i++){
        arr.push(this.random())
      }      
      return arr;
    },
    random(){
      return Math.floor(Math.random() *10)
    }
  },
  computed:{
    ttrend(){
      return this.randomArray()
    },
    rtrend(){
      return this.randomArray()
    },
    ptrend(){
      return this.randomArray()
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
