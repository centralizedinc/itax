<template>
  <div>
    <a-card title="Collection per RDO Summary" style="margin-bottom: 1vh" />
    <a-card v-for="(item, index) in items" :key="index" :bodyStyle="{padding: '15px'}">
      <span class="item-description">{{item.description}} ({{item.code}})</span>
      <br />
      <span class="item-value">{{formatAmount(item.collection)}}</span>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  created() {
    this.$store
      .dispatch("GET_RDOS")
      .then(result => {
        this.getMockData()
      })
      .catch(err => {});
  },
  computed: {
    rdos() {
      return this.$store.state.tax_form.rdos;
    }
  },
  methods: {
    getMockData(){
      for (let i = 0; i < 5; i++) {
        this.items.push({
          code: this.rdos[i].code,
          description: this.rdos[i].description,
          collection: 1000
        })
      }
    }
  },
};
</script>

<style>
.item-description {
  font-weight: bold;
  font-size: 10px;
}

.item-value {
  font-weight: 300;
  font-size: 18px;
}
</style>