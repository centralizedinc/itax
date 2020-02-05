<template>
  <a-layout>
    <a-back-top>
      <a-avatar>
        <a-icon type="up" :size="42"></a-icon>
      </a-avatar>
    </a-back-top>
    <a-layout-header class="header" :style="headerStyle">
      <a-row type="flex" justify="start" :gutter="8" data-aos="fade-up">
        <a-col :span="4">
          <h2 style="color:white;">Smart Tax</h2>
        </a-col>
        <a-col :span="2" :push="14">
          <a-button ghost block type="link">About</a-button>
        </a-col>
        <a-col :span="2" :push="14">
          <a-button ghost block type="link">Contact Us</a-button>
        </a-col>
        <a-col :span="2" :push="14">
          <a-button ghost block @click="showRegistration" type="link">Register</a-button>
        </a-col>
      </a-row>
      <a-divider style="margin-top: -2vh" v-if="topLocation<=50"></a-divider>
    </a-layout-header>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
    <a-layout-footer
      style="background: linear-gradient(to right, #000046, #1cb5e0); color: #ffffff"
    >
      <a-row>
        <a-col :span="24">
          <h1 style="color:#ffffff">Get in touch</h1>
          <!-- <a-divider></a-divider> -->
          <p>
            <a-icon type="phone"></a-icon>Hotline: 123-3456
          </p>
          <p>
            <a-icon type="facebook"></a-icon>Facebook:
            <a
              style="color:#ffffff"
              href="https://www.facebook.com/RoderickDondonAlcala/"
            >itax.ph</a>
          </p>
          <a-divider></a-divider>
        </a-col>

        <a-col :span="18">
          <p>© Copyright 2019 CCCI Inc. - All Rights Reserved</p>
        </a-col>
        <a-col :span="1">
          <a-avatar size="large" style="background-color:#4267B2">
            <a-icon type="facebook"></a-icon>
          </a-avatar>
        </a-col>
        <a-col :span="1">
          <a-avatar size="large" style="background-color:#EA4335">
            <a-icon type="google"></a-icon>
          </a-avatar>
        </a-col>
        <a-col :span="1">
          <a-avatar size="large" style="background-color:#4267B2">
            <a-icon type="twitter"></a-icon>
          </a-avatar>
        </a-col>
        <a-col :span="1">
          <a-avatar size="large" style="background:#00AFF0">
            <a-icon type="skype"></a-icon>
          </a-avatar>
        </a-col>
        <a-col :span="1">
          <a-avatar size="large" style="background-color:#FF2500">
            <a-icon type="youtube"></a-icon>
          </a-avatar>
        </a-col>
        <a-col :span="1">
          <a-avatar
            size="large"
            style="background:radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);"
          >
            <a-icon type="instagram"></a-icon>
          </a-avatar>
        </a-col>
      </a-row>
    </a-layout-footer>
    <a-modal
      :width="800"
      v-model="signup_visible"
      title="Create your new SmartTax account"
      okText="Submit"
      @cancel="signup_visible=false"
    >
      <template slot="footer">
        <a-button
          size="large"
          key="back"
          @click="step--; verified_recaptcha=false"
          :disabled="loading || step<1"
          icon="left"
        >Back</a-button>
        <a-button
          size="large"
          type="primary"
          ghost
          :loading="loading"
          @click="step++"
          v-if="step<2"
        >
          Next
          <a-icon type="right" />
        </a-button>
        <a-button
          size="large"
          key="submit"
          type="primary"
          :loading="loading"
          @click="register"
          v-else
          :disabled="!verified_recaptcha"
        >Submit</a-button>
      </template>
      <a-row type="flex" justify="center" :gutter="16">
        <!-- <a-col :span="24">
          <p>Register with facebook or google</p>
        </a-col>
        <a-col :span="12">
          <a-button
            block
            size="large"
            style="border: #4267B2;background-color:#4267B2; color:#FFFFFF"
            @click="registerFacebook"
            :disabled="loading"
          >
            <a-icon type="facebook"></a-icon>Facebook
          </a-button>
        </a-col>
        <a-col :span="12">
          <a-button
            block
            size="large"
            @click="registerGoogle"
            :disabled="loading"
            style="border: #DE4935;background-color:#DE4935; color:#FFFFFF"
          >
            <a-icon type="google"></a-icon>Google
          </a-button>
        </a-col>
        <a-col :span="24">
          <a-divider>Or</a-divider>
        </a-col>-->
        <a-col :span="10">
          <a-card>
            <a-steps size="small" direction="vertical" :current="step">
              <a-step
                style="height:130px"
                title="Create Account"
                description="Fill-up the following details for your personal SmartTax Account"
              ></a-step>
              <a-step
                style="height:170px"
                title="Add Taxpayer"
                description="Create a new or search for existing taxpayers.You can add more than one taxpayer per account once you are already logged-in."
              ></a-step>
              <a-step
                style="height:150px"
                title="Summary"
                description="Please check your registration details and enter the re-captcha to end the process."
              ></a-step>
            </a-steps>
          </a-card>
        </a-col>
        <a-col :span="14">
          <a-card v-if="step===0">
            <a-form>
              <a-form-item
                label="First Name"
                :validate-status="validation_errors.first_name ? 'error':''"
                :help="validation_errors.first_name"
                has-feedback
              >
                <a-input
                  :disabled="loading"
                  v-model="form.name.first"
                  placeholder="Enter First Name"
                ></a-input>
              </a-form-item>
              <a-form-item
                label="Last Name"
                :validate-status="validation_errors.last_name ? 'error':''"
                :help="validation_errors.last_name"
                has-feedback
                class="register-form-item"
              >
                <a-input :disabled="loading" v-model="form.name.last" placeholder="Last Name"></a-input>
              </a-form-item>
              <a-form-item
                label="Email Address"
                :validate-status="validation_errors.email ? 'error':''"
                :help="validation_errors.email"
                has-feedback
                class="register-form-item"
              >
                <a-input :disabled="loading" v-model="form.email" placeholder="Email"></a-input>
              </a-form-item>
              <a-form-item
                label="Password"
                :validate-status="validation_errors.password ? 'error' : form.password ? validate_password ? 'success': 'error':''"
                :help="validation_errors.password || (form.password && !validate_password ? 'Invalid Password':'')"
                has-feedback
                class="register-form-item"
              >
                <a-tooltip trigger="focus" placement="right">
                  <template slot="title">
                    <div>
                      <a-badge dot :status="pass_upper"></a-badge>Atleast one (1) capital letter
                    </div>
                    <div>
                      <a-badge dot :status="pass_number"></a-badge>Atleast one (1) numeric character
                    </div>
                    <div>
                      <a-badge dot :status="pass_special"></a-badge>Atleast one (1) special character
                    </div>
                    <div>
                      <a-badge dot :status="pass_length"></a-badge>8-20 Characters
                    </div>
                  </template>
                  <a-input
                    :disabled="loading"
                    v-model="form.password"
                    placeholder="Create a Password"
                    :type="isPassVisible?'text':'password'">
                     <a-icon
                    slot="suffix"
                    :type="isPassVisible?'eye':'eye-invisible'"
                    @click="isPassVisible=!isPassVisible"
                    style="cursor:pointer;margin-right:20px"
                  />                    
                  </a-input>
                </a-tooltip>
              </a-form-item>
              <a-form-item
                label="Confirm Password"
                :validate-status="form.confirm ? form.confirm === form.password ? 'success': 'error':''"
                :help="form.confirm && form.confirm !== form.password ? 'Confirm Password does not match':''"
                has-feedback
                class="register-form-item">
                <a-input
                  :disabled="loading"
                  v-model="form.confirm"
                  placeholder="Confirm Password"
                  :type="isConfPassVisible?'text':'password'">
                  <a-icon
                    slot="suffix"
                    :type="isConfPassVisible?'eye':'eye-invisible'"
                    @click="isConfPassVisible=!isConfPassVisible"
                    style="cursor:pointer;margin-right:20px"/>
                </a-input>
              </a-form-item>
            </a-form>
          </a-card>

          <!-- STEP#2 -->
          <a-card v-if="step===1">
            <a-form>
              <a-form-item label="Taxpayer Type">
                <a-radio-group
                  buttonStyle="solid"
                  style="width:100%"
                  v-model="form.taxpayer.taxpayer_type"
                >
                  <a-radio-button value="C">Corporate</a-radio-button>
                  <a-radio-button value="I">Individual</a-radio-button>
                </a-radio-group>
              </a-form-item>
              <a-form-item
                label="Tax Identification Number"
                :validate-status="validation_errors.tin ? 'error':''"
                :help="validation_errors.tin"
                has-feedback
                class="register-form-item"
              >
                <a-input-number
                  style="width:100%"
                  v-model="form.taxpayer.tin"
                  :formatter="formatTIN"
                  :parser="value => value.replace(/-/g,'')"
                  placeholder="TIN with 4-digit branch code (eg. 123-456-789-0000)"
                ></a-input-number>
              </a-form-item>
              <a-form-item
                label="RDO"
                class="register-form-item"
                :validate-status="validation_errors.rdo_code ? 'error':''"
                :help="validation_errors.rdo_code"
                has-feedback
              >
                <a-select style="width: 100%" placeholder="Select Revenue District Office">
                  <a-select-option
                    v-model="form.taxpayer.rdo_code"
                    v-for="(item, index) in rdos"
                    :key="index"
                    :value="item.code"
                  >{{item.code}} - {{item.description}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="Line of Business" class="register-form-item">
                <a-input placeholder="Line of Business" v-model="form.taxpayer.line_of_business" />
              </a-form-item>

              <span v-if="form.taxpayer.taxpayer_type == 'C'">
                <a-form-item
                  label="Registered Business Name"
                  :validate-status="validation_errors.taxpayer_registered_name ? 'error':''"
                  :help="validation_errors.taxpayer_registered_name"
                  has-feedback
                  class="register-form-item"
                >
                  <a-input
                    :disabled="loading"
                    v-model="form.taxpayer.registered_name"
                    placeholder="Registered Business Name"
                  ></a-input>
                </a-form-item>
                <a-form-item
                  label="Date of Incorporation"
                  class="register-form-item"
                  :validate-status="validation_errors.date_incorporation ? 'error':''"
                  :help="validation_errors.date_incorporation"
                  has-feedback
                >
                  <a-date-picker
                    style="width:100%"
                    v-model="form.taxpayer.date_incorporation"
                    placeholder="Date Incorporation"
                  ></a-date-picker>
                </a-form-item>
                <a-form-item
                  label="Accounting Type"
                  class="register-form-item"
                  :validate-status="validation_errors.accounting_type ? 'error':''"
                  :help="validation_errors.accounting_type"
                  has-feedback
                >
                  <a-radio-group
                    buttonStyle="solid"
                    v-model="form.taxpayer.accounting_type"
                    @change="() => { form.taxpayer.accounting_type === 'c'?form.taxpayer.start_month=0:''}"
                  >
                    <a-radio-button value="c">Calendar</a-radio-button>
                    <a-radio-button value="f">Fiscal</a-radio-button>
                  </a-radio-group>
                </a-form-item>
                <a-form-item
                  label="Start Month"
                  class="register-form-item"
                  :validate-status="validation_errors.start_month ? 'error':''"
                  :help="validation_errors.start_month"
                  has-feedback
                >
                  <a-select
                    style="width: 100%"
                    v-model="form.taxpayer.start_month"
                    :disabled="form.taxpayer.accounting_type === 'c'"
                  >
                    <!-- @change="selectStartMonth" -->
                    <a-select-option
                      v-for="(item, index) in months"
                      :key="index"
                      :value="index"
                    >{{item}}</a-select-option>
                  </a-select>
                </a-form-item>
              </span>
              <span v-else>
                <a-form-item
                  label="Taxpayer Name"
                  :validate-status="validation_errors.taxpayer_name ? 'error':''"
                  :help="validation_errors.taxpayer_name"
                  has-feedback
                  class="register-form-item"
                >
                  <a-input
                    :disabled="loading"
                    v-model="form.taxpayer.individual_details.firstName"
                    placeholder="First Name"
                    @change="updateRegName()"
                  ></a-input>
                  <a-input
                    :disabled="loading"
                    v-model="form.taxpayer.individual_details.middleName"
                    placeholder="Middle Name"
                    @change="updateRegName()"
                  ></a-input>
                  <a-input
                    :disabled="loading"
                    v-model="form.taxpayer.individual_details.lastName"
                    placeholder="Last Name"
                    @change="updateRegName()"
                  ></a-input>
                </a-form-item>
                <a-form-item
                  class="register-form-item"
                  label="Select Filer Type"
                  :validate-status="validation_errors.filer_type ? 'error':''"
                  :help="validation_errors.filer_type"
                  has-feedback
                >
                  <a-radio-group v-model="form.taxpayer.filer_type">
                    <a-radio value="sp">Single Proprietor</a-radio>
                    <a-radio value="p">Professional</a-radio>
                    <a-radio value="em">Employee</a-radio>
                    <a-radio value="e">Estate</a-radio>
                    <a-radio value="t">Trust</a-radio>
                  </a-radio-group>
                </a-form-item>
                <a-form-item
                  label="Date of Birth"
                  class="register-form-item"
                  :validate-status="validation_errors.birth_date ? 'error':''"
                  :help="validation_errors.birth_date"
                  has-feedback
                >
                  <a-date-picker
                    style="width:100%"
                    placeholder="Date of Birth"
                    v-model="form.taxpayer.individual_details.birthDate"
                  />
                </a-form-item>
                <a-form-item
                  class="register-form-item"
                  label="Gender"
                  :validate-status="validation_errors.gender ? 'error':''"
                  :help="validation_errors.gender"
                  has-feedback
                >
                  <a-radio-group
                    buttonStyle="solid"
                    v-model="form.taxpayer.individual_details.gender"
                  >
                    <a-radio-button value="M">Male</a-radio-button>
                    <a-radio-button value="F">Female</a-radio-button>
                  </a-radio-group>
                </a-form-item>
              </span>
               <a-form-item
                  class="register-form-item"
                  label="Address"
                  :validate-status="validation_errors.address ? 'error':''"
                  :help="validation_errors.address"
                  has-feedback>                 
                 <a-textarea rows="4" placeholder="Taxpayer Address"></a-textarea>
                </a-form-item>
            </a-form>
          </a-card>

          <!-- Step 3 -->
          <a-card v-if="step===2">
            <a-row>
              <a-row>
                <a-col :span="24">
                  <a-divider orientation="left">Account Details</a-divider>
                </a-col>
              </a-row>
              <a-col :span="12">
                <span style="font-weight:bold">Account Name</span>
              </a-col>
              <a-col :span="12" align="right">
                <span>{{form.name.last}}, {{form.name.first}}</span>
              </a-col>
              <a-col :span="12">
                <span style="font-weight:bold">Email Address</span>
              </a-col>
              <a-col :span="12" align="right">
                <span>{{form.email}}</span>
              </a-col>
              <a-col :span="24">
                <a-divider orientation="left">Taxpayer Details</a-divider>
              </a-col>
              <a-col :span="12">
                <div style="font-weight:bold">TIN</div>
                <div style="font-weight:bold">Registered Name</div>
                <div style="font-weight:bold">RDO</div>
                <div style="font-weight:bold">Taxpayer Type</div>
                <div style="font-weight:bold">Address</div>
              </a-col>
              <a-col :span="12" align="right">
                <div>{{formatTIN(form.taxpayer.tin)}}</div>
                <div>{{form.taxpayer.registered_name}}</div>
                <div>{{form.taxpayer.rdo}}</div>
              </a-col>
            </a-row>
          </a-card>
          <a-card v-if="step===2" style="margin-top:20px">
            <vue-recaptcha
              sitekey="6LeSh9UUAAAAAK22et0fYuD9IsilyzTyMPC4yH7I"
              @verify="verified_recaptcha=true"
            ></vue-recaptcha>
          </a-card>
        </a-col>
      </a-row>
    </a-modal>
  </a-layout>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
export default {
  components: { VueRecaptcha },
  data() {
    return {
      isConfPassVisible:false,
      isPassVisible:false,
      verified_recaptcha: false,
      step: 0,
      rdos: null,
      signup_visible: false,
      visible: false,
      topLocation: 0,
      reveal: false,
      form: {
        name: {},
        taxpayer: {
          individual_details: {},
          taxpayer_type: "C",
          accounting_type: "c",
          start_month: 0
        }
      },
      loading: false,
      validation: {
        name: {
          first: {},
          last: {}
        },
        email: {},
        password: {},
        confirm: {}
      },
      validation_errors: {},
      months: [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER"
      ]
    };
  },
  watch: {
    signup_visible(val) {
      if (!val) this.form = { name: {} };
    }
  },
  methods: {
    showRegistration() {
      this.signup_visible = true;
      console.log(JSON.stringify(this.rdos));
      if (!this.rdos) {
        this.$http
          .get(`${process.env.VUE_APP_BASE_API_URI}reference/rdos`)
          .then(result => {
            console.log(result.data);
            this.rdos = result.data;
            this.rdos.sort(function(a, b) {
              return a.code - b.code;
            });
          });
      }
    },
    handleScroll(event) {
      // Any code to be executed when the window is scrolled
      console.log("event ::: ", JSON.stringify(window.top.scrollY));
      this.topLocation = window.top.scrollY;
    },
    registerFacebook() {
      window.open(
        `${process.env.VUE_APP_BASE_API_URI}oauth/facebook`,
        "",
        "width=500,height=450"
      );
      this.signup_visible = false;
    },
    registerGoogle() {
      window.open(
        `${process.env.VUE_APP_BASE_API_URI}oauth/google`,
        "",
        "width=500,height=450"
      );
      this.signup_visible = false;
    },
    validate() {
      this.validation_errors = {};
      if (!this.form.name.first) {
        this.validation_errors.first_name = "Please input first name";
      }
      if (!this.form.name.last) {
        this.validation_errors.last_name = "Please input last name";
      }
      if (!this.form.email) {
        this.validation_errors.email = "Please input email";
      }
      if (!this.form.password) {
        this.validation_errors.password = "Please input password";
      } else if (this.form.password !== this.form.confirm) {
        this.validation_errors.confirm_password =
          "Password and Confirm Password does not match";
      }

      if (!this.form.taxpayer.tin) {
        this.validation_errors.tin = "Tax Identification Number is required.";
      }
      if (!this.form.taxpayer.rdo_code) {
        this.validation_errors.rdo_code = "RDO is required.";
      }
      if (!this.form.taxpayer.line_of_business) {
        this.validation_errors.line_of_business =
          "Line of Business is required.";
      }

      if (this.form.taxpayer.taxpayer_type === "C") {
        if (!this.form.taxpayer.registered_name) {
          this.validation_errors.taxpayer_registered_name =
            "Please Input Registered Name";
        }
        if (!this.form.taxpayer.date_incorporation) {
          this.validation_errors.date_incorporation =
            "Date of Incorporation is required.";
        }
        if (!this.form.taxpayer.accounting_type) {
          this.validation_errors.accounting_type =
            "Accounting Type is required.";
        }
        if (!this.form.taxpayer.start_month) {
          this.validation_errors.start_month = "Start Month is required.";
        }
      } else {
        if (
          !this.form.taxpayer.individual_details ||
          !this.form.taxpayer.individual_details.firstName ||
          !this.form.taxpayer.individual_details.lastName
        ) {
          this.validation_errors.taxpayer_name =
            "Please Input First and Last Name";
        }
        if (!this.form.taxpayer.filer_type) {
          this.validation_errors.filer_type = "Filer Type is required.";
        }
        if (!this.form.taxpayer.birth_date) {
          this.validation_errors.individual_details.birthDate =
            "Date of Birth is required.";
        }
        if (!this.form.taxpayer.gender) {
          this.validation_errors.individual_details.gender =
            "Gender is required.";
        }
      }
    },
    register(e) {
      this.loading = true;
      // console.log("this.validate() :", this.validate());
      this.validate();
      console.log("this.validation_errors :", this.validation_errors);
      if (
        !this.validation_errors ||
        !Object.keys(this.validation_errors).length
      ) {
        console.log("Received values of form: ", this.form);
        this.$store
          .dispatch("SIGNUP", this.form)
          .then(result => {
            console.log("SIGNUP result :", result);
            this.$notification.open({
              message: "Registration success.",
              description: `Please confirm your account in ${this.form.email}`,
              icon: <a-icon type="check" style="color: blue" />
            });
            this.signup_visible = false;
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
          });
      } else this.loading = false;
    },
    checkRegCode() {
      const reg_code = this.$route.query.reg_code;
      if (reg_code) {
        this.signup_visible = true;
        const retrieved_data = JSON.parse(
          new Buffer(reg_code, "base64").toString()
        );
        console.log("retrieved_data :", retrieved_data);
        this.form = retrieved_data;
        console.log("this.form :", this.form);
      } else this.signup_visible = false;
    },
    verifyCaptcha(response) {
      alert(JSON.stringify(response));
    },
    updateRegName() {
      this.form.taxpayer.registered_name = `${this.form.taxpayer.individual_details.firstName} ${this.form.taxpayer.individual_details.middleName} ${this.form.taxpayer.individual_details.lastName}`;
    }
  },
  created() {
    this.checkRegCode();
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  computed: {
    //password validation
    validate_password() {
      return (
        this.pass_length === "success" &&
        this.pass_upper === "success" &&
        this.pass_number === "success" &&
        this.pass_special === "success"
      );
    },
    pass_length() {
      return this.form.password && this.form.password.length > 7
        ? "success"
        : "error";
    },
    pass_upper() {
      var letters = /[A-Z]/;
      return this.form.password && this.form.password.match(letters)
        ? "success"
        : "error";
    },
    pass_number() {
      var num = /[0-9]/;
      return this.form.password && this.form.password.match(num)
        ? "success"
        : "error";
    },
    pass_special() {
      var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      return this.form.password && this.form.password.match(format)
        ? "success"
        : "error";
    },
    headerStyle() {
      console.log("refresh#######");
      this.$aos.refreshHard();
      if (this.topLocation < 50) {
        return "background: transparent";
      } else {
        return "background: linear-gradient(to left, #000046, #1cb5e0);";
      }
    }
  }
};
</script>

<style>
.register-form-item .ant-form-item-label {
  line-height: 20px;
}
</style>