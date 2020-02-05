<template>
  <a-drawer
    title="Schedule 3"
    placement="right"
    :closable="true"
    @close="close"
    :visible="show"
    width="1200"
  >
    <schedule-a :form="form" />
    <a-divider style="margin: 1vh 0;margin-bottom: 2vh;" />
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