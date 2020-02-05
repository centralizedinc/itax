<template>
  <div>
    <a-form :form="form_general" v-show="step===0">
      <a-divider>
        <b>Withholding Tax Declaration (1600WP)</b>
      </a-divider>
      <a-form-item label="1. For the Period of ">
        <!-- (MM/DD/YYYY) -->
       </a-form-item>
       <a-row>
         <a-col :span="12">
           <a-form-item label="From"
        :validate-status="error_item('fromDate')"
        :help="error_desc('fromDate')"
        >
        <a-date-picker v-model="form.start_month" @change="dateChange"/>
        </a-form-item>
         </a-col>
         <a-col :span="12">
           <a-form-item
       
          label= "To"
        :validate-status="error_item('toDate')"
        :help="error_desc('toDate')"
        >
        <a-date-picker disabled v-model="form.end_month" />
        </a-form-item>
         </a-col>
       </a-row>
       
        
      <a-form-item label="2. Amended Return"
      :validate-status="error_item('amended_yn')"
        :help="error_desc('amended_yn')"
      >
        <a-radio-group v-model="form.amended_yn">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="3. No. of Sheets Attached">
        <a-input-number v-model="form.num_of_sheet"></a-input-number>
      </a-form-item>
      <a-form-item label="4. Any Taxes Witheld?"
      
      :validate-status="error_item('form.any_tax_withheld')"
        :help="error_desc('form.any_tax_withheld')"
      >
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
      <a-form-item label="5. TIN NUMBER">
        <a-input v-model="form.taxpayer.tin"></a-input>
      </a-form-item>
      <a-form-item label="6. RDO Code">
        <a-input v-model="form.taxpayer.rdo_code"></a-input>
      </a-form-item>
      <a-form-item label="7. Category of Withholding Agent"
      
      :validate-status="error_item('category_of_agent')"
        :help="error_desc('category_of_agent')"
      >
        <a-radio-group v-model="form.category_of_agent">
          <a-radio :value="'private'">Private</a-radio>
          <a-radio :value="'government'">Government</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="8. Withholding Agent's Name/Registered Name">
        <a-input v-model="form.taxpayer.registered_name"></a-input>
      </a-form-item>
      <a-form-item label="9. Registered Address"
      :validate-status="error_item('address')"
        :help="error_desc('address')"
      >
        <a-textarea v-model="form.address"></a-textarea>
      </a-form-item>
      <a-form-item label="10. Zip Code"
      :validate-status="error_item('zipCode')"
        :help="error_desc('zipCode')"
      >
        <a-input-number v-model="form.zipCode" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item
        label="11. Are you availing of tax relief under Special Law or International Tax Treaty?"
      >
        <a-radio-group v-model="form.is_avail_tax_relief">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="If yes, specify">
        <a-input v-model="form.avail_tax_relief"></a-input>
      </a-form-item>
    </a-form>
    <!-- Part II -->
    <a-form :form="form_part2" v-show="step===2">
      <a-divider orientation="left">
        <b>
          Part II: Computation of Tax
          <a-button type="link" @click="openValidation()">(ATC)</a-button>
        </b>
      </a-divider>
      <a-button type="link" @click="openSchedule()">Schedule 1.1</a-button>
      <!-- ------------------------------ -->
      <!-- <a-table bordered :dataSource="data_source" :columns="columns" :pagination="false">
        <template slot="tax_base" slot-scope="text, record, index">
          <a-input-number :value="text" style="width:10vw" @change="e => computeAtc(e, index)"></a-input-number>
        </template>

        <template slot="rate" slot-scope="text, record, index">
          <span>{{record.rate*100}}%</span>
        </template>
        <template slot="tax_required" slot-scope="text, record, index">
          <span>{{record.tax_required}}</span>
        </template>
      </a-table>-->
      <!-- ----------------------------------- -->
      <a-form-item label="12. Tax Required to be Withheld and Remitted">
        <a-input-number style="width:100%" disabled v-model="form.tax_req_withld_remtd"></a-input-number>
      </a-form-item>
      <a-form-item
        label="13. Less: Tax Remitted in Return Previously filed, if this is an amended return "
      >
        <a-input-number style="width:100%" :disabled="!amended" v-model="form.less_tax_remtd_retrn"></a-input-number>
      </a-form-item>
      <a-form-item label="14. Tax Still Due(Overremittance) ">
        <a-input-number style="width:100%" disabled :value="overRemittance()"></a-input-number>
      </a-form-item>
      <a-form-item label="15A. Surcharge ">
        <a-input-number style="width:100%" v-model="form.surcharge"></a-input-number>
      </a-form-item>
      <a-form-item label="15B. Interest ">
        <a-input-number style="width:100%" v-model="form.interest"></a-input-number>
      </a-form-item>
      <a-form-item label="15C. Compromise ">
        <a-input-number style="width:100%" v-model="form.compromise"></a-input-number>
      </a-form-item>
      <a-form-item label="15D. Tax Required to be withheld ">
        <a-input-number style="width:100%" disabled :value="getPenalties()"></a-input-number>
      </a-form-item>
      <a-form-item label="16. Tax Required to be withheld ">
        <a-input-number style="width:100%" disabled :value="totalPayable()"></a-input-number>
      </a-form-item>
      <a-form-item label="16. if overremittance">
        <a-radio-group v-model="form.taxpayer.overremittance">
          <a-radio :value="true">To be Refunded</a-radio>
          <a-radio :value="false">To be issued a Tax Credit Certificate</a-radio>
        </a-radio-group>
      </a-form-item>
      <!-- <a-form-item label="16. For the month of (MM/DD/YYYY)">
        <a-date-picker v-model="form.frommPeriod" />
        <a-date-picker v-model="form.tooPeriod" />
      </a-form-item>-->
      <!-- <a-button v-show="sub==true" type="primary" block @click="submit">Submit</a-button> -->
    </a-form>
    <atc
      v-if="sched == 1"
      :disabled="form.any_tax_withheld == false"
      :form="form"
      :show="show"
      @close="updateAtcAndClose"
    ></atc>
    <schedule-one v-if="sched == 2" :form="form" :show="show" @close="updateScheduleAndClose"></schedule-one>
  </div>
