<template>
  <div>
    <a-form v-show="step===0">
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="1"
      >
        <a-month-picker
          placeholder="For the month of (MM/YYYY)"
          v-model="form.returnPeriod"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item :labelCol="{ span: 12 }" :wrapperCol="{ span: 12 }" label="2. Ammended Return">
        <a-radio-group v-model="form.amendedYn" :defaultValue="false" style="width: 100%">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="3"
      >
        <a-input-number
          placeholder="Number of Sheets"
          v-model="form.numOfSheet"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
          style="width: 100%"
        />
      </a-form-item>
    </a-form>

    <!-- Part I -->
    <a-form v-show="step===1">
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="4"
        :validate-status="error_item('taxpayer.tin')"
        :help="error_desc('taxpayer.tin')"
      >
        <a-input placeholder="TIN" v-model="form.taxpayer.tin"></a-input>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="5"
        :validate-status="error_item('taxpayer.rdo_code')"
        :help="error_desc('taxpayer.rdo_code')"
      >
        <a-input placeholder="RDO Code" v-model="form.taxpayer.rdo_code"></a-input>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="6"
      >
        <a-input placeholder="Line of Business" v-model="form.taxpayer.line_of_business"></a-input>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="7"
      >
        <a-input placeholder="Taxpayer/Registered Name" v-model="form.taxpayer.registered_name"></a-input>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="8"
      >
        <a-input-number
          placeholder="Telephone Number"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
          v-model="form.taxpayer.contact_details.telno"
          style="width: 100%"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="9"
      >
        <a-textarea placeholder="Registered Address" v-model="form.taxpayer.address"></a-textarea>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="10"
      >
        <a-input-number
          placeholder="Zip Code"
          v-model="form.taxpayer.address_details.zipCode"
          style="width: 100%"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        label="11. Are you availing of tax relief under Special Law or International Tax Treaty?"
      />
      <a-form-item>
        <a-radio-group v-model="form.specialRate">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="If yes, specify" v-model="form.specialRateYn"></a-input>
      </a-form-item>
    </a-form>

    <!-- Part II -->
    <a-form v-show="step===2">
      <a-form-item label="12. Vatable Sales/Receipt-Private (Sch. 1)" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="12A"
      >
        <a-input-number
          placeholder="Sales/Receipt for the Month"
          v-model="form.totalAtcAmount"
          disabled
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="12B"
      >
        <a-input-number
          placeholder="Output Tax Due for the Month"
          v-model="form.totalAtcOutput"
          disbled
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="13. Sales to Government" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="13A"
      >
        <a-input-number
          placeholder="Sales/Receipt for the Month"
          v-model="form.salesGovAmount"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="13B"
      >
        <a-input-number
          placeholder="Output Tax Due for the Month"
          v-model="form.salesGovOutput"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="14. Zero Rated Sales/Receipts" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="14"
      >
        <a-input-number
          placeholder="Sales/Receipt for the Month"
          v-model="form.zeroRatedAmount"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="15. Exempt Sales/Receipts" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="15"
      >
        <a-input-number
          placeholder="Sales/Receipt for the Month"
          v-model="form.exemptAmount"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="16. Total Sales/Receipts and Output Tax Due" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="16A"
      >
        <a-input-number
          placeholder="Sales/Receipt for the Month"
          v-model="form.totalSales"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="16B"
      >
        <a-input-number
          placeholder="Output Tax Due for the Month"
          v-model="form.totalOutputTax"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="17. Less: Allowable Input Tax (Output Tax Due)" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="17A"
      >
        <a-input-number
          placeholder="Input Tax Carried Over from Previous Period"
          v-model="form.carriedOverPreviousPeriod"
          :data="total_allowable_less_input_tax"
          :defaultValue="0"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="17B"
      >
        <a-input-number
          placeholder="Input Tax Deferred on Capital Goods Exceeding ₱1Million from Previous Period"
          v-model="form.txbleGoodsServices"
          :defaultValue="0"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="17C"
      >
        <a-input-number
          placeholder="Transitional Input Tax"
          v-model="form.transInputTax"
          :defaultValue="0"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="17D"
      >
        <a-input-number
          placeholder="Presumptive Input Tax"
          v-model="form.presumpInputTax"
          :defaultValue="0"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="17E"
      >
        <a-input-number
          placeholder="Others"
          v-model="form.otherAllowableLessInputTax"
          :defaultValue="0"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="17F"
      >
        <a-input-number
          placeholder="Total"
          :data="total_allowable_less_input_tax"
          v-model="form.totalAllowableLessInputTax"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="18. Current Transaction" />
      <a-form-item
        class="computation-item"
        label="18A/B. Purchase of Capital Goods(Not exceeding ₱1Million)"
      />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18A"
      >
        <a-input-number
          placeholder="Purchase"
          v-model="form.purCapGoodsNotExceed"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18B"
      >
        <a-input-number
          placeholder="Output Tax Due"
          v-model="form.outputCapGoodsNotExceed"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="18C/D. Purchase of Capital Goods(Exceeding ₱1Million)"
      />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18C"
      >
        <a-input-number
          placeholder="Purchase"
          v-model="form.purCapGoodsExceed"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18D"
      >
        <a-input-number
          placeholder="Output Tax Due"
          v-model="form.outputPurCapGoodsExceed"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="18E/F. Domestic Purchases of Goods Other than Capital Goods"
      />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18E"
      >
        <a-input-number
          placeholder="Purchase"
          v-model="form.domesticPurchaseGoods"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18F"
      >
        <a-input-number
          placeholder="Output Tax Due"
          v-model="form.outputDomesticPurchaseGoods"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="18G/H. Importation of Goods Other than Capital Goods"
      />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18G"
      >
        <a-input-number
          placeholder="Purchase"
          v-model="form.importationGoods"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18H"
      >
        <a-input-number
          placeholder="Output Tax Due"
          v-model="form.outputImportationGoods"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="18I/J. Domestic Purchase of Services" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18I"
      >
        <a-input-number
          placeholder="Purchase"
          v-model="form.domesticPurchaseService"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18J"
      >
        <a-input-number
          placeholder="Output Tax Due"
          v-model="form.outputDomesticPurchaseService"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="18K/L. Services rendered by Non-residents" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18K"
      >
        <a-input-number
          placeholder="Purchase"
          v-model="form.servicesNonResidents"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18L"
      >
        <a-input-number
          placeholder="Output Tax Due"
          v-model="form.outputServicesNonResidents"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="18M. Purchases Not Qualified for Input Tax" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18M"
      >
        <a-input-number
          placeholder="Purchase"
          v-model="form.purchaseNotQualified"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="18N/O. Others" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18N"
      >
        <a-input-number
          placeholder="Purchase"
          v-model="form.purchaseOthers"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18O"
      >
        <a-input-number
          placeholder="Output Tax Due"
          v-model="form.outputPurchaseOthers"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="18P. Total Current Purchases" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18P"
      >
        <a-input-number
          placeholder="Purchase"
          v-model="form.totalCurrentPurchases"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="19"
      >
        <a-input-number
          placeholder="Total Available Input Tax"
          :data="total_available_input_tax"
          v-model="form.totalAvailableInputTax"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="20. Less: Deductions from Input Tax" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="20A"
      >
        <a-input-number
          placeholder="Input Tax on Purchases of Capital Goods exceeding ₱1Million"
          v-model="form.inputTaxPurchaseCapGoods"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="20B"
      >
        <a-input-number
          placeholder="Input Tax on Sale to Govt. closed to expense"
          v-model="form.inputTaxSaleToGovt"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="20C"
      >
        <a-input-number
          placeholder="Input Tax allocable to Exempt Sales"
          v-model="form.inputTaxAllocableToExempt"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="20D"
      >
        <a-input-number
          placeholder="VAT Refund/TCC claimed"
          v-model="form.refundTcm"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="20E"
      >
        <a-input-number
          placeholder="Others"
          v-model="form.otherDeductionFrInputTax"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="20F"
      >
        <a-input-number
          placeholder="Total"
          :data="total_deduction_from_input_tax"
          v-model="form.totalDeductionFrInputTax"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="21"
      >
        <a-input-number
          placeholder="Total Allowable Input Tax"
          v-model="form.totalInputTax"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="22"
      >
        <a-input-number
          placeholder="Net VAT Payable"
          v-model="form.taxDue"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="23. Less: Tax Credits/Payments" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="23A"
      >
        <a-input-number
          placeholder="Creditable Value-Added Tax Withheld"
          v-model="form.creditableVatWithheld"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="23B"
      >
        <a-input-number
          placeholder="Advance Payments for Sugar and Flour Industries"
          v-model="form.advPaySugarFlourInd"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="23C"
      >
        <a-input-number
          placeholder="VAT withheld on Sales to Government"
          v-model="form.taxWthld"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="23D"
      >
        <a-input-number
          placeholder="VAT paid in return previously filed, if this is an amended return"
          v-model="form.prevTaxPaid"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="23E"
      >
        <a-input-number
          placeholder="Advance Payments made"
          v-model="form.advPymt"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="23F"
      >
        <a-input-number
          placeholder="Others"
          v-model="form.otherTaxCredits"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="23G"
      >
        <a-input-number
          placeholder="Total Tax Credits/Payments"
          :data="total_credits"
          v-model="form.totalCredits"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="24"
      >
        <a-input-number
          placeholder="Tax Still Payable/(Overpayment)"
          v-model="form.amtPaybl"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="25. Add: Penalties" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="25A"
      >
        <a-input-number
          placeholder="Surcharge"
          v-model="form.surcharge"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="25B"
      >
        <a-input-number
          placeholder="Interest"
          v-model="form.interest"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="25C"
      >
        <a-input-number
          placeholder="Compromise"
          v-model="form.compromise"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="25D"
      >
        <a-input-number
          placeholder="Total Penalties"
          v-model="form.penalties"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="26"
      >
        <a-input-number
          placeholder="Total Amount Payable/(Overpayment)"
          v-model="form.totalAmountPayable"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\₱ \s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  props: ["form", "step"],

  methods: {
    // checkDraft() {
    //   if (
    //     this.existing_form &&
    //     Object.keys(this.existing_form).length === 0 &&
    //     this.existing_form.constructor === Object
    //   ) {
    //     // const {
    //     //     form_general,
    //     //     form_part1,
    //     //     form_part2
    //     //   } = this.existing_form.details,
    //     //   _self = this;
    //     // // Mapping General
    //     // if (form_general) {
    //     //   var fields = {};
    //     //   Object.keys(form_general).forEach(key => {
    //     //     fields[key] = this.$form.createFormField({
    //     //       value: form_general[key]
    //     //     });
    //     //   });
    //     //   this.form_general = this.$form.createForm(this, {
    //     //     mapPropsToFields: () => {
    //     //       return fields;
    //     //     }
    //     //   });
    //     // }

    //     // // Mapping Part1
    //     // if (form_part1) {
    //     //   this.form_part1 = this.$form.createForm(this, {
    //     //     mapPropsToFields: () => {
    //     //       return {
    //     //         "taxpayer.tin": this.$form.createFormField({
    //     //           value: form_part1.taxpayer.tin
    //     //         }),
    //     //         "taxpayer.rdo_code": this.$form.createFormField({
    //     //           value: form_part1.taxpayer.rdo_code
    //     //         }),
    //     //         "taxpayer.line_of_business": this.$form.createFormField({
    //     //           value: form_part1.taxpayer.line_of_business
    //     //         }),
    //     //         "taxpayer.registered_name": this.$form.createFormField({
    //     //           value: form_part1.taxpayer.registered_name
    //     //         }),
    //     //         "taxpayer.contact_details.telno": this.$form.createFormField({
    //     //           value: form_part1.taxpayer.contact_details.telno
    //     //         }),
    //     //         "taxpayer.address": this.$form.createFormField({
    //     //           value: form_part1.taxpayer.address
    //     //         }),
    //     //         "taxpayer.address_details.zipCode": this.$form.createFormField({
    //     //           value: form_part1.taxpayer.address_details.zipCode
    //     //         }),
    //     //         specialRate: this.$form.createFormField({
    //     //           value: form_part1.specialRate
    //     //         }),
    //     //         specialRateYn: this.$form.createFormField({
    //     //           value: form_part1.specialRateYn
    //     //         })
    //     //       };
    //     //     }
    //     //   });
    //     // }

    //     // // Mapping Part2
    //     // if (form_part2) {
    //     //   var fields = {};
    //     //   Object.keys(form_part2).forEach(key => {
    //     //     fields[key] = this.$form.createFormField({
    //     //       value: form_part2[key]
    //     //     });
    //     //   });
    //     //   this.form_part2 = this.$form.createForm(this, {
    //     //     mapPropsToFields: () => {
    //     //       return fields;
    //     //     }
    //     //   });
    //     // }
    //   }
    // },
    validate() {
      this.changeStep(this.step + 1);
      // if(this.step === 0) this.validateGeneral();
      // else if(this.step === 1) this.validatePartI();
    },
    validateGeneral() {
      this.loading = true;
      this.form_general.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("validateGeneral :", values);
          this.changeStep(1, values);
        }
        this.loading = false;
      });
    },
    validatePartI() {
      this.loading = true;
      this.form_part1.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("validatePartI :", values);
          this.changeStep(2, values);
        }
        this.loading = false;
      });
    },
    validatePartII() {
      this.loading = true;
      this.form_part2.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("validatePartII :", values);
          this.$emit("updateForm", values);
        } else this.loading = false;
      });
    },
    submit() {
      this.loading = true;
      this.$store
        .dispatch("VALIDATE_AND_SAVE", {
          form_type: "2550M",
          form_details: this.form
        })
        .then(result => {
          console.log("VALIDATE_AND_SAVE result:", result.data);
          this.loading = false;
          if (result.data.errors && result.data.errors.length > 0) {
            this.errors = result.data.errors;
            this.$notification.error({ message: "Validation Error" });
          } else {
            this.$store.commit("REMOVE_DRAFT_FORM", this.$route.query.ref_no);
            this.$store.commit("NOTIFY_MESSAGE", {
              message: "Successfully submitted Form 2550m."
            });
            window.close();
          }

          // window.opener.location.reload();
          // window.close();
        })
        .catch(err => {
          console.log("VALIDATE_AND_SAVE", err);
          this.loading = false;
        });
      // this.form_general.validateFieldsAndScroll((err, form_general_values) => {
      //   if (!err) {
      //     this.form_part1.validateFieldsAndScroll((err, form_part1_values) => {
      //       if (!err) {
      //         this.form_part2.validateFieldsAndScroll(
      //           (err, form_part2_values) => {
      //             if (!err) {
      //               const form = {
      //                 ...form_general_values,
      //                 ...form_part1_values,
      //                 ...form_part2_values
      //               };

      //               this.$store
      //                 .dispatch("VALIDATE_AND_SAVE", {
      //                   form_type: "2550M",
      //                   form_details: form
      //                 })
      //                 .then(result => {
      //                   console.log("VALIDATE_AND_SAVE :", result.data);
      //                   this.loading = false;
      //                   window.opener.location.reload();
      //                   window.close();
      //                 })
      //                 .catch(err => {
      //                   console.log("VALIDATE_AND_SAVE", err);
      //                   this.loading = false;
      //                 });
      //             } else this.loading = false;
      //           }
      //         );
      //       } else this.loading = false;
      //     });
      //   } else this.loading = false;
      // });
      // this.loading = true;
      // console.log("this.form :", this.form);
      // this.$store
      //   .dispatch("VALIDATE_AND_SAVE", {
      //     form_type: "2550M",
      //     form_details: this.form
      //   })
      //   .then(result => {
      //     console.log("VALIDATE_AND_SAVE :", result.data);
      //     this.loading = false;
      //   })
      //   .catch(err => {
      //     console.log("VALIDATE_AND_SAVE", err);
      //     this.loading = false;
      //   });
    },
    save_draft() {},
    changeStep(step, form) {
      this.$emit("changeStep", step);
      this.$emit("updateForm", form);
    },
    error_item(item) {
      return this.errors.find(x => x.field === item) ? "error" : "";
    },
    error_desc(item) {
      return this.errors.find(x => x.field === item)
        ? this.errors.find(x => x.field === item).error
        : "";
    }
  },
  data() {
    return {
      errors: [],
      loading: false,
      form_general: this.$form.createForm(this),
      form_part1: this.$form.createForm(this),
      form_part2: this.$form.createForm(this),
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
      image_height: 1000
    };
  },
  computed: {
    // 16A = 12A + 13A + 14 + 15
    total_sales(){
      
    },
    // 16B = 12B + 13B
    total_output_tax(){

    },
    total_allowable_less_input_tax() {
      console.log('#########',this.form.carriedOverPreviousPeriod?this.form.carriedOverPreviousPeriod:0);
      var tosum = [this.form.carriedOverPreviousPeriod,
      this.form.txbleGoodsServices,this.form.transInputTax,
      this.form.presumpInputTax,this.form.otherAllowableLessInputTax]
      console.log('compute sum: ' + this.computeSum(tosum))
      return this.form.totalAllowableLessInputTax = this.computeSum(tosum)
},
    total_available_input_tax() {
      return (this.form.totalAvailableInputTax =
        this.form.purCapGoodsNotExceed +
        this.form.outputCapGoodsNotExceed +
        this.form.purCapGoodsExceed +
        this.form.outputPurCapGoodsExceed +
        this.form.domesticPurchaseGoods +
        this.form.outputDomesticPurchaseGoods +
        this.form.importationGoods +
        this.form.outputImportationGoods +
        this.form.domesticPurchaseService +
        this.form.outputDomesticPurchaseService +
        this.form.servicesNonResidents +
        this.form.outputServicesNonResidents +
        this.form.purchaseNotQualified +
        this.form.purchaseOthers +
        this.form.outputPurchaseOthers +
        this.form.totalCurrentPurchases);
    },
    total_deduction_from_input_tax() {
      return (this.form.totalDeductionFrInputTax =
        this.form.inputTaxPurchaseCapGoods +
        this.form.inputTaxSaleToGovt +
        this.form.inputTaxAllocableToExempt +
        this.form.refundTcm +
        this.form.otherDeductionFrInputTax);
    },
    total_credits() {
      return (this.form.totalCredits =
        this.form.creditableVatWithheld +
        this.form.advPaySugarFlourInd +
        this.form.taxWthld +
        this.form.prevTaxPaid +
        this.form.advPymt +
        this.form.otherTaxCredits);
    }
  },
  watch: {
    loading(val) {
      this.$emit("loading", val);
    },
    form() {
      console.log("2550m form: " + this.form.returnPeriod);
      this.form.year = this.formatDtYear(this.form.returnPeriod);
      this.form.month = this.formatDtMonth(this.form.returnPeriod);
      console.log("year: " + this.form.month);
    },
    step(){
      
    }
  },
  created() {
    // if(this.form.totalAmountPayable == null){
      
    // this.form.totalAtcAmount = 0
    //     this.form.totalAtcOutput = 0
    //     this.form.salesGovAmount = 0
    //     this.form.salesGovOutput = 0
    //     this.form.zeroRatedAmount= 0
    //     this.form.exemptAmount= 0
    //     this.form.totalSales= 0
    //     this.form.totalOutputTax= 0
    //     this.form.carriedOverPreviousPeriod= 0
    //     this.form.txbleGoodsServices= 0
    //     this.form.transInputTax= 0
    //     this.form.presumpInputTax= 0
    //     this.form.otherAllowableLessInputTax= 0
    //     this.form.totalAllowableLessInputTax= 0
    //     this.form.purCapGoodsNotExceed= 0
    //     this.form.outputCapGoodsNotExceed= 0
    //     this.form.purCapGoodsExceed= 0
    //     this.form.outputPurCapGoodsExceed= 0
    //     this.form.domesticPurchaseGoods= 0
    //     this.form.outputDomesticPurchaseGoods= 0
    //     this.form.importationGoods= 0
    //     this.form.outputImportationGoods= 0
    //     this.form.domesticPurchaseService= 0
    //     this.form.outputDomesticPurchaseService= 0
    //     this.form.servicesNonResidents= 0
    //     this.form.outputServicesNonResidents= 0
    //     this.form.purchaseNotQualified= 0
    //     this.form.purchaseOthers= 0
    //     this.form.outputPurchaseOthers= 0
    //     this.form.totalCurrentPurchases= 0
    //     this.form.totalAvailableInputTax= 0
    //     this.form.inputTaxPurchaseCapGoods= 0
    //     this.form.inputTaxSaleToGovt= 0
    //     this.form.inputTaxAllocableToExempt= 0
    //     this.form.refundTcm= 0
    //     this.form.otherDeductionFrInputTax= 0
    //     this.form.totalDeductionFrInputTax= 0
    //     this.form.totalInputTax= 0
    //     this.form.taxDue= 0
    //     this.form.creditableVatWithheld= 0
    //     this.form.advPaySugarFlourInd= 0
    //     this.form.taxWthld= 0
    //     this.form.prevTaxPaid= 0
    //     this.form.advPymt= 0
    //     this.form.otherTaxCredits= 0
    //     this.form.totalCredits= 0
    //     this.form.amtPaybl= 0
    //     this.form.surcharge= 0
    //     this.form.interest= 0
    //     this.form.compromise= 0
    //     this.form.penalties= 0
    //     this.form.totalAmountPayable= 0
    // }
    // this.checkDraft();
    // this.form.carriedOverPreviousPeriod = 0
    // this.form.txbleGoodsServices = 0
    // this.form.transInputTax = 0
    // this.form.presumpInputTax = 0
    //    this.form.otherAllowableLessInputTax = 0
  }
};
</script>

<style>
.form-button {
  float: right;
  margin: 0;
  margin-top: 5vh;
}

.tax-form .computation-item {
  padding-left: 10vh;
}

.tax-form .computation-item-2 {
  padding-left: 20vh;
}

.tax-form .computation-item .ant-input-number,
.tax-form .computation-item-2 .ant-input-number {
  width: 40vh;
}
</style>