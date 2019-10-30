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
          v-model="form.returnPeriod"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item :labelCol="{ span: 12 }" :wrapperCol="{ span: 12 }" label="2.  Ammended Return">
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
          placeholder="Number of Sheet/s Attached"
          v-model="form.num_of_sheet"
          style="width: 100%"
        />
      </a-form-item>
    </a-form>

    <!-- Part I -->
    <a-form v-show="step===1">
      <a-divider>Part I: Background Information</a-divider>

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
        :validate-status="error_item('taxpayer.registered_name')"
        :help="error_desc('taxpayer.registered_name')"
      >
        <a-input
          placeholder="Withholding Agent’s Name (Last Name, First Name, Middle Name for Individual OR Registered Name for Non-Individual)"
          v-model="form.taxpayer.registered_name"
        ></a-input>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="7"
        :validate-status="error_item('taxpayer.address')"
        :help="error_desc('taxpayer.address')"
      >
        <a-textarea placeholder="Registered Address" v-model="form.taxpayer.address"></a-textarea>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="7A"
        :validate-status="error_item('taxpayer.address_details.zipCode')"
        :help="error_desc('taxpayer.address_details.zipCode')"
      >
        <a-input
          placeholder="Zip Code"
          v-model="form.taxpayer.address_details.zipCode"
          style="width: 100%"
        ></a-input>
      </a-form-item>

      <a-form-item
        :labelCol="{ span: 12 }"
        :wrapperCol="{ span: 12 }"
        label="8. Category of Withholding Agent"
      >
        <a-radio-group v-model="form.category_of_agent" :defaultValue="false" style="width: 100%">
          <a-radio :value="true">Private</a-radio>
          <a-radio :value="false">Government</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        :labelCol="{ span: 12 }"
        :wrapperCol="{ span: 12 }"
        label="8A. If private, top withholding agent?"
      >
        <a-radio-group
          v-model="form.top_withholding_agent"
          :defaultValue="false"
          style="width: 100%"
        >
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="9"
        :validate-status="error_item('taxpayer.contact_details.telno')"
        :help="error_desc('taxpayer.contact_details.telno')"
      >
        <a-input placeholder="Telephone Number" v-model="form.taxpayer.contact_details.telno"></a-input>
      </a-form-item>

      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="10"
        :validate-status="error_item('taxpayer.contact_details.email')"
        :help="error_desc('taxpayer.contact_details.email')"
      >
        <a-input placeholder="Email Address" v-model="form.taxpayer.contact_details.email"></a-input>
      </a-form-item>
    </a-form>

    <!-- Part II -->
    <a-form v-show="step===2">
      <a-divider>Part II – Summary of Remittances</a-divider>
      <div style="color: black; font-weight: bold">Remittance per BIR Form No. 1601-EQ</div>

      <br />
      <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 8 }" label="Total Taxes Withheld">
        <a-input-number disabled style="width: 15vw"></a-input-number>
      </a-form-item>

      <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 8 }" label="Total Penalties">
        <a-input-number disabled style="width: 15vw"></a-input-number>
      </a-form-item>

      <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 8 }" label="Total Amount Remitted">
        <a-input-number disabled style="width: 15vw"></a-input-number>
      </a-form-item>
      <a-divider></a-divider>
      <div style="color: black; font-weight: bold">Remittance per BIR Form No. 1606</div>
      <schedule-two v-if="show_sched2" :show="show_sched2" :form="form" @close="onClose" />
      <br />
      <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 8 }" label="Total Taxes Withheld">
        <a-input-number disabled style="width: 15vw"></a-input-number>
      </a-form-item>

      <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 8 }" label="Total Penalties">
        <a-input-number disabled style="width: 15vw"></a-input-number>
      </a-form-item>

      <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 8 }" label="Total Amount Remitted">
        <a-input-number disabled style="width: 15vw"></a-input-number>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  props: ["form", "step", "errors"],
  data() {
    return {
      show_sched1: false,
      show_sched2: false,
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
    onClose(data) {
      this.form.sched1 = data.sched1;
      this.form.sched1_total_tax_withheld = this.form.sched1[4].tax_withheld;
      this.show_sched1 = false;
      this.show_sched2 = false;
    }
  }
};
</script>

<style>
.text-link {
  cursor: pointer;
  color: blue;
}

.text-link:hover {
  text-decoration: underline;
}
</style>

