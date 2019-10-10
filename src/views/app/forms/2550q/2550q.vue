<template>
  <div>
    <a-form :form="form_general" v-show="step===0">
      <a-divider>
        <b>Quarterly Value-Added Tax Return (2550Q)</b>
      </a-divider>
      <a-form-item label="1. For the Year Ended">
        <a-radio-group v-model="form.yearended">
          <a-radio :value="true">Calendar</a-radio>
          <a-radio :value="false">Fiscal</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label>
        <a-month-picker v-model="form.dateFiled" />
      </a-form-item>
      <a-form-item label="2. Quarter">
        <a-radio-group v-model="form.quarter">
          <a-radio :value="1">1st</a-radio>
          <a-radio :value="2">2nd</a-radio>
          <a-radio :value="3">3rd</a-radio>
          <a-radio :value="4">4th</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="3. Return Period">
        From:
        <a-month-picker v-model="form.dateFiled1" />To:
        <a-month-picker v-model="form.dateFiled2" />
      </a-form-item>

      <a-form-item label="4. Amended Return?">
        <a-radio-group v-model="form.amendedYn">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="5. Short Period Return?">
        <a-radio-group v-model="form.shortperiod">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
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
        <b>Part I: Background Information</b>
      </a-divider>
      <a-form-item label="6. TIN NUMBER">
        <a-input-number
          v-model="form.taxpayer.tin"
          :formatter="value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ~ ')"
        ></a-input-number>
        <!-- <a-input-number v-model="form.taxpayer.tin1" :min="0" :max="999" style="width: 10%"></a-input-number> 
        <a-input-number v-model="form.taxpayer.tin2" :min="0" :max="999" style="width: 10%"></a-input-number>-->
      </a-form-item>

      <a-form-item label="7. RDO Code">
        <a-input v-model="form.taxpayer.rdo_code"></a-input>
      </a-form-item>
      <a-form-item label="8. No. of Sheets Attached">
        <a-input-number v-model="form.numOfSheet"></a-input-number>
      </a-form-item>

      <a-form-item label="9. Line of Business/Occupation">
        <a-input v-model="form.taxpayer.line_business"></a-input>
      </a-form-item>
      <a-form-item label="10. Withholding Agent's Name/Registered Name">
        <a-input v-model="form.taxpayer.taxpayer_name"></a-input>
      </a-form-item>
      <a-form-item label="11. Telephone Number">
        <a-input-number v-model="form.taxpayer.telephone_no"></a-input-number>
      </a-form-item>
      <a-form-item label="12. Registered Address">
        <a-textarea v-model="form.taxpayer.registered_address"></a-textarea>
      </a-form-item>
      <a-form-item label="13. Zip Code">
        <a-input-number v-model="form.taxpayer.zip_code"></a-input-number>
      </a-form-item>

      <a-form-item
        label="14. Are you availing of tax relief under Special Law or International Tax Treaty?"
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

      <!-- Part II 15 Vatable Sales/Receipt-Private (Sch. 1) -->
      <a-form-item label="15 Vatable Sales/Receipt-Private (Sch. 1)" />
      <a-form-item
        label="15A"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Sales/Receipt for the Month" v-model="form.totalAtcAmount"></a-input-number>
      </a-form-item>
      <a-form-item
        label="15B"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Sales/Receipt for the Month" v-model="form.totalAtcOutput"></a-input-number>
      </a-form-item>
      <!-- Part II 16 Sale to Government -->
      <a-form-item label="16 Sale to Government" />
      <a-form-item
        label="16A"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Sales/Receipt for the Quarter" v-model="form.salesGovAmount"></a-input-number>
      </a-form-item>
      <a-form-item
        label="16B"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Sales/Receipt for the Quarter" v-model="form.salesGovOutput"></a-input-number>
      </a-form-item>
      <!-- Part II 17 Zero Rated Sales/Receipts-->
      <a-form-item
        label="17"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Zero Rated Sales/Receipts" v-model="form.zeroRatedSales"></a-input-number>
      </a-form-item>

      <!-- Part II 18 Exempt Sales/Receipts-->
      <a-form-item
        label="18"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Exempt Sales/Receipts" v-model="form.exemptSales18"></a-input-number>
      </a-form-item>

      <!-- Part II 19 Total Sales/Receipts and Output Tax Due -->
      <a-form-item label="19 Total Sales/Receipts and Output Tax Due" />
      <a-form-item
        label="19A"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Sales/Receipt for the Quarter" v-model="form.totalSales19a"></a-input-number>
      </a-form-item>
      <a-form-item
        label="19B"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Sales/Receipt for the Quarter" v-model="form.totalSales19b"></a-input-number>
      </a-form-item>

      <!-- Part II 20 Less Allowable input tax -->
      <a-form-item label="20 Total Sales/Receipts and Output Tax Due" />
      <a-form-item
        label="20A"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number
          placeholder="Input Tax Carried Over from Previous Quarter"
          v-model="form.inputTaxcarried"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        label="20B"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number
          placeholder="Input Tax Deferred on Capital Goods"
          v-model="form.inputTaxdeferred"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        label="20C"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Transitional Input Tax" v-model="form.transitionalInputtax"></a-input-number>
      </a-form-item>
      <a-form-item
        label="20D"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Presumptive Input Tax" v-model="form.presumptiveInputtax"></a-input-number>
      </a-form-item>
      <a-form-item
        label="20E"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Others" v-model="form.others"></a-input-number>
      </a-form-item>
      <a-form-item
        label="20F"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number
          placeholder="Total (SUM of item 20A,20B,20C,20D & 20E)"
          v-model="form.totalSum"
        ></a-input-number>
      </a-form-item>

      <!-- Part II 21 Current Transactions-->
      <a-form-item label="21 Current Transactions" />
      <a-form-item label="21A/B Purchase of Capital Goods not exceeding P1Million(see sch.2)" />
      <a-form-item
        label="21A"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Purchase of Capital Goods" v-model="form.purCapgoodsa"></a-input-number>
      </a-form-item>
      <a-form-item
        label="21B"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Purchase of Capital Goods" v-model="form.purCapgoodsb"></a-input-number>
      </a-form-item>
      <a-form-item label="21C/D Purchase of Capital Goods exceeding P1Million(see sch.3)" />
      <a-form-item
        label="21C"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Purchase of Capital Goods" v-model="form.purCapgoodsc"></a-input-number>
      </a-form-item>
      <a-form-item
        label="21D"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Purchase of Capital Goods" v-model="form.purCapgoodsd"></a-input-number>
      </a-form-item>

      <a-form-item label="21E/F Domestic Purchases of Goods Other than Capital Goods" />
      <a-form-item
        label="21E"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Purchase of Capital Goods" v-model="form.domesticPursere"></a-input-number>
      </a-form-item>
      <a-form-item
        label="21F"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Purchase of Capital Goods" v-model="form.domesticPurserf"></a-input-number>
      </a-form-item>
      <a-form-item label="21G/H Importation of Goods Other than Capital Goods" />
      <a-form-item
        label="21G"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Purchase of Capital Goods" v-model="form.importationCapgoodsg"></a-input-number>
      </a-form-item>
      <a-form-item
        label="21H"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Purchase of Capital Goods" v-model="form.importationCapgoodsh"></a-input-number>
      </a-form-item>

      <a-form-item label="21I/J Domestic Purchase of Services" />
      <a-form-item
        label="21I"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Purchase of Capital Goods" v-model="form.domPurservicei"></a-input-number>
      </a-form-item>
      <a-form-item
        label="21J"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Purchase of Capital Goods" v-model="form.domPurservicej"></a-input-number>
      </a-form-item>
      <a-form-item label="21K/L Services rendered by Non-residents" />
      <a-form-item
        label="21K"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Purchase of Capital Goods" v-model="form.servicesRenderedk"></a-input-number>
      </a-form-item>
      <a-form-item
        label="21L"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Purchase of Capital Goods" v-model="form.servicesRenderedl"></a-input-number>
      </a-form-item>
      <a-form-item
        label="21M"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number
          placeholder="Purchases Not Qualified for Input Tax"
          v-model="form.purNotqualified"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="21N/O Others" />
      <a-form-item
        label="21N"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Others" v-model="form.othersn"></a-input-number>
      </a-form-item>
      <a-form-item
        label="21O"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number placeholder="Others" v-model="form.otherso"></a-input-number>
      </a-form-item>
      <a-form-item
        label="21P"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number
          placeholder="Sum items 21A,21C,21E,21G,21I,21K,21M,21N"
          v-model="form.sumItems"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        label="22"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number
          placeholder="Sum items 20F,21B,21D,21F,21H,21J,21L&21O"
          v-model="form.sumItems22"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="23 Less: Deductions from Input Tax" />
      <a-form-item
        label="23A"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number
          placeholder="Input Tax on Purchases of Capital"
          v-model="form.inputTaxpurcapital23"
        ></a-input-number>
      </a-form-item>

      <a-form-item
        label="23B"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
      <a-input-number placeholder="Input Tax on Sale to Govt." v-model="form.inputTaxonsalegov"></a-input-number>
    </a-form-item>
 <a-form-item
        label="23C"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
      <a-input-number placeholder="Input Tax allocable to Exempt Sales" v-model="form.inputTaxallocable"></a-input-number>
    </a-form-item>
 <a-form-item
        label="23D"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
      <a-input-number placeholder="VAT Refund/TCC claimed" v-model="form.vatRefundclaimed"></a-input-number>
    </a-form-item>
     <a-form-item
        label="23E"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
      <a-input-number placeholder="Others" v-model="form.others23"></a-input-number>
    </a-form-item>
 <a-form-item
        label="23F"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
      <a-input-number placeholder="Total (Sum 23A,23B,23C,23D & 23F)" v-model="form.totalSum23"></a-input-number>
    </a-form-item>
