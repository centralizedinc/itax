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
        :labelCol="{ span: 12 }"
        :wrapperCol="{ span: 12 }"
        label="2. Ammended Return"
        :validate-status="error_item('return_period')"
        :help="error_desc('return_period')"
      >
        <a-radio-group v-model="form.amended_yn" :defaultValue="false" style="width: 100%">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="3"
        :validate-status="error_item('return_period')"
        :help="error_desc('return_period')"
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
        :validate-status="error_item('return_period')"
        :help="error_desc('return_period')"
      >
        <a-select v-model="form.atc">
          <a-select-option value="DS102">
            DS 102 Sales, Agreements to Sell, Memoranda of Sales, Deliveries or Transfer of
            Shares or Certificates of Stock with par value
          </a-select-option>
          <a-select-option value="DS125">DS 125 In case of stock without par value</a-select-option>
          <a-select-option value="DS122">DS 122 Deed of Sale and conveyance of real property</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>

    <!-- Part 1 -->
    <a-form v-show="step===1">
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="5"
        :validate-status="error_item('return_period')"
        :help="error_desc('return_period')"
      >
        <a-input placeholder="TIN" v-model="form.taxpayer.tin"></a-input>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="6"
      >
        <a-input placeholder="RDO Code" v-model="form.taxpayer.rdo_code"></a-input>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="7"
      >
        <a-input placeholder="Telephone Number" v-model="form.taxpayer.contact_details.tel_no"></a-input>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="8"
      >
        <a-input placeholder="Taxpayer/Registered Name" v-model="form.taxpayer.registered_name"></a-input>
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
        <a-input
          placeholder="Zip Code"
          v-model="form.taxpayer.address_details.zipCode"
          style="width: 100%"
        ></a-input>
      </a-form-item>
    </a-form>

    <!-- Part II -->
    <a-form v-show="step===2">
      <a-form-item>
        <div style="color: black">11. Nature of transaction</div>
        <a-form-item>
          <a-radio-group v-model="form.natureOfTransaction" @change="changeNatureOfTrans">
            <a-radio
              value="real_property_capital"
            >Transfer of Real Property classified as capital asset</a-radio>
            <br />
            <a-radio
              value="real_property_ordinary"
            >Transfer of Real Property classified as ordinary asset</a-radio>
            <br />
            <a-radio value="shares_stock">
              Transfer of shares of stock not traded through the local stock exchange
              <br />
              <span
                style="font-size: 10pt; font-style: italic"
              >(Does not include original issue of shares of stock by the issuing corporation)</span>
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form-item>

      <a-form-item>
        <a-row :gutter="12">
          <a-col :span="24">
            <div style="color: black">Parties to the Transaction</div>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="11B"
            >
              <a-input v-model="form.seller" placeholder="Seller/Transferor"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="11C"
            >
              <a-input v-model="form.buyer" placeholder="Buyer/Transferee"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form-item>

      <a-form-item>
        <a-row :gutter="12">
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="11D"
            >
              <a-input v-model="form.sellerTin" placeholder="Taxpayer Identification Number"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="11E"
            >
              <a-input v-model="form.buyerTin" placeholder="Taxpayer Identification Number"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form-item>
      <a-divider></a-divider>

      <a-form-item>
        <div style="color: black">12. Brief Description of Property Sold</div>
        <a-form-item>
          <a-radio-group v-model="form.propertySold">
            <a-radio disabled value="real_property">Real Property</a-radio>
            <a-radio
              disabled
              value="shares_stock"
            >Shares of Stocks not Traded in the Local Stock Exchange</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form-item>

      <a-form-item v-show="form.propertySold=='real_property'">
        <a-form-item>
          <a-row :gutter="12">
            <a-col :span="12">
              <a-form-item>
                <a-input v-model="form.locationOfRealProp" placeholder="Location of Real Property"></a-input>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item>
                <a-input v-model="form.rdoRealProp" placeholder="RDO Code of Location of Property"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form-item>
        <div style="color: black">12A. Classification of Real Property</div>
        <a-form-item>
          <a-radio-group v-model="form.realPropertyClass">
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
              <a-input v-model="form.others" placeholder="Please specify"></a-input>
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item>
          <a-form-item>
            <a-row :gutter="12">
              <a-col :span="24">
                <a-form-item
                  :labelCol="form_layout.label_col"
                  :wrapperCol="form_layout.wrapper_col"
                  label="12B"
                >
                  <a-input
                    v-model="form.areaOfProperty"
                    placeholder="Area of Property Sold (sq. m.)"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item
                  :labelCol="form_layout.label_col"
                  :wrapperCol="form_layout.wrapper_col"
                  label="12C"
                >
                  <a-input v-model="form.tctNo" placeholder="TCT/OCT/CCT No."></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item
                  :labelCol="form_layout.label_col"
                  :wrapperCol="form_layout.wrapper_col"
                  label="12D"
                >
                  <a-input v-model="form.taxDecNo" placeholder="Tax Declaration No."></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item
                  :labelCol="form_layout.label_col"
                  :wrapperCol="form_layout.wrapper_col"
                  label="12E"
                >
                  <a-input v-model="form.sellingPrice" placeholder="Selling Price"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="20">
                <a-form-item
                  :labelCol="form_layout.label_col"
                  :wrapperCol="form_layout.wrapper_col"
                  label="12F"
                >
                  <a-input
                    disabled
                    v-model="form.fairMarketValue"
                    placeholder="Fair Market Value of Property Sold (Schedule 1)."
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="4">
                <a-button type="link" @click="show_sched1=true">Schedule 1</a-button>
                <schedule-one
                  v-if="show_sched1"
                  :show="show_sched1"
                  :form="form"
                  @close="updateSchedAndClose"
                />
              </a-col>
            </a-row>
          </a-form-item>
        </a-form-item>
      </a-form-item>

      <br />

      <a-form-item v-show="form.propertySold=='shares_stock'">
        <a-row :gutter="12">
          <a-col :span="24">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="12G"
            >
              <a-input v-model="form.stockname" placeholder="Name of Corporate Stock"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :span="24">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="12H"
            >
              <a-input v-model="form.stockTin" placeholder=" Taxpayer Identification Number"></a-input>
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="12I"
            >
              <a-input v-model="form.sharesSold" placeholder="No. of Shares Sold"></a-input>
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="12J"
            >
              <a-input v-model="form.stockCertNo" placeholder=" Stock Certificate No"></a-input>
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="12K"
            >
              <a-input
                v-model="form.parValueShares"
                placeholder="Par Value of Shares  (for shares of stock with par value)"
              ></a-input>
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="12L"
            >
              <a-input
                v-model="form.dstPaid"
                placeholder="DST paid upon original issue of Shares of Stock sold (for shares of stock without par value)"
              ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>

    <!-- Part III -->
    <a-form v-show="step===3">
      <a-form-item>
        <a-row :gutter="12">
          <a-col :span="24">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="13"
            >
              <a-input
                disabled
                placeholder="Taxable Base - Real Property (Item 12E or 12F, whichever is applicable)"
                :value="getRealPropertyTaxBase()"
              ></a-input>
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
              label="14"
            >
              <a-input
                disabled
                placeholder="Taxable Base - Shares of Stock ( Item 12K or 12L, whichever is applicable)"
                :value="getsharesStockTaxBase()"
              ></a-input>
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
              label="15"
            >
              <a-input disabled placeholder="Tax Rate " :value="getTaxRate()"></a-input>
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
              label="16"
            >
              <a-input disabled :value="getTaxDue()" placeholder="Tax Due"></a-input>
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
              label="17"
            >
              <a-input
                disabled
                placeholder="Less : Tax Paid in Return previously filed, if this is an amended return"
                v-model="form.prevTaxPaid"
              ></a-input>
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
              label="18"
            >
              <a-input
                disabled
                v-model="form.prev_tax_due"
                placeholder="Tax Still Due/(Overpayment)"
              ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form-item>

      <br />

      <div style="color: black">19. Add: Penalties</div>

      <a-form-item>
        <a-row :gutter="12">
          <a-col :span="24">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="19A"
            >
              <a-input-number placeholder="Surcharge" v-model="form.surcharge"></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="19B"
            >
              <a-input-number placeholder="Interest" v-model="form.interest"></a-input-number>
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
              label="19C"
            >
              <a-input-number placeholder="Compromise" v-model="form.compromise"></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="19D"
            >
              <a-input disabled placeholder="Penalties" :value="getPenalties()"></a-input>
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
              label="20"
            >
              <a-input
                disabled
                :value="getTotalAmountPayable()"
                placeholder="Total Amount Payable/(overpayment)(Sum of Items 18 and 19D) "
              ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import ScheduleOne from "./Schedule1";

