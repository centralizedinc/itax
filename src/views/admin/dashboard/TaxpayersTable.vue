<template>
  <a-card>
    <span slot="title">Taxpayers</span>
    <a-table :columns="columns" :dataSource="taxpayers"></a-table>
  </a-card>
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
      ]
    };
  },
  created() {
    this.$store.dispatch("GET_TAXPAYERS");
  },
  computed: {
    taxpayers() {
      return this.$store.state.taxpayers.taxpayers;
    }
  }
};
</script>

<style>
</style>