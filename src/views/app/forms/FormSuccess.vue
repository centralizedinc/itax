<template>
  <a-modal
    :visible="show"
    class="form-success-modal"
    :title="`You have successfully submitted Form ${details.form_type.toUpperCase()}`"
    :closable="false"
  >
    <a-card slot="footer" hoverable>
      <a-card-grid class="action-grid payment-button" @click="$emit('payment')">
        <a-icon type="credit-card" /> Payment
      </a-card-grid>
      <a-card-grid class="action-grid" @click="$emit('close')">
        <a-icon type="close-circle" /> Close
      </a-card-grid>
    </a-card>
    <a-card style="width:100%">
      <a-row type="flex" justify="center" align="middle" :gutter="10">
        <a-col :span="24" style="text-align: center; margin-bottom: 20px;">
          <a-icon
            type="check-circle"
            :style="{ fontSize: '64px' }"
            theme="twoTone"
            twoToneColor="#52c41a"
          />
        </a-col>
        <template v-for="(item, index) in items">
          <a-col :key="`t${index}`" :span="10" style="text-align: right; margin: 5px 0;">{{item.title}}:</a-col>
          <a-col :key="`f${index}`" :span="14" style="text-align: left; margin: 5px 0;text-transform: uppercase;">
            <span>
              <b>{{details[item.field]}}</b>
            </span>
          </a-col>
        </template>
      </a-row>
    </a-card>
  </a-modal>
</template>

<script>
export default {
  props: ["show", "details"],
  data() {
    return {
      form_layout: {
        label_col: { span: 2 },
        wrapper_col: { span: 22 }
      },
      items: [
        {
          title: "Reference No",
          field: "reference_no"
        },
        {
          title: "Form Type",
          field: "form_type"
        },
        {
          title: "TIN",
          field: "tin"
        },
        {
          title: "Registered Name",
          field: "registered_name"
        },
        {
          title: "Taxpayer Type",
          field: "taxpayer_type"
        },
        {
          title: "Return Period",
          field: "return_period"
        },
        {
          title: "Due Date",
          field: "due_date"
        },
        {
          title: "Tax Due",
          field: "tax_due"
        },
        {
          title: "Total Penalties",
          field: "total_penalties"
        },
        {
          title: "Total Amount Payable",
          field: "total_amount_payable"
        }
      ]
    };
  },
  created(){
    console.log("form success details data: " + JSON.stringify(this.details))
  }
};
</script>

<style>
.form-success-modal .ant-modal-footer {
  padding: 0px;
}

.form-success-modal .action-grid {
  width: 50%;
  text-align: center;
  padding: 12px;
  font-size: 16px;
}

.form-success-modal .payment-button {
  color: white;
  background: #43A0EF;
}
</style>