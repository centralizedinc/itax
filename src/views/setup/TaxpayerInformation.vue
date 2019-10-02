<template>
  <a-form>
    <a-form-item
      label="TIN"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input v-model="details.taxpayer.tin" placeholder="TIN" />
    </a-form-item>
    <a-form-item
      label="RDO"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input v-model="details.taxpayer.rdo_code" placeholder="RDO" />
    </a-form-item>
    <a-form-item
      label="Address"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-textarea :rows="4" placeholder="Address" v-model="details.taxpayer.address"></a-textarea>
    </a-form-item>
    <a-form-item
      label="Birth Date"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-date-picker
        style="width:100%"
        placeholder="Enter your Birthdate"
        v-model="details.taxpayer.individual_details.birthDate"
      ></a-date-picker>
    </a-form-item>
    <a-form-item
      label="Gender"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-radio-group buttonStyle="solid" v-model="details.taxpayer.individual_details.gender">
        <a-radio-button value="M">Male</a-radio-button>
        <a-radio-button value="F">Female</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="Civil Status"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-radio-group buttonStyle="solid" v-model="details.taxpayer.individual_details.civil_status">
        <a-radio-button value="S">Single</a-radio-button>
        <a-radio-button value="M">Married</a-radio-button>
        <a-radio-button value="SP">Separated</a-radio-button>
        <a-radio-button value="W">Widower</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      v-if="details.taxpayer.taxpayer_type === 0 && details.taxpayer.individual_details.civil_status === 'M'"
      label="Spouse TIN"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input placeholder="Spouse TIN" v-model="details.taxpayer.individual_details.spouse_tin"></a-input>
    </a-form-item>
    <a-button-group style="float: right">
      <a-button @click="$emit('previous', 0)" :disabled="loading">Previous</a-button>
      <a-button type="primary" @click="$emit('submitTaxpayer')" :loading="loading">Submit</a-button>
    </a-button-group>
  </a-form>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      default: () => {
        return { taxpayer: { individual_details: {} } };
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formItemLayout: {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 18
        }
      }
    };
  }
};
</script>

<style>
</style>