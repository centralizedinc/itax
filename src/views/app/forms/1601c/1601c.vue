<template>
  <div>
    <a-form :form="form_general" v-show="step===0">
      <a-divider>
        <b>Withholding Tax Declaration (1601c)</b>
      </a-divider>
      <a-form-item label="1. For the month of (MM/DD/YYYY)">
        <a-date-picker v-model="form.start_month" />
      </a-form-item>
      <a-form-item label="2. Amended Return">
        <a-radio-group v-model="form.amended_yn">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
            <a-form-item label="3. Any Taxes Witheld?">
        <a-radio-group v-model="form.any_tax_withheld">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
      <a-form-item label="4. No. of Sheets Attached">
        <a-input-number v-model="form.num_of_sheet"></a-input-number>
      </a-form-item>
      <a-form-item label="5. ATC">
        <a-radio-group v-model="form.atc">
          <a-radio :value="true">Individual</a-radio>
          <a-radio :value="false">Corporation</a-radio>
        </a-radio-group>
      </a-form-item>

    <!-- Part I -->
    <a-form :form="form_part1" v-show="step===1">
      <a-divider orientation="left">
        <b>Part I: Background Information</b>
      </a-divider>
      <!-- Tin -->
      <a-form-item label="6. Taxpayer Identification Number (TIN)">
        <a-input v-model="form.taxpayer.tin"></a-input>
      </a-form-item>
      <a-form-item label="7. RDO Code">
        <a-input v-model="form.taxpayer.rdo_code"></a-input>
      </a-form-item>
       <a-form-item label="8. Withholding Agent's Name">
        <a-radio-group v-model="form.taxpayer.name">
          <a-radio :value="true">Private</a-radio>
          <a-radio :value="false">Government</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="9. Registered Address">
        <a-textarea v-model="forms.address"></a-textarea>
      </a-form-item>
      <a-form-item label="9A. ZIP Code">
        <a-input v-model="form.taxpayer.zip_code"></a-input>
      </a-form-item>
      <a-form-item label="10. Contact  Number">
        <a-input v-model="form.taxpayer.contact_details"></a-input>
      </a-form-item>
      <a-form-item label="11. Category of Withholding  ">
        <a-radio-group v-model="category_of_agent">
          <a-radio :value="true">Private</a-radio>
          <a-radio :value="false">Goverment</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="12. Email Address">
        <a-textarea v-model="form.email"></a-textarea>
      </a-form-item>
            <a-form-item label="13. Availing of Tax relief Under?">
        <a-radio-group v-model="form.is_avail_tax_relief">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
          <a-form-item label="13A If yes, specify">
        <a-textarea v-model="form.avail_tax_relief"></a-textarea>
      </a-form-item>
                         
      
    <!-------Part II Computation of tax --------->

<a-form-item label="14. Total Amount of Compensation">
        <a-input v-model="form.compensation"></a-input>
      </a-form-item>

<a-form-item label="15. Statutory Minimum Wage">
        <a-input v-model="form.statutory_minimum_wage"></a-input>
      </a-form-item>

  <a-form-item label="16. Holiday Pay">
        <a-input v-model="form.hazard_pay"></a-input>
      </a-form-item>

      <a-form-item label="17. 13th Month pay">
        <a-input v-model="form.other_benefits"></a-input>
      </a-form-item>

      <a-form-item label="18. De Minimis Benefits">
        <a-input v-model="form.minimis_benefits"></a-input>
      </a-form-item>

      <a-form-item label="19. SSS">
        <a-input v-model="form.mandatory_contribution"></a-input>
      </a-form-item>

      <a-form-item label="20. Other Non taxable">
        <a-input v-model="form.other_taxable_compensation"></a-input>
      </a-form-item>

      <a-form-item label="21. Total Non taxable">
        <a-input v-model="form.non_taxable_compensation"></a-input>
      </a-form-item>

      <a-form-item label="22. Total taxable com pensation">
        <a-input v-model="form.total_taxable_compensation"></a-input>
      </a-form-item>

      <a-form-item label="23. Less taxable compensation">
        <a-input v-model="form.less_taxable_compensation"></a-input>
      </a-form-item>

      <a-form-item label="24. Net taxable compensation">
        <a-input v-model="form.net_taxable_required"></a-input>
      </a-form-item>

      <a-form-item label="25. Total Taxes witheld">
        <a-input v-model="form.total_taxes_witheld"></a-input>
      </a-form-item>

      <a-form-item label="26. Add/less adjustment ">
        <a-input v-model="form.adjustment"></a-input>
      </a-form-item>

      <a-form-item label="27. taxes witheld for remitance">
        <a-input v-model="form.tax_required_remittance"></a-input>
      </a-form-item>

