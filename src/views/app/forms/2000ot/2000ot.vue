<template>
  <div>
    <a-form v-show="step===0">
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="1"
        :validate-status="error_item('returnPeriod')"
        :help="error_desc('returnPeriod')"
      >
        <a-date-picker
          placeholder="Date of Transaction Purchase (MM/DD/YYYY)"
          v-model="form.returnPeriod"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item :labelCol="{ span: 12 }" :wrapperCol="{ span: 12 }" label="2. Ammended Return">
        <a-radio-group v-model="form.amendedYn" :defaultValue="false" style="width: 100%">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="3"
      >
        <a-input-number
          placeholder="Number of Sheets"
          v-model="form.numOfSheet"
          style="width: 100%"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  props: ["form", "step"],
  methods: {
    changeStep(step, form) {
      this.$emit("changeStep", step);
      this.$emit("updateForm", form);
    },
    error_item(item) {
      return this.errors.find(x => x.field === item) ? "error" : "";
    },
    error_desc(item) {
      return this.errors.find(x => x.field === item)
        ? this.errors.find(x => x.field === item).error
        : "";
    }
  },
  data() {
    return {
      errors: [],
      loading: false,
      form_general: this.$form.createForm(this),
      //   form_part1: this.$form.createForm(this),
      //   form_part2: this.$form.createForm(this),
      formatter: {
        amount: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      parser: {
        amount: value => value.replace(/\₱\s?|(,*)/g, "")
      },
      form_layout: {
        label_col: { span: 2 },
        wrapper_col: { span: 22 }
      }
    };
  },
  computed: {},
  watch: {
    loading(val) {
      this.$emit("loading", val);
    },
    form: {
      deep: true,
      handler() {
        console.log("2000OT form: " + this.form.returnPeriod);
        this.form.year = this.formatDtYear(this.form.returnPeriod);
        this.form.month = this.formatDtMonth(this.form.returnPeriod);
        this.form.returnPeriodYear = this.formatDtYear(this.form.returnPeriod);
        this.form.returnPeriodDay = this.formatDate(this.form.returnPeriod, {
          day: "2-digit"
        });
        console.log("this.form.returnPeriodDay :", this.form.returnPeriodDay);
        this.form.returnPeriodMonth = this.formatDtMonth(
          this.form.returnPeriod
        );
        console.log("year: " + this.form.month);
      }
    },
    step() {}
  },
  created() {}
};
</script>

<style>
</style>