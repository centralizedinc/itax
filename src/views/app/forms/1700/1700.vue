<template>
  <div>
    <a-form :form="form_general" v-show="step===0">
      <a-divider>
        <b>Annual Income Tax Return (1700)</b>
      </a-divider>
      <a-form-item label="1. For the year (YY)">
        <!-- <a-input v-model="form.year"></a-input> -->
        <a-month-picker v-model="form.dateFiled"></a-month-picker>
      </a-form-item>
      <a-form-item label="2. Amended Return">
        <a-radio-group v-model="form.amendedYn">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="3. Joint Filing">
        <a-radio-group v-model="form.joint_filing">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="4. Source of Income">
        <a-radio-group v-model="form.source_of_income">
          <a-radio :value="0">Compensation Income</a-radio>
          <a-radio :value="1">Other Income</a-radio>
        </a-radio-group>
      </a-form-item>
      <!-- <a-form-item label="3. No. of Sheets Attached">
        <a-input-number v-model="form.numOfSheet"></a-input-number>
      </a-form-item>
      <a-form-item label="4. Any Taxes Witheld?">
        <a-radio-group v-model="form.taxes_withheld">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>-->
    </a-form>

    <!-- Part I -->
    <a-form :form="form_part1" v-show="step===1">
      <a-divider orientation="left">
        <b>Part I: Background Information on Tax Filer and Spouse</b>
      </a-divider>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="5"
      >
        <a-input placeholder="Tax Identification Number" v-model="form.taxpayer.tin"></a-input>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="6"
      >
        <a-input-number 
        placeholder="RDO code" 
        style="width: 100%"
        max= "999" 
        v-model="form.taxpayer.rdo_code"></a-input-number>
      </a-form-item>
<!--  -->

      <a-form-item
      :labelCol="form_layout.label_col"
      :wrapperCol="form_layout.wrapper_col"
      label="7">
        <a-input-number placeholder="PSOC Code" max= "9999" style="width: 100%" v-model="form.taxpayer.psoc_code"></a-input-number>
      </a-form-item>
      
      <a-form-item 
      :labelCol="form_layout.label_col"
      :wrapperCol="form_layout.wrapper_col"
      label="8">
        <a-row>
          <a-col 
          :span="11"
          >
            <a-input placeholder="Last Name" v-model="form.taxpayer.contact_details.last"></a-input>
          </a-col>
          <a-col :span="11">
            <a-input placeholder="Given Name" v-model="form.taxpayer.contact_details.first"></a-input>
          </a-col>
          <a-col :span="2">
            <a-input placeholder="M.I." v-model="form.taxpayer.contact_details.middle"></a-input>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="9. Address">
        <a-textarea v-model="form.taxpayer.registered_address"></a-textarea>
      </a-form-item>
      <a-form-item label="10. Date of Birth">
        <a-date-picker v-model="form.taxpayer.birthday"></a-date-picker>
      </a-form-item>
      <a-form-item label="11. Email Address">
        <a-input v-model="form.taxpayer.email_address"></a-input>
      </a-form-item>
      <a-form-item label="12. Contact Number">
        <a-input v-model="form.taxpayer.telephone_no"></a-input>
      </a-form-item>
