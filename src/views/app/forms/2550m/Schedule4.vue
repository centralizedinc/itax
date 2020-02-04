<template>
  <a-drawer
    title="Schedule 4 Input Tax Attributable to Sale to Government"
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
      <a-input-number v-model="form.inputTaxSaleToGovt"></a-input-number>
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
      sched4_data: [],
      data_source: []
    };
  },
  created() {
    console.log("Open Schedule 4 :::", JSON.stringify(this.form.sched4));
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
    sched4Compute(value) {
      var index = this.sched3B_data.length - 1;
      this.form.inputTaxSaleToGovt = 0;
      this.sched3B_data[index].tax = value * 0.12;
      this.sched3B_data.forEach(data => {
        this.form.inputTaxSaleToGovt += data.vat;
        // this.form.inputTaxPurchaseCapGoods += data.tax_rate;
      });
    },
    showDrawer4() {
        console.log("data source show drawer; " + this.dataSource);
      this.show_sched4 = true;
    },
    onClose_sched4() {
      this.show_sched4 = false;
    },
    close() {
      this.$emit("close", {
        sched4: this.deepCopy(this.data_source),
        totalAtcAmount: this.deepCopy(this.total_atc_amount),
        totalAtcOutput: this.deepCopy(this.total_atc_output_tax)
      });
    }
  }
};
</script>

<style></style>
