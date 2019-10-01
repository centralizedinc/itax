<template>
  <div class="confirmation-content">
    <a-spin />
  </div>
</template>

<script>
export default {
  created() {
    console.log('test');
    console.log('code :', this.$route.params.code);
    this.$store.dispatch("FACEBOOK_CONFIRMATION", this.$route.params.code);
    window.opener.location.href = "http://localhost:8080/#/";
    window.opener.location.reload();
    window.close();
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