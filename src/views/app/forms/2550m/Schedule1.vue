<template>
  <a-drawer
    title="Schedule 1 Schedule of Sales/Receipts and Output Tax"
    placement="right"
    :closable="true"
    @close="close"
    :visible="show"
    width="1000"
  >
    <a-button type="primary" @click="addAtc">ADD</a-button>
    <a-table bordered :dataSource="data_source" :columns="columns">
      <template slot="description" slot-scope="text, record">
        <span style="text-transform: uppercase">{{getDescription(record.atc)}}</span>
      </template>
      <template slot="atc" slot-scope="text, record, index">
        <a-select style="width 100%" @change="e => pickAtc(e, index)" :defaultValue="text || null">
          <a-select-option :key="null" disabled>Select an ATC</a-select-option>
          <a-select-option v-for="item in atc_list" :key="item.atc">{{item.atc}}</a-select-option>
        </a-select>
      </template>
      <template slot="amount" slot-scope="text, record, index">
        <a-input-number
          style="width: 100%;"
          :formatter="val => currencyFormater(val)"
          :parser="val => currencyParser(val)"
          :disabled="!record.atc"
          @change="e => changeAmount(e, index)"
          :value="text"
        ></a-input-number>
      </template>
      <template slot="output_tax" slot-scope="text, record, index">
        <span>{{formatAmount(getOutputTax(record.atc, index), true)}}</span>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <a-popconfirm placement="left" title="Sure to delete ?" @confirm="deleteAtc(index)">
          <a-icon type="delete" style="color: red; cursor: pointer;"></a-icon>
        </a-popconfirm>
      </template>
      <template slot="footer">
        <p align="left">
          <span>
            12A. Total Amount:
            <b>{{formatAmount(total_atc_amount, true)}}</b>
          </span>
          <br />
          <span>
            12B. Total Output Tax:
            <b>{{formatAmount(total_atc_output_tax, true)}}</b>
          </span>
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
      columns: [
        {
          title: "Industry Covered by VAT",
          dataIndex: "description",
          scopedSlots: { customRender: "description" },
          width: "35%"
        },
        {
          title: "ATC",
          dataIndex: "atc",
          width: "20%",
          scopedSlots: { customRender: "atc" }
        },
        {
          title: "Amount of Sales/Receipts For the Period",
          dataIndex: "amount",
          width: "20%",
          scopedSlots: { customRender: "amount" }
        },
        {
          title: "Output Tax for the Period",
          dataIndex: "output_tax",
          width: "20%",
          scopedSlots: { customRender: "output_tax" }
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
          description: "Mining & Quarrying",
          atc: "VQ010",
          rate: 0.12
        },
        {
          description: "Tobacco",
          atc: "VM040",
          rate: 0.25
        },
        {
          description: "Alcohol",
          atc: "VM110",
          rate: 0.12
        },
        {
          description: "Petroleum",
          atc: "VM120",
          rate: 0.25
        },
        {
          description: "Automobiles",
          atc: "VM130",
          rate: 0.12
        },
        {
          description: "Hotels, Motels",
          atc: "VB100",
          rate: 0.25
        },
        {
          description: "Restaurants, Caterers",
          atc: "VB101",
          rate: 0.12
        },
        {
          description: "Land Transport Cargo",
          atc: "VB105",
          rate: 0.25
        }
      ],
      sched1_data: [],
      data_source: []
    };
  },
  created() {
    console.log("Open Schedule 1 :::", JSON.stringify(this.form.sched1));
    if (this.form.sched1 || this.form.sched1.length)
      this.data_source = this.deepCopy(this.form.sched1);
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
    addAtc() {
      if (!this.data_source) this.data_source = [];
      const new_sched1 = {
        description: "",
        atc: "",
        amount: 0,
        output_tax: 0,
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
    changeAmount(val, index) {
      if (index > -1) this.data_source[index].amount = val;
    },
    getOutputTax(val, index) {
      if (val && index > -1) {
        const atc = this.atc_list.find(v => v.atc === val);
        var total = 0;
        if (atc) {
          total = this.data_source[index].amount * atc.rate;
          this.data_source[index].output_tax = total;
        }
        return total;
      }
      return 0;
    },
    deleteAtc(index) {
      this.data_source.splice(index, 1);
    },
    close() {
      console.log("closing...");
      console.log("this.data_source :", this.data_source);
      this.form.sched1 = this.deepCopy(this.data_source);
      console.log("this.form.sched1 :", this.form.sched1);
      this.form.totalAtcAmount = this.deepCopy(this.total_atc_amount);
      this.form.totalAtcOutput = this.deepCopy(this.total_atc_output_tax);
      this.$emit("close");
      // this.$emit("close", {
      //   sched1: this.deepCopy(this.data_source),
      //   totalAtcAmount: this.deepCopy(this.total_atc_amount),
      //   totalAtcOutput: this.deepCopy(this.total_atc_output_tax)
      // });
    }
  }
};
</script>

<style>
</style>