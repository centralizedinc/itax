<template>
  <a-layout style="background: linear-gradient(to top, #8e9eab, #eef2f3);">
    <a-layout-header class="header" style="height:12vh">
      <a-row type="flex" justify="start">
        <a-col :span="3">
          <h2 style="color:white;">Smart Tax.</h2>
        </a-col>
        <a-col :span="21" style="margin-top:2vh">
          <a-steps :current="curr_step" size="small">
            <a-step v-for="(item, index) in form_steps" :key="index">
              <b slot="title" style="color:#ffffff">{{item.title}}</b>
              <span slot="description" style="font-size:12px; color:#ffffff">{{item.description}}</span>
            </a-step>
          </a-steps>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content style="min-height:100vh; margin-top:15vh;">
      <a-card></a-card>
      <a-row :gutter="16" justify="center">
        <a-col :xs="0" :md="12">
          <!-- Form Display -->
          <a-affix
            :offsetTop="in_bottom ? -350: -200"
            :class="affix_computation? '' : 'prevent-affix'"
          >
            <a-card :bodyStyle="{'padding': '10px', 'box-shadow': '5px 5px #eee'}">
              <form-display ref="form_display_component" :type="form_type" :form="form" />
            </a-card>
          </a-affix>
        </a-col>
        <a-col :xs="0" :md="12" class="tax-form">
          <!-- Fill up forms -->
          <div ref="fillup_form">
            <a-card :bodyStyle="{ padding: '30px' }">
              <component
                ref="form_component"
                :is="curr_form"
                :form="form"
                :step="curr_step"
                :errors="errors"
                @error="setErrors"
                @loading="v=>loading=v"
                @updateForm="v=>form={...form, ...v}"
                @changeStep="v=>curr_step=v"
                @success="showSuccessForm"
              />
            </a-card>
          </div>
        </a-col>
      </a-row>
      <div class="float-button">
        <div class="float-content">
          <a-row type="flex" :gutter="10" align="middle" justify="center">
            <!-- Previous -->
            <a-col :span="4">
              <a-button
                icon="left"
                @click="curr_step--"
                :disabled="loading || curr_step === 0"
                v-if="curr_step > -1"
                type="primary"
              >Previous</a-button>
            </a-col>
            <!-- Download -->
            <a-col :span="4">
              <a-button
                icon="download"
                :disabled="loading"
                @click="$refs.form_display_component.download()"
              >Download</a-button>
            </a-col>
            <!-- Open -->
            <a-col :span="4">
              <a-button
                icon="printer"
                :disabled="loading"
                @click="$refs.form_display_component.open()"
              >Print</a-button>
            </a-col>
            <!-- Save as Draft -->
            <a-col :span="4">
              <a-button icon="save" :disabled="loading" @click="saveDraft()">Save as Draft</a-button>
            </a-col>
            <!-- Submit -->
            <a-col :span="4">
              <a-button icon="upload" type="primary" @click="submit()" :loading="loading">Submit</a-button>
            </a-col>
            <!-- Next -->
            <a-col :span="4">
              <a-button
                type="primary"
                :disabled="curr_step===form_steps.length-1 || loading"
                @click="$refs.form_component.validate()"
              >
                Next
                <a-icon type="right"></a-icon>
              </a-button>
            </a-col>
          </a-row>
        </div>
      </div>
      <!-- </a-card> -->
    </a-layout-content>
    <a-modal :visible="view_select" title="Select Taxpayer" :closable="false">
      <a-list itemLayout="horizontal" :dataSource="taxpayer_list" :loading="loading">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-card style="width:100%" class="tin_card" @click="select(index)">
            <a-row type="flex" align="middle">
              <a-col :span="22">
                <a-list-item-meta>
                  <p
                    slot="title"
                  >{{item.taxpayer_type=='I'?`${item.individual_details.lastName}, ${item.individual_details.firstName} ${item.individual_details.middleName ? item.individual_details.middleName : ''}`:'item.company_details.registered_name'}}</p>
                  <template slot="description">
                    <p>
                      <b>{{formatTIN(item.tin)}}</b>
                    </p>
                    <p>{{item.taxpayer_type=='I'?'Individual':'Non-Individual'}}</p>
                  </template>
                  <a-avatar
                    style="border: solid 1px #1cb5e0"
                    slot="avatar"
                    :src="getUserByTin(item.tin).avatar.location"
                    :size="64"
                  />
                </a-list-item-meta>
              </a-col>
              <a-col :span="2">
                <a-icon v-if="isSelected(index)" type="check" style="color:#115B95;font-size:24px"></a-icon>
              </a-col>
            </a-row>
          </a-card>
        </a-list-item>
      </a-list>
      <template slot="footer">
        <a-button type="primary" @click="fillup" :disabled="!taxpayer">Select</a-button>
      </template>
    </a-modal>
    <form-success
      :show="show_form_success"
      :details="return_details"
      @close="closeForm"
      @payment="proceedPayment"
    />
  </a-layout>
