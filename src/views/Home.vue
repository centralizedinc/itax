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
          <a-button ghost block @click="signup_visible=true" type="link">Register</a-button>
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
      v-model="signup_visible"
      title="Register"
      okText="Submit"
      @ok="register"
      @cancel="signup_visible=false"
    >
      <template slot="footer">
        <a-button key="back" @click="signup_visible=false" :disabled="loading">Cancel</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="register">Submit</a-button>
      </template>
      <a-row type="flex" justify="center" :gutter="16">
        <a-col :span="24">
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
        </a-col>
        <a-col :span="24">
          <a-form>
            <a-form-item
              :validate-status="validation.name.first.status"
              :help="validation.name.first.message"
            >
              <a-input
                @keypress.enter="register"
                :disabled="loading"
                v-model="form.name.first"
                placeholder="First Name"
              ></a-input>
            </a-form-item>
            <a-form-item
              :validate-status="validation.name.last.status"
              :help="validation.name.last.message"
            >
              <a-input
                @keypress.enter="register"
                :disabled="loading"
                v-model="form.name.last"
                placeholder="Last Name"
              ></a-input>
            </a-form-item>
            <a-form-item
              :validate-status="validation.email.status"
              :help="validation.email.message"
            >
              <a-input
                @keypress.enter="register"
                :disabled="loading"
                v-model="form.email"
                placeholder="Email"
              ></a-input>
            </a-form-item>
            <a-form-item
              :validate-status="validation.password.status"
              :help="validation.password.message"
            >
              <a-input
                @keypress.enter="register"
                :disabled="loading"
                v-model="form.password"
                placeholder="Password"
                type="password"
              ></a-input>
            </a-form-item>
            <a-form-item
              :validate-status="validation.confirm.status"
              :help="validation.confirm.message"
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
        </a-col>
      </a-row>
    </a-modal>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      signup_visible: false,
      visible: false,
      topLocation: 0,
      reveal: false,
      form: {
        name: {}
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
    handleScroll(event) {
      // Any code to be executed when the window is scrolled
      console.log("event ::: ", JSON.stringify(window.top.scrollY));
      this.topLocation = window.top.scrollY;
    },
    registerFacebook() {
      window.open(
        `${process.env.VUE_APP_BASE_API_URI}/oauth/facebook`,
        "",
        "width=500,height=450"
      );
      this.signup_visible = false;
    },
    registerGoogle() {
      window.open(
        `${process.env.VUE_APP_BASE_API_URI}/oauth/google`,
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