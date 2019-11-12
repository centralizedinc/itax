<template>
  <a-drawer
    title="Schedule 3 Purchases/Importation This Period"
    placement="right"
    :closable="true"
    @close="close"
    :visible="show"
    width="1000"
  >
    <a-table bordered :dataSource="sched3A_data" :columns="columns_sched3A"></a-table>
  </a-drawer>
</template>

<script>
export default {
  props: ["show", "form"],
  data() {
    return {
      sched3A_data: [],
      columns_sched3A: [
        {
          title: "Date Purchased",
          dataIndex: "date_purchased",
          scopedSlots: { customRender: "date_purchased" }
        },
        {
          title: "Description",
          dataIndex: "description",
          scopedSlots: { customRender: "description" }
        },
        {
          title: "Amount(Net of VAT)",
          dataIndex: "vat",
          scopedSlots: { customRender: "vat" }
        },
        {
          title: "Input Tax (C*Tax Rate)",
          dataIndex: "tax_rate",
          scopedSlots: { customRender: "tax_rate" }
        },
        {
          title: "Estimate Life (in Months)",
          dataIndex: "est_life",
          scopedSlots: { customRender: "est_life" }
        },
        {
          title:
            "Recognized Life (In Months) Useful life or 60 mos. (whichever is shorter)",
          dataIndex: "recog_life",
          scopedSlots: { customRender: "recog_life" }
        },
        {
          title:
            "Allowable Input Tax for the Period Tax Rate / Recognized Life",
          dataIndex: "allowable_input_tax",
          scopedSlots: { customRender: "allowable_input_tax" }
        },
        {
          title:
            "Balance of Input Tax to be carried to Next Period Tax Rate - Allowable Input Tax",
          dataIndex: "balance",
          scopedSlots: { customRender: "balance" }
        },
        {
          title: "",
          dataIndex: "operation",
          scopedSlots: { cutomRender: "operation" }
        }
      ],
      data_source: []
    };
  },
  created() {
    console.log("Open Schedule 3A :::", JSON.stringify(this.form.sched2));
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
    showDrawer3A() {
        console.log("data source show drawer; " + this.dataSource);
      this.show_sched3A = true;
    },
    onClose_sched3A() {
      this.show_sched3A = false;
    },
    close() {
      this.$emit("close", {
        sched3A: this.deepCopy(this.data_source),
        totalAtcAmount: this.deepCopy(this.total_atc_amount),
        totalAtcOutput: this.deepCopy(this.total_atc_output_tax)
      });
    }
  }
};
</script>

<style></style>
