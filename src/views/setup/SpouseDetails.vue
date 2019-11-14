<template>
  <div>
    <a-row type="flex" align="middle" :gutter="5">
      <a-col :xs="{ span: 24 }" :md="{ span: 10  }">
        <a-form-item
          label="TIN"
          :label-col="{ span: 9 }"
          :wrapper-col="{ span: 15 }"
          :validate-status="error_desc('tin') ? 'error' : invalid_tin_status"
          :help="error_desc('tin')"
        >
          <!-- has-feedback
          :validate-status="error_desc('tin') ? 'error' : invalid_tin_status"
          :help="error_desc('tin')"-->
          <a-input
            maxlength="13"
            v-model="details.spouse_details.tin"
            placeholder="TIN"
            @blur="checkTin"
            @keypress.enter="checkTin"
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
          v-if="tinGood"
        >
          <a-select style="width: 100%" v-model="details.spouse_details.rdo_code">
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
          v-if="tinGood"
        >
          <a-input
            v-model="details.spouse_details.line_of_business"
            placeholder="Line of Business"
          />
        </a-form-item>
      </a-col>
    </a-row>

    <a-row type="flex" align="middle" v-if="tinGood">
      <a-col :span="24" style="margin-left: -0.8vw">
        <a-form-item
          label="Filer Type"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          :validate-status="error_desc('filer_type') ? 'error' : ''"
          :help="error_desc('filer_type')"
        >
          <a-radio-group buttonStyle="solid" v-model="details.spouse_details.filer_type">
            <a-radio-button value="sp">Single Proprietor</a-radio-button>
            <a-radio-button value="p">Professional</a-radio-button>
            <a-radio-button value="em">Employee</a-radio-button>
            <a-radio-button value="e">Estate</a-radio-button>
            <a-radio-button value="t">Trust</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row type="flex" align="middle" v-if="tinGood">
      <a-col :span="24" style="margin-left: -0.8vw">
        <a-form-item
          label="Spouse's Name"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          :validate-status="error_desc('full_name') ? 'error' : ''"
          :help="error_desc('full_name')"
        >
          <a-row :gutter="5">
            <a-col :span="8">
              <a-input
                v-model="details.spouse_details.individual_details.firstName"
                placeholder="First Name"
              />
            </a-col>
            <a-col :span="8">
              <a-input
                v-model="details.spouse_details.individual_details.middleName"
                placeholder="Middle Name"
              />
            </a-col>
            <a-col :span="8">
              <a-input
                v-model="details.spouse_details.individual_details.lastName"
                placeholder="Last Name"
              />
            </a-col>
          </a-row>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row type="flex" align="middle" v-if="tinGood">
      <a-col :span="24" style="margin-left: -0.8vw">
        <a-form-item
          label="Registered Name"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          :validate-status="error_desc('registered_name') ? 'error' : ''"
          :help="error_desc('registered_name')"
        >
          <a-input v-model="details.spouse_details.registered_name" placeholder="Registered Name" />
        </a-form-item>
      </a-col>
    </a-row>

    <a-row type="flex" align="middle" :gutter="5" v-if="tinGood">
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
            v-model="details.spouse_details.individual_details.birthDate"
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
          <a-radio-group
            buttonStyle="solid"
            v-model="details.spouse_details.individual_details.gender"
          >
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
            v-model="details.spouse_details.individual_details.citizenship"
            placeholder="Citizenship"
          />
        </a-form-item>
      </a-col>
    </a-row>

    <a-row type="flex" align="middle" :gutter="5" v-if="tinGood">
      <a-col :xs="{ span: 24 }" :md="{ span: 10 }">
        <a-form-item
          label="Email"
          :label-col="{ span: 9 }"
          :wrapper-col="{ span: 15 }"
          :validate-status="error_desc('email') ? 'error' : ''"
          :help="error_desc('email')"
        >
          <a-input v-model="details.spouse_details.contact_details.email" placeholder="Email" />
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
          <a-input v-model="details.spouse_details.contact_details.telno" placeholder="Tel No" />
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
          <a-input
            v-model="details.spouse_details.contact_details.mobile"
            placeholder="Contact No"
          />
        </a-form-item>
      </a-col>
    </a-row>

    <a-row type="flex" align="middle" v-if="tinGood">
      <a-col :span="24" style="margin-left: -0.8vw">
        <a-form-item
          label="Registered Address"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          :validate-status="error_desc('registered_address') ? 'error' : ''"
          :help="error_desc('registered_address')"
        >
          <a-textarea
            :rows="3"
            placeholder="Registered Address"
            v-model="details.spouse_details.address"
          ></a-textarea>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row type="flex" align="middle" v-if="tinGood">
      <a-col :span="24" style="margin-left: -0.8vw">
        <a-form-item
          label="Zip Code"
          maxlength="4"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 3 }"
          :validate-status="error_desc('zipCode') ? 'error' : ''"
          :help="error_desc('zipCode')"
        >
          <a-input v-model="details.spouse_details.address_details.zipCode" placeholder="Zip Code" />
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
export default {
  props: {
    details: {
      type: Object,
      default: () => {
        return {
          spouse_details: {
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
    rdos() {
      return this.$store.state.tax_form.rdos;
    },
    registered_name() {
      return `${this.details.spouse_details.individual_details.firstName} ${this.details.spouse_details.individual_details.middleName} ${this.details.spouse_details.individual_details.lastName}`;
    },
    show_company() {
      return ["sp", "p", "em"].includes(this.details.taxpayer.filer_type);
    }
  },
  watch: {
    registered_name(val) {
      this.details.spouse_details.registered_name = val;
    }
  },
  data() {
    return {
      invalid_tin_msg: "",
      invalid_tin_status: "",
      show_details: false,
      error_messages: [],
      tinGood: false
    };
  },
  created() {
    // this.searchTin();
  },
  methods: {
    disabledDate(current) {
      var date = new Date();
      date.setFullYear(date.getFullYear() - 18);
      return new Date(current).getTime() >= date.getTime();
    },
    // -----------------
    async checkTin() {
      this.error_messages = [];
      this.invalid_tin_status = "validating";

      // // to avoid redundancy of error in tin
      // const tin_index = this.error_messages.findIndex(v => v.field === "tin");
      // if (tin_index > -1) this.error_messages.splice(tin_index, 1); // to clear tin error message

      // check tin
      // console.log("this.user.tin: " + JSON.stringify(this.user.tin))
      console.log(
        "async check tin start conditions: " +
          JSON.stringify(this.details.spouse_details.tin)
      );
      console.log(
        "this.details.taxpayer.tin: " +
          JSON.stringify(this.details.taxpayer.tin)
      );
      console.log(
        "this.details.company_details.tin: " +
          JSON.stringify(this.details.company_details.tin)
      );

      if (
        !this.details.spouse_details.tin ||
        this.details.spouse_details.tin == null ||
        this.details.spouse_details.tin == "" ||
        this.details.spouse_details.tin == undefined
      ) {
        console.log("!this.details.spouse_details.tin");
        this.error_messages.push({
          field: "tin",
          message: "TIN is a required field"
        });
      } else if (this.details.spouse_details.tin.length !== 13) {
        console.log("this.details.spouse_details.tin.length !== 13");
        this.error_messages.push({
          field: "tin",
          message: "TIN length must be 13"
        });
      } else if (
        this.details.spouse_details.tin === this.details.taxpayer.tin
      ) {
        console.log(
          "this.details.spouse_details.tin === this.details.taxpayer.tin"
        );
        this.error_messages.push({
          field: "tin",
          message: "You input your own TIN"
        });
      } else if (
        this.details.spouse_details.tin === this.details.company_details.tin
      ) {
        console.log(
          "this.details.spouse_details.tin === this.details.company_details.tin"
        );
        this.error_messages.push({
          field: "tin",
          message: "You input your company TIN"
        });
      }
      // if (this.details.spouse_details.tin !== this.user.tin)
      else {
        var result;
        console.log("this.details.spouse_details.tin !== this.user.tin");
        // wait the result before to proceed
        // const result = await
        this.$store
          .dispatch("GET_TAXPAYER_BY_TIN", {
            tin: this.details.spouse_details.tin,
            ignore_user: true
          })
          .then(result1 => {
            result = result1;
            return this.$http.get(
              `/connections/${this.details.spouse_details.tin}`
            );
          })
          .then(result2 => {
            console.log("this is result 2: " + JSON.stringify(result2));
            console.log("result :", JSON.stringify(result));
            var currentSpouse = {};
            result2.data.model.forEach(data => {
              if (data.relationship == "spouse") {
                currentSpouse = data;
              }
            });
            console.log(
              "currentSpouse dettecttedd: " + JSON.stringify(currentSpouse)
            );
            if (!result || !result.taxpayer) {
              console.log(
                "!result || !result.taxpayer: " +
                  JSON.stringify(this.error_messages)
              );
              // taxpayer not exist on db
              this.details.spouse_details = {
                is_exist: false,
                tin: this.details.spouse_details.tin,
                taxpayer_type: "I",
                filer_type: "",
                rdo_code: "",
                registered_name: "",
                line_of_business: "",
                accounting_type: "c",
                start_month: 0,
                end_month: 11,
                individual_details: {
                  firstName: "",
                  middleName: "",
                  lastName: "",
                  gender: "",
                  civil_status: "",
                  spouse_tin: ""
                },
                address: "",
                birthDate: "",
                contact_details: {
                  email: ""
                },
                address_details: {
                  zipCode: ""
                }
              };
              this.invalid_tin_status = "success";
              this.error_messages.push({
                field: "tin",
                message: ""
              });
              this.tinGood = true;
            } else if (result.taxpayer.taxpayer_type !== "I") {
              console.log("result.taxpayer.taxpayer_type !== I");
              this.error_messages.push({
                field: "tin",
                message:
                  "TIN is a corporate taxpayer. If there is any concern, please contact us"
              });
            } else if (
              result.taxpayer.individual_details.spouseTin ===
              this.details.taxpayer.tin
            ) {
              console.log(
                "result.taxpayer.individual_details.spouseTin === this.details.taxpayer.tin"
              );
              this.details.spouse_details = result.taxpayer;
              this.details.spouse_details.is_exist = true;
              this.invalid_tin_status = "success";
            } else if (currentSpouse) {
              //  if(currentSpouse){
              //    console.log("walang laman")
              //  }
              console.log("current spouse: " + JSON.stringify(currentSpouse));
              console.log(
                "This taxpayer has a different spouse. If there is any concern, please contact us"
              );
              this.error_messages.push({
                field: "tin",
                message:
                  "This taxpayer has a different spouse. If there is any concern, please contact us"
              });
            }
          });
      }
    },
    // ----------------
    async validation() {
      console.log(
        "this.details.spouse_details data: " +
          JSON.stringify(this.details.spouse_details)
      );
      this.validate();
      await this.checkTin();
      console.log("this.error_messages :", JSON.stringify(this.error_messages));
      if (!this.error_messages || !this.error_messages.length) {
        this.next();
      }
    },
    validate() {
      this.error_messages = [];
      if (!this.details.spouse_details.rdo_code) {
        this.error_messages.push({
          field: "rdo_code",
          message: "RDO is a required field"
        });
      }
      if (!this.details.spouse_details.line_of_business) {
        this.error_messages.push({
          field: "line_of_business",
          message: "Line of Business is a required field"
        });
      }
      if (!this.details.spouse_details.filer_type) {
        this.error_messages.push({
          field: "filer_type",
          message: "Choose a filer type"
        });
      }
      if (
        !this.details.spouse_details.individual_details.firstName ||
        !this.details.spouse_details.individual_details.lastName
      ) {
        this.error_messages.push({
          field: "full_name",
          message: "First name and Last name is a required fields"
        });
      }
      if (!this.details.spouse_details.registered_name) {
        this.error_messages.push({
          field: "registered_name",
          message: "Registered name is a required field"
        });
      }
      if (!this.details.spouse_details.individual_details.birthDate) {
        this.error_messages.push({
          field: "birthDate",
          message: "Date of Birth is a required field"
        });
      }
      if (!this.details.spouse_details.individual_details.gender) {
        this.error_messages.push({
          field: "gender",
          message: "Choose gender"
        });
      }
      if (!this.details.spouse_details.individual_details.citizenship) {
        this.error_messages.push({
          field: "citizenship",
          message: "Citizenship is a required field"
        });
      }
      if (!this.details.spouse_details.contact_details.email) {
        this.error_messages.push({
          field: "email",
          message: "Email is a required field"
        });
      }
      if (!this.details.spouse_details.contact_details.telno) {
        this.error_messages.push({
          field: "telno",
          message: "Tel no is a required field"
        });
      }
      if (!this.details.spouse_details.address) {
        this.error_messages.push({
          field: "registered_address",
          message: "Registered Address is a required field"
        });
      }
      // if (!this.details.spouse_details.individual_details.civil_status) {
      //   this.error_messages.push({
      //     field: "civil_status",
      //     message: "Civil Status is a required field"
      //   });
      // }
      if (!this.details.spouse_details.address_details.zipCode) {
        this.error_messages.push({
          field: "zipCode",
          message: "Zip Code is a required field"
        });
      }
      if (this.error_messages && this.error_messages.length) return false;
      else return true;
    },
    // searchTin() {
    //   this.show_details = false;
    //   this.invalid_tin_msg = "";
    //   this.invalid_tin_status = "validating";
    //   console.log("search tin :", this.details.spouse_details.tin);
    //   if (
    //     this.details.spouse_details.tin &&
    //     this.details.spouse_details.tin.length === 13
    //   ) {
    //     if (this.details.spouse_details.tin === this.details.taxpayer.tin) {
    //       this.invalid_tin_status = "error";
    //       this.invalid_tin_msg = "You input your own TIN";
    //     } else if (
    //       this.details.spouse_details.tin === this.details.company_details.tin
    //     ) {
    //       this.invalid_tin_status = "error";
    //       this.invalid_tin_msg = "You input your company TIN";
    //     } else {
    //       this.$store
    //         .dispatch("GET_TAXPAYER_BY_TIN", {
    //           tin: this.details.spouse_details.tin,
    //           ignore_user: true
    //         })
    //         .then(result => {
    //           if (!result || !result.taxpayer) {
    //             // taxpayer not exist on db
    //             this.show_details = true;
    //             this.details.spouse_details = {
    //               is_exist: false,
    //               tin: this.details.spouse_details.tin,
    //               taxpayer_type: "I",
    //               filer_type: "",
    //               rdo_code: "",
    //               registered_name: "",
    //               line_of_business: "",
    //               accounting_type: "c",
    //               start_month: 0,
    //               end_month: 11,
    //               individual_details: {
    //                 firstName: "",
    //                 middleName: "",
    //                 lastName: "",
    //                 gender: "",
    //                 civil_status: "",
    //                 spouse_tin: ""
    //               },
    //               address: "",
    //               birthDate: "",
    //               contact_details: {
    //                 email: ""
    //               },
    //               address_details: {
    //                 zipCode: ""
    //               }
    //             };
    //             this.invalid_tin_status = "success";
    //           } else if (result.taxpayer.taxpayer_type !== "I") {
    //             this.invalid_tin_status = "error";
    //             this.invalid_tin_msg =
    //               "TIN is a corporate taxpayer. If there is any concern, please contact us";
    //           } else if (
    //             result.taxpayer.individual_details.spouseTin ===
    //             this.details.taxpayer.tin
    //           ) {
    //             this.show_details = true;
    //             this.details.spouse_details = result.taxpayer;
    //             this.details.spouse_details.is_exist = true;
    //             this.invalid_tin_status = "success";
    //           } else {
    //             this.invalid_tin_status = "error";
    //             this.invalid_tin_msg =
    //               "This taxpayer has a different spouse. If there is any concern, please contact us";
    //           }
    //         })
    //         .catch(err => {});
    //     }
    //   } else {
    //     this.invalid_tin_msg = "Please input a valid TIN with 13 character";
    //     this.invalid_tin_status = "";
    //   }
    // },
    next() {
      console.log("spouse details data: " + JSON.stringify(this.details));
      var page = this.show_company ? 3 : 4;
      this.$emit("next", page);
    },
    error_desc(field) {
      var error = this.error_messages.find(v => v.field === field);
      return error ? error.message : "";
    }
  }
};
</script>

<style>
</style>