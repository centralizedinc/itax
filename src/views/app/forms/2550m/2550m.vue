<template>
  <div>
    <a-form :form="form_general" v-if="current_step===0">
      <a-form-item label="1. For the month of (MM/YYYY)">
        <a-month-picker v-decorator="['returnPeriod']" style="width: 100%" />
      </a-form-item>
      <a-form-item label="2. Ammended Return">
        <a-radio-group
          v-decorator="['amendedYn', {
            initialValue: false
        }]"
          style="width: 100%"
        >
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="3. Number of Sheets">
        <a-input-number v-decorator="['numOfSheet', { initialValue: 0 }]" style="width: 100%" />
      </a-form-item>
      <a-button type="primary" class="form-button" @click="validateGeneral" :loading="loading">Next</a-button>
    </a-form>

    <!-- Part I -->
    <a-form :form="form_part1" v-else-if="current_step===1">
      <a-form-item label="4. TIN">
        <a-input v-decorator="['taxpayer.tin']"></a-input>
      </a-form-item>
      <a-form-item label="5. RDO Code">
        <a-input v-decorator="['taxpayer.rdo_code']"></a-input>
      </a-form-item>
      <a-form-item label="6. Line of Business">
        <a-input v-decorator="['taxpayer.line_of_business']"></a-input>
      </a-form-item>
      <a-form-item label="7. Taxpayer/Registered Name">
        <a-input v-decorator="['taxpayer.registered_name']"></a-input>
      </a-form-item>
      <a-form-item label="8. Telephone Number">
        <a-input-number v-decorator="['taxpayer.contact_details.telno']" style="width: 100%"></a-input-number>
      </a-form-item>
      <a-form-item label="9. Registered Address">
        <a-textarea v-decorator="['taxpayer.address']"></a-textarea>
      </a-form-item>
      <a-form-item label="10. Zip Code">
        <a-input-number v-decorator="['taxpayer.address_details.zipCode']" style="width: 100%"></a-input-number>
      </a-form-item>
      <a-form-item
        label="11. Are you availing of tax relief under Special Law or International Tax Treaty?"
      >
        <a-radio-group v-decorator="['specialRate']" :defaultValue="false">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="If yes, specify">
        <a-input v-decorator="['specialRateYn']"></a-input>
      </a-form-item>

      <a-button-group class="form-button">
        <a-button @click="changeStep(0)" :disabled="loading">Previous</a-button>
        <a-button type="primary" @click="validatePartI" :loading="loading">Next</a-button>
      </a-button-group>
    </a-form>

    <!-- Part II -->
    <a-form :form="form_part2" v-else-if="current_step===2">
      <a-form-item label="12. Vatable Sales/Receipt-Private (Sch. 1)"></a-form-item>
      <a-form-item class="computation-item" label="12A. Sales/Receipt for the Month">
        <a-input-number
          v-decorator="['totalAtcAmount']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="12B. Output Tax Due for the Month">
        <a-input-number
          v-decorator="['totalAtcOutput']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="13. Sales to Government"></a-form-item>
      <a-form-item class="computation-item" label="13A. Sales/Receipt for the Month">
        <a-input-number
          v-decorator="['salesGovAmount']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="13B. Output Tax Due for the Month">
        <a-input-number
          v-decorator="['salesGovOutput']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="14. Zero Rated Sales/Receipts"></a-form-item>
      <a-form-item class="computation-item" label="14. Sales/Receipt for the Month">
        <a-input-number
          v-decorator="['zeroRatedAmount']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="15. Exempt Sales/Receipts"></a-form-item>
      <a-form-item class="computation-item" label="15. Sales/Receipt for the Month">
        <a-input-number
          v-decorator="['exemptAmount']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="16. Total Sales/Receipts and Output Tax Due"></a-form-item>
      <a-form-item class="computation-item" label="16A. Sales/Receipt for the Month">
        <a-input-number
          v-decorator="['totalSales']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="16B. Output Tax Due for the Month">
        <a-input-number
          v-decorator="['totalOutputTax']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="17. Less: Allowable Input Tax (Output Tax Due)"></a-form-item>
      <a-form-item
        class="computation-item"
        label="17A. Input Tax Carried Over from Previous Period"
      >
        <a-input-number
          v-decorator="['carriedOverPreviousPeriod']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="17B. Input Tax Deferred on Capital Goods Exceeding ₱1Million from Previous Period"
      >
        <a-input-number
          v-decorator="['txbleGoodsServices']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="17C. Transitional Input Tax">
        <a-input-number
          v-decorator="['transInputTax']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="17D. Presumptive Input Tax">
        <a-input-number
          v-decorator="['presumpInputTax']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="17E. Others">
        <a-input-number
          v-decorator="['otherAllowableLessInputTax']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="17F. Total">
        <a-input-number
          v-decorator="['totalAllowableLessInputTax']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="18. Current Transaction" />
      <a-form-item
        class="computation-item"
        label="18A/B. Purchase of Capital Goods(Not exceeding ₱1Million)"
      />
      <a-form-item class="computation-item-2" label="18A. Purchase">
        <a-input-number
          v-decorator="['purCapGoodsNotExceed']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item-2" label="18B. Output Tax Due">
        <a-input-number
          v-decorator="['outputCapGoodsNotExceed']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="18C/D. Purchase of Capital Goods(Exceeding ₱1Million)"
      />
      <a-form-item class="computation-item-2" label="18C. Purchase">
        <a-input-number
          v-decorator="['purCapGoodsExceed']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item-2" label="18D. Output Tax Due">
        <a-input-number
          v-decorator="['outputPurCapGoodsExceed']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="18E/F. Domestic Purchases of Goods Other than Capital Goods"
      />
      <a-form-item class="computation-item-2" label="18E. Purchase">
        <a-input-number
          v-decorator="['domesticPurchaseGoods']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item-2" label="18F. Output Tax Due">
        <a-input-number
          v-decorator="['outputDomesticPurchaseGoods']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="18G/H. Importation of Goods Other than Capital Goods"
      />
      <a-form-item class="computation-item-2" label="18G. Purchase">
        <a-input-number
          v-decorator="['importationGoods']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item-2" label="18H. Output Tax Due">
        <a-input-number
          v-decorator="['outputImportationGoods']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="18I/J. Domestic Purchase of Services" />
      <a-form-item class="computation-item-2" label="18I. Purchase">
        <a-input-number
          v-decorator="['domesticPurchaseService']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item-2" label="18J. Output Tax Due">
        <a-input-number
          v-decorator="['outputDomesticPurchaseService']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="18K/L. Services rendered by Non-residents" />
      <a-form-item class="computation-item-2" label="18K. Purchase">
        <a-input-number
          v-decorator="['servicesNonResidents']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item-2" label="18L. Output Tax Due">
        <a-input-number
          v-decorator="['outputServicesNonResidents']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="18M. Purchases Not Qualified for Input Tax" />
      <a-form-item class="computation-item-2" label="18M. Purchase">
        <a-input-number
          v-decorator="['purchaseNotQualified']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="18N/O. Others" />
      <a-form-item class="computation-item-2" label="18N. Purchase">
        <a-input-number
          v-decorator="['purchaseOthers']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item-2" label="18O. Output Tax Due">
        <a-input-number
          v-decorator="['outputPurchaseOthers']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="18P. Total Current Purchases" />
      <a-form-item class="computation-item-2" label="18P. Purchase">
        <a-input-number
          v-decorator="['totalCurrentPurchases']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="19. Total Available Input Tax">
        <a-input-number
          style="width: 40vh;"
          v-decorator="['totalAvailableInputTax']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="20. Less: Deductions from Input Tax" />
      <a-form-item
        class="computation-item"
        label="20A. Input Tax on Purchases of Capital Goods exceeding ₱1Million"
      >
        <a-input-number
          v-decorator="['inputTaxPurchaseCapGoods']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="20B. Input Tax on Sale to Govt. closed to expense"
      >
        <a-input-number
          v-decorator="['inputTaxSaleToGovt']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="20C. Input Tax allocable to Exempt Sales">
        <a-input-number
          v-decorator="['inputTaxAllocableToExempt']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="20D. VAT Refund/TCC claimed">
        <a-input-number
          v-decorator="['refundTcm']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="20E. Others">
        <a-input-number
          v-decorator="['otherDeductionFrInputTax']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="20F. Total">
        <a-input-number
          v-decorator="['totalDeductionFrInputTax']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="21. Total Allowable Input Tax">
        <a-input-number
          style="width: 40vh;"
          v-decorator="['totalInputTax']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="22. Net VAT Payable">
        <a-input-number
          style="width: 40vh;"
          v-decorator="['taxDue']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="23. Less: Tax Credits/Payments" />
      <a-form-item class="computation-item" label="23A. Creditable Value-Added Tax Withheld">
        <a-input-number
          v-decorator="['creditableVatWithheld']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="23B. Advance Payments for Sugar and Flour Industries"
      >
        <a-input-number
          v-decorator="['advPaySugarFlourInd']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="23C. VAT withheld on Sales to Government">
        <a-input-number
          v-decorator="['taxWthld']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="23D. VAT paid in return previously filed, if this is an amended return"
      >
        <a-input-number
          v-decorator="['prevTaxPaid']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="23E. Advance Payments made">
        <a-input-number
          v-decorator="['advPymt']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="23F. Others">
        <a-input-number
          v-decorator="['otherTaxCredits']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="23G. Total Tax Credits/Payments">
        <a-input-number
          v-decorator="['totalCredits']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="24. Tax Still Payable/(Overpayment)">
        <a-input-number
          style="width: 40vh"
          v-decorator="['amtPaybl']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="25. Add: Penalties" />
      <a-form-item label="25A. Surcharge" class="computation-item">
        <a-input-number
          v-decorator="['surcharge']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="25A. Interest" class="computation-item">
        <a-input-number
          v-decorator="['interest']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="25A. Compromise" class="computation-item">
        <a-input-number
          v-decorator="['compromise']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="25A. Total Penalties" class="computation-item">
        <a-input-number
          v-decorator="['penalties']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="26. Total Amount Payable/(Overpayment)">
        <a-input-number
          style="width: 40vh"
          v-decorator="['totalAmountPayable']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-button-group class="form-button">
        <a-button @click="changeStep(1)" :disabled="loading">Previous</a-button>
        <a-button type="primary" @click="validatePartII" :loading="loading">Submit</a-button>
      </a-button-group>
    </a-form>
  </div>
