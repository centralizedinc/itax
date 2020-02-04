<template>
  <a-layout>
    <a-back-top>
      <a-avatar>
        <a-icon type="up" :size="42"></a-icon>
      </a-avatar>
    </a-back-top>
    <a-layout-header class="header" :style="headerStyle">
      <a-row type="flex" justify="start" :gutter="8" data-aos="fade-up">
        <!-- <a-col :span="2">
          <a-avatar style="cursor:pointer" @click="$router.push('/')" src="https://www.lucenacity.gov.ph/img/Lucena_Seal200.png" :size="50"></a-avatar>
        </a-col>-->
        <a-col :span="4">
          <h2 style="color:white;">Smart Tax</h2>
        </a-col>
        <!-- <a-col :span="8">
          <a-tabs :tabBarStyle="{color:red}">
            <a-tab-pane key="1" tab="Home"></a-tab-pane>
            
          </a-tabs>
        </a-col>-->

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
    <a-modal :width="800"
      v-model="signup_visible"
      title="Create your new SmartTax account"
      okText="Submit"
      @ok="register"
      @cancel="signup_visible=false"
    >
      <template slot="footer">
        <a-button size="large" key="back" @click="step--; verified_recaptcha=false" :disabled="loading || step<1" icon="left">Back</a-button>
        <a-button size="large" type="primary" ghost :loading="loading" @click="step++" v-if="step<2">Next <a-icon type="right"/></a-button>
        <a-button size="large" key="submit" type="primary" :loading="loading" @click="recaptcha" v-else :disabled="!verified_recaptcha">Submit</a-button>
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
        </a-col> -->
         <a-col :span="10">
           <a-card>
            <a-steps size="small" direction="vertical" :current="step">
              <a-step style="height:130px" title="Create Account" description="Fill-up the following details for your personal SmartTax Account"></a-step>
              <a-step style="height:170px" title="Add Taxpayer" description="Create a new or search for existing taxpayers.You can add more than one taxpayer per account once you are already logged-in."></a-step>
              <a-step style="height:150px" title="Summary" description="Please check your registration details and enter the re-captcha to end the process."></a-step>
            </a-steps>
          </a-card>
         </a-col>
        <a-col :span="14">
          <a-card v-if="step===0">
          <a-form>
            <a-form-item label="First Name"
              :validate-status="validation.name.first.status"
              :help="validation.name.first.message"
            >
              <a-input
                :disabled="loading"
                v-model="form.name.first"
                placeholder="Enter First Name"
              ></a-input>
            </a-form-item>
            <a-form-item label="Last Name"
              :validate-status="validation.name.last.status"
              :help="validation.name.last.message"
              style="margin-top:-30px"
            >
              <a-input
                :disabled="loading"
                v-model="form.name.last"
                placeholder="Last Name"
              ></a-input>
            </a-form-item>
            <a-form-item label="Email Address"
              :validate-status="validation.email.status"
              :help="validation.email.message"
              style="margin-top:-30px"
            >
              <a-input
                :disabled="loading"
                v-model="form.email"
                placeholder="Email"
              ></a-input>
            </a-form-item>
            <a-form-item label="Password"
              :validate-status="validation.password.status"
              :help="validation.password.message"
              style="margin-top:-30px"
            >
            <a-tooltip>
              <template slot="title">                
                <div><a-badge dot :status="pass_upper"></a-badge> Atleast one (1) capital letter</div>
                <div><a-badge dot :status="pass_number"></a-badge> Atleast one (1) numeric character</div>
                <div><a-badge dot :status="pass_special"></a-badge> Atleast one (1) special character</div>
                <div><a-badge dot :status="pass_length"></a-badge> 8-20 Characters</div>
              </template>
              <a-input
                :disabled="loading"
                v-model="form.password"
                placeholder="Create a Password"
                type="password"
              ></a-input>
              </a-tooltip>
            </a-form-item>
            <a-form-item label="Confirm Password"
              :validate-status="validation.confirm.status"
              :help="validation.confirm.message"
              style="margin-top:-30px"
            >
              <a-input 
                @keypress.enter="register"
                :disabled="loading"
                v-model="form.confirm"
                placeholder="Confirm Password"
                type="password"
                
              ></a-input>
            </a-form-item>
          </a-form>
          </a-card>

        <!-- STEP#2 -->
        <a-card v-if="step===1">
          
          <a-form>
            <a-form-item label="Taxpayer Type">
              <a-radio-group buttonStyle="solid" style="width:100%" v-model="form.taxpayer.type">
                <a-radio-button value="I">Individual</a-radio-button>
                <a-radio-button value="C">Corporate</a-radio-button>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="Tax Identification Number"
              :validate-status="validation.name.first.status"
              :help="validation.name.first.message"
              style="margin-top:-30px"
            >
              <a-input-number style="width:100%"
                v-model="form.taxpayer.tin"
                :formatter="formatTIN"
                :parser="value => value.replace(/-/g,'')"
                placeholder="TIN with 4-digit branch code (eg. 123-456-789-0000)"
                
              ></a-input-number>
            </a-form-item>
            <a-form-item
              label="RDO"
              style="margin-top:-30px"
            >
              <a-select style="width: 100%" placeholder="Select Regional District Office" >
                <a-select-option
                v-model="form.taxpayer.rdo_code"
                  v-for="(item, index) in rdos"
                  :key="index"
                  :value="item.code"
                >{{item.code}} - {{item.description}}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
                label="Line of Business"
                style="margin-top:-30px"
              >
                <a-input placeholder="Line of Business" v-model="form.taxpayer.line_of_business"/>
              </a-form-item>

            
            <span v-if="form.type == 'C'">
            <a-form-item label="Taxpayer Name" 
              :validate-status="validation.name.last.status"
              :help="validation.name.last.message"
              style="margin-top:-30px"
              
            >
              <a-input 
                :disabled="loading"
                v-model="form.taxpayer.registered_name"
                placeholder="Registered Business Name"
              ></a-input>
            </a-form-item>
            <a-form-item label="Date of Incorporation">
              <a-date-picker
            style="width:100%"
            placeholder="Date Incorporation"
          ></a-date-picker>
            </a-form-item>
            <a-form-item label="Accounting Type">
              <a-radio-group buttonStyle="solid" v-model="form.taxpayer.accounting_type">
                <a-radio-button value="c">Calendar</a-radio-button>
                <a-radio-button value="f">Fiscal</a-radio-button>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="Start Month">
              <a-select
            style="width: 100%"
            @change="selectStartMonth"
            v-model="form.taxpayer.start_month"
          >
            <a-select-option v-for="(item, index) in months" :key="index" :value="index">{{item}}</a-select-option>
          </a-select>
            </a-form-item>
            
            </span>
              <span v-else>
                <a-form-item label="Taxpayer Name"
              :validate-status="validation.name.last.status"
              :help="validation.name.last.message"
              style="margin-top:-30px"
            >
              <a-input
                :disabled="loading"
                v-model="form.taxpayer.first_name"
                placeholder="First Name"
              ></a-input>
              <a-input
                :disabled="loading"
                v-model="form.taxpayer.middle_name"
                placeholder="Middle Name"
              ></a-input>
              <a-input
                :disabled="loading"
                v-model="form.taxpayer.last_name"
                placeholder="Last Name"
              ></a-input>
               </a-form-item>
              <a-form-item
              label="Select Filer Type"
            >
              <a-radio-group v-model="form.taxpayer.filer_type">
                <a-radio value="sp">Single Proprietor</a-radio>
                <a-radio value="p">Professional</a-radio>
                <a-radio value="em">Employee</a-radio>
                <a-radio value="e">Estate</a-radio>
                <a-radio value="t">Trust</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="Date of Birth" >
              <a-date-picker style="width:100%" placeholder="Date of Birth" v-model="form.taxpayer.birth_date"/>
            </a-form-item>
            <a-form-item
                label="Gender"
              >
                <a-radio-group buttonStyle="solid" v-model="form.taxpayer.gender">
                  <a-radio-button value="M">Male</a-radio-button>
                  <a-radio-button value="F">Female</a-radio-button>
                </a-radio-group>
              </a-form-item>
              <!-- <a-form-item label="Citizenship">
                <a-input v-model="form.taxpayer.citenzip"
                  placeholder="Citizenship"
                />
              </a-form-item> -->
              </span>
           
            
          </a-form>
        </a-card>

        <!-- Step 3 -->
        <a-card v-if="step===2">
          <a-row>
            <a-row>
              <a-col :span="24" >
                <a-divider orientation="left">Account Details</a-divider>
              </a-col>
            </a-row>
            <a-col :span="12">
              <span>Account Name</span>
            </a-col>
            <a-col :span="12" align="right">
              <span>{{form.name.last}}, {{form.name.first}}</span>
            </a-col>
            <a-col :span="12">
              <span>Email Address</span>
            </a-col>
            <a-col :span="12" align="right">
              <span>{{form.email}}</span>
            </a-col>
            <a-col :span="24" >
                <a-divider orientation="left">Taxpayer Details</a-divider>
              </a-col>
              <a-col :span="12">
              <span>Taxpayer Identification Number</span>
            </a-col>
            <a-col :span="12" align="right">
              <span>{{form.email}}</span>
            </a-col>
            <a-col :span="12">
              <span>Registered Name</span>
            </a-col>
            <a-col :span="12" align="right">
              <span>{{form.email}}</span>
            </a-col>
            <a-col :span="12">
              <span>Regional District Office</span>
            </a-col>
            <a-col :span="12" align="right">
              <span>{{form.email}}</span>
            </a-col>
            <a-col :span="24" align="center">
             
            </a-col>
            
          </a-row>
        </a-card>

         <a-card v-if='step===2' style="margin-top:20px">
            <vue-recaptcha sitekey="6LeSh9UUAAAAAK22et0fYuD9IsilyzTyMPC4yH7I" @verify="verified_recaptcha=true">
            </vue-recaptcha>
          </a-card>
        </a-col>
      </a-row>
    </a-modal>
  </a-layout>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
