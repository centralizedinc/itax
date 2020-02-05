<template>
  <div>
    <a-form v-show="step===0">
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="1"
        :validate-status="error_item('return_period')"
        :help="error_desc('return_period')"
      >
        <a-month-picker
          placeholder="For the month of (MM/YYYY)"
          v-model="form.return_period"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item :labelCol="{ span: 12 }" :wrapperCol="{ span: 12 }" label="2. Ammended Return">
        <a-radio-group v-model="form.amended_yn" style="width: 100%">
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
          v-model="form.num_of_sheet"
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
        :validate-status="error_item('taxpayer.line_of_business')"
        :help="error_desc('taxpayer.line_of_business')"
      >
        <a-input
          class="text-uppercase"
          placeholder="Line of Business"
          v-model="form.taxpayer.line_of_business"
        ></a-input>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="7"
        :validate-status="error_item('taxpayer.registered_name')"
        :help="error_desc('taxpayer.registered_name')"
      >
        <a-input
          class="text-uppercase"
          placeholder="Taxpayer/Registered Name"
          v-model="form.taxpayer.registered_name"
        ></a-input>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="8"
        :validate-status="error_item('taxpayer.contact_details.telno')"
        :help="error_desc('taxpayer.contact_details.telno')"
      >
        <a-input-number
          placeholder="Telephone Number"
          v-model="form.taxpayer.contact_details.telno"
          style="width: 100%"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="9"
        :validate-status="error_item('taxpayer.address')"
        :help="error_desc('taxpayer.address')"
      >
        <a-textarea
          class="text-uppercase"
          placeholder="Registered Address"
          v-model="form.taxpayer.address"
        ></a-textarea>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="10"
        :validate-status="error_item('taxpayer.address_details.zipCode')"
        :help="error_desc('taxpayer.address_details.zipCode')"
      >
        <a-input-number
          placeholder="Zip Code"
          v-model="form.taxpayer.address_details.zipCode"
          style="width: 100%"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        label="11. Are you availing of tax relief under Special Law or International Tax Treaty?"
      />
      <a-form-item>
        <a-radio-group v-model="form.is_avail_tax_relief">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="If yes, specify">
        <a-textarea class="text-uppercase" v-model="form.avail_tax_relief"></a-textarea>
      </a-form-item>
    </a-form>

    <!-- <a-form-item v-if="form.is_avail_tax_relief">
        <a-input placeholder="If yes, specify" v-model="form.avail_tax_relief"></a-input>
      </a-form-item>
    </a-form>-->

    <!--------------------------------------------------- Part II ------------------------------------------>
    <a-form v-show="step===2">
      <a-form-item :validate-status="error_item('atc')" :help="error_desc('atc')">
        <div style="color: black">
          12. Vatable Sales/Receipt-Private (
          <span
            class="text-link"
            @click="show_sched1=true;form.pdf_page=1;"
          >Schedule 1</span>)
        </div>
      </a-form-item>
      <schedule-one
        v-if="show_sched1"
        :show="show_sched1"
        :form="form"
        @close="updateSchedAndClose"
      />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="12A"
      >
        <a-input-number
          placeholder="Sales/Receipt for the Month"
          v-model="form.totalAtcAmount"
          disabled
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
          disabled
        ></a-input-number>
      </a-form-item>

      <a-form-item label="13. Sales to Government" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="13A"
      >
        <a-input-number placeholder="Sales/Receipt for the Month" v-model="form.salesGovAmount"></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="13B"
      >
        <a-input-number placeholder="Output Tax Due for the Month" v-model="form.salesGovOutput"></a-input-number>
      </a-form-item>

      <a-form-item label="14. Zero Rated Sales/Receipts" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="14"
      >
        <a-input-number placeholder="Sales/Receipt for the Month" v-model="form.zeroRatedAmount"></a-input-number>
      </a-form-item>

      <a-form-item label="15. Exempt Sales/Receipts" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="15"
      >
        <a-input-number placeholder="Sales/Receipt for the Month" v-model="form.exemptAmount"></a-input-number>
      </a-form-item>

      <a-form-item label="16. Total Sales/Receipts and Output Tax Due" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="16A"
      >
        <a-input-number placeholder="Sales/Receipt for the Month" disabled :value="getTotalSales()"></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="16B"
      >
        <a-input-number
          placeholder="Output Tax Due for the Month"
          disabled
          :value="getTotalOutputTax()"
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
          :defaultValue="0"
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
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="17F"
      >
        <a-input-number placeholder="Total" disabled :value="getTotalAllowableInputTax()"></a-input-number>
      </a-form-item>

      <a-form-item label="18. Current Transaction" />
      <a-form-item class="computation-item">
        <div style="color: black">
          18A/B. Purchase of Capital Goods(Not exceeding ₱1Million)(
          <span
            class="text-link"
            @click="show_sched2=true;form.pdf_page=1;"
          >Schedule 2</span>)
          <schedule-two
            v-if="show_sched2"
            :show="show_sched2"
            :form="form"
            @close="updateSchedAndClose"
          />
          <!-- @click="show_sched2=true" -->
        </div>
      </a-form-item>
      <!-- <a-button type="link" @click="showDrawer2">Schedule 2</a-button> -->
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18A"
      >
        <a-input-number disabled placeholder="Purchase" v-model="form.purCapGoodsNotExceed"></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18B"
      >
        <a-input-number
          placeholder="Output Tax Due"
          disabled
          v-model="form.outputCapGoodsNotExceed"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label>
        <div style="color: black">
          18C/D. Purchase of Capital Goods(Exceeding ₱1Million)(
          <!-- <span class="text-link" @click="show_sched3A=true">Schedule 3A</span> -->
          <span class="text-link" @click="openSchedule('show_sched3', 1)">Schedule 3A</span>)
          <schedule-three
            v-if="show_sched3"
            :show="show_sched3"
            :form="form"
            @close="updateSchedAndClose"
          />
        </div>
      </a-form-item>
      <!-- <a-button type="link" @click="showDrawer3A">Schedule 3 A</a-button> -->
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18C"
      >
        <a-input-number placeholder="Purchase" disabled v-model="form.purCapGoodsExceed"></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18D"
      >
        <a-input-number
          placeholder="Output Tax Due"
          disabled
          v-model="form.outputPurCapGoodsExceed"
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
        <a-input-number placeholder="Purchase" v-model="form.domesticPurchaseGoods"></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18F"
      >
        <a-input-number placeholder="Output Tax Due" v-model="form.outputDomesticPurchaseGoods"></a-input-number>
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
        <a-input-number placeholder="Purchase" v-model="form.importationGoods"></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18H"
      >
        <a-input-number placeholder="Output Tax Due" v-model="form.outputImportationGoods"></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="18I/J. Domestic Purchase of Services" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18I"
      >
        <a-input-number placeholder="Purchase" v-model="form.domesticPurchaseService"></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18J"
      >
        <a-input-number placeholder="Output Tax Due" v-model="form.outputDomesticPurchaseService"></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="18K/L. Services rendered by Non-residents" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18K"
      >
        <a-input-number placeholder="Purchase" v-model="form.servicesNonResidents"></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18L"
      >
        <a-input-number placeholder="Output Tax Due" v-model="form.outputServicesNonResidents"></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="18M. Purchases Not Qualified for Input Tax" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18M"
      >
        <a-input-number placeholder="Purchase" v-model="form.purchaseNotQualified"></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="18N/O. Others" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18N"
      >
        <a-input-number placeholder="Purchase" v-model="form.purchaseOthers"></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18O"
      >
        <a-input-number placeholder="Output Tax Due" v-model="form.outputPurchaseOthers"></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="18P. Total Current Purchases" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18P"
      >
        <a-input-number placeholder="Purchase" disabled :v-model="getTotalCurrentPurchases()"></a-input-number>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="19"
      >
        <a-input-number
          placeholder="Total Available Input Tax"
          disabled
          :value="getTotalAvailableInputTax()"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="20. Less: Deductions from Input Tax" />
      <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
        <div style="color: black">
          20A (
          <span class="text-link" @click="openSchedule('show_sched3', 1)">Schedule 3B</span>)
          <schedule-three
            v-if="show_sched3"
            :show="show_sched3"
            :form="form"
            @close="updateSchedAndClose"
          />
        </div>
        <!-- <a-button type="primary" @click="sched3B_drawer = true">Schedule 3B</a-button> -->
        <a-input-number
          placeholder="Input Tax on Purchases of Capital Goods exceeding ₱1Million"
          v-model="form.inputTaxPurchaseCapGoods"
        ></a-input-number>
      </a-form-item>
      <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
        <div style="color: black">
          20B (
          <span class="text-link" @click="openSchedule('show_sched4', 1)">Schedule 4</span>)
          <schedule-four
            v-if="show_sched4"
            :show="show_sched4"
            :form="form"
            @close="updateSchedAndClose"
          />
        </div>
        <!-- <a-button type="link" @click="sched4_drawer = true">Schedule 4</a-button> -->
        <a-input-number
          placeholder="Input Tax on Sale to Govt. closed to expense"
          v-model="form.inputTaxSaleToGovt"
        ></a-input-number>
      </a-form-item>
      <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
        <div style="color: black">
          20C (
          <span class="text-link" @click="openSchedule('show_sched5', 1)">Schedule 5</span>)
          <schedule-five
            v-if="show_sched5"
            :show="show_sched5"
            :form="form"
            @close="updateSchedAndClose"
          />
        </div>
        <!-- <a-button type="link" @click="sched5_drawer = true">Schedule 5</a-button> -->
        <a-input-number
          placeholder="Input Tax allocable to Exempt Sales"
          v-model="form.inputTaxAllocableToExempt"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="20D"
      >
        <a-input-number placeholder="VAT Refund/TCC claimed" v-model="form.refundTcm"></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="20E"
      >
        <a-input-number placeholder="Others" v-model="form.otherDeductionFrInputTax"></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="20F"
      >
        <a-input-number placeholder="Total" disabled :value="getTotalDeductionFrInputTax()"></a-input-number>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="21"
      >
        <a-input-number
          placeholder="Total Allowable Input Tax"
          disabled
          :value="getTotalInputTax()"
        ></a-input-number>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="22"
      >
        <a-input-number placeholder="Net VAT Payable" disabled :value="getNetVatPayable()"></a-input-number>
      </a-form-item>

      <a-form-item label="23. Less: Tax Credits/Payments" />
      <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
        <div style="color: black">
          23A (
          <span class="text-link" @click="openSchedule('show_sched6', 1)">Schedule 6</span>)
          <schedule-six
            v-if="show_sched6"
            :show="show_sched6"
            :form="form"
            @close="updateSchedAndClose"
          />
        </div>
        <!-- <a-button type="link" @click="sched6_drawer = true">Schedule 6</a-button> -->
        <a-input-number
          disabled
          placeholder="Creditable Value-Added Tax Withheld"
          v-model="form.creditableVatWithheld"
        ></a-input-number>
      </a-form-item>
      <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
        <div style="color: black">
          23B (
          <span class="text-link" @click="openSchedule('show_sched7', 1)">Schedule 7</span>)
          <schedule-seven
            v-if="show_sched7"
            :show="show_sched7"
            :form="form"
            @close="updateSchedAndClose"
          />
        </div>
        <!-- <a-button type="link" @click="sched7_drawer = true">Schedule 7</a-button> -->
        <a-input-number
          disabled
          placeholder="Advance Payments for Sugar and Flour Industries"
          v-model="form.advPaySugarFlourInd"
        ></a-input-number>
      </a-form-item>
      <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
        <div style="color: black">
          23C (
          <span class="text-link" @click="openSchedule('show_sched8', 1)">Schedule 8</span>)
          <schedule-eight
            v-if="show_sched8"
            :show="show_sched8"
            :form="form"
            @close="updateSchedAndClose"
          />
        </div>
        <!-- <a-button type="link" @click="sched8_drawer = true">Schedule 8</a-button> -->
        <a-input-number
          placeholder="VAT withheld on Sales to Government"
          v-model="form.taxWthld"
          disabled
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="23D"
      >
        <a-input-number
          disabled
          placeholder="VAT paid in return previously filed, if this is an amended return"
          v-model="form.prevTaxPaid"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="23E"
      >
        <a-input-number placeholder="Advance Payments made" v-model="form.advPymt"></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="23F"
      >
        <a-input-number placeholder="Others" v-model="form.otherTaxCredits"></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="23G"
      >
        <a-input-number
          placeholder="Total Tax Credits/Payments"
          disabled
          :value="getTotalCredits()"
        ></a-input-number>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="24"
      >
        <a-input-number
          placeholder="Tax Still Payable/(Overpayment)"
          disabled
          :value="getAmtPayable()"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="25. Add: Penalties" />
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="25A"
        :validate-status="error_item('surcharge')"
        :help="error_desc('surcharge')"
      >
        <a-input-number placeholder="Surcharge" v-model="form.surcharge"></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="25B"
        :validate-status="error_item('interest')"
        :help="error_desc('interest')"
      >
        <a-input-number placeholder="Interest" v-model="form.interest"></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="25C"
        :validate-status="error_item('compromise')"
        :help="error_desc('compromise')"
      >
        <a-input-number placeholder="Compromise" v-model="form.compromise"></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="25D"
      >
        <a-input-number placeholder="Total Penalties" disabled :value="getPenalties()"></a-input-number>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="26"
      >
        <a-input-number
          placeholder="Total Amount Payable/(Overpayment)"
          disabled
          :value="getTotalAmtPayable()"
        ></a-input-number>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import ScheduleOne from "./Schedule1";