</template>

<script>
export default {
  methods: {
    validateGeneral() {
      this.loading = true;
      this.form_general.validateFieldsAndScroll((err, values) => {
        if (!err) this.changeStep(1);
        this.loading = false;
      });
    },
    validatePartI() {
      this.loading = true;
      this.form_part1.validateFieldsAndScroll((err, values) => {
        if (!err) this.changeStep(2);
        this.loading = false;
      });
    },
    validatePartII() {
      this.loading = true;
      this.form_general.validateFieldsAndScroll((err, values) => {
        if (!err) this.submit();
        else this.loading = false;
      });
    },
    submit() {
      this.loading = true;

      this.loading = false;
    },
    changeStep(step) {
      this.$store.commit("SET_STEP", step);
    }
  },
  data() {
    return {
      loading: false,
      form_general: this.$form.createForm(this),
      form_part1: this.$form.createForm(this),
      form_part2: this.$form.createForm(this),
      image_height: 1000
    };
  },
  computed: {
    current_step() {
      return this.$store.state.tax_form.current_step;
    }
  },
  created() {
    console.log("this.$ref.container.height :", this.$refs);
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style>
.form-button {
  float: right;
  margin: 10px 0;
}

.tax-form .computation-item {
  padding-left: 20px;
}

.tax-form .computation-item-2 {
  padding-left: 40px;
}

.tax-form .computation-item .ant-input-number,
.tax-form .computation-item-2 .ant-input-number {
  width: 40vh;
}
</style>