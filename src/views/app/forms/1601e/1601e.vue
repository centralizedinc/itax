<template>
  <div>
   <a-row>
      <a-col :span="12">
        <img :src="form_1601e_image" style="width: 100%;"/>
      </a-col>
      <a-col :span="12">
       <a-card style="background: #f0f2f5;">
        <a-form :form="form">
        <a-divider orientation="left" style="font-weight: bold;">Part I (Background Information)</a-divider>
    <a-form-item
      label="1. For the Month (MM/YYYY)"
    >
      <!-- <a-input
        v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your name' }]}
        ]"
        placeholder="Please input your name"
      /> --><a-month-picker @change="onChange" placeholder="For the Month(MM/YYYY)" v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input For the Month(MM/YYYY)' }]}
        ]" />
    </a-form-item>
    <a-form-item
      label="2. Amended Return?"
    >
      <!-- <a-input
        v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your name' }]}
        ]"
        placeholder="Please input your name"
      /> -->
      <a-radio-group @change="onChange" v-model="value" v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your Amended Return' }]}
        ]">
        <a-radio :value="1">Yes</a-radio>
        <a-radio :value="2">No</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="3. No. of Sheets Attached"
    >
      <a-input
        v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input No. of Sheets Attached' }]}
        ]"
        placeholder="Please input No. of Sheets Attached"
      />
    </a-form-item>
    <a-form-item
      label="4. Any Taxes Witheld?"
    >
      <!-- <a-input
        v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your name' }]}
        ]"
        placeholder="Please input your name"
      /> -->
      <a-radio-group @change="onChange" v-model="value1" v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your Any Taxes Witheld' }]}
        ]">
        <a-radio :value="1">Yes</a-radio>
        <a-radio :value="2">No</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="5. TIN NUMBER"
    >
      <a-input
        v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your TIN Number' }]}
        ]"
        placeholder="Please input your TIN Number"
      />
    </a-form-item>
    <a-form-item
      label="6. RDO CODE"
    >
      <a-input
        v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your RDO CODE' }]}
        ]"
        placeholder="Please input your RDO CODE"
      />
    </a-form-item>
    <a-form-item
      label="7. Line of Business/Occupation"
    >
      <a-input
        v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your Line of Business/Occupation' }]}
        ]"
        placeholder="Please input your Line of Business/Occupation"
      />
    </a-form-item>
    <a-form-item
      label="8. Withholding Agent's Name"
    >
      <a-input
        v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your Last name,First name,Middle name for individuals' }]}
        ]"
        placeholder="Last name,First name,Middle name for individuals"
      />
    </a-form-item>
    <a-form-item
      label="9. Telephone Number"
    >
      <a-input
        v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your Telephone Number' }]}
        ]"
        placeholder="Please input your Telephone Number"
      />
    </a-form-item>
    <a-form-item
      label="10. Resgistered Address"
    >
      <a-input
        placeholder="Please input your Resgistered Address"
        v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your Resgistered Address' }]}
        ]"
      />
    </a-form-item>
    <a-form-item
      label="11. Zip Code"
    >
      <a-input
        placeholder="Please input your Zip Code"
        v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your Zip Code' }]}
        ]"
      />
    </a-form-item>
    <a-form-item
      label="12. Category of Withholding Agent"
    >
      <!-- <a-input
        placeholder="Please input your Zip Code"
        v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your Zip Code' }]}
        ]"
      /> -->
       <a-radio-group @change="onChange" v-model="category" v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your Category of Withholding Agent' }]}
        ]">
        <a-radio :value="1">Private</a-radio>
        <a-radio :value="2">Government</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="13. Are there payees availing of tax relief under special law or international tax treaty?"
    >
    <a-radio-group @change="onChange" v-model="category">
        <a-radio :value="1">Yes</a-radio>
        <a-radio :value="2">No</a-radio>
      </a-radio-group>
      <a-input
        placeholder="If yes, specify"
        v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your payees availing of tax relief under special law' }]}
        ]"
      />
    </a-form-item>
    <a-divider orientation="left" style="font-weight: bold;">Part II (Computation of Tax)</a-divider>
    <a-form-item
      label="14. Total Tax Required to be Withheld and Remitted"
    >
      <a-input
        v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your Total Tax Required to be Withheld and Remitted' }]}
        ]"
        placeholder="Please input your Total Tax Required to be Withheld and Remitted"
      />
    </a-form-item>
    <span style="font-weight: 600;">
        15. Less: Tax Credits/Payments
      </span>
    <a-form-item
      label="15A. Tax Remitted in Return Previously Filed, if this is an Amended Return"
    >
      <a-input
        v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your Tax Remitted in Return Previously Filed, if this is an Amended Return' }]}
        ]"
        placeholder="Please input your Tax Remitted in Return Previously Filed, if this is an Amended Return"
      />
    </a-form-item>
    <a-form-item
      label="15B. Advance Payments Made(please attach proof of payments - BIR Form No. 0605)"
    >
      <a-input
        v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your Advance Payments Made(please attach proof of payments - BIR Form No. 0605)' }]}
        ]"
        placeholder="Please input your Advance Payments Made(please attach proof of payments - BIR Form No. 0605)"
      />
    </a-form-item>
    <!-- <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="Nickname"
    >
      <a-input
        v-decorator="[
          'nickname',
          {rules: [{ required: checkNick, message: 'Please input your nickname' }]}
        ]"
        placeholder="Please input your nickname"
      />
    </a-form-item> -->
    <!-- <a-form-item
      :label-col="formTailLayout.labelCol"
      :wrapper-col="formTailLayout.wrapperCol"
    >
      <a-checkbox
        :checked="checkNick"
        @change="handleChange"
      >
        Nickname is required
      </a-checkbox>
    </a-form-item> -->
    <a-form-item
    >
      <a-button
        type="primary"
        @click="check"
      >
        Submit
      </a-button>
    </a-form-item>
  </a-form>
    </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};
import form_1601e_image from '@/assets/forms/1601e.jpg'

export default {
  data () {
    return {
        form_1601e_image,
      value: 1,
      value1: 2,
      category: 1,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this),
    };
  },
  methods: {
    check  () {
      this.form.validateFields(
        (err) => {
          if (!err) {
            console.info('success');
          }
        },
      );
    },
    handleChange  (e) {
      this.checkNick = e.target.checked;
      this.$nextTick(() => {
        this.form.validateFields(['nickname'], { force: true });
      });
    },
    onChange(date, dateString) {
      console.log(date, dateString);
    }
  },
};
</script>

<style>
</style>