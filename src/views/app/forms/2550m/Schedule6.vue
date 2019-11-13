<template>
  <a-drawer
    title="Schedule 6 Tax Withheld Claimed as Tax Credit"
    placement="right"
    :closable="true"
    @close="close"
    :visible="show"
    width="1000"
  >
    <a-table bordered :dataSource="sched6_data" :columns="columns_sched6">
    <template slot="covered" slot-scope="text, record, index">
        <a-date-picker
          v-model="sched6_data[index].covered"
          @change="check_sched6"
          style="width: 100%"
        />
      </template>
      <template slot="withholding_agent" slot-scope="text, record, index">
        <a-input v-model="sched6_data[index].withholding_agent"></a-input>
      </template>
      <template slot="income_pay" slot-scope="text, record, index">
        <a-input-number
          v-model="sched6_data[index].income_pay"
          @change="sched6Compute"
        ></a-input-number>
      </template>
      <template slot="total_tax_withheld" slot-scope="text, record, index">
        <a-input-number
          v-model="sched6_data[index].total_tax_withheld"
        ></a-input-number>
      </template>
      <template slot="applied_current" slot-scope="text, record, index">
        <a-input-number
          v-model="sched6_data[index].applied_current"
        ></a-input-number>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <a-popconfirm
          v-if="sched6_data.length"
          title="Sure to delete?"
          @confirm="() => delete_sched6(index)"
        >
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
      <template slot="footer">
        <a-button @click="addSched6">Add</a-button>
        <a-button>Save</a-button>
        <p align="right">
          23A: {{ form.creditableVatWithheld }}
        </p>
      </template>
    </a-table>
  </a-drawer>
</template>

<script>
export default {
  props: ["show", "form"],
  data() {
    return {
      sched6_data: [],
      columns_sched6: [
        {
          title: "Period Covered",
          dataIndex: "covered",
          scopedSlots: { customRender: "covered" }
        },
        {
          title: "Name of Withholding Agent",
          dataIndex: "withholding_agent",
          scopedSlots: { customRender: "withholding_agent" }
        },
        {
          title: "Income Payment",
          dataIndex: "income_pay",
          scopedSlots: { customRender: "income_pay" }
        },
        {
          title: "Total Tax Withheld",
          dataIndex: "total_tax_withheld",
          scopedSlots: { customRender: "total_tax_withheld" }
        },
        {
          title: "Applied Current mo.",
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
    console.log("Open Schedule 6 :::", JSON.stringify(this.form.sched6));
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
    sched6Save() {},
    delete_sched6(index) {
      this.sched6_data[index].splice(index, 1);
    },
    check_sched6(value) {
      var only = this.formatDtMonth(this.form.return_period);
      var picked = this.formatDtMonth(value);
      console.log("check sched6: " + value);
      if (picked !== only) {
        console.log("please choose base on return period");
      }
    },
    addSched6() {
      console.log("add sched6 date of return: " + this.sched6_data);

      if (this.sched6_data == false) {
        console.log("sched 6 data fnun");
        this.sched6_data.push({
          covered: "",
          withholding_agent: "",
          income_pay: 0,
          total_tax_withheld: 0,
          applied_current: 0
        });
      } else {
        var index = this.sched6_data.length - 1;
        console.log("last index sched6_data: " + index);
        if (
          this.sched6_data[index].covered == "" ||
          this.sched6_data[index].withholding_agent == "" ||
          this.sched6_data[index].income_pay <= 0 ||
          this.sched6_data[index].total_tax_withheld <= 0 ||
          this.sched6_data[index].applied_current <= 0
        ) {
          console.log("please fill up all blank");
        } else {
          console.log("pushed");
          this.sched6_data.push({
            covered: "",
            withholding_agent: "",
            income_pay: 0,
            total_tax_withheld: 0,
            applied_current: 0
          });
        }
      }
    },
    sched6Compute(value) {
      var index = this.sched6_data.length - 1;
      this.form.creditableVatWithheld = 0;
      this.sched6_data[index].tax = value * 0.12;
      this.sched6_data.forEach(data => {
        this.form.creditableVatWithheld += data.income_pay;
        this.form.creditableVatWithheld += data.total_tax_withheld;
      });
    },
    showDrawer6() {
        console.log("data source show drawer; " + this.dataSource);
      this.show_sched6 = true;
    },
    onClose_sched6() {
      this.show_sched6 = false;
    },
    close() {
      this.$emit("close", {
        sched6: this.deepCopy(this.data_source),
        totalAtcAmount: this.deepCopy(this.total_atc_amount),
        totalAtcOutput: this.deepCopy(this.total_atc_output_tax)
      });
    }
  }
};
</script>

<style></style>
