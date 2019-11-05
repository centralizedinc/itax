<template>
  <div>
    <statistics />
    <a-divider />
    <collection-per-rdo />
    <a-divider />
    <collection-per-tax-type />
  </div>
</template>

<script>
import Statistics from "./statistics/Statistics";
import CollectionPerRdo from "./statistics/CollectionPerRdo";
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