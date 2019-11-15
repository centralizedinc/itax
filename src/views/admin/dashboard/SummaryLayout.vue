<template>
  <div>
    <a-row :gutter="10" style="margin-bottom: 2vh; height: 33vh;">
      <a-col
        :span="12"
        v-for="(item, index) in statistics"
        :key="`a${index}`"
        style="margin-bottom: 1.3vh;"
      >
        <a-card :bodyStyle="{ padding: '2px', 'text-align': 'center' }">
          <span class="item-description">{{item.name}}</span>
          <br />
          <a-tooltip>
            <span slot="title">{{formatAmount(item.amount)}}</span>
            <a-icon
              :type="item.is_increased ? 'arrow-up' : 'arrow-down'"
              :style="`color: ${item.is_increased ? 'green' : 'red'}`"
            />
            <span class="item-value">{{nFormatter(item.amount, 2)}}</span>
          </a-tooltip>
        </a-card>
      </a-col>
    </a-row>

    <div v-if="!login_rdo" style="margin-bottom: 2vh;">
      <a-card title="Collection per RDO Summary" style="margin-bottom: 0.6vh" />
      <a-card
        v-for="(item, index) in top_rdos"
        :key="index"
        :bodyStyle="{ padding: 0 }"
        style="margin-bottom: 0.75vh;"
      >
        <a-card-grid style="width: 100%; padding: 1vh 15px">
          <span class="item-description">{{item.description}} ({{item.code}})</span>
          <a-tooltip style="float: right;">
            <span slot="title">{{formatAmount(item.collections)}}</span>
            <a-icon
              :type="item.is_increased ? 'arrow-up' : 'arrow-down'"
              :style="`color: ${item.is_increased ? 'green' : 'red'};`"
            />
            <span class="item-value">{{nFormatter(item.collections, 2)}}</span>
          </a-tooltip>
        </a-card-grid>
      </a-card>
    </div>

    <rdo-map class="rdo-map" />
  </div>
</template>

<script>
import RdoMap from "./RDOMap";

export default {
  components: {
    RdoMap
  },
  data() {
    return {
      items: [],
      statistics: []
    };
  },
  created() {
    this.$store
      .dispatch("GET_RDOS")
      .then(result => {
        // if (!this.login_rdo) {
        //   this.getMockData();
        //   this.setMockDataRealtime();
        // }
        this.getStatisticsMockData();
        this.setStatisticsMockDataRealtime();
      })
      .catch(err => {});
  },
  computed: {
    top_rdos(){
      return this.deepCopy(this.rdos).slice(0, 9);
    },
    rdos() {
      return this.$store.state.tax_form.rdos;
    },
    login_rdo() {
      return this.$store.state.tax_form.login_rdo;
    }
  },
  methods: {
    getMockData() {
      for (let i = 0; i < 9; i++) {
        this.items.push({
          code: this.rdos[i].code,
          description: this.rdos[i].description,
          is_increased: true,
          collection: this.getRandomArbitrary(10000000, 1000000)
        });
      }
      this.items.sort((a, b) => b.collection - a.collection);
    },
    getStatisticsMockData() {
      var stats = [
        {
          name: "Collections this year",
          is_increased: true,
          max: 6000000,
          min: 5000000
        },
        {
          name: "Collections this month",
          is_increased: true,
          max: 800000,
          min: 500000
        },
        {
          name: "Returns this year",
          is_increased: true,
          max: 10000000,
          min: 6000000
        },
        {
          name: "Returns this month",
          is_increased: true,
          max: 1000000,
          min: 800000
        },
        {
          name: "Taxpayers this year",
          is_increased: false,
          max: 5000000,
          min: 1000000
        },
        {
          name: "Taxpayers this month",
          is_increased: true,
          max: 500000,
          min: 100000
        }
      ];
      for (let i = 0; i < stats.length; i++) {
        this.statistics.push({
          name: stats[i].name,
          is_increased: stats[i].is_increased,
          amount: this.getRandomArbitrary(stats[i].max, stats[i].min)
        });
      }
    },
    getRandomArbitrary(max, min) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    nFormatter(num, digits) {
      var si = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
      ];
      var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var i;
      for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
          break;
        }
      }
      return (
        (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol
      );
    },
    // setMockDataRealtime() {
    //   setInterval(() => {
    //     var items = this.items.map(item => {
    //       var random = Math.floor(Math.random() * 10000);
    //       item.collection += random;
    //       return item;
    //     });
    //     this.items = items;
    //     this.items.sort((a, b) => b.collection - a.collection);
    //   }, 1000);
    // },
    setStatisticsMockDataRealtime() {
      setInterval(() => {
        var items = this.statistics.map(item => {
          var random = Math.floor(Math.random() * 10000);
          item.amount += random;
          return item;
        });
        this.statistics = items;
      }, 1000);
    }
  }
};
</script>

<style>
.item-description {
  font-weight: bold;
  font-size: 10px;
  line-height: 2.7;
}

.item-value {
  font-weight: 300;
  font-size: 18px;
  color: blue;
}

.rdo-map .vue-map-container {
  height: 60vh !important;
}
</style>