</template>

<script>
import FormSuccess from "./FormSuccess";
import FormDisplay from "@/components/FormDisplay.vue";
import Form2550M from "./2550m/2550m.vue";
import moment from "moment";
import Form1601E from "./1601e/1601e.vue";
import Form1700 from "./1700/1700.vue";
import Form1701A from "./1701a/1701a.vue";
import Form1706 from "./1706/1706.vue";
import Form2551Q from "./2551q/2551q.vue";
import Form1701Q from "./1701q/1701q.vue";
import Form2550Q from "./2550q/2550q.vue";
import Form2000OT from "./2000ot/2000ot.vue";
import Form1600WP from "./1600wp/1600wp.vue";
import Form1601F from "./1601f/1601f.vue";
import Form1606 from "./1606/1606.vue";
import Form1601FQ from "./1601fq/1601fq.vue";
import Form1601C from "./1601c/1601c.vue";
import Form1604E from "./1604e/1604e.vue";
import Form1604C from "./1604c/1604c.vue";
import Form1702EX from "./1702ex/1702ex.vue";

export default {
  components: {
    FormSuccess,
    FormDisplay,
    Form2550M,
    Form1601E,
    Form1700,
    Form1701A,
    Form1706,
    Form2551Q,
    Form1701Q,
    Form2550Q,
    Form2000OT,
    Form1600WP,
    Form1604E,
    Form1601F,
    Form1606,
    Form1601FQ,
    Form1601C,
    Form1604C,
    Form1702EX
  },
  computed: {
    affix_computation() {
      if (this.curr_step === 2) return true;
      else return false;
    },
    form_type() {
      const paths = this.$route.path.split("/");
      const form_type = paths[paths.length - 1];
      return form_type;
    },
    form_steps() {
      const steps = this.steps[this.form_type];
      return steps ? steps : this.default_steps;
    },
    curr_form() {
      return `Form${this.form_type.toUpperCase()}`;
    },
    existing_ref_no() {
      return this.$route.query.ref_no;
    },
    existing_form() {
      const forms = this.$store.state.tax_form.draft_forms;
      const existing_form = forms.find(v => v.ref_no === this.existing_ref_no);
      return existing_form;
    }
  },
  data() {
    return {
      view_select: true,
      selected_index: 0,
      taxpayer_list: [],
      user_list: [],
      taxpayer: null,
      form: {
        return_period: "",
        return_period_month: "",
        return_period_year: "",
        taxpayer: {
          contact_details: {},
          address_details: {},
          individual_details: {},
          accounting_type: "",
          start_month: "",
          end_month: ""
        },
        spouse_details: {
          contact_details: {},
          address_details: {},
          individual_details: {},
          accounting_type: "",
          start_month: "",
          end_month: ""
        },
        page: 0,
        // spouse_details: {},
        buyer_details: {},
        item29: {},
        item30: {},
        sched1: { taxpayer: {}, spouse: {} },
        sched2: { taxpayer: {}, spouse: {} },
        sched3: { taxpayer: {}, spouse: {} },
        sched4: { taxpayer: {}, spouse: {} }
      },
      curr_step: 0,
      steps: {
        "2550m": [
          {
            title: "General"
          },
          {
            title: "Part I",
            description: "Background Information"
          },
          {
            title: "Part II",
            description: "Computation"
          }
        ],
        "2550q": [
          {
            title: "General"
          },
          {
            title: "Part I",
            description: "Background Information"
          },
          {
            title: "Part II A",
            description: "Computation"
          },
          {
            title: "Part II B",
            description: "Computation"
          }
        ],
        "1601e": [
          {
            title: "General"
          },
          {
            title: "Part I",
            description: "Background Information"
          },
          {
            title: "Part II",
            description: "Computation"
          }
        ],
        "1700": [
          {
            title: "General"
          },
          {
            title: "Part I",
            description: "Background Information on Tax Filer and Spouse"
          },
          {
            title: "Part II",
            description: "Total Tax Payable"
          }
        ],
        "1706": [
          {
            title: "General"
          },
          {
            title: "Part I",
            description: "Background Information"
          },
          {
            title: "Part 1.1",
            description: "Continuation of Part 1"
          },
          {
            title: "Part 1.2",
            description: "Continuation of Part 1"
          },
          {
            title: "Part II",
            description: "Computation of Tax"
          }
        ],
        "1701q": [
          {
            title: "General"
          },
          {
            title: "Part I",
            description: "Background Information on Taxpayer/Filer"
          },
          {
            title: "Part II",
            description: "Background Information on Spouse (if applicable)"
          },
          {
            title: "Part III",
            description: "Total Tax Payable"
          }
        ],
        "1701a": [
          {
            title: "General"
          },
          {
            title: "Part I",
            description: "Background Information on Taxpayer/Filer"
          },
          {
            title: "Part II",
            description: "Total Tax Payable"
          },
          {
            title: "Part III",
            description: "Details of Payment"
          },
          {
            title: "Part IV",
            description: "Computation of Income Tax"
          },
          {
            title: "Part V",
            description: "Background Information on Spouse"
          }
        ],
        "2000ot": [
          {
            title: "General"
          },
          {
            title: "Part I",
            description: "Background Information"
          },
          {
            title: "Part II",
            description: "Details of Transactions"
          },
          {
            title: "Part III",
            description: "Computation of Tax"
          }
        ],
        "1600wp": [
          {
            title: "General"
          },
          {
            title: "Part I",
            description: "Background Information"
          },
          {
            title: "Part II",
            description: "Computation of Tax"
          },
          {
            title: "Part III",
            description: "Details of Payment"
          }
        ],
        "1601c": [
          {
            title: "General"
          },
          {
            title: "Part I",
            description: "Background Information"
          },
          {
            title: "Part II",
            description: "Computation of Tax"
          }
        ],
        "1606": [
          {
            title: "General"
          },
          {
            title: "Part I",
            description: "Background Information"
          },
          {
            title: "Part II",
            description: "Computation of Tax"
          }
        ],
        "1601c": [
          {
            title: "General"
          },
          {
            title: "Part I",
            description: "Background Information"
          },
          {
            title: "Part II",
            description: "Computation of Tax"
          }
        ],
        "2551q": [
          {
            title: "General"
          },
          {
            title: "Part I",
            description: "Background Information"
          },
          {
            title: "Part II",
            description: "Total Tax Payable"
          }
        ],
        "1604c": [
          {
            title: "General"
          },
          {
            title: "Part I",
            description: "Background Information"
          },
          {
            title: "Part II",
            description: "Summary of Remittances per BIR Form No. 1601-C"
          }
        ],
        "1702ex": [
          {
            title: "General"
          },
          {
            title: "Part I",
            description: "Background Information"
          },
          {
            title: "Part II",
            description: "Total Tax Payable"
          },
          {
            title: "Part IV",
            description: "Computation of Tax"
          },
          {
            title: "Part V",
            description: "Tax Relief Availment"
          },
          {
            title: "Part VI",
            description: "Schedules"
          }
        ]
      },
      default_steps: [
        {
          title: "General"
        },
        {
          title: "Part I",
          description: "Background Information"
        },
        {
          title: "Part II",
          description: "Summary of Remittances"
        }
      ],
      in_bottom: false,
      loading: false,
      return_details: {},
      show_form_success: false,
      errors: []
    };
  },
  methods: {
    setErrors(errors) {
      this.errors = errors;
      console.log("this.errors :", this.errors);
      if (this.errors && this.errors.length) {
        var errors = this.errors.sort((a, b) => a.page - b.page);
        console.log("this.errors :", errors);
        this.curr_step = errors[0].page;
        this.$notification.error({ message: "Validation Error" });
      }
    },
    getUserByTin(tin) {
      const user = this.user_list.find(v => v.tin === tin);
      return (
        user || {
          avatar: {
            location:
              "https://icon-library.net/images/my-profile-icon-png/my-profile-icon-png-3.jpg"
          }
        }
      );
    },
    handleScroll() {
      this.in_bottom = window.scrollY > 2000;
    },
    select(index) {
      if (index > -1) {
        this.taxpayer = this.deepCopy(this.taxpayer_list[index]);
        this.selected_index = index;
      }
    },
    isSelected(index) {
      return this.selected_index == index;
    },
    fillup() {
      this.form.taxpayer = this.taxpayer;
      console.log("taxpayer data: " + JSON.stringify(this.form.taxpayer))
      console.log(
        "this.form.taxpayer.individual_details :",
        JSON.stringify(this.form.taxpayer.individual_details)
      );
      if (!this.form.taxpayer.address_details) {
        this.form.taxpayer.address_details = {};
      }
      if (!this.form.taxpayer.contact_details) {
        this.form.taxpayer.contact_details = {};
      }
      if (!this.form.taxpayer.individual_details) {
        this.form.taxpayer.individual_details = {};
      } else {
        this.form.taxpayer.individual_details.birthDate = moment(
          this.form.taxpayer.individual_details.birthDate
        );
      }
      if (!this.form.taxpayer.registered_name) {
        this.form.taxpayer.registered_name = `${this.form.taxpayer.individual_details.firstName} ${this.form.taxpayer.individual_details.lastName}`;
      }
      // if(this.form.taxpayer.individual_details.civil_status == 'M'){
      //   this.$http.get(`/connections/${this.form.taxpayer.tin}`)
      //   .then(result=>{
      //     console.log("spouse data fillup: " + JSON.stringify(result))
      //     result.data.model.forEach(data =>{
      //     if(data.relationship == "spouse"){
      //       console.log("spouse data na this: " + JSON.stringify(data))
      //       console.log("taxpayer details: " + JSON.stringify(this.form.taxpayer))
      //       this.form.spouse_details = data
      //     }
      //     })
      //   })
      // }
      console.log(`form::::`, this.form.taxpayer);
      this.view_select = false;
    },
    saveDraft() {
      console.log("this.form saving draft... :", this.form);
      this.$store.commit("SAVE_DRAFT_FORM", {
        ref_no: this.existing_ref_no,
        details: this.form
      });
      this.$notification.open({
        message: `Successfully saved in Draft.`,
        icon: <a-icon type="check" style="color: blue" />
      });
      window.opener.location.reload();
      // window.close();
    },
    showSuccessForm(details) {
      details.taxpayer_type =
        details.taxpayer_type === "I" ? "Individual" : "Non-Individual";
      details.tin = this.formatTIN(details.tin);
      details.return_period = this.formatDate(
        details.return_period,
        "dateonly"
      );
      details.due_date = this.formatDate(details.due_date, "dateonly");
      details.tax_due = `₱ ${this.formatAmount(details.tax_due)}`;
      details.total_amount_payable = `₱ ${this.formatAmount(
        details.total_amount_payable
      )}`;
      details.total_penalties = `₱ ${this.formatAmount(
        details.total_penalties
      )}`;
      this.return_details = details;
      console.log("show success form data: " + JSON.stringify(this.form))
      console.log("form page return details data: " + JSON.stringify(this.return_details))
      this.show_form_success = true;
    },
    closeForm() {
      this.show_form_success = false;
      window.close();
    },
    proceedPayment() {
      if (window.opener && window.opener.location) {
        window.opener.location.href = `${process.env.VUE_APP_HOME_URL}app/pay`;
        window.opener.location.reload();
      }
      window.close();
    },
    submit() {
      this.loading = true;
      this.errors = [];
      //validate
      this.form.tax_due = this.form.spouse_tax_due + this.form.taxpayer_tax_due
      // this.form.surcharge
      // this.form.interest
      // this.form.compromise
      // this.form.penalties
      this.form.total_amount_payable = this.form.taxpayer_aggregate_amount_payable
      this.$refs.form_component.validate(true);
      // no errors found, proceed to next page
      if (!this.errors.length) {
        this.$store
          .dispatch("VALIDATE_AND_SAVE", {
            form_type: this.form_type,
            form_details: this.form
          })
          .then(result => {
            console.log("VALIDATE_AND_SAVE result:", result.data);
            this.loading = false;
            // this.$emit("updateForm", null); //to refresh pdf
            this.form = { ...this.form, ...null };
            if (result.data.errors && result.data.errors.length > 0) {
              this.errors = result.data.errors;
              console.log("this.errors :", this.errors);
              if (this.errors && this.errors.length) {
                var errors = this.errors.sort((a, b) => a.page - b.page);
                console.log("this.errors :", errors);
                this.curr_step = errors[0].page;
              }
              this.$notification.error({ message: "Validation Error" });
            } else {
              this.$store.commit("REMOVE_DRAFT_FORM", this.$route.query.ref_no);
              this.$store.commit("NOTIFY_MESSAGE", {
                success: true,
                message: `Successfully submitted Form ${this.form_type}`
              });
              var return_details = result.data.model;
              return_details.registered_name = this.form.taxpayer.registered_name;
              return_details.taxpayer_type = this.form.taxpayer.taxpayer_type;
              this.showSuccessForm(return_details);

              this.$refs.form_display_component.upload().getBuffer(buffer => {
                var file = new Blob([buffer], { type: "application/pdf" });
                // var pdf = new File(b64toBlob(buffer), `123.pdf`, {type: "application/pdf"});
                var data = new FormData();
                data.append("tax_returns", file);
                data.append("content-type", "application/pdf");

                this.$store
                  .dispatch("UPLOAD_TAX_RETURNS", {
                    form: this.form_type,
                    ref_no: return_details.reference_no,
                    form_data: data
                  })
                  .then(result => {
                    console.log("UPLOAD RESULT ::: ", JSON.stringify(result));
                  })
                  .catch(err => {
                    console.log("UPLOAD ERROR ::: ", JSON.stringify(result));
                  });
              });
            }
          })
          .catch(err => {
            console.log("VALIDATE_AND_SAVE", err);
            this.loading = false;
          });
      }
    }
  },
  watch: {
    form() {
      console.log("##### update formpage: " + this.form);
    }
  },
  created() {
    this.return_details.form_type = this.form_type;
    console.log("this.existing_form :", this.existing_form);
    if (
      this.existing_form &&
      Object.keys(this.existing_form).length !== 0 &&
      this.existing_form.constructor === Object &&
      this.existing_form.details &&
      Object.keys(this.existing_form.details).length !== 0 &&
      this.existing_form.details.constructor === Object
    ) {
      this.form = this.existing_form.details;
      this.form.return_period = moment(this.form.return_period);
      //check if taxpayer is already set
      if (this.form.taxpayer.tin) {
        this.view_select = false;
      }
    }
    console.log("Form Type :", this.form_type);
    this.curr_step = 0;
    window.addEventListener("scroll", this.handleScroll);
    this.loading = true;
    //find tp list
    this.$http
      .get(`/taxpayer/tin/${this.$store.state.account_session.user.tin}`)
      .then(results => {
        this.taxpayer_list.push(results.data.model.taxpayer);
        this.user_list.push(results.data.model.user);
        return this.$http.get(
          `/connections/${this.$store.state.account_session.user.tin}`
        );
      })
      .then(results => {
        var tins = [];
        results.data.model.forEach(tin => {
          tins.push(tin.to);
        });
        return this.$http.post("/taxpayer/details/", tins);
      })
      .then(results => {
        this.loading = false;

        this.taxpayer_list.push(...results.data.model.taxpayers);
        this.user_list.push(...results.data.model.users);
      })
      .catch(err => {
        console.log(`err ::: `, err);
        this.loading = false;
      });
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style>
.tax-form .ant-form-item {
  margin-bottom: 0px;
}

.tax-form .ant-form-item-label {
  text-align: left;
}

.tax-form .ant-input-number {
  width: 40vh;
}

.prevent-affix .ant-affix {
  position: initial !important;
}

.float-button button {
  width: 12vw;
}

.float-button {
  position: fixed;
  z-index: 1000;
  width: 100%;
  bottom: 0;
  left: 0;
}

.float-button .float-content {
  width: 80vw;
  margin: auto;
  padding: 1vh 2vh;
  background: rgba(0, 0, 0, 0.4);
}
</style>