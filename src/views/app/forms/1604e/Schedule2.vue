<template>
  <a-drawer
    title="Schedule 2 – Remittance per BIR Form No. 1606"
    placement="right"
    :closable="true"
    @close="close"
    :visible="visible"
    width="1000"
  >
    <a-table bordered :dataSource="data_source" :columns="columns" :pagination="false">
      <template slot="desc" slot-scope="text">
        <span>{{text}}</span>
      </template>

      <template slot="remitDate" slot-scope="text, record, index">
        <a-date-picker />
      </template>

      <template slot="bank" slot-scope="text, record, index">
        <a-input></a-input>
      </template>

      <template slot="traNo" slot-scope="text, record, index">
        <a-input></a-input>
      </template>

      <template slot="taxWithheld" slot-scope="text, record, index">
        <a-input></a-input>
      </template>

      <template slot="penalties" slot-scope="text, record, index">
        <a-input-number></a-input-number>
      </template>

      <template slot="totAmtRemit" slot-scope="text, record, index">
        <a-input-number></a-input-number>
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
          desc: "January",
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0.0,
          penalties: 0.0,
          totAmtRemit: 0.0
        },
        {
          desc: "February",
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0.0,
          penalties: 0.0,
          totAmtRemit: 0.0
        },
        {
          desc: "March",
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0.0,
          penalties: 0.0,
          totAmtRemit: 0.0
        },
        {
          desc: "April",
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0.0,
          penalties: 0.0,
          totAmtRemit: 0.0
        },
        {
          desc: "May",
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0.0,
          penalties: 0.0,
          totAmtRemit: 0.0
        },
        {
          desc: "June",
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0.0,
          penalties: 0.0,
          totAmtRemit: 0.0
        },
        {
          desc: "July",
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0.0,
          penalties: 0.0,
          totAmtRemit: 0.0
        },
        {
          desc: "August",
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0.0,
          penalties: 0.0,
          totAmtRemit: 0.0
        },
        {
          desc: "September",
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0.0,
          penalties: 0.0,
          totAmtRemit: 0.0
        },
        {
          desc: "October",
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0.0,
          penalties: 0.0,
          totAmtRemit: 0.0
        },
        {
          desc: "November",
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0.0,
          penalties: 0.0,
          totAmtRemit: 0.0
        },
        {
          desc: "December",
          remitDate: "",
          bank: "",
          traNo: "",
          taxWithheld: 0.0,
          penalties: 0.0,
          totAmtRemit: 0.0
        },
        {
          desc: "Total",
          taxWithheld: 0.0,
          penalties: 0.0,
          totAmtRemit: 0.0
        }
      ],
      columns: [
        {
          title: "desc",
          dataIndex: "desc",
          className: "column-style",
          scopedSlots: { customRender: "esc" },
          width: "12%"
        },
        {
          title: "Date of Remittance (MM/DD/YYYY)",
          dataIndex: "remitDate",
          className: "column-style",
          scopedSlots: { customRender: "remitDate" },
          width: "18%"
        },
        {
          title: "Drawee Bank/ Bank Code/ Agency",
          dataIndex: "bank",
          className: "column-style",
          scopedSlots: { customRender: "bank" },
          width: "15%"
        },
        {
          title: "TRA/eROR/eAR Number",
          dataIndex: "traNo",
          className: "column-style",
          scopedSlots: { customRender: "traNo" },
          width: "15%"
        },
        {
          title: "Taxes Withheld",
          dataIndex: "taxWithheld",
          className: "column-style",
          scopedSlots: { customRender: "taxWithheld" },
          width: "15%"
        },
        {
          title: "Penalties",
          dataIndex: "penalties",
          className: "column-style",
          scopedSlots: { customRender: "penalties" },
          width: "15%"
        },
        {
          title: "Total Amount Remitted",
          dataIndex: "totAmtRemit",
          className: "column-style",
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

    close() {
      this.$emit("close");
    }
  }
};
</script>

<style>
th.column-style,
td.column-style {
  text-align: center !important;
}
th.column-amount,
td.column-amount {
  text-align: right !important;
}
</style>