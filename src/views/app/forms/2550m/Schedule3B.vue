<template>
  <div>
    <!-- <a-row type="flex" justify="space-between">
      <a-col :span="12">
        <a-input-search v-model="search" placeholder="Search"></a-input-search>
      </a-col>
      <a-col :span="5">
        <a-button type="primary" @click="addSched3B" icon="plus">ADD</a-button>
      </a-col>
    </a-row>-->
    <a-row>
      <a-col :span="19" style="font-weight: bold;">3B. Purchases/Importations This Period</a-col>
      <a-col :span="5" style="text-align: right;">
        <a-button type="primary" @click="addSched3B" icon="plus">ADD</a-button>
      </a-col>
      <a-col :span="24">
        <a-table
          bordered
          :dataSource="sched3B_data"
          :columns="columns_sched3B"
          :scroll="{ x: 1500 }"
        >
          <template slot="date_purchased" slot-scope="text, record, index">
            <a-date-picker
              v-model="sched3B_data[index].date_purchased"
              :disabledDate="disabledDate"
              style="width: 100%"
            />
          </template>
          <template slot="description" slot-scope="text, record, index">
            <a-input v-model="sched3B_data[index].description"></a-input>
          </template>
          <template slot="vat" slot-scope="text, record, index">
            <a-input-number v-model="sched3B_data[index].vat" @change="sched3BCompute(index)"></a-input-number>
          </template>
          <template slot="balance_input_tax" slot-scope="text, record, index">
            <a-input-number
              v-model="sched3B_data[index].balance_input_tax"
              @change="sched3BCompute(index)"
            ></a-input-number>
          </template>
          <!-- <template slot="tax_rate" slot-scope="text, record, index">
            <a-input-number v-model="sched3B_data[index].tax_rate"></a-input-number>
          </template>-->
          <template slot="est_life" slot-scope="text, record, index">
            <a-input-number v-model="sched3B_data[index].est_life"></a-input-number>
          </template>
          <template slot="recog_life" slot-scope="text, record, index">
            <a-input-number
              v-model="sched3B_data[index].recog_life"
              @change="sched3BCompute(index)"
            ></a-input-number>
          </template>
          <template slot="allowable_input_tax" slot-scope="text, record, index">
            <a-input-number disabled v-model="sched3B_data[index].allowable_input_tax"></a-input-number>
          </template>
          <template slot="balance" slot-scope="text, record, index">
            <a-input-number disabled v-model="sched3B_data[index].balance"></a-input-number>
          </template>
          <template slot="action" slot-scope="text, record, index">
            <a-tooltip title="Remove">
              <a-button
                type="link"
                icon="delete"
                style="color: red;font-size: 24px;"
                @click="delete_sched3B(index)"
              />
            </a-tooltip>
          </template>
          <template slot="footer">
            <!-- <a-button @click="addSched3B">Add</a-button>
            <a-button>Save</a-button>-->

            <a-row type="flex" justify="space-between">
              <a-col :span="24" style="text-align: right;">
                <a-tooltip title="Total of Balance of Input Tax">
                  3B. Total Balance:
                  <span style="font-weight: bold;">{{formatAmount(total_balance)}}</span>
                </a-tooltip>
              </a-col>
            </a-row>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["show", "form"],
  data() {
    return {
      sched3B_data: [],
      columns_sched3B: [
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
          title: "Balance of Input Tax from previous period",
          dataIndex: "balance_input_tax",
          scopedSlots: { customRender: "balance_input_tax" }
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
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      data_source: []
    };
  },
  created() {
    console.log("Open Schedule 3B :::", JSON.stringify(this.form.sched3B));
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
    },
    total_balance() {
      var total_balance = 0;
      if (this.sched3B_data && this.sched3B_data.length)
        total_balance = this.sched3B_data
          .map(v => v.balance || 0)
          .reduce((p, c) => parseFloat(p) + parseFloat(c));
      this.$emit("total", total_balance);
      return total_balance;
    }
  },
  methods: {
    sched3BSave() {},
    delete_sched3B(index) {
      this.sched3B_data[index].splice(index, 1);
    },
    check_date_sched3B(value) {
      var only = this.formatDtMonth(this.form.return_period);
      var picked = this.formatDtMonth(value);
      console.log("check sched3B: " + value);
      if (picked !== only) {
        console.log("please choose base on return period");
      }
    },
    addSched3B() {
      console.log("add sched3B date of return: " + this.sched3B_data);

      if (this.sched3B_data == false) {
        console.log("sched 3 data fnun");
        this.sched3B_data.push({
          date_purchased: "",
          description: "",
          vat: 0,
          balance_input_tax: 0,
          tax_rate: 0,
          est_life: 0,
          recog_life: 0,
          allowable_input_tax: 0,
          balance: 0
        });
      } else {
        var index = this.sched3B_data.length - 1;
        console.log("last index sched3B_data: " + index);
        if (
          this.sched3B_data[index].date_purchased == "" ||
          this.sched3B_data[index].description == "" ||
          this.sched3B_data[index].vat <= 0 ||
          this.sched3B_data[index].balance_input_tax <= 0 ||
          this.sched3B_data[index].tax_rate <= 0 ||
          this.sched3B_data[index].est_life <= 0 ||
          this.sched3B_data[index].recog_life <= 0 ||
          this.sched3B_data[index].allowable_input_tax <= 0 ||
          this.sched3B_data[index].balance <= 0
        ) {
          console.log("please fill up all blank");
        } else {
          console.log("pushed");
          this.sched3B_data.push({
            date_purchased: "",
            description: "",
            vat: 0,
            balance_input_tax: 0,
            tax_rate: 0,
            est_life: 0,
            recog_life: 0,
            allowable_input_tax: 0,
            balance: 0
          });
        }
      }
    },
    sched3BCompute(index) {
      if (!this.sched3B_data[index].recog_life)
        this.sched3B_data[index].recog_life = 1;
      this.sched3B_data[index].balance_input_tax =
        this.sched3B_data[index].vat * 0.12;
      this.sched3B_data[index].allowable_input_tax =
        parseFloat(this.sched3B_data[index].balance_input_tax) /
        parseFloat(this.sched3B_data[index].recog_life);
      this.sched3B_data[index].balance =
        parseFloat(this.sched3B_data[index].balance_input_tax) -
        parseFloat(this.sched3B_data[index].allowable_input_tax);

      // var index = this.sched3B_data.length - 1;
      // this.form.inputTaxPurchaseCapGoods = 0;
      // this.sched3B_data[index].tax = value * 0.12;
      // this.sched3B_data.forEach(data => {
      //   this.form.inputTaxPurchaseCapGoods += data.vat;
      //   this.form.inputTaxPurchaseCapGoods += data.tax_rate;
      // });
    },
    showDrawer3B() {
      console.log("data source show drawer; " + this.dataSource);
      this.show_sched3B = true;
    },
    onClose_sched3B() {
      this.show_sched3B = false;
    },
    close() {
      this.$emit("close", {
        sched3B: this.sched3B_data
        // totalAtcAmount: this.deepCopy(this.total_atc_amount),
        // totalAtcOutput: this.deepCopy(this.total_atc_output_tax)
      });
    },
    disabledDate(current) {
      return (
        moment(current).year() !== moment(this.form.return_period).year() ||
        moment(current).month() !== moment(this.form.return_period).month()
      );
    }
  }
};
</script>

<style></style>
