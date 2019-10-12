<template>
  <div>
    <!-- <a-affix :offsetTop="1"> -->
      <a-tabs @change="changeView" :activeKey="active_key" style="background-color:#FFFFFF;margin-top: 13vh ">
        <a-tab-pane :key="0" >
          <template slot="tab">
            <a-icon type="plus-square"></a-icon>
            <span>New</span>
          </template>
        </a-tab-pane>
        <a-tab-pane :key="1">
          <template slot="tab">
            <a-icon type="edit"></a-icon>
            <span>Draft</span>
          </template>
        </a-tab-pane>
        <a-tab-pane :key="2">
          <template slot="tab">
            <a-icon type="audit"></a-icon>
            <span>Submitted</span>
          </template>
        </a-tab-pane>
      </a-tabs>
    <!-- </a-affix> -->
    <div style="margin-top: 1vh">
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
.ant-tabs-tab-active{
  font-size: 20px
}
</style>