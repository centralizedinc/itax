<template>
  <div align="center">
    <a-card title="Payment Summary" style="width:500px">
      <a-row>
        <a-col :span="12" align="right">
          <h3>FRN:</h3>
        </a-col>
        <a-col :span="12" align="left">
          <h3>"{{}}"</h3>
        </a-col>
      </a-row>
      <a-divider></a-divider>
      <a-row>
        <a-col :span="12" align="right">
          <h3>Form:</h3>
        </a-col>
        <a-col :span="12" align="left">
          <h3>"1601e"</h3>
        </a-col>
      </a-row>
      <a-divider></a-divider>
      <a-row>
        <a-col :span="12" align="right">
          <h3>TIN:</h3>
        </a-col>
        <a-col :span="12" align="left">
          <h3>"{{}}"</h3>
        </a-col>
      </a-row>
      <a-divider></a-divider>
      <a-row>
        <a-col :span="12" align="right">
          <label class="subheading">Amount Due:</label>
        </a-col>
        <a-col :span="12" align="left">
          <label class="subheading">"{{}}"</label>
        </a-col>
      </a-row>
      <a-divider></a-divider>
      <div align="center">
        <a-button @click="credit_card" style="margin-right:10px">Credit Card</a-button>
        <a-button @click="easypay" style="margin-right:10px">EasyPay</a-button>
        <a-button @click="seven11" style="margin-right:10px">7/Eleven</a-button>
      </div>
    </a-card>

    <a-modal v-model="cc_modal" title="Payment via Credit Card">
      <a-card title="Payment Summary">
        <a-row>
          <a-col :span="12" align="right">
            <label class="subheading">FRN:</label>
          </a-col>
          <a-col :span="12" align="left">
            <label class="subheading">"{{}}"</label>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" align="right">
            <label class="subheading">Form:</label>
          </a-col>
          <a-col :span="12" align="left">
            <label class="subheading">"1601e"</label>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" align="right">
            <label class="subheading">TIN:</label>
          </a-col>
          <a-col :span="12" align="left">
            <label class="subheading">"{{}}"</label>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" align="right">
            <label class="subheading">Amount Due:</label>
          </a-col>
          <a-col :span="12" align="left">
            <label class="subheading">"{{}}"</label>
          </a-col>
        </a-row>
      </a-card>
      <a-card title="Card Details">
        <a-input placeholder="Credit Card Number"></a-input>
        <a-input placeholder="CVC"></a-input>
        <a-input placeholder="Card Holder"></a-input>
        <a-date-picker placeholder="Select Card Date Expiry"></a-date-picker>
      </a-card>
      <a-card title="Contact Details">
        <a-input placeholder="Email Address"></a-input>
        <a-textarea placeholder="Address" autosize />
        <a-auto-complete
          :dataSource="region_data"
          :filterOption="filterOption"
          placeholder="Region"
        />
        <a-auto-complete
          :dataSource="province_data"
          :filterOption="filterOption"
          placeholder="Region"
        />
        <a-auto-complete :dataSource="city_data" :filterOption="filterOption" placeholder="Region" />
        <a-input placeholder="Zip Code"></a-input>
      </a-card>
      <template slot="footer">
        <a-button @click="handlecancel">Cancel</a-button>
        <a-button @click="pay(0)">Pay</a-button>
      </template>
    </a-modal>
    <!-- <a-modal v-model="cc_modal" title="Payment via Credit Card">
      <a-card title="Payment Summary">
        <a-row>
          <a-col :span="12" align="right">
            <label class="subheading">FRN:</label>
          </a-col>
          <a-col :span="12" align="left">
            <label class="subheading">"{{}}"</label>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" align="right">
            <label class="subheading">Form:</label>
          </a-col>
          <a-col :span="12" align="left">
            <label class="subheading">"1601e"</label>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" align="right">
            <label class="subheading">TIN:</label>
          </a-col>
          <a-col :span="12" align="left">
            <label class="subheading">"{{}}"</label>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12" align="right">
            <label class="subheading">Amount Due:</label>
          </a-col>
          <a-col :span="12" align="left">
            <label class="subheading">"{{}}"</label>
          </a-col>
        </a-row>
      </a-card>
      <a-card title="Card Details">
        <a-input placeholder="Credit Card Number"></a-input>
        <a-input placeholder="CVC"></a-input>
        <a-input placeholder="Card Holder"></a-input>
        <a-date-picker placeholder="Select Card Date Expiry"></a-date-picker>
      </a-card>
      <template slot="footer">
        <a-button @click="handlecancel">Cancel</a-button>
        <a-button @click="pay(0)">Pay</a-button>
      </template>
    </a-modal>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      cc_modal: false,
      region_data: ["Region 1", "Region 2"],
      province_data: ["Tarlac", "Sulu"],
      city_data: ["Dasmariñas City", "San Pablo City"]
    };
  },
  methods: {
    credit_card() {
      this.cc_modal = true;
    },
    easypay() {},
    seven11() {},
    handlecancel() {
      this.cc_modal = false;
    },
    filterOption(input, option) {
      console.log("filter option: " + JSON.stringify(option));
      console.log("filter input: " + JSON.stringify(input));
      return (
        option.componentOptions.children[0].text
          .toUpperCase()
          .indexOf(input.toUpperCase()) >= 0
      );
    }
  }
};
</script>

<style>
</style>