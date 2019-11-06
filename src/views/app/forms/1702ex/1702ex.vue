<template>
  <div>
    <a-form :form="form_general" v-show="step===0">
      <a-divider>
        <b>Withholding Tax Declaration (1702ex)</b>
      </a-divider>
      <a-form-item label="1. For the month of (MM/DD/YYYY)">
        <a-date-picker v-model="form.start_month" />
        <a-date-picker v-model="form.end_month" />
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
        <a-radio-group v-model="form.any_tax_withheld">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
       <a-form-item label="5. Any Taxes Witheld?">
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
      <a-form-item label="6. TIN NUMBER">
        <a-input v-model="form.taxpayer.tin"></a-input>
      </a-form-item>
      <a-form-item label="7. RDO Code">
        <a-input v-model="form.taxpayer.rdo_code"></a-input>
      </a-form-item>
      <a-form-item label="8. Category of Withholding Agent">
        <a-radio-group v-model="form.category_of_agent">
          <a-radio :value="true">Private</a-radio>
          <a-radio :value="false">Government</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="9. Withholding Agent's Name/Registered Name">
        <a-input v-model="form.taxpayer.registered_name"></a-input>
      </a-form-item>
      <a-form-item label="10. Registered Address">
        <a-textarea v-model="form.address"></a-textarea>
      </a-form-item>
      <a-form-item label="11. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
      <a-form-item
        label="12. Are you availing of tax relief under Special Law or International Tax Treaty?"
      >
        <a-radio-group v-model="form.is_avail_tax_relief">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="If yes, specify">
        <a-input v-model="form.avail_tax_relief"></a-input>
      </a-form-item>
       <a-form-item label="13. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
       <a-form-item label="14. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
       <a-form-item label="15. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
       <a-form-item label="16. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
       <a-form-item label="17. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
    </a-form>


    <!-- Part II -->
    <a-form :form="form_part2" v-show="step===2">
      <a-divider orientation="left">
        <b>Part II: Total Tax Payable</b>
      </a-divider>
      <a-form-item label="18. TIN NUMBER">
        <a-input v-model="form.taxpayer.tin"></a-input>
      </a-form-item>
      <a-form-item label="19. RDO Code">
        <a-input v-model="form.taxpayer.rdo_code"></a-input>
      </a-form-item>
      <a-form-item label="20. Category of Withholding Agent">
        <a-radio-group v-model="form.category_of_agent">
          <a-radio :value="true">Private</a-radio>
          <a-radio :value="false">Government</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="21. Withholding Agent's Name/Registered Name">
        <a-input v-model="form.taxpayer.registered_name"></a-input>
      </a-form-item>
      <a-form-item label="22. Registered Address">
        <a-textarea v-model="form.address"></a-textarea>
      </a-form-item>
      <a-form-item label="23. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
      
    </a-form>
    <!-- Part III -->
    <!-- Part IV -->
    <a-form :form="form_part3" v-show="step===3">
      <a-divider orientation="left">
        <b>Part IV: Computation of Tax</b>
      </a-divider>
      <a-form-item label="28. TIN NUMBER">
        <a-input v-model="form.taxpayer.tin"></a-input>
      </a-form-item>
      <a-form-item label="29. RDO Code">
        <a-input v-model="form.taxpayer.rdo_code"></a-input>
      </a-form-item>
      <a-form-item label="30. Category of Withholding Agent">
        <a-radio-group v-model="form.category_of_agent">
          <a-radio :value="true">Private</a-radio>
          <a-radio :value="false">Government</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="31. Withholding Agent's Name/Registered Name">
        <a-input v-model="form.taxpayer.registered_name"></a-input>
      </a-form-item>
      <a-form-item label="32. Registered Address">
        <a-textarea v-model="form.address"></a-textarea>
      </a-form-item>
      <a-form-item label="33. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
      <a-form-item
        label="34. Are you availing of tax relief under Special Law or International Tax Treaty?"
      >
        <a-radio-group v-model="form.is_avail_tax_relief">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="If yes, specify">
        <a-input v-model="form.avail_tax_relief"></a-input>
      </a-form-item>
      <a-form-item label="35. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
      <a-form-item label="36. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
      <a-form-item label="37. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
      <a-form-item label="38. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
      <a-form-item label="39. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
      <a-form-item label="40. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
       <a-form-item label="41. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
      <a-form-item label="42. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
      <a-form-item label="43. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
       <a-form-item label="44. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
      <a-form-item label="45. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
      <a-form-item label="46. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
       <a-form-item label="47. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
      <a-form-item label="48. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
      <a-form-item label="49. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
      <a-form-item label="50. Zip Code">
        <a-input-number v-model="form.zipCode"></a-input-number>
      </a-form-item>
    </a-form>

<!-- Part V -->
    <a-form :form="form_part4" v-show="step===4">
      <a-divider orientation="left">
        <b>Part V: Tax Relief Availment</b>
      </a-divider>
      <a-form-item label="51. TIN NUMBER">
        <a-input v-model="form.taxpayer.tin"></a-input>
      </a-form-item>
      <a-form-item label="52. RDO Code">
        <a-input v-model="form.taxpayer.rdo_code"></a-input>
      </a-form-item>
      <a-form-item label="53. Category of Withholding Agent">
        <a-radio-group v-model="form.category_of_agent">
          <a-radio :value="true">Private</a-radio>
          <a-radio :value="false">Government</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-button v-show="sub==true" type="primary" block @click="submit">Submit</a-button>
    </a-form>

    <!-- Part VI -->
    <!-- <a-form :form="form_part5" v-show="step===5">
      <a-divider orientation="left">
        <b>
          Part VI: Schedules
          <a-button type="link" @click="openValidation()">(ATC)</a-button>
        </b>
      </a-divider>
      <a-button type="link" @click="openSchedule()">Schedule 1.1</a-button>
      
      <a-button v-show="sub==true" type="primary" block @click="submit">Submit</a-button>
    </a-form> -->
    </div>
