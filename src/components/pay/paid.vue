<template>
  <a-card>
    <!-- <a-button type="primary" @click="canSelect">{{can_select? 'DESELECT' : 'SELECT'}}</a-button> -->
    <a-table :loading="loading" :dataSource="paid_list" :columns="cols">
      <span slot="amount" slot-scope="amount">
        {{ formatAmount(amount)}}
      </span>
      <span slot="paid" slot-scope="paid">
        {{ formatAmount(paid)}}
      </span>
      <span slot="date" slot-scope="date">
        {{ formatDate(date)}}
      </span>
    </a-table>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      paid_list: [],
      cols: [
        {
          title: "PRN",
          dataIndex: "payment_conf_no"
        },
        {
          title: "Amount Due",
          dataIndex: "amount_payable",
          scopedSlots: { customRender: "amount" }

        },
        {
          title: "Amount Paid",
          dataIndex: "amount_paid",
          scopedSlots: { customRender: "paid" }
        },
        {
          title: "Payment Date",
          dataIndex: "date_created",
          scopedSlots: { customRender: "date" }
        },
        // {
        //   title: "Status",
        //   dataIndex: "payment_status"
        // },
        {
          title: "Channel",
          dataIndex: "payment_method"
        }
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    // init() {
    //   this.loading = true;
    //   console.log("GET_TAX_RETURNS");
    //   this.$http
    //     .get(`/payment/`)
    //     .then(result => {
    //       console.log(
    //         "get tax returns paid payment data: " + JSON.stringify(result)
    //       );
    //       this.loading = false;
    //       this.paid_list = this.deepCopy(result.data.model);
    //       // return result.data.model
    //     })
    //     .catch(err => {
    //       this.loading = false;
    //     });
    // },
    init(){
      this.$http.get(`/payment/${this.$store.state.account_session.user.account_id}`)
        .then(result => {
            console.log("get tax returns paid payment data: " + JSON.stringify(result));
            this.loading = false;
            //TODO: workaround only
            // var total =0
            // if(result.data && result.data.model){
            //     result.data.model.forEach(element => {
            //         total =+ element.amount_paid
            //     });
            //     result.data.model.total = total
            // }
            
            this.paid_list = result.data.model;
            console(JSON.stringify(this.paid_list))
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
  // computed: {
    // tax_returns() {
    //   console.log("RETURNS tax returns::: ", JSON.stringify(this.paid_list));
    //   const paid_returns = [];
    //   const returns = this.deepCopy(this.$store.state.tax_form.tax_returns);
    //   const unpaid_returns = returns.filter(v => v.payment_status !== "unpaid");
    //   console.log(
    //     "upaid returns of paid data: " + JSON.stringify(unpaid_returns)
    //   );

    //   // this.paid_list.filter(
    //   //   v => v.created_by == unpaid_returns.created_by
    //   // );
    //   unpaid_returns.forEach(unpaid => {
    //     this.paid_list.forEach(paid => {
    //       if (unpaid.created_by == paid.created_by) {
    //         paid.payment_status = unpaid.payment_status;
    //         paid.date_filed = unpaid.date_filed;
    //         paid_returns.push(paid);
    //       }
    //     });
    //   });

    //   console.log("paid_returns data: " + JSON.stringify(paid_returns));
    //   return paid_returns;
    // }
  // }
};
</script>