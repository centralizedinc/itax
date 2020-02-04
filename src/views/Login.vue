<template>
  <div>
    <!-- <div style="background-image:url('https://www.lucenacity.gov.ph/images/banner7.jpg'); height:100%;background-repeat: no-repeat;
    background-size: cover">-->
    <div style="background: linear-gradient(to left, #000046, #1cb5e0);">
      <a-row style="height:100vh" type="flex" justify="start">
        <a-col :push="1" :span="12" style="margin-top:20vh" data-aos="fade-up">
          <div style="font-size: 52px; color:#ffffff; ">Smart Tax.</div>
          <div style="font-size: 42px; color:#ffffff;">Tax Preparation Software.</div>
          <p
            style="margin-top:2vh; color:#ffffff"
          >Help individuals or companies prepare and file income, corporate tax returns. Tax made easy by walking the user through tax forms and calculates automatically tax obligations.</p>
          <a-button size="large" ghost>
            <a-icon type="download"></a-icon>Download & Install on PC
            <a-icon type="windows" />
          </a-button>
          <a-row :gutter="24" style="margin-top:5vh">
            <p style="color:#FFFFFF">Also available on:</p>
            <a-col :span="4" width="100" style="margin-top:1.5vh">
              <img src="@/assets/app_store.svg" />
            </a-col>
            <a-col :span="5">
              <img src="@/assets/google-play.png" width="150" />
            </a-col>
          </a-row>
        </a-col>
        <a-col :push="2" :span="8" style="margin-top:20vh;">
          <a-card style="background: rgba(59, 79, 99, 0.62)">
            <template slot="title">
              <div style="color:#ffffff">Enter Crendetials</div>
            </template>
            <a-form :form="form">
              <a-form-item>
                <a-input
                  @keypress.enter="login"
                  :disabled="loading"
                  v-decorator="['email', { rules: [{ required: true, message: 'Please input your email.' }] }]"
                  size="large"
                  placeholder="Email"
                >
                  <a-icon slot="prefix" type="mail" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input
                  @keypress.enter="login"
                  :disabled="loading"
                  v-decorator="['password', { rules: [{ required: true, message: 'Please input your password.' }] }]"
                  size="large"
                  placeholder="Password"
                  :type="reveal?'text':'password'"
                >
                  <a-icon slot="prefix" type="lock" />
                  <a-icon
                    slot="suffix"
                    :type="reveal?'eye':'eye-invisible'"
                    @click="reveal=!reveal"
                    style="cursor:pointer"
                  />
                </a-input>
              </a-form-item>
              <a-button size="large" block type="primary" :loading="loading" @click="login">Submit</a-button>
              <a-col :span="24" align="center" style="margin-top: 20px">
                  <a style="color:#FFFFFF">Forgot Password?</a>
                </a-col>

              <!-- <p style="color:white">Login using facebook or google accounts</p> -->
              <a-row type="flex" gutter="16" style="margin-top:10px">
                <a-divider style="color:#FFFFFF; font-size:12px"></a-divider>
                <!-- <a-col :span="24">
                  <a-button
                  size="small"
                    block
                    :disabled="loading"
                    style="border: #4267B2;background-color:#4267B2; color:#FFFFFF"
                    @click="registerFacebook"
                  >
                    <a-icon type="facebook"></a-icon>Facebook
                  </a-button>
                </a-col>
                <a-col :span="24">
                  <a-button
                  size="small"
                    block
                    :disabled="loading"
                    @click="registerGoogle"
                    style="margin-top: 1vh; border: #DE4935;background-color:#DE4935; color:#FFFFFF"
                  >
                    <a-icon type="google"></a-icon>Google
                  </a-button>
                </a-col> -->
                <a-col :span="24" >
                  <a style="color:#FFFFFF">Don't have a SmartTax account? Sign-up</a>
                </a-col>
                
              </a-row>
            </a-form>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <a-row
      :gutter="16"
      type="flex"
      align="middle"
      style="margin-top:10vh; margin-left:5vh; margin-right:5vh"
    >
      <a-col :span="8">
        <a-card title="News/Announcements">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <a-divider></a-divider>
          <a-button type="primary" @click="$router.push('/news')">Read More</a-button>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="Permits and Certificates">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus iaculis urna id volutpat lacus laoreet non. Lectus mauris ultrices eros in cursus turpis. Consectetur a erat nam at lectus. Tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed. Ac turpis egestas maecenas pharetra. Donec pretium vulputate sapien nec. Scelerisque viverra mauris in aliquam.
          <a-divider></a-divider>
          <a-button type="primary" @click="$router.push('/permits')">Apply Now</a-button>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title=" Report Emergency/Calamity">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Convallis a cras semper auctor neque. Pharetra diam sit amet nisl suscipit adipiscing bibendum est. Sed risus ultricies tristique nulla aliquet enim tortor at auctor. Congue nisi vitae suscipit tellus mauris a diam maecenas sed. Congue nisi vitae suscipit tellus mauris a. Viverra adipiscing at in tellus integer feugiat. Etiam sit amet nisl purus in. Curabitur gravida arcu ac tortor dignissim. Magna fermentum iaculis eu non diam phasellus vestibulum.
          <a-divider></a-divider>
          <a-button type="primary">Report</a-button>
        </a-card>
      </a-col>
    </a-row>
    <a-row
      :gutter="16"
      type="flex"
      align="middle"
      style="margin-top:10vh; margin-left:5vh; margin-right:5vh;"
    >
      <a-col :span="24">
        <h1>News/Announcements</h1>
        <a-divider></a-divider>
      </a-col>
      <a-col :span="14">
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
      </a-col>
      <a-col :span="8">
        <img
          src="https://support.apple.com/library/content/dam/edam/applecare/images/en_US/icloud/macos-mojave-ios12-macbook-ipad-pro-iphone-x-set-up-icloud-drive-hero.jpg"
          width="100%"
        />
      </a-col>
    </a-row>
    <a-row
      :gutter="16"
      type="flex"
      align="middle"
      style="margin-top:10vh; margin-left:5vh; margin-right:5vh"
    >
      <a-col :span="24">
        <h1>Permits and Certificates</h1>
        <a-divider></a-divider>
      </a-col>
      <a-col :span="8">
        <img
          width="100%"
          src="https://basecamp.com/assets/general/devices-medium-1047d88c14b1c02d9415d18799ccd289eb16d6733166b4529f317faeb28621c6.png"
          alt
        />
      </a-col>
      <a-col :span="14">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus at urna condimentum mattis pellentesque id nibh tortor id. Pharetra pharetra massa massa ultricies. Eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Interdum consectetur libero id faucibus nisl tincidunt eget. Sapien pellentesque habitant morbi tristique. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Facilisis gravida neque convallis a cras semper auctor. Vitae nunc sed velit dignissim. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl.</p>
        <p>Malesuada fames ac turpis egestas integer eget aliquet. Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Tortor consequat id porta nibh venenatis cras sed. Adipiscing at in tellus integer feugiat scelerisque varius morbi. Cursus mattis molestie a iaculis at. Facilisis mauris sit amet massa vitae tortor condimentum lacinia. Neque egestas congue quisque egestas diam in arcu cursus euismod. Pharetra magna ac placerat vestibulum lectus. Sit amet tellus cras adipiscing enim eu turpis egestas. Viverra tellus in hac habitasse.</p>
      </a-col>
    </a-row>
    <a-row
      :gutter="16"
      type="flex"
      align="middle"
      style="margin-top:10vh; margin-left:5vh; margin-right:5vh; margin-bottom:10vh"
    >
      <a-col :span="24">
        <h1>Report Emergency/Calamity</h1>
        <a-divider></a-divider>
      </a-col>
      <a-col :span="14">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu turpis egestas pretium aenean. Interdum varius sit amet mattis vulputate enim nulla. Egestas integer eget aliquet nibh praesent tristique magna sit amet. Odio tempor orci dapibus ultrices in iaculis nunc. Tempor id eu nisl nunc mi ipsum faucibus vitae aliquet. Ac feugiat sed lectus vestibulum mattis. Aliquet nec ullamcorper sit amet. Feugiat vivamus at augue eget arcu. Faucibus et molestie ac feugiat sed lectus vestibulum. Tristique nulla aliquet enim tortor at auctor urna. Id eu nisl nunc mi ipsum faucibus vitae aliquet nec. Arcu non odio euismod lacinia at quis risus. Eget sit amet tellus cras adipiscing enim eu turpis egestas. A cras semper auctor neque vitae tempus quam. Vitae justo eget magna fermentum iaculis eu non diam phasellus.</p>
        <p>Laoreet suspendisse interdum consectetur libero id faucibus. Morbi tristique senectus et netus et malesuada. Mi bibendum neque egestas congue. Neque sodales ut etiam sit amet nisl purus in mollis. Vitae et leo duis ut diam quam nulla. Convallis posuere morbi leo urna molestie. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Platea dictumst quisque sagittis purus sit amet volutpat consequat mauris. Id consectetur purus ut faucibus pulvinar elementum integer. Id aliquet lectus proin nibh nisl. Adipiscing diam donec adipiscing tristique risus nec.</p>
      </a-col>
      <a-col :span="8">
        <img
          width="100%"
          src="https://bjango.com/images/mac/skalapreview2/skala-preview-hero.jpg"
          alt
        />
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reveal: false,
      form: this.$form.createForm(this),
      loading: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$aos.refresh();
    },
    login() {
      this.loading = true;
      this.form.validateFieldsAndScroll((err, account) => {
        if (!err) {
          console.table([account]);
          this.$store
            .dispatch("LOGIN", account)
            .then(result => {
              this.$notification.open({
                message: "Login success.",
                icon: <a-icon type="check" style="color: blue" />
              });
              this.loading = false;
              this.$router.push("/app");
            })
            .catch(err => {
              this.$notification.open({
                message: err.message,
                icon: <a-icon type="exclamation" style="color: red" />
              });
              this.loading = false;
            });
        } else this.loading = false;
      });
    },
    registerFacebook() {
      var left = (screen.width - 500) / 2;
      var top = (screen.height - 450) / 4;
      window.open(
        `${process.env.VUE_APP_BASE_API_URI}oauth/facebook`,
        "",
        `width=500,height=450,top=${top},left=${left}, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no`
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
    }
  }
};
</script>

<style>
.login-background {
  background-image: url("https://img.efrennolasco.com/2016/03/File-Income-tax-in-the-Philippines.jpg");
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>