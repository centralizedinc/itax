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
            <form-display :type="form_type" :form="form" />
          </a-card>
        </a-affix>
      </a-col>
      <a-col :xs="0" :md="12" class="tax-form">
        <!-- Fill up forms -->
        <div ref="fillup_form">
          <a-card :bodyStyle="{ padding: '30px' }">
            <component
              :is="curr_form"
              :form="form"
              :step="curr_step"
              @updateForm="v=>form={...form, ...v}"
              @changeStep="v=>curr_step=v"
            />
          </a-card>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import FormDisplay from "@/components/FormDisplay.vue";
import Form2550M from "./2550m/2550m.vue";
import Form1601E from "./1601e/1601e.vue";

export default {
  components: {
    FormDisplay,
    Form2550M,
    Form1601E
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
    }
  },

  data() {
    return {
      form: {
        taxpayer: {}
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
      in_bottom: false
    };
  },
  methods: {
    handleScroll() {
      console.log("refs ", this.$refs);
      console.log("window :", window);
      this.in_bottom = window.scrollY > 2000;
      console.log("this.in_bottom :", this.in_bottom);
    }
  },
  watch: {
    form() {
      console.log("##### update formpage: " + this.form);
    }
  },
  created() {
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
</style>