<template>
  <div>
    <a-row type="flex" align="middle" v-if="!show_details">
      <a-col :span="24">
        <a-form-item
          label="Company's TIN"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 14 }"
          has-feedback
          :validate-status="invalid_tin_status"
          :help="invalid_tin_msg"
        >
          <a-input
            v-model="details.company_details.tin"
            placeholder="TIN"
            maxlength="13"
            @blur="searchTin"
            @keypress.enter="searchTin"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <template v-else>
      <a-row type="flex" align="middle" :gutter="5" class="row-fields">
        <a-col :xs="{ span: 12 }" :md="{ span: 4  }" class="text-right">TIN:</a-col>
        <a-col :xs="{ span: 12 }" :md="{ span: 7  }">
          <a-input
            v-model="details.company_details.tin"
            placeholder="TIN"
            maxlength="13"
            @blur="searchTin"
            @keypress.enter="searchTin"
          />
        </a-col>
        <a-col :xs="{ span: 12 }" :md="{ span: 2  }" class="text-right">RDO:</a-col>
        <a-col :xs="{ span: 12 }" :md="{ span: 3  }">
          <a-select style="width: 100%" v-model="details.company_details.rdo_code">
            <a-select-option
              v-for="(item, index) in rdos"
              :key="index"
              :value="item.code"
            >{{item.code}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="{ span: 12 }" :md="{ span: 4  }" class="text-right">Line of Business:</a-col>
        <a-col :xs="{ span: 12 }" :md="{ span: 4  }">
          <a-input
            v-model="details.company_details.line_of_business"
            placeholder="Line of Business"
          />
        </a-col>
      </a-row>

      <!-- <a-row type="flex" align="middle" :gutter="5" class="row-fields">
        <a-col :xs="{ span: 12 }" :md="{ span: 4 }" class="text-right">Filer Type:</a-col>
        <a-col :xs="{ span: 12 }" :md="{ span: 20 }">
          <a-radio-group buttonStyle="solid" v-model="details.company_details.filer_type">
            <a-radio-button value="sp">Single Proprietor</a-radio-button>
            <a-radio-button value="p">Professional</a-radio-button>
            <a-radio-button value="em">Employee</a-radio-button>
            <a-radio-button value="e">Estate</a-radio-button>
            <a-radio-button value="t">Trust</a-radio-button>
          </a-radio-group>
        </a-col>
      </a-row>-->

      <a-row type="flex" align="middle" :gutter="5" class="row-fields">
        <a-col :xs="{ span: 12 }" :md="{ span: 4 }" class="text-right">Acounting Type:</a-col>
        <a-col :xs="{ span: 12 }" :md="{ span: 5 }">
          <a-radio-group
            buttonStyle="solid"
            v-model="details.company_details.accounting_type"
            @change="checkIfCalendar"
          >
            <a-radio-button value="c">Calendar</a-radio-button>
            <a-radio-button value="f">Fiscal</a-radio-button>
          </a-radio-group>
        </a-col>
        <a-col :xs="{ span: 12 }" :md="{ span: 3 }" class="text-right">Start Month:</a-col>
        <a-col :xs="{ span: 12 }" :md="{ span: 4 }">
          <a-select
            style="width: 100%"
            v-model="details.company_details.start_month"
            :disabled="details.company_details.accounting_type === 'c'"
            @change="selectStartMonth"
          >
            <a-select-option v-for="(item, index) in months" :key="index" :value="index">{{item}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="{ span: 12 }" :md="{ span: 4 }" class="text-right">Date Incorporation:</a-col>
        <a-col :xs="{ span: 12 }" :md="{ span: 4 }">
          <a-date-picker
            style="width:100%"
            placeholder="Date Incorporation"
            v-model="details.company_details.date_incorporation"
          ></a-date-picker>
        </a-col>
      </a-row>

      <a-row type="flex" align="middle" :gutter="5" class="row-fields">
        <a-col :span="4" class="text-right">Registered Name:</a-col>
        <a-col :span="20">
          <a-input v-model="details.company_details.registered_name" placeholder="Registered Name" />
        </a-col>
      </a-row>

      <a-row type="flex" align="middle" :gutter="5" class="row-fields">
        <a-col :xs="{ span: 12 }" :md="{ span: 4 }" class="text-right">Email:</a-col>
        <a-col :xs="{ span: 12 }" :md="{ span: 7 }">
          <a-input v-model="details.company_details.contact_details.email" placeholder="Email" />
        </a-col>
        <a-col :xs="{ span: 12 }" :md="{ span: 2 }" class="text-right">Tel No:</a-col>
        <a-col :xs="{ span: 12 }" :md="{ span: 4 }">
          <a-input v-model="details.company_details.contact_details.telno" placeholder="Tel No" />
        </a-col>
        <a-col :xs="{ span: 12 }" :md="{ span: 3 }" class="text-right">Contact No:</a-col>
        <a-col :xs="{ span: 12 }" :md="{ span: 4 }">
          <a-input
            v-model="details.company_details.contact_details.mobile"
            placeholder="Contact No"
          />
        </a-col>
      </a-row>

      <a-row :gutter="5" class="row-fields">
        <a-col :span="4" class="text-right">Registered Address:</a-col>
        <a-col :span="20">
          <a-textarea
            :rows="3"
            placeholder="Registered Address"
            v-model="details.company_details.address"
          ></a-textarea>
        </a-col>
      </a-row>

      <a-row type="flex" align="middle" :gutter="5" class="row-fields">
        <a-col :xs="{ span: 12 }" :md="{ span: 4 }" class="text-right">Zip Code:</a-col>
        <a-col :xs="{ span: 12 }" :md="{ span: 4 }">
          <a-input
            maxlength="4"
            v-model="details.company_details.address_details.zipCode"
            placeholder="Zip Code"
          />
        </a-col>
      </a-row>
    </template>

    <a-button-group style="float: right">
      <a-button @click="previous" :disabled="loading">Previous</a-button>
      <a-button type="primary" @click="$emit('next', 4)" :loading="loading">Next</a-button>
    </a-button-group>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      default: () => {
        return {
          company_details: {
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
    rdos() {
      return this.$store.state.tax_form.rdos;
    },
    show_spouse() {
      return this.details.taxpayer.individual_details.civil_status === "M";
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
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      invalid_tin_msg: "",
      invalid_tin_status: "",
      show_details: false
    };
  },
  created() {
    this.searchTin();
  },
  methods: {
    searchTin() {
      this.show_details = false;
      this.invalid_tin_msg = "";
      this.invalid_tin_status = "validating";
      console.log("search tin :", this.details.company_details.tin);
      if (
        this.details.company_details.tin &&
        this.details.company_details.tin.length === 13
      ) {
        if (this.details.company_details.tin === this.details.taxpayer.tin) {
          this.invalid_tin_status = "error";
          this.invalid_tin_msg = "You input your own TIN";
        } else if (
          this.details.company_details.tin === this.details.spouse_details.tin
        ) {
          this.invalid_tin_status = "error";
          this.invalid_tin_msg = "You input your spouse TIN";
        } else {
          this.$store
            .dispatch("GET_TAXPAYER_BY_TIN", {
              tin: this.details.company_details.tin,
              ignore_user: true
            })
            .then(result => {
              if (!result || !result.taxpayer) {
                // taxpayer not exist on db
                this.show_details = true;
                this.details.company_details = {
                  is_exist: false,
                  tin: this.details.company_details.tin,
                  taxpayer_type: "C",
                  rdo_code: "",
                  registered_name: "",
                  line_of_business: "",
                  address: "",
                  accounting_type: "c",
                  start_month: 0,
                  end_month: 11,
                  contact_details: {
                    email: ""
                  },
                  address_details: {
                    zipCode: ""
                  },
                  date_incorporation: ""
                };
                this.invalid_tin_status = "success";
              } else if (result.taxpayer.taxpayer_type !== "C") {
                this.invalid_tin_status = "error";
                this.invalid_tin_msg =
                  "TIN is an individual taxpayer. If there is any concern, please contact us";
              } else {
                this.show_details = true;
                this.details.company_details = result.taxpayer;
                this.details.company_details.is_exist = true;
                this.invalid_tin_status = "success";
                console.log(
                  "company details: " +
                    JSON.stringify(this.details.company_details)
                );
              }
            })
            .catch(err => {});
        }
      } else {
        this.invalid_tin_msg = "Please input a valid TIN with 13 character";
        this.invalid_tin_status = "";
      }
    },
    checkIfCalendar() {
      if (this.details.company_details.accounting_type === "c") {
        this.details.company_details.start_month = 0;
        this.details.company_details.end_month = 11;
      }
    },
    selectStartMonth() {
      var date = new Date();
      date.setMonth(this.details.company_details.start_month + 11); // to get the end month
      this.details.company_details.end_month = date.getMonth();
    },
    previous() {
      var page = this.show_spouse ? 2 : 1;
      this.$emit("previous", page);
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