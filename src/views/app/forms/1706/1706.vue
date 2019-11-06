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
        <a-date-picker
          placeholder="Date of Transaction Purchase (MM/DD/YYYY)"
          v-model="form.return_period"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="2"
      >
        <a-radio-group v-model="form.amended_yn" style="width: 100%">
          <span style="margin-right: 14px">Amended Return</span>
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
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="4"
      >
        <a-radio-group v-model="form.atc_code" :defaultValue="false" style="width: 100%">
          <span style="margin-right: 14px">ATC</span>
          <!-- atc code 0-1 -->
          <a-radio :value="'I'">II420 Individual</a-radio>
          <a-radio :value="'C'">IC420 Corporation</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>

    <!-- PART 1 -->
    <a-form v-show="step===1">
      <a-divider>
        <b>Part I: Background Information</b>
      </a-divider>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="5"
        :validate-status="error_item('taxpayer.tin')"
        :help="error_desc('taxpayer.tin')"
      >
        <a-input placeholder="TIN Seller" v-model="form.taxpayer.tin"></a-input>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="6"
        :validate-status="error_item('taxpayer.rdo_code')"
        :help="error_desc('taxpayer.rdo_code')"
      >
        <a-input placeholder="RDO Code" v-model="form.taxpayer.rdo_code"></a-input>
      </a-form-item>

      <!-- 7-8 buyer -->
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="7"
        :validate-status="error_item('buyer_details.tin')"
        :help="error_desc('buyer_details.tin')"
      >
        <a-input placeholder="TIN Buyer" v-model="form.buyer_details.tin"></a-input>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="8"
        :validate-status="error_item('buyer_details.rdo_code')"
        :help="error_desc('buyer_details.rdo_code')"
      >
        <a-input placeholder="RDO Code" v-model="form.buyer_details.rdo_code"></a-input>
      </a-form-item>

      <a-row :gutter="4">
        <a-col :span="12">
          <!-- 9 -->
          <a-form-item
            :labelCol="{span: 4}"
            :wrapperCol="{span: 20}"
            label="9"
            :validate-status="error_item('taxpayer.registered_name')"
            :help="error_desc('taxpayer.registered_name')"
          >
            <a-input placeholder="Seller's Name (et al)" v-model="form.taxpayer.registered_name"></a-input>
          </a-form-item>
        </a-col>
        <!-- 10 -->
        <a-col :span="12">
          <a-form-item
            :labelCol="{span: 3}"
            :wrapperCol="{span: 21}"
            label="10"
            :validate-status="error_item('buyer_details.registered_name')"
            :help="error_desc('buyer_details.registered_name')"
          >
            <a-input
              placeholder="Buyer's Name (et al)"
              v-model="form.buyer_details.registered_name"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="4">
        <!-- 11 -->
        <a-col :span="12">
          <a-form-item
            :labelCol="{span: 4}"
            :wrapperCol="{span: 20}"
            label="11"
            :validate-status="error_item('taxpayer.address')"
            :help="error_desc('taxpayer.address')"
          >
            <a-textarea
              autosize
              placeholder="Seller's Registered Address"
              v-model="form.taxpayer.address"
            ></a-textarea>
          </a-form-item>
        </a-col>
        <!-- 12 -->
        <a-col :span="12">
          <a-form-item
            :labelCol="{span: 3}"
            :wrapperCol="{span: 21}"
            label="12"
            :validate-status="error_item('buyer_details.address')"
            :help="error_desc('buyer_details.address')"
          >
            <a-textarea
              autosize
              placeholder="Buyer's Registered Address"
              v-model="form.buyer_details.address"
            ></a-textarea>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="4">
        <!-- 13 -->
        <a-col :span="12">
          <a-form-item
            :labelCol="{span: 4}"
            :wrapperCol="{span: 20}"
            label="13"
            :validate-status="error_item('taxpayer.individual_details.address')"
            :help="error_desc('taxpayer.individual_details.address')"
          >
            <a-textarea
              autosize
              placeholder="Seller's Residence Address"
              v-model="form.taxpayer.individual_details.address"
            ></a-textarea>
          </a-form-item>
        </a-col>
        <!-- 14 -->
        <a-col :span="12">
          <a-form-item
            :labelCol="{span: 3}"
            :wrapperCol="{span: 21}"
            label="14"
            :validate-status="error_item('location_of_property')"
            :help="error_desc('location_of_property')"
          >
            <a-textarea
              autosize
              placeholder="Location of Property"
              v-model="form.location_of_property"
            ></a-textarea>
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 15 -->
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        :validate-status="error_item('classification_property')"
        :help="error_desc('classification_property')"
        label="15"
      >
        <span style="margin-right: 14px">Classification of Real Property</span>
        <a-radio-group v-model="form.classification_property">
          <a-radio :value="'1'">Residential</a-radio>
          <a-radio :value="'2'">Commercial</a-radio>
          <a-radio :value="'3'">Condominium Residential</a-radio>
          <br />
          <a-radio :value="'4'">Agricultural</a-radio>
          <a-radio :value="'5'">Industrial</a-radio>
          <a-radio :value="'6'">Condominium Commercial</a-radio>
          <br />
          <a-radio :value="'Others'">
            Others
            <a-input
              style="width: 25vw; margin-left: 14px"
              v-model="form.classification_property_specify"
              placeholder="Please specify"
            ></a-input>
          </a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>

    <!-- Part 1.1 Next Page -->
    <a-form v-show="step===2">
      <a-divider>Continuation of Part I</a-divider>
      <!-- 16 -->
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="16"
        :validate-status="error_item('area_sold')"
        :help="error_desc('area_sold')"
      >
        <span style="margin-right: 14px">Brief Description of Property</span>
        <a-row :gutter="12">
          <a-col :span="8">
            <a-input placeholder="Area sold (sq.m.)" v-model="form.area_sold"></a-input>
          </a-col>
          <a-col :span="16">
            <a-input placeholder="Tax Declaration No." v-model="form.tax_dec_no"></a-input>
          </a-col>
          <a-col :span="24">
            <a-input placeholder="TCT/OCT/CCT No." v-model="form.tct_no"></a-input>
          </a-col>
          <a-col :span="24">
            <a-input placeholder="Others" v-model="form.others"></a-input>
          </a-col>
        </a-row>
      </a-form-item>
      <!-- 17 -->
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="17"
      >
        <a-radio-group
          v-model="form.sold_as_principal_property"
          :defaultValue="false"
          style="width: 100%"
        >
          <span
            style="margin-right: 10px"
          >Is the property being sold your principal residence? (For Individual sellers only)</span>
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <!-- 18 -->
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="18"
      >
        <a-radio-group
          v-model="form.intend_construct_acquire"
          :defaultValue="false"
          style="width: 100%"
        >
          <span>Do you intend to construct or acquire a new principal residence within 18 months from the date of disposition/sale? (For Individuals)</span>
          <br />
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <!-- 19 -->
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="19"
      >
        <a-radio-group v-model="form.selling_price_cover" :defaultValue="false" style="width: 100%">
          <span>Does the selling price cover more than one property?</span>
          <br />
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <!-- 20 -->
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="20"
      >
        <a-radio-group
          @change="changeTaxRelief"
          v-model="form.is_avail_tax_relief"
          :defaultValue="false"
          style="width: 100%"
        >
          <span>Are you availing of tax relief under an International Tax Treaty or Special Law ?</span>
          <br />
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
          <a-input
            v-if="form.is_avail_tax_relief==true"
            style="width: 25vw; margin-left: 14px"
            v-model="form.yes_avail_tax_relief"
            placeholder="If yes, specify"
          ></a-input>
        </a-radio-group>
      </a-form-item>
      <!-- 21 -->
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="21"
      >
        <a-radio-group
          v-model="form.description_transaction_specify"
          :defaultValue="false"
          style="width: 100%"
        >
          <span>Description of Transaction</span>
          <br />
          <a-radio :value="'CS'">Cash Sale</a-radio>
          <a-radio :value="'IS'">Installment Sale</a-radio>
          <a-radio :value="'E'">Exempt</a-radio>
          <a-radio :value="'FS'">Foreclosure Sale</a-radio>
          <a-radio :value="'O'">Others</a-radio>
          <a-input
            v-if="form.description_transaction_specify==='E' || form.description_transaction_specify==='O'"
            style="width: 30vw; margin-left: 14px"
            v-model="form.is_exempt"
            placeholder="If Exempt, or others, specify"
          ></a-input>
        </a-radio-group>
      </a-form-item>
      <br />
      <!--  -->
      <span>For Installment Sale</span>
      <a-row :gutter="12">
        <a-col :span="12">
          <!-- 22 -->
          <a-form-item :labelCol="{span: 4}" :wrapperCol="{span: 20}" label="22">
            <a-input placeholder="Selling Price" v-model="form.selling_price" style="width: 100%" />
          </a-form-item>
        </a-col>
        <!-- 23 -->
        <a-col :span="12">
          <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}" label="23">
            <a-input
              placeholder="Cost and Expenses"
              v-model="form.cost_expenses"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <!-- 24 -->
        <a-col :span="12">
          <a-form-item :labelCol="{span: 4}" :wrapperCol="{span: 20}" label="24">
            <a-input
              placeholder="Mortgage Assumed"
              v-model="form.mortgage_assumed"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <!-- 25 -->
        <a-col :span="12">
          <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}" label="25">
            <a-tooltip>
              <template slot="title">Total Payments (Collection) During the Initial Year</template>
              <a-input
                placeholder="Total Payments (Collection) During the Initial Year"
                v-model="form.total_payments_initial_year"
                style="width: 100%"
              ></a-input>
            </a-tooltip>
          </a-form-item>
        </a-col>
        <!-- 26 -->
        <a-col :span="12">
          <a-form-item :labelCol="{span: 4}" :wrapperCol="{span: 20}" label="26">
            <a-tooltip>
              <template slot="title">Amount of Periodic Payment (Collection)</template>
              <a-input
                placeholder="Amount of Periodic Payment (Collection)"
                v-model="form.amount_installment_month"
                style="width: 100%"
              ></a-input>
            </a-tooltip>
          </a-form-item>
        </a-col>
        <!-- 27 -->
        <a-col :span="12">
          <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}" label="27">
            <a-tooltip>
              <template slot="title">No. of Installments in the Contract</template>
              <a-input
                placeholder="No. of Installments in the Contract"
                v-model="form.total_no_installment_month"
                style="width: 100%"
              ></a-input>
            </a-tooltip>
          </a-form-item>
        </a-col>
      </a-row>
      <!-- 28 -->
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="28"
        :validate-status="error_item('date_of_installment')"
        :help="error_desc('date_of_installment')"
      >
        <a-date-picker
          placeholder="Date of Installment (MM/DD/YYYY)"
          v-model="form.date_of_installment"
          style="width: 100%"
        />
      </a-form-item>
    </a-form>

    <!-- Part 1.2 Next Page -->
    <a-form v-show="step===3">
      <a-divider>Continuation of Part I</a-divider>
      <!-- 29 -->
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        :validate-status="error_item('item29')"
        :help="error_desc('item29')"
        label="29"
      >
        <span style="margin-right: 14px">Fair Market Value (FMV) - Valuation at the time of Contract</span>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="29A"
        :validate-status="error_item('item29.tax_declaration_land')"
        :help="error_desc('item29.tax_declaration_land')"
      >
        <!-- <a-radio-group v-model="form.item29.tax_declaration_land"> -->
        <!-- <a-radio :value="'29A'">29A</a-radio> -->
        <a-tooltip>
          <template slot="title">FMV of Land per latest Tax Declaration</template>
          <a-input
            v-model="form.item29.tax_declaration_land"
            placeholder="FMV of Land per latest Tax Declaration"
          ></a-input>
        </a-tooltip>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="29B"
        :validate-status="error_item('item29.tax_declaration_improvements')"
        :help="error_desc('item29.tax_declaration_improvements')"
      >
        <!-- <a-radio :value="'29B'">29B</a-radio> -->
        <a-tooltip>
          <template slot="title">FMV of Improvements per latest Tax Declaration</template>
          <a-input
            v-model="form.item29.tax_declaration_improvements"
            placeholder="FMV of Improvements per latest Tax Declaration"
          ></a-input>
        </a-tooltip>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="29C"
        :validate-status="error_item('item29.zonal_value')"
        :help="error_desc('item29.zonal_value')"
      >
        <!-- <a-radio :value="'29C'">29C</a-radio> -->
        <a-tooltip>
          <template slot="title">FMV of Land as determined by BIR Commissioner (zonal value)</template>
          <a-input
            v-model="form.item29.zonal_value"
            placeholder="FMV of Land as determined by BIR Commissioner (zonal value)"
          ></a-input>
        </a-tooltip>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="29D"
        :validate-status="error_item('item29.commissioner')"
        :help="error_desc('item29.commissioner')"
      >
        <!-- <a-radio :value="'29D'">29D</a-radio> -->
        <a-tooltip>
          <template slot="title">FMV of Improvements as determined by BIR Commissioner (BIR Rules)</template>
          <a-input
            v-model="form.item29.commissioner"
            placeholder="FMV of Improvements as determined by BIR Commissioner (BIR Rules)"
          ></a-input>
        </a-tooltip>
      </a-form-item>

      <!-- </a-radio-group> -->
      <!-- 30 -->
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="30"
      >
        <span style="margin-right: 14px">Determination of Taxable Base</span>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="30A"
        :validate-status="error_item('item30.gross_selling_price')"
        :help="error_desc('item30.gross_selling_price')"
      >
        <!-- <a-radio-group>
        <a-radio :value="'30A'">30A</a-radio>-->
        <a-tooltip>
          <template slot="title">Gross Selling Price</template>
          <a-input v-model="form.item30.gross_selling_price" placeholder="30A. Gross Selling Price"></a-input>
        </a-tooltip>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="30B"
        :validate-status="error_item('item30.bid_price')"
        :help="error_desc('item30.bid_price')"
      >
        <!-- <a-radio :value="'30B'">30B</a-radio> -->
        <a-tooltip>
          <template slot="title">Bid Price (For Foreclosure Sale)</template>
          <a-input v-model="form.item30.bid_price" placeholder="Bid Price (For Foreclosure Sale)"></a-input>
        </a-tooltip>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="30C"
        :validate-status="error_item('item30.fair_market_value')"
        :help="error_desc('item30.fair_market_value')"
      >
        <!-- <a-radio :value="'30C'">30C</a-radio> -->
        <a-tooltip>
          <template
            slot="title"
          >Fair Market Value of Land and Improvement (Sum of 29A & 29B/29C & 29D/29A & 29D/29B & 29C, whichever is higher)</template>
          <a-input
            v-model="form.item30.fair_market_value"
            placeholder="Fair Market Value of Land and Improvement"
          ></a-input>
        </a-tooltip>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="30D"
        :validate-status="error_item('item30.installment_collected')"
        :help="error_desc('item30.installment_collected')"
      >
        <!-- <a-radio :value="'30D'">30D</a-radio> -->
        <a-tooltip>
          <template
            slot="title"
          >Taxable Installment Collected (For Installment Sale Excluding Interest)</template>
          <a-input
            v-model="form.item30.installment_collected"
            placeholder="Taxable Installment Collected (For Installment Sale Excluding Interest)"
          ></a-input>
        </a-tooltip>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="30E"
        :validate-status="error_item('item30.unutilized_portion_sales')"
        :help="error_desc('item30.unutilized_portion_sales')"
      >
        <!-- <a-radio :value="'30E'">30E</a-radio> -->
        <a-tooltip>
          <template
            slot="title"
          >On the Unutilized Portion of Sales Proceeds (in case nos. 17 & 18 are applicable)</template>
          <a-input
            v-model="form.item30.unutilized_portion_sales"
            placeholder="On the Unutilized Portion of Sales Proceeds (in case nos. 17 & 18 are applicable)"
          ></a-input>
        </a-tooltip>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="30F"
        :validate-status="error_item('item30.others')"
        :help="error_desc('item30.others')"
      >
        <!-- <a-radio :value="'30F'">30F</a-radio> -->
        <a-tooltip>
          <template slot="title">Others (specify)</template>
          <a-input v-model="form.item30.others" placeholder="30F. Others (specify)"></a-input>
        </a-tooltip>
        <!-- </a-radio-group> -->
      </a-form-item>
    </a-form>

    <!-- Part II -->
    <a-form v-show="step===4">
      <a-divider>Part II: Computation of Tax</a-divider>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="31"
        :validate-status="error_item('tax_base')"
        :help="error_desc('tax_base')"
      >
        <a-tooltip>
          <template
            slot="title"
          >Taxable Base (Item 30A or 30C, whichever is higher, for cash sale, or item 30B, or item 30D, or Item 30E, or Item 30F, whichever is applicable)</template>
          <a-input
            v-model="form.tax_base"
            placeholder="Taxable Base (Item 30A or 30C, whichever is higher, for cash sale, or item 30B, or item 30D, or Item 30E, or Item 30F, whichever is applicable) "
          ></a-input>
        </a-tooltip>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="32"
        :validate-status="error_item('tax_due')"
        :help="error_desc('tax_due')"
      >
        <a-tooltip>
          <template slot="title">6% Tax Due</template>
          <a-input v-model="form.tax_due" placeholder="6% Tax Due"></a-input>
        </a-tooltip>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="33"
        :validate-status="error_item('less_tax_paid')"
        :help="error_desc('less_tax_paid')"
      >
        <a-tooltip>
          <template
            slot="title"
          >Less: Tax Paid in Return Previously Filed, if this is an Amended Return</template>
          <a-input
            v-model="form.less_tax_paid"
            placeholder="Less: Tax Paid in Return Previously Filed, if this is an Amended Return"
          ></a-input>
        </a-tooltip>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="34"
        :validate-status="error_item('tax_payable_overpayment')"
        :help="error_desc('tax_payable_overpayment')"
      >
        <a-tooltip>
          <template slot="title">Tax Payable/(Overpayment)</template>
          <a-input v-model="form.tax_payable_overpayment" placeholder="Tax Payable/(Overpayment)"></a-input>
        </a-tooltip>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="35"
        :validate-status="error_item('')"
        :help="error_desc('')"
      >
        <div style="color: black">Add: Penalties</div>
      </a-form-item>
      <a-form-item>
        <a-row :gutter="12">
          <a-col :span="24">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="35A"
              :validate-status="error_item('surcharge')"
              :help="error_desc('surcharge')"
            >
              <a-input placeholder="Surcharge" v-model="form.surcharge"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="35B"
              :validate-status="error_item('interest')"
              :help="error_desc('interest')"
            >
              <a-input placeholder="Interest" v-model="form.interest"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form-item>

      <a-form-item>
        <a-row :gutter="12">
          <a-col :span="24">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="35C"
              :validate-status="error_item('compromise')"
              :help="error_desc('compromise')"
            >
              <a-input placeholder="Compromise" v-model="form.compromise"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="35D"
            >
              <a-input disabled placeholder="Penalties"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form-item>

      <a-form-item>
        <a-row :gutter="12">
          <a-col :span="24">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="36"
            >
              <a-input
                v-model="form.total_amount_payable"
                disabled
                placeholder="Total Amount Payable/(Overpayment)(Sum of Items 34 & 35D)"
              ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form-item>

      <a-form-item>
        <a-radio-group disabled v-model="form.over_remittance" style="width: 100%">
          <span style="margin-right: 14px">If Overpayment , mark one box only:</span>
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  props: ["form", "step", "errors"],
  data() {
    return {
      loading: false,
      image_height: 1000,
      formatter: {
        amount: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      parser: {
        amount: value => value.replace(/\₱\s?|(,*)/g, "")
      },
      form_layout: {
        label_col: { span: 2 },
        wrapper_col: { span: 22 }
      }
    };
  },
  watch: {
    loading(val) {
      this.$emit("loading", val);
    },
    form: {
      deep: true,
      handler(val) {
        console.log("form :", val);
      }
    }
  },
  methods: {
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
    },
    validate() {
      this.changeStep(this.step + 1);
    },
    changeTaxRelief() {
      if (this.form.is_avail_tax_relief == false) {
        this.$emit("updateForm", {
          yes_avail_tax_relief: " "
        });
      }
    }
  }
};
</script>

<style>
</style>