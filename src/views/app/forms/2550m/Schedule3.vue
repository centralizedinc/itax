<template>
  <a-drawer
    title="Schedule 3"
    placement="right"
    :closable="true"
    @close="close"
    :visible="show"
    width="900"
  >
    <a-divider>Purchases/Importation of Capital Goods (Aggregate Amount Exceeds P1 Million)</a-divider>
    <schedule-a :form="form" />
    <a-divider>Purchases/Importations This Period</a-divider>
    <schedule-b :form="form" />
  </a-drawer>
</template>

<script>
import ScheduleA from "./Schedule3A";
import ScheduleB from "./Schedule3B";

export default {
  props: ["show", "form"],
  components: { ScheduleA, ScheduleB },
  methods: {
    close() {
      this.$emit("close", {});
    }
  }
};
</script>

<style>
</style>