export default {
  components: { VueRecaptcha },
  data() {
    return {
      verified_recaptcha:false,
      step:0,
      rdos:null,
      signup_visible: false,
      visible: false,
      topLocation: 0,
      reveal: false,
      form: {
        name: {},
        taxpayer:{}
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
      }
    };
  },
  watch: {
    signup_visible(val) {
      if (!val) this.form = { name: {} };
    }
  },
  methods: {
    showRegistration(){
      this.signup_visible=true;
      console.log(JSON.stringify(this.rdos))
      if(!this.rdos){
        this.$http.get(`${process.env.VUE_APP_BASE_API_URI}reference/rdos`)
        .then(result=>{
          console.log(result.data)
          this.rdos = result.data
          this.rdos.sort(function(a, b){return a.code - b.code});
        })
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
      if (!this.form.name.first) {
        this.validation.name.first.status = "error";
        this.validation.name.first.message = "Please input first name";
        return false;
      }
      if (!this.form.name.last) {
        this.validation.name.last.status = "error";
        this.validation.name.last.message = "Please input last name";
        return false;
      }
      if (!this.form.email) {
        this.validation.email.status = "error";
        this.validation.email.message = "Please input email";
        return false;
      }
      if (this.form.password) {
        if (this.form.confirm && this.form.password !== this.form.confirm) {
          this.validation.password.status = "error";
          this.validation.password.message =
            "Password and Confirm Password does not match";
          return false;
        }
      } else {
        this.validation.password.status = "error";
        this.validation.password.message = "Please input password";
        return false;
      }

      if (!this.form.confirm) {
        this.validation.confirm.status = "error";
        this.validation.confirm.message = "Please input confirm password";
        return false;
      }
      return true;
    },
    register(e) {
      this.loading = true;
      // console.log("this.validate() :", this.validate());
      if (this.validate()) {
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
    verifyCaptcha(response){
      alert(JSON.stringify(response))
  },
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
    pass_length(){
      return this.form.password && this.form.password.length > 7?'success':'error'
    },
    pass_upper(){
      var letters = /[A-Z]/;
      return this.form.password && this.form.password.match(letters)?'success':'error'
    },
    pass_number(){
      var num = /[0-9]/;
      return this.form.password && this.form.password.match(num)?'success':'error'
    },
    pass_special(){
      var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      return this.form.password && this.form.password.match(format)?'success':'error'
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
</style>