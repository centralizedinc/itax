<template>
  <a-row :gutter="5">
    <a-col :span="19">
      <a-card>
        <div v-if="fetching_data" style="width: 100%;" class="align-items-middle">
          <a-spin />
        </div>
        <template v-else>
          <a-tabs @change="changeView" :activeKey="currentView">
            <a-tab-pane :disabled="loading || currentView===4" :key="0" tab="Personal Details" />
            <a-tab-pane :disabled="loading || currentView===4" :key="1" tab="Taxpayer Information" />
            <a-tab-pane
              :disabled="loading || currentView===4"
              v-if="show_spouse"
              :key="2"
              tab="Spouse Details"
            />
            <a-tab-pane
              :disabled="loading || currentView===4"
              v-if="show_company"
              :key="3"
              tab="Company Details"
            />
            <a-tab-pane :disabled="loading || currentView!==4" :key="4" tab="Connections" />

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
    </a-col>
    <a-col :span="5">
      <a-affix :offsetTop="100">
        <a-card>
          <a-steps direction="vertical" :current="currentView">
            <a-step title="Personal Details" description="This is a description." />
            <a-step title="Taxpayer Information" description="This is a description." />
            <a-step title="Spouse Details" description="This is a description." />
            <a-step title="Company Details" description="This is a description." />
            <a-step title="Connections" description="This is a description." />
          </a-steps>
        </a-card>
      </a-affix>
    </a-col>
  </a-row>
</template>

<script>
import PersonalDetails from "./PersonalDetails";
import TaxpayerInformation from "./TaxpayerInformation";
import Connections from "./Connections";
import SpouseDetails from "./SpouseDetails";
import CompanyDetails from "./CompanyDetails";
import moment from "moment";

export default {
  components: {
    PersonalDetails,
    TaxpayerInformation,
    Connections,
    SpouseDetails,
    CompanyDetails
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
        },
        spouse_details: {
          is_exist: false,
          tin: "",
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
        },
        company_details: {
          is_exist: false,
          tin: "",
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
        }
      },
      currentView: 0,
      view_components: [
        "PersonalDetails",
        "TaxpayerInformation",
        "SpouseDetails",
        "CompanyDetails",
        "Connections"
      ]
    };
  },
  computed: {
    user() {
      return this.deepCopy(this.$store.state.account_session.user);
    },
    show_spouse() {
      return this.details.taxpayer.individual_details.civil_status === "M";
    },
    show_company() {
      return ["sp", "p", "em"].includes(this.details.taxpayer.filer_type);
    }
  },
  methods: {
    init() {
      console.log("this.currentView :", this.currentView);
      this.details.user.name = this.user.name;
      this.avatar.image_url = this.user.avatar ? this.user.avatar.location : "";
      this.details.user.avatar = this.user.avatar;
      this.details.user.email = this.user.email;
      this.details.taxpayer.individual_details.firstName = this.user.name.first;
      this.details.taxpayer.individual_details.lastName = this.user.name.last;
      this.details.taxpayer.contact_details.email = this.user.email;
      this.details.taxpayer.taxpayer_type = "I";
      this.details.taxpayer.registered_name = `${this.details.taxpayer.individual_details.firstName} ${this.details.taxpayer.individual_details.middleName} ${this.details.taxpayer.individual_details.lastName}`;
      if (this.user.tin) {
        this.fetching_data = true;
        this.$store
          .dispatch("GET_TAXPAYER_BY_TIN", { tin: this.user.tin })
          .then(result => {
            this.details.taxpayer = result.taxpayer;
            this.details.taxpayer.individual_details.birthDate = moment(
              this.details.taxpayer.individual_details.birthDate
            );
            this.details.taxpayer.registered_name = `${this.details.taxpayer.individual_details.firstName} ${this.details.taxpayer.individual_details.middleName} ${this.details.taxpayer.individual_details.lastName}`;
            this.fetching_data = false;
          })
          .catch(err => {
            console.log("GET_TAXPAYER_BY_TIN err :", err);
            this.fetching_data = false;
          });
      }
    },
    next(i) {
      console.log("i :", i);
      if (i === 4) {
        var _self = this;
        this.$confirm({
          title: "Do you want to save the informations?",
          okText: "Yes",
          cancelText: "Cancel",
          onOk() {
            _self.submitTaxpayer();
          },
          confirmLoading: _self.loading
        });
      } else this.currentView = i;
    },
    changeView(key) {
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
          this.currentView = 4;
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