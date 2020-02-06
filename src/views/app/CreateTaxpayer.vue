<template>
  <a-card>
    <a-form>
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
      <a-form-item label="Taxpayer Type">
        <a-radio-group buttonStyle="solid" style="width:100%" v-model="form.taxpayer.taxpayer_type">
          <a-radio-button value="C">CORPORATE</a-radio-button>
          <a-radio-button value="I">INDIVIDUAL</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="RDO"
        class="register-form-item"
        :validate-status="validation_errors.rdo_code ? 'error':''"
        :help="validation_errors.rdo_code"
        has-feedback
      >
        <a-select
          style="width: 100%"
          v-model="form.taxpayer.rdo_code"
          placeholder="Select Revenue District Office"
        >
          <a-select-option
            v-for="(item, index) in rdos"
            :key="index"
            :value="item.code"
          >{{item.code}} - {{item.description}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="Line of Business"
        :validate-status="validation_errors.line_of_business ? 'error':''"
        :help="validation_errors.line_of_business"
        has-feedback
        class="register-form-item"
      >
        <a-input
          class="text-uppercase"
          placeholder="Line of Business"
          v-model="form.taxpayer.line_of_business"
        />
      </a-form-item>
      <a-form-item
        label="Email Address"
        :validate-status="validation_errors.registered_email ? 'error':''"
        :help="validation_errors.registered_email"
        has-feedback
        class="register-form-item"
      >
        <a-input placeholder="Email Address" v-model="form.taxpayer.contact_details.email" />
      </a-form-item>
      <a-form-item label="Tel No" class="register-form-item">
        <a-input placeholder="Tel No" v-model="form.taxpayer.contact_details.telno" />
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
            class="text-uppercase"
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
            <a-radio-button value="c">CALENDAR</a-radio-button>
            <a-radio-button value="f">FISCAL</a-radio-button>
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
            <a-select-option v-for="(item, index) in months" :key="index" :value="index">{{item}}</a-select-option>
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
            class="text-uppercase"
            :disabled="loading"
            v-model="form.taxpayer.individual_details.firstName"
            placeholder="First Name"
            @change="updateRegName()"
          ></a-input>
          <a-input
            class="text-uppercase"
            :disabled="loading"
            v-model="form.taxpayer.individual_details.middleName"
            placeholder="Middle Name"
            @change="updateRegName()"
          ></a-input>
          <a-input
            class="text-uppercase"
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
          <a-radio-group buttonStyle="solid" v-model="form.taxpayer.individual_details.gender">
            <a-radio-button value="M">MALE</a-radio-button>
            <a-radio-button value="F">FEMALE</a-radio-button>
          </a-radio-group>
        </a-form-item>

        <a-form-item
          class="register-form-item"
          label="Citizenship"
          :validate-status="validation_errors.citizenship ? 'error':''"
          :help="validation_errors.citizenship"
          has-feedback
        >
          <a-input
            class="text-uppercase"
            placeholder="Citizenship"
            v-model="form.taxpayer.individual_details.citizenship"
          ></a-input>
        </a-form-item>
      </span>
      <a-form-item
        class="register-form-item"
        label="Registered Address"
        :validate-status="validation_errors.address ? 'error':''"
        :help="validation_errors.address"
        has-feedback
      >
        <a-textarea
          class="text-uppercase"
          rows="4"
          v-model="form.taxpayer.address"
          placeholder="Registered Address"
        ></a-textarea>
      </a-form-item>
      <a-form-item
        class="register-form-item"
        label="Zip Code"
        :validate-status="validation_errors.zipCode ? 'error':''"
        :help="validation_errors.zipCode"
        has-feedback
      >
        <a-input placeholder="Zip Code" v-model="form.taxpayer.address_details.zipCode"></a-input>
      </a-form-item>
    </a-form>
    <a-divider></a-divider>
    <a-row>
      <a-col :span="24" align="right">
        <a-button-group>
          <a-button size="large" ghost type="primary" icon="close" :disabled="loading">Cancel</a-button>
          <a-button size="large" type="primary" icon="save" @click="save" :loading="loading">Save</a-button>
        </a-button-group>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
export default {
  components: { VueRecaptcha },
  data() {
    return {
      isConfPassVisible: false,
      isPassVisible: false,
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
          contact_details: {},
          address_details: {},
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
      ],
      validate_password_status: ""
    };
  },
  watch: {
    signup_visible(val) {
      if (!val) {
        this.form = {
          name: {},
          taxpayer: {
            individual_details: {},
            contact_details: {},
            address_details: {},
            taxpayer_type: "C",
            accounting_type: "c",
            start_month: 0
          }
        };
        this.validation_errors = {};
        this.validate_password_status = "";
        this.step = 0;
      }
    }
  },
  methods: {
    save() {
      this.loading = true;
      this.form.taxpayer.user_id = this.$store.state.account_session.user.account_id;
      this.$http
        .post(`/taxpayer`, this.form.taxpayer)
        .then(result => {
          // alert(JSON.stringify(result))
          this.loading = false;
          this.$notification.success({
            message: "New Taxpayer Created",
            description: `TIN: ${this.form.taxpayer.tin}`
          });
          this.$router.push("/app/taxpayer");
          //create activity
          var act = {
            created_by: {
              account_id: this.$store.state.account_session.user.account_id,
              display_name: `${this.$store.state.account_session.user.name.first} ${this.$store.state.account_session.user.name.last}`,
              avatar: {},
              tin: this.form.taxpayer.tin
            },
            activity: "1",
            description: `New taxpayer added ${
              this.form.taxpayer.registered_name
            } TIN: (${this.formatTIN(this.form.taxpayer.tin)})`
          };
          return this.$http.post(
            `/activities/${this.$store.state.account_session.user.account_id}`,
            act
          );
        })
        .then(result => {
          console.log(`RES::::`, JSON.stringify(result.data));
          // alert(success)
        })
        .catch(err => {
          console.log("err :", err);
          this.loading = false;
        });
    },
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
      var errorOnStep1 = false;

      // Step 1
      // this.checkPassword();
      if (!this.form.name.first) {
        this.validation_errors.first_name = "Please input first name";
      }
      if (!this.form.name.last) {
        this.validation_errors.last_name = "Please input last name";
      }
      if (!this.form.email) {
        this.validation_errors.email = "Please input email";
      }

      errorOnStep1 =
        this.validation_errors && Object.keys(this.validation_errors).length;

      // Step 2
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
      if (!this.form.taxpayer.contact_details.email) {
        this.validation_errors.registered_email = "Email Address is required.";
      }
      if (!this.form.taxpayer.address) {
        this.validation_errors.address = "Registered Address is required.";
      }
      if (!this.form.taxpayer.address_details.zipCode) {
        this.validation_errors.zipCode = "Zip Code is required.";
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
        // if (parseInt(this.form.taxpayer.start_month) > -1) {
        //   this.validation_errors.start_month = "Start Month is required.";
        // }
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
        if (!this.form.taxpayer.individual_details.birthDate) {
          this.validation_errors.birth_date = "Date of Birth is required.";
        }
        if (!this.form.taxpayer.individual_details.gender) {
          this.validation_errors.gender = "Gender is required.";
        }
        if (!this.form.taxpayer.individual_details.citizenship) {
          this.validation_errors.citizenship = "Citizenship is required.";
        }
      }

      if (this.validation_errors && Object.keys(this.validation_errors).length)
        this.step = errorOnStep1 ? 0 : 1;
    },
    checkPassword() {
      delete this.validation_errors.password;
      this.validate_password_status = "";

      if (!this.form.password) {
        this.validation_errors.password = "Please input password";
        this.validate_password_status = "error";
      } else if (!this.validate_password) {
        this.validation_errors.password = "Invalid Password";
        this.validate_password_status = "error";
      } else {
        delete this.validation_errors.password;
        this.validate_password_status = "success";
        if (this.form.password !== this.form.confirm) {
          this.validation_errors.confirm_password =
            "Password and Confirm Password does not match";
        }
      }
    },
    register(e) {
      // console.log("this.validate() :", this.validate());
      this.validate();
      console.log("this.validation_errors :", this.validation_errors);
      if (
        !this.validation_errors ||
        !Object.keys(this.validation_errors).length
      ) {
        this.loading = true;
        console.log("Received values of form: ", this.form);
        this.$store
          .dispatch("SIGNUP", this.form)
          .then(result => {
            console.log("SIGNUP result :", result);
            if (!result.error) {
              this.$notification.success({
                message: "Registration success.",
                description: `Please confirm your account in ${this.form.email}`
              });
              this.signup_visible = false;
            } else {
              this.$notification.error({
                message: "Validation Error",
                description: result.error.message || result.error,
                icon: <a-icon type="close-circle" style="color: red" />
              });
            }
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
          });
      }
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
    },
    getRdoByCode(code) {
      if (code && this.rdos && this.rdos.length) {
        var rdo = this.rdos.find(v => v.code === code);
        return rdo ? `${rdo.code} - ${rdo.description}` : "";
      }
      return "";
    },
    getTaxpayerType(type) {
      if (type && type === "C") return "CALENDAR";
      else if (type && type === "F") return "FISCAL";
      else return "";
    }
  },
  created() {
    this.$http
      .get(`${process.env.VUE_APP_BASE_API_URI}reference/rdos`)
      .then(result => {
        console.log(result.data);
        this.rdos = result.data;
        this.rdos.sort(function(a, b) {
          return a.code - b.code;
        });
      });
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

.text-uppercase {
  text-transform: uppercase;
}
</style>