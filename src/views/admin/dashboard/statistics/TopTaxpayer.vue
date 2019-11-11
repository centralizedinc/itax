<template>
  <div>
    <a-card
      title="Top Taxpayer"
      :bodyStyle="{ padding: 0 }"
      :loading="loading"
      style="margin-bottom: 2vh"
    />
    <a-card
      v-for="(tp, index) in top_taxpayers"
      :key="index"
      :bodyStyle="{ padding: '10px 24px' }"
      style="margin-bottom: 1vh"
    >
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
  </div>
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
      return this.taxpayers.slice(0, 3);
    },
    taxpayers() {
      var taxpayers = this.deepCopy(this.$store.state.taxpayers.taxpayers);
      if(this.login_rdo) {
        taxpayers = taxpayers.filter(v => v.rdo_code && v.rdo_code === this.login_rdo);
      }
      return taxpayers;
    },
    login_rdo() {
      return this.$store.state.tax_form.login_rdo;
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
      }</b><br/>Tax Returns: <b>${this.formatAmount(1000)}</b>`;
    }
  }
};
</script>

<style>
</style>