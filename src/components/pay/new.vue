<template>
  <a-card>
    <a-table :dataSource="tax_returns" :columns="cols">
      <span slot="action" slot-scope="text,record">
        <a-button type="primary" @click="show(record)" icon="credit-card" shape="circle"></a-button>
        <!-- <a-button type="primary" @click="show_payment=true"><a-icon type="shop"></a-icon>Over the Counter</a-button> -->
      </span>
      <span slot="tin" slot-scope="tin">{{formatTIN(tin)}}</span>
      <span slot="amount" slot-scope="amount">₱{{formatAmount(amount)}}</span>
      <span slot="date" slot-scope="date">{{formatDate(date)}}</span>
    </a-table>
    <a-drawer :closable="false" :width="800" @close="show_payment=false" :visible="show_payment">
      <a-row type="flex" :gutter="16">
        <a-col :span="24">
          <a-card style="background: linear-gradient(to right, #000046, #1cb5e0)">
            <h2 style="color: #FFFFFF">Payment Options</h2>
          </a-card>
          <a-tabs @change="navigate" style="margin-top:2vh">
            <a-tab-pane key="0">
              <template slot="tab">
                <a-tooltip title="Credit Card">
                  <a-icon type="credit-card" style="font-size: 24px"></a-icon>
                </a-tooltip>
              </template>
            </a-tab-pane>
            <a-tab-pane key="1">
              <template slot="tab">
                <a-tooltip title="Online Banking">
                  <a-icon type="bank" style="font-size: 24px"></a-icon>
                </a-tooltip>
              </template>
            </a-tab-pane>
            <a-tab-pane key="2">
              <template slot="tab">
                <a-tooltip title="Over the Counter">
                  <a-icon type="shop" style="font-size: 24px"></a-icon>
                </a-tooltip>
              </template>
            </a-tab-pane>
          </a-tabs>
        </a-col>
        <a-col :span="14">
          <a-card>
            <component :is="current_option" @mounted="init_card" />
          </a-card>
        </a-col>
        <a-col :span="10" style="margin-top:10vh">
          <a-card style="background: linear-gradient(to bottom, #000046, #1cb5e0)">
            <h2 style="color: #FFFFFF">Summary</h2>
            <a-divider></a-divider>
            <a-row>
              <a-col :span="14">
                <p style="color: #FFFFFF">Tax Due:</p>
                <p style="color: #FFFFFF">Penalties:</p>
                <p style="color: #FFFFFF">Transaction Fee:</p>
                <a-divider></a-divider>
                <p style="color: #FFFFFF">
                  <b>Total:</b>
                </p>
              </a-col>
              <a-col :span="10">
                <p style="text-align: right;color: #FFFFFF">₱ {{formatAmount(record.tax_due)}}</p>
                <p
                  style="text-align: right;color: #FFFFFF"
                >₱ {{formatAmount(record.total_penalties)}}</p>
                <p style="text-align: right;color: #FFFFFF">₱ {{formatAmount(fee)}}</p>
                <a-divider></a-divider>
                <p style="text-align: right;color: #FFFFFF">
                  <b>₱ {{formatAmount(record.total_amount_payable + fee)}}</b>
                </p>
              </a-col>
            </a-row>
          </a-card>
          <a-button block type="primary" size="large" style="margin-top: 5vh">Submit</a-button>
        </a-col>
      </a-row>
    </a-drawer>
  </a-card>
</template>

<script>
import Payment from "@/components/pay/payment";
import CreditCard from "./creditCard";
import OnlineBanking from "./onlineBanking";
import OverCounter from "./overCounter";
import Card from "card";
export default {
  components: { Payment, CreditCard, OnlineBanking, OverCounter },
  data() {
    return {
      current_option: "CreditCard",
      card: null,
      show_payment: false,
      tabs: ["CreditCard", "OnlineBanking", "OverCounter"],
      record: {},
      fee: 250,
      cols: [
        {
          title: "FRN",
          dataIndex: "reference_no"
        },
        {
          title: "Form",
          dataIndex: "form_type"
        },
        {
          title: "TIN",
          dataIndex: "tin",
          scopedSlots: { customRender: "tin" }
        },
        {
          title: "Amount Due",
          dataIndex: "total_amount_payable",
          scopedSlots: { customRender: "amount" }
        },
        {
          title: "Due Date",
          dataIndex: "date_filed",
          scopedSlots: { customRender: "date" }
        },
        {
          title: "Pay",
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      console.log("GET_TAX_RETURNS");
      this.$store
        .dispatch("GET_TAX_RETURNS")
        .then(result => {
          this.loading = false;
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
      this.record = record;
      this.show_payment = true;
    },
    navigate(e) {
      this.current_option = this.tabs[e];
    },
    init_card() {
      if (!this.card) {
        this.card = new Card({
          form: "form",
          container: ".card-wrapper"
        });
      }
    }
  },
  computed: {
    tax_returns() {
      console.log(
        "RETURNS :::",
        JSON.stringify(this.$store.state.tax_form.tax_returns)
      );
      return this.deepCopy(this.$store.state.tax_form.tax_returns);
    }
  }
};
</script>

