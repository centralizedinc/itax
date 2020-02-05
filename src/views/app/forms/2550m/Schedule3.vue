<template>
  <a-drawer
    title="Schedule 3"
    placement="right"
    :closable="true"
    @close="close"
    :visible="show"
    width="1200"
  >
    <schedule-a :form="form" @total="(val) => sched3aTotal=val" />
    <a-divider style="margin: 1vh 0;margin-bottom: 2vh;" />
    <schedule-b :form="form" @total="(val) => sched3bTotal=val" />
    <a-affix :offsetBottom="0">
      <a-card :bodyStyle="{ padding: '10px' }">
        <a-row>
          <a-col :span="24" style="font-weight: bold;font-size: 20px;">Total(Item 20A): {{formatAmount(total, true)}}</a-col>
        </a-row>
      </a-card>
    </a-affix>
  </a-drawer>
</template>

<script>
import ScheduleA from "./Schedule3A";
import ScheduleB from "./Schedule3B";

export default {
  props: ["show", "form"],
  components: { ScheduleA, ScheduleB },
  data() {
    return {
      sched3aTotal: 0,
      sched3bTotal: 0
    };
  },
  computed: {
    total() {
      console.log("this.sched3aTotal :", this.sched3aTotal);
      console.log("this.sched3bTotal :", this.sched3bTotal);
      var total = parseFloat(this.sched3aTotal) + parseFloat(this.sched3bTotal);
      this.form.inputTaxPurchaseCapGoods = total;
      return total;
    }
  },
  methods: {
    close() {
      this.$emit("close", {});
    }
  }
};
</script>

<style>
</style>