<template>
  <div>
    <statistics />
    <a-divider />
    <a-row type="flex" gutter="10">
      <a-col :xs="24" :lg="12">
        <collection-per-tax-type />
      </a-col>
      <a-col :xs="24" :lg="12">
        <collection-per-rdo />
      </a-col>
      <!-- <a-col :xs="24" :lg="8">
        <collection-per-rdo />
      </a-col> -->
    </a-row>
  </div>
</template>

<script>
import Statistics from "./statistics/Statistics";
import CollectionPerRdo from "./statistics/CollectionPerRdo.vue";
import CollectionPerTaxType from "./statistics/CollectionPerTaxType";

export default {
  components: {
    Statistics,
    CollectionPerRdo,
    CollectionPerTaxType
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>