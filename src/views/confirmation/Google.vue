<template>
  <div class="confirmation-content">
    <a-spin />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("GOOGLE_CONFIRMATION", this.$route.params.code);
    window.opener.location.href = "https://localhost:8080/#/";
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