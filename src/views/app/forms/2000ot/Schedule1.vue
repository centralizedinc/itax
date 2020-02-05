<template>
  <a-drawer
    title="Schedule 1 Fair Market Value of Property Sold"
    placement="right"
    :closable="true"
    @close="close"
    :visible="show"
    width="700"
  >
    <a-form>
      <div
        style="color: black"
      >1. Fair Market Value as determined by BIR Commissioner 1A 1B 1C (Zonal Value/BIR Rules)</div>
      <br />
      <a-form>
        <a-row :gutter="2" type="flex">
          <a-col :span="8">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="1A"
            >
              <a-input-number
                style="width: 80%"
                v-model="form.schedule1.commissionerLand"
                placeholder="Land"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="1B"
            >
              <a-input-number
                style="width: 80%"
                v-model="form.schedule1.commissionerImprovement"
                placeholder="Improvement"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="1C"
            >
              <a-input-number
                style="width: 80%"
                disabled
                :value="getCommissionerTotal()"
                placeholder="Total"
              ></a-input-number>
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
              <a-input-number
                style="width: 80%"
                v-model="form.schedule1.provincialLand"
                placeholder="Land"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="2B"
            >
              <a-input-number
                style="width: 80%"
                v-model="form.schedule1.provincialImprovement"
                placeholder="Improvement"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="2C"
            >
              <a-input-number
                style="width: 80%"
                disabled
                :value="getProvincialTotal()"
                placeholder="Total"
              ></a-input-number>
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
              <a-input-number style="width: 80%" disabled :value="getSum1A2B()" placeholder="Total"></a-input-number>
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
              <a-input-number style="width: 80%" disabled :value="getSum1B2A()" placeholder="Total"></a-input-number>
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
              <a-input-number
                style="width: 80%"
                disabled
                :value="getFairMarketValue()"
                placeholder="Total"
              ></a-input-number>
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
        this.form.schedule1.commissionerLand,
        this.form.schedule1.provincialImprovement
      ]);
      this.form.schedule1.sum1A2B = total;
      console.log("this.form.sum1A2B :", this.form.schedule1.sum1A2B);
      return total;
    },
    // 1C = 1A + 1B
    getCommissionerTotal() {
      var total = this.computeSum([
        this.form.schedule1.commissionerLand,
        this.form.schedule1.commissionerImprovement
      ]);
      this.form.schedule1.commissionerTotal = total;
      console.log(
        "this.form.commissionerTotal :",
        this.form.schedule1.commissionerTota
      );
      return total;
    },
    // 2C = 2A + 2B
    getProvincialTotal() {
      var total = this.computeSum([
        this.form.schedule1.provincialLand,
        this.form.schedule1.provincialImprovement
      ]);
      this.form.schedule1.provincialTotal = total;
      console.log(
        "this.form.provincialTotal :",
        this.form.schedule1.provincialTotal
      );
      return total;
    },
    // 4A = 1B + 2A
    getSum1B2A() {
      var total = this.computeSum([
        this.form.schedule1.commissionerImprovement,
        this.form.schedule1.provincialLand
      ]);
      this.form.schedule1.sum1B2A = total;
      console.log("this.form.sum1B2A :", this.form.schedule1.sum1B2A);
      return total;
    },
    getFairMarketValue() {
      console.log("Math.max :" + Math.max(29, 55));
      console.log(
        "this.form.commissionerTotal :",
        this.form.schedule1.commissionerTotal
      );
      console.log(
        "this.form.provincialTotal :",
        this.form.schedule1.provincialTotal
      );
      console.log("this.form.sum1A2B :", this.form.schedule1.sum1A2B);
      console.log("this.form.sum1B2A :", this.form.schedule1.sum1B2A);
      var a = this.form.schedule1.commissionerTotal;
      var b = this.form.schedule1.provincialTotal;
      var total = Math.max(
        this.form.schedule1.commissionerTotal,
        this.form.schedule1.provincialTotal,
        this.form.schedule1.sum1A2B,
        this.form.schedule1.sum1B2A
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