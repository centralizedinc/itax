<template>
  <a-layout>
    <a-layout-header class="header">
      <a-row type="flex" justify="start" :gutter="8">
        <a-col :span="10">
          <h2 style="color:white;">Smart Tax.</h2>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content style="min-height:100vh; margin-top:15vh;">
      <a-card>
    <a-steps :current="curr_step" size="small">
      <a-step v-for="(item, index) in form_steps" :key="index" :description="item.description">
        <b slot="title">{{item.title}}</b>
      </a-step>
    </a-steps>
    <a-row :gutter="10">
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
              @loading="v=>loading=v"
              @updateForm="v=>form={...form, ...v}"
              @changeStep="v=>curr_step=v"
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
              @click="curr_step--"
              :disabled="loading || curr_step === 0"
              v-if="curr_step > -1"
            >Previous</a-button>
          </a-col>
          <!-- Download -->
          <a-col :span="4">
            <a-button @click="$refs.form_display_component.download()">Download</a-button>
          </a-col>
          <!-- Open -->
          <a-col :span="4">
            <a-button @click="$refs.form_display_component.open()">Open</a-button>
          </a-col>
          <!-- Save as Draft -->
          <a-col :span="4">
            <a-button type="primary" :disabled="loading" @click="saveDraft()">Save as Draft</a-button>
          </a-col>
          <!-- Submit -->
          <a-col :span="4">
            <a-button
              type="primary"
              @click="$refs.form_component.submit()"
              :loading="loading"
            >Submit</a-button>
          </a-col>
          <!-- Next -->
          <a-col :span="4">
            <a-button
              type="primary"
              :disabled="curr_step===form_steps.length-1"
              @click="$refs.form_component.validate()"
              :loading="loading"
            >Next</a-button>
          </a-col>
        </a-row>
      </div>
    </div>
  </a-card>
    </a-layout-content>
    <a-modal :visible="view_select" title="Select Taxpayer" :closable="false">
      <!-- :loading="loading" -->
      <a-list itemLayout="horizontal" :dataSource="taxpayer_list" :loading="loading">
        <a-list-item slot="renderItem" slot-scope="item, index">
            <a-card style="width:100%" class="tin_card" @click="select(index)">
              <a-row type="flex" align="middle">
                <a-col :span="22">
                  <a-list-item-meta>
                    <p slot="title" >{{item.taxpayer_type=='I'?`${item.individual_details.lastName}, ${item.individual_details.firstName} ${item.individual_details.middleName}`:'item.corporate_details.registeredName'}}</p>
                    <template slot="description" >
                        <p>{{formatTIN(item.tin)}}</p>
                        <p>{{item.taxpayer_type=='I'?'Individual':'Non-Individual'}}</p>
                    </template>
                    <a-avatar style="border: solid 1px #1cb5e0" slot="avatar" :src="item.avatar" :size="64" />                                    
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
      <a-button type="primary" @click="fillup">Select</a-button>
    </template>
    </a-modal>
  </a-layout>
  
</template>

<script>
import FormDisplay from "@/components/FormDisplay.vue";
import Form2550M from "./2550m/2550m.vue";
import moment from "moment";
import Form1601E from "./1601e/1601e.vue";
import Form1700 from "./1700/1700.vue";
import Form2551Q from "./2551q/2551q.vue";
import Form1701Q from "./1701q/1701q.vue";
import Form2550Q from "./2550q/2550q.vue";

export default {
  components: {
    FormDisplay,
    Form2550M,
    Form1601E,
    Form1700,
    Form2551Q,
    Form1701Q,
    Form2550Q,
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
      view_select:true,
      selected_index:0,
      taxpayer_list:[],
      taxpayer:null,
      form: {
        taxpayer: {
          contact_details: {},
          address_details: {}
        }
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
          },
          {
            title: "Part IV",
            description: "Details of Payment"
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
            description: "Computation"
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
          description: "Computation"
        }
      ],
      in_bottom: false,
      loading: false
    };
  },
  methods: {
    handleScroll() {
      console.log("refs ", this.$refs);
      console.log("window :", window);
      this.in_bottom = window.scrollY > 2000;
      console.log("this.in_bottom :", this.in_bottom);
    },
    select(index){
      this.taxpayer = this.taxpayer_list[index];
      console.log('this.taxpayer :', this.taxpayer);
      this.selected_index = index;
    },
    isSelected(index){
      return this.selected_index == index
    },
    fillup(){
      this.form.taxpayer = this.taxpayer
      if(!this.form.taxpayer.address_details){
        this.form.taxpayer.address_details = {}
      }
      console.log(`form::::` , JSON.stringify(this.form.taxpayer))
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
    }
  },
  watch: {
    form() {
      console.log("##### update formpage: " + this.form);
    }
  },
  created() {
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
      this.form.returnPeriod = moment(this.form.returnPeriod);
    }
    console.log("this.form :", this.form);
    console.log("Form Type :", this.form_type);
    this.curr_step = 0;
    window.addEventListener("scroll", this.handleScroll);
    // this.loading = true
    //find tp list  
    this.$http.get(`/taxpayer/tin/${this.$store.state.account_session.user.tin}`)
            .then(results=>{
                console.log('result1 ::: ', JSON.stringify(results.data))
                this.taxpayer_list.push(results.data.model.taxpayer)
                return this.$http.get(`/connections/${this.$store.state.account_session.user.tin}`)
            })
            .then(results=>{
                console.log('result2 ::: ', JSON.stringify(results.data))
                var tins = []
                results.data.model.forEach(tin=>{
                    tins.push(tin.to)
                })
                return this.$http.post('/taxpayer/details/',tins)
            })
            .then(results =>{
                console.log('result2 ::: ', JSON.stringify(results.data))
                this.loading = false;
                
                this.taxpayer_list.push(...results.data.model)
            })
            .catch(err=>{
                console.log(`err ::: `, err)
                this.loading = false;
            })
    
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    form: {
      handler(val) {
        console.log("val :", val);
      },
      deep: true
    }
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
  width: 18vh;
}

.float-button {
  position: fixed;
  z-index: 1000;
  width: 100%;
  bottom: 0;
  left: 0;
}

.float-button .float-content {
  width: 117vh;
  margin: auto;
  padding: 1vh 2vh;
  background: rgba(0, 0, 0, 0.4);
}
</style>