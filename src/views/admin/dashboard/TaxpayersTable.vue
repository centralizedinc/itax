<template>
  <div>
    <a-card :loading="loading">
      <a-row type="flex" align="middle">
        <a-col :span="16">
          <span class="taxpayer-title">Taxpayers</span>
        </a-col>
        <a-col :span="7">
          <a-input-search placeholder="Search" v-model="search" @search="onSearch" enterButton>
            <a-tooltip slot="suffix" title="Clear" v-if="search">
              <a-icon
                type="close"
                style="color: rgba(0,0,0,.45); cursor: pointer; margin-right: 0.5vw;"
                @click="search=''"
              />
            </a-tooltip>
          </a-input-search>
        </a-col>
        <!-- <a-col :span="1" style="text-align: right; color: blue">
          <a-tooltip>
            <span slot="title">Filter</span>
            <a-icon type="filter" style="cursor: pointer; font-size: 16px;" />
          </a-tooltip>
        </a-col> -->
      </a-row>
    </a-card>
    <a-row v-if="!loading && !search_mode" :gutter="7" type="flex" justify="center" align="middle">
      <a-divider>Top Taxpayers</a-divider>
      <a-col
        v-for="(taxpayer, index) in top_taxpayers"
        :key="`top${index}`"
        :xs="{ span: 24 }"
        :md="{ span: 12 }"
        :xl="{ span: 8 }"
        style="margin-bottom: 1vh;"
      >
        <a-card style="cursor: pointer;" @click="moreDetails(taxpayer)">
          <a-card-grid style="width: 100%; padding: 2vh;">
            <a-card-meta :title="taxpayer.registered_name || 'User'">
              <a-avatar
                slot="avatar"
                shape="square"
                :size="60"
                :src="taxpayer.avatar || 'https://www.mediaupdate.co.za/img/avatar.png'"
              />
              <div slot="description" v-html="getDescription(taxpayer)"></div>
            </a-card-meta>
          </a-card-grid>
        </a-card>
      </a-col>
      <a-divider>Other Taxpayers</a-divider>
      <a-col
        v-for="(taxpayer, index) in other_taxpayers"
        :key="`other${index}`"
        :xs="{ span: 24 }"
        :md="{ span: 12 }"
        :xl="{ span: 8 }"
        style="margin-bottom: 1vh;"
      >
        <a-card style="cursor: pointer;" @click="moreDetails(taxpayer)">
          <a-card-grid style="width: 100%; padding: 2vh;">
            <a-card-meta :title="taxpayer.registered_name || 'User'">
              <a-avatar
                slot="avatar"
                shape="square"
                :size="60"
                :src="taxpayer.avatar || 'https://www.mediaupdate.co.za/img/avatar.png'"
              />
              <div slot="description" v-html="getDescription(taxpayer)"></div>
            </a-card-meta>
          </a-card-grid>
        </a-card>
      </a-col>
    </a-row>
    <a-row
      v-else-if="!loading && search_mode"
      :gutter="7"
      type="flex"
      justify="center"
      align="middle"
      style="margin-top: 2vh;"
    >
      <a-col
        v-for="(taxpayer, index) in filtered_taxpayers"
        :key="`tp${index}`"
        :xs="{ span: 24 }"
        :md="{ span: 12 }"
        :xl="{ span: 8 }"
        style="margin-bottom: 1vh;"
      >
        <a-card style="cursor: pointer;" @click="moreDetails(taxpayer)">
          <a-card-grid style="width: 100%; padding: 2vh;">
            <a-card-meta :title="taxpayer.registered_name || 'User'">
              <a-avatar
                slot="avatar"
                shape="square"
                :size="60"
                :src="taxpayer.avatar || 'https://www.mediaupdate.co.za/img/avatar.png'"
              />
              <div slot="description" v-html="getDescription(taxpayer)"></div>
            </a-card-meta>
          </a-card-grid>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      search_mode: false,
      search: "",
      filtered_taxpayers: []
    };
  },
  created() {
    console.log('test');
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
  computed: {
    taxpayers() {
      var taxpayers = this.deepCopy(this.$store.state.taxpayers.taxpayers);
      console.log('this.login_rdo :', this.login_rdo);
      if (this.login_rdo) {
        taxpayers = taxpayers.filter(
          v => v.rdo_code && v.rdo_code === this.login_rdo
        );
      }
      return taxpayers;
    },
    top_taxpayers() {
      return this.taxpayers.slice(0, 10);
    },
    other_taxpayers() {
      return this.taxpayers.slice(
        10,
        this.taxpayers.length
      );
    },
    login_rdo() {
      return this.$store.state.tax_form.login_rdo;
    }
  },
  methods: {
    getDescription(tp) {
      var test = <span></span>;
      return `TIN: <b>${this.formatTIN(tp.tin)}</b><br/>RDO: <b>${
        tp.rdo_code
      }</b><br/>Tax Returns: <b>${this.formatAmount(1000)}</b>`;
    },
    moreDetails(tp) {
      console.log("tp :", tp);
    },
    onSearch(value) {
      console.log("search :", this.search);
      if (this.search) {
        this.search_mode = true;
        this.filtered_taxpayers = this.taxpayers.filter(v => {
          console.log(v);
          return (
            v &&
            ((v.registered_name &&
              v.registered_name.indexOf(this.search) > -1) ||
              (v.tin && v.tin.indexOf(this.search) > -1) ||
              (v.rdo_code && v.rdo_code.indexOf(this.search) > -1))
          );
        });
      } else this.search_mode = false;
    }
  }
};
</script>

<style>
.taxpayer-title {
  font-weight: bold;
  font-size: 16px;
}
</style>