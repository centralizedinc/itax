<template>
  <a-card>
    <!-- <a-button type="primary" @click="canSelect">{{can_select? 'DESELECT' : 'SELECT'}}</a-button> -->
    <a-table
      :loading="loading"
      :dataSource="tax_returns"
      :columns="cols"
    >
      
    </a-table>
  </a-card>
</template>

<script>
export default {
  data(){
    return{
      loading: false,
      cols:[
        {
          title: 'PRN',
          dataIndex: 'reference_no',
        },
        {
          title: 'Amount Due',
          dataIndex: 'total_amount_payable',
        },
        {
          title: 'Amount Paid',
          dataIndex: 'total_amount_payable',
        },
        {
          title: 'Payment Date',
          dataIndex: 'date_modified',
        },
        {
          title: 'Status',
          dataIndex: 'payment_status',
        },
        {
          title: 'Channel',
          dataIndex: 'created_date',
        },
      ]
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      console.log("GET_TAX_RETURNS");
      this.$http.get("/payment")
        .then(result => {
          console.log("get tax returns paid payment data: " + JSON.stringify(result))
          this.loading = false;
          return result.data.model
        })
        .catch(err => {
          this.loading = false;
        });
    },
    changeView(key) {
      this.currentView = this.tabView[key];
      window.scrollTo(0, 0);
    },
    show(record) {
      this.payment_mode = "single";
      this.record = record;
      this.record.total = this.record.total_amount_payable + this.fee;
      this.show_payment = true;
    },
    showMultiple() {
      this.payment_mode = "multiple";
      this.records = this.tax_returns
        .filter((v, i) => this.selectedRowKeys.includes(i))
        .map(v => {
          v.sub_total = v.total_amount_payable + this.fee;
          return v;
        });
      this.show_payment = true;
    },
    navigate(e) {
      this.current_option = this.tabs[e];
    }
  },
  computed: {
    tax_returns() {
      console.log(
        "RETURNS :::",
        JSON.stringify(this.init())
      );
      const returns = this.deepCopy(this.init());
      const unpaid_returns = returns.filter(v => v.payment_status !== "unpaid");
      return unpaid_returns;
    },
  }

}
</script>