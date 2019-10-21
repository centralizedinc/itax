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
      <a-form-item :labelCol="{ span: 12 }" :wrapperCol="{ span: 12 }" label="2. Ammended Return">
        <a-radio-group v-model="form.amended_yn" :defaultValue="false" style="width: 100%">
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
        :validate-status="error_item('atc_code')"
        :help="error_desc('atc_code')"
      >
        <a-select v-model="form.atc_code" @change="changeATC">
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
        :validate-status="error_item('taxpayer.tin')"
        :help="error_desc('taxpayer.tin')"
      >
        <a-input placeholder="TIN" v-model="form.taxpayer.tin"></a-input>
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

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="7"
        :validate-status="error_item('taxpayer.contact_details.telno')"
        :help="error_desc('taxpayer.contact_details.telno')"
      >
        <a-input placeholder="Telephone Number" v-model="form.taxpayer.contact_details.telno"></a-input>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="8"
        :validate-status="error_item('taxpayer.registered_name')"
        :help="error_desc('taxpayer.registered_name')"
      >
        <a-input placeholder="Taxpayer/Registered Name" v-model="form.taxpayer.registered_name"></a-input>
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
        <a-form-item
          :validate-status="error_item('natureOfTransaction')"
          :help="error_desc('natureOfTransaction')"
        >
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

      <a-form-item v-if="form.propertySold=='real_property'">
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
        <a-form-item
          :validate-status="error_item('realPropertyClass')"
          :help="error_desc('realPropertyClass')"
        >
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
      <a-form-item v-else-if="form.propertySold=='shares_stock'">
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
              <a-input disabled placeholder="Tax Rate " v-model="form.taxRate"></a-input>
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
              <a-input disabled :value="getPrevTaxDue()" placeholder="Tax Due"></a-input>
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
                v-model="form.prev_tax_paid"
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
              <a-input disabled :value="getTaxDue()" placeholder="Tax Still Due/(Overpayment)"></a-input>
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
              :validate-status="error_item('surcharge')"
              :help="error_desc('surcharge')"
            >
              <a-input-number placeholder="Surcharge" v-model="form.surcharge"></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="19B"
              :validate-status="error_item('interest')"
              :help="error_desc('interest')"
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
              :validate-status="error_item('compromise')"
              :help="error_desc('compromise')"
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
  props: ["form", "step", "errors"],
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
      }
    };
  },
  // created() {
  //   this.$emit("updateForm", {
  //     locationOfRealProp: "",
  //     rdoRealProp: "",
  //     realPropertyClass: "",
  //     others: "",
  //     areaOfProperty: "",
  //     tctNo: "",
  //     taxDecNo: "",
  //     sellingPrice: 0,
  //     fairMarketValue: 0,
  //     stockname: "",
  //     stockTin: "",
  //     sharesSold: "",
  //     stockCertNo: "",
  //     parValueShares: 0,
  //     dstPaid: 0,
  //     schedule1: {
  //       commissionerLand: 0,
  //       commissionerImprovement: 0,
  //       commissionerTotal: 0,
  //       provincialLand: 0,
  //       provincialImprovement: 0,
  //       provincialTotal: 0,
  //       sum1A2B: 0,
  //       sum1B2A: 0
  //     }
  //   });
  // },
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
    getTotalAmountPayable() {
      var total = this.computeSum([this.form.penalties, this.form.tax_due]);
      this.form.total_amount_payable = total;
    },
    getPenalties() {
      var total = this.computeSum([
        this.form.surcharge,
        this.form.interest,
        this.form.compromise
      ]);
      this.form.penalties = total;

      return total;
    },
    getPrevTaxDue() {
      var total = 0;
      if (this.form.atc_code === "DS102") {
        total =
          ((this.form.realPropertyTaxBase ||
            this.form.sharesStockTaxBase ||
            0) /
            200) *
          1.5;
      } else if (this.form.atc_code === "DS125") {
        total =
          (this.form.realPropertyTaxBase || this.form.sharesStockTaxBase || 0) /
          2;
      } else if (this.form.atc_code === "DS122") {
        total =
          ((this.form.realPropertyTaxBase ||
            this.form.sharesStockTaxBase ||
            0) /
            1000) *
          15;
      }
      this.form.prev_tax_due = total;
    },
    getTaxDue() {
      var total = this.form.prev_tax_due;
      if (!this.form.prev_tax_paid) {
        total = this.form.prev_tax_due - this.form.prev_tax_paid;
      }
      this.form.tax_due = total;

      return total;
    },
    // item 13
    getRealPropertyTaxBase() {
      var max_value = Math.max(
        this.form.sellingPrice || 0,
        this.form.fairMarketValue || 0
      );
      this.form.realPropertyTaxBase = max_value;
      return max_value;
    },
    // item 14
    getsharesStockTaxBase() {
      var max_value = Math.max(
        this.form.parValueShares || 0,
        this.form.dstPaid || 0
      );
      this.form.sharesStockTaxBase = max_value;
      return max_value;
    },
    changeNatureOfTrans() {
      if (
        this.form.natureOfTransaction === "real_property_ordinary" ||
        this.form.natureOfTransaction === "real_property_capital"
      ) {
        this.form.propertySold = "real_property";
        // Clear shares stock fields
        this.$emit("updateForm", {
          stockname: "",
          stockTin: "",
          sharesSold: "",
          stockCertNo: "",
          parValueShares: 0,
          dstPaid: 0
        });
      } else if (this.form.natureOfTransaction === "shares_stock") {
        this.form.propertySold = "shares_stock";
        // Clear real property fields
        this.$emit("updateForm", {
          locationOfRealProp: "",
          rdoRealProp: "",
          realPropertyClass: "",
          others: "",
          areaOfProperty: "",
          tctNo: "",
          taxDecNo: "",
          sellingPrice: 0,
          fairMarketValue: 0,
          schedule1: {
            commissionerLand: 0,
            commissionerImprovement: 0,
            commissionerTotal: 0,
            provincialLand: 0,
            provincialImprovement: 0,
            provincialTotal: 0,
            sum1A2B: 0,
            sum1B2A: 0
          }
        });
      }
    },
    changeATC(e) {
      if (this.form.atc_code === "DS102") {
        this.form.taxRate = "P1.5/200";
      } else if (this.form.atc_code === "DS125") {
        this.form.taxRate = "0.5";
      } else if (this.form.atc_code === "DS122") {
        this.form.taxRate = "P15/1000";
      }
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