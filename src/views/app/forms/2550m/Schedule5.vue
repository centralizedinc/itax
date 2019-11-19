<template>
  <a-drawer
    title="Schedule 5 Input Tax Attributable to Exempt Sales"
    placement="right"
    :closable="true"
    @close="close"
    :visible="show"
    width="1000"
  >
    <a-row>
        <a-col :span="18">
          <div>
            <p>
              Input Tax directly attribute to sale to government
              Add: Ratable portion of Input Tax not directly attribute to any activity:
            </p>
          </div>
        </a-col>
        <a-col :span="6">
          <div>
            <a-input-number></a-input-number>
          </div>
        </a-col>
      </a-row>
      <!-- -- -->
      <a-row>
        <a-col :span="9">
          <a-row>
            <a-col :span="12">Taxable sales to government</a-col>
            <a-col :span="12">
              <a-input-number disabled></a-input-number>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">Total Sales</a-col>
            <a-col :span="12">
              <a-input-number disabled></a-input-number>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="4">Amount of Input Tax not directly attributable</a-col>
        <a-col :span="5">
          <a-input-number v-model="form.inputTaxAllocableToExempt"></a-input-number>
        </a-col>
        <a-col :span="6">
          <a-input-number disabled></a-input-number>
        </a-col>
      </a-row>
      <!-- -- -->
      <a-row>
        <a-col :span="18">Total Input Tax attributable to sale to government</a-col>
        <a-col :span="6">
          <a-input-number disabled></a-input-number>
        </a-col>
      </a-row>
      <!-- -- -->
      <a-row>
        <a-col :span="18">Less Standard Input Tax to sale to government</a-col>
        <a-col :span="6">
          <a-input-number></a-input-number>
        </a-col>
      </a-row>
      <!-- -- -->
      <a-row>
        <a-col :span="18">Input Tax on Sale to Govt. closed to expense (to Item 20B)</a-col>
        <a-col :span="6">
          <a-input-number disabled></a-input-number>
        </a-col>
      </a-row>
  </a-drawer>
</template>

<script>
export default {
  props: ["show", "form"],
  data() {
    return {
      data_source: []
    };
  },
  created() {
    console.log("Open Schedule 5 :::", JSON.stringify(this.form.sched5));
    // if(this.form.sched1){
    //   this.data_source = this.deepCopy(this.form.sched1);
    // }else{
    //   this.data_source = [{}]
    // }
  },
  computed: {
    total_atc_amount() {
      var total = 0;
      if (this.data_source && this.data_source.length)
        total = this.data_source.map(v => v.amount).reduce((t, v) => t + v);
      return total;
    },
    total_atc_output_tax() {
      var total = 0;
      if (this.data_source && this.data_source.length)
        total = this.data_source.map(v => v.output_tax).reduce((t, v) => t + v);
      return total;
    }
  },
  methods: {
    showDrawer5() {
        console.log("data source show drawer; " + this.dataSource);
      this.show_sched5 = true;
    },
    onClose_sched3B() {
      this.show_sched5 = false;
    },
    close() {
      this.$emit("close", {
        sched5: this.deepCopy(this.data_source),
        totalAtcAmount: this.deepCopy(this.total_atc_amount),
        totalAtcOutput: this.deepCopy(this.total_atc_output_tax)
      });
    }
  }
};
</script>

<style></style>
