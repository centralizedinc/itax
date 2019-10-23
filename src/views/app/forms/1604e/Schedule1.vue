<template>
  <a-drawer
    title="Schedule 1 Schedule of Sales/Receipts and Output Tax"
    placement="right"
    :closable="true"
    @close="close"
    :visible="show"
    width="1000"
  ></a-drawer>
</template>

<script>
export default {
  props: ["show", "form"],

  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style>
</style>