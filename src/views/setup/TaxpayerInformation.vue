<template>
  <div>
    <a-row type="flex" align="middle" :gutter="5">
      <a-col :xs="{ span: 24 }" :md="{ span: 10  }">
        <a-form-item
          label="TIN"
          :label-col="{ span: 9 }"
          :wrapper-col="{ span: 15 }"
          :validate-status="error_desc('tin') ? 'error' : tin_validate_status"
          :help="error_desc('tin')"
        >
          <!-- has-feedback
          :validate-status="error_desc('tin') ? 'error' : tin_validate_status"
          :help="error_desc('tin')"-->
          <a-input
            v-model="details.taxpayer.tin"
            placeholder="TIN"
            maxlength="13"
            :disabled="this.user.tin"
            @blur="checkTin"
          />
        </a-form-item>
      </a-col>
      <a-col :xs="{ span: 24 }" :md="{ span: 5 }">
        <a-form-item
          label="RDO"
          :label-col="{ span: 9 }"
          :wrapper-col="{ span: 15 }"
          :validate-status="error_desc('rdo_code') ? 'error' : ''"
          :help="error_desc('rdo_code')"
        >
          <a-select style="width: 100%" v-model="details.taxpayer.rdo_code">
            <a-select-option
              v-for="(item, index) in rdos"
              :key="index"
              :value="item.code"
            >{{item.code}} - {{item.description}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :xs="{ span: 24 }" :md="{ span: 9 }">
        <a-form-item
          label="Line of Business"
          :label-col="{ span: 9 }"
          :wrapper-col="{ span: 15 }"
          :validate-status="error_desc('line_of_business') ? 'error' : ''"
          :help="error_desc('line_of_business')"
        >
          <a-input v-model="details.taxpayer.line_of_business" placeholder="Line of Business" />
        </a-form-item>
      </a-col>
    </a-row>

    <a-row type="flex" align="middle">
      <a-col :span="24" style="margin-left: -0.6vw">
        <a-form-item
          label="Filer Type"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          :validate-status="error_desc('filer_type') ? 'error' : ''"
          :help="error_desc('filer_type')"
        >
          <a-radio-group buttonStyle="solid" v-model="details.taxpayer.filer_type">
            <a-radio-button value="sp">Single Proprietor</a-radio-button>
            <a-radio-button value="p">Professional</a-radio-button>
            <a-radio-button value="em">Employee</a-radio-button>
            <a-radio-button value="e">Estate</a-radio-button>
            <a-radio-button value="t">Trust</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row type="flex" align="middle">
      <a-col :span="24" style="margin-left: -0.6vw">
        <a-form-item
          label="Taxpayer's Name"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          :validate-status="error_desc('full_name') ? 'error' : ''"
          :help="error_desc('full_name')"
        >
          <a-row :gutter="5">
            <a-col :span="8">
              <a-input
                v-model="details.taxpayer.individual_details.firstName"
                placeholder="First Name"
              />
            </a-col>
            <a-col :span="8">
              <a-input
                v-model="details.taxpayer.individual_details.middleName"
                placeholder="Middle Name"
              />
            </a-col>
            <a-col :span="8">
              <a-input
                v-model="details.taxpayer.individual_details.lastName"
                placeholder="Last Name"
              />
            </a-col>
          </a-row>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row type="flex" align="middle">
      <a-col :span="24" style="margin-left: -0.6vw">
        <a-form-item
          label="Registered Name"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          :validate-status="error_desc('registered_name') ? 'error' : ''"
          :help="error_desc('registered_name')"
        >
          <a-input v-model="details.taxpayer.registered_name" placeholder="Registered Name" />
        </a-form-item>
      </a-col>
    </a-row>

    <a-row type="flex" align="middle" :gutter="5">
      <a-col :xs="{ span: 24 }" :md="{ span: 10  }">
        <a-form-item
          label="Date of Birth"
          :label-col="{ span: 9 }"
          :wrapper-col="{ span: 15 }"
          :validate-status="error_desc('birthDate') ? 'error' : ''"
          :help="error_desc('birthDate')"
        >
          <a-date-picker
            style="width:100%"
            placeholder="Date of Birth"
            v-model="details.taxpayer.individual_details.birthDate"
            :disabledDate="disabledDate"
          />
        </a-form-item>
      </a-col>
      <a-col :xs="{ span: 24 }" :md="{ span: 7 }">
        <a-form-item
          label="Gender"
          :label-col="{ span: 9 }"
          :wrapper-col="{ span: 15 }"
          :validate-status="error_desc('gender') ? 'error' : ''"
          :help="error_desc('gender')"
        >
          <a-radio-group buttonStyle="solid" v-model="details.taxpayer.individual_details.gender">
            <a-radio-button value="M">Male</a-radio-button>
            <a-radio-button value="F">Female</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :xs="{ span: 24 }" :md="{ span: 7 }">
        <a-form-item
          label="Citizenship"
          :label-col="{ span: 9 }"
          :wrapper-col="{ span: 15 }"
          :validate-status="error_desc('citizenship') ? 'error' : ''"
          :help="error_desc('citizenship')"
        >
          <a-input
            v-model="details.taxpayer.individual_details.citizenship"
            placeholder="Citizenship"
          />
        </a-form-item>
      </a-col>
    </a-row>

    <a-row type="flex" align="middle" :gutter="5">
      <a-col :xs="{ span: 24 }" :md="{ span: 10 }">
        <a-form-item
          label="Email"
          :label-col="{ span: 9 }"
          :wrapper-col="{ span: 15 }"
          :validate-status="error_desc('email') ? 'error' : ''"
          :help="error_desc('email')"
        >
          <a-input v-model="details.taxpayer.contact_details.email" placeholder="Email" />
        </a-form-item>
      </a-col>
      <a-col :xs="{ span: 24 }" :md="{ span: 7 }">
        <a-form-item
          label="Tel No"
          :label-col="{ span: 9 }"
          :wrapper-col="{ span: 15 }"
          :validate-status="error_desc('telno') ? 'error' : ''"
          :help="error_desc('telno')"
        >
          <a-input v-model="details.taxpayer.contact_details.telno" placeholder="Tel No" />
        </a-form-item>
      </a-col>
      <a-col :xs="{ span: 24 }" :md="{ span: 7 }">
        <a-form-item
          label="Contact No"
          :label-col="{ span: 9 }"
          :wrapper-col="{ span: 15 }"
          :validate-status="error_desc('mobile') ? 'error' : ''"
          :help="error_desc('mobile')"
        >
          <a-input v-model="details.taxpayer.contact_details.mobile" placeholder="Contact No" />
        </a-form-item>
      </a-col>
    </a-row>

    <a-row type="flex" align="middle">
      <a-col :span="24" style="margin-left: -0.6vw">
        <a-form-item
          label="Registered Address"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          :validate-status="error_desc('registered_address') ? 'error' : ''"
          :help="error_desc('registered_address')"
        >
          <a-textarea :rows="3" placeholder="Registered Address" v-model="details.taxpayer.address"></a-textarea>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row type="flex" align="middle" :gutter="5" class="row-fields">
      <a-col :xs="{ span: 24 }" :md="{ span: 15 }">
        <a-form-item
          label="Civil Status"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          :validate-status="error_desc('civil_status') ? 'error' : ''"
          :help="error_desc('civil_status')"
        >
          <a-radio-group
            buttonStyle="solid"
            v-model="details.taxpayer.individual_details.civil_status"
          >
            <a-radio-button value="S">Single</a-radio-button>
            <a-radio-button value="M">Married</a-radio-button>
            <a-radio-button value="SP">Separated</a-radio-button>
            <a-radio-button value="W">Widower</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :xs="{ span: 24 }" :md="{ span: 9 }">
        <a-form-item
          label="Zip Code"
          :label-col="{ span: 14 }"
          :wrapper-col="{ span: 10 }"
          :validate-status="error_desc('zipCode') ? 'error' : ''"
          :help="error_desc('zipCode')"
        >
          <a-input
            maxlength="4"
            v-model="details.taxpayer.address_details.zipCode"
            placeholder="Zip Code"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-button-group style="float: right">
      <a-button @click="$emit('previous', 0)" :disabled="loading">Previous</a-button>
      <a-button type="primary" @click="validation" :loading="loading">Next</a-button>
    </a-button-group>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    details: {
      type: Object,
      default: () => {
        return {
          taxpayer: {
            individual_details: {},
            contact_details: {},
            address_details: {}
          }
        };
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  
  computed: {
    user() {
      return this.deepCopy(this.$store.state.account_session.user);
    },
    rdos() {
      return this.$store.state.tax_form.rdos;
    },
    registered_name() {
      return `${this.details.taxpayer.individual_details.firstName} ${this.details.taxpayer.individual_details.middleName} ${this.details.taxpayer.individual_details.lastName}`;
    },
    show_spouse() {
      return this.details.taxpayer.individual_details.civil_status === "M";
    },
    show_company() {
      return ["sp", "p", "em"].includes(this.details.taxpayer.filer_type);
    }
  },
  watch: {
    registered_name(val) {
      console.log("watch registered name: " + val)
      this.details.taxpayer.registered_name = val;
    }
  },
  data() {
    return {
      formItemLayout: {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 20
        }
      },
      invalid_tin_msg: "",
      tin_validate_status: "",
      error_messages: [],
      moment
    };
  },
  methods: {
    disabledDate(current) {
      var date = new Date();
      date.setFullYear(date.getFullYear() - 18);
      return new Date(current).getTime() >= date.getTime();
    },
    async checkTin() {
      this.tin_validate_status = "validating";

      // to avoid redundancy of error in tin
      const tin_index = this.error_messages.findIndex(v => v.field === "tin");
      if (tin_index > -1) this.error_messages.splice(tin_index, 1); // to clear tin error message

      // check tin
      if (this.details.taxpayer.tin.length !== 13) {
        if (!this.details.taxpayer.tin) {
          this.error_messages.push({
            field: "tin",
            message: "TIN is a required field"
          });
        } else {
          this.error_messages.push({
            field: "tin",
            message: "TIN length must be 13"
          });
        }
        this.tin_validate_status = "error";
      } else if (this.details.taxpayer.tin !== this.user.tin) {
        // wait the result before to proceed
        const result = await this.$store.dispatch("GET_TAXPAYER_BY_TIN", {
          tin: this.details.taxpayer.tin,
          ignore_user: true
        });
        console.log("result :", result);
        if (result && result.taxpayer) {
          this.error_messages.push({
            field: "tin",
            message:
              "TIN has already registered. If this is your tin, kindly contact us."
          });
          this.tin_validate_status = "error";
        } else {
          this.tin_validate_status = "success";
        }
      }
    },
    async validation() {
      console.log("this.tin_validate_status :", this.tin_validate_status);
      this.validate();
      await this.checkTin();
      console.log("this.error_messages :", this.error_messages);
      if (!this.error_messages || !this.error_messages.length) {
        this.next();
      }
    },
    next() {
      var page = this.show_spouse ? 2 : this.show_company ? 3 : 4;
      this.$emit("next", page);
    },
    validate() {
      this.error_messages = [];
      if (!this.details.taxpayer.rdo_code) {
        this.error_messages.push({
          field: "rdo_code",
          message: "RDO is a required field"
        });
      }
      if (!this.details.taxpayer.line_of_business) {
        this.error_messages.push({
          field: "line_of_business",
          message: "Line of Business is a required field"
        });
      }
      if (!this.details.taxpayer.filer_type) {
        this.error_messages.push({
          field: "filer_type",
          message: "Choose a filer type"
        });
      }
      if (
        !this.details.taxpayer.individual_details.firstName ||
        !this.details.taxpayer.individual_details.lastName
      ) {
        this.error_messages.push({
          field: "full_name",
          message: "First name and Last name is a required fields"
        });
      }
      if (!this.details.taxpayer.registered_name) {
        this.error_messages.push({
          field: "registered_name",
          message: "Registered name is a required field"
        });
      }
      if (!this.details.taxpayer.individual_details.birthDate) {
        this.error_messages.push({
          field: "birthDate",
          message: "Date of Birth is a required field"
        });
      }
      if (!this.details.taxpayer.individual_details.gender) {
        this.error_messages.push({
          field: "gender",
          message: "Choose gender"
        });
      }
      if (!this.details.taxpayer.individual_details.citizenship) {
        this.error_messages.push({
          field: "citizenship",
          message: "Citizenship is a required field"
        });
      }
      if (!this.details.taxpayer.contact_details.email) {
        this.error_messages.push({
          field: "email",
          message: "Email is a required field"
        });
      }
      if (!this.details.taxpayer.contact_details.telno) {
        this.error_messages.push({
          field: "telno",
          message: "Tel no is a required field"
        });
      }
      if (!this.details.taxpayer.address) {
        this.error_messages.push({
          field: "registered_address",
          message: "Registered Address is a required field"
        });
      }
      if (!this.details.taxpayer.individual_details.civil_status) {
        this.error_messages.push({
          field: "civil_status",
          message: "Civil Status is a required field"
        });
      }
      if (!this.details.taxpayer.address_details.zipCode) {
        this.error_messages.push({
          field: "zipCode",
          message: "Zip Code is a required field"
        });
      }
      if (this.error_messages && this.error_messages.length) return false;
      else return true;
    },
    error_desc(field) {
      var error = this.error_messages.find(v => v.field === field);
      return error ? error.message : "";
    }
  }
};
</script>

<style>
.row-fields {
  margin-bottom: 3vh;
}

.text-right {
  text-align: right;
  font-weight: 700;
}
</style>