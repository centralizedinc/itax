<template>
  <div
    style="background: url(https://www.ilboe.org/wp-content/uploads/2019/05/Analytics-Background-2019.jpg) no-repeat center; background-size: cover;"
  >
    <!-- <div style="background: linear-gradient(to left, #000046, #1cb5e0);"> -->
    <a-row
      style="height:100vh"
      type="flex"
      justify="space-around"
      align="middle"
    >
      <a-col :xs="{ span: 0 }" :lg="{ span: 7 }">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Bureau_of_Internal_Revenue_%28BIR%29.svg/1200px-Bureau_of_Internal_Revenue_%28BIR%29.svg.png"
          alt=""
          style="height: 100%; width: 100%;"
        />
      </a-col>
      <a-col
        :xs="{ span: 24 }"
        :sm="{ span: 18, offset: 3 }"
        :md="{ span: 16, offset: 4 }"
        :lg="{ span: 9, offset: 1 }"
      >
        <a-card style="background: white; margin: 0 2vh;">
          <template slot="title">
            <div class="login-text">Administrator Login</div>
          </template>
          <a-form>
            <a-form-item>
              <a-input
                @keypress.enter="login"
                :disabled="loading"
                v-model="account.email"
                size="large"
                placeholder="Username"
              >
                <a-icon slot="prefix" type="mail" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                @keypress.enter="login"
                :disabled="loading"
                v-model="account.password"
                size="large"
                placeholder="Password"
                :type="reveal ? 'text' : 'password'"
              >
                <a-icon slot="prefix" type="lock" />
                <a-icon
                  slot="suffix"
                  :type="reveal ? 'eye' : 'eye-invisible'"
                  @click="reveal = !reveal"
                  style="cursor:pointer"
                />
              </a-input>
            </a-form-item>
            <a-form-item :help="error" :validate-status="error ? 'error' : ''">
              <a-button
                size="large"
                block
                style="background: linear-gradient(to left,#000046, #1cb5e0); color: white; font-weight: bold"
                :loading="loading"
                @click="login"
                >LOGIN</a-button
              >
            </a-form-item>
          </a-form>
        </a-card>
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
      account: {
        email: "",
        password: ""
      },
      error: "",
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
      this.error = "";
      this.$store
        .dispatch("GET_RDOS")
        .then(result => {
          if (
            this.account.email === "admin" &&
            this.account.password === "admin"
          ) {
            this.$store.commit("LOGIN_ADMIN", this.account.email);
            this.$router.push("/admin/app");
            this.loading = false;
          } else if (
            this.account.email.indexOf("admin_rdo") > -1 &&
            this.account.password === "admin"
          ) {
            var rdo = this.account.email.split("admin_rdo")[1];
            console.log("rdo :", rdo);
            if (
              this.$store.state.tax_form.rdos.findIndex(v => v.code === rdo) >
              -1
            ) {
              this.$store.commit("LOGIN_ADMIN", this.account.email);
              this.$store.commit("LOGIN_RDO", rdo);
              this.$router.push("/admin/app");
            } else {
              this.error = "Invalid Username or Password";
            }
            this.loading = false;
          } else {
            this.error = "Invalid Username or Password";
            this.loading = false;
          }
        })
        .catch(err => {
          this.error = "Failed to load data.";
          this.loading = false;
        });
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

.login-text {
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(to left, #000046, #1cb5e0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
