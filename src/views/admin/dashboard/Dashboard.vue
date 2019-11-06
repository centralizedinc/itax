<template>
  <div>
    <statistics />
    <a-divider />
    <a-row :gutter="10" style="margin-bottom: 2vh;">
      <a-col :xs="24" :lg="10">
        <collection-per-rdo />
      </a-col>
      <a-col :xs="24" :lg="14">
        <collection-returns />
      </a-col>
    </a-row>
    <a-row>
      <a-col :xs="24" :lg="12">
        <collection-per-tax-type />
      </a-col>
      <a-col :xs="24" :lg="12">
        <top-taxpayer />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Statistics from "./statistics/Statistics";
import CollectionPerRdo from "./statistics/CollectionPerRdo.vue";
import CollectionPerTaxType from "./statistics/CollectionPerTaxType";
import CollectionReturns from "./statistics/CollectionReturns";
import TopTaxpayer from "./statistics/TopTaxpayer";

export default {
  components: {
    Statistics,
    CollectionPerRdo,
    CollectionPerTaxType,
    CollectionReturns,
    TopTaxpayer
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>