export default {
  components: {
    ScheduleOne
  },
  props: ["form", "step"],
  data() {
    return {
      loading: false,
      show_sched1: false,
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
      },
      errors: []
    };
  },
  computed: {},
  watch: {
    loading(val) {
      this.$emit("loading", val);
    },
    form: {
      deep: true,
      handler() {
        // console.log("2000OT form: " + this.form.return_period);
        // console.log("this.form.returnPeriodDay :", this.form.returnPeriodDay);
        // console.log("year: " + this.form.month);
      }
    },
    step() {}
  },
  methods: {
    getTotalAmountPayable() {
      var total = this.computeSum([
        this.form.realPropertyTaxBase,
        this.form.sharesStockTaxBase,
        this.form.tax_due
      ]);
      this.form.total_amount_payable = total;
      console.log("TOTALAMTPYBLE :", this.form.total_amount_payable);
    },
    getPenalties() {
      var total = this.computeSum([
        this.form.surcharge,
        this.form.interest,
        this.form.compromise
      ]);
      this.form.penalties = total;
      console.log("this.form.penalties :", this.form.penalties);

      return total;
    },
    getTaxDue() {
      var total = 0;
      if (this.form.atc === "DS102") {
        (this.form.realPropertyTaxBase / 200) * 1.5;
      } else if (this.form.atc === "DS125") {
        this.form.realPropertyTaxBase / 2;
      } else {
        (this.form.realPropertyTaxBase / 1000) * 15;
      }
      console.log("#####TAXBASE :", this.form.realPropertyTaxBase);
      this.form.tax_due = total;
      console.log("#####TOTAL :", total);
      return total;

      // var total = (this.form.realPropertyTaxBase / 200) * 1.5;
      // this.form.tax_due = total;
      // return total;
    },
    getRealPropertyTaxBase() {
      var a = this.form.sellingPrice;
      var b = this.form.fairMarketValue;
      console.log("a value: " + a);
      console.log("b value: " + b);
      if (
        this.form.fairMarketValue == null ||
        this.form.fairMarketValue == undefined
      ) {
        this.form.fairMarketValue = 0;
      }
      if (
        this.form.sellingPrice == null ||
        this.form.sellingPrice == undefined
      ) {
        this.form.sellingPrice = 0;
      }
      console.log("this.form.sellingPrice value: " + this.form.sellingPrice);
      console.log(
        "this.form.fairMarketValue  value: " + this.form.fairMarketValue
      );
      var total = Math.max(this.form.sellingPrice, this.form.fairMarketValue);
      console.log("total :", total);
      this.form.realPropertyTaxBase = total;
      console.log("fair market value: " + this.form.fairMarketValue);
      return total;
    },
    getsharesStockTaxBase() {
      var a = this.form.parValueShares;
      var b = this.form.dstPaid;

      if (
        this.form.parValueShares == null ||
        this.form.parValueShares == undefined
      ) {
        this.form.parValueShares = 0;
      }
      if (this.form.parValueShares == null || this.form.dstPaid == undefined) {
        this.form.dstPaid = 0;
      }
      console.log(
        "this.form.parValueShares value: " + this.form.parValueShares
      );
      console.log(
        "this.form.parValueShares  value: " + this.form.parValueShares
      );
      var total = Math.max(this.form.parValueShares, this.form.dstPaid);
      this.form.sharesStockTaxBase = total;
      return total;
    },
    changeNatureOfTrans() {
      if (
        this.form.natureOfTransaction === "real_property_ordinary" ||
        this.form.natureOfTransaction === "real_property_capital"
      ) {
        this.form.propertySold = "real_property";
      } else if (this.form.natureOfTransaction === "shares_stock") {
        this.form.propertySold = "shares_stock";
      }
      console.log("this.form.propertySold :", this.form.propertySold);
    },
    getTaxRate() {
      var total = 0;
      if (this.form.atc === "DS102") {
        total = "P1.5/200";
      } else if (this.form.atc === "DS125") {
        total = "0.5";
      } else {
        total = "P15/1000";
      }
      console.log("####VALUE :", total);
      console.log("form.atc :", this.form.atc);
      this.form.taxRate = total;
      // this.$emit("updateForm", null);
      return total;
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
    },
    validate() {
      this.changeStep(this.step + 1);
    },
    updateSchedAndClose() {
      this.show_sched1 = false;
    }
  }
};
</script>

<style>
</style>