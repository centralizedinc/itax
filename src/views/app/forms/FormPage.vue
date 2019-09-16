<template>
  <a-card>
    <a-steps :current="current_step">
      <a-step 
        v-for="(item, index) in form_steps" 
        :key="index" 
        :title="item.title" 
        :description="item.description"/>
    </a-steps>
    <a-row :gutter="10">
      <a-col :xs="0" :md="12">
        <!-- Form Display -->
        <img :src="form_2550m_image" style="width: 100%;" alt="">
      </a-col>
      <a-col :xs="0" :md="12" :style="fill_up_form_style" class="tax-form">
        <!-- Fill up forms -->
        <router-view />
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import form_2550m_image from "@/assets/forms/2550M.jpeg";

export default {
  computed: {
    current_step() {
      return this.$store.state.tax_form.current_step;
    },
    form_steps() {
      const paths = this.$route.path.split("/");
      const form = paths[paths.length - 1];
      const steps = this.steps[form];
      return steps ? steps : this.default_steps;
    },
    fill_up_form_style(){
      return `overflow-y: auto; height: 600px`
    }
  },
  data() {
    return {
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
    console.log("current form : ", this.$route.path);
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