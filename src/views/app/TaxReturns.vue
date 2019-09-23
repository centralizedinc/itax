<template>
  <div>
    <a-affix :offsetTop="64">
      <a-tabs @change="changeView" :activeKey="active_key" style="background-color:#FFFFFF">
        <a-tab-pane :key="0" tab="New"></a-tab-pane>
        <a-tab-pane :key="1" tab="Draft"></a-tab-pane>
        <a-tab-pane :key="2" tab="Submitted"></a-tab-pane>
      </a-tabs>
    </a-affix>
    <div style="margin-top: 5vh">
      <component v-bind:is="currentView" @changeActiveKey="changeActiveKey"></component>
    </div>
  </div>
</template>

<script>
import New from "@/components/tax/new";
import Draft from "@/components/tax/draft";
import Submitted from "@/components/tax/submitted";

export default {
  components: {
    New,
    Draft,
    Submitted
  },
  data() {
    return {
      active_key: 0,
      currentView: "new",
      tabView: ["new", "draft", "submitted"]
    };
  },
  methods: {
    changeActiveKey(key) {
      this.active_key = key;
      this.changeView(key);
    },
    changeView(key) {
      this.active_key = key;
      this.currentView = this.tabView[key];
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style>
</style>