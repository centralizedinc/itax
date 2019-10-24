<template>
  <a-drawer
    title="Schedule 1 – Remittance per BIR Form No. 1601-EQ"
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