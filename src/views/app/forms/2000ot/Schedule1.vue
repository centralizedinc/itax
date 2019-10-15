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
        <a-row :gutter="12">
          <a-col :span="8">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="1A"
            >
              <a-input placeholder="Land"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="1B"
            >
              <a-input placeholder="Improvement"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="1C"
            >
              <a-input placeholder="Total"></a-input>
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
              <a-input placeholder="Land"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="2B"
            >
              <a-input placeholder="Improvement"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="2C"
            >
              <a-input placeholder="Total"></a-input>
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
              <a-input placeholder="Total"></a-input>
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
              <a-input placeholder="Total"></a-input>
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
              <a-input placeholder="Total"></a-input>
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
  }
};
</script>

<style>
</style>