<template>
  <div>
    <a-drawer
      title="Schedule II – For 8% IT Rate"
      :visible="visible"
      @cancel="$emit('close')"
      @ok="handleOk"
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
              label="47."
            >
              <a-input
                v-model="form.sched2.taxpayer.total_sales_revenue"
                :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                placeholder="Sales/Revenues/Receipts/Fees"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item style="margin-left: 103px;" label="B) Spouse"></a-form-item>
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input
                v-model="form.sched2.spouse.total_sales_revenue"
                :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                placeholder="Sales/Revenues/Receipts/Fees"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="48."
            >
              <a-input
                v-model="form.sched2.taxpayer.total_operation_income"
                :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                placeholder="Add: Non-Operating Income (specify)"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input
                v-model="form.sched2.spouse.total_operation_income"
                :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                placeholder="Add: Non-Operating Income (specify)"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="49."
            >
              <a-input
                :value="total_income_quarter()"
                :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                placeholder="Total Income for the quarter (Sums of Items 47 and 48)"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input
                :value="spouse_total_income_quarter()"
                :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                placeholder="Total Income for the quarter (Sums of Items 47 and 48)"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="50."
            >
              <a-input
                v-model="form.sched2.taxpayer.previous_quarter_taxable_income"
                :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                placeholder="Add: Total Taxable Income/(Loss) Previous Quarter (Item 51 of previous quarter)"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input
                v-model="form.sched2.spouse.previous_quarter_taxable_income"
                :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                placeholder="Add: Total Taxable Income/(Loss) Previous Quarter (Item 51 of previous quarter)"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="51."
            >
              <a-input
                :value="total_cumulative_income()"
                :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                placeholder="Cumulative Taxable Income/(Loss) as of This Quarter (Sum of Items 49 and 50)"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input
                :value="spouse_total_cumulative_income()"
                :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                placeholder="Cumulative Taxable Income/(Loss) as of This Quarter (Sum of Items 49 and 50)"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="52."
            >
              <a-input
                v-model="form.sched2.taxpayer.less_allowable_reduction"
                :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                placeholder="Less: Allowable reduction from gross sales/reciepts and other non-operating income of purely self-employed individuals and/or professionals in the amount of ₱250,00"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input
                v-model="form.sched2.spouse.less_allowable_reduction"
                :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                placeholder="Less: Allowable reduction from gross sales/reciepts and other non-operating income of purely self-employed individuals and/or professionals in the amount of ₱250,00"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="53."
            >
              <a-input
                :value="total_taxable_income_date()"
                :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                placeholder="Taxable Income/(Loss) To Date (Item 51 Less Item 52)"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input
                :value="spouse_total_taxable_income_date()"
                :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                placeholder="Taxable Income/(Loss) To Date (Item 51 Less Item 52)"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="54."
            >
              <a-input
                v-model="form.sched2.taxpayer.total_tax_due"
                :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                placeholder="TAX DUE (Item 53 x 8% Tax Rate) (To Part III, Item 26)"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input
                v-model="form.sched2.spouse.total_tax_due"
                :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                placeholder="TAX DUE (Item 53 x 8% Tax Rate) (To Part III, Item 26)"
              />
            </a-form-item>
          </a-col>
        </a-row>
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
    console.log("show sched 2: " + this.show);
    // this.visible = this.show;
  },
  watch: {
    show() {
      console.log("show watch!!: " + this.show);
      if (this.show == 2) {
        this.visible = true;
      }
      console.log("visible! : " + this.visible);
    }
  },
  methods: {
    total_income_quarter() {
      var total = this.computeSum([
        this.form.sched2.taxpayer.total_sales_revenue,
        this.form.sched2.taxpayer.total_operation_income
      ]);
      this.form.sched2.taxpayer.total_income_quarter = total;
      return total;
    },
    spouse_total_income_quarter() {
      var total = this.computeSum([
        this.form.sched2.spouse.total_sales_revenue,
        this.form.sched2.spouse.total_operation_income
      ]);
      this.form.sched2.spouse.total_income_quarter = total;
      return total;
    },
    previous_quarter_taxable_income() {},
    spouse_previous_quarter_taxable_income() {},
    total_cumulative_income() {
      var total = this.computeSum([
        this.form.item49a,
        this.form.sched2.taxpayer.previous_quarter_taxable_income
      ]);
      this.form.sched2.taxpayer.total_cumulative_income = total;
      return total;
    },
    spouse_total_cumulative_income() {
      var total = this.computeSum([
        this.form.sched2.spouse.total_income_quarter,
        this.form.sched2.spouse.previous_quarter_taxable_income
      ]);
      this.form.sched2.spouse.total_cumulative_income = total;
      return total;
    },
    total_taxable_income_date() {
      var total =
        (this.form.sched2.taxpayer.total_cumulative_income || 0) -
        (this.form.sched2.taxpayer.less_allowable_reduction || 0);
      this.form.sched2.taxpayer.total_taxable_income_date = total;
      this.form.sched2.taxpayer.total_tax_due = total * 0.08;
      this.form.taxpayer_prev_tax_due = this.form.sched2.taxpayer.total_tax_due;
      return total;
    },
    spouse_total_taxable_income_date() {
      var total =
        (this.form.sched2.spouse.total_cumulative_income || 0) -
        (this.form.sched2.spouse.less_allowable_reduction || 0);
      this.form.sched2.spouse.total_taxable_income_date = total;
      this.form.sched2.spouse.total_tax_due = total * 0.08;
      this.form.spouse_prev_tax_due = this.form.sched2.spouse.total_tax_due;
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