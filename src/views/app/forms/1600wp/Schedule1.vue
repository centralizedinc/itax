<template>
  <a-drawer
    title="ATC"
    placement="right"
    :closable="true"
    @close="close"
    :visible="show==2"
    width="1300"
  >
    <a-button type="primary" @click="addSched">ADD</a-button>

    <a-table bordered :dataSource="data_source" :columns="columns" :pagination="false">
      <template slot="seq_no" slot-scope="text, record, index">
        <!-- <a-input-number></a-input-number> -->
      </template>
      <template slot="tin" slot-scope="text, record, index">
        <a-input-number v-model="record.tin"></a-input-number>
      </template>
      <template slot="name" slot-scope="text, record, index">
        <a-input v-model="record.name"></a-input>
      </template>
      <template slot="atc_code" slot-scope="text, record, index">
        <a-select style="width 100%" @change="e => pickAtc(e, index)" :defaultValue="text || null">
          <a-select-option :key="null" disabled>Select an ATC</a-select-option>
          <a-select-option
            :title="item.nature_of_payment"
            style="width:100%"
            v-for="item in atc_list"
            :key="item"
            width="100%"
          >{{item.atc_code}}</a-select-option>
        </a-select>
      </template>
      <template slot="nature_of_payment" slot-scope="text, record, index">
        <span>{{record.nature_of_payment}}</span>
      </template>
      <template slot="amount" slot-scope="text, record, index">
        <a-input-number :value="text" style="width:10vw" @change="e => computeAtc(e, index)"></a-input-number>
      </template>
      <template slot="rate" slot-scope="text, record, index">
        <span>{{record.rate*100}}%</span>
      </template>
      <template slot="tax_required" slot-scope="text, record, index">
        <span>{{record.tax_required}}</span>
      </template>
    </a-table>
    <!-- amount:: {{total_amount}} :: tax:: {{total_tax}} -->
  </a-drawer>
</template>
<script>
// import { isNumber } from "util";
export default {
  props: ["form", "show"],
  data() {
    return {
      visible: true,
      total_amount: 0,
      total_tax: 0,
      columns: [
        {
          title: "SEQ. NO.",
          dataIndex: "seq_no",
          width: "15%",
          spocedSlots: { customRender: "seq_no" }
        },
        {
          title: "PAYEE TIN",
          dataIndex: "tin",
          width: "20%",
          scopedSlots: { customRender: "tin" }
        },
        {
          title:
            "INDIVIDUAL/CORPORATION (LAST NAME, FIRST NAME, MIDDLE NAME FOR INDIVIDUALS OR REGISTERED NAME FOR NON-INDIVIDUALS)",
          dataIndex: "name",
          width: "25%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "ATC",
          dataIndex: "atc_code",
          width: "10%",
          scopedSlots: { customRender: "atc_code" }
        },
        {
          title: "NATURE OF PAYMENT",
          dataIndex: "nature_of_payment",
          scopedSlots: { customRender: "nature_of_payment" },
          width: "35%"
        },
        {
          title: "AMOUNT",
          dataIndex: "amount",
          width: "15%",
          scopedSlots: { customRender: "amount" }
        },
        {
          title: "TAX RATE",
          dataIndex: "rate",
          width: "5%",
          scopedSlots: { customRender: "rate" }
        },
        {
          title: "TAX REQUIRED TO BE WITHHELD",
          dataIndex: "tax_required",
          width: "10%",
          scopedSlots: { customRender: "tax_required" }
        }
      ],
      data_source: [],
      atc_list: [
        {
          atc_code: "WB 191",
          nature_of_payment:
            "Tax on winnings from double, forecast/quinella and trifecta bets on horse races paid by Government Withholding Agent",
          tax_base: 0,
          rate: 0.04,
          tax_required: 0
        },
        {
          atc_code: "WB 192",
          nature_of_payment:
            "Tax on winnings or prizes paid to winners of winning horse race tickets other than double, forecast/quinella and trifecta bets; & owners of winning race horses paid by Government Withholding Agent",
          tax_base: 0,
          rate: 0.1,
          tax_required: 0
        },
        {
          atc_code: "WB 193",
          nature_of_payment:
            "Tax on winnings from double, forecast/quinella and trifecta bets on horse races paid by Private Withholding Agent",
          tax_base: 0,
          rate: 0.04,
          tax_required: 0
        },
        {
          atc_code: "WB 194",
          nature_of_payment:
            "Tax on winnings or prizes paid to winners of winning horse race tickets other than double, forecast/quinella and trifecta bets; and owners of winning race horses paid by Private Withholding Agent",
          tax_base: 0,
          rate: 0.1,
          tax_required: 0
        }
      ]
    };
  },
  methods: {
    addSched() {
      if (!this.data_source) this.data_source = [];
      const new_sched1 = {
        seq_no: 0,
        tin: "",
        name: "",
        atc_code: "",
        nature_of_payment: "",
        amount: 0,
        rate: null,
        tax_required: null
      };
      this.data_source = [...this.data_source, new_sched1];
      console.log("add sched data source: " + JSON.stringify(this.data_source));
    },
    pickAtc(val, index) {
      if (index > -1) {
        console.log("pick atc_code val: " + JSON.stringify(val));
        this.data_source[index].atc_code = val.atc_code;
        this.data_source[index].nature_of_payment = val.nature_of_payment;
        this.data_source[index].rate = val.rate;
        this.data_source[index].tax_required = 0;
        this.data_source[index].amount = 0;
      }
    },
    computeAtc(val, index) {
      //   this.atc_code_list = [];
      if (index > -1) {
        console.log("compute atc_code");
        this.data_source[index].amount = val;
        this.data_source[index].tax_required =
          this.data_source[index].amount * this.data_source[index].rate;
        this.total_tax = 0;
        this.total_amount = 0;
        this.data_source.forEach(data => {
          // console.log("data amount: " + JSON.stringify(this.data.amount));
          // console.log("this is taxwithheld : " + data.tax_required);
          this.total_amount += data.amount;
          this.total_tax += data.tax_required;
          console.log("total amount: " + JSON.stringify(this.total_amount));
          //   this.atc_code_list.push({
          //     atc_code_code: data.atc_code,
          //     nature_of_income_payment: data.nature_of_payment,
          //     tax_base: data.tax_base,
          //     tax_rate: data.rate,
          //     tax_withheld: data.tax_required
          //   });
        });
      }
      return this.data_source[index].tax_required.toFixed(2);
    },
    close() {
      // console.log(
      //   "closing schedule 1 act list data source: " +
      //     JSON.stringify(this.data_source)
      // );
      this.$emit("close", {
        sched1: this.deepCopy(this.data_source),
        total_amount: this.deepCopy(this.total_amount),
        total_tax: this.deepCopy(this.total_tax)
      });
    }
  }
};
</script>
<style>
</style>