<template>
  <div>
    <a-drawer
      title="Schedule I – For Graduated IT Rate"
      :visible="visible"
      :closable="false"
      @close="onClose"
      :width="700"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <a-form :form="form" layout="vertical" hideRequiredMark>
        <a-row :gutter="6">
          <a-col :span="12">
            <a-form-item style="margin-left: 103px;" label="A) Taxpayer/Filer"></a-form-item>
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}" label="36">
              <a-tooltip>
                <template slot="title">Sales/Revenues/Receipts/Fees</template>
                <a-input-number
                  :disabled="form.taxpayer_atc_code =='II015' || form.taxpayer_atc_code =='II017' || form.taxpayer_atc_code =='II016'"
                  style="width:100%"
                  v-model="form.sched1.taxpayer.total_sales_revenue"
                  placeholder="Sales/Revenues/Receipts/Fees"
                ></a-input-number>
              </a-tooltip>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item style="margin-left: 103px;" label="B) Spouse"></a-form-item>
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}">
              <a-tooltip>
                <template slot="title">Sales/Revenues/Receipts/Fees</template>
              </a-tooltip>
              <a-input-number
                style="width: 100%"
                :disabled="form.spouse_atc_code =='SII015' || form.spouse_atc_code =='SII017' || form.spouse_atc_code =='SII016' "
                v-model="form.sched1.spouse.total_sales_revenue"
                placeholder="Sales/Revenues/Receipts/Fees"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="4">
          <a-col :span="12">
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}" label="37">
              <a-input-number
                style="width:100%"
                v-model="form.sched1.taxpayer.total_sales_services"
                placeholder="Less: Cost of Sales/Services"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}">
              <a-input-number
                style="width:100%"
                v-model="form.sched1.spouse.total_sales_services"
                placeholder="Less: Cost of Sales/Services"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="4">
          <a-col :span="12">
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}" label="38">
              <a-input-number
                disabled
                style="width:100%"
                :value="gross_income()"
                placeholder="Gross Income/(Loss) from Operation (Item 36 Less Item 37)"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}">
              <a-input-number
                disabled
                style="width:100%"
                :value="spouse_gross_income()"
                placeholder="Gross Income/(Loss) from Operation (Item 36 Less Item 37)"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="4">
          <a-col :span="12">
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}" label="39">
              <a-input-number
                style="width:100%"
                v-model="form.sched1.taxpayer.total_allowable_itemized_deductions"
                placeholder="Total Allowable Itemized Deductions "
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}">
              <a-input-number
                style="width:100%"
                v-model="form.sched1.spouse.total_allowable_itemized_deductions"
                placeholder="Total Allowable Itemized Deductions "
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="4">
          <a-col :span="12">
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}" label="40">
              <a-input-number
                style="width:100%"
                :value="total_standard_deductions()"
                placeholder="Optional Standard Deduction (OSD) (40% of Item 36)"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}">
              <a-input-number
                style="width:100%"
                :value="spouse_total_standard_deductions()"
                placeholder="Optional Standard Deduction (OSD) (40% of Item 36)"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="4">
          <a-col :span="12">
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}" label="41">
              <a-input-number
                :value="total_net_income()"
                style="width:100%"
                placeholder="Net Income/(Loss) This Quarter (If Itemized: Item 38 Less Item 39; If OSD: Item 38 Less Item 40)"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}">
              <a-input-number
                :value="spouse_total_net_income()"
                style="width:100%"
                placeholder="Net Income/(Loss) This Quarter (If Itemized: Item 38 Less Item 39; If OSD: Item 38 Less Item 40)"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="4">
          <a-col :span="12">
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}" label="42">
              <a-input-number
                v-model="form.sched1.taxpayer.total_taxable_income"
                style="width:100%"
                placeholder="Taxable Income/(Loss) Previous Quarter/s"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}">
              <a-input-number
                v-model="form.sched1.spouse.total_taxable_income"
                style="width:100%"
                placeholder="Taxable Income/(Loss) Previous Quarter/s"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="4">
          <a-col :span="12">
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}" label="43">
              <a-input-number
                style="width:100%"
                v-model="form.sched1.taxpayer.total_operation_income"
                placeholder="Non-Operating Income (specify) "
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}">
              <a-input-number
                style="width:100%"
                v-model="form.sched1.spouse.total_operation_income"
                placeholder="Non-Operating Income (specify) "
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="4">
          <a-col :span="12">
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}" label="44.">
              <a-input-number
                style="width:100%"
                v-model="form.sched1.taxpayer.amount_recieved_share"
                placeholder="Amount Received/Share in Income by a Partner from General Professional Partnership (GPP)"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}">
              <a-input-number
                style="width:100%"
                v-model="form.sched1.spouse.amount_recieved_share"
                placeholder="Amount Received/Share in Income by a Partner from General Professional Partnership (GPP)"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="4">
          <a-col :span="12">
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}" label="45">
              <a-input-number
                style="width:100%"
                :value="total_taxable_income_date()"
                v-model="form.taxpayer_prev_tax_due"
                placeholder="Total Taxable Income/(Loss) To Date (Sum of Items 41 to 44)"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}">
              <a-input-number
                style="width:100%"
                :value="spouse_total_taxable_income_date()"
                v-model="form.spouse_prev_tax_due"
                placeholder="Total Taxable Income/(Loss) To Date (Sum of Items 41 to 44)"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="4">
          <a-col :span="12">
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}" label="46.">
              <a-input-number
                v-model="form.sched1.taxpayer.total_tax_due"
                style="width:100%"
                placeholder="TAX DUE (Item 45 x Applicable Tax Rate based on Tax Table below) (To Part III, Item 26)"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}">
              <a-input-number
                v-model="form.sched1.spouse.total_tax_due"
                style="width:100%"
                placeholder="TAX DUE (Item 45 x Applicable Tax Rate based on Tax Table below) (To Part III, Item 26)"
              ></a-input-number>
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
        <!-- <a-button :style="{marginRight: '8px'}" @click="handleOk">Cancel</a-button>
        <a-button @click="handleOk" type="primary">Submit</a-button>-->
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
  computed: {},
  created() {
    console.log("show sched 1: " + this.show);
    console.log("visible created sched 1: " + this.visible);
    this.form.page = 1;
    // this.visible = this.show;
  },
  watch: {
    show() {
      console.log("show watch!!: " + this.show);
      if (this.show == 1) {
        this.visible = true;
      }
      console.log("visible! : " + this.visible);
    }
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    onClose() {
      // this.visible = false;
      this.$emit("close");
    },
    handleOk(e) {
      console.log(e);
      // this.show = 0;
      this.visible = false;
    },
    // schedule 1 computation
    gross_income() {
      console.log(
        "this.form.sched1.taxpayer.total_sales_revenue value: " +
          this.form.sched1.taxpayer.total_sales_revenue
      );
      var total =
        (this.form.sched1.taxpayer.total_sales_revenue || 0) -
        (this.form.sched1.taxpayer.total_sales_services || 0);
      this.form.sched1.taxpayer.gross_income = total;
      return total;
    },
    spouse_gross_income() {
      var total =
        (this.form.sched1.spouse.total_sales_revenue || 0) -
        (this.form.sched1.spouse.total_sales_services || 0);
      this.form.sched1.spouse.gross_income = total;
      return total;
    },
    total_standard_deductions() {
      var total = (this.form.sched1.taxpayer.total_sales_revenue || 0) * 0.4;
      this.form.sched1.taxpayer.total_standard_deductions = total;
      return total;
    },
    spouse_total_standard_deductions() {
      var total = (this.form.sched1.spouse.total_sales_revenue || 0) * 0.4;
      this.form.sched1.spouse.total_standard_deductions = total;
      return total;
    },
    total_net_income() {
      var total = 0;
      if (
        this.form.sched1.taxpayer.total_allowable_itemized_deductions ==
          undefined ||
        this.form.sched1.taxpayer.total_allowable_itemized_deductions == 0 ||
        this.form.sched1.taxpayer.total_allowable_itemized_deductions == null
      ) {
        total =
          this.form.sched1.taxpayer.gross_income -
          this.form.sched1.taxpayer.total_standard_deductions;
      } else if (
        this.form.sched1.taxpayer.total_standard_deductions == undefined ||
        this.form.sched1.taxpayer.total_standard_deductions == 0 ||
        this.form.sched1.taxpayer.total_standard_deductions == null
      ) {
        total =
          this.form.sched1.taxpayer.gross_income -
          this.form.sched1.taxpayer.total_allowable_itemized_deductions;
      } else {
        this.form.sched1.taxpayer.gross_income = 0;
        this.form.sched1.taxpayer.total_allowable_itemized_deductions = 0;
        this.form.sched1.taxpayer.total_standard_deductions = 0;
      }
      this.form.sched1.taxpayer.total_net_income = total;
      return total;
    },
    spouse_total_net_income() {
      var total = 0;
      if (
        this.form.sched1.spouse.total_allowable_itemized_deductions ==
          undefined ||
        this.form.sched1.spouse.total_allowable_itemized_deductions == 0 ||
        this.form.sched1.spouse.total_allowable_itemized_deductions == null
      ) {
        total =
          this.form.sched1.spouse.gross_income -
          this.form.sched1.spouse.total_standard_deductions;
      } else if (
        this.form.sched1.spouse.total_standard_deductions == undefined ||
        this.form.sched1.spouse.total_standard_deductions == 0 ||
        this.form.sched1.spouse.total_standard_deductions == null
      ) {
        total =
          this.form.sched1.spouse.gross_income -
          this.form.sched1.spouse.total_allowable_itemized_deductions;
      } else {
        this.form.sched1.spouse.gross_income = 0;
        this.form.sched1.spouse.total_allowable_itemized_deductions = 0;
        this.form.sched1.spouse.total_standard_deductions = 0;
      }
      this.form.sched1.spouse.total_net_income = total;
      return total;
    },
    total_taxable_income_date() {
      var total = this.computeSum([
        this.form.sched1.taxpayer.total_net_income,
        this.form.sched1.taxpayer.total_taxable_income,
        this.form.sched1.taxpayer.total_operation_income,
        this.form.sched1.taxpayer.amount_recieved_share
      ]);
      this.form.sched1.taxpayer.total_taxable_income_date = total;
      var total46 = this.tax_rate(
        this.form.sched1.taxpayer.total_taxable_income_date
      );
      this.form.sched1.taxpayer.total_tax_due = total46;
      this.form.taxpayer_prev_tax_due = this.form.sched1.taxpayer.total_tax_due;
      console.log(
        "taxpayer_prev_tax_due data: " + this.form.taxpayer_prev_tax_due
      );
      return total;
    },
    spouse_total_taxable_income_date() {
      var total = this.computeSum([
        this.form.sched1.spouse.total_net_income,
        this.form.sched1.spouse.total_taxable_income,
        this.form.sched1.spouse.total_operation_income,
        this.form.sched1.spouse.amount_recieved_share
      ]);
      this.form.sched1.spouse.total_taxable_income_date = total;
      var total46 = this.tax_rate(
        this.form.sched1.spouse.total_taxable_income_date
      );
      this.form.sched1.spouse.total_tax_due = total46;
      this.form.spouse_prev_tax_due = this.form.sched1.spouse.total_tax_due;
      return total;
    },
    tax_rate(income) {
      if (income <= 250000) {
        return 0;
      } else if (income >= 250000 && income <= 400000) {
        return income * 0.2;
      } else if (income >= 400000 && income <= 800000) {
        return income * 0.25 + 30000;
      } else if (income >= 800000 && income <= 2000000) {
        return income * 0.3 + 130000;
      } else if (income >= 2000000 && income <= 8000000) {
        return income * 0.32 + 490000;
      } else if (income > 8000000) {
        return income * 0.35 + 2410000;
      }
    }
  }
};
</script>