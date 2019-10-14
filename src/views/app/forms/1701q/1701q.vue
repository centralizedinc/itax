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
        :validate-status="error_item('taxpayer.returnPeriodYear')"
        :help="error_desc('taxpayer.returnPeriodYear')"
      >
        <a-month-picker style="width: 100%" v-model="form.returnPeriodYear" />
      </a-form-item>
      <a-form-item label="Quarter"></a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="2."
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
        <a-radio-group v-model="form.amendedYn">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="4. Number of Sheets">
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
          :formatter="formatter.amount"
          :parser="parser.amount"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="6. RDO Code">
        <a-input v-model="form.taxpayer.rdo_code"></a-input>
      </a-form-item>
      <a-form-item label="7. Tax Filer Type">
        <a-radio-group v-model="form.taxpayer.tax_filer_type">
          <a-radio :value="'SP'">Single Proprietor</a-radio>
          <a-radio :value="'PRO'">Professional</a-radio>
          <a-radio :value="'EST'">Estate</a-radio>
          <a-radio :value="'TRU'">Trust</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="8. Alphanumeric Tax Code (ATC)">
        <a-radio-group v-model="form.atc" @change="changeATC">
          <a-radio :value="'II012'">II012 Business Income-Graduated IT Rates</a-radio>
          <a-radio :value="'II015'">II015 Business Income - 8% IT Rate</a-radio>
          <a-radio :value="'II014'">II014 Income from Profession–Graduated IT Rates</a-radio>
          <a-radio :value="'II017'">II017 Income from Profession – 8% IT Rate</a-radio>
          <a-radio :value="'II013'">II013 Mixed Income–Graduated IT Rates</a-radio>
          <a-radio :value="'II016'">II016 Mixed Income – 8% IT Rate</a-radio>
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
        <a-input-number style="width: 100%" v-model="form.taxpayer.foreign_tax_no"></a-input-number>
      </a-form-item>
      <a-form-item
        label="15. Claiming Foreign Tax Credits?"
        :validate-status="error_item('taxpayer.taxCredits')"
        :help="error_desc('taxpayer.taxCredits')"
      >
        <a-radio-group v-model="form.taxCredits">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="16. Tax Rate*(choose one,for income from business/profession):">
        <a-radio-group v-model="form.taxRate" disabled>
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
        <a-radio-group v-model="form.method_deduction">
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
          style="width:100%"
          max="9999999999999"
          placeholder="Tax Identification Number"
          v-model="form.taxpayer.spouse_tin"
          :formatter="formatter.amount"
          :parser="parser.amount"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="18. RDO Code">
        <a-input v-model="form.taxpayer.spouse_rdo_code"></a-input>
      </a-form-item>
      <a-form-item label="19. Filer’s Spouse Type">
        <a-radio-group v-model="form.taxpayer.spouse_tax_filer_type">
          <a-radio :value="'SSP'">Single Proprietor</a-radio>
          <a-radio :value="'SPRO'">Professional</a-radio>
          <a-radio :value="'SCE'">Compensation Earner</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="20. ATC">
        <a-radio-group v-model="form.spouse_atc">
          <a-radio :value="'SII012'">II012 Business Income-Graduated IT Rates</a-radio>
          <a-radio :value="'SII015'">II015 Business Income - 8% IT Rate</a-radio>
          <a-radio :value="'SII014'">II014 Income from Profession–Graduated IT Rates</a-radio>
          <a-radio :value="'SII017'">II017 Income from Profession – 8% IT Rate</a-radio>
          <a-radio :value="'SII013'">II013 Mixed Income–Graduated IT Rates</a-radio>
          <a-radio :value="'SII016'">II016 Mixed Income – 8% IT Rate</a-radio>
          <a-radio :value="'SII011'">II011 Compensation Income</a-radio>
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
        <a-radio-group v-model="form.spouse_method_deduction">
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
              v-model="form.item26a"
              :data="tax_due"
              placeholder="Tax Due"
              :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item style="margin-left: 75px;" label="B) Spouse"></a-form-item>
          <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
            <a-input-number
              v-model="form.item26b"
              placeholder="Tax Due"
              disabled
              :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-button style="margin-left: 15px;" type="link" @click="show = 1">Schedule I</a-button>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
            label="27."
          >
            <a-input-number
              v-model="form.item27a"
              placeholder="Less: Tax Credits/Payments(From "
              disabled
              :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
            <a-input-number
              v-model="form.item27b"
              placeholder="Part V, Schedule III-Item 62)"
              disabled
              :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-button style="margin-left: 15px;" type="link" @click="show = 3">Schedule III</a-button>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
            label="28."
          >
            <a-input-number
              v-model="form.item28a"
              placeholder="Tax Payable/(Overpayment)(Item "
              disabled
              :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
            <a-input-number
              v-model="form.item28b"
              placeholder="26 Less Item 27 From Part V,Item 63)"
              disabled
              :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
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
              v-model="form.item29a"
              placeholder="Add: Total Penalties (From Part V, "
              disabled
              :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
            <a-input-number
              v-model="form.item29b"
              placeholder="Schedule IV-Item 67)"
              disabled
              :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-button style="margin-left: 15px;" type="link" @click="show = 4">Schedule IV</a-button>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
            label="30."
          >
            <a-input-number
              v-model="form.item30a"
              placeholder="Total Amount Payable/Overpayment"
              disabled
              :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
            <a-input-number
              v-model="form.item30b"
              placeholder="Sum of Items 28/29 From Part V,Item 68"
              disabled
              :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
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
              v-model="form.item31a"
              placeholder="Aggregate Amount Payable/(Overpayment)"
              disabled
              :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
            ></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
            <a-input-number
              v-model="form.item31b"
              placeholder="(Sum of Items 30A and 30B)"
              disabled
              :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
            ></a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <!-- Part IV -->
    <a-form :form="form_part4" v-show="step===4">
      <a-divider orientation="left">
        <b>Part IV: DETAILS OF PAYMENT</b>
      </a-divider>
      <a-form-item label="Cash/Bank Debit Memo"></a-form-item>
      <a-form-item
        class="computation-item"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="32"
      >
        <a-input-number
          placeholder="Drawee Bank/Agency"
          v-model="form.item32a"
          :formatter="formatter.amount"
          :parser="parser.amount"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="32"
      >
        <a-input-number
          placeholder="Number"
          v-model="form.item32b"
          :formatter="formatter.amount"
          :parser="parser.amount"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="32"
      >
        <a-input-number
          placeholder="Date (MM/DD/YYYY)"
          v-model="form.item32c"
          :formatter="formatter.amount"
          :parser="parser.amount"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="32"
      >
        <a-input-number
          placeholder="Amount"
          v-model="form.item32d"
          :formatter="formatter.amount"
          :parser="parser.amount"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="Check"></a-form-item>
      <a-form-item
        class="computation-item"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="33"
      >
        <a-input-number
          placeholder="Drawee Bank/Agency"
          v-model="form.item33a"
          :formatter="formatter.amount"
          :parser="parser.amount"
          disabled
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="33"
      >
        <a-input-number
          placeholder="Number"
          v-model="form.item33b"
          :formatter="formatter.amount"
          :parser="parser.amount"
          disabled
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="33"
      >
        <a-input-number
          placeholder="Date (MM/DD/YYYY)"
          v-model="form.item33b"
          :formatter="formatter.amount"
          :parser="parser.amount"
          disabled
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="33"
      >
        <a-input-number
          placeholder="Amount"
          v-model="form.item34c"
          :formatter="formatter.amount"
          :parser="parser.amount"
          disabled
        ></a-input-number>
      </a-form-item>
      <a-form-item label="Tax Debit Memo"></a-form-item>
      <a-form-item
        class="computation-item"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="34"
      >
        <a-input-number
          placeholder="Number"
          v-model="form.item34a"
          :formatter="formatter.amount"
          :parser="parser.amount"
          disabled
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="34"
      >
        <a-input-number
          placeholder="Date (MM/DD/YYYY)"
          v-model="form.item34b"
          :formatter="formatter.amount"
          :parser="parser.amount"
          disabled
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="34"
      >
        <a-input-number
          placeholder="Amount"
          v-model="form.item34c"
          :formatter="formatter.amount"
          :parser="parser.amount"
          disabled
        ></a-input-number>
      </a-form-item>
      <a-form-item label="Others"></a-form-item>
      <a-form-item
        class="computation-item"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="35"
      >
        <a-input-number
          placeholder="Particulars"
          v-model="form.item35a"
          :formatter="formatter.amount"
          :parser="parser.amount"
          disabled
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="35"
      >
        <a-input-number
          placeholder="Drawee Bank/Agency"
          v-model="form.item35b"
          :formatter="formatter.amount"
          :parser="parser.amount"
          disabled
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="35"
      >
        <a-input-number
          placeholder="Number"
          v-model="form.item35c"
          :formatter="formatter.amount"
          :parser="parser.amount"
          disabled
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="35"
      >
        <a-input-number
          placeholder="Date (MM/DD/YYYY)"
          v-model="form.item35d"
          :formatter="formatter.amount"
          :parser="parser.amount"
          disabled
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="35"
      >
        <a-input-number
          placeholder="Amount"
          v-model="form.item35e"
          :formatter="formatter.amount"
          :parser="parser.amount"
          disabled
        ></a-input-number>
      </a-form-item>
      <br />
      <!-- <a-button type="link" @click="show = 1">Schedule I</a-button>
      <a-button type="link" @click="show = 2">Schedule II</a-button>
      <a-button type="link" @click="show = 3">Schedule III</a-button>
      <a-button type="link" @click="show = 4">Schedule IV</a-button>-->
    </a-form>
    <sched1 :show="show" @close="show = 0"></sched1>
    <sched2 :show="show" @close="show = 0"></sched2>
    <sched3 :show="show" @close="show = 0"></sched3>
    <sched4 :show="show" @close="show = 0"></sched4>
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
      // sched: 0,
      show: 0,
      sub: false,
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
    }
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
    submit() {
      this.loading = true;
      this.errors = [];
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
      this.form.taxRate = for_gr.includes(value)
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