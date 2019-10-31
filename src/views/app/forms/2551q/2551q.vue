<template>
  <div>
    <a-form v-show="step===0">
      <a-divider>
        <b>Quarterly Percentage Tax Return(2551Q)</b>
      </a-divider>
      <a-form-item
        :labelCol="{ span: 4 }"
        :wrapperCol="{ span: 8 }"
        :validate-status="error_item('accounting_type')"
        :help="error_desc('accounting_type')"
        label="1. For the"
      >
        <a-radio-group v-model="form.accounting_type">
          <a-radio :value="true">Calendar</a-radio>
          <a-radio :value="false">Fiscal</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        :labelCol="{ span: 1 }"
        :wrapperCol="{ span: 20 }"
        label="2."
      >
        <a-month-picker
          placeholder="Select month and year ended (MM/YYYY)"
          style="width: 100%"
          @change="selectYear"
        ></a-month-picker>
      </a-form-item>

      <a-form-item :labelCol="{ span: 4 }" :wrapperCol="{ span: 12 }" label="3. Quarter">
        <a-radio-group v-model="form.quarter">
          <a-radio :value="1">1st</a-radio>
          <a-radio :value="2">2nd</a-radio>
          <a-radio :value="3">3rd</a-radio>
          <a-radio :value="4">4th</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="4. Amended Return?">
        <a-radio-group v-model="form.amended_yn">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="5." :labelCol="{ span: 1 }" :wrapperCol="{ span: 22 }">
        <a-input-number placeholder="No. of Sheets Attached" v-model="form.num_of_sheet" style="width:100%"></a-input-number>
      </a-form-item>
    </a-form>
    <br />
    <!-- Part I -->
    <a-form v-show="step===1">
      <a-divider orientation="left">
        <b>Part I: Background Information</b>
      </a-divider>
      <a-form-item label="6.">
        <a-input v-model="form.taxpayer.tin" placeholder="TIN NUMBER" style="width:100%"></a-input>
      </a-form-item>
      <a-form-item label="7.">
        <a-input v-model="form.taxpayer.rdo_code" placeholder="RDO Code" style="width:100%"></a-input>
      </a-form-item>
      <a-form-item label="8.">
        <a-input v-model="form.taxpayer.registered_name" placeholder="Taxpayer's Name"></a-input>
      </a-form-item>
      <a-form-item label="9.">
        <a-textarea v-model="form.taxpayer.address" placeholder="Registered Address"></a-textarea>
      </a-form-item>
      <a-form-item label="9A.">
        <a-input-number v-model="form.taxpayer.address_details.zipCode" placeholder="Zip Code"></a-input-number>
      </a-form-item>
      <a-form-item label="10.">
        <a-input-number v-model="form.taxpayer.contact_details.telno" placeholder="Contact Number (Landline/Cellphone)"></a-input-number>
      </a-form-item>
      <a-form-item label="11.">
        <a-input-number v-model="form.taxpayer.contact_details.email" placeholder="Email Address"></a-input-number>
      </a-form-item>
      <a-form-item label="12. Are you availling of tax relief under Special Law or International Tax Treaty?">
        <a-radio-group v-model="form.is_avail_tax_relief">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="12A." v-if="form.is_avail_tax_relief == true">
        <a-input v-model="form.avail_tax_relief" placeholder="If yes, specify"></a-input>
      </a-form-item>
      <a-form-item label="13. Only for Individual taxpayers whose sales/receipts are subject to percentage Tax under Section 116 of the Tax Code, as amended: What income tax rates are you availing? (To be Filled out only on the initial quarter of the taxable year) (choose one)">
        <a-radio-group v-model="form.tax_rate">
          <a-radio :value="'GITR'">Graduated income tax rate on net taxable income</a-radio>
          <a-radio :value="'ITR'">8% income tax rate on gross sales/receipts/others</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
    <!-- Part II -->
    <a-form v-show="step===2">
      <a-divider orientation="left">
        <b>Part II: Computation of Tax</b>
      </a-divider>
      <a-form-item
        class="computation-item"
        label="14. "
      >
        <a-input-number
        placeholder="Total Tax Due (From Schedule 1 Item 7)"
          v-model="form.sched1_tax_due"
          
        ></a-input-number>
      </a-form-item>
      <a-form-item label="Less: Tax Credit/Payment (attach proof)"></a-form-item>
      <a-form-item label="15">
        <a-input-number v-model="form.tax_withheld" placeholder="Creditable Percentage Tax Withheld per BIR Form No. 2307"></a-input-number>
      </a-form-item>
      <a-form-item label="16">
        <a-input-number v-model="form.prev_tax_paid" placeholder="Tax Paid in Return Previously Filed, if this is an Amended Return"></a-input-number>
      </a-form-item>
      <a-form-item label="17">
        <a-input v-model="form.other_tax_credits_specify" placeholder="Specify Other Tax/Credit/Payment"></a-input>
        <a-input-number v-model="form.other_tax_credits" placeholder="Other Tax Credit/Payment Amount"></a-input-number>
      </a-form-item>
      <a-form-item label="18">
        <a-input-number v-model="form.total_tax_credits" placeholder="Total Tax Credits/Payments"></a-input-number>
      </a-form-item>
      <a-form-item label="19">
        <a-input-number v-model="form.tot_tax_overpayment" placeholder="Tax Still Payable/(Overpayment)"></a-input-number>
      </a-form-item>
      <a-form-item label="Add: Penalties"></a-form-item>
      <a-form-item label="20">
        <a-input-number v-model="form.surcharge" placeholder="Surcharge"></a-input-number>
      </a-form-item>
      <a-form-item label="21">
        <a-input-number v-model="form.interest" placeholder="Interest"></a-input-number>
      </a-form-item>
      <a-form-item label="22">
        <a-input-number v-model="form.compromise" placeholder="Compromise"></a-input-number>
      </a-form-item>
      <a-form-item label="23">
        <a-input-number v-model="form.penalties" placeholder="Total Penalties"></a-input-number>
      </a-form-item>
      <a-form-item label="24">
        <a-input-number v-model="form.total_amount_payable" placeholder="TOTAL AMOUNT PAYABLE (Overpayment)"></a-input-number>
      </a-form-item>
      <a-form-item label="If overpayment, mark one only">
        <a-radio-group name="over_remit" @change="overRemittance()" v-model="form.over_remittance">
          <a-radio :value="'refunded'">To be refunded</a-radio>
          <a-radio :value="'certificate'">To be issued a Tax Credit Certificate</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  props: ["form", "step", "errors"],
  data() {
    return {
      loading: false,
      image_height: 1000,
      date_pick: "",
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
  watch: {
    loading(val) {
      this.$emit("loading", val);
    },
    form: {
      deep: true,
      handler(val) {
        console.log("form :", val);
      }
    }
  },
  created() {
    this.form.return_period_year = "";
    this.form.end_month = "";
    this.$emit("updateForm", this.form);
  },
  methods: {
    overRemittance(e){
      // array?
      if(this.form.over_remittance !== null){
        this.form.over_remittance.pop()
      }
      this.form.over_remittance.push(e.target.over_remit)
    },
    selectYear(date) {
      console.log("selectYear :", new Date(date));
      this.form.return_period_year = this.formatDate(date, {
        year: "numeric"
      });

      this.form.end_month = this.formatDate(date, {
        month: "2-digit"
      });
    },
    changeStep(step, form) {
      this.$emit("changeStep", step);
      this.$emit("updateForm", form);
    },
    error_item(item) {
      return this.errors.find(x => x.field === item) ? "error" : "";
    },
    error_desc(item) {
      return this.errors.find(x => x.field === item)
        ? this.errors.find(x => x.field === item).error
        : "";
    },
    validate() {
      this.changeStep(this.step + 1);
    }
  }
};
</script>