<a-form-item label="28. Less tax remitted">
        <a-input v-model="form.tax_remitted_previously"></a-input>
      </a-form-item>

      <a-form-item label="29. other remittances">
        <a-input v-model="form.other_payments_made"></a-input>
      </a-form-item>

      <a-form-item label="30. total tax remittance">
        <a-input v-model="form.total_payments_made"></a-input>
      </a-form-item>

      <a-form-item label="31 tax still due">
      <a-input v-model="form.tax_due"></a-input>
      </a-form-item>

      <a-form-item label="32. Surcharge">
        <a-input v-model="form.surcharge"></a-input>
      </a-form-item>

      <a-form-item label="33. interest">
        <a-input v-model="form.interest"></a-input>
      </a-form-item>

      <a-form-item label="34. Compromize">
        <a-input v-model="form.compromise"></a-input>
      </a-form-item>

      <a-form-item label="35. Total penalties">
        <a-input v-model="form.penalties"></a-input>
      </a-form-item>

      <a-form-item label="36. Total amount still due">
        <a-input v-model="form.total_amount_payable"></a-input>
      </a-form-item>
      

      <!-- <a-form-item label="15.Classification of Property">
        <a-radio-group v-model="form.statutory_minimum_wage">
          <a-radio :value="'RES'">Residential</a-radio>
          <a-radio :value="'AGR'">Agriculture</a-radio>
          <a-radio :value="'COM'">Commercial</a-radio>
          <a-radio :value="'IND'">Industrial</a-radio>
          <a-radio :value="'CONR'">Condominum Residential</a-radio>
          <a-radio :value="'CONC'">Condominum Commercial</a-radio>
        </a-radio-group>
        <a-form-item label="If yes, specify"></a-form-item>
        <a-textarea v-model="form.plsspecify"></a-textarea>
      </a-form-item>
      <a-form-item label="16. location of the Property">
        <a-input v-model="form.loc_property"></a-input>
      </a-form-item>
      <a-form-item label="17. Brief Description of the Property">
        <a-input v-model="form.area_sold_sqm"></a-input>
        <a-form-item label="Tax Doc Number">
          <a-input v-model="form.tax_doc_no"></a-input>
           <a-form-item label="TCT/OCT/CCT">
          <a-input v-model="form.tct"></a-input>
            <a-form-item label="Others">
          <a-input v-model="form.others"></a-input>
        </a-form-item>
      </a-form-item>
       </a-form-item>
       </a-form-item> -->

      <!-- <a-form-item label="10. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
      <a-form-item
        label="11. Are you availing of tax relief under Special Law or International Tax Treaty?"
      >
        <a-radio-group v-model="form.is_avail_tax_relief">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>-->
      <!-- <a-form-item label="If yes, specify">
        <a-input v-model="form.avail_tax_relief"></a-input>
      </a-form-item>-->
    <!-- </a-form> -->
    <!-- Part II -->
    <!-- <a-form :form="form_part2" v-show="step===2">
      <a-divider orientation="left">
        <b>Part II: Computation of Tax</b>
      </a-divider>
      <a-form-item label="12. Tax Required to be Withheld and Remitted">
        <a-input-number v-model="form.tax_req_withld_remtd"></a-input-number>
      </a-form-item>
      <a-form-item
        label="13. Less: Tax Remitted in Return Previously filed, if this is an amended return "
      >
        <a-input-number v-model="form.less_tax_remtd_retrn"></a-input-number>
      </a-form-item>
      <a-form-item label="14. Tax Still Due(Overremittance) ">
        <a-input-number v-model="form.tax_due"></a-input-number>
      </a-form-item>
      <a-form-item label="15A. Surcharge ">
        <a-input-number v-model="form.surcharge"></a-input-number>
      </a-form-item>
      <a-form-item label="15B. Interest ">
        <a-input-number v-model="form.interest"></a-input-number>
      </a-form-item>
      <a-form-item label="15C. Compromise ">
        <a-input-number v-model="form.compromise"></a-input-number>
      </a-form-item>
      <a-form-item label="15D. Tax Required to be withheld ">
        <a-input-number v-model="form.penalties"></a-input-number>
      </a-form-item>
      <a-form-item label="16. Tax Required to be withheld ">
        <a-input-number v-model="form.total_amount_payable"></a-input-number>
      </a-form-item>
      <a-form-item label="16. if overremittance">
        <a-radio-group v-model="form.taxpayer.overremittance">
          <a-radio :value="true">To be Refunded</a-radio>
          <a-radio :value="false">To be issued a Tax Credit Certificate</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="16. For the month of (MM/DD/YYYY)">
        <a-date-picker v-model="form.start_month" />
        <a-date-picker v-model="form.end_month" />
      </a-form-item>
      <a-button v-show="sub==true" type="primary" block @click="submit">Submit</a-button>
    </a-form>-->
  </div>
