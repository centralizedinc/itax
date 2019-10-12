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
        justify="start">
        <a-col :span="4">
          <a-row type="flex" justify="center" style="margin-bottom: 2vh">
            <a-col :span="24">
              <a-card
                style=" min-height: 10vh; background: linear-gradient(to right, #000046, #1cb5e0);"
              ></a-card>
            </a-col>
            <a-col :span="6">
              <a-avatar 
                style="z-index: 1; margin-top: -7vh; border: 3px solid #FFFFFF" 
                :size="60" 
                :src="user && user.avatar ? user.avatar.location : null">
                {{user && user.name && user.name.first ? user.name.first[0] : '?' }}
              </a-avatar>
            </a-col>
            <a-col :span="24">
              <a-card style="text-align: center; margin-top: -5vh; height: 12vh; ">
                <div style="margin-top: 2vh">
                  <span>{{user.name.first}} {{user.name.last}}</span>
                  <p><b>123-000-1212-000</b></p>
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
              <!-- <a-menu-item key="/app/taxpayer/network">
                <a-icon type="deployment-unit" />Taxpayer Network
              </a-menu-item> -->
              <a-menu-item key="/app/tax">
                <a-icon type="form" />Tax Returns
              </a-menu-item>
              <a-menu-item key="/app/pay">
                <a-icon type="credit-card" />Payments
              </a-menu-item>
              <a-divider></a-divider>
              <a-menu-item key="/app/user"><a-icon type="idcard" />Account</a-menu-item>
              <a-menu-item key="/app/security"><a-icon type="lock" />Security</a-menu-item>
              <a-menu-item key="logout">
                <a-icon type="logout" />Logout
              </a-menu-item>
            </a-menu>
          </a-affix>
          <!-- </a-card> -->
        </a-col>
        <a-col :span="15" style="margin-left:2vw; margin-right:2vw">
          <!-- <h3>{{$route.name}}</h3>
          <a-divider></a-divider> -->
           <a-col :span="24">
              <a-card style="background: linear-gradient(to right, #000046, #1cb5e0)">
                  <h2 style="color: #FFFFFF">{{$route.name}}</h2>
                  <!-- <a-divider></a-divider> -->
                  <!-- <p style="color: #FFFFFF">For easier filing of your tax returns, complete your taxpayer profile now! </p>
                  <a-button ghost ghtype="primary" @click="$router.push('/app/user')">My Profile</a-button> -->
                  
              </a-card>
          </a-col>
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
          <!-- <h3>My Daily Stats</h3>
          <a-divider></a-divider> -->
          <a-row style="margin-bottom: 2vh">
            <a-col :span="24">
              <a-card style="background: linear-gradient(to right, #000046, #1cb5e0)">
                  <h2 style="color: #FFFFFF">Summary</h2>
                  <!-- <a-divider></a-divider> -->
                  <!-- <p style="color: #FFFFFF">For easier filing of your tax returns, complete your taxpayer profile now! </p>
                  <a-button ghost ghtype="primary" @click="$router.push('/app/user')">My Profile</a-button> -->
                  
              </a-card>
          </a-col>
          </a-row>
          <a-card style="margin-bottom:1vh" class="avatar_btn">
            <a-avatar shape="square" style="background: #115B95">
              <a-icon type="user"></a-icon>
            </a-avatar>
            TaxPayers
            <vue-trend style="margin-top:1vh"
              :data="ttrend"
              :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
              auto-draw
              smooth
              :strokeWidth="10"
            >
            </vue-trend>
          </a-card>
           <a-card style="margin-bottom:1vh" class="avatar_btn"> 
             <a-avatar shape="square" style="background: #115B95">
              <a-icon type="form"></a-icon>
            </a-avatar>
             Tax Returns
            <vue-trend style="margin-top:1vh"
              :data="rtrend"
              :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
              auto-draw
              smooth
            >
            </vue-trend>
          </a-card>
           <a-card style="margin-bottom:1vh" class="avatar_btn">
             <a-avatar shape="square" style="background: #115B95">
              <a-icon type="credit-card"></a-icon>
            </a-avatar>
             Payments
            <vue-trend style="margin-top:1vh"
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
            _self.$forceUpdate();
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
