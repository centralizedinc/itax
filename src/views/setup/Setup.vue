<template>
  <a-card>
    <div v-if="fetching_data" style="width: 100%;" class="align-items-middle">
      <a-spin />
    </div>
    <template v-else>
      <a-tabs @change="changeView" :activeKey="currentView">
        <a-tab-pane :disabled="loading || currentView===2" :key="0" tab="Personal Details" />
        <a-tab-pane :disabled="loading || currentView===2" :key="1" tab="Taxpayer Information" />
        <a-tab-pane :disabled="loading || currentView!==2" :key="2" tab="Connections" />

        <a-button
          slot="tabBarExtraContent"
          type="primary"
          v-if="currentView===2"
          @click="showAddTP=true"
        >Add Taxpayer</a-button>
      </a-tabs>
      <component
        v-bind:is="view_components[currentView]"
        :details="details"
        :full="true"
        :loading="loading"
        :showAddTP="showAddTP"
        :avatar="avatar"
        @showAddTP="showAddTP=$event"
        @next="next"
        @previous="next"
        @submitTaxpayer="submitTaxpayer"
      />
    </template>
  </a-card>
</template>

<script>
import PersonalDetails from "./PersonalDetails";
import TaxpayerInformation from "./TaxpayerInformation";
import Connections from "./Connections";
import moment from 'moment';

export default {
  components: {
    PersonalDetails,
    TaxpayerInformation,
    Connections
  },
  data() {
    return {
      moment,
      fetching_data: false,
      showAddTP: false,
      loading: false,
      avatar: {
        image_url: "",
        form_data: ""
      },
      details: {
        user: {
          avatar: {},
          name: {
            first: "",
            middle: "",
            last: "",
            email: ""
          }
        },
        taxpayer: {
          tin: "",
          taxpayer_type: "",
          rdo_code: "",
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
          }
        }
      },
      currentView: 0,
      view_components: ["PersonalDetails", "TaxpayerInformation", "Connections"]
    };
  },
  computed: {
    user() {
      return this.deepCopy(this.$store.state.account_session.user);
    }
  },
  methods: {
    init() {
      console.log("this.currentView :", this.currentView);
      this.fetching_data = true;
      this.details.user.name = this.user.name;
      this.avatar.image_url = this.user.avatar ? this.user.avatar.location : "";
      this.details.user.avatar = this.user.avatar;
      this.details.user.email = this.user.email;
      if (this.user.tin) {
        this.$store
          .dispatch("GET_TAXPAYER_BY_TIN", this.user.tin)
          .then(result => {
            this.details.taxpayer = result.taxpayer;
            this.details.taxpayer.individual_details.birthDate = moment(this.details.taxpayer.individual_details);
            this.fetching_data = false;
          })
          .catch(err => {
            console.log('GET_TAXPAYER_BY_TIN err :', err);
            this.fetching_data = false;
          });
      } else {
        this.details.taxpayer.individual_details.firstName = this.user.name.first;
        this.details.taxpayer.individual_details.lastName = this.user.name.last;
        this.details.taxpayer.contact_details.email = this.user.email;
        this.details.taxpayer.taxpayer_type = "I";
      this.fetching_data = false;
      }
    },
    next(i) {
      this.currentView = i;
    },
    changeView(key) {
      console.log("key:::", key);
      this.currentView = key;
      window.scrollTo(0, 0);
    },
    submitTaxpayer() {
      this.loading = true;
      this.details.user.tin = this.details.taxpayer.tin;
      // if (!this.avatar.form_data)
      //   this.details.user.avatar = this.user.avatar;
      this.$store
        .dispatch("ACCOUNT_SETUP", {
          details: this.details,
          form_data: this.avatar.form_data
        })
        .then(result => {
          console.log("submitTaxpayer :", result);
          this.currentView = 2;
          this.loading = false;
        })
        .catch(err => {
          console.log("submitTaxpayer err :", err);
          this.loading = false;
        });
    }
  },
  created() {
    this.init();
  }
};
</script>

<style>
.align-items-middle {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>