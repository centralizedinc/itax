<template>
  <div>
    <h2>Credit Card Payment</h2>
    <a-divider></a-divider>
    <div class="card-wrapper" style="margin-bottom: 2vh"></div>
    <a-divider></a-divider>
    <form>
      <!-- <a-input type="text" name="number"></a-input> -->
      <a-form-item :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }" label="Credit Card Number">
        <input
          placeholder="•••• •••• •••• ••••"
          type="text"
          name="number"
          class="ant-input"
          v-model="details.card_no"
        />
      </a-form-item>
      <a-form-item
        :label-col="{ span: 10 }"
        :wrapper-col="{ span: 14 }"
        label="Cardholder Fullname"
      >
        <input
          placeholder="Enter Fullname"
          type="text"
          name="name"
          class="ant-input"
          v-model="details.card_name"
        />
      </a-form-item>
      <a-form-item :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }" label="Expiry Date">
        <input
          placeholder="••/••"
          type="text"
          name="expiry"
          class="ant-input"
          v-model="details.expiry"
        />
      </a-form-item>
      <a-form-item :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }" label="CVC">
        <input
          placeholder="•••"
          type="text"
          name="cvc"
          class="ant-input"
          v-model="details.cvc"
        />
      </a-form-item>
    </form>
  </div>
</template>

<script>
import Card from 'card'
export default {
  props: ["details"],
  // mounted() {
  //   this.$emit("mounted");
  // }
  mounted() {
    // this.$emit("mounted");
    this.card = new Card({
      form: "form",
      container: ".card-wrapper"
    });
    console.log("this.card1 :", this.card);
  },
  created() {
    this.card = new Card({
      form: "form",
      container: ".card-wrapper"
    });
    console.log("this.card :", this.card);
  },
};
</script>

<style>
</style>