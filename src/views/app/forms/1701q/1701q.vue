<template>
  <div>
    <a-form :form="form_general" v-show="step===0">
      <a-divider>
        <b>Quarterly Income Tax Return(1701Q)</b>
      </a-divider>
      <a-form-item label="1. For the Year (MM/20YY)">
        <a-month-picker style="width: 100%" v-model="form.dateFiled" />
      </a-form-item>
      <a-form-item label>
        <a-radio-group v-model="form.quarter">
          <a-radio :value="1">First</a-radio>
          <a-radio :value="2">Second</a-radio>
          <a-radio :value="3">Third</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="3. Amended Return">
        <a-radio-group v-model="form.amendedYn">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        :labelCol="form.label_col"
        :wrapperCol="form.wrapper_col"
        label="4. Number of Sheets"
      >
        <a-input-number v-model="form.numOfSheet" style="width: 100%" />
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
          max="9999999999999"
          placeholder="Tax Identification Number"
          v-model="form.taxpayer.tin"
          :formatter="value => `${value}`.replace(/^(\d{3})(\d{3})(\d{3})(\d{4})/g, '$1-$2-$3-$4')"
          :parser="value => value.replace(/\$\s?|(-*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="6. RDO Code">
        <a-input v-model="form.taxpayer.rdo_code"></a-input>
      </a-form-item>
      <a-form-item label="7. Tax Filer Type">
        <a-radio-group v-model="form.taxpayer.tax_filer_type">
          <a-radio :value="SP">Single Proprietor</a-radio>
          <a-radio :value="PRO">Professional</a-radio>
          <a-radio :value="EST">Estate</a-radio>
          <a-radio :value="TRU">Trust</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="8. Alphanumeric Tax Code (ATC)">
        <a-radio-group v-model="form.atc">
          <a-radio :value="II012">II012 Business Income-Graduated IT Rates</a-radio>
          <a-radio :value="II015">II015 Business Income - 8% IT Rate</a-radio>
          <a-radio :value="II014">II014 Income from Profession–Graduated IT Rates</a-radio>
          <a-radio :value="II017">II017 Income from Profession – 8% IT Rate</a-radio>
          <a-radio :value="II013">II013 Mixed Income–Graduated IT Rates</a-radio>
          <a-radio :value="II016">II016 Mixed Income – 8% IT Rate</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="9. Taxpayer’s Name ( ESTATE of / TRUST FAO ):">
        <a-input
          placeholder="Last Name, First Name, Middle Name"
          v-model="form.taxpayer.taxpayer_name"
        ></a-input>
      </a-form-item>
      <a-form-item label="10. Registered Address">
        <a-textarea
          placeholder="Indicate complete address. If branch, indicate the branch address. If the registered address is different from the current address, go to the RDO to update registered address by using BIR Form No. 1905"
          v-model="form.taxpayer.registered_address"
        ></a-textarea>
      </a-form-item>
      <a-form-item label="10A. Zip Code">
        <a-input-number style="width: 100%" v-model="form.taxpayer.zip_code"></a-input-number>
      </a-form-item>
      <a-form-item label="11. Date of Birth (MM/DD/YYYY)">
        <a-date-picker style="width: 100%" v-model="form.taxpayer.birthday"></a-date-picker>
      </a-form-item>
      <a-form-item label="12. Email Address">
        <a-input v-model="form.taxpayer.email_address"></a-input>
      </a-form-item>
      <a-form-item label="13. Citizenship ">
        <a-input style="width: 100%" v-model="form.taxpayer.citizenship"></a-input>
      </a-form-item>
      <a-form-item label="14. Foreign Tax Number (if applicable)">
        <a-input-number style="width: 100%" v-model="form.taxpayer.foreign_tax_no"></a-input-number>
      </a-form-item>
      <a-form-item label="15. Claiming Foreign Tax Credits?">
        <a-radio-group v-model="form.taxCredits">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="16. Tax Rate*(choose one,for income from business/profession):">
        <a-radio-group v-model="form.taxRate">
          <a-radio
            :value="GR"
          >Graduated Rates per Tax Table- page 2 (Choose Method of Deduction in Item 16A)</a-radio>
          <a-radio
            :value="GS"
          >8% on gross sales/receipts & other non-operating income in lieu of Graduated Rates</a-radio>
          <p>
            under Sec. 24(A)(2)(a) & Percentage Tax
            under Sec. 116 of the NIRC, as amended [available if gross sales/receipts and other non-operating income do not exceed Three million pesos (P3M)]
          </p>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="16A. Method of Deduction:">
        <a-radio-group v-model="form.method_deduction">
          <a-radio :value="ID">Itemized Deduction [Sec. 34(A-J), NIRC]</a-radio>
          <a-radio
            :value="OSD"
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
          style="width:100%"
          max="9999999999999"
          placeholder="Tax Identification Number"
          v-model="form.taxpayer.spouse_tin"
          :formatter="value => `${value}`.replace(/^(\d{3})(\d{3})(\d{3})(\d{4})/g, '$1-$2-$3-$4')"
          :parser="value => value.replace(/\$\s?|(-*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="18. RDO Code">
        <a-input v-model="form.taxpayer.spouse_rdo_code"></a-input>
      </a-form-item>
      <a-form-item label="19. Filer’s Spouse Type">
        <a-radio-group v-model="form.taxpayer.spouse_tax_filer_type">
          <a-radio :value="SSP">Single Proprietor</a-radio>
          <a-radio :value="SPRO">Professional</a-radio>
          <a-radio :value="SCE">Compensation Earner</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="20. ATC">
        <a-radio-group v-model="form.spouse_atc">
          <a-radio :value="SII012">II012 Business Income-Graduated IT Rates</a-radio>
          <a-radio :value="SII015">II015 Business Income - 8% IT Rate</a-radio>
          <a-radio :value="SII014">II014 Income from Profession–Graduated IT Rates</a-radio>
          <a-radio :value="SII017">II017 Income from Profession – 8% IT Rate</a-radio>
          <a-radio :value="SII013">II013 Mixed Income–Graduated IT Rates</a-radio>
          <a-radio :value="SII016">II016 Mixed Income – 8% IT Rate</a-radio>
          <a-radio :value="SII011">II011 Compensation Income</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="21. Spouse’s Name:">
        <a-input
          placeholder="Last Name, First Name, Middle Name"
          v-model="form.taxpayer.spouse_name"
        ></a-input>
      </a-form-item>
      <a-form-item label="22. Citizenship ">
        <a-input v-model="form.taxpayer.spouse_citizenship"></a-input>
      </a-form-item>
      <a-form-item label="23. Foreign Tax Number (if applicable)">
        <a-input-number style="width: 100%" v-model="form.taxpayer.spouse_foreign_tax_no"></a-input-number>
      </a-form-item>
      <a-form-item label="24. Claiming Foreign Tax Credits?">
        <a-radio-group v-model="form.spouse_taxCredits">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="25. Tax Rate*(choose one,for income from business/profession):">
        <a-radio-group v-model="form.spouse_taxRate">
          <a-radio
            :value="SGR"
          >Graduated Rates per Tax Table- page 2 (Choose Method of Deduction in Item 16A)</a-radio>
          <a-radio
            :value="SOGS"
          >8% on gross sales/receipts & other non-operating income in lieu of Graduated Rates</a-radio>
          <p>
            under Sec. 24(A)(2)(a) & Percentage Tax
            under Sec. 116 of the NIRC, as amended [available if gross sales/receipts and other non-operating income do not exceed Three million pesos (P3M)]
          </p>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="25A. Method of Deduction:">
        <a-radio-group v-model="form.spouse_method_deduction">
          <a-radio :value="SID">Itemized Deduction [Sec. 34(A-J), NIRC]</a-radio>
          <a-radio
            :value="SOSD"
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
      <a-form-item label="26. Tax Due"></a-form-item>
      <a-form-item class="computation-item" label="A)Taxpayer/Filer">
        <a-input-number
          v-model="form.item26a"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="B)Spouse">
        <a-input-number
          v-model="form.item26b"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="27. Less: Tax Credits/Payments (From Part V, Schedule III-Item 62)"></a-form-item>
      <a-form-item class="computation-item" label="A)Taxpayer/Filer">
        <a-input-number
          v-model="form.item27a"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="B)Spouse">
        <a-input-number
          v-model="form.item27b"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        label="28. Tax Payable/(Overpayment)(Item 26 Less Item 27)(From Part V, Item 63)"
      ></a-form-item>
      <a-form-item class="computation-item" label="A)Taxpayer/Filer">
        <a-input-number
          v-model="form.item28a"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="B)Spouse">
        <a-input-number
          v-model="form.item28b"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="29. Add: Total Penalties (From Part V, Schedule IV-Item 67)"></a-form-item>
      <a-form-item class="computation-item" label="A)Taxpayer/Filer">
        <a-input-number
          v-model="form.item29a"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="B)Spouse">
        <a-input-number
          v-model="form.item29b"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        label="30. Total Amount Payable/(Overpayment)(Sum of Items 28 and 29)(From Part V, Item 68)"
      ></a-form-item>
      <a-form-item class="computation-item" label="A)Taxpayer/Filer">
        <a-input-number
          v-model="form.item30a"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="B)Spouse">
        <a-input-number
          v-model="form.item30b"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        label="31. Total Amount Payable/(Overpayment)(Sum of Items 28 and 29)(From Part V, Item 68)"
      ></a-form-item>
      <a-form-item class="computation-item" label="(Sum of Items 30A and 30B)">
        <a-input-number
          v-model="form.item31"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
    </a-form>

    <!-- Part IV -->
    <a-form :form="form_part4" v-show="step===4">
      <a-divider orientation="left">
        <b>Part IV: DETAILS OF PAYMENT</b>
      </a-divider>
      <a-form-item label="32. Cash/Bank Debit Memo"></a-form-item>
      <a-form-item class="computation-item" label="Drawee Bank/Agency">
        <a-input-number
          v-model="form.item32a"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="Number">
        <a-input-number
          v-model="form.item32b"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="Date (MM/DD/YYYY)">
        <a-input-number
          v-model="form.item32c"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="Amount">
        <a-input-number
          v-model="form.item32d"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="33. Check"></a-form-item>
      <a-form-item class="computation-item" label="Drawee Bank/Agency">
        <a-input-number
          v-model="form.item33a"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="Number">
        <a-input-number
          v-model="form.item33b"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="Date (MM/DD/YYYY)">
        <a-input-number
          v-model="form.item33b"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="Amount">
        <a-input-number
          v-model="form.item34c"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="34. Tax Debit Memo"></a-form-item>
      <a-form-item class="computation-item" label="Number">
        <a-input-number
          v-model="form.item34a"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="Date (MM/DD/YYYY)">
        <a-input-number
          v-model="form.item34b"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="Amount">
        <a-input-number
          v-model="form.item34c"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="35. Others"></a-form-item>
      <a-form-item class="computation-item" label="Particulars">
        <a-input-number
          v-model="form.item35a"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="Drawee Bank/Agency">
        <a-input-number
          v-model="form.item35b"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="Number">
        <a-input-number
          v-model="form.item35c"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="Date (MM/DD/YYYY)">
        <a-input-number
          v-model="form.item35d"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="Amount">
        <a-input-number
          v-model="form.item35e"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  props: ["form", "step"],
  data() {
    return {
      sub: false,
      // form_1601e_image,
      form_general: this.$form.createForm(this),
      form_part1: this.$form.createForm(this),
      form_part2: this.$form.createForm(this),
      form_part3: this.$form.createForm(this),
      form_part4: this.$form.createForm(this),
      image_height: 1000
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
          form_type: "1701Q",
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