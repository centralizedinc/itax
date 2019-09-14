<template>
  <div>
    <a-button type="primary" @click="logout">LOGOUT</a-button>
  </div>
</template>

<script>
export default {
  created() {
    console.log(
      "this.$store.state.account_session.is_authenticated :",
      this.$store.state.account_session.is_authenticated
    );
    console.log(
      "this.$store.state.account_session.account :",
      this.$store.state.account_session.account
    );
    console.log(
      "this.$store.state.account_session.user :",
      this.$store.state.account_session.user
    );
    console.log(
      "this.$store.state.account_session.token :",
      this.$store.state.account_session.token
    );
  },
  methods: {
    logout() {
      this.$store.dispatch("LOGOUT");
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>