<template>
  <div>
    <a-form :form="form_general" v-show="step===0">
      <a-divider>
        <b>Withholding Tax Declaration (1606)</b>
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
      <a-form-item label="3." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input-number
          style="width:100%"
          v-model="form.num_of_sheet"
          placeholder="No. of Sheets Attached"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="4. Any Taxes Witheld?">
        <a-radio-group v-model="form.any_tax_withheld">
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
      <!-- buyers tin -->
      <a-form-item label="5." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.taxpayer.tin" placeholder="BUYERS TIN NUMBER"></a-input>
      </a-form-item>
      <a-form-item label="6." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.taxpayer.rdo_code" placeholder="RDO CODE"></a-input>
      </a-form-item>
      <!-- seller tin? -->
      <a-form-item label="7." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.seller_details" placeholder="SELLER TIN NUMBER"></a-input>
      </a-form-item>
      <!-- seller rdo code? -->
      <a-form-item label="8." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.taxpayer.rdo_code" placeholder="SELLER RDO CODE"></a-input>
      </a-form-item>
      <a-form-item label="9." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input
          style="100%"
          v-model="form.taxpayer.registered_name"
          placeholder="BUYERS REGISTERED NAME"
        ></a-input>
      </a-form-item>
      <!-- seller register name? -->
      <a-form-item label="10." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input
          style="100%"
          v-model="form.taxpayer.registered_name"
          placeholder="SELLER REGISTERED NAME"
        ></a-input>
      </a-form-item>
      <a-form-item label="11." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-textarea style="100%" v-model="form.address" placeholder="BUYERS REGISTERED ADDRESS"></a-textarea>
      </a-form-item>
      <!-- seller registered address -->
      <a-form-item label="12." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-textarea style="100%" v-model="form.address" placeholder="SELLER REGISTERED ADDRESS"></a-textarea>
      </a-form-item>

      <a-form-item label="13. ATC">
        <a-radio-group v-model="form.atc_code">
          <a-radio :value="true">Individual</a-radio>
          <a-radio :value="false">Corporation</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="14. Category of Withholding Agent">
        <a-radio-group v-model="form.taxes_withheld">
          <a-radio :value="true">Private</a-radio>
          <a-radio :value="false">Government</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="15. Classification of Property">
        <a-radio-group v-model="form.classification_property">
          <a-radio :value="'RES'">Residential</a-radio>
          <a-radio :value="'AGR'">Agriculture</a-radio>
          <a-radio :value="'COM'">Commercial</a-radio>
          <a-radio :value="'IND'">Industrial</a-radio>
          <a-radio :value="'CONR'">Condominum Residential</a-radio>
          <a-radio :value="'CONC'">Condominum Commercial</a-radio>
        </a-radio-group>
        <!-- specify? -->
        <a-form-item label=" " :labelCol="{span:1}" :wrapperCol="{span:12}">
          <a-textarea style="100%" v-model="form.plsspecify" placeholder="IF YES, SPECIFY"></a-textarea>
        </a-form-item>
      </a-form-item>

      <!-- ok -->
      <a-form-item label="16." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input
          style="100%"
          v-model="form.location_property"
          placeholder="LOCATION OF THE PROPERTY"
        ></a-input>
      </a-form-item>
      <a-form-item label="17." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <!-- ok -->
        <a-input
          style="100%"
          v-model="form.area_sold"
          placeholder="BRIEF DESCRIPTION OF THE PROPERTY"
        ></a-input>

        <a-input v-model="form.tax_doc_no" placeholder="TAX DOC NUMBER"></a-input>
        <!-- ok -->

        <a-input style="100%" v-model="form.tct_no" placeholder="TCT/OCT/CCT"></a-input>

        <a-input style="100%" v-model="form.others" placeholder="OTHERS"></a-input>
      </a-form-item>
      <!-- ok -->
      <a-form-item label="18. Does the Selling price cover more than one property?">
        <a-radio-group v-model="form.selling_property">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        label="19. Are you availing of tax relief under an international Tax treaty of special law?"
      >
        <a-radio-group v-model="form.selling_property1">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label=" " :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-textarea style="100%" v-model="form.plsspecifyy" placeholder="IF YES SPECIFY"></a-textarea>
      </a-form-item>

      <a-form-item label="20. Description if Transaction (Mark one box only) ">
        <a-radio-group v-model="form.transaction_payment">
          <a-radio :value="'CAS'">Cash</a-radio>
          <a-radio :value="'EXE'">Exempt</a-radio>
          <a-radio :value="'INS'">Installment Sale</a-radio>
          <a-radio :value="'FOR'">Foreclosure Sale</a-radio>
          <a-radio :value="'OTH'">Others</a-radio>
        </a-radio-group>
        <a-form-item label=" " :labelCol="{span:1}" :wrapperCol="{span:12}">
          <a-textarea
            style="100%"
            v-model="form.trans_specify"
            placeholder="IF EXEMPT, OR OTHERS SPECIFY"
          ></a-textarea>
        </a-form-item>
      </a-form-item>
      <!-- ok 21-->

      <a-form-item label="21." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.selling_price" placeholder="SELLING PRICE"></a-input>
      </a-form-item>
      <!-- ok 22 -->
      <a-form-item label="22." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.cost_expenses" placeholder="COST AND OTHER EXPENSES"></a-input>
      </a-form-item>
      <!-- ok  23-->
      <a-form-item label="23." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.mortgage_assumed" placeholder="MORTGAGE ASSUMED"></a-input>
      </a-form-item>
      <!-- ok  24-->
      <a-form-item label="24." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input
          style="100%"
          v-model="form.total_payments_initial_year"
          placeholder=" TOTAL PAYMENTS DURING INITIAL YEAR"
        ></a-input>
      </a-form-item>
      <!-- ok  25-->
      <a-form-item label="25." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input
          style="100%"
          v-model="form.amount_installment_month"
          placeholder="AMOUNT OF INSTALLMENT THIS MONTH"
        ></a-input>
      </a-form-item>

      <a-form-item label="26. " :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input
          style="100%"
          v-model="form.total_contract"
          placeholder="TOTAL INSTALLMENT IN THE CONTRACT"
        ></a-input>
      </a-form-item>

      <a-form-item label="27. Fair Market Value (FMV) - Valuation at the time of the Contract">
        <a-checkbox @change="onChange" v-model="form.A27">27A FMV of Land per latest Tax Declaration</a-checkbox>
      </a-form-item>
      <a-form-item label=" " :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.A277" placeholder></a-input>
      </a-form-item>

      <a-form-item label>
        <a-checkbox
          @change="onChange"
          v-model="form.B27"
        >27B FMV of Improvements per latest Tax Declaration</a-checkbox>
      </a-form-item>
      <a-form-item label=" " :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.B277" placeholder></a-input>
      </a-form-item>

      <a-form-item label>
        <a-checkbox
          @change="onChange"
          v-model="form.C27"
        >27C FMV of Land as determined by BIR Commissioner (zonal value)</a-checkbox>
      </a-form-item>
      <a-form-item label=" " :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.C277" placeholder></a-input>
      </a-form-item>

      <a-form-item label>
        <a-checkbox
          @change="onChange"
          v-model="form.D27"
        >27D FMV of Improvements as determined by BIR Commissioner (BIR RULES)</a-checkbox>
      </a-form-item>
      <a-form-item label=" " :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.D277" placeholder></a-input>
      </a-form-item>

      <a-form-item label="28. Determination of Taxable Base">
        <a-checkbox @change="onChange" v-model="form.A28">28A Gross Selling Price</a-checkbox>
      </a-form-item>
      <a-form-item label=" " :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.A288" placeholder></a-input>
      </a-form-item>

      <a-form-item label>
        <a-checkbox
          @change="onChange"
          v-model="form.B28"
        >28B Fair Market Value of land and improvement</a-checkbox>
      </a-form-item>
      <a-form-item label=" " :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.B288" placeholder></a-input>
      </a-form-item>

      <a-form-item label>
        <a-checkbox @change="onChange" v-model="form.C28">28C Bid Price (for foreclosure sale)</a-checkbox>
      </a-form-item>
      <a-form-item label=" " :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.C288" placeholder></a-input>
      </a-form-item>

      <a-form-item label>
        <a-checkbox
          @change="onChange"
          v-model="form.D28"
        >28D Installment Collected for Installment sale including interest</a-checkbox>
      </a-form-item>
      <a-form-item label=" " :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.D288" placeholder></a-input>
      </a-form-item>

      <a-form-item label>
        <a-checkbox @change="onChange" v-model="form.E28">28E Others (Specify)</a-checkbox>
      </a-form-item>

      <a-form-item label=" " :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.E288" placeholder></a-input>
      </a-form-item>
      <a-form-item label=" " :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.E2888" placeholder="Computation1"></a-input>
      </a-form-item>
      <a-form-item label=" " :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.E28888" placeholder="Computation2"></a-input>
      </a-form-item>
