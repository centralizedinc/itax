<template>
  <a-drawer
    title="Schedule 1 – Remittance per BIR Form No. 1601-EQ"
    placement="right"
    :closable="true"
    @close="close"
    :visible="visible"
    width="1000"
  >
    <a-table bordered :dataSource="data_source" :columns="columns" :pagination="false">
      <template slot="desc" slot-scope="text">
        <span style="font-weight: bold">{{text}}</span>
      </template>

      <template slot="remitDate" slot-scope="text, record, index">
        <a-date-picker v-model="record.date_remittance" v-show="index<4" />
      </template>

      <template slot="bank" slot-scope="text, record, index">
        <a-input v-model="record.drawee_Bank_Code" v-show="index<4"></a-input>
      </template>
      <template slot="traNo" slot-scope="text, record, index">
        <a-input v-model="record.tra_ror_ar_num" v-show="index<4"></a-input>
      </template>

      <template slot="taxWithheld" slot-scope="text, record, index">
        <a-input-number v-model="record.tax_withheld"></a-input-number>
      </template>

      <template slot="penalties" slot-scope="text, record, index">
        <a-input-number v-model="record.penalties"></a-input-number>
      </template>

      <template slot="totAmtRemit" slot-scope="text, record, index">
        <a-input-number disabled :value="getTotalAmtRemit(index)"></a-input-number>
      </template>
    </a-table>
  </a-drawer>
</template>

<script>
import moment from "moment";

export default {
  props: ["show", "form"],
  data() {
    return {
      visible: true,

      data_source: [
        {
          desc: "1st Quarter",
          quarter: 1,
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0,
          penalties: 0,
          totAmtRemit: 0
        },
        {
          desc: "2nd Quarter",
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0,
          penalties: 0,
          totAmtRemit: 0
        },
        {
          desc: "3rd Quarter",
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0,
          penalties: 0,
          totAmtRemit: 0
        },
        {
          desc: "4th Quarter",
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0,
          penalties: 0,
          totAmtRemit: 0
        },
        {
          desc: "Total",
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0,
          penalties: 0,
          totAmtRemit: 0
        }
      ],
      columns: [
        {
          title: "Quarter",
          dataIndex: "desc",
          className: "column-amount",
          scopedSlots: { customRender: "desc" },
          width: "12%"
        },
        {
          title: "Date of Remittance (MM/DD/YYYY)",
          dataIndex: "remitDate",
          scopedSlots: { customRender: "remitDate" },
          width: "18%"
        },
        {
          title: "Drawee Bank/ Bank Code/ Agency",
          dataIndex: "bank",
          scopedSlots: { customRender: "bank" },
          width: "15%"
        },
        {
          title: "TRA/eROR/eAR Number",
          dataIndex: "traNo",
          scopedSlots: { customRender: "traNo" },
          width: "15%"
        },
        {
          title: "Taxes Withheld",
          dataIndex: "taxWithheld",
          className: "column-amount",
          scopedSlots: { customRender: "taxWithheld" },
          width: "15%"
        },
        {
          title: "Penalties",
          dataIndex: "penalties",
          className: "column-amount",
          scopedSlots: { customRender: "penalties" },
          width: "15%"
        },
        {
          title: "Total Amount Remitted",
          dataIndex: "totAmtRemit",
          className: "column-amount",
          scopedSlots: { customRender: "totAmtRemit" },
          width: "15%"
        }
      ]
    };
  },
  created() {
    console.log("show data: " + this.show);
  },

  methods: {
    moment,
    //total amount remitted
    getTotalAmtRemit(val) {
      var total = this.computeSum([
        this.data_source[val].tax_withheld,
        this.data_source[val].penalties
      ]);

      this.data_source[val].tot_amt_remitted = total;

      // total of total
      this.data_source[4].tax_withheld += this.data_source[val].tax_withheld;
      // this.data_source[4].penalties += this.data_source[val].penalties;
      // this.data_source[4].tot_amt_remitted += this.data_source[
      //   val
      // ].tot_amt_remitted = total;

      // for (var x = 0; x < 4; x++) {
      //   console.log(
      //     "datasoure### " + JSON.stringify(this.data_source[x].tax_withheld)
      //   );
      //   this.data_source[4].tax_withheld +=
      //     this.data_source[x].tax_withheld == undefined
      //       ? 0
      //       : this.data_source[x].tax_withheld;
      //   console.log(
      //     "datasoure### " + JSON.stringify(this.data_source[x].tax_withheld)
      //   );

      // this.data_source[4].penalties += this.data_source[x].penalties;
      // this.data_source[4].tot_amt_remitted += this.data_source[
      //   x
      // ].tot_amt_remitted;
      // }
      console.log(
        "datasoure " + JSON.stringify(this.data_source[4].tax_withheld)
      );

      // this.data_source;
      return total;
    },
    close() {
      this.$emit("close", {
        sched1: this.deepCopy(this.data_source)
        // total1: this.deepCopy(this.data_source[4].tax_withheld),
        // total2: this.deepCopy(this.data_source[4].penalties),
        // total3: this.deepCopy(this.data_source[4].tot_amt_remitted)
      });
    }
  }
};
</script>

<style>
th.column-amount,
td.column-amount {
  text-align: right !important;
}
</style>