</template>

<script>
// import form_1601e_image from "@/assets/forms/1600wp.jpg";
import atc from "./Atc";
import ScheduleOne from "./Schedule1";

export default {
  components: {
    atc,
    ScheduleOne
  },
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
      image_height: 1000,
      columns: [
        {
          title: "ATC",
          dataIndex: "atc",
          width: "5%",
          scopedSlots: { customRender: "atc" }
        },
        {
          title: "NATURE OF PAYMENT",
          dataIndex: "nature_payment",
          scopedSlots: { customRender: "nature_payment" },
          width: "35%"
        },
        {
          title: "TAX BASE",
          dataIndex: "tax_base",
          width: "10%",
          scopedSlots: { customRender: "tax_base" }
        },
        {
          title: "RATE",
          dataIndex: "rate",
          width: "5%",
          scopedSlots: { customRender: "rate" }
        },
        {
          title: "TAX REQUIRED TO BE WITHHELD",
          dataIndex: "tax_required",
          width: "10%",
          scopedSlots: { customRender: "tax_required" }
        }
      ],
      data_source: [
        {
          atc: "WB 191",
          nature_payment:
            "Tax on winnings or prizes paid to winners of winning horse race tickets other than double, forecast/quinella and trifecta bets; & owners of winning race horses paid by Government Withholding Agent",
          tax_base: 0,
          rate: 0.1,
          tax_required: 0.0
        },
        {
          atc: "WB 193",
          nature_payment:
            "Tax on winnings from double, forecast/quinella and trifecta bets on horse races paid by Private Withholding Agent",
          tax_base: 0,
          rate: 0.04,
          tax_required: 0.0
        },
        {
          atc: "WB 194",
          nature_payment:
            "Tax on winnings or prizes paid to winners of winning horse race tickets other than double, forecast/quinella and trifecta bets; and owners of winning race horses paid by Private Withholding Agent",
          tax_base: 0,
          rate: 0.1,
          tax_required: 0.0
        }
      ],
      errors: []
    };
  },
  watch: {
    form() {
      console.log(
        "created taxpayer data: " + JSON.stringify(this.form.taxpayer)
      );
      console.log("form end_month: ", this.form.taxpayer.end_month)
      
    }
    // step() {
    //   if (this.step < 0) {
    //     this.$router.push("/");
    //   } else if (this.step == 2) {
    //     this.sub = true;
    //   }
    // }
  },
  computed:{
    amended(){
      if(this.form.amended_yn == true){
        return true
      }
      return false      
    }
  },
  mounted(){
    this.form.taxpayer.end_month = new Date()
    console.log("form end_month: ", this.form.taxpayer.end_month)
  },
  methods: {
    updateAtcAndClose(data) {
      this.form.atc_list = [];
      this.show = 0;
      this.form.atc_list = data.atc_list;
      console.log(
        "update atc and close atc lise data: " +
          JSON.stringify(this.form.atc_list)
      );
      this.form.tax_req_withld_remtd = data.total_amount_payable;
    },
    updateScheduleAndClose(data) {
      this.form.sched1 = [];
      this.show = 0;
      this.form.sched1 = data.sched1;
      this.form.total_tax_req_withheld = data.total_tax;
      this.form.total_amount = data.total_amount;
      console.log(
        "update schedule and close data: " + JSON.stringify(this.form.sched1)
      );
    },
    dateChange(){
      this.form.end_month = this.form.start_month
      this.form.return_period = this.form.end_month
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
        this.form.any_tax_withheld == true &&
        this.form.taxpayer.category_withholding_agent !== undefined
      ) {
        console.log("if");
        this.sched = 1;
      }  if (!this.form.any_tax_withheld) {
        console.log("else if 1");
        if (this.form.any_tax_withheld == false) {
          this.$notification.open({
            message:
              "It is not necessary to select an ATC if you dont have any taxes withheld (Item no.4 is set to NO)"
          });
        } else {
          this.$notification.open({
            message: "Please select an option for Item no. 4"
          });
        }
      } if (!this.form.taxpayer.category_withholding_agent) {
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
      console.log("form end_month: emit ", this.form.taxpayer.end_month)
    },
    // validatePage1() {
    //   if (!this.form.taxpayer.start_month) {
    //     this.errors.push({
    //       page: 0,
    //       field: "fromDate",
    //       error: "Date is mandatory field."
    //     });
    //   }else if ( !this.form.taxpayer.end_month) {
    //     this.errors.push({
    //       page: 0,
    //       field: "toDate",
    //       error: "Date is mandatory field."
    //     });
    //   }
    //    else if (!this.form.any_tax_withheld) {
    //     this.errors.push({
    //       page: 0,
    //       field: "any_tax_withheld",
    //       error: "Taxes withhled is mandatory field."
    //     });
    //   } else if (!this.form.amended_yn) {
    //     this.errors.push({
    //       page: 0,
    //       field: "amended_yn",
    //       error: "Amended Return withhled is mandatory field."
    //     });
    //   } else {
    //     this.changeStep(this.step + 1);
    //   }
    //   // for the meantime
    //   this.changeStep(this.step + 1);
    //   console.log("validate page 1 errors: " + JSON.stringify(this.errors));
    // },
    // validatePage2() {
    //   this.changeStep(this.step + 1);
    // },
    validate(is_validate_all) {
      console.log("form end_month validate: ", this.form.taxpayer.end_month)
      // this.step == 0
        // ? this.validatePage1()
        // : this.step == 1
        // ? this.validatePage2()
        // : this.changeStep(this.step + 1);
        // ------------------------
      // if(this.step === 0) this.validateGeneral();
      // else if(this.step === 1) this.validatePartI();
      // -----------------------------
      var errors = [];
      if (is_validate_all || this.step === 0) {
        if (!this.form.start_month) {
        errors.push({
          page: 0,
          field: "fromDate",
          error: "Date From is mandatory field."
        });
      } if (!this.form.end_month) {
        errors.push({
          page: 0,
          field: "toDate",
          error: "Date To is mandatory field."
        });
      } if(this.form.amended_yn == null || this.form.amended_yn == undefined || this.amended_yn == ""){
        errors.push({
          page: 0,
          field: "amended_yn",
          error: "Amended Return is mandatory field."
        })
      } if (this.form.any_tax_withheld === null || this.form.any_tax_withheld === undefined || this.form.any_tax_withheld === "") {
       console.log("form.any_tax_withheld value: ",this.form.any_tax_withheld)
       errors.push({
          page: 0,
          field: "form.any_tax_withheld",
          error: "Taxes withhled is mandatory field."
        });
      }
      }
      if(is_validate_all || this.step === 1){
        if(!this.form.category_of_agent){
          errors.push({
            page: 1,
            field: "category_of_agent",
            error: "Category of Withholding Agent is mandotory field."
          })
        } if(!this.form.address){
          errors.push({
            page: 1,
            field: "address",
            error: "Registered Address is mandatory field."
          })
        } if(!this.form.zipCode){
          errors.push({
            page: 1,
            field: "zipCode",
            error: "Zipcode is mandatory field."
          })
        }
      }
      console.log("1600WP errors: " + JSON.stringify(errors))
      this.$emit("error", errors);
      if (!errors.length) {
        this.changeStep(this.step + 1);
      }
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
       this.errors = [];
      this.$store
        .dispatch("VALIDATE_AND_SAVE", {
          form_type: "1600WP",
          form_details: this.form
        })
        .then(result => {
          if(result.data.errors && result.data.errors.length > 0){
            this.errors = result.data.errors;
            console.log("this is errors list: " + JSON.stringify(this.errors))
            if(this.errors && this.errors[0] && this.errors[0].page !== null){
              this.$emit("changeStep", this.errors[0].page);
            this.$notification.error({ message: "Validation Error" });
            }
          } else {
            console.log("VALIDATE_AND_SAVE result:", result.data);
            this.loading = false;
            this.$store.commit("REMOVE_DRAFT_FORM", this.$route.query.ref_no);
            this.$store.commit("NOTIFY_MESSAGE", {
              success: true,
              message: "Successfully submitted Form 1600WP."
            });
            // window.opener.location.reload();
            window.close();
          }          
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
    },
    error_item(item) {
      console.log("form end_month: ", this.form.taxpayer.end_month)
     console.log("##item :", JSON.stringify(item));
      return this.errors.find(x => x.field === item) ? "error" : "";
  },
  error_desc(item) {
    console.log("form end_month: ", this.form.taxpayer.end_month)
    console.log("##desc :", JSON.stringify(item));
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
  // watch: {
  //   form: {
  //     handler(val) {
  //       console.log("##### update 1600wp ");
  //     },
  //     deep: true
  //   }
  // },
  created() {
    console.log("form end_month: ", this.form.taxpayer.end_month)
    // console.log("this.$ref.container.height :", this.$refs);
    // console.log("test :", this.$refs.container.height);
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    console.log("form end_month: ", this.form.taxpayer.end_month)
    window.removeEventListener("scroll", this.handleScroll);
  },
  
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