<template>
  <div>
    <a-card title="Taxpayers" />
    <a-divider />
    <a-row :gutter="20" type="flex" justify="center" align="middle">
      <a-col :span="24" v-if="loading">
        <img
          src="https://www.diamondback.com/skin/frontend/ally/default/images/opc-ajax-loader.1569428260.gif"
        />
      </a-col>
      <a-col
        v-else
        v-for="(taxpayer, index) in taxpayers"
        :key="index"
        :xs="{ span: 24 }"
        :md="{ span: 12 }"
        :xl="{ span: 8 }"
        style="margin-bottom: 1vh;"
      >
        <a-card>
          <template class="ant-card-actions" slot="actions">
            <span @click="moreDetails(taxpayer)">More Details...</span>
          </template>
          <a-card-grid style="width: 100%">
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
      columns: [
        {
          title: "TIN",
          dataIndex: "tin",
          key: "tin"
        },
        {
          title: "RDO",
          dataIndex: "rdo_code",
          key: "rdo_code"
        },
        {
          title: "Taxpayer Type",
          dataIndex: "taxpayer_type",
          key: "taxpayer_type"
        },
        {
          title: "Filer Type",
          dataIndex: "filer_type",
          key: "filer_type"
        },
        {
          title: "Registered Name",
          dataIndex: "registered_name",
          key: "registered_name"
        },
        {
          title: "Registered Address",
          dataIndex: "address",
          key: "address"
        },
        {
          title: "Line of Business",
          dataIndex: "line_of_business",
          key: "line_of_business"
        },
        {
          title: "Telephone No",
          dataIndex: "telno",
          key: "telno"
        },
        {
          title: "Email Address",
          dataIndex: "email",
          key: "email"
        }
      ],
      loading: false
    };
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
  computed: {
    taxpayers() {
      return this.$store.state.taxpayers.taxpayers;
    }
  },
  methods: {
    getDescription(tp) {
      var test = <span></span>;
      return `TIN: <b>${this.formatTIN(tp.tin)}</b><br/>RDO: <b>${
        tp.rdo_code
      }</b><br/>Collected: <b>${1000}</b><br/>Filed: <b>${1000}</b>`;
    },
    moreDetails(tp) {
      console.log("tp :", tp);
    }
  }
};
</script>

<style>
</style>