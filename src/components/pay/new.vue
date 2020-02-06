<template>
  <a-card>
    <!-- <a-button type="primary" @click="canSelect">{{can_select? 'DESELECT' : 'SELECT'}}</a-button> -->
    <a-table
      :loading="loading"
      :dataSource="tax_returns"
      :columns="cols"
      v-bind="{ rowSelection:{selectedRowKeys: selectedRowKeys, onChange: onSelectChange} }"
    >
      <span slot="action" slot-scope="text,record">
        <a-tooltip title="Quick Payment">
          <a-button type="primary" @click="show(record)" icon="credit-card" shape="circle"></a-button>
          <!-- <a-button type="primary" @click="printReceipt()" icon="credit-card" shape="circle"></a-button> -->
        </a-tooltip>
      </span>
      <span slot="tin" slot-scope="tin">{{formatTIN(tin)}}</span>
      <span slot="amount" slot-scope="amount">₱{{formatAmount(amount)}}</span>
      <span slot="date" slot-scope="date">{{formatDate(date)}}</span>
      <template slot="footer" v-if="selectedRowKeys && selectedRowKeys.length>1">
        <a-row type="flex" justify="end">
          <a-col :span="8">
            <a-button type="primary" block @click="showMultiple()">
              <a-icon type="credit-card" />
              Mutliple Payments ({{selectedRowKeys.length}})
            </a-button>
          </a-col>
        </a-row>
      </template>
    </a-table>
    <a-drawer :closable="false" :width="850" @close="show_payment=false" :visible="show_payment">
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
            <!-- <a-tab-pane key="2">
              <template slot="tab">
                <a-tooltip title="Over the Counter">
                  <a-icon type="shop" style="font-size: 24px"></a-icon>
                </a-tooltip>
              </template>
            </a-tab-pane>-->
          </a-tabs>
        </a-col>
        <a-col :span="14">
          <a-card>
            <component :is="current_option" @mounted="init_card" :details="payment_details" />
          </a-card>
        </a-col>
        <a-col :span="10" v-if="payment_mode==='multiple'">
          <a-card
            style="background: linear-gradient(to bottom, #000046, #1cb5e0)"
            :bodyStyle="{ 'padding-bottom': '5px'}"
          >
            <h2 style="color: #FFFFFF">Summary</h2>
            <a-divider></a-divider>
            <a-row>
              <!-- <a-col :span="24">
                <p style="color: #FFFFFF">Details:</p>
              </a-col>-->
              <a-col :span="12">
                <p style="color: #FFFFFF;">Reference No:</p>
                <p style="color: #FFFFFF;">Tax Return:</p>
                <p style="color: #FFFFFF">TIN:</p>
              </a-col>
              <a-col :span="12">
                <p style="text-align: right;color: #FFFFFF">{{current_record.reference_no}}</p>
                <p style="text-align: right;color: #FFFFFF">{{current_record.form_type}}</p>
                <p style="text-align: right;color: #FFFFFF">{{formatTIN(current_record.tin)}}</p>
              </a-col>
              <a-divider></a-divider>
              <!-- <a-col :span="24">
                <p style="color: #FFFFFF">Payments:</p>
              </a-col>-->
              <a-col :span="12">
                <p style="color: #FFFFFF">Tax Due:</p>
                <p style="color: #FFFFFF">Penalties:</p>
                <p style="color: #FFFFFF">Transaction Fee:</p>
              </a-col>
              <a-col :span="12">
                <p
                  style="text-align: right;color: #FFFFFF"
                >₱ {{formatAmount(current_record.tax_due)}}</p>
                <p
                  style="text-align: right;color: #FFFFFF"
                >₱ {{formatAmount(current_record.total_penalties)}}</p>
                <p style="text-align: right;color: #FFFFFF">₱ {{formatAmount(fee)}}</p>
              </a-col>
              <a-divider></a-divider>
              <a-col :span="12">
                <p style="color: #FFFFFF">Sub Total:</p>
              </a-col>
              <a-col :span="12">
                <p
                  style="text-align: right;color: #FFFFFF"
                >₱ {{formatAmount(current_record.sub_total)}}</p>
              </a-col>
              <a-col :span="12" style="text-align: left;">
                <a-button
                  style="color: white; font-weight: bold;"
                  icon="left"
                  :type="current_index<=0 ? 'link' : 'primary'"
                  :disabled="current_index<=0"
                  @click="current_index--"
                >Previous</a-button>
              </a-col>
              <a-col :span="12" style="text-align: right;">
                <a-button
                  style="color: white; font-weight: bold;"
                  icon="right"
                  :type="current_index>=(selectedRowKeys.length - 1) ? 'link' : 'primary'"
                  :disabled="current_index>=(selectedRowKeys.length - 1)"
                  @click="current_index++"
                >Next</a-button>
              </a-col>
            </a-row>
          </a-card>
          <a-card
            style="background: linear-gradient(to bottom, #000046, #1cb5e0)"
            :bodyStyle="{ 'padding-bottom': '0'}"
          >
            <a-row>
              <a-col :span="12">
                <p style="color: #FFFFFF">
                  <b>Total:</b>
                </p>
              </a-col>
              <a-col :span="12">
                <p style="text-align: right;color: #FFFFFF">
                  <b>₱ {{formatAmount(multiple_payments_total)}}</b>
                </p>
              </a-col>
            </a-row>
          </a-card>
          <a-button
            block
            type="primary"
            size="large"
            style="margin-top: 5vh"
            :loading="loading_payments"
            @click="submit"
          >Submit</a-button>
        </a-col>
        <a-col :span="10" v-else>
          <a-card style="background: linear-gradient(to bottom, #000046, #1cb5e0)">
            <h2 style="color: #FFFFFF">Summary</h2>
            <a-divider></a-divider>
            <a-row>
              <!-- <a-col :span="24">
                <p style="color: #FFFFFF">Details:</p>
              </a-col>-->
              <a-col :span="12">
                <p style="color: #FFFFFF;">Form Type:</p>
                <p style="color: #FFFFFF">TIN:</p>
              </a-col>
              <a-col :span="12">
                <p style="text-align: right;color: #FFFFFF">{{record.form_type}}</p>
                <p style="text-align: right;color: #FFFFFF">{{formatTIN(record.tin)}}</p>
              </a-col>
              <a-divider></a-divider>
              <!-- <a-col :span="24">
                <p style="color: #FFFFFF">Payments:</p>
              </a-col>-->
              <a-col :span="12">
                <p style="color: #FFFFFF">Tax Due:</p>
                <p style="color: #FFFFFF">Penalties:</p>
                <p style="color: #FFFFFF">Transaction Fee:</p>
                <a-divider></a-divider>
                <p style="color: #FFFFFF">
                  <b>Total:</b>
                </p>
              </a-col>
              <a-col :span="12">
                <p style="text-align: right;color: #FFFFFF">₱ {{formatAmount(record.tax_due)}}</p>
                <p
                  style="text-align: right;color: #FFFFFF"
                >₱ {{formatAmount(record.total_penalties)}}</p>
                <p style="text-align: right;color: #FFFFFF">₱ {{formatAmount(fee)}}</p>
                <a-divider></a-divider>
                <p style="text-align: right;color: #FFFFFF">
                  <b>₱ {{formatAmount(this.record.total)}}</b>
                </p>
              </a-col>
            </a-row>
          </a-card>
          <a-button
            block
            type="primary"
            size="large"
            style="margin-top: 5vh"
            :loading="loading_payments"
            @click="submit"
          >Submit</a-button>
        </a-col>
      </a-row>
    </a-drawer>
  </a-card>
