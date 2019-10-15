<template>
  <div>
    <a-form v-show="step===0">
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="1"
        :validate-status="error_item('returnPeriod')"
        :help="error_desc('returnPeriod')"
      >
        <a-month-picker
          placeholder="For the month of (MM/YYYY)"
          v-model="form.returnPeriod"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item :labelCol="{ span: 12 }" :wrapperCol="{ span: 12 }" label="2. Ammended Return">
        <a-radio-group v-model="form.amendedYn" style="width: 100%">
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
        <a-input placeholder="Line of Business" v-model="form.taxpayer.line_of_business"></a-input>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="7"
        :validate-status="error_item('taxpayer.registered_name')"
        :help="error_desc('taxpayer.registered_name')"
      >
        <a-input placeholder="Taxpayer/Registered Name" v-model="form.taxpayer.registered_name"></a-input>
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
        <a-textarea placeholder="Registered Address" v-model="form.taxpayer.address"></a-textarea>
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
      <a-form-item v-if="form.is_avail_tax_relief">
        <a-input placeholder="If yes, specify" v-model="form.avail_tax_relief"></a-input>
      </a-form-item>
    </a-form>

    <!-- Part II -->
    <a-form v-show="step===2">
      <a-form-item :validate-status="error_item('atc')" :help="error_desc('atc')">
        <div style="color: black">
          12. Vatable Sales/Receipt-Private (
          <span
            class="text-link"
            @click="show_sched1=true"
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
      <a-form-item
        class="computation-item"
        label="18A/B. Purchase of Capital Goods(Not exceeding ₱1Million)"
      />
      <a-button type="link" @click="showDrawer2">Schedule 2</a-button>
      <a-drawer
        title="Schedule 2 Purchase/Importation of Capital Goods (Aggregate Amount Not Exceeding ₱1Million)"
        placement="right"
        :closable="false"
        @close="sched2_drawer=false"
        :visible="sched2_drawer"
        width="1000"
      >
        <a-table bordered :dataSource="sched2_data" :columns="columns_sched2">
          <template slot="date_purchased" slot-scope="text, record,index">
            <a-date-picker
              v-model="sched2_data[index].date_purchased"
              @change="check_sched2"
              style="width: 100%"
            />
          </template>
          <template slot="description" slot-scope="text, record,index">
            <a-input v-model="sched2_data[index].description"></a-input>
          </template>
          <template slot="vat" slot-scope="text, record,index">
            <a-input-number v-model="sched2_data[index].vat" @change="sched2Compute"></a-input-number>
          </template>
          <template slot="tax" slot-scope="text, record,index">
            <a-input-number disabled v-model="sched2_data[index].tax"></a-input-number>
          </template>
          <template slot="operation" slot-scope="text, record, index">
            <a-popconfirm
              v-if="sched2_data.length"
              title="Sure to delete?"
              @confirm="() => delete_sched2(index)"
            >
              <a href="javascript:;">Delete</a>
            </a-popconfirm>
          </template>
          <template slot="footer">
            <a-button @click="addSched2">Add</a-button>
            <a-button>Save</a-button>
            <p
              align="right"
            >18A: {{form.purCapGoodsNotExceed}} 18B: {{form.outputCapGoodsNotExceed}}</p>
          </template>
        </a-table>
      </a-drawer>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18A"
      >
        <a-input-number placeholder="Purchase" v-model="form.purCapGoodsNotExceed"></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18B"
      >
        <a-input-number placeholder="Output Tax Due" v-model="form.outputCapGoodsNotExceed"></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="18C/D. Purchase of Capital Goods(Exceeding ₱1Million)"
      />
      <a-button type="link" @click="showDrawer3A">Schedule 3 A</a-button>
      <a-drawer
        title="Schedule 3 Purchases/Importation This Period"
        placement="right"
        :closable="false"
        @close="sched3A_drawer=false"
        :visible="sched3A_drawer"
        width="1500"
      >
        <a-table bordered :dataSource="sched3A_data" :columns="columns_sched3A"></a-table>
      </a-drawer>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18C"
      >
        <a-input-number placeholder="Purchase" v-model="form.purCapGoodsExceed"></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18D"
      >
        <a-input-number placeholder="Output Tax Due" v-model="form.outputPurCapGoodsExceed"></a-input-number>
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
        <a-input-number placeholder="Purchase" :v-model="getTotalCurrentPurchases()"></a-input-number>
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
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="20A"
      >
        <a-button type="primary" @click="sched3B_drawer = true">Schedule 3B</a-button>
        <a-input-number
          placeholder="Input Tax on Purchases of Capital Goods exceeding ₱1Million"
          v-model="form.inputTaxPurchaseCapGoods"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="20B"
      >
        <a-button type="link" @click="sched4_drawer = true">Schedule 4</a-button>
        <a-input-number
          placeholder="Input Tax on Sale to Govt. closed to expense"
          v-model="form.inputTaxSaleToGovt"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="20C"
      >
        <a-button type="link" @click="sched5_drawer = true">Schedule 5</a-button>
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
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="23A"
      >
        <a-button type="link" @click="sched6_drawer = true">Schedule 6</a-button>
        <a-input-number
          placeholder="Creditable Value-Added Tax Withheld"
          v-model="form.creditableVatWithheld"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="23B"
      >
        <a-button type="link" @click="sched7_drawer = true">Schedule 7</a-button>
        <a-input-number
          placeholder="Advance Payments for Sugar and Flour Industries"
          v-model="form.advPaySugarFlourInd"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="23C"
      >
        <a-button type="link" @click="sched8_drawer = true">Schedule 8</a-button>
        <a-input-number placeholder="VAT withheld on Sales to Government" v-model="form.taxWthld"></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="23D"
      >
        <a-input-number
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
    <!-- schedule 3B -->
    <a-drawer
      title="Schedule 3 B Purchases/Importation Previous Period"
      placement="right"
      :closable="false"
      @close="sched3B_drawer=false"
      :visible="sched3B_drawer"
      width="1000"
    >
      <a-table bordered :dataSource="sched3B_data" :columns="columns_sched3A"></a-table>
    </a-drawer>
    <!-- schedule 4 -->
    <a-drawer
      title="Schedule 4 Input Tax Attributable to Sale to Government"
      placement="right"
      :closable="false"
      @close="sched4_drawer = false"
      :visible="sched4_drawer"
      width="1000"
    >
      <a-row>
        <a-col :span="18">
          <div>
            <p>
              Input Tax directly attribute to sale to government
              Add: Ratable portion of Input Tax not directly attribute to any activity:
            </p>
          </div>
        </a-col>
        <a-col :span="6">
          <div>
            <a-input-number></a-input-number>
          </div>
        </a-col>
      </a-row>
      <!-- -- -->
      <a-row>
        <a-col :span="9">
          <a-row>
            <a-col :span="12">Taxable sales to government</a-col>
            <a-col :span="12">
              <a-input-number disabled></a-input-number>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">Total Sales</a-col>
            <a-col :span="12">
              <a-input-number disabled></a-input-number>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="4">Amount of Input Tax not directly attributable</a-col>
        <a-col :span="5">
          <a-input-number></a-input-number>
        </a-col>
        <a-col :span="6">
          <a-input-number disabled></a-input-number>
        </a-col>
      </a-row>
      <!-- -- -->
      <a-row>
        <a-col :span="18">Total Input Tax attributable to sale to government</a-col>
        <a-col :span="6">
          <a-input-number disabled></a-input-number>
        </a-col>
      </a-row>
      <!-- -- -->
      <a-row>
        <a-col :span="18">Less Standard Input Tax to sale to government</a-col>
        <a-col :span="6">
          <a-input-number></a-input-number>
        </a-col>
      </a-row>
      <!-- -- -->
      <a-row>
        <a-col :span="18">Input Tax on Sale to Govt. closed to expense (to Item 20B)</a-col>
        <a-col :span="6">
          <a-input-number disabled></a-input-number>
        </a-col>
      </a-row>
    </a-drawer>
    <!-- schedule 5 -->
    <a-drawer
      title="Schedule 4 Input Tax Attributable to Sale to Government"
      placement="right"
      :closable="false"
      @close="sched5_drawer = false"
      :visible="sched5_drawer"
      width="1000"
    >
      <a-row>
        <a-col :span="18">
          <div>
            <p>
              Input Tax directly attribute to sale to government
              Add: Ratable portion of Input Tax not directly attribute to any activity:
            </p>
          </div>
        </a-col>
        <a-col :span="6">
          <div>
            <a-input-number></a-input-number>
          </div>
        </a-col>
      </a-row>
      <!-- -- -->
      <a-row>
        <a-col :span="9">
          <a-row>
            <a-col :span="12">Taxable sales to government</a-col>
            <a-col :span="12">
              <a-input-number disabled></a-input-number>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">Total Sales</a-col>
            <a-col :span="12">
              <a-input-number disabled></a-input-number>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="4">Amount of Input Tax not directly attributable</a-col>
        <a-col :span="5">
          <a-input-number></a-input-number>
        </a-col>
        <a-col :span="6">
          <a-input-number disabled></a-input-number>
        </a-col>
      </a-row>
      <!-- -- -->
      <a-row>
        <a-col :span="18">Total Input Tax attributable to sale to government</a-col>
        <a-col :span="6">
          <a-input-number disabled></a-input-number>
        </a-col>
      </a-row>
      <!-- -- -->
      <a-row>
        <a-col :span="18">Less Standard Input Tax to sale to government</a-col>
        <a-col :span="6">
          <a-input-number></a-input-number>
        </a-col>
      </a-row>
      <!-- -- -->
      <a-row>
        <a-col :span="18">Input Tax on Sale to Govt. closed to expense (to Item 20B)</a-col>
        <a-col :span="6">
          <a-input-number disabled></a-input-number>
        </a-col>
      </a-row>
    </a-drawer>
    <!-- schedule 6 -->
    <a-drawer
      title="Schedule 6 Purchases/Importation Previous Period"
      placement="right"
      :closable="false"
      @close="sched6_drawer=false"
      :visible="sched6_drawer"
      width="1000"
    >
      <a-table bordered :dataSource="sched6_data" :columns="columns_sched6"></a-table>
    </a-drawer>
    <!-- schedule 7 -->
    <a-drawer
      title="Schedule 7 Purchases/Importation Previous Period"
      placement="right"
      :closable="false"
      @close="sched7_drawer=false"
      :visible="sched7_drawer"
      width="1000"
    >
      <a-table bordered :dataSource="sched6_data" :columns="columns_sched7"></a-table>
    </a-drawer>
    <!-- schedule 8 -->
    <a-drawer
      title="Schedule 8 Purchases/Importation Previous Period"
      placement="right"
      :closable="false"
      @close="sched8_drawer=false"
      :visible="sched8_drawer"
      width="1000"
    >
      <a-table bordered :dataSource="sched8_data" :columns="columns_sched8"></a-table>
    </a-drawer>
  </div>
</template>

<script>
import ScheduleOne from "./Schedule1";

export default {
  components: {
    ScheduleOne
  },
  props: ["form", "step"],
  methods: {
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
      this.form.taxDue = total;
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
      var total = (this.form.taxDue || 0) - (this.form.totalCredits || 0);
      this.form.amtPaybl = total;
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
      var total = this.computeSum([this.form.amtPaybl, this.form.penalties]);
      this.form.totalAmountPayable = total;
      return total;
    },
    updateSchedAndClose(data) {
      // Object.keys(data).forEach(key => {
      //   this.form[key] = data[key];
      // })
      this.form.sched1 = data.sched1;
      this.form.totalAtcAmount = data.totalAtcAmount;
      this.form.totalAtcOutput = data.totalAtcOutput;
      this.show_sched1 = false;
    },
    sched2Save() {},
    delete_sched2(index) {
      this.sched2_data[index].splice(index, 1);
    },
    check_sched2(value) {
      var only = this.formatDtMonth(this.form.returnPeriod);
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
      this.changeStep(this.step + 1);
    },
    submit() {
      this.loading = true;
      this.errors = [];
      this.$store
        .dispatch("VALIDATE_AND_SAVE", {
          form_type: "2550M",
          form_details: this.form
        })
        .then(result => {
          console.log("VALIDATE_AND_SAVE result:", result.data);
          this.loading = false;
          this.$emit("updateForm", null); //to refresh pdf
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
              message: "Successfully submitted Form 2550m."
            });
            var return_details = result.data.model;
            return_details.registered_name = this.form.taxpayer.registered_name;
            return_details.taxpayer_type = this.form.taxpayer.taxpayer_type;
            this.$emit("success", return_details);
          }
        })
        .catch(err => {
          console.log("VALIDATE_AND_SAVE", err);
          this.loading = false;
        });
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
      sched2_drawer: false,
      sched3A_drawer: false,
      sched3B_drawer: false,
      sched4_drawer: false,
      sched5_drawer: false,
      sched6_drawer: false,
      sched7_drawer: false,
      sched8_drawer: false,
      errors: [],
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
  watch: {
    loading(val) {
      this.$emit("loading", val);
    },
    form: {
      deep: true,
      handler() {
        console.log("2550m form: ", this.form);
        this.form.year = this.formatDtYear(this.form.returnPeriod);
        this.form.month = this.formatDtMonth(this.form.returnPeriod);
        this.form.returnPeriodYear = this.formatDtYear(this.form.returnPeriod);
        this.form.returnPeriodMonth = this.formatDtMonth(
          this.form.returnPeriod
        );
        console.log("year: " + this.form.month);
      }
    },
    step() {}
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
</style>