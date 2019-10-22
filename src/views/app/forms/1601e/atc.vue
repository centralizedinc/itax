<template>
  <div>
    <a-drawer
      title="ATC"
      :visible="visible"
      :closable="false"
      @close="onClose"
      :width="800"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <a-button type="primary" @click="addAtc">ADD</a-button>
      <a-table bordered :dataSource="data_source" :columns="columns">
        <template slot="description" slot-scope="text, record">
          <span>{{record.atc}}</span>
        </template>
        <template slot="atc" slot-scope="text, record, index">
          <a-select
            style="width 100%"
            @change="e => pickAtc(e, index)"
            :defaultValue="text || null"
          >
            <a-select-option :key="null" disabled>Select an ATC</a-select-option>
            <a-select-option v-for="item in atc_list" :key="item.atc">{{item.atc}}</a-select-option>
          </a-select>
        </template>
        <!-- <template slot="amount" slot-scope="text, record, index">
          <a-input-number
            :disabled="!record.atc"
            @change="e => changeAmount(e, index)"
            :value="text"
            placeholder="text"
          ></a-input-number>
        </template>-->
        <!-- <template slot="output_tax" slot-scope="text, record, index">
          <span>{{getOutputTax(record.atc, index)}}</span>
        </template>-->
        <template slot="operation" slot-scope="text, record, index">
          <a-popconfirm placement="left" title="Sure to delete ?" @confirm="deleteAtc(index)">
            <a-icon type="delete" style="color: red; cursor: pointer;"></a-icon>
          </a-popconfirm>
        </template>
        <!-- <template slot="footer">
          <p align="left">
            <span>
              12A. Total Amount:
              <b>{{}}</b>
            </span>
            <br />
            <span>
              12B. Total Output Tax:
              <b>{{total_atc_output_tax}}</b>
            </span>
          </p>
        </template>-->
      </a-table>
    </a-drawer>
  </div>
</template>
<script>
export default {
  props: ["form", "show"],
  data() {
    return {
      visible: true,
      data_source: [],
      form_layout: {
        label_col: { span: 2 },
        wrapper_col: { span: 22 }
      },
      columns: [
        {
          title: "NATURE OF INCOME PAYMENT",
          dataIndex: "nature_income_payment",
          scopedSlots: { customRender: "nature_income_payment" },
          width: "35%"
        },
        {
          title: "ATC",
          dataIndex: "atc",
          width: "20%",
          scopedSlots: { customRender: "atc" }
        },
        {
          title: "TAX BASE",
          dataIndex: "tax_base",
          width: "20%",
          scopedSlots: { customRender: "tax_base" }
        },
        {
          title: "TAX RATE",
          dataIndex: "tax_rate",
          width: "20%",
          scopedSlots: { customRender: "tax_rate" }
        },
        {
          title: "TAX REQUIRED TO BE WITHHELD",
          dataIndex: "tax_required_withheld",
          width: "20%",
          scopedSlots: { customRender: "tax_required_withheld" }
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
          rate: 0.1
        },
        {
          description: "PROFL TALENT FEE PD TO JURIDICL (GROSS INC > 720,000)",
          atc: "WC011",
          rate: 0.15
        },
        {
          description: "RENTALS (CORP.)",
          atc: "WC100",
          rate: 0.05
        }
      ]
    };
  },
  methods: {
    onClose() {
      this.visible = false;
    },
    addAtc() {}
  }
};
</script>
<style>
</style>