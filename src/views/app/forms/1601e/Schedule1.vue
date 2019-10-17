<template>
  <a-drawer
    title="Alphanumeric Tax Codes (ATC)"
    placement="right"
    :closable="true"
    @close="close"
    :visible="show"
    width="1000"
  >
    <a-button type="primary">ADD</a-button>
    <a-table bordered :dataSource="data_source" :columns="columns">
      <template slot="description" slot-scope="text, record">
        <span>{{getDescription(record.atc)}}</span>
      </template>
      <template slot="atc" slot-scope="text, record, index">
        <a-select style="width 100%" @change="e => pickAtc(e, index)" :defaultValue="text || null">
          <a-select-option :key="null" disabled>Select an ATC</a-select-option>
          <a-select-option v-for="item in atc_list" :key="item.atc">{{item.atc}}></a-select-option>
        </a-select>
      </template>

      <template slot="amount" slot-scope="text, record, index">
        <a-input-number
          :disabled="!record.atc"
          @change="e => changeAmount(e, index)"
          :value="text"
          placeholder="text"
        ></a-input-number>
      </template>

      <template slot="output_tax" slot-scope="text, record, index">
        <span>{{getOutputTax(record.atc, index)}}</span>
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
          width: "45%"
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
          title: "TAX RATE(%)",
          dataIndex: "tax_rate",
          width: "20%",
          scopedSlots: { customRender: "tax_rate" }
        },
        {
          title: "TAX REQUIRED TO BE WITHHELD",
          dataIndex: "tax_rate",
          width: "20%",
          scopedSlots: { customRender: "tax_rate" }
        }
      ]
    };
  }
};
</script>

<style>
</style>