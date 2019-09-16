<template>
  <a-card>
    <a-row :gutter="10">
      <a-col :xs="0" :md="12">
        <!-- Form Display -->
        
      </a-col>
      <a-col :xs="0" :md="12" :style="fill_up_form_style" class="tax-form">
        <!-- Fill up forms -->
        <router-view />
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
export default {};
</script>

<style>
.tax-form .ant-form-item {
  margin-bottom: 0px;
}

.tax-form .ant-form-item-label {
  text-align: left;
}
</style>