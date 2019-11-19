<template>
  <a-drawer
    title="Schedule 7 Schedule of Advance Payment"
    placement="right"
    :closable="true"
    @close="close"
    :visible="show"
    width="1000"
  >
    <a-table bordered :dataSource="sched7_data" :columns="columns_sched7">
      <template slot="covered" slot-scope="text, record, index">
        <a-date-picker
          v-model="sched7_data[index].covered"
          @change="check_sched7"
          style="width: 100%"
        />
      </template>
      <template slot="miller" slot-scope="text, record, index">
        <a-input v-model="sched7_data[index].miller"></a-input>
      </template>
      <template slot="tax_payer" slot-scope="text, record, index">
        <a-input v-model="sched7_data[index].tax_payer"></a-input>
      </template>
      <template slot="receipt_num" slot-scope="text, record, index">
        <a-input-number
          v-model="sched7_data[index].receipt_num"
          @change="sched7Compute"
        ></a-input-number>
      </template>
      <template slot="amount_paid" slot-scope="text, record, index">
        <a-input-number
          v-model="sched7_data[index].amount_paid"
        ></a-input-number>
      </template>
      <template slot="applied_current" slot-scope="text, record, index">
        <a-input-number
          v-model="sched7_data[index].applied_current"
        ></a-input-number>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <a-popconfirm
          v-if="sched7_data.length"
          title="Sure to delete?"
          @confirm="() => delete_sched7(index)"
        >
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
      <template slot="footer">
        <a-button @click="addSched7">Add</a-button>
        <a-button>Save</a-button>
        <p align="right">23B: {{ form.creditableVatWithheld }}</p>
      </template>
    </a-table>
  </a-drawer>
</template>

<script>
export default {
  props: ["show", "form"],
  data() {
    return {
      sched7_data: [],
      columns_sched7: [
        {
          title: "Period Covered",
          dataIndex: "covered",
          scopedSlots: { customRender: "covered" }
        },
        {
          title: "Name of Miller",
          dataIndex: "miller",
          scopedSlots: { customRender: "miller" }
        },
        {
          title: "Name of Tax Payer",
          dataIndex: "tax_payer",
          scopedSlots: { customRender: "tax_payer" }
        },
        {
          title: "Official Receipt Number",
          dataIndex: "receipt_num",
          scopedSlots: { customRender: "receipt_num" }
        },
        {
          title: "Amount Paid",
          dataIndex: "amount_paid",
          scopedSlots: { customRender: "amount_paid" }
        },
        {
          title: "Appliead Current mo.",
          dataIndex: "applied_current",
          scopedSlots: { customRender: "applied_current" }
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
    console.log("Open Schedule 7 :::", JSON.stringify(this.form.sched7));
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
    sched7Save() {},
    delete_sched7(index) {
      this.sched7_data[index].splice(index, 1);
    },
    check_sched7(value) {
      var only = this.formatDtMonth(this.form.return_period);
      var picked = this.formatDtMonth(value);
      console.log("check sched7: " + value);
      if (picked !== only) {
        console.log("please choose base on return period");
      }
    },
    addSched7() {
      console.log("add sched7 date of return: " + this.sched7_data);

      if (this.sched7_data == false) {
        console.log("sched 7 data fnun");
        this.sched7_data.push({
          covered: "",
          miller: "",
          tax_payer: "",
          receipt_num: 0,
          amount_paid: 0,
          applied_current: 0
        });
      } else {
        var index = this.sched7_data.length - 1;
        console.log("last index sched7_data: " + index);
        if (
          this.sched7_data[index].covered == "" ||
          this.sched7_data[index].miller == "" ||
          this.sched7_data[index].tax_payer == "" ||
          this.sched7_data[index].receipt_num <= 0 ||
          this.sched7_data[index].amount_paid <= 0 ||
          this.sched7_data[index].applied_current <= 0
        ) {
          console.log("please fill up all blank");
        } else {
          console.log("pushed");
          this.sched7_data.push({
            covered: "",
            miller: "",
            tax_payer: "",
            receipt_num: 0,
            amount_paid: 0,
            applied_current: 0
          });
        }
      }
    },
    sched7Compute(value) {
      var index = this.sched7_data.length - 1;
      this.form.advPaySugarFlourInd = 0;
      this.sched7_data[index].tax = value * 0.12;
      this.sched7_data.forEach(data => {
        // this.form.advPaySugarFlourInd += data.receipt_num;
        this.form.advPaySugarFlourInd += data.receipt_num;
      });
    },
    showDrawer7() {
      console.log("data source show drawer; " + this.dataSource);
      this.show_sched7 = true;
    },
    onClose_sched7() {
      this.show_sched7 = false;
    },
    close() {
      this.$emit("close", {
        sched7: this.deepCopy(this.data_source),
        totalAtcAmount: this.deepCopy(this.total_atc_amount),
        totalAtcOutput: this.deepCopy(this.total_atc_output_tax)
      });
    }
  }
};
</script>

<style></style>
