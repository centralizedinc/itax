<template>
  <a-card :bodyStyle="{ padding: 0 }" :loading="loading">
    <a-row :gutter="10">
      <a-col v-for="(tp, index) in top_taxpayers" :key="index" :xs="24" :lg="12">
        <a-card :bodyStyle="{ padding: 0 }">
          <a-card-meta :title="tp.registered_name">
            <a-avatar
              slot="avatar"
              shape="square"
              :size="60"
              :src="tp.avatar || 'https://www.mediaupdate.co.za/img/avatar.png'"
            />
            <div slot="description" v-html="getDescription(tp)"></div>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  computed: {
    top_taxpayers() {
      //   filter by collection
      return this.taxpayers.slice(0, 6);
    },
    taxpayers() {
      return this.$store.state.taxpayers.taxpayers;
    }
  },
  created() {
    this.loading = true;
    this.$store
      .dispatch("GET_TAXPAYERS")
      .then(result => {
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
      });
  },
  methods: {
    getDescription(tp) {
      var test = <span></span>;
      return `TIN: <b>${this.formatTIN(tp.tin)}</b><br/>RDO: <b>${
        tp.rdo_code
      }</b><br/>Collected: <b>${1000}</b><br/>Filed: <b>${1000}</b>`;
    }
  }
};
</script>

<style>
</style>