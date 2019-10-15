<template>
  <div>
    <a-form v-show="step===0">
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="1"
      >
        <a-date-picker
          placeholder="Date of Transaction Purchase (MM/DD/YYYY)"
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
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="4"
      >
        <a-input-number placeholder="ATC" v-model="form.atc" style="width: 100%" />
      </a-form-item>
    </a-form>

    <!-- Part 1 -->
    <a-form v-show="step===1">
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="5"
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
          <a-radio-group v-model="form.natureOfTransaction">
            <a-radio :value="'CA'">Transfer of Real Property classified as capital asset</a-radio>
            <br />
            <a-radio :value="'OA'">Transfer of Real Property classified as ordinary asset</a-radio>
            <br />
            <a-radio :value="'NT'">
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
            <a-radio :value="'PropDesc_RP'" @change="sel_property_desc">Real Property</a-radio>
            <a-radio :value="'PropDesc_SS'">Shares of Stocks not Traded in the Local Stock Exchange</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form-item>

      <a-form-item v-show="form.propertySold=='PropDesc_RP'">
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
              <a-col :span="24">
                <a-form-item
                  :labelCol="form_layout.label_col"
                  :wrapperCol="form_layout.wrapper_col"
                  label="12F"
                >
                  <a-input
                    v-model="form.fairMarketValue"
                    placeholder="Fair Market Value of Property Sold (Schedule 1)."
                  ></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form-item>
        </a-form-item>
      </a-form-item>

      <br />

      <a-form-item v-show="form.propertySold=='PropDesc_SS'">
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
                placeholder="Taxable Base - Real Property (Item 12E or 12F, whichever is applicable)"
                v-model="form.realPropertyTaxBase"
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
                placeholder="Taxable Base - Shares of Stock ( Item 12K or 12L, whichever is applicable)"
                v-model="form.sharesStockTaxBase"
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
              <a-input placeholder="Tax Rate " v-model="form.taxRate"></a-input>
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
              <a-input placeholder="Tax Due " v-model="form.prev_tax_due"></a-input>
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
              <a-input placeholder="Tax Still Due/(Overpayment)" v-model="form.tax_due"></a-input>
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
              <a-input placeholder="Surcharge" v-model="form.surcharge"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="19B"
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
              label="19C"
            >
              <a-input placeholder="Compromise" v-model="form.compromise"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="19D"
            >
              <a-input placeholder="Penalties" v-model="form.penalties"></a-input>
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
                placeholder="Total Amount Payable/(overpayment)(Sum of Items 18 and 19D) "
                v-model="form.totalAmountPayable"
              ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  props: ["form", "step"],
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
        console.log("2000OT form: " + this.form.returnPeriod);
        // this.form.year = this.formatDtYear(this.form.returnPeriod);
        // this.form.month = this.formatDtMonth(this.form.returnPeriod);
        // this.form.returnPeriodYear = this.formatDtYear(this.form.returnPeriod);
        // this.form.returnPeriodDay = this.formatDate(this.form.returnPeriod, {
        //   day: "2-digit"
        // });
        console.log("this.form.returnPeriodDay :", this.form.returnPeriodDay);
        // this.form.returnPeriodMonth = this.formatDtMonth(
        //   this.form.returnPeriod
        // );
        console.log("year: " + this.form.month);
      }
    },
    step() {}
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
    }
  }
};
</script>

<style>
</style>