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
        <a-card :bodyStyle="{'padding': '10px', 'box-shadow': '5px 5px #eee'}">
          <img :src="form_2550m_image" style="width: 100%;" alt />
        </a-card>
      </a-col>
      <a-col :xs="0" :md="12" class="tax-form">
        <!-- Fill up forms -->
        <a-card :bodyStyle="{ padding: '10px' }">
          <component
            :is="curr_form"
            :form="form"
            :step="curr_step"
            @updateForm="v=>form={...form, ...v}"
            @changeStep="v=>curr_step=v"
          />
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import form_2550m_image from "@/assets/forms/2550M.jpeg";
import Form2550M from "./2550m/2550m.vue";

export default {
  components: {
    Form2550M
  },
  computed: {
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
      form_2550m_image,
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
      ]
    };
  },
  created() {
    console.log("Form Type :", this.form_type);
    this.curr_step = 0;
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
</style>