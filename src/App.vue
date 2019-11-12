<template>
  <div id="app">
    <transition>
      <!-- <transition name="fade"> -->
      <router-view></router-view>
      <!-- </transition> -->
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  computed: {
    notify_message() {
      return this.deepCopy(this.$store.state.notification.notify);
    }
  },
  watch: {
    notify_message(notify) {
      console.log("notify :", notify);
      var message = "", icon = "";
      if (notify.option) {
        message = notify.option.message;
        icon = notify.option.icon;
      } else {
        message = notify.message;
        if (!notify.success)
          icon = <a-icon type="exclamation" style="color: red" />;
        else icon = <a-icon type="check" style="color: blue" />;
      }

      // this.$notification.open({ message, icon });
      // this.$store.commit("NOTIFY_MESSAGE", {});
    }
  }
};
</script>

<style>
</style>
