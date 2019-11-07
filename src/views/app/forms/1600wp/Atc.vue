<template>
  <a-drawer
    title="ATC"
    placement="right"
    :closable="true"
    @close="close"
    :visible="show==1"
    width="1000"
  >
    <a-table bordered :dataSource="data_source" :columns="columns" :pagination="false">
      <template slot="tax_base" slot-scope="text, record, index">
        <a-input-number :value="text" style="width:10vw" @change="e => computeAtc(e, index)"></a-input-number>
      </template>

      <template slot="rate" slot-scope="text, record, index">
        <span>{{record.rate*100}}%</span>
      </template>
      <template slot="tax_withheld" slot-scope="text, record, index">
        <span>{{record.tax_withheld}}</span>
      </template>
    </a-table>
    <!-- {{total}} -->
  </a-drawer>
</template>
<script>
export default {
  props: ["form", "show"],
  data() {
    return {
      visible: true,
      total: 0,
      columns: [
        {
          title: "ATC",
          dataIndex: "atc",
          width: "5%",
          scopedSlots: { customRender: "atc" }
        },
        {
          title: "NATURE OF PAYMENT",
          dataIndex: "nature_payment",
          scopedSlots: { customRender: "nature_payment" },
          width: "35%"
        },
        {
          title: "TAX BASE",
          dataIndex: "tax_base",
          width: "10%",
          scopedSlots: { customRender: "tax_base" }
        },
        {
          title: "RATE",
          dataIndex: "rate",
          width: "5%",
          scopedSlots: { customRender: "rate" }
        },
        {
          title: "TAX REQUIRED TO BE WITHHELD",
          dataIndex: "tax_withheld",
          width: "10%",
          scopedSlots: { customRender: "tax_withheld" }
        }
      ],
      data_source: [
        {
          atc: "WB 191",
          nature_payment:
            "Tax on winnings from double, forecast/quinella and trifecta bets on horse races paid by Government Withholding Agent",
          tax_base: null,
          rate: 0.04,
          tax_withheld: null
        },
        {
          atc: "WB 192",
          nature_payment:
            "Tax on winnings or prizes paid to winners of winning horse race tickets other than double, forecast/quinella and trifecta bets; & owners of winning race horses paid by Government Withholding Agent",
          tax_base: null,
          rate: 0.1,
          tax_withheld: null
        },
        {
          atc: "WB 193",
          nature_payment:
            "Tax on winnings from double, forecast/quinella and trifecta bets on horse races paid by Private Withholding Agent",
          tax_base: null,
          rate: 0.04,
          tax_withheld: null
        },
        {
          atc: "WB 194",
          nature_payment:
            "Tax on winnings or prizes paid to winners of winning horse race tickets other than double, forecast/quinella and trifecta bets; and owners of winning race horses paid by Private Withholding Agent",
          tax_base: null,
          rate: 0.1,
          tax_withheld: null
        }
      ]
    };
  },
  methods: {
    computeAtc(val, index) {
      //   this.atc_list = [];
      if (index > -1) {
        this.data_source[index].tax_base = val;
        this.data_source[index].tax_withheld =
          this.data_source[index].tax_base * this.data_source[index].rate;
        this.total = 0;
        this.data_source.forEach(data => {
          console.log("this is taxwithheld : " + data.tax_withheld);
          this.total += data.tax_withheld;
          //   this.atc_list.push({
          //     atc_code: data.atc,
          //     nature_of_income_payment: data.nature_payment,
          //     tax_base: data.tax_base,
          //     tax_rate: data.rate,
          //     tax_withheld: data.tax_withheld
          //   });
        });
      }
      return this.data_source[index].tax_withheld.toFixed(2);
    },
    close() {
      console.log("closing atc: " + JSON.stringify(this.data_source));
      this.$emit("close", {
        atc_list: this.deepCopy(this.data_source),
        total_amount_payable: this.deepCopy(this.total)
      });
    }
  }
};
</script>
<style>
</style>