<template>
  <a-drawer
    title="Schedule 3 Purchases/Importation This Period"
    placement="right"
    :closable="true"
    @close="close"
    :visible="show"
    width="900"
  >
    <a-table bordered :dataSource="sched3A_data" :columns="columns_sched3A">
      <template slot="date_purchased" slot-scope="text, record, index">
        <a-date-picker
          v-model="sched3A_data[index].date_purchased"
          @change="check_sched3A"
          style="width: 100%"
        />
      </template>
      <template slot="description" slot-scope="text, record, index">
        <a-input v-model="sched3A_data[index].description"></a-input>
      </template>
      <template slot="vat" slot-scope="text, record, index">
        <a-input-number v-model="sched3A_data[index].vat" @change="sched3ACompute"></a-input-number>
      </template>
      <template slot="tax_rate" slot-scope="text, record, index">
        <a-input-number v-model="sched3A_data[index].tax_rate" @change="sched3ACompute"></a-input-number>
      </template>
      <template slot="est_life" slot-scope="text, record, index">
        <a-input-number v-model="sched3A_data[index].est_life"></a-input-number>
      </template>
      <template slot="recog_life" slot-scope="text, record, index">
        <a-input-number v-model="sched3A_data[index].recog_life"></a-input-number>
      </template>
      <template slot="allowable_input_tax" slot-scope="text, record, index">
        <a-input-number v-model="sched3A_data[index].allowable_input_tax"></a-input-number>
      </template>
      <template slot="balance" slot-scope="text, record, index">
        <a-input-number v-model="sched3A_data[index].balance"></a-input-number>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <a-popconfirm
          v-if="sched3A_data.length"
          title="Sure to delete?"
          @confirm="() => delete_sched3A(index)"
        >
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
      <template slot="footer">
        <a-button @click="addSched3A">Add</a-button>
        <a-button>Save</a-button>
        <p align="right">
          18C: {{ form.purCapGoodsExceed }} 18D:
          {{ form.outputPurCapGoodsExceed }}
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
    console.log("Open Schedule 3A :::", JSON.stringify(this.form.sched3A));
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
    sched3ASave() {},
    delete_sched3A(index) {
      this.sched3A_data[index].splice(index, 1);
    },
    check_sched3A(value) {
      var only = this.formatDtMonth(this.form.return_period);
      var picked = this.formatDtMonth(value);
      console.log("check sched3A: " + value);
      if (picked !== only) {
        console.log("please choose base on return period");
      }
    },
    addSched3A() {
      console.log("add sched3A date of return: " + this.sched3A_data);

      if (this.sched3A_data == false) {
        console.log("sched 3 data fnun");
        this.sched3A_data.push({
          date_purchased: "",
          description: "",
          vat: 0,
          tax_rate: 0,
          est_life: 0,
          recog_life: 0,
          allowable_input_tax: 0,
          balance: 0
        });
      } else {
        var index = this.sched3A_data.length - 1;
        console.log("last index sched3A_data: " + index);
        if (
          this.sched3A_data[index].date_purchased == "" ||
          this.sched3A_data[index].description == "" ||
          this.sched3A_data[index].vat <= 0 ||
          this.sched3A_data[index].tax_rate <= 0 ||
          this.sched3A_data[index].est_life <= 0 ||
          this.sched3A_data[index].recog_life <= 0 ||
          this.sched3A_data[index].allowable_input_tax <= 0 ||
          this.sched3A_data[index].balance <= 0
        ) {
          console.log("please fill up all blank");
        } else {
          console.log("pushed");
          this.sched3A_data.push({
            date_purchased: "",
            description: "",
            vat: 0,
            tax_rate: 0,
            est_life: 0,
            recog_life: 0,
            allowable_input_tax: 0,
            balance: 0
          });
        }
      }
    },
    sched3ACompute(value) {
      var index = this.sched3A_data.length - 1;
      this.form.purCapGoodsExceed = 0;
      this.form.outputPurCapGoodsExceed = 0;
      this.sched3A_data[index].tax = value * 0.12;
      this.sched3A_data.forEach(data => {
        this.form.purCapGoodsExceed += data.vat;
        this.form.outputPurCapGoodsExceed += data.tax_rate;
      });
    },
    showDrawer3A() {
      console.log("data source show drawer; " + this.dataSource);
      this.show_sched3A = true;
    },
    onClose_sched3A() {
      this.show_sched3A = false;
    },
    close() {
      this.$emit("close", {
        sched3A: this.sched3A_data
        // totalAtcAmount: this.deepCopy(this.total_atc_amount),
        // totalAtcOutput: this.deepCopy(this.total_atc_output_tax)
      });
    }
  }
};
</script>

<style></style>
