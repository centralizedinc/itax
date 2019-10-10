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
        <a-radio-group v-model="form.is_avail_tax_relief" :defaultValue="false">
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
      <a-form-item label="12. Vatable Sales/Receipt-Private (Sch. 1)" />
      <a-button type="primary" @click="showDrawer">
        Schedule 1
      </a-button>
      <a-drawer
        title="Schedule 1 Schedule of Sales/Receipts and Output Tax"
        placement="right"
        :closable="false"
        @close="onClose"
        :visible="visible"
        width="1000"
      >
        <a-button type="primary" @click="addAtc">
          ADD
        </a-button>
        <!-- <a-drawer
        title="ATC"
        placement="right"
        :closable="false"
        @close="onClose"
        :visible="visibleATC"
        width="500"
        >
          <a-checkbox-group :options="plainOptions" v-model="value" @change="onChange" />
        </a-drawer> -->
        <a-table bordered :loading="reloadATC" :dataSource="form.sched1" :columns="columns">
          <template slot="industry" slot-scope="text, record,index">
            <!-- <Aa v-if="holder.industry == null">{{text}}</p> -->
            <a-input disabled v-model="form.sched1[index].description"></a-input>
          </template>
          <template slot="footer">
            <!-- <a-button @click="onClose">Proceed</a-button> -->
            <p align="right">12A: Total Amount: {{form.totalAtcAmount}} 12B: Total Output Tax: {{form.totalAtcOutput}}</p>
          </template>
          <template slot="atc" slot-scope="text, record, index">
            <a-select
              style="width 100%"
              @change="pickAtc($event, index)"
              :defaultValue="form.sched1[index] && form.sched1[index].atc ? form.sched1[index].atc : 'Pick an ATC'"
            >
              <a-select-option  v-for="(item, i) in atc_list" :key="i">{{item.atc}}</a-select-option>
            </a-select>
          </template>
          <template slot="amount" slot-scope="text, record, index">
            <a-input-number @change="changeAmount($event, index)" v-model="form.sched1[index].amount" placeholder="text"></a-input-number>
          </template>
          <template slot="output" slot-scope="text, record, index">
            <a-input-number v-model="form.sched1[index].output_tax" disabled></a-input-number>
          </template>
          <template slot="operation" slot-scope="text, record, index">
            <!-- <a-popconfirm
              v-if="dataSource[index].editable == false"
              title="Sure to save?"
              @confirm="() => saveAtc(index)">
              <a href="javascript:;">Save</a>
            </a-popconfirm>
            <a-popconfirm
              v-if="dataSource[index].editable == true"
              title="Sure to edit?"
              @confirm="() => editAtc(index)">
              <a href="javascript:;">Edit</a>
            </a-popconfirm>
            <a-popconfirm
              v-if="dataSource[index].editable == false"
              title="Sure to Cance;?"
              @confirm="() => cancelAtc(index)">
              <a href="javascript:;">Cancel</a>
            </a-popconfirm> -->
            <a-popconfirm
              title="Sure to delete ?"
              @confirm="deleteAtc(index)">
              <a href="javascript:;">Delete</a>
            </a-popconfirm>
          </template>
        </a-table>
      </a-drawer>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="12A"
        :validate-status="error_item('atc')"
        :help="error_desc('atc')"
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
        <a-input-number
          placeholder="Sales/Receipt for the Month"
          v-model="form.salesGovAmount"
          
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
          :data="total_sales"
          disabled
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
          :data="total_output_tax"
          disabled
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
        <a-input-number
          placeholder="Total"
          :data="total_allowable_less_input_tax"
          v-model="form.totalAllowableLessInputTax"
          disabled
        ></a-input-number>
      </a-form-item>

      <a-form-item label="18. Current Transaction" />
      <a-form-item
        class="computation-item"
        label="18A/B. Purchase of Capital Goods(Not exceeding ₱1Million)"
      />
      <a-button type="primary" @click="showDrawer2">
        Schedule 2
      </a-button>
      <a-drawer
      title="Schedule 2 Purchase/Importation of Capital Goods (Aggregate Amount Not Exceeding ₱1Million)"
      placement="right"
      :closable="false"
      @close="onClose_sched2"
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
          @confirm="() => delete_sched2(index)">
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
      <template slot="footer">
          <a-button @click="addSched2">Add</a-button>
          <a-button>Save</a-button>
      <p align="right">18A: {{form.purCapGoodsNotExceed}} 18B: {{form.outputCapGoodsNotExceed}}</p>
    </template>
      </a-table>
      </a-drawer>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18A"
      >
        <a-input-number
          placeholder="Purchase"
          v-model="form.purCapGoodsNotExceed"
          disabled
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
          disabled
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="18C/D. Purchase of Capital Goods(Exceeding ₱1Million)"
      />
      <a-button type="primary" @click="showDrawer3A">
        Schedule 3
      </a-button>
      <a-drawer
      title="Schedule 3 Purchases/Importation This Period"
      placement="right"
      :closable="false"
      @close="onClose_sched3A"
      :visible="sched3A_drawer"
      width="1500"
      >
      <a-table bordered :dataSource="sched3A_data" :columns="columns_sched3A">

        </a-table>
      </a-drawer>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        class="computation-item"
        label="18C"
      >
        <a-input-number
          placeholder="Purchase"
          v-model="form.purCapGoodsExceed"
          disabled
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
          disabled
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
          disabled
          :data="total_current_purchases"
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
          disabled
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
          disabled
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
          disabled
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
          disabled
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
          disabled
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
          :data = "total_input_tax"
          disabled
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
          :data="tax_due"
          disabled
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
          disabled
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
          disabled
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
          disabled
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
          disabled
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
          disabled
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
          :data="amount_payable"
          disabled
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
        <a-input-number
          placeholder="Surcharge"
          v-model="form.surcharge"
          
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="25B"
        :validate-status="error_item('interest')"
        :help="error_desc('interest')"
      >
        <a-input-number
          placeholder="Interest"
          v-model="form.interest"
          
        ></a-input-number>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="25C"
        :validate-status="error_item('compromise')"
        :help="error_desc('compromise')"
      >
        <a-input-number
          placeholder="Compromise"
          v-model="form.compromise"
          
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
          :data="penalties"
          disabled
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
          :data="total_amount_payable"
          disabled
        ></a-input-number>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  props: ["form", "step"],
  methods: {
    computeSched1(){
      this.form.totalAtcAmount = 0
      this.form.totalAtcOutput = 0
      this.dataSource.forEach(data =>{
        console.log("data source data; " + JSON.stringify(data))
        this.form.totalAtcAmount += data.amount
        this.form.totalAtcOutput += data.output
      })
    },
    saveAtc(index){
      this.dataSource[index].editable = true
      this.forEdit = false     
      console.log("record index: " + JSON.stringify(this.dataSource))
      this.holder = {
        industry: null,
        atc: null,
        amount: 0,
        output: 0
      }
      this.computeSched1()
    },
    cancelAtc(index){
      this.dataSource[index].editable = true
      this.dataSource[index] = this.holder
      this.holder = {
        industry: null,
        atc: null,
        amount: 0,
        output: 0
      }
      this.forEdit = false
    },
    deleteAtc(index){
      this.reloadATC = true;
      setTimeout(() => {
        this.form.sched1.splice(index, 1);
        this.reloadATC = false;
      }, 1000);
    },
    editAtc(index){
      if(this.forEdit){
        console.log("please save first before you can edit other")
        
      }else{
        this.forEdit = true
        this.sched1_index = index
        this.holder = this.dataSource[index]
      this.dataSource[index].editable  = false
      }
      console.log("data source data: " + JSON.stringify(this.dataSource[index]))
    },
    pickAtc(atc_index, index){
      this.reloadATC = true;
        const item = this.atc_list[atc_index];
        this.form.sched1[index].atc = item.atc;
        this.form.sched1[index].description = item.description;
        this.form.sched1[index].rate = item.rate;
        this.form.sched1[index].output_tax = this.form.sched1[index].amount * item.rate;
        console.log('this.dataSource[index] :', this.form.sched1[index]);
        this.form.totalAtcAmount = this.form.sched1.map(v => v.amount).reduce((t, v) => t + v);
        this.form.totalAtcOutput = this.form.sched1.map(v => v.output_tax).reduce((t, v) => t + v);
        this.reloadATC = false;
    },
    changeAmount(value, index){
      console.log('changeAmount value :', value);
      if(value !== null && !isNaN(value)){
        // this.dataSource[index].amount = value
        this.reloadATC = true;
        this.form.sched1[index].output_tax = value * this.form.sched1[index].rate;
        this.form.totalAtcAmount = this.form.sched1.map(v => v.amount).reduce((t, v) => t + v);
        this.form.totalAtcOutput = this.form.sched1.map(v => v.output_tax).reduce((t, v) => t + v);
        this.reloadATC = false;
      }
    },
    changeOutput(value){
      this.dataSource[this.sched1_index].output = value * 0.12;
      console.log("change output value: " + JSON.stringify(value))
    },
    addAtc() {
      this.reloadATC = true;
      setTimeout(() => {
        if(!this.form.sched1) this.form.sched1 = [];
        this.form.sched1.push({
          description: '',
          atc: 'Pick an ATC',
          amount: 0,
          output_tax: 0,
          rate: 0
        })
        this.reloadATC = false;
      }, 1000);
      console.log('this.form.sched1 addAtc :', this.form.sched1);
      // console.log("updated dataa source: " + JSON.stringify(this.dataSource))
      // if(this.forEdit == true){
      //   console.log("please save first before you can add")
      // }else{
      // this.dataSource.push({
      //   description: '',
      //   atc: 'Pick an ATC',
      //   amount: 0,
      //   output_tax: 0,
      //   rate: 0
      // })
      // }
      // this.visibleATC = true
    },
    sched2Save(){

    },
    delete_sched2(index){
      this.sched2_data[index].splice(index,1)
    },
    check_sched2(value){
      
      var only = this.formatDtMonth(this.form.returnPeriod)
      var picked = this.formatDtMonth(value)
      console.log('check sched2: ' + value)
      if(picked !== only){
        console.log("please choose base on return period")
      }
    },
    addSched2(){
      console.log('add sched2 date of return: ' + this.sched2_data)
      
      if(this.sched2_data == false){
        console.log("sched 2 data fnun")
        this.sched2_data.push({
        date_purchased: '',
        description: '',
        vat: 0,
        tax: 0
      }) 
      }else{
        var index = this.sched2_data.length - 1
      console.log("last index sched2_data: " + index)
      if(this.sched2_data[index].date_purchased == '' || 
      this.sched2_data[index].description == '' ||
      this.sched2_data[index].tax <= 0 ||
      this.sched2_data[index].vat <= 0 ){
        console.log('please fill up all blank')
      }else{
        console.log("pushed")
        this.sched2_data.push({
        date_purchased: '',
        description: '',
        vat: 0,
        tax: 0,
      })  
      }
      }      
    },
    sched2Compute(value){
      var index = this.sched2_data.length - 1
      this.form.purCapGoodsNotExceed = 0
      this.form.outputCapGoodsNotExceed = 0
      this.sched2_data[index].tax = value * 0.12;
      this.sched2_data.forEach(data =>{
        this.form.purCapGoodsNotExceed += data.vat
        this.form.outputCapGoodsNotExceed += data.tax
      })
    },
    onClose_sched2(){
      this.sched2_drawer = false
    },
    showDrawer() {
      console.log("data source show drawer; " + this.dataSource)
      this.visible = true
    },
    showDrawer2() {
      console.log("data source show drawer; " + this.dataSource)
      this.sched2_drawer = true
    },
    showDrawer3A(){
      this.sched3A_drawer = true
    },
    onClose_sched3A(){
      this.sched3A_drawer = false
    },
    onClose() {
      // this.visible = false
      if(this.visible = true){
        this.visible = false
      } else if(this.visibleATC = true){
        this.visibleATC = false
      }
    },
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
      this.errors = [];
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
            console.log('this.errors :', this.errors);
            if(this.errors && this.errors[0] && this.errors[0].page !== null) this.$emit("changeStep", this.errors[0].page);
            this.$notification.error({ message: "Validation Error" });
          } else {
            this.$store.commit("REMOVE_DRAFT_FORM", this.$route.query.ref_no);
            this.$store.commit("NOTIFY_MESSAGE", {
              success: true,
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
      reloadATC: false,
      atc_list: [{
        description: "Genral", 
        atc:"VB010",
        rate: 0.12
      }, {
        description: "Genral1", 
        atc:"VB011",
        rate: 0.2
      }], 
      sched1_index: null,
      holder:{
        industry: null,
        atc: "Pick an ATC",
        amount: 0,
        output: 0
      },
      atc_amount_holder:0,
      atc_output_holder:0,
      forEdit: false,
      visible: false,
      sched2_drawer: false,
      sched3A_drawer: false,
      visibleATC: false,
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
      image_height: 1000,
      atc_options:[],
      dataSource: [],
      columns: [{
        title: 'Industry Covered by VAT',
        dataIndex: 'industry',
        scopedSlots: { customRender: 'industry'}
      }, {
        title: 'ATC',
        dataIndex: 'atc',
        width: '30%',
        scopedSlots: { customRender: 'atc'}
      }, {
        title: 'Amount of Sales/Receipts For the Period',
        dataIndex: 'amount',
        scopedSlots: { customRender: 'amount' },
      }, {
        title: 'Output Tax for the Period',
        dataIndex: 'output',
        scopedSlots: { customRender: 'output' },
      },
      {
        title: '',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation'}
      }],
      sched2_data: [],
      columns_sched2: [{
        title: 'Date Purchased',
        dataIndex: 'date_purchased',
        scopedSlots: { customRender: 'date_purchased'}
      },
      {
        title: 'Description',
        dataIndex: 'description',
        scopedSlots: { customRender: 'description'}
      },
      {
        title: 'Amount (Net of VAT)',
        dataIndex: 'vat',
        scopedSlots: { customRender: 'vat'}
      },
      {
        title: 'Input Tax',
        dataIndex: 'tax',
        scopedSlots: { customRender: 'tax'}
      },
      {
        title: '',
        dataIndex: 'operation',
        scopedSlots: { cutomRender: 'operation'}
      }
      ],
      sched3A_data:[],
      columns_sched3A:[
        {
        title: 'Date Purchased',
        dataIndex: 'date_purchased',
        scopedSlots: { customRender: 'date_purchased'}
      },
      {
        title: 'Description',
        dataIndex: 'description',
        scopedSlots: { customRender: 'description'}
      },
      {
        title: 'Amount(Net of VAT)',
        dataIndex: 'vat',
        scopedSlots: { customRender: 'vat'}
      },
      {
        title: 'Input Tax (C*Tax Rate)',
        dataIndex: 'tax_rate',
        scopedSlots: { customRender: 'tax_rate'}
      },
      {
        title: 'Estimate Life (in Months)',
        dataIndex: 'est_life',
        scopedSlots: { customRender: 'est_life'}
      },
      {
        title: 'Recognized Life (In Months) Useful life or 60 mos. (whichever is shorter)',
        dataIndex: 'recog_life',
        scopedSlots: { customRender: 'recog_life'}
      },
      {
        title: 'Allowable Input Tax for the Period Tax Rate / Recognized Life',
        dataIndex: 'allowable_input_tax',
        scopedSlots: { customRender: 'allowable_input_tax'}
      },
      {
        title: 'Balance of Input Tax to be carried to Next Period Tax Rate - Allowable Input Tax',
        dataIndex: 'balance',
        scopedSlots: { customRender: 'balance'}
      },
      {
        title: '',
        dataIndex: 'operation',
        scopedSlots: { cutomRender: 'operation'}
      }
      ]
    };
  },
  computed: {
    // 16A = 12A + 13A + 14 + 15
    total_sales(){
      var tosum =[this.form.totalAtcAmount, this.form.salesGovAmount, this.form.zeroRatedAmount, this.form.exemptAmount]
      return this.form.totalSales = this.computeSum(tosum)
    },
    total_atc_amount(){
      if(this.form.sched1 && this.form.sched1.length){
        const total = this.form.sched1.map(v => v.amount).reduce((t, v) => t + v);
        console.log('total :', total);
        this.form.totalAtcAmount = total || 0;
        return total || 0;
      }return 0
    },
    total_atc_output_tax(){
      if(this.form.sched1 && this.form.sched1.length){
        const total = this.form.sched1.map(v => v.output_tax).reduce((t, v) => t + v);
        this.form.totalAtcOutput = total || 0;
        return total || 0;
      } return 0;
    },
    // 16B = 12B + 13B
    total_output_tax(){
      var tosum =[this.form.totalAtcOutpu, this.form.salesGovOutput]
      return this.form.totalOutputTax = this.computeSum(tosum)
    },
    // 17F = 17A + 17B + 17C + 17D + 17E
    total_allowable_less_input_tax() {
      console.log('#########',this.form.carriedOverPreviousPeriod?this.form.carriedOverPreviousPeriod:0);
      var tosum = [this.form.carriedOverPreviousPeriod,
      this.form.txbleGoodsServices,this.form.transInputTax,
      this.form.presumpInputTax,this.form.otherAllowableLessInputTax]
      console.log('compute sum: ' + this.computeSum(tosum))
      return this.form.totalAllowableLessInputTax = this.computeSum(tosum)
},
// 18P = 18A + 18C + 18E +18G + 18I + 18M + 18N
total_current_purchases(){
var tosum = [this.form.purCapGoodsNotExceed,this.form.purCapGoodsExceed,
this.form.domesticPurchaseGoods,this.form.importationGoods,this.form.domesticPurchaseService,
this.form.purchaseNotQualified,this.form.purchaseOthers]

return this.form.totalCurrentPurchases = this.computeSum(tosum)
},
    // 19 = 17F + 18B + 18D + 18F + 18H + 18J + 18L + 18O
    total_available_input_tax() {
      var tosum = [this.form.totalAllowableLessInputTax,this.form.outputCapGoodsNotExceed,
      this.form.outputPurCapGoodsExceed,this.form.outputDomesticPurchaseGoods,this.form.outputImportationGoods,
      this.form.outputDomesticPurchaseService,this.form.outputServicesNonResidents,this.form.outputPurchaseOthers]
      return this.form.totalAvailableInputTax = this.computeSum(tosum)
    },
    //  20F = 20A + 20B + 20C + 20D +20E
    total_deduction_from_input_tax() {
      var tosum = [this.form.inputTaxPurchaseCapGoods,this.form.inputTaxSaleToGovt,
      this.form.inputTaxAllocableToExempt,this.form.refundTcm,this.form.otherDeductionFrInputTax]
      return this.form.totalDeductionFrInputTax = this.computeSum(tosum)
    },
    // 21 = 19 - 20F
    total_input_tax(){
      return this.form.totalInputTax = this.form.totalAvailableInputTax - this.form.totalDeductionFrInputTax
    },
    // 22 = 16B - 21
    tax_due(){
      return this.form.taxDue = this.form.totalOutputTax - this.form.totalInputTax
    },
    //  23G = 23A + 23B + 23C + 23D + 23E
    total_credits() {
      var tosum = [this.form.creditableVatWithheld,this.form.advPaySugarFlourInd,this.form.taxWthld,this.form.prevTaxPaid,this.form.advPymt]
      return this.form.totalCredits = this.computeSum(tosum)
    },
    // 24 = 22 - 23F
    amount_payable(){
      return this.form.amtPayb = this.form.taxDue - this.form.otherTaxCredits
    },
    // 25D = 25A + 25B + 25C
    penalties(){
      var tosum = [this.form.surcharge,this.form.interest,this.form.compromise]
      return this.form.penalties = this.computeSum(tosum)
    },
    // 26 = 24 + 25D
    total_amount_payable(){
      var tosum = [this.form.amtPaybl,this.form.penalties]
      return this.form.totalAmountPayable = this. computeSum(tosum)
    }
  },
  watch: {
    loading(val) {
      this.$emit("loading", val);
    },
    form: {
      deep: true,
      handler() {
        console.log("2550m form: " + this.form.returnPeriod);
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