<a-form-item
        label="24"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
      <a-input-number placeholder="Total Allowable Input Tax (item 22 less item 23E)" v-model="form.totalAllowable24"></a-input-number>
    </a-form-item>
<a-form-item
        label="25"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
      <a-input-number placeholder="Total (Net VAT Payable (item 19B less item 24)" v-model="form.totalNetvatpay"></a-input-number>
    </a-form-item>


 <a-form-item label="26 Less: Tax Credits/Payments" />
      <a-form-item
        label="26A"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number
          placeholder="Monthly VAT Payments - previous two months"
          v-model="form.monthlyVatpaytwo"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        label="26B"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number
          placeholder="Creditable Value-Added Tax Withheld"
          v-model="form.credVattaxwithheld"
        ></a-input-number>
      </a-form-item>
<a-form-item
        label="26C"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number
          placeholder="Advance Payments for Sugar and Flour Industries"
          v-model="form.advancePaysugar"
        ></a-input-number>
      </a-form-item>
<a-form-item
        label="26D"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number
          placeholder="VAT withheld on Sales to Government"
          v-model="form.vatwithheldSalestogov"
        ></a-input-number>
      </a-form-item>

<a-form-item
        label="26E"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number
          placeholder="VAT paid in return previously filed"
          v-model="form.vatpaidReturnprevfiled"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        label="26F"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number
          placeholder="Advance Payments made"
          v-model="form.advancePaymade"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        label="26G"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number
          placeholder="Others"
          v-model="form.others26G"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        label="26H"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input-number
          placeholder="Sum 26A,26B,26C,26D,26E,26F&26G"
          v-model="form.sum26h"
        ></a-input-number>
      </a-form-item>


    </a-form>








    <!-- Part III -->
    <a-form :form="form_part3" v-show="step===3">
      <a-divider orientation="left">
        <b>Part III: Details of Payment</b>
      </a-divider>

      <a-form-item label="21. Current Transactions"></a-form-item>
      <a-form-item class="computation-item" label="21A. Purchase of Capital Goods">
        <a-input-number
          v-model="form.item21a"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="21B. Purchase of Capital Goods">
        <a-input-number
          v-model="form.item22b"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="21C. Purchase of Capital Goods">
        <a-input-number
          v-model="form.item22c"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="21D. Purchase of Capital Goods">
        <a-input-number
          v-model="form.item22d"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item class="computation-item" label="21E. Domestic Purchases of Goods">
        <a-input-number
          v-model="form.item23a"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="21F. Domestic Purchase of Goods">
        <a-input-number
          v-model="form.item23b"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="21G. Importation of Goods">
        <a-input-number
          v-model="form.item23c"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="21H. Importation of Goods">
        <a-input-number
          v-model="form.item23d"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="21I. Domestic Purchase of Services">
        <a-input-number
          v-model="form.item23d"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="21J. Domestic Purchase of Servcies">
        <a-input-number
          v-model="form.item23d"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="21K. Servcies rendered by Non-residents">
        <a-input-number
          v-model="form.item23d"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="21L. Servcies rendered by Non-residents">
        <a-input-number
          v-model="form.item23d"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="21M. Purchases Not Qualified for Input Tax">
        <a-input-number
          v-model="form.item23d"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="21N. Others">
        <a-input-number
          v-model="form.item23d"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="21O. Others">
        <a-input-number
          v-model="form.item23d"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="21P. Total Current Purchase">
        <a-input-number
          v-model="form.item23d"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
    </a-form>
    <!-- Part IV -->
    <a-form :form="form_part4" v-show="step===4">
      <a-divider orientation="left">
        <b>Part III: Details of Payment</b>
      </a-divider>
      <a-form-item label="22. Total Available Input Tax"></a-form-item>
      <a-form-item class="computation-item" label="22. Total Available Input Tax">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="23. Less Deductions from Input Tax"></a-form-item>
      <a-form-item class="computation-item" label="23A. Input Tax on Purchases">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="23B. Input Tax on Sale">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="23C. Input Tax allocable">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="23D. VAT Refund">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="23E. Others">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="23F. Total (Sum of item 23A,23B,23C,23D & 23E)">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="24. Total Allowable Input Tax"></a-form-item>
      <a-form-item class="computation-item" label="24. Total Allowable Input Tax">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="25. Net VAT Payable (Item 19B less item 24)"></a-form-item>
      <a-form-item class="computation-item" label="25. Net VAT Payable (Item 19B less item 24)">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="26. Less: Tax Credits/Payments"></a-form-item>
      <a-form-item class="computation-item" label="26A. Monthly VAT Payments - previous two months">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="26B. Creditable Value-Added Tax Witheld">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="26C. Advance Payments for Sugar and Flour Industries"
      >
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="26D. VAT withheld on Sales to Government">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="26E. VAT paid in return previously filed">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="26F. Advance Payments made">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="26G. Others">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="26H. Total Tax Credits/Payments">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="27. Tax Still Payable"></a-form-item>
      <a-form-item class="computation-item" label="27. Tax Still Payable">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="28. Add: Penalties"></a-form-item>
      <a-form-item class="computation-item" label="28A. Surcharge">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="28B. Interest">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="28C. Compromise">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="29. Total Amount Payable"></a-form-item>
      <a-form-item class="computation-item" label="29. Total Amount Payable">
        <a-input-number
          v-model="form.item21"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
    </a-form>
    <!-- Part V -->
    <a-form :form="form_part5" v-show="step===5">
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
    </a-form>
    <!-- <a-button v-show="sub==true" type="primary" block @click="submit">Submit</a-button> -->
    <!-- <a-button v-show="sub==false" @click="step--">Previous</a-button>
    <a-button v-show="sub==false" type="primary" @click="step++">Next</a-button>-->
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
      form_part3: this.$form.createForm(this),
      form_part4: this.$form.createForm(this),
      form_part5: this.$form.createForm(this),
      image_height: 1000,
      form_layout: { label_col: { span: 2 }, wrapper_col: { span: 22 } }
    };
  },
  // watch: {
  //   step() {
  //     if (this.step < 0) {
  //       this.$router.push("/");
  //     } else if (this.step == 5) {
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
          form_type: "2550Q",
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
/* .tax-form .computation-item {
  padding-left: 50px;
}

.tax-form .computation-item .ant-input-number {
  width: 40vh;
} */
</style>