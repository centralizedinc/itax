<template>
  <div>
    <a-drawer
      title="Schedule III - Tax Credits/Payments"
      :visible="visible"
      :closable="false"
      @close="onClose"
      :width="720"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <a-form :form="form" layout="vertical" hideRequiredMark>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item style="margin-left: 103px;" label="A) Taxpayer/Filer"></a-form-item>
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="55."
            >
              <a-input-number
                v-model="form.sched3.taxpayer.year_excess_credits"
                style="width:100%"
                placeholder="Prior Year's Excess Credits"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item style="margin-left: 103px;" label="B) Spouse"></a-form-item>
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input-number
                v-model="form.sched3.spouse.year_excess_credits"
                style="width:100%"
                placeholder="Prior Year's Excess Credits"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="56."
            >
              <a-input-number
                v-model="form.sched3.taxpayer.payment_previous_quarter"
                style="width:100%"
                placeholder="Tax Payment/s for the Previous Quarter/s"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input-number
                v-model="form.sched3.spouse.payment_previous_quarter"
                style="width:100%"
                placeholder="Tax Payment/s for the Previous Quarter/s"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="57."
            >
              <a-input-number
                v-model="form.sched3.taxpayer.creditable_tax_withheld"
                style="width:100%"
                placeholder="Creditable Tax Withheld for the Previous Quarter/s"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input-number
                v-model="form.sched3.spouse.creditable_tax_withheld"
                style="width:100%"
                placeholder="Creditable Tax Withheld for the Previous Quarter/s"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="58."
            >
              <a-input-number
                v-model="form.sched3.taxpayer.creditable_tax_withheld_per_bir"
                style="width:100%"
                placeholder="Creditable Tax Withheld per BIR Form No. 2307 for this Quarter"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input-number
                v-model="form.sched3.spouse.creditable_tax_withheld_per_bir"
                style="width:100%"
                placeholder="Creditable Tax Withheld per BIR Form No. 2307 for this Quarter"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="59."
            >
              <a-input-number
                v-model="form.sched3.taxpayer.tax_paid_return"
                style="width:100%"
                placeholder="Tax Paid in Return Previously Filed, if this is an Amended Return"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input-number
                style="width:100%"
                v-model="form.item59b"
                placeholder="Tax Paid in Return Previously Filed, if this is an Amended Return"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="60."
            >
              <a-input-number
                v-model="form.sched3.taxpayer.foriegn_tax_credits"
                style="width:100%"
                placeholder="Foreign Tax Credits, if applicable"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input-number
                v-model="form.item60b"
                style="width:100%"
                placeholder="Foreign Tax Credits, if applicable"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="61."
            >
              <a-input-number
                v-model="form.sched3.taxpayer.other_tax_credit"
                style="width:100%"
                placeholder="Other Tax Credits/Payments (specify)"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input-number
                v-model="form.item61b"
                style="width:100%"
                placeholder="Other Tax Credits/Payments (specify)"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="62."
            >
              <a-input-number
                :value="total_tax_credit()"
                style="width:100%"
                placeholder="Total Tax Credits/Payments (Sum of Items 55 to 61) (To Part III, Item 27)"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input-number
                :value="spouse_total_tax_credit()"
                style="width:100%"
                placeholder="Total Tax Credits/Payments (Sum of Items 55 to 61) (To Part III, Item 27)"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="63."
            >
              <a-input
                :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                placeholder="Tax Payable/(Overpayment) (Item 46 or 54, Less Item 62) (To part III, Item 28)"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input
                :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                placeholder="Tax Payable/(Overpayment) (Item 46 or 54, Less Item 62) (To part III, Item 28)"
              />
            </a-form-item>
          </a-col>
        </a-row>-->
      </a-form>
      <div
        :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }"
      >
        <a-button :style="{marginRight: '8px'}" @click="handleOk">Cancel</a-button>
        <a-button @click="handleOk" type="primary">Submit</a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  props: ["form", "show"],
  data() {
    return {
      visible: true,
      formatter: {
        amount: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      parser: {
        amount: value => value.replace(/\₱\s?|(,*)/g, "")
      },
      form_layout: {
        label_col: { span: 2 },
        wrapper_col: { span: 22 }
      }
    };
  },
  created() {
    console.log("show sched 3: " + this.show);
    // this.visible = this.show;
  },
  watch: {
    show() {
      console.log("show watch!!: " + this.show);
      if (this.show == 3) {
        this.visible = true;
      }
      console.log("visible! : " + this.visible);
    }
  },
  methods: {
    onClose() {
      this.visible = false;
    },
    total_tax_credit() {
      var total = this.computeSum([
        this.form.sched3.taxpayer.year_excess_credits,
        this.form.sched3.taxpayer.payment_previous_quarter,
        this.form.sched3.taxpayer.creditable_tax_withheld,
        this.form.sched3.taxpayer.creditable_tax_withheld_per_bir,
        this.form.sched3.taxpayer.tax_paid_return,
        this.form.sched3.taxpayer.foriegn_tax_credits,
        this.form.sched3.taxpayer.other_tax_credit
      ]);
      this.form.sched3.taxpayer.total_tax_credit = total;
      this.form.taxpayer_tax_due = this.form.sched3.taxpayer.total_tax_credit;
      return total;
    },
    spouse_total_tax_credit() {
      var total = this.computeSum([
        this.form.sched3.spouse.year_excess_credits,
        this.form.sched3.spouse.payment_previous_quarter,
        this.form.sched3.spouse.creditable_tax_withheld,
        this.form.sched3.spouse.creditable_tax_withheld_per_bir,
        this.form.sched3.spouse.tax_paid_return,
        this.form.sched3.spouse.foriegn_tax_credits,
        this.form.sched3.spouse.other_tax_credit
      ]);
      this.form.sched3.spouse.total_tax_credit = total;
      this.form.spouse_tax_due = this.form.sched3.spouse.total_tax_credit;
      return total;
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      // this.show = 0;
      this.visible = false;
    }
  }
};
</script>