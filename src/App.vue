<template>
  <div id="app">
    <transition>
      <!-- <transition name="fade"> -->
      <router-view></router-view>
      <!-- </transition> -->
    </transition>
    <cookie-law 
      v-if="!$store.state.account_session.accept_cookie"
      class="cookie-law-content" 
      theme="dark-lime"
      @accept="$store.commit('ACCEPT_COOKIE')">
      <a-row slot-scope="props" style="width: 100%;" type="flex" align="middle">
        <a-col :span="20">
          Smart Tax uses cookies to ensure you get the best experience on our website.
        </a-col>
        <a-col :span="4" style="text-align: right;">
          <a-button @click="props.accept" class="Cookie__button">Got It!</a-button>
        </a-col>
      </a-row>
    </cookie-law>
  </div>
</template>

<script>
import CookieLaw from 'vue-cookie-law';
export default {
  components: {
    CookieLaw
  },
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
.cookie-law-content {
  background: linear-gradient(to right, #000046, #1cb5e0) !important;
  color: white !important;
  font-weight: bold !important;
  height: 10vh !important;
  padding: 0 10px !important;
}

.Cookie__button {
  color: white !important;
  background: none !important;
  padding: 0.5vh 2vw !important;
  border: 1.5px solid white !important;
  border-radius: 5px !important;
  font-weight: bold !important;
}

.Cookie__button:hover {
  border-color: #3333ff !important;
  color: #3333ff !important;
}

</style>
