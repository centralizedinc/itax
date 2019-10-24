<template>
  <a-drawer
    title="Alphanumeric Tax Codes (ATC)"
    placement="right"
    :closable="true"
    @close="close"
    :visible="show"
    width="1000"
  >
    <a-button type="primary" @click="addAtc">ADD</a-button>
    <a-table bordered :dataSource="data_source" :columns="columns">
      <template slot="description" slot-scope="text, record">
        <span>{{getDescription(record.atc)}}</span>
      </template>
      <template slot="atc" slot-scope="text, record, index">
        <a-select style="width 100%" @change="e => pickAtc(e, index)" :defaultValue="text || null">
          <a-select-option :key="null" disabled>Select an ATC</a-select-option>
          <a-select-option v-for="item in atc_list" :key="item.atc">{{item.atc}}</a-select-option>
        </a-select>
      </template>

      <template slot="taxRate" slot-scope="text, record, index">
        <span>{{getTaxRate(record.atc, index)}}</span>
      </template>

      <template slot="taxBase" slot-scope="text, record, index">
        <a-input-number
          :disabled="!record.atc"
          @change="e => changeTaxBase(e, index)"
          :value="text"
          placeholder="text"
        ></a-input-number>
      </template>

      <template slot="taxWithheld" slot-scope="text, record, index">
        <span>{{getTaxWithheld(record.atc, index)}}</span>
      </template>

      <template slot="operation" slot-scope="text, record, index">
        <a-popconfirm placement="left" title="Sure to delete ?" @confirm="deleteAtc(index)">
          <a-icon type="delete" style="color: red; cursor: pointer;"></a-icon>
        </a-popconfirm>
      </template>
    </a-table>
  </a-drawer>
</template>

<script>
export default {
  props: ["show", "form"],
  data() {
    return {
      columns: [
        {
          title: "NATURE OF INCOME PAYMENT",
          dataIndex: "description",
          scopedSlots: { customRender: "description" },
          width: "43%"
        },
        {
          title: "ATC",
          dataIndex: "atc",
          width: "20%",
          scopedSlots: { customRender: "atc" }
        },
        {
          title: "TAX BASE",
          dataIndex: "taxBase",
          width: "20%",
          scopedSlots: { customRender: "taxBase" }
        },
        {
          title: "TAX RATE(%)",
          dataIndex: "taxRate",
          width: "20%",
          scopedSlots: { customRender: "tax_rate" }
        },
        {
          title: "TAX REQUIRED TO BE WITHHELD",
          dataIndex: "taxWithheld",
          width: "20%",
          scopedSlots: { customRender: "taxWithheld" }
        },
        {
          title: "",
          dataIndex: "operation",
          width: "5%",
          scopedSlots: { customRender: "operation" }
        }
      ],
      atc_list: [
        {
          description: "PROFL TALENT FEE PD TO JURIDICL (GROSS INC <= 720,000)",
          atc: "WC010",
          rate: 10.0
        },
        {
          description:
            "EWT-INC PYMTS MADE BY TOP 20,000 CORP TO LOCAL SUPP OF GOODS",
          atc: "WC158",
          rate: 1.0
        }
      ],
      data_source: []
    };
  },
  methods: {
    addAtc() {
      if (!this.data_source) this.data_source = [];
      const new_sched1 = {
        description: "",
        atc: "",
        taxBase: 0,
        taxRate: 0,
        taxWithheld: 0,
        rate: 0
      };
      this.data_source = [...this.data_source, new_sched1];
    },
    pickAtc(val, index) {
      if (index > -1) this.data_source[index].atc = val;
    },
    getDescription(val) {
      console.log("val :", val);
      const atc = this.atc_list.find(v => v.atc === val);
      return atc ? atc.description : "";
    },
    getTaxWithheld(val, index) {
      if (val && index > -1) {
        const atc = this.atc_list.find(v => v.atc === val);
        var total = 0;
        if (atc) {
          total = this.data_source[index].amount * atc.rate;
          this.data_source[index].taxWitheld = total;
        }
        return total;
      }
      return 0;
    },
    deleteAtc(index) {
      this.data_source.splice(index, 1);
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style>
</style>