<template>
  <div>
    <a-drawer
      title="Schedule IV - Penalties"
      :visible="visible"
      :closable="false"
      @close="onClose"
      :width="700"
      :wrapStyle="{
        height: 'calc(100% - 108px)',
        overflow: 'auto',
        paddingBottom: '108px'
      }"
    >
      <a-form :form="form" layout="vertical" hideRequiredMark>
        <a-row :gutter="6">
          <a-col :span="12">
            <a-form-item style="margin-left: 103px;" label="A) Taxpayer/Filer"></a-form-item>
            <a-form-item
              :labelCol="{ span: 3 }"
              :wrapperCol="{ span: 21 }"
              label="64"
              :validate-status="error_item('taxpayer_tax_payable.surcharge')"
              :help="error_desc('taxpayer_tax_payable.surcharge')"
            >
              <a-input-number
                v-model="form.taxpayer_tax_payable.surcharge"
                style="width:100%"
                placeholder="Surcharge"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item style="margin-left: 103px;" label="B) Spouse"></a-form-item>
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input-number
                v-model="form.spouse_tax_payable.surcharge"
                style="width:100%"
                placeholder="Surcharge"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="6">
          <a-col :span="12">
            <a-form-item
              :labelCol="{ span: 3 }"
              :wrapperCol="{ span: 21 }"
              label="65"
              :validate-status="error_item('taxpayer_tax_payable.interest')"
              :help="error_desc('taxpayer_tax_payable.interest')"
            >
              <a-input-number
                v-model="form.taxpayer_tax_payable.interest"
                style="width:100%"
                placeholder="Interest"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input-number
                v-model="form.spouse_tax_payable.interest"
                placeholder="Interest"
                style="width:100%"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="6">
          <a-col :span="12">
            <a-form-item
              :labelCol="{ span: 3 }"
              :wrapperCol="{ span: 21 }"
              label="66"
              :validate-status="error_item('taxpayer_tax_payable.compromise')"
              :help="error_desc('taxpayer_tax_payable.compromise')"
            >
              <a-input-number
                v-model="form.taxpayer_tax_payable.compromise"
                style="width:100%"
                placeholder="Compromise"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input-number
                style="width:100%"
                v-model="form.spouse_tax_payable.compromise"
                placeholder="Compromise"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="6">
          <a-col :span="12">
            <a-form-item :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }" label="67">
              <a-tooltip>
                <template slot="title">
                  Total Penalties (Sum of Items 64 to 66) (To Part III, Item
                  29)
                </template>
                <a-input-number
                  disabled
                  style="width:100%"
                  :value="penalties()"
                  placeholder="Total Penalties"
                ></a-input-number>
              </a-tooltip>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-tooltip>
                <template slot="title">
                  Total Penalties (Sum of Items 64 to 66) (To Part III, Item
                  29)
                </template>
                <a-input-number
                  disabled
                  style="width:100%"
                  :value="spouse_penalties()"
                  placeholder="Total Penalties"
                ></a-input-number>
              </a-tooltip>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- <a-row :gutter="6">
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="68."
            >
              <a-input
                placeholder="Total Amount Payable/(Overpayment) (Sum of Items 63 and 67) (To Part III, Item 30)"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input
                placeholder="Total Amount Payable/(Overpayment) (Sum of Items 63 and 67) (To Part III, Item 30)"
              />
            </a-form-item>
          </a-col>
        </a-row>-->
      </a-form>
      <div
        :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right'
        }"
      >
        <!-- <a-button :style="{marginRight: '8px'}" @click="handleOk">Cancel</a-button>
        <a-button @click="handleOk" type="primary">Submit</a-button>-->
      </div>
    </a-drawer>
  </div>
</template>

<script>
export default {
  props: ["form", "show", "errors"],
  data() {
    return {
      visible: true,
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
  created() {
    console.log("####errors: " + JSON.stringify(this.errors));
    // this.visible = this.show;
  },
  watch: {
    show() {
      console.log("show watch!!: " + this.show);
      if (this.show == 4) {
        this.visible = true;
      }
      console.log("visible! : " + this.visible);
    }
  },
  methods: {
    // insert validation
    validate(is_validate_all) {
      var errors = [];
      if (is_validate_all || this.step === 3) {
        if (!this.form.taxpayer_tax_payable.surcharge) {
          error.push({
            field: "taxpayer_tax_payable.surcharge",
            error: "Please input Surcharge"
          });
        }
        if (!this.form.taxpayer_tax_payable.interest) {
          errors.push({
            page: 3,
            field: "taxpayer_tax_payable.interest",
            error: "Please input Interest amount"
          });
        }
        if (!this.form.taxpayer_tax_payable.compromise) {
          errors.push({
            page: 3,
            field: "taxpayer_tax_payable.compromise",
            error: "Please input Compromise amount"
          });
        }
      }

      this.$emit("error", errors);
      if (!errors.length) {
        this.changeStep(this.step + 1);
      }
    },

    error_item(item) {
      console.log("##erroritem :", item);
      return this.errors.find(x => x.field === item) ? "error" : "";
    },
    error_desc(item) {
      var err = this.errors.find(x => x.field === item);
      console.log("err :", err);
      if (err && err.required_value && err.field) {
        if (err.field === "taxpayer_tax_payable.surcharge")
          this.form.taxpayer_tax_payable.surcharge = parseFloat(
            err.required_value
          );
        if (err.field === "taxpayer_tax_payable.interest")
          this.form.taxpayer_tax_payable.interest = parseFloat(
            err.required_value
          );
        if (err.field === "taxpayer_tax_payable.compromise")
          this.form.taxpayer_tax_payable.compromise = parseFloat(
            err.required_value
          );
      }
      return err ? err.error : "";
      // console.log("##errorDesc :", item);
      // return this.errors.find(x => x.field === item)
      //   ? this.errors.find(x => x.field === item).error
      //   : "";
    },
    onClose() {
      // this.visible = false;
      this.$emit("close");
    },
    penalties() {
      var total = this.computeSum([
        this.form.taxpayer_tax_payable.surcharge,
        this.form.taxpayer_tax_payable.interest,
        this.form.taxpayer_tax_payable.compromise
      ]);
      this.form.taxpayer_tax_payable.penalties = total;
      this.form.taxpayer_total_penalties = total;
      return total;
    },
    spouse_penalties() {
      var total = this.computeSum([
        this.form.spouse_tax_payable.surcharge,
        this.form.spouse_tax_payable.interest,
        this.form.spouse_tax_payable.compromise
      ]);
      this.form.spouse_tax_payable.penalties = total;
      this.form.spouse_total_penalties = total;
      return total;
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      // this.show = 0;
      this.visible = false;
    }
  }
};
</script>