</a-form>
  <!-- Part II -->
    <a-form :form="form_part1" v-show="step===2">
      <a-divider orientation="left">
        <b>Part II: Computation</b>
      </a-divider>
      <a-form-item label="29. Is the seller habitually engaged in real estate business?">
        <a-radio-group v-model="form.estate">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="30." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.taxbase" placeholder="TAXABLE BASE"></a-input>
      </a-form-item>

      <a-form-item label="31." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.taxrate" placeholder="TAX RATE"></a-input>
      </a-form-item>

      <a-form-item label="32. " :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.taxreq" placeholder="TAX REQUIRED TO BE WITHHELD"> </a-input>
      </a-form-item>

      <a-form-item label="33." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.taxpaid" placeholder="LESS: TAX PAID"></a-input>
      </a-form-item>
      <!-- ok 34-->
      <a-form-item label="34." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input v-model="form.tax_due" placeholder="TAX STILL DUE"></a-input>
      </a-form-item>
      <!-- ok 35a -->
      <a-form-item label=" " :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.surcharge" placeholder="SURCHARGE"></a-input>
        <!-- ok 35b -->
      </a-form-item>
      <a-form-item label=" " :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.interest" placeholder="INTEREST"></a-input>
        <!-- ok 35c -->
      </a-form-item>
      <a-form-item label=" " :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.compromise" placeholder="COMPROMISE"></a-input>
        <!-- ok 35d -->
      </a-form-item>
      <a-form-item label=" " :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.penalties" placeholder="PENALTIES"></a-input>
        <!-- ok 36 -->
      </a-form-item>
      <a-form-item label="36. Total Amount Payable">
        <a-radio-group v-model="form.total_amount_payable">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
// import form_1606_image from "@/assets/forms/1606.jpg";

export default {
  props: ["form", "step"],
  data() {
    return {
      sub: false,
      // form_1606_image,
      form_general: this.$form.createForm(this),
      form_part1: this.$form.createForm(this),
      form_part2: this.$form.createForm(this),
      form_part3: this.$form.createForm(this),
      image_height: 1000,
      form_layout: {
        label_col: { span: 2 },
        wrapper_col: { span: 22 }
      }
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
          form_type: "1606",
          form_details: this.form
        })
        .then(result => {
          console.log("VALIDATE_AND_SAVE result:", result.data);
          this.loading = false;
          this.$store.commit("REMOVE_DRAFT_FORM", this.$route.query.ref_no);
          this.$store.commit("NOTIFY_MESSAGE", {
            message: "Successfully submitted Form 1606."
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