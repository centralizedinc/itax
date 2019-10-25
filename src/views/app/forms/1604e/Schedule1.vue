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
        <a-date-picker v-model="form.sched1.date_remittance" />
      </template>

      <template slot="bank" slot-scope="text, record, index">
        <a-input v-model="form.sched1.drawee_Bank_Code"></a-input>
      </template>

      <template slot="traNo" slot-scope="text, record, index">
        <a-input v-model="form.sched1.tra_ror_ar_num"></a-input>
      </template>

      <template slot="taxWithheld" slot-scope="text, record, index">
        <a-input-number v-model="form.sched1.tax_withheld"></a-input-number>
      </template>

      <template slot="penalties" slot-scope="text, record, index">
        <a-input-number v-model="form.sched1.penalties"></a-input-number>
      </template>

      <template slot="totAmtRemit" slot-scope="text, record, index">
        <a-input-number disabled :value="getTotalAmtRemit()"></a-input-number>
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
          key: "1",
          desc: "1st Quarter",
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0.0,
          penalties: 0.0,
          totAmtRemit: 0.0
        },
        {
          key: "2",
          desc: "2nd Quarter",
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0.0,
          penalties: 0.0,
          totAmtRemit: 0.0
        },
        {
          desc: "3rd Quarter",
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0.0,
          penalties: 0.0,
          totAmtRemit: 0.0
        },
        {
          desc: "4th Quarter",
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0.0,
          penalties: 0.0,
          totAmtRemit: 0.0
        },
        {
          desc: "Total",
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0.0,
          penalties: 0.0,
          totAmtRemit: 0.0
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
        this.form.sched1.tax_withheld,
        this.form.sched1.penalties
      ]);
      this.form.sched1.tot_amt_remitted = total;
      return total;
    },
    close() {
      this.$emit("close");
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