</template>

<script>
// import form_1606_image from "@/assets/forms/1606.jpg";

export default {
  props: ["form", "step"],
  data() {
    return {
      sub: false,
      // form_1601c_image,
      form_general: this.$form.createForm(this),
      form_part1: this.$form.createForm(this),
      form_part2: this.$form.createForm(this),
      form_part3: this.$form.createForm(this),
      image_height: 1000
    };
  },
  watch: {
    form() {
      console.log(
        "created taxpayer data: " + JSON.stringify(this.form.taxpayer)
      );
    }
    // step() {
    //   if (this.step < 0) {
    //     this.$router.push("/");
    //   } else if (this.step == 2) {
    //     this.sub = true;
    //   }
    // }
  },
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
    // validateGeneral() {
    //   this.loading = true;
    //   this.form_general.validateFieldsAndScroll((err, values) => {
    //     if (!err) {
    //       console.log("validateGeneral :", values);
    //       this.changeStep(1, values);
    //     }
    //     this.loading = false;
    //   });
    // },
    // validatePartI() {
    //   this.loading = true;
    //   this.form_part1.validateFieldsAndScroll((err, values) => {
    //     if (!err) {
    //       console.log("validatePartI :", values);
    //       this.changeStep(2, values);
    //     }
    //     this.loading = false;
    //   });
    // },
    // validatePartII() {
    //   this.loading = true;
    //   this.form_part2.validateFieldsAndScroll((err, values) => {
    //     if (!err) {
    //       console.log("validatePartII :", values);
    //       this.$emit("updateForm", values);
    //     } else this.loading = false;
    //   });
    // },
    submit() {
      this.loading = true;
      this.$store
        .dispatch("VALIDATE_AND_SAVE", {
          form_type: "1601c",
          form_details: this.form
        })
        .then(result => {
          console.log("VALIDATE_AND_SAVE result:", result.data);
          this.loading = false;
          this.$store.commit("REMOVE_DRAFT_FORM", this.$route.query.ref_no);
          this.$store.commit("NOTIFY_MESSAGE", {
            message: "Successfully submitted Form 1601c."
          });
          // window.opener.location.reload();
          window.close();
        })
        .catch(err => {
          console.log("VALIDATE_AND_SAVE", err);
          this.loading = false;
        });
    },
    save_draft() {},
    changeStep(step, form) {
      this.$emit("changeStep", step);
      this.$emit("updateForm", form);
    }
    // submit() {
    //   this.form.validateFieldsAndScroll((err, values) => {
    //     if (!err) console.log("values :", values);
    //   });
    // }
  },
  // watch: {
  //   form: {
  //     handler(val) {
  //       console.log("##### update 1606 ");
  //     },
  //     deep: true
  //   }
  // },
  created() {
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