<a-form-item label="13. Civil Status">
        <a-radio-group v-model="form.taxpayer.civil_status">
          <a-radio :value="0">Single</a-radio>
          <a-radio :value="1">Married</a-radio>
          <a-radio :value="2">Legally Separated</a-radio>
          <a-radio :value="3">Widow/er</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item                                                            
        label="14. Claiming Additional Exemptions?"
      >
        <a-radio-group v-model="form.taxpayer.claiming_add_exemp">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="15. If YES, enter number of Qualified Dependent Children">
        <a-input v-model="form.taxpayer.no_dependents"></a-input>
      </a-form-item>
      <!-- spouse details -->
       <a-form-item label="16. Spouse's Name">
        <a-row>
          <a-col :span="11">
            <a-input placeholder="Last Name" v-model="form.taxpayer.spouse_name_last"></a-input>
          </a-col>
          <a-col :span="11">
            <a-input placeholder="First Name" v-model="form.taxpayer.spouse_name_first"></a-input>
          </a-col>
          <a-col :span="2">
            <a-input placeholder="M.I." v-model="form.taxpayer.spouse_name_middle"></a-input>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="17. Spouse's TIN number">
        <a-input v-model="form.taxpayer.spouse_tin"></a-input>
      </a-form-item>
      <a-form-item label="18. Contact Number">
        <a-input v-model="form.taxpayer.spouse_contact_number"></a-input>
      </a-form-item>
       <a-form-item label="19. Date of Birth">
        <a-date-picker v-model="form.taxpayer.sbirthday"></a-date-picker>
      </a-form-item>
      <a-form-item label="20. Email Address">
        <a-input v-model="form.taxpayer.spouse_email"></a-input>
      </a-form-item>
       <a-form-item                                                            
        label="21. Claiming Additional Exemptions?"
      >
        <a-radio-group v-model="form.taxpayer.spouse_claiming_add_exemp">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="22. If YES, enter number of Qualified Dependent Children">
        <a-input v-model="form.taxpayer.spouse_no_dependents"></a-input>
      </a-form-item>
    </a-form>

    <!-- Part II -->
    <a-form :form="form_part2" v-show="step===2">
      <a-divider orientation="left">
        <b>Part II: Total Tax Payable</b>
      </a-divider>
      <a-form-item
        class="computation-item"
        label="23. Tax Filer's Tax Due"
      > 
        <a-input-number
          v-model="form.tax_filer_tax_due"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
       <a-form-item
        class="computation-item"
        label="24. Spouse's Tax Due"
      > 
        <a-input-number
          v-model="form.spouse_tax_due"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="25. Total Income Tax Due"
      > 
        <a-input-number
          v-model="form.total_income_tax_due"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="26. Less: Tax Filer's Tax Credits/Payments"
      > 
        <a-input-number
          v-model="form.less_tax_credits"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="27. Spouse's Tax Credits/Payments"
      > 
        <a-input-number
          v-model="form.spouse_less_tax_credits"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="28. Net Tax Payable (Overpayment)"
      > 
        <a-input-number
          v-model="form.net_tax_payable"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="29. Less: Portion of Tax Payable Allowed"
      > 
        <a-input-number
          v-model="form.portion_tax_payable"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="30. Add: Total Penalties"
      > 
        <a-input-number
          v-model="form.total_penalties"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="31. TOTAL AMOUNT PAYABLE Upon Filing (Overpayment)"
      >
        <a-input-number
          v-model="form.total_amount_payable"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-button v-show="sub==true" type="primary" block @click="submit">Submit</a-button>
    </a-form>
  </div>
</template>

<script>
// import form_1601e_image from "@/assets/forms/1601e.jpg";

export default {
  props: ["form", "step"],
  data() {
    return {
      sub: false,
      // form_1601e_image,
      form_general: this.$form.createForm(this),
      form_part1: this.$form.createForm(this),
      form_part2: this.$form.createForm(this),
      // form_part3: this.$form.createForm(this),
      image_height: 1000,
      formatter: {
        amount: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      parser: {
        amount: value => value.replace(/\₱\s?|(,*)/g, "")
      },
      form_layout: {
        label_col: { span: 2 },
        wrapper_col: { span: 22 }
      },
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
  methods: {
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
      this.$store
        .dispatch("VALIDATE_AND_SAVE", {
          form_type: "1700",
          form_details: this.form
        })
        .then(result => {
          console.log("VALIDATE_AND_SAVE result:", result.data);
          this.loading = false;
          this.$store.commit("REMOVE_DRAFT_FORM", this.$route.query.ref_no);
          this.$store.commit("NOTIFY_MESSAGE", { message: 'Successfully submitted Form 1700.' })
          // window.opener.location.reload();
          window.close();
        })
        .catch(err => {
          console.log("VALIDATE_AND_SAVE", err);
          this.loading = false;
        });
    },
    // submit() {
    //   this.form.validateFieldsAndScroll((err, values) => {
    //     if (!err) console.log("values :", values);
    //   });
    // }
  },
  // watch: {
  //   form: {
  //     handler(val) {
  //       console.log("##### update 1601e ");
  //     },
  //     deep: true
  //   }
  // },
  created() {
    console.log("1700");
    // console.log("this.$ref.container.height :", this.$refs);
    // console.log("test :", this.$refs.container.height);
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style>
/* .tax-form .computation-item {
  padding-left: 50px;
}

.tax-form .computation-item .ant-input-number {
  width: 40vh;
} */
</style>