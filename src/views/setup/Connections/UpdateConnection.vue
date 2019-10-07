<template>
  <a-modal :visible="show" @cancel="$emit('hide')" :footer="null" title="Update Taxpayer">
    
    <a-form>
      <a-form-item 
        label="TIN"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol">
        <b style="font-size: 3vh">{{formatTIN(taxpayer.tin)}}</b>
      </a-form-item>
      <a-form-item
        label="Relationship"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        :validate-status="validation.relationship ? 'error' : ''"
        :help="validation.relationship"
      >
        <a-select
          style="width: 100%"
          @change="taxpayer.relationship = $event"
          v-bind="taxpayer.relationship ? { defaultValue: taxpayer.relationship } : {}"
          placeholder="Relationship"
          :disabled="loading"
        >
          <a-select-option
            v-for="(item, index) in relationships"
            :key="index"
            :value="item"
          >{{item}}</a-select-option>
        </a-select>
      </a-form-item>
      <template v-if="taxpayer.new">
        <a-form-item
          label="Taxpayer Type"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          :validate-status="validation.taxpayer_type ? 'error' : ''"
          :help="validation.taxpayer_type"
        >
          <a-radio-group buttonStyle="solid" v-model="taxpayer.taxpayer_type" :disabled="loading">
            <a-radio-button value="I">Individual</a-radio-button>
            <a-radio-button value="C">Corporate</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="Email"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          :validate-status="validation.email ? 'error' : ''"
          :help="validation.email"
        >
          <a-input
            v-model="taxpayer.email"
            placeholder="Email"
            :disabled="loading"
            @keypress.enter="updateTaxpayer"
          />
        </a-form-item>
        <a-form-item
          label="First Name"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          :validate-status="validation.first_name ? 'error' : ''"
          :help="validation.first_name"
        >
          <a-input
            v-model="taxpayer.first_name"
            placeholder="First Name"
            :disabled="loading"
            @keypress.enter="updateTaxpayer"
          />
        </a-form-item>
        <a-form-item
          label="Last Name"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          :validate-status="validation.last_name ? 'error' : ''"
          :help="validation.last_name"
        >
          <a-input
            v-model="taxpayer.last_name"
            placeholder="Last Name"
            :disabled="loading"
            @keypress.enter="updateTaxpayer"
          />
        </a-form-item>
      </template>
      <span style="font-style: italic; font-size: 12px;">
        <b style="color: red">*</b> If you want to change the
        <b>TIN</b>, Click
        <b>REMOVE</b> and add again another taxpayer.
      </span>
      <a-button-group style="float: right">
        <span style="margin-right: 2vh; color: #4bacfc; text-decoration: underline; cursor: pointer;" @click="$emit('hide')">Cancel</span>
        <a-button type="primary" @click="update">Update</a-button>
      </a-button-group>
        <a-button type="danger" @click="$emit('removeConnection', details.tin)">Remove</a-button>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  props: ["show", "taxpayer"],
  data() {
    return {
      loading: false,
      formItemLayout: {
        labelCol: {
          span: 5
        },
        wrapperCol: {
          span: 19
        }
      },
      relationships: ["Employer", "Employee", "Officemate", "Siblings"],
      validation: {}
    };
  },
  created() {
    console.log('open update modal');
  },
  methods: {
    validate(validate_all) {
      this.validation = {};
      if (validate_all) {
        if (!this.taxpayer.taxpayer_type) {
          this.validation.taxpayer_type = "Taxpayer type is required.";
          return false;
        }
        if (!this.taxpayer.email) {
          this.validation.email = "Email is required.";
          return false;
        }
        if (!this.taxpayer.first_name) {
          this.validation.first_name = "First Name is required.";
          return false;
        }
        if (!this.taxpayer.last_name) {
          this.validation.last_name = "Last Name is required.";
          return false;
        }
      }
      if (!this.taxpayer.relationship) {
        this.validation.relationship = "Relationship is required.";
        return false;
      }
      return true;
    },
    update() {
      console.log("this.taxpayer :", this.taxpayer);
      this.taxpayer.name = `${this.taxpayer.tin} (${this.taxpayer.relationship})`;
      if (this.validate(this.taxpayer.new)) {
        this.$emit("update", this.taxpayer);
        this.$emit('hide');
      }
    }
  }
};
</script>

<style>
</style>