</template>

<script>
// import form_1601e_image from "@/assets/forms/1600wp.jpg";


export default {
  props: ["form", "step", "errors"],
  data() {
    return {
      sub: false,
      sched: 0,
      show: 0,
      // form_1600wp_image,
      form_general: this.$form.createForm(this),
      form_part1: this.$form.createForm(this),
      form_part2: this.$form.createForm(this),
      form_part3: this.$form.createForm(this),
      form_part4: this.$form.createForm(this),
      // form_part5: this.$form.createForm(this),
      image_height: 1000,
     
    };
  },
  watch: {
    form() {
      console.log(
        "created taxpayer data: " + JSON.stringify(this.form.taxpayer)
      );
    },
    step() {
     if(this.step == 3){
         this.form.pdf_page = 1
     }else{
         this.form.pdf_page = 0
     }
    }
  },
  methods: {
    updateAtcAndClose(data) {
      this.show = 0;
      this.form.atc_list = data.atc_list;
      console.log("update atc and close atc lise data: " + JSON.stringify(this.form.atc_list))
      this.form.tax_req_withld_remtd = data.total_amount_payable;
    },
    updateScheduleAndClose(data) {
      this.show = 0;
    },
    openSchedule() {
      if (this.form.tax_req_withld_remtd > 0) {
        this.sched = 2;
        this.show = 2;
      } else {
        this.$notification.open({
          message: "Please fillup ATC first"
        });
      }
    },
    overRemittance() {
      var total =
        (this.form.tax_req_withld_remtd || 0) -
        (this.form.less_tax_remtd_retrn || 0);
      this.form.tax_due = total;
      return total;
    },
    getPenalties() {
      var total = this.computeSum([
        this.form.surcharge,
        this.form.interest,
        this.form.compromise
      ]);
      this.form.penalties = total;
      return total;
    },
    totalPayable() {
      var total = this.computeSum([this.form.tax_due, this.form.penalties]);
      this.form.total_amount_payable = total;
      return total;
    },
    openValidation() {
      console.log(
        "open validation " + this.form.taxpayer.category_withholding_agen
      );
      this.sched = 1;
      this.show = 1;
      if (
        this.form.taxes_withheld == true &&
        this.form.taxpayer.category_withholding_agent !== undefined
      ) {
        console.log("if");
        this.sched = 1;
      } else if (!this.form.taxes_withheld) {
        console.log("else if 1");
        if (this.form.taxes_withheld == false) {
          this.$notification.open({
            message:
              "It is not necessary to select an ATC if you dont have any taxes withheld (Item no.4 is set to NO)"
          });
        } else {
          this.$notification.open({
            message: "Please select an option for Item no. 4"
          });
        }
      } else if (!this.form.taxpayer.category_withholding_agent) {
        console.log("else if 2");
        this.$notification.open({
          message: "Please select an option for Item no. 7"
        });
      } else {
      }
    },
    save_draft() {},
    changeStep(step, form) {
      this.$emit("changeStep", step);
      this.$emit("updateForm", form);
    },
    validatePage1() {
      if (!this.form.fromPeriod || !this.form.toPeriod) {
        this.errors.push({
          page: 0,
          field: "fromToPeriod",
          error: "Date is mandatory field."
        });
      } else if (!this.form.taxes_withheld) {
        this.errors.push({
          page: 0,
          field: "taxes_withheld",
          error: "Taxes withhled is mandatory field."
        });
      } else if (!this.form.amended_yn) {
        this.errors.push({
          page: 0,
          field: "amended_yn",
          error: "Amended Return withhled is mandatory field."
        });
      } else {
        this.changeStep(this.step + 1);
      }
      // for the meantime
      this.changeStep(this.step + 1);
      console.log("validate page 1 errors: " + JSON.stringify(this.errors));
    },
    validatePage2() {
      this.changeStep(this.step + 1);
    },
    validate() {
      this.step == 0
        ? this.validatePage1()
        : this.step == 1
        ? this.validatePage2()
        : this.changeStep(this.step + 1);
      // if(this.step === 0) this.validateGeneral();
      // else if(this.step === 1) this.validatePartI();
    },
    submit() {
      this.loading = true;
      this.$store
        .dispatch("VALIDATE_AND_SAVE", {
          form_type: "1702ex",
          form_details: this.form
        })
        .then(result => {
          console.log("VALIDATE_AND_SAVE result:", result.data);
          this.loading = false;
          this.$store.commit("REMOVE_DRAFT_FORM", this.$route.query.ref_no);
          this.$store.commit("NOTIFY_MESSAGE", {
            message: "Successfully submitted Form 1702ex."
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
    
  },
  created() {
      this.form.pdf_page = 0
    // console.log("this.$ref.container.height :", this.$refs);
    // console.log("test :", this.$refs.container.height);
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  error_item(item) {
    console.log("item error item: " + JSON.stringify(item));
    return this.errors.find(x => x.field === item) ? "error" : "";
  },
  error_desc(item) {
    return this.errors.find(x => x.field === item)
      ? this.errors.find(x => x.field === item).error
      : "";
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