</template>

<script>
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import printer from "@/plugins/pdf/printers/ereceipt";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
      records: [],
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
      ],
      can_select: false,
      selectedRowKeys: [],
      payment_mode: "single",
      current_index: 0,
      payment_details: {},
      loading_payments: false,
      loading: false
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
          console.log("get tax returns new payment data: " + JSON.stringify(result))
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
    },
    init_card() {
      if (!this.card) {
        this.card = new Card({
          form: "form",
          container: ".card-wrapper"
        });
      }
    },
    canSelect() {
      this.selectedRowKeys = [];
      this.records = [];
      this.can_select = !this.can_select;
      console.log("this.can_select :", this.can_select);
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    getDetails(details) {
      this.payment_details = details;
    },
    submit() {
      this.loading_payments = true;
      var payments = {
        references: [this.record.reference_no],
        amount_payable: this.record.total,
        amount_paid: this.record.total,
        payment_date: new Date(),
        payment_method: this.current_option,
        payment_details: this.payment_details,
        payment_mode: "single"
      };
      var action = "SINGLE_PAYMENT";
      if (this.payment_mode === "multiple") {
        action = "MULTIPLE_PAYMENT";
        const references = this.records.map(v => v.reference_no);
        payments.references = references;
        payments.amount_payable = this.multiple_payments_total;
        payments.amount_paid = this.multiple_payments_total;
      }
      this.$store
        .dispatch(action, payments)
        .then(result => {
          console.log("result.data.model :", result.data.model);
          this.printReceipt(result.data.model);
          this.loading_payments = false;
          this.init();
          this.$notification.success({
            message: "Successfully paid.",
            description: ""
          });
          this.reset();
          var act = {
            created_by:{
                account_id: this.$store.state.account_session.user.account_id,
                display_name: `${this.$store.state.account_session.user.name.first} ${this.$store.state.account_session.user.name.last}`,
                avatar: {},
            },
            activity:"3",
            description:`Paid the amount of ${formatAmount(payments.amount_paid)}`,
          }
          return this.$http.post(`/activities/${this.$store.state.account_session.user.account_id}`, act)
        }).then(result=>{
          console.log('ACT :::', JSON.stringify(result.data))
        })
        .catch(err => {
          console.log("PAYMENT err :", err);
          this.loading_payments = false;
        });
    },
    printReceipt(details) {
      console.log("PRINTING RECEIPT :::: ", JSON.stringify(details));
      var document = printer.fillup({});
      pdfMake.createPdf(document).getBuffer(buffer => {
        var file = new Blob([buffer], { type: "application/pdf" });

        var data = new FormData();
        data.append("tax_returns", file);
        data.append("content-type", "application/pdf");

        this.$store
          .dispatch("UPLOAD_TAX_RETURNS", {
            form: "e-receipt",
            ref_no: details.payments.payment_conf_no,
            form_data: data
          })
          .then(result => {
            console.log("UPLOAD RESULT ::: ", JSON.stringify(result));
          })
          .catch(err => {
            console.log("UPLOAD ERROR ::: ", JSON.stringify(result));
          });
      });
    },
    reset() {
      this.record = {};
      this.records = [];
      this.current_option = "CreditCard";
      this.payment_details = {};
      this.selectedRowKeys = [];
      this.show_payment = false;
    }
  },
  computed: {
    tax_returns() {
      console.log(
        "RETURNS :::",
        JSON.stringify(this.$store.state.tax_form.tax_returns)
      );
      const returns = this.deepCopy(this.$store.state.tax_form.tax_returns);
      const unpaid_returns = returns.filter(v => v.payment_status !== "paid");
      return unpaid_returns;
    },
    current_record() {
      console.log("this.current_index :", this.current_index);
      const record = this.records[this.current_index];
      console.log("record :", record);
      return record || {};
    },
    multiple_payments_total() {
      var total = 0;
      console.log("this.records :", this.records);
      if (this.records) {
        total = this.records.map(v => v.sub_total).reduce((t, c) => t + c);
      }
      return total;
    }
  }
};
</script>

