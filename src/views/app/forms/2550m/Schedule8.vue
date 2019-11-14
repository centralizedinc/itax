<template>
  <a-drawer
    title="Schedule 8 VAT Withheld on Sales to Government"
    placement="right"
    :closable="true"
    @close="close"
    :visible="show"
    width="1000"
  >
    <a-table bordered :dataSource="sched8_data" :columns="columns_sched8">
      <template slot="covered" slot-scope="text, record, index">
        <a-date-picker
          v-model="sched8_data[index].covered"
          @change="check_sched8"
          style="width: 100%"
        />
      </template>
      <template slot="withholding_agent" slot-scope="text, record, index">
        <a-input v-model="sched8_data[index].withholding_agent"></a-input>
      </template>
      <template slot="income_payment" slot-scope="text, record, index">
        <a-input-number
          v-model="sched8_data[index].income_payment"
          @change="sched8Compute"
        ></a-input-number>
      </template>
      <template slot="total_withheld" slot-scope="text, record, index">
        <a-input-number
          v-model="sched8_data[index].total_withheld"
        ></a-input-number>
      </template>
      <template slot="applied_current" slot-scope="text, record, index">
        <a-input-number
          v-model="sched8_data[index].applied_current"
        ></a-input-number>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <a-popconfirm
          v-if="sched8_data.length"
          title="Sure to delete?"
          @confirm="() => delete_sched8(index)"
        >
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
      <template slot="footer">
        <a-button @click="addSched8">Add</a-button>
        <a-button>Save</a-button>
        <p align="right">23C: {{ form.taxWthld }}</p>
      </template>
    </a-table>
  </a-drawer>
</template>

<script>
export default {
  props: ["show", "form"],
  data() {
    return {
      sched8_data: [],
      columns_sched8: [
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
          dataIndex: "income_payment",
          scopedSlots: { customRender: "income_payment" }
        },
        {
          title: "Total Tax Withheld",
          dataIndex: "total_withheld",
          scopedSlots: { customRender: "total_withheld" }
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
    console.log("Open Schedule 8 :::", JSON.stringify(this.form.sched8));
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
    sched8Save() {},
    delete_sched8(index) {
      this.sched8_data[index].splice(index, 1);
    },
    check_sched8(value) {
      var only = this.formatDtMonth(this.form.return_period);
      var picked = this.formatDtMonth(value);
      console.log("check sched8: " + value);
      if (picked !== only) {
        console.log("please choose base on return period");
      }
    },
    addSched8() {
      console.log("add sched8 date of return: " + this.sched8_data);

      if (this.sched8_data == false) {
        console.log("sched 8 data fnun");
        this.sched8_data.push({
          covered: "",
          withholding_agent: "",
          income_payment: 0,
          total_withheld: 0,
          applied_current: 0
        });
      } else {
        var index = this.sched8_data.length - 1;
        console.log("last index sched8_data: " + index);
        if (
          this.sched8_data[index].covered == "" ||
          this.sched8_data[index].withholding_agent == "" ||
          this.sched8_data[index].income_payment <= 0 ||
          this.sched8_data[index].total_withheld <= 0 ||
          this.sched8_data[index].applied_current <= 0
        ) {
          console.log("please fill up all blank");
        } else {
          console.log("pushed");
          this.sched8_data.push({
            covered: "",
            withholding_agent: "",
            income_payment: 0,
            total_withheld: 0,
            applied_current: 0
          });
        }
      }
    },
    sched8Compute(value) {
      var index = this.sched8_data.length - 1;
      this.form.taxWthld = 0;
      this.sched8_data[index].tax = value * 0.12;
      this.sched8_data.forEach(data => {
        this.form.taxWthld += data.total_withheld;
        this.form.taxWthld += data.total_withheld;
      });
    },
    showDrawer8() {
      console.log("data source show drawer; " + this.dataSource);
      this.show_sched8 = true;
    },
    onClose_sched8() {
      this.show_sched8 = false;
    },
    close() {
      this.$emit("close", {
        sched8: this.deepCopy(this.data_source),
        totalAtcAmount: this.deepCopy(this.total_atc_amount),
        totalAtcOutput: this.deepCopy(this.total_atc_output_tax)
      });
    }
  }
};
</script>

<style></style>
