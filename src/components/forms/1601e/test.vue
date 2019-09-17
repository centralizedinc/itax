<template>
  <div>
    <h1>Form 1601e</h1>
    <a-input v-model="form.month"></a-input>
    <display :form="form"></display>
  </div>
</template>

<script>
import display from "./Form1601eDisplay";
export default {
  components: {
    display
  },
  data() {
    return {
      form: {
        month: 12
      }
    };
  }
};
</script>