<template>
  <div class="confirmation-content">
    <a-spin></a-spin>
  </div>
</template>

<script>
export default {
  created() {
    console.log("this.$route.params.code :", this.$route.params.code);
    this.$store
      .dispatch("REGISTRATION_CONFIRMATION", this.$route.params.code)
      .then(result => {
        console.log("result.data :", result);
        this.$notification.success({
          message: result.message
        });
        this.$router.push("/app");
      })
      .catch(err => {
        console.log("confirmation err :", err);
        this.$notification.error({
          message: err.message,
          icon: <a-icon type="exclamation" style="color: red" />
        });
        this.$router.push("/");
      });
  }
};
</script>

<style>
.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>