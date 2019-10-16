<template>
  <a-drawer
    title="Schedule 1 Fair Market Value of Property Sold"
    placement="right"
    :closable="true"
    @close="close"
    :visible="show"
    width="1000"
  >
    <a-form>
      <div
        style="color: black"
      >1. Fair Market Value as determined by BIR Commissioner 1A 1B 1C (Zonal Value/BIR Rules)</div>
      <br />
      <a-form>
        <a-row :gutter="2">
          <a-col :span="8">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="1A"
            >
              <a-input-number v-model="form.commissionerLand" placeholder="Land"></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="1B"
            >
              <a-input-number v-model="form.commissionerImprovement" placeholder="Improvement"></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="1C"
            >
              <a-input-number disabled :value="getCommissionerTotal()" placeholder="Total"></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <!-- 2 -->
      <div
        style="color: black"
      >2. Fair Market Value as determined by Provincial/City Assessor's (per latest Tax Declaration)</div>
      <br />
      <a-form>
        <a-row :gutter="12">
          <a-col :span="8">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="2A"
            >
              <a-input-number v-model="form.provincialLand" placeholder="Land"></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="2B"
            >
              <a-input-number v-model="form.provincialImprovement" placeholder="Improvement"></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="2C"
            >
              <a-input-number disabled :value="getProvincialTotal()" placeholder="Total"></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <!-- 3 -->
      <br />
      <a-form>
        <a-row :gutter="12">
          <a-col :span="10">
            <div style="color: black">3. Sum of Item 1A & 2B</div>
          </a-col>
          <a-col :span="14">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="3A"
            >
              <a-input-number disabled :value="getSum1A2B()" placeholder="Total"></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <!-- 4 -->
      <br />
      <a-form>
        <a-row :gutter="12">
          <a-col :span="10">
            <div style="color: black">4. Sum of Item 1B & 2A</div>
          </a-col>
          <a-col :span="14">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="4A"
            >
              <a-input-number disabled :value="getSum1B2A()" placeholder="Total"></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <!-- 5 -->
      <br />
      <a-form>
        <a-row :gutter="12">
          <a-col :span="10">
            <div
              style="color: black"
            >5. Fair Market Value of Property Sold (The highest amount among the figures reflected under Items 1C, 2C, 3A & 4A)(to Item 12F)</div>
          </a-col>
          <a-col :span="14">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="5A"
            >
              <a-input-number disabled :value="getFairMarketValue()" placeholder="Total"></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-form>
  </a-drawer>
</template>

<script>
export default {
  props: ["show", "form"],
  data() {
    return {
      form_layout: {
        label_col: {
          span: 2
        },
        wrapper_col: {
          span: 22
        }
      }
    };
  },
  methods: {
    // 3A = 1A + 2B
    getSum1A2B() {
      var total = this.computeSum([
        this.form.commissionerLand,
        this.form.provincialImprovement
      ]);
      this.form.sum1A2B = total;
      console.log("this.form.sum1A2B :", this.form.sum1A2B);
      return total;
    },
    // 1C = 1A + 1B
    getCommissionerTotal() {
      var total = this.computeSum([
        this.form.commissionerLand,
        this.form.commissionerImprovement
      ]);
      this.form.commissionerTotal = total;
      console.log("this.form.commissionerTotal :", this.form.commissionerTota);
      return total;
    },
    // 2C = 2A + 2B
    getProvincialTotal() {
      var total = this.computeSum([
        this.form.provincialLand,
        this.form.provincialImprovement
      ]);
      this.form.provincialTotal = total;
      console.log("this.form.provincialTotal :", this.form.provincialTotal);
      return total;
    },
    // 4A = 1B + 2A
    getSum1B2A() {
      var total = this.computeSum([
        this.form.commissionerImprovement,
        this.form.provincialLand
      ]);
      this.form.sum1B2A = total;
      console.log("this.form.sum1B2A :", this.form.sum1B2A);
      return total;
    },
    getFairMarketValue() {
      console.log("Math.max :" + Math.max(29, 55));
      console.log("this.form.commissionerTotal :", this.form.commissionerTotal);
      console.log("this.form.provincialTotal :", this.form.provincialTotal);
      console.log("this.form.sum1A2B :", this.form.sum1A2B);
      console.log("this.form.sum1B2A :", this.form.sum1B2A);
      var a = this.form.commissionerTotal;
      var b = this.form.provincialTotal;
      var total = Math.max(
        this.form.commissionerTotal,
        this.form.provincialTotal,
        this.form.sum1A2B,
        this.form.sum1B2A
      );
      console.log("total :", total);
      this.form.fairMarketValue = total;
      console.log("fair market value: " + this.form.fairMarketValue);
      return total;
    },

    close() {
      this.$emit("close");
    }
  }
};
</script>

<style>
</style>