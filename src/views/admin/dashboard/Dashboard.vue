<template>
  <div>
      <a-row :gutter="10" style="margin-bottom: 2vh;">
        <a-col :span="24">
          <statistics />
        </a-col>
      </a-row>
      <a-row :gutter="10" style="margin-bottom: 2vh;" v-if="!login_rdo">
        <a-col :xs="24" :lg="12">
          <collection-per-rdo style="margin-bottom: 2vh" />
        </a-col>
        <a-col :xs="24" :lg="12">
          <target-collection style="margin-bottom: 2vh" />
        </a-col>
      </a-row>
      <a-row :gutter="10" style="margin-bottom: 2vh;">
        <a-col :xs="24" :lg="12">
          <collection-per-tax-type style="margin-bottom: 2vh" />
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
import TargetCollection from "./statistics/TargetCollection";
import TopTaxpayer from "./statistics/TopTaxpayer";
import RdoMap from "./RDOMap";

export default {
  components: {
    Statistics,
    CollectionPerRdo,
    CollectionPerTaxType,
    TargetCollection,
    TopTaxpayer,
    RdoMap
  },
  data() {
    return {};
  },
  computed: {
    login_rdo() {
      return this.$store.state.tax_form.login_rdo;
    }
  }
};
</script>

<style>
</style>