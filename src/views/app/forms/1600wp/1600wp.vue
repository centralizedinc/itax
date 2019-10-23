<template>
  <div>
    <a-form :form="form_general" v-show="step===0">
      <a-divider>
        <b>Withholding Tax Declaration (1600WP)</b>
      </a-divider>
      <a-form-item label="1. For the month of (MM/DD/YYYY)">
        <a-date-picker v-model="form.fromPeriod" />
        <a-date-picker v-model="form.toPeriod" />
      </a-form-item>
      <a-form-item label="2. Amended Return">
        <a-radio-group v-model="form.amended_yn">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="3. No. of Sheets Attached">
        <a-input-number v-model="form.num_of_sheet"></a-input-number>
      </a-form-item>
      <a-form-item label="4. Any Taxes Witheld?">
        <a-radio-group v-model="form.taxes_withheld">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>

    <!-- Part I -->
    <a-form :form="form_part1" v-show="step===1">
      <a-divider orientation="left">
        <b>Part I: Background Information</b>
      </a-divider>
      <a-form-item label="5. TIN NUMBER">
        <a-input v-model="form.taxpayer.tin"></a-input>
      </a-form-item>
      <a-form-item label="6. RDO Code">
        <a-input v-model="form.taxpayer.rdo_code"></a-input>
      </a-form-item>
      <a-form-item label="7. Category of Withholding Agent">
        <a-radio-group v-model="form.taxpayer.category_withholding_agent">
          <a-radio :value="true">Private</a-radio>
          <a-radio :value="false">Government</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="8. Withholding Agent's Name/Registered Name">
        <a-input v-model="form.taxpayer.registered_name"></a-input>
      </a-form-item>
      <a-form-item label="9. Registered Address">
        <a-textarea v-model="form.taxpayer.registered_address"></a-textarea>
      </a-form-item>
      <a-form-item label="10. Zip Code">
        <a-input-number v-model="form.taxpayer.zip_code"></a-input-number>
      </a-form-item>
      <a-form-item
        label="11. Are you availing of tax relief under Special Law or International Tax Treaty?"
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
    <a-form :form="form_part2" v-show="step===2">
      <a-divider orientation="left">
        <b>Part II: Computation of Tax</b>
      </a-divider>
      <a-form-item label="12. Tax Required to be Withheld and Remitted">
        <a-input-number v-model="form.taxpayer.required_withheld_and_remitted"></a-input-number>
      </a-form-item>
      <a-form-item
        label="13. Less: Tax Remitted in Return Previously filed, if this is an amended return "
      >
        <a-input-number v-model="form.taxpayer.less_tax_remitted"></a-input-number>
      </a-form-item>
      <a-form-item label="14. Tax Still Due(Overremittance) ">
        <a-input-number v-model="form.taxpayer.tax_still_due"></a-input-number>
      </a-form-item>
      <a-form-item label="15A. Surcharge ">
        <a-input-number v-model="form.taxpayer.surcharge"></a-input-number>
      </a-form-item>
      <a-form-item label="15B. Interest ">
        <a-input-number v-model="form.taxpayer.interest"></a-input-number>
      </a-form-item>
      <a-form-item label="15C. Compromise ">
        <a-input-number v-model="form.taxpayer.compromise"></a-input-number>
      </a-form-item>
      <a-form-item label="15D. Tax Required to be withheld ">
        <a-input-number v-model="form.taxpayer.taxrequiredtobewithheld"></a-input-number>
      </a-form-item>
      <a-form-item label="16. Tax Required to be withheld ">
        <a-input-number v-model="form.taxpayer.taxrequiredtobewithheld16"></a-input-number>
      </a-form-item>
      <a-form-item label="16. if overremittance">
        <a-radio-group v-model="form.taxpayer.overremittance">
          <a-radio :value="true">To be Refunded</a-radio>
          <a-radio :value="false">To be issued a Tax Credit Certificate</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="16. For the month of (MM/DD/YYYY)">
        <a-date-picker v-model="form.frommPeriod" />
        <a-date-picker v-model="form.tooPeriod" />
      </a-form-item>
      <a-button v-show="sub==true" type="primary" block @click="submit">Submit</a-button>
    </a-form>
  </div>
</template>

<script>
// import form_1601e_image from "@/assets/forms/1600wp.jpg";

export default {
  props: ["form", "step"],
  data() {
    return {
      sub: false,
      // form_1600wp_image,
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
          form_type: "1600WP",
          form_details: this.form
        })
        .then(result => {
          console.log("VALIDATE_AND_SAVE result:", result.data);
          this.loading = false;
          this.$store.commit("REMOVE_DRAFT_FORM", this.$route.query.ref_no);
          this.$store.commit("NOTIFY_MESSAGE", {
            message: "Successfully submitted Form 2550m."
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
  //       console.log("##### update 1600wp ");
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