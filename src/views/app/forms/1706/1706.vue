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
          <a-radio :value="0">II420 Individual</a-radio>
          <a-radio :value="1">IC420 Corporation</a-radio>
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
        :validate-status="error_item('taxpayer.tin')"
        :help="error_desc('taxpayer.tin')"
      >
        <a-input placeholder="TIN Seller" v-model="form.taxpayer.tin"></a-input>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="8"
        :validate-status="error_item('taxpayer.rdo_code')"
        :help="error_desc('taxpayer.rdo_code')"
      >
        <a-input placeholder="RDO Code" v-model="form.taxpayer.rdo_code"></a-input>
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
            :validate-status="error_item('taxpayer.registered_name')"
            :help="error_desc('taxpayer.registered_name')"
          >
            <a-input placeholder="Buyer's Name (et al)" v-model="form.taxpayer.registered_name"></a-input>
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
            :validate-status="error_item('taxpayer.address')"
            :help="error_desc('taxpayer.address')"
          >
            <a-textarea
              autosize
              placeholder="Buyer's Registered Address"
              v-model="form.taxpayer.address"
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
            :validate-status="error_item('taxpayer.address')"
            :help="error_desc('taxpayer.address')"
          >
            <a-textarea
              autosize
              placeholder="Seller's Residence Address"
              v-model="form.taxpayer.address"
            ></a-textarea>
          </a-form-item>
        </a-col>
        <!-- 14 -->
        <a-col :span="12">
          <a-form-item
            :labelCol="{span: 3}"
            :wrapperCol="{span: 21}"
            label="14"
            :validate-status="error_item('taxpayer.address')"
            :help="error_desc('taxpayer.address')"
          >
            <a-textarea autosize placeholder="Location of Property" v-model="form.taxpayer.address"></a-textarea>
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 15 -->
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        :validate-status="error_item('')"
        :help="error_desc('')"
        label="15"
      >
        <span style="margin-right: 14px">Classification of Real Property</span>
        <a-radio-group v-model="form.real_property_class">
          <a-radio :value="'R'">Residential</a-radio>
          <a-radio :value="'C'">Commercial</a-radio>
          <a-radio :value="'CR'">Condominium Residential</a-radio>
          <br />
          <a-radio :value="'A'">Agricultural</a-radio>
          <a-radio :value="'I'">Industrial</a-radio>
          <a-radio :value="'CC'">Condominium Commercial</a-radio>
          <br />
          <a-radio :value="'O'">
            Others
            <a-input
              style="width: 25vw; margin-left: 14px"
              v-model="form.others"
              placeholder="Please specify"
            ></a-input>
          </a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>

    <!-- Part 2.1 Next Page -->
    <a-form v-show="step===2">
      <a-divider>Continuation of Part I</a-divider>
      <!-- 16 -->
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="16"
        :validate-status="error_item('taxpayer.rdo_code')"
        :help="error_desc('taxpayer.rdo_code')"
      >
        <span style="margin-right: 14px">Brief Description of Property</span>
        <a-row :gutter="12">
          <a-col :span="8">
            <a-input placeholder="Area sold (sq.m.)" v-model="form.area_sold"></a-input>
          </a-col>
          <a-col :span="16">
            <a-input placeholder="Tax Declaration No." v-model="form.tax_dec"></a-input>
          </a-col>
          <a-col :span="24">
            <a-input placeholder="TCT/OCT/CCT No." v-model="form.tct_no"></a-input>
          </a-col>
          <a-col :span="24">
            <a-input placeholder="Others" v-model="form.desc_prop_others"></a-input>
          </a-col>
        </a-row>
      </a-form-item>
      <!-- 17 -->
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="17"
      >
        <a-radio-group v-model="form.principal_res_yn" :defaultValue="false" style="width: 100%">
          <span>Is the property being sold your principal residence? (For Individual sellers only)</span>
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
        <a-radio-group v-model="form.new_principal_res" :defaultValue="false" style="width: 100%">
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
        <a-radio-group v-model="form.more_than_one_prop" :defaultValue="false" style="width: 100%">
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
          v-model="form.description_transaction"
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
            v-if="form.description_transaction==='E' || form.description_transaction==='O'"
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
            <a-input placeholder="Mortgage Assumed" v-model="form.mortgage" style="width: 100%" />
          </a-form-item>
        </a-col>
        <!-- 25 -->
        <a-col :span="12">
          <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}" label="25">
            <a-tooltip>
              <template slot="title">Total Payments (Collection) During the Initial Year</template>
              <a-input
                placeholder="Total Payments (Collection) During the Initial Year"
                v-model="form.total_payments"
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
                v-model="form.amt_periodic_payment"
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
                v-model="form.no_of_installments"
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
        :validate-status="error_item('doi')"
        :help="error_desc('doi')"
      >
        <a-date-picker
          placeholder="Date of Installment (MM/DD/YYYY)"
          v-model="form.doi"
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
        label="29"
      >
        <span style="margin-right: 14px">Fair Market Value (FMV) - Valuation at the time of Contract</span>

        <a-radio-group v-model="form.fair_market_value">
          <a-radio :value="'29A'">29A</a-radio>
          <a-tooltip>
            <template slot="title">FMV of Land per latest Tax Declaration</template>
            <a-input
              style="width: 25vw; margin-left: 14px"
              v-model="form.latest_tax_dec"
              placeholder="FMV of Land per latest Tax Declaration"
            ></a-input>
          </a-tooltip>
          <br />
          <a-radio :value="'29B'">29B</a-radio>
          <a-tooltip>
            <template slot="title">FMV of Improvements per latest Tax Declaration</template>
            <a-input
              style="width: 25vw; margin-left: 14px"
              v-model="form.latest_tax_dec"
              placeholder="FMV of Improvements per latest Tax Declaration"
            ></a-input>
          </a-tooltip>
          <br />
          <a-radio :value="'29C'">29C</a-radio>
          <a-tooltip>
            <template slot="title">FMV of Land as determined by BIR Commissioner (zonal value)</template>
            <a-input
              style="width: 25vw; margin-left: 14px"
              v-model="form.latest_tax_dec"
              placeholder="FMV of Land as determined by BIR Commissioner (zonal value)"
            ></a-input>
          </a-tooltip>
          <br />
          <a-radio :value="'29D'">29D</a-radio>
          <a-tooltip>
            <template slot="title">FMV of Improvements as determined by BIR Commissioner (BIR Rules)</template>
            <a-input
              style="width: 25vw; margin-left: 14px"
              v-model="form.latest_tax_dec"
              placeholder="FMV of Improvements as determined by BIR Commissioner (BIR Rules)"
            ></a-input>
          </a-tooltip>
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