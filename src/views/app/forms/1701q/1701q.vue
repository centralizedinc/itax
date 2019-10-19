<template>
  <div>
    <a-form :form="form_general" v-show="step===0">
      <a-divider>
        <b>Quarterly Income Tax Return(1701Q)</b>
      </a-divider>
      <a-form-item label="For the Year"></a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="1."
        :validate-status="error_item('taxpayer.return_period_year')"
        :help="error_desc('taxpayer.return_period_year')"
      >
        <a-month-picker style="width: 100%" v-model="form.return_period_year" />
      </a-form-item>
      <a-form-item label="Quarter"></a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="2."
        :validate-status="error_item('quarter')"
        :help="error_desc('quarter')"
      >
        <a-radio-group v-model="form.quarter">
          <a-radio :value="1">First</a-radio>
          <a-radio :value="2">Second</a-radio>
          <a-radio :value="3">Third</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="Amended Return"></a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="3."
      >
        <a-radio-group v-model="form.amended_yn">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="4. Number of Sheets">
        <a-input-number v-model="form.num_of_sheet" style="width: 100%" />
      </a-form-item>
    </a-form>

    <!-- Part I -->
    <a-form :form="form_part1" v-show="step===1">
      <a-divider orientation="left">
        <b>Part I: BACKGROUND INFORMATION ON TAXPAYER/FILER</b>
      </a-divider>
      <a-form-item label="5. Taxpayer Identification Number (TIN)">
        <a-input-number
          style="width:100%"
          placeholder="Tax Identification Number"
          v-model="form.taxpayer.tin"
          :formatter="formatter.amount"
          :parser="parser.amount"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="6. RDO Code">
        <a-input v-model="form.taxpayer.rdo_code"></a-input>
      </a-form-item>
      <a-form-item label="7. Tax Filer Type">
        <a-radio-group v-model="form.taxpayer.filer_type">
          <a-radio :value="'SP'">Single Proprietor</a-radio>
          <a-radio :value="'PRO'">Professional</a-radio>
          <a-radio :value="'EST'">Estate</a-radio>
          <a-radio :value="'TRU'">Trust</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="8. Alphanumeric Tax Code (ATC)">
        <a-radio-group v-model="form.taxpayer_atc_code" @change="changeATC">
          <a-radio
            :value="'II012'"
            @change="form.taxpayer_tax_rate = 'GR'"
            :disabled="form.taxpayer.filer_type == 'PRO' || form.taxpayer.filer_type == '' || form.taxpayer.filer_type == null"
          >II012 Business Income-Graduated IT Rates</a-radio>
          <a-radio
            :value="'II015'"
            @change="form.taxpayer_tax_rate = 'GS'"
            :disabled="form.taxpayer.filer_type == 'PRO' || form.taxpayer.filer_type == 'TRU' || form.taxpayer.filer_type == 'EST' || form.taxpayer.filer_type == '' || form.taxpayer.filer_type == null"
          >II015 Business Income - 8% IT Rate</a-radio>
          <a-radio
            :value="'II014'"
            @change="form.taxpayer_tax_rate = 'GR'"
            :disabled="form.taxpayer.filer_type == 'SP' || form.taxpayer.filer_type == 'TRU' || form.taxpayer.filer_type == 'EST' || form.taxpayer.filer_type == '' || form.taxpayer.filer_type == null"
          >II014 Income from Profession–Graduated IT Rates</a-radio>
          <a-radio
            :value="'II017'"
            @change="form.taxpayer_tax_rate = 'GS'"
            :disabled="form.taxpayer.filer_type == 'SP' ||form.taxpayer.filer_type == 'TRU' || form.taxpayer.filer_type == 'EST' || form.taxpayer.filer_type == '' || form.taxpayer.filer_type == null"
          >II017 Income from Profession – 8% IT Rate</a-radio>
          <a-radio
            :value="'II013'"
            @change="form.taxpayer_tax_rate = 'GR'"
            :disabled="form.taxpayer.filer_type == 'TRU' || form.taxpayer.filer_type == 'EST' || form.taxpayer.filer_type == '' || form.taxpayer.filer_type == null"
          >II013 Mixed Income–Graduated IT Rates</a-radio>
          <a-radio
            :value="'II016'"
            @change="form.taxpayer_tax_rate = 'GS'"
            :disabled="form.taxpayer.filer_type == 'TRU' || form.taxpayer.filer_type == 'EST' || form.taxpayer.filer_type == '' || form.taxpayer.filer_type == null"
          >II016 Mixed Income – 8% IT Rate</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="9. Taxpayer’s Name ( ESTATE of / TRUST FAO ):"
        :validate-status="error_item('taxpayer.Taxpayer_name')"
        :help="error_desc('taxpayer.Taxpayer_name')"
      >
        <a-input
          placeholder="Last Name, First Name, Middle Name"
          v-model="form.taxpayer.registered_name"
        ></a-input>
      </a-form-item>
      <a-form-item
        label="10. Registered Address"
        :validate-status="error_item('taxpayer.registered_address')"
        :help="error_desc('taxpayer.registered_address')"
      >
        <a-textarea
          placeholder="Indicate complete address. If branch, indicate the branch address. If the registered address is different from the current address, go to the RDO to update registered address by using BIR Form No. 1905"
          v-model="form.taxpayer.address"
        ></a-textarea>
      </a-form-item>
      <a-form-item
        label="10A. Zip Code"
        :validate-status="error_item('taxpayer.zip_code')"
        :help="error_desc('taxpayer.zip_code')"
      >
        <a-input-number style="width: 100%" v-model="form.taxpayer.address_details.zipCode"></a-input-number>
      </a-form-item>
      <a-form-item label="11. Date of Birth (MM/DD/YYYY)">
        <a-date-picker style="width: 100%" v-model="form.taxpayer.birthday"></a-date-picker>
      </a-form-item>
      <a-form-item label="12. Email Address">
        <a-input v-model="form.taxpayer.email_address"></a-input>
      </a-form-item>
      <a-form-item
        label="13. Citizenship "
        :validate-status="error_item('taxpayer.citizenship')"
        :help="error_desc('taxpayer.citizenship')"
      >
        <a-input style="width: 100%" v-model="form.taxpayer.citizenship"></a-input>
      </a-form-item>
      <a-form-item label="14. Foreign Tax Number (if applicable)">
        <a-input-number style="width: 100%" v-model="form.taxpayer_foreign_tax_number"></a-input-number>
      </a-form-item>
      <a-form-item
        label="15. Claiming Foreign Tax Credits?"
        :validate-status="error_item('taxpayer.taxCredits')"
        :help="error_desc('taxpayer.taxCredits')"
      >
        <a-radio-group v-model="form.taxpayer_foreign_tax_credits">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="16. Tax Rate*(choose one,for income from business/profession):">
        <a-radio-group v-model="form.taxpayer_tax_rate" disabled>
          <a-radio
            :value="'GR'"
          >Graduated Rates per Tax Table- page 2 (Choose Method of Deduction in Item 16A)</a-radio>
          <a-radio
            :value="'GS'"
          >8% on gross sales/receipts & other non-operating income in lieu of Graduated Rates</a-radio>
          <p>
            under Sec. 24(A)(2)(a) & Percentage Tax
            under Sec. 116 of the NIRC, as amended [available if gross sales/receipts and other non-operating income do not exceed Three million pesos (P3M)]
          </p>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="16A. Method of Deduction:"
        :validate-status="error_item('method_deduction')"
        :help="error_desc('method_deduction')"
      >
        <a-radio-group
          v-model="form.taxpayer_method_deduction"
          :disabled="form.taxpayer_tax_rate !== 'GR'"
        >
          <a-radio :value="'ID'">Itemized Deduction [Sec. 34(A-J), NIRC]</a-radio>
          <a-radio
            :value="'OSD'"
          >Optional Standard Deduction (OSD) [40% of Gross Sales/Receipts/Revenues/Fees</a-radio>
          <p>[Sec. 34(L), NIRC]</p>
        </a-radio-group>
      </a-form-item>
    </a-form>

    <!-- Part II -->
    <a-form :form="form_part2" v-show="step===2">
      <a-divider orientation="left">
        <b>Part II: BACKGROUND INFORMATION ON SPOUSE (if applicable)</b>
      </a-divider>
      <a-form-item label="17. Spouse’s TIN">
        <a-input-number
          :disabled="form.taxpayer.filer_type == 'EST' || form.taxpayer.filer_type == 'TRU'"
          style="width:100%"
          placeholder="Tax Identification Number"
          v-model="form.spouse_details.tin"
          :formatter="formatter.amount"
          :parser="parser.amount"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="18. RDO Code">
        <a-input
          v-model="form.spouse_details.rdo_code"
          :disabled="form.taxpayer.filer_type == '' || form.taxpayer.filer_type == null || form.taxpayer.filer_type == 'EST' || form.taxpayer.filer_type == 'TRU'"
        ></a-input>
      </a-form-item>
      <a-form-item label="19. Filer’s Spouse Type">
        <a-checkbox
          @change="spouse_type"
          v-model="single"
          :disabled="form.taxpayer.filer_type == '' || form.taxpayer.filer_type == null || form.taxpayer.filer_type == 'EST' || form.taxpayer.filer_type == 'TRU'"
        >Single Proprietor</a-checkbox>
        <a-checkbox
          @change="spouse_type"
          v-model="pro"
          :disabled="form.taxpayer.filer_type == '' || form.taxpayer.filer_type == null || form.taxpayer.filer_type == 'EST' || form.taxpayer.filer_type == 'TRU'"
        >Professional</a-checkbox>
        <a-checkbox
          @change="spouse_type"
          v-model="pensation"
          :disabled="form.taxpayer.filer_type == '' || form.taxpayer.filer_type == null || form.taxpayer.filer_type == 'EST' || form.taxpayer.filer_type == 'TRU'"
        >Compensation Earner</a-checkbox>
        <!-- <a-radio-group v-model="form.taxpayer.spouse_tax_filer_type">
          <a-radio :value="'SSP'">Single Proprietor</a-radio>
          <a-radio :value="'SPRO'">Professional</a-radio>
          <a-radio :value="'SCE'">Compensation Earner</a-radio>
        </a-radio-group>-->
      </a-form-item>
      <a-form-item label="20. ATC">
        <a-radio-group v-model="form.spouse_atc_code">
          <a-radio
            :value="'SII012'"
            @change="form.spouse_tax_rate ='SGR'"
            :disabled="form.taxpayer.spouse_tax_filter_type !=='SSP'"
          >II012 Business Income-Graduated IT Rates</a-radio>
          <a-radio
            :value="'SII015'"
            @change="form.spouse_tax_rate ='SOGS'"
            :disabled="form.taxpayer.spouse_tax_filter_type !=='SSP'"
          >II015 Business Income - 8% IT Rate</a-radio>
          <a-radio
            :value="'SII014'"
            @change="form.spouse_tax_rate ='SGR'"
            :disabled="form.taxpayer.spouse_tax_filter_type !=='SPRO'"
          >II014 Income from Profession–Graduated IT Rates</a-radio>
          <a-radio
            :value="'SII017'"
            @change="form.spouse_tax_rate ='SOGS'"
            :disabled="form.taxpayer.spouse_tax_filter_type !=='SPRO'"
          >II017 Income from Profession – 8% IT Rate</a-radio>
          <a-radio
            :value="'SII013'"
            @change="form.spouse_tax_rate ='SGR'"
            :disabled="form.taxpayer.spouse_tax_filter_type =='SPRO' || form.taxpayer.spouse_tax_filter_type =='SSP' || form.taxpayer.spouse_tax_filter_type == '' || form.taxpayer.spouse_tax_filter_type == null"
          >II013 Mixed Income–Graduated IT Rates</a-radio>
          <a-radio
            :value="'SII016'"
            @change="form.spouse_tax_rate ='SOGS'"
            :disabled="form.taxpayer.spouse_tax_filter_type =='SPRO' || form.taxpayer.spouse_tax_filter_type =='SSP' || form.taxpayer.spouse_tax_filter_type == '' || form.taxpayer.spouse_tax_filter_type == null"
          >II016 Mixed Income – 8% IT Rate</a-radio>
          <a-radio
            :value="'SII011'"
            @change="form.spouse_tax_rate =''"
            :disabled="form.taxpayer.spouse_tax_filter_type !=='SCE'"
          >II011 Compensation Income</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="21. Spouse’s Name:">
        <a-input
          placeholder="Last Name, First Name, Middle Name"
          v-model="form.spouse_details.registered_name"
          :disabled="form.taxpayer.filer_type == 'EST' || form.taxpayer.filer_type == 'TRU'"
        ></a-input>
      </a-form-item>
      <a-form-item label="22. Citizenship ">
        <a-input
          v-model="form.spouse_details.citizenship"
          :disabled="form.taxpayer.filer_type == 'EST' || form.taxpayer.filer_type == 'TRU'"
        ></a-input>
      </a-form-item>
      <a-form-item label="23. Foreign Tax Number (if applicable)">
        <a-input-number
          style="width: 100%"
          v-model="form.spouse_foreign_tax_number"
          :disabled="form.taxpayer.filer_type == 'EST' || form.taxpayer.filer_type == 'TRU'"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="24. Claiming Foreign Tax Credits?">
        <a-radio-group
          v-model="form.spouse_foreign_tax_credits"
          :disabled="form.taxpayer.filer_type == 'EST' || form.taxpayer.filer_type == 'TRU'"
        >
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="25. Tax Rate*(choose one,for income from business/profession):">
        <a-radio-group v-model="form.spouse_tax_rate" disabled>
          <a-radio
            :value="'SGR'"
          >Graduated Rates per Tax Table- page 2 (Choose Method of Deduction in Item 16A)</a-radio>
          <a-radio
            :value="'SOGS'"
          >8% on gross sales/receipts & other non-operating income in lieu of Graduated Rates</a-radio>
          <p>
            under Sec. 24(A)(2)(a) & Percentage Tax
            under Sec. 116 of the NIRC, as amended [available if gross sales/receipts and other non-operating income do not exceed Three million pesos (P3M)]
          </p>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="25A. Method of Deduction:">
        <a-radio-group
          v-model="form.spouse_method_deduction"
          :disabled="form.spouse_tax_rate ='SGR' || form.taxpayer.filer_type == 'EST' || form.taxpayer.filer_type == 'TRU'"
        >
          <a-radio :value="'SID'">Itemized Deduction [Sec. 34(A-J), NIRC]</a-radio>
          <a-radio
            :value="'SOSD'"
          >Optional Standard Deduction (OSD) [40% of Gross Sales/Receipts/Revenues/Fees</a-radio>
          <p>[Sec. 34(L), NIRC]</p>
        </a-radio-group>
      </a-form-item>
    </a-form>

    <!-- Part III -->
    <a-form :form="form_part3" v-show="step===3">
      <a-divider orientation="left">
        <b>Part III: TOTAL TAX PAYABLE</b>
      </a-divider>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item style="margin-left: 75px;" label="A) Taxpayer/Filer"></a-form-item>
          <a-form-item
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
            label="26."
          >
            <a-input-number
              disabled
              style="width:100%"
              :value="total_tax_payable()"
              v-model="form.taxpayer_prev_tax_due"
              placeholder="Tax Due"
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item style="margin-left: 75px;" label="B) Spouse"></a-form-item>
          <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
            <a-input-number
              style="width:100%"
              v-model="form.spouse_prev_tax_due"
              placeholder="Tax Due"
              disabled
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-button style="margin-left: 15px;" type="link" @click="sched = 1">Schedule I</a-button>
        <a-button style="margin-left: 15px;" type="link" @click="sched = 2">Schedule II</a-button>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
            label="27."
          >
            <a-input-number
              v-model="form.taxpayer_tax_credit"
              style="width:100%"
              placeholder="Less: Tax Credits/Payments(From "
              disabled
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
            <a-input-number
              v-model="form.spouse_tax_credit"
              style="width:100%"
              placeholder="Part V, Schedule III-Item 62)"
              disabled
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-button style="margin-left: 15px;" type="link" @click="sched = 3">Schedule III</a-button>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
            label="28."
          >
            <a-input-number
              style="width:100%"
              :value="taxpayer_tax_due()"
              v-model="form.taxpayer_tax_due"
              placeholder="Tax Payable/(Overpayment)(Item "
              disabled
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
            <a-input-number
              style="width:100%"
              :value="taxpayer_tax_due()"
              v-model="form.spouse_tax_due"
              placeholder="26 Less Item 27 From Part V,Item 63)"
              disabled
            ></a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
            label="29."
          >
            <a-input-number
              style="width:100%"
              v-model="form.taxpayer_total_penalties"
              placeholder="Add: Total Penalties (From Part V, "
              disabled
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
            <a-input-number
              style="width:100%"
              v-model="form.spouse_total_penalties"
              placeholder="Schedule IV-Item 67)"
              disabled
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-button style="margin-left: 15px;" type="link" @click="sched = 4">Schedule IV</a-button>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
            label="30."
          >
            <a-input-number
              style="width:100%"
              :value="taxpayer_total_amount_payable()"
              v-model="form.taxpayer_total_amount_payable"
              placeholder="Total Amount Payable/Overpayment"
              disabled
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
            <a-input-number
              style="width:100%"
              :value="taxpayer_total_amount_payable()"
              v-model="form.spouse_total_amount_payable"
              placeholder="Sum of Items 28/29 From Part V,Item 68"
              disabled
            ></a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
            label="31."
          >
            <a-input-number
              style="width:100%"
              v-model="form.taxpayer_aggregate_amount_payable"
              placeholder="Aggregate Amount Payable/(Overpayment)"
              disabled
            ></a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <sched1 v-if="sched == 1" :show="show" :form="form" @close="show = 0"></sched1>
    <sched2 v-if="sched == 2" :show="show" :form="form" @close="show = 0"></sched2>
    <sched3 v-if="sched == 3" :show="show" :form="form" @close="show = 0"></sched3>
    <sched4 v-if="sched == 4" :show="show" :form="form" @close="show = 0"></sched4>
  </div>
</template>

<script>
import sched1 from "./schedule1.vue";
import sched2 from "./schedule2.vue";
import sched3 from "./schedule3.vue";
import sched4 from "./schedule4.vue";
export default {
  components: {
    sched1,
    sched2,
    sched3,
    sched4
  },
  props: ["form", "step"],
  data() {
    return {
      sched: 0,
      show: 0,
      sub: false,
      spouse_type_list_holder: null,
      single: false,
      pro: false,
      pensation: false,
      // form_1601e_image,
      form_general: this.$form.createForm(this),
      form_part1: this.$form.createForm(this),
      form_part2: this.$form.createForm(this),
      form_part3: this.$form.createForm(this),
      form_part4: this.$form.createForm(this),
      image_height: 1000,
      formatter: {
        amount: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, "-")
      },
      parser: {
        amount: value => value.replace(/\₱\s?|(,*)/g, "")
      },
      form_layout: {
        label_col: { span: 2 },
        wrapper_col: { span: 22 }
      },
      errors: []
    };
  },
  // watch: {
  //   step() {
  //     if (this.step < 0) {
  //       this.$router.push("/");
  //     } else if (this.step == 2) {
  //       this.sub = true;
  //     }
  //   }
  // },
  computed: {
    tax_due() {
      var tosum = [this.form];
    },
    computeReturnPeriod() {
      var return_period = new Date();
      return_period.setFullYear(this.form.returnPeriodYear);
      if (this.form.quarter === 1) {
        return_period.setMonth(2);
      } else if (this.form.quarter === 2) {
        return_period.setMonth(5);
      } else if (this.form.quarter === 3) {
        return_period.setMonth(8);
      }
      return return_period;
    }
  },
  methods: {
    spouse_type() {
      var holder = "";
      if (this.single == true && this.pro == true) {
        if (this.spouse_type_list_holder == true) {
          this.single = true;
          this.pro = false;
        }
      }
      if (this.single == true && this.pro == false) {
        this.pro = false;
        holder = "SSP";

        if (
          this.single == true &&
          this.pro == false &&
          this.pensation == true
        ) {
          holder = "SSPSCE";
        } else if (
          this.pro == true &&
          this.single == false &&
          this.pensation == true
        ) {
          holder = "SPROSCE";
        }
      } else if (this.pro == true) {
        this.single = false;
        holder = "SPRO";
        if (
          this.single == true &&
          this.pro == false &&
          this.pensation == true
        ) {
          holder = "SSPSCE";
        } else if (
          this.pro == true &&
          this.single == false &&
          this.pensation == true
        ) {
          holder = "SPROSCE";
        }
      } else if (
        this.single == false &&
        this.pro == false &&
        this.pensation == true
      ) {
        holder = "SCE";
      }
      this.spouse_type_list_holder = this.pro;
      this.form.taxpayer.spouse_tax_filter_type = holder;
      console.log(
        "spouse_tax_filter_type data: " +
          this.form.taxpayer.spouse_tax_filter_type
      );
    },
    spouse_type_filter() {},
    professional(data) {
      if (data == "SSP") {
        if (this.single == true) {
          this.single = false;
        } else {
          this.single = true;
        }
      } else if (data == "SPRO") {
        if (this.pro == true) {
          this.pro = false;
        } else {
          this.pro = true;
        }
      }
    },
    compensation() {
      this.pensation == false
        ? (this.pensation = true)
        : (this.pensation = false);
    },
    total_tax_payable() {
      if (this.form.sched1.taxpayer.total_tax_due > 0) {
        this.form.taxpayer_prev_tax_due = this.form.sched1.taxpayer.total_tax_due;
        this.form.spouse_prev_tax_due = this.form.sched1.spouse.total_tax_due;
      } else if (this.form.sched2.taxpayer.total_tax_due > 0) {
        this.form.taxpayer_prev_tax_due = this.form.sched2.taxpayer.total_tax_due;
        this.form.spouse_prev_tax_due = this.form.sched2.spouse.total_tax_due;
      }

      // this.form.item27a = this.form.item62a;
      // this.form.item27b = this.form.item62b;
      // this.form.item28a = this.form.item26a - this.form.item27a;
      // this.form.item28b = this.form.item26b - this.form.item27b;
      // this.form.item29a = this.form.item67a;
      // this.form.item29b = this.form.item67b;
      // this.form.item30a = this.form.item28a + this.form.item29a;
      // this.form.item30b = this.form.item28b + this.form.item29b;
      // this.form.item31 = this.form.item30a + this.form.item30b;
    },
    taxpayer_tax_due() {
      // Item 26 Less Item 27
      this.form.taxpayer_tax_due =
        (this.form.taxpayer_prev_tax_due || 0) -
        (this.form.taxpayer_tax_credit || 0);
      this.form.spouse_tax_due =
        (this.form.spouse_prev_tax_due || 0) -
        (this.form.spouse_tax_credit || 0);
    },
    taxpayer_total_amount_payable() {
      // Sum of Items 28 and 29
      this.form.taxpayer_total_amount_payable = this.computeSum([
        this.form.taxpayer_tax_due,
        this.form.taxpayer_total_penalties
      ]);

      this.form.spouse_total_amount_payable = this.computeSum([
        this.form.spouse_tax_due,
        this.form.spouse_total_penalties
      ]);

      this.form.taxpayer_aggregate_amount_payable = this.computeSum([
        this.form.taxpayer_total_amount_payable,
        this.form.spouse_total_amount_payable
      ]);
    },
    item26b() {},
    save_draft() {},
    changeStep(step, form) {
      this.$emit("changeStep", step);
      this.$emit("updateForm", form);
    },
    validate() {
      this.changeStep(this.step + 1);
      // if(this.step === 0) this.validateGeneral();
      // else if(this.step === 1) this.validatePartI();
    },
    submit() {
      this.loading = true;
      this.errors = [];
      this.form.returnPeriod = this.computeReturnPeriod;
      this.$store
        .dispatch("VALIDATE_AND_SAVE", {
          form_type: "1701Q",
          form_details: this.form
        })
        .then(result => {
          if (result.data.errors && result.data.errors.length > 0) {
            this.errors = result.data.errors;
            console.log("this.errors :", this.errors);
            if (this.errors && this.errors[0] && this.errors[0].page !== null)
              this.$emit("changeStep", this.errors[0].page);
            this.$notification.error({ message: "Validation Error" });
          } else {
            this.$store.commit("REMOVE_DRAFT_FORM", this.$route.query.ref_no);
            this.$store.commit("NOTIFY_MESSAGE", {
              success: true,
              message: "Successfully submitted Form 1701q."
            });
            window.close();
          }
        })
        .catch(err => {
          console.log("VALIDATE_AND_SAVE", err);
          this.loading = false;
        });
    },
    changeATC(e) {
      const value = e.target.value;
      console.log("change ATC value :", value);
      const for_gr = ["II012", "II014", "II013"];
      const for_gs = ["II015", "II017", "II016"];
      this.form.taxpayer_tax_rate = for_gr.includes(value)
        ? "GR"
        : for_gs.includes(value)
        ? "GS"
        : "";
    },
    error_item(item) {
      return this.errors.find(x => x.field === item) ? "error" : "";
    },
    error_desc(item) {
      return this.errors.find(x => x.field === item)
        ? this.errors.find(x => x.field === item).error
        : "";
    }
    // submit() {
    //   this.form.validateFieldsAndScroll((err, values) => {
    //     if (!err) console.log("values :", values);
    //   });
    // }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style>
p {
  margin-left: 22px;
  margin-top: -11px;
  margin-bottom: 1em;
}
/* .tax-form .computation-item {
  padding-left: 50px;
}

.tax-form .computation-item .ant-input-number {
  width: 40vh;
} */
</style>