import ScheduleTwo from "./Schedule2";
// import ScheduleThreea from "./Schedule3A";
// import ScheduleThreeb from "./Schedule3B";
import ScheduleThree from "./Schedule3";
import ScheduleFour from "./Schedule4";
import ScheduleFive from "./Schedule5";
import ScheduleSix from "./Schedule6";
import ScheduleSeven from "./Schedule7";
import ScheduleEight from "./Schedule8";
import moment from "moment";

export default {
  components: {
    ScheduleOne,
    ScheduleTwo,
    // ScheduleThreea,
    // ScheduleThreeb,
    ScheduleThree,
    ScheduleFour,
    ScheduleFive,
    ScheduleSix,
    ScheduleSeven,
    ScheduleEight
  },
  props: {
    form: {
      type: Object,
      default: () => {
        return { taxpayer: { contact_details: {}, address_details: {} } };
      }
    },
    step: {
      type: Number,
      default: 0
    },
    errors: {
      type: Array,
      default: () => []
    }
  },
  created() {
    console.log("this.form.return_period :", this.form.return_period);
    // this.form.return_period = moment(this.form.return_period)
    this.form.pdf_page = 0;
    console.log("this.form###### :", this.form);
  },
  watch: {
    errors() {
      console.log("this.errors :", this.errors);
    }
  },
  methods: {
    openSchedule(key, pdf_page) {
      this[key] = true;
      this.form.pdf_page = pdf_page;
    },
    closePage2() {
      this.form.pdf_page = 0;
      this.show_sched1 = false;
      this.show_sched2 = false;
      this.show_sched3 = false;
      // this.show_sched3B = false;
      this.show_sched4 = false;
      this.show_sched5 = false;
      this.show_sched6 = false;
      this.show_sched7 = false;
      this.show_sched8 = false;
      this.updateSchedAndClose();
    },
    // 16A
    getTotalSales() {
      console.log("this.form.totalAtcAmount :", this.form.totalAtcAmount);
      var total = this.computeSum([
        this.form.totalAtcAmount,
        this.form.salesGovAmount,
        this.form.zeroRatedAmount,
        this.form.exemptAmount
      ]);
      this.form.totalSales = total;
      console.log("this.form.totalSales :", this.form.totalSales);
      return total;
    },
    // 16B
    getTotalOutputTax() {
      var total = this.computeSum([
        this.form.totalAtcOutput,
        this.form.salesGovOutput
      ]);
      this.form.totalOutputTax = total;
      return total;
    },
    // 17F
    getTotalAllowableInputTax() {
      var total = this.computeSum([
        this.form.carriedOverPreviousPeriod,
        this.form.txbleGoodsServices,
        this.form.transInputTax,
        this.form.presumpInputTax,
        this.form.otherAllowableLessInputTax
      ]);
      this.form.totalAllowableLessInputTax = total;
      return total;
    },
    // 18P
    getTotalCurrentPurchases() {
      var total = this.computeSum([
        this.form.purCapGoodsNotExceed,
        this.form.purCapGoodsExceed,
        this.form.domesticPurchaseGoods,
        this.form.importationGoods,
        this.form.domesticPurchaseService,
        this.form.servicesNonResidents,
        this.form.purchaseNotQualified,
        this.form.purchaseOthers
      ]);
      this.form.totalCurrentPurchases = total;
      return total;
    },
    // 19
    getTotalAvailableInputTax() {
      var total = this.computeSum([
        this.form.totalAllowableLessInputTax,
        this.form.outputCapGoodsNotExceed,
        this.form.outputPurCapGoodsExceed,
        this.form.outputDomesticPurchaseGoods,
        this.form.outputImportationGoods,
        this.form.outputDomesticPurchaseService,
        this.form.outputServicesNonResidents,
        this.form.outputPurchaseOthers
      ]);
      this.form.totalAvailableInputTax = total;
      return total;
    },
    // 20F
    getTotalDeductionFrInputTax() {
      var total = this.computeSum([
        this.form.inputTaxPurchaseCapGoods,
        this.form.inputTaxSaleToGovt,
        this.form.inputTaxAllocableToExempt,
        this.form.refundTcm,
        this.form.otherDeductionFrInputTax
      ]);
      this.form.totalDeductionFrInputTax = total;
      return total;
    },
    // 21
    getTotalInputTax() {
      var total =
        (this.form.totalAvailableInputTax || 0) -
        (this.form.totalDeductionFrInputTax || 0);
      this.form.totalInputTax = total;
      return total;
    },
    // 22
    getNetVatPayable() {
      var total =
        (this.form.totalOutputTax || 0) - (this.form.totalInputTax || 0);
      this.form.net_vat_payable = total;
      return total;
    },
    // 23F
    getTotalCredits() {
      var total = this.computeSum([
        this.form.creditableVatWithheld,
        this.form.advPaySugarFlourInd,
        this.form.taxWthld,
        this.form.prevTaxPaid,
        this.form.advPymt,
        this.form.otherTaxCredits
      ]);
      this.form.totalCredits = total;
      return total;
    },
    // 24
    getAmtPayable() {
      var total =
        (this.form.net_vat_payable || 0) - (this.form.totalCredits || 0);
      this.form.tax_due = total;
      return total;
    },
    // 25D
    getPenalties() {
      var total = this.computeSum([
        this.form.surcharge,
        this.form.interest,
        this.form.compromise
      ]);
      this.form.penalties = total;
      return total;
    },
    // 26
    getTotalAmtPayable() {
      var total = this.computeSum([this.form.tax_due, this.form.penalties]);
      this.form.total_amount_payable = total;
      return total;
    },
    updateSchedAndClose(data) {
      Object.keys(data).forEach(key => {
        this.form[key] = data[key];
      });
      // this.form.sched1 = data.sched1;
      // this.form.sched2 = data.sched2;
      // this.form.sched3A = data.sched3A;
      // this.form.sched3B = data.sched3B;
      // this.form.sched4 = data.sched4;
      // this.form.sched5 = data.sched5;
      // this.form.sched6 = data.sched6;
      // this.form.sched7 = data.sched7;
      // this.form.sched8 = data.sched8;
      // this.form.totalAtcAmount = data.totalAtcAmount;
      // this.form.totalAtcOutput = data.totalAtcOutput;
      this.form.pdf_page = 0;
      this.show_sched1 = false;
      this.show_sched2 = false;
      this.show_sched3 = false;
      // this.show_sched3B = false;
      this.show_sched4 = false;
      this.show_sched5 = false;
      this.show_sched6 = false;
      this.show_sched7 = false;
      this.show_sched8 = false;
    },
    sched2Save() {},
    delete_sched2(index) {
      this.sched2_data[index].splice(index, 1);
    },
    check_sched2(value) {
      var only = this.formatDtMonth(this.form.return_period);
      var picked = this.formatDtMonth(value);
      console.log("check sched2: " + value);
      if (picked !== only) {
        console.log("please choose base on return period");
      }
    },
    addSched2() {
      console.log("add sched2 date of return: " + this.sched2_data);

      if (this.sched2_data == false) {
        console.log("sched 2 data fnun");
        this.sched2_data.push({
          date_purchased: "",
          description: "",
          vat: 0,
          tax: 0
        });
      } else {
        var index = this.sched2_data.length - 1;
        console.log("last index sched2_data: " + index);
        if (
          this.sched2_data[index].date_purchased == "" ||
          this.sched2_data[index].description == "" ||
          this.sched2_data[index].tax <= 0 ||
          this.sched2_data[index].vat <= 0
        ) {
          console.log("please fill up all blank");
        } else {
          console.log("pushed");
          this.sched2_data.push({
            date_purchased: "",
            description: "",
            vat: 0,
            tax: 0
          });
        }
      }
    },
    sched2Compute(value) {
      var index = this.sched2_data.length - 1;
      this.form.purCapGoodsNotExceed = 0;
      this.form.outputCapGoodsNotExceed = 0;
      this.sched2_data[index].tax = value * 0.12;
      this.sched2_data.forEach(data => {
        this.form.purCapGoodsNotExceed += data.vat;
        this.form.outputCapGoodsNotExceed += data.tax;
      });
    },
    onClose_sched2() {
      this.sched2_drawer = false;
    },
    showDrawer2() {
      console.log("data source show drawer; " + this.dataSource);
      this.sched2_drawer = true;
    },
    showDrawer3A() {
      this.sched3A_drawer = true;
    },
    onClose_sched3A() {
      this.sched3A_drawer = false;
    },
    validate() {
      if (this.step === 0) this.validatePage1();
      this.changeStep(this.step + 1);
    },
    validatePage1() {
      // if (!this.form.return_period) {
      //   this.errors.push({
      //     page: 0,
      //     field: "return_period",
      //     error: "Return Period is mandatory field."
      //   });
      // }
    },
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
      show_sched1: false,
      show_sched2: false,
      show_sched3: false,
      // show_sched3B: false,
      show_sched4: false,
      show_sched5: false,
      show_sched6: false,
      show_sched7: false,
      show_sched8: false,
      loading: false,
      form_layout: {
        label_col: { span: 2 },
        wrapper_col: { span: 22 }
      },
      image_height: 1000,
      atc_options: [],
      dataSource: [],
      sched2_data: [],
      columns_sched2: [
        {
          title: "Date Purchased",
          dataIndex: "date_purchased",
          scopedSlots: { customRender: "date_purchased" }
        },
        {
          title: "Description",
          dataIndex: "description",
          scopedSlots: { customRender: "description" }
        },
        {
          title: "Amount (Net of VAT)",
          dataIndex: "vat",
          scopedSlots: { customRender: "vat" }
        },
        {
          title: "Input Tax",
          dataIndex: "tax",
          scopedSlots: { customRender: "tax" }
        },
        {
          title: "",
          dataIndex: "operation",
          scopedSlots: { cutomRender: "operation" }
        }
      ],
      sched3A_data: [],
      columns_sched3A: [
        {
          title: "Date Purchased",
          dataIndex: "date_purchased",
          scopedSlots: { customRender: "date_purchased" }
        },
        {
          title: "Description",
          dataIndex: "description",
          scopedSlots: { customRender: "description" }
        },
        {
          title: "Amount(Net of VAT)",
          dataIndex: "vat",
          scopedSlots: { customRender: "vat" }
        },
        {
          title: "Input Tax (C*Tax Rate)",
          dataIndex: "tax_rate",
          scopedSlots: { customRender: "tax_rate" }
        },
        {
          title: "Estimate Life (in Months)",
          dataIndex: "est_life",
          scopedSlots: { customRender: "est_life" }
        },
        {
          title:
            "Recognized Life (In Months) Useful life or 60 mos. (whichever is shorter)",
          dataIndex: "recog_life",
          scopedSlots: { customRender: "recog_life" }
        },
        {
          title:
            "Allowable Input Tax for the Period Tax Rate / Recognized Life",
          dataIndex: "allowable_input_tax",
          scopedSlots: { customRender: "allowable_input_tax" }
        },
        {
          title:
            "Balance of Input Tax to be carried to Next Period Tax Rate - Allowable Input Tax",
          dataIndex: "balance",
          scopedSlots: { customRender: "balance" }
        },
        {
          title: "",
          dataIndex: "operation",
          scopedSlots: { cutomRender: "operation" }
        }
      ],
      sched3B_data: [],
      columns_sched3B: [
        {
          title: "Date Purchased",
          dataIndex: "date_purchased",
          scopedSlots: { customRender: "date_purchased" }
        },
        {
          title: "Description",
          dataIndex: "description",
          scopedSlots: { customRender: "description" }
        },
        {
          title: "Amount(Net of VAT)",
          dataIndex: "vat",
          scopedSlots: { customRender: "vat" }
        },
        {
          title: "Balance of Input Tax from previous period",
          dataIndex: "balance_input_tax",
          scopedSlots: { customRender: "balance_input_tax" }
        },
        {
          title: "Estimate Life (in Months)",
          dataIndex: "est_life",
          scopedSlots: { customRender: "est_life" }
        },
        {
          title:
            "Recognized Life (In Months) Useful life or 60 mos. (whichever is shorter)",
          dataIndex: "recog_life",
          scopedSlots: { customRender: "recog_life" }
        },
        {
          title:
            "Allowable Input Tax for the Period Tax Rate / Recognized Life",
          dataIndex: "allowable_input_tax",
          scopedSlots: { customRender: "allowable_input_tax" }
        },
        {
          title:
            "Balance of Input Tax to be carried to Next Period Tax Rate - Allowable Input Tax",
          dataIndex: "balance",
          scopedSlots: { customRender: "balance" }
        },
        {
          title: "",
          dataIndex: "operation",
          scopedSlots: { cutomRender: "operation" }
        }
      ],
      sched6_data: [],
      columns_sched6: [
        {
          title: "Period Covered",
          dataIndex: "covered",
          scopedSlots: { customRender: "covered" }
        },
        {
          title: "Name of Withholding Agent",
          dataIndex: "withholding_agent",
          scopedSlots: { customRender: "withholding_agent" }
        },
        {
          title: "Income Payment",
          dataIndex: "income_pay",
          scopedSlots: { customRender: "income_pay" }
        },
        {
          title: "Total Tax Withheld",
          dataIndex: "total_tax_withheld",
          scopedSlots: { customRender: "total_tax_withheld" }
        },
        {
          title: "Applied Current mo.",
          dataIndex: "applied_current",
          scopedSlots: { customRender: "applied_current" }
        },
        {
          title: "",
          dataIndex: "operation",
          scopedSlots: { cutomRender: "operation" }
        }
      ],
      sched7_data: [],
      columns_sched7: [
        {
          title: "Period Covered",
          dataIndex: "covered",
          scopedSlots: { customRender: "covered" }
        },
        {
          title: "Name of Miller",
          dataIndex: "miller",
          scopedSlots: { customRender: "miller" }
        },
        {
          title: "Name of Tax Payer",
          dataIndex: "tax_payer",
          scopedSlots: { customRender: "tax_payer" }
        },
        {
          title: "Official Receipt Number",
          dataIndex: "receipt_num",
          scopedSlots: { customRender: "receipt_num" }
        },
        {
          title: "Amount Paid",
          dataIndex: "amount_paid",
          scopedSlots: { customRender: "amount_paid" }
        },
        {
          title: "Appliead Current mo.",
          dataIndex: "applied_current",
          scopedSlots: { customRender: "applied_current" }
        },
        {
          title: "",
          dataIndex: "operation",
          scopedSlots: { cutomRender: "operation" }
        }
      ],
      sched8_data: [],
      columns_sched8: [
        {
          title: "Period Covered",
          dataIndex: "covered",
          scopedSlots: { customRender: "covered" }
        },
        {
          title: "Name of Withholding Agent",
          dataIndex: "withholdinng_agent",
          scopedSlots: { customRender: "withholding_agent" }
        },
        {
          title: "Income Payment",
          dataIndex: "income_payment",
          scopedSlots: { customRender: "income_payment" }
        },
        {
          title: "Total Tax Withheld",
          dataIndex: "total_withheld",
          scopedSlots: { customRender: "total_withheld" }
        },
        {
          title: "Applied Current mo.",
          dataIndex: "applied_current",
          scopedSlots: { customRender: "applied_current" }
        },
        {
          title: "",
          dataIndex: "operation",
          scopedSlots: { cutomRender: "operation" }
        }
      ]
    };
  },
  //----------------------------
  watch: {
    //  step() {
    //    if(this.step ===   0 ){
    //        this.form.pdf_page = 1
    //    }else{
    //        this.form.pdf_page =2
    //    }
    //   },
    loading(val) {
      this.$emit("loading", val);
    },

    //--------------------------------

    form: {
      deep: true,
      handler() {
        console.log("2550m form: ", this.form);
        this.form.year = this.formatDtYear(this.form.return_period);
        this.form.month = this.formatDtMonth(this.form.return_period);
        this.form.return_period_year = new Date(
          this.form.return_period
        ).getFullYear();
        this.form.return_period_month = new Date(
          this.form.return_period
        ).getMonth();
        console.log("year: " + this.form.month);
      }
    },
    "form.taxpayer.address_details.zipCode": val => {
      console.log("form.taxpayer.address_details.zipCode ", val);
    }
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

.text-link {
  cursor: pointer;
  color: blue;
}

.text-link:hover {
  text-decoration: underline;
}

.text-uppercase {
  text-transform: uppercase;
}
</style>