<template>
  <a-layout>
    <a-back-top>
      <a-avatar>
        <a-icon type="up" :size="42"></a-icon>
      </a-avatar>
    </a-back-top>
    <a-layout-header class="header" :style="headerStyle">
      <a-row type="flex" justify="start" :gutter="8">
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
            <a style="color:#ffffff" href="https://www.facebook.com/RoderickDondonAlcala/">itax.ph</a>
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
          <a-form :form="form">
            <a-form-item>
              <a-input
                @keypress.enter="register"
                :disabled="loading"
                v-decorator="['name.first', { rules: [{ required: true, message: 'Please input your first name.' }] }]"
                placeholder="First Name"
              ></a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                @keypress.enter="register"
                :disabled="loading"
                v-decorator="['name.last', { rules: [{ required: true, message: 'Please input your last name.' }] }]"
                placeholder="Last Name"
              ></a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                @keypress.enter="register"
                :disabled="loading"
                v-decorator="['email', { rules: [{ required: true, message: 'Please input your email.' }] }]"
                placeholder="Email"
              ></a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                @keypress.enter="register"
                :disabled="loading"
                v-decorator="[
                  'password',
                  {
                    rules: [{
                      required: true, 
                      message: 'Please input your password.'
                    }, 
                    {
                      validator: validateToNextPassword
                    }]
                  }]"
                placeholder="Password"
                type="password"
              ></a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                @keypress.enter="register"
                :disabled="loading"
                v-decorator="[
                  'confirm',
                  {
                    rules: [{
                      required: true, 
                      message: 'Please confirm your password.'
                    }, 
                    {
                      validator: compareToFirstPassword
                    }]
                  }]"
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
      form: this.$form.createForm(this),
      loading: false
    };
  },
  watch: {
    signup_visible(val) {
      this.form.resetFields();
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
        `http://localhost:5000/oauth/facebook`,
        "",
        "width=500,height=450"
      );
      this.signup_visible = false;
    },
    registerGoogle() {
      window.open(
        `http://localhost:5000/oauth/google`,
        "",
        "width=500,height=450"
      );
      this.signup_visible = false;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    register(e) {
      this.loading = true;
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, account) => {
        if (!err) {
          console.log("Received values of form: ", account);
          this.$store
            .dispatch("SIGNUP", account)
            .then(result => {
              console.log("SIGNUP result :", result);
              this.$notification.open({
                message: "Registration success.",
                description: `Please confirm your account in ${account.email}`,
                icon: <a-icon type="check" style="color: blue" />
              });
              this.signup_visible = false;
              this.loading = false;
            })
            .catch(err => {
              this.loading = false;
            });
        } else this.loading = false;
      });
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  computed: {
    headerStyle() {
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