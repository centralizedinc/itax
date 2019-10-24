<template>
  <div>
    <a-form :form="form_general" v-show="step===0">
      <a-divider>
        <b>Withholding Tax Declaration (1601E)</b>
      </a-divider>
      <a-form-item label="1. For the month of (MM/YYYY)">
        <a-month-picker v-model="form.return_period" />
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
    <a-form :form="form_part2" v-show="step===2">
      <a-divider>
        <b>Part II: Computation of Tax</b>
      </a-divider>
      <a-button type="primary" block @click="show_sched1=true">ATC</a-button>
      <br />
      <schedule-one
        v-if="show_sched1"
        :show="show_sched1"
        :form="form"
        @close="updateSchedAndClose"
      />

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="14. Total Tax Required to be Withheld and Remitted"
      >
        <a-input
          v-model="form.total_tax_withheld_remitted"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input>
      </a-form-item>

      <a-form-item label="15. Less: Tax Credits/Payments"></a-form-item>
      <a-form-item
        class="computation-item"
        label="15A. Tax Remitted in Return Previously Filed, if this is an Amended Return"
      >
        <a-input-number v-model="form.prevTaxPaidCrdtb" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="15B. Advance Payments Made(please attach proof of payments - BIR Form No. 0605)"
      >
        <a-input-number v-model="form.advPayment" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="15C. Total Tax Credits/Payments(Sum of Items 15A&15b)"
      >
        <a-input-number v-model="form.totTaxCredits" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="16. Tax Still Due/(Overremittance)(Sum of Items 15A&15B)"
      >
        <a-input-number v-model="form.amtPayblCrdtb" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item label="17. Add: Penalties"></a-form-item>
      <a-form-item class="computation-item" label="17A. Surcharge">
        <a-input-number v-model="form.surcharge" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="17B. Interest">
        <a-input-number v-model="form.interest" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="17C. Compromise">
        <a-input-number v-model="form.compromise" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="17D">
        <a-input-number v-model="form.penaltiesCrdtb" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="18. Total Amount Still Due/(Overremittance)(Sum of Items 16&17D)"
      >
        <a-input-number v-model="form.total_amount_overremitance" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item label="if overremittance, mark one box only:">
        <a-radio-group v-model="form.overremittance">
          <a-radio :value="true">To be Refunded</a-radio>
          <a-radio :value="false">To be issued a Tax Credit Certificate</a-radio>
        </a-radio-group>
      </a-form-item>
      <!-- <a-button v-show="sub==true" type="primary" block @click="submit">Submit</a-button> -->
    </a-form>
    <!-- Part III -->
    <a-form :form="form_part3" v-show="step===3">
      <a-divider orientation="left">
        <b>Part III: Details of Payment</b>
      </a-divider>
      <a-form-item class="computation-item" label="21. Cash/Bank Debit Memo">
        <a-input-number v-model="form.item21" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item label="22. Check"></a-form-item>
      <a-form-item class="computation-item" label="22A">
        <a-input-number v-model="form.item21a" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="22B">
        <a-input-number v-model="form.item22b" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="22C">
        <a-input-number v-model="form.item22c" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="22D">
        <a-input-number v-model="form.item22d" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item label="23. Others"></a-form-item>
      <a-form-item class="computation-item" label="23A">
        <a-input-number v-model="form.item23a" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="23B">
        <a-input-number v-model="form.item23b" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="23C">
        <a-input-number v-model="form.item23c" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="23D">
        <a-input-number v-model="form.item23d" style="width:100%"></a-input-number>
      </a-form-item>
      <!-- <a-button v-show="sub==true" type="primary" block @click="submit">Submit</a-button> -->
    </a-form>
    <!-- <a-button v-show="sub==false" @click="step--">Previous</a-button>
    <a-button v-show="sub==false" type="primary" @click="step++">Next</a-button>-->
  </div>
</template>

<script>
// import form_1601e_image from "@/assets/forms/1601e.jpg";
import ScheduleOne from "./Schedule1";
export default {
  components: {
    ScheduleOne
  },
  props: ["form", "step", "er rors"],
  data() {
    return {
      sub: false,
      // form_1601e_image,
      show_sched1: false,
      loading: false,
      form_general: this.$form.createForm(this),
      form_part1: this.$form.createForm(this),
      form_part2: this.$form.createForm(this),
      form_part3: this.$form.createForm(this),
      image_height: 1000,
      form_layout: {
        label_col: {
          span: 2
        },
        wrapper_col: {
          span: 22
        }
      }
    };
  },
  watch: {
    // step() {
    //   if (this.step < 0) {
    //     this.$router.push("/");
    //   } else if (this.step == 2) {
    //     this.sub = true;
    //   }
    // }
  },
  methods: {
    validate() {
      this.changeStep(this.step + 1);
    },
    updateSchedAndClose() {
      this.show_sched1 = false;
    },
    save_draft() {},
    changeStep(step, form) {
      this.$emit("changeStep", step);
      this.$emit("updateForm", form);
    },
    submit() {
      this.loading = true;
      this.$store
        .dispatch("VALIDATE_AND_SAVE", {
          form_type: "1601E",
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
  //       console.log("##### update 1601e ");
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
</style>