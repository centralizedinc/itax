<template>
  <div>
    <h2>Over the Counter Payment</h2>
    <a-divider></a-divider>
    <a-form>
      <a-form-item label="Name">
        <a-input placeholder="Enter Name" v-model="details.name">
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-form-item>
      <a-form-item label="Email Address">
        <a-input placeholder="Enter Email Address" v-model="details.email">
          <a-icon slot="prefix" type="mail" />
        </a-input>
      </a-form-item>
      <a-form-item label="Mobile Number">
        <a-input placeholder="Enter Mobile Number" v-model="details.contact">
          <a-icon slot="prefix" type="mobile" />
        </a-input>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  props: ["details"]
};
</script>

<style>
</style>