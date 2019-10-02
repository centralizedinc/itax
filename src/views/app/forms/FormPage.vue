<template>
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
</template>

<script>
import FormDisplay from "@/components/FormDisplay.vue";
import Form2550M from "./2550m/2550m.vue";
import moment from "moment";
import Form1601E from "./1601e/1601e.vue";
import Form1700 from "./1700/1700.vue";
import Form2551Q from "./2551q/2551q.vue";
import Form1701Q from "./1701q/1701q.vue";

export default {
  components: {
    FormDisplay,
    Form2550M,
    Form1601E,
    Form1700,
    Form2551Q,
    Form1701Q
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
    // if(this.form_type == "1601e"){
    //   this.form = {

    //   }
    // }

    window.addEventListener("scroll", this.handleScroll);
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