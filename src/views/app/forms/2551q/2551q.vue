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
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 12 }"
        label="2. Year ended (MM/YYYY)"
      >
        <a-month-picker
          placeholder="Select month and year"
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

      <a-form-item label="5. No. of Sheets Attached">
        <a-input-number v-model="form.numSheets"></a-input-number>
      </a-form-item>
    </a-form>
    <br />
    <!-- Part I -->
    <a-form v-show="step===1">
      <a-divider orientation="left">
        <b>Part I: Background Information</b>
      </a-divider>
      <a-form-item label="5. TIN NUMBER">
        <a-input v-model="form.taxpayer.tin"></a-input>
      </a-form-item>
      <a-form-item label="6. RDO Code">
        <a-input v-model="form.taxpayer.rdo_code"></a-input>
      </a-form-item>
      <a-form-item label="7. Line of Business/Occupation">
        <a-input v-model="form.taxpayer.line_business"></a-input>
      </a-form-item>
      <a-form-item label="8. Withholding Agent's Name/Registered Name">
        <a-input v-model="form.taxpayer.taxpayer_name"></a-input>
      </a-form-item>
      <a-form-item label="9. Telephone Number">
        <a-input-number v-model="form.taxpayer.telephone_no"></a-input-number>
      </a-form-item>
      <a-form-item label="10. Registered Address">
        <a-textarea v-model="form.taxpayer.registered_address"></a-textarea>
      </a-form-item>
      <a-form-item label="11. Zip Code">
        <a-input-number v-model="form.taxpayer.zip_code"></a-input-number>
      </a-form-item>
      <a-form-item label="12. Category of Withholding Agent">
        <a-radio-group v-model="form.categoryOfAgent">
          <a-radio :value="true">Private</a-radio>
          <a-radio :value="false">Government</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="13. Are you availing of tax relief under Special Law or International Tax Treaty?"
      >
        <a-radio-group v-model="form.availing_tax_relief">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="If yes, specify">
        <a-input v-model="form.internationalTreatyYn"></a-input>
      </a-form-item>
    </a-form>

    <!-- Part II -->
    <a-form v-show="step===2">
      <a-divider orientation="left">
        <b>Part II: Computation of Tax</b>
      </a-divider>
      <a-form-item
        class="computation-item"
        label="14. Total Tax Required to be Withheld and Remitted"
      >
        <a-input-number
          v-model="form.total_tax_withheld_remitted"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="15. Less: Tax Credits/Payments"></a-form-item>
      <a-form-item
        class="computation-item"
        label="15A. Tax Remitted in Return Previously Filed, if this is an Amended Return"
      >
        <a-input-number
          v-model="form.prevTaxPaidCrdtb"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="15B. Advance Payments Made(please attach proof of payments - BIR Form No. 0605)"
      >
        <a-input-number
          v-model="form.advPayment"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="15C. Total Tax Credits/Payments(Sum of Items 15A&15b)"
      >
        <a-input-number
          v-model="form.totTaxCredits"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="16. Tax Still Due/(Overremittance)(Sum of Items 15A&15B)"
      >
        <a-input-number
          v-model="form.amtPayblCrdtb"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="17. Add: Penalties"></a-form-item>
      <a-form-item class="computation-item" label="17A. Surcharge">
        <a-input-number
          v-model="form.surcharge"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="17B. Interest">
        <a-input-number
          v-model="form.interest"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="17C. Compromise">
        <a-input-number
          v-model="form.compromise"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="17D">
        <a-input-number
          v-model="form.penaltiesCrdtb"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="18. Total Amount Still Due/(Overremittance)(Sum of Items 16&17D)"
      >
        <a-input-number
          v-model="form.total_amount_overremitance"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="if overremittance, mark one box only:">
        <a-radio-group v-model="form.overremittance">
          <a-radio :value="true">To be Refunded</a-radio>
          <a-radio :value="false">To be issued a Tax Credit Certificate</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>

    <!-- Part III -->
    <a-form v-show="step===3">
      <a-divider orientation="left">
        <b>Part III: Details of Payment</b>
      </a-divider>
      <a-form-item class="computation-item" label="21. Cash/Bank Debit Memo">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="22. Check"></a-form-item>
      <a-form-item class="computation-item" label="22A">
        <a-input-number
          v-model="form.item21a"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="22B">
        <a-input-number
          v-model="form.item22b"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="22C">
        <a-input-number
          v-model="form.item22c"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="22D">
        <a-input-number
          v-model="form.item22d"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="23. Others"></a-form-item>
      <a-form-item class="computation-item" label="23A">
        <a-input-number
          v-model="form.item23a"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="23B">
        <a-input-number
          v-model="form.item23b"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="23C">
        <a-input-number
          v-model="form.item23c"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="23D">
        <a-input-number
          v-model="form.item23d"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
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