<template>
<a-layout>
  <a-back-top>
      <a-avatar><a-icon type="up" :size="42"></a-icon></a-avatar>
    </a-back-top>
  <a-layout-header class="header">
    <a-row type="flex" justify="start" :gutter="8">
      <a-col :span="10">
          <h2 style="color:white;">iTax.</h2>
        </a-col>
        <a-col :span="11">
          <a-input-search
            placeholder="Search"
            @search="onSearch"
          />
        </a-col>
        <a-col :span="1">
          <a-icon type="notification" style="color:#ffffff"></a-icon>
        </a-col>
        <a-col :span="1">
          <a-icon type="setting" style="color:#ffffff"></a-icon>
        </a-col>
        <a-col :span="1">
          <a-avatar shape="square" :size="35" src="https://lh3.googleusercontent.com/a-/AAuE7mCkAaeluurFVT0Px52MI7IE7DUGr9Bko7fePKGgAg" style="border: 1px solid #FFFFFF"></a-avatar>
        </a-col>
    </a-row>
  </a-layout-header>
  <a-layout-content>
    <a-row style="min-height:80vh; margin-top:15vh; margin-left:2vw; margin-right:2vw" type="flex" justify="start">
      <a-col :span="3">
        <a-row type="flex" justify="center" style="margin-bottom: 2vh">
          <a-col :span="24">
            <a-card style="min-height: 10vh; background: linear-gradient(to bottom, #000046, #1cb5e0);">
            </a-card>
          </a-col>
          <a-col :span="10">
            <a-avatar style="z-index: 1; margin-top: -5vh; border: 1px solid #FFFFFF" :size="60" src="https://lh3.googleusercontent.com/a-/AAuE7mCkAaeluurFVT0Px52MI7IE7DUGr9Bko7fePKGgAg"></a-avatar>
          </a-col>
          <a-col :span="24">
            <a-card style="text-align: center; margin-top: -4vh; min-height: 5vh; ">
              <div style="margin-top: 2vh">
                <p>Ariel Balita</p>
              </div>
              
            </a-card>
          </a-col>
        </a-row>
          <a-menu @click="nav">
            <a-menu-item key="/app"><a-icon type="block" />Dashboard</a-menu-item>
            <a-menu-item key="/app/taxpayer" ><a-icon type="solution" />Taxpayers</a-menu-item>
            <a-menu-item key="/app/tax" ><a-icon type="form" />Tax Returns</a-menu-item>
            <a-menu-item key="/app/pay"><a-icon type="credit-card" />Payments</a-menu-item>
            <a-divider></a-divider>
            <a-menu-item key="/app/user"><a-icon type="idcard" />Account</a-menu-item>
            <a-menu-item key="/app/security"><a-icon type="lock" />Security</a-menu-item>
            <a-menu-item key="6"><a-icon type="logout" />Logout</a-menu-item>
          </a-menu>
        <!-- </a-card> -->
      </a-col>
      <a-col :span="15" style="margin-left:2vw; margin-right:2vw">
        <h3>{{$route.name}}</h3>
        <router-view></router-view>
      </a-col>
      <a-col :span="4">
        <!-- <a-card title="Tax Calendar">
          <a-row type="flex" justify="center">
            <a-col :span="18">
              <p>September 2019</p>
              <a-divider style="margin-top:-1vh"></a-divider>
            </a-col>
            <a-col :span="24"></a-col>
            <a-col :span="2">
              <a-icon size="small" type="left"></a-icon>
            </a-col>
            <a-col :span="4">
              <p>MON</p>
             <span>01</span> 
              
            </a-col>
            <a-col :span="4">
              02
            </a-col>
            <a-col :span="4">
              03
            </a-col>
            <a-col :span="4">
              04
            </a-col>
            <a-col :span="4">
              05
            </a-col>
            <a-col :span="2">
              <a-icon size="small" type="right"></a-icon>
            </a-col>
          </a-row>
        </a-card> -->
        <a-card title="Activities" style="margin-top: 2vh">
          <a-timeline>
            <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
            <a-timeline-item>Solve initial network problems 2015-09-01</a-timeline-item>
            <a-timeline-item>Technical testing 2015-09-01</a-timeline-item>
            <a-timeline-item>Network problems being solved 2015-09-01</a-timeline-item>
          </a-timeline>
        </a-card>
      </a-col>
    </a-row>
  </a-layout-content>
  <a-layout-footer class="footer" style="margin-top: 2vh">
    <!-- <a-icon type="facebook"></a-icon>
    <a-icon type="google-plus"></a-icon> -->
  </a-layout-footer>
</a-layout>
</template>


<script>
export default {
    methods:{
      nav(e){
        this.$router.push(e.key);

      }
    }
}
</script>
