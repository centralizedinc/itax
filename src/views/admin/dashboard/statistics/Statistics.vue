<template>
  <a-row class="statistic-chart" :gutter="10">
    <!-- Collection -->
    <a-col style="height: 28vh; margin-bottom: 7vh;" :xs="{ span: 24 }" :md="{ span: 8 }">
      <a-card
        :bodyStyle="{ padding: 0, height: '100%' }"
        :class="`${collections_mode === 'y' ? 'select-yearly' : 'select-monthly'} max-height`"
      >
        <span class="collection-counts">
          <h5
            class="counts-label"
          >{{collections_mode === 'y' ? 'Yearly Collections' : `Monthly Collections in year ${collections_year}`}}</h5>
          <a-tooltip>
            <span slot="title">{{formatCounts(collections_total, true)}}</span>
            <span class="counts">{{formatCounts(collections_total)}}</span>
          </a-tooltip>
        </span>
        <a-spin class="loading-spin" v-if="loading_collection" />
        <line-chart ref="collections_line_chart" class="max-height" />
        <template slot="actions">
          <div @click="getDataCollectionYearly()">
            <span>Yearly</span>
          </div>
          <div @click="getDataCollectionMonthly()">
            <span>Monthly</span>
          </div>
        </template>
      </a-card>
    </a-col>

    <!-- Returns -->
    <a-col style="height: 28vh; margin-bottom: 7vh;;" :xs="{ span: 24 }" :md="{ span: 8 }">
      <a-card
        :bodyStyle="{ padding: 0, height: '100%' }"
        :class="`${returns_mode === 'y' ? 'select-yearly' : 'select-monthly'} max-height`"
      >
        <span class="collection-counts">
          <h5
            class="counts-label"
          >{{returns_mode === 'y' ? 'Yearly Returns' : `Monthly Returns in year ${returns_year}`}}</h5>
          <a-tooltip>
            <span slot="title">{{formatCounts(returns_total, true)}}</span>
            <span class="counts">{{formatCounts(returns_total)}}</span>
          </a-tooltip>
        </span>
        <a-spin class="loading-spin" v-if="loading_returns" />
        <line-chart ref="returns_line_chart" class="max-height" />
        <template slot="actions">
          <div @click="getDataReturnsYearly()">
            <span>Yearly</span>
          </div>
          <div @click="getDataReturnsMonthly()">
            <span>Monthly</span>
          </div>
        </template>
      </a-card>
    </a-col>

    <!-- Taxpayers -->
    <a-col style="height: 28vh; margin-bottom: 7vh;" :xs="{ span: 24 }" :md="{ span: 8 }">
      <a-card
        :bodyStyle="{ padding: 0, height: '100%' }"
        :class="`${taxpayers_mode === 'y' ? 'select-yearly' : 'select-monthly'} max-height`"
      >
        <span class="collection-counts">
          <h5
            class="counts-label"
          >{{taxpayers_mode === 'y' ? 'Yearly Taxpayers' : `Monthly Taxpayers in year ${taxpayers_year}`}}</h5>
          <a-tooltip>
            <span slot="title">{{formatCounts(taxpayers_total, true)}}</span>
            <span class="counts">{{formatCounts(taxpayers_total)}}</span>
          </a-tooltip>
        </span>
        <a-spin class="loading-spin" v-if="loading_taxpayers" />
        <line-chart ref="taxpayers_line_chart" class="max-height" />
        <template slot="actions">
          <span @click="getDataTaxpayersYearly()">Yearly</span>
          <span @click="getDataTaxpayersMonthly()">Monthly</span>
        </template>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { Line } from "vue-chartjs";
import axios from "axios";

export default {
  components: {
    LineChart: Line
  },
  mounted() {
    this.getDataCollectionYearly();
    this.getDataReturnsYearly();
    this.getDataTaxpayersYearly();
  },
  data() {
    return {
      collection_data: {
        labels: [],
        datasets: [
          {
            label: "Collection",
            radius: 1,
            hoverRadius: 15,
            borderWidth: 0,
            borderColor: "#ffffff",
            data: []
          }
        ]
      },
      returns_data: {
        labels: [],
        datasets: [
          {
            label: "Returns",
            radius: 1,
            hoverRadius: 15,
            borderWidth: 0,
            borderColor: "#ffffff",
            data: []
          }
        ]
      },
      taxpayers_data: {
        labels: [],
        datasets: [
          {
            label: "Taxpayers",
            radius: 1,
            hoverRadius: 15,
            borderWidth: 0,
            borderColor: "#ffffff",
            data: []
          }
        ]
      },
      returns_options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              display: false
            }
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: true,
                max: 200
              }
            }
          ]
        },
        onClick: (e, a) => {
          if (a && a[0] && this.returns_mode === "y") {
            this.getDataReturnsMonthly(
              this.returns_data.labels[a[0]._index]
            );
          }
        }
      },
      collections_options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              display: false
            }
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: true,
                max: 200
              }
            }
          ]
        },
        onClick: (e, a) => {
          console.log("a :", a);
          if (a && a[0] && this.collections_mode === "y") {
            this.getDataCollectionMonthly(
              this.collection_data.labels[a[0]._index]
            );
          }
        }
      },
      taxpayers_options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              display: false
            }
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: true,
                max: 200
              }
            }
          ]
        },
        onClick: (e, a) => {
          console.log("a :", a);
          if (a && a[0] && this.taxpayers_mode === "y") {
            this.getDataTaxpayersMonthly(
              this.taxpayers_data.labels[a[0]._index],
              this.taxpayers_data.datasets[0].data[a[0]._index]
            );
          }
        }
      },
      collections_total: 0,
      collections_mode: "",
      collections_year: "",
      returns_total: 0,
      returns_mode: "",
      returns_year: "",
      taxpayers_total: 0,
      taxpayers_mode: "",
      taxpayers_year: "",
      collection_on_left: true,
      returns_on_left: true,
      taxpayers_on_left: true,
      months: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC"
      ],

      loading_collection: false,
      loading_returns: false,
      loading_taxpayers: false
    };
  },
  methods: {
    formatCounts(val, disableShortcut) {
      if (!disableShortcut && val.toString().length > 5) {
        return this.nFormatter(val, 1);
      } else {
        var parts = val.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts[0];
      }
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

    // Collection
    async getDataCollectionYearly() {
      // Last 10 years
      if (this.collections_mode !== "y") {
        this.collections_mode = "y";
        this.loading_collection = true;
        var result = await axios.get(
          `${process.env.VUE_APP_BASE_API_URI}analytics/collections/yearly?rdo=${this.login_rdo}`
        );
        var results = result.data;
        results.sort((a, b) => a.year - b.year);

        this.collection_data.labels = results.map(v => v.year);
        this.collection_data.datasets[0].data = results.map(v => v.collections);
        var collections = results.map(v => v.collections).sort((a, b) => b - a);
        this.collections_options.scales.yAxes[0].ticks.max =
          collections[0] + Math.floor(collections[0] / 2);
        var gradient = this.$refs.collections_line_chart.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "rgba(0, 0, 255, 1)");
        gradient.addColorStop(0.5, "rgba(0, 0, 255, 0.75)");
        gradient.addColorStop(1, "rgba(0, 0, 255, 0)");
        this.collection_data.datasets[0].backgroundColor = gradient;
        this.$refs.collections_line_chart.renderChart(
          this.collection_data,
          this.collections_options
        );

        this.collections_total = collections.reduce((t, c) => t + c);
        this.loading_collection = false;
      }
    },
    async getDataCollectionMonthly(year) {
      if (this.collections_mode !== "m") {
        if(!year) year = new Date().getFullYear();
        this.collections_mode = "m";
        this.collections_year = year;
        this.loading_collection = true;
        var result = await axios.get(
          `${process.env.VUE_APP_BASE_API_URI}analytics/collections/monthly/${year}?rdo=${this.login_rdo}`
        );
        var results = result.data;
        results.sort((a, b) => a.month - b.month);

        this.collection_data.labels = results.map(v => this.months[v.month]);
        this.collection_data.datasets[0].data = results.map(v => v.collections);
        var collections = results.map(v => v.collections).sort((a, b) => b - a);
        this.collections_options.scales.yAxes[0].ticks.max =
          collections[0] + Math.floor(collections[0] / 2);
        var gradient = this.$refs.collections_line_chart.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "rgba(0, 0, 255, 1)");
        gradient.addColorStop(0.5, "rgba(0, 0, 255, 0.75)");
        gradient.addColorStop(1, "rgba(0, 0, 255, 0)");
        this.collection_data.datasets[0].backgroundColor = gradient;
        this.$refs.collections_line_chart.renderChart(
          this.collection_data,
          this.collections_options
        );

        this.collections_total = collections.reduce((t, c) => t + c);
        this.loading_collection = false;
      }
    },

    // Returns
    async getDataReturnsYearly() {
      // Last 10 years
      if (this.returns_mode !== "y") {
        this.returns_mode = "y";
        this.loading_returns = true;
        var result = await axios.get(
          `${process.env.VUE_APP_BASE_API_URI}analytics/returns/yearly?rdo=${this.login_rdo}`
        );
        var results = result.data;
        results.sort((a, b) => a.year - b.year);

        this.returns_data.labels = results.map(v => v.year);
        this.returns_data.datasets[0].data = results.map(v => v.counts);
        var returns = results.map(v => v.counts).sort((a, b) => b - a);
        this.returns_options.scales.yAxes[0].ticks.max =
          returns[0] + Math.floor(returns[0] / 2);
        var gradient = this.$refs.returns_line_chart.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "rgba(255, 0, 0, 1)");
        gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.75)");
        gradient.addColorStop(1, "rgba(255, 0, 0, 0)");
        this.returns_data.datasets[0].backgroundColor = gradient;
        this.$refs.returns_line_chart.renderChart(
          this.returns_data,
          this.returns_options
        );

        this.returns_total = returns.reduce((t, c) => t + c);
        this.loading_returns = false;
      }
    },
    async getDataReturnsMonthly(year) {
      if (this.returns_mode !== "m") {
        if(!year) year = new Date().getFullYear();
        this.returns_mode = "m";
        this.returns_year = year;
        this.loading_returns = true;
        var result = await axios.get(
          `${process.env.VUE_APP_BASE_API_URI}analytics/returns/monthly/${year}?rdo=${this.login_rdo}`
        );
        var results = result.data;
        results.sort((a, b) => a.month - b.month);
        
        this.returns_data.labels = results.map(v => this.months[v.month]);
        this.returns_data.datasets[0].data = results.map(v => v.counts);
        var returns = results.map(v => v.counts).sort((a, b) => b - a);
        this.returns_options.scales.yAxes[0].ticks.max =
          returns[0] + Math.floor(returns[0] / 2);
        var gradient = this.$refs.returns_line_chart.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "rgba(255, 0, 0, 1)");
        gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.75)");
        gradient.addColorStop(1, "rgba(255, 0, 0, 0)");
        this.returns_data.datasets[0].backgroundColor = gradient;
        this.$refs.returns_line_chart.renderChart(
          this.returns_data,
          this.returns_options
        );

        this.returns_total = returns.reduce((t, c) => t + c);
        this.loading_returns = false;
      }
    },

    // Taxpayers
    async getDataTaxpayersYearly() {
      if (this.taxpayers_mode !== "y") {
        this.taxpayers_mode = "y";
        this.loading_taxpayers = true;
        var result = await axios.get(
          `${process.env.VUE_APP_BASE_API_URI}analytics/taxpayers/yearly?rdo=${this.login_rdo}`
        );
        var results = result.data;
        results.sort((a, b) => a.year - b.year);

        this.taxpayers_data.labels = results.map(v => v.year);
        this.taxpayers_data.datasets[0].data = results.map(v => v.counts);
        var taxpayers = results.map(v => v.counts).sort((a, b) => b - a);
        this.taxpayers_options.scales.yAxes[0].ticks.max =
          taxpayers[0] + Math.floor(taxpayers[0] / 2);
        var gradient = this.$refs.taxpayers_line_chart.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "rgba(0, 255, 0, 1)");
        gradient.addColorStop(0.5, "rgba(0, 255, 0, 0.75)");
        gradient.addColorStop(1, "rgba(0, 255, 0, 0)");
        this.taxpayers_data.datasets[0].backgroundColor = gradient;
        this.$refs.taxpayers_line_chart.renderChart(
          this.taxpayers_data,
          this.taxpayers_options
        );

        this.taxpayers_total = taxpayers.reduce((t, c) => t + c);
        this.loading_taxpayers = false;
      }
    },
    async getDataTaxpayersMonthly(year) {
      if (this.taxpayers_mode !== "m") {
        if(!year) year = new Date().getFullYear();
        this.taxpayers_mode = "m";
        this.taxpayers_year = year;
        this.loading_taxpayers = true;
        var result = await axios.get(
          `${process.env.VUE_APP_BASE_API_URI}analytics/taxpayers/monthly/${year}?rdo=${this.login_rdo}`
        );
        var results = result.data;
        results.sort((a, b) => a.month - b.month);
        
        this.taxpayers_data.labels = results.map(v => this.months[v.month]);
        this.taxpayers_data.datasets[0].data = results.map(v => v.counts);
        var taxpayers = results.map(v => v.counts).sort((a, b) => b - a);
        this.taxpayers_options.scales.yAxes[0].ticks.max =
          taxpayers[0] + Math.floor(taxpayers[0] / 2);
        var gradient = this.$refs.taxpayers_line_chart.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "rgba(0, 255, 0, 1)");
        gradient.addColorStop(0.5, "rgba(0, 255, 0, 0.75)");
        gradient.addColorStop(1, "rgba(0, 255, 0, 0)");
        this.taxpayers_data.datasets[0].backgroundColor = gradient;
        this.$refs.taxpayers_line_chart.renderChart(
          this.taxpayers_data,
          this.taxpayers_options
        );

        this.taxpayers_total = taxpayers.reduce((t, c) => t + c);
        this.loading_taxpayers = false;
      }
    },

    // For mock data only
    getRandomArbitrary(max, min) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    divideTotal(number, parts, min) {
      var randombit = number - min * parts;
      var out = [];

      for (var i = 0; i < parts; i++) {
        out.push(Math.random());
      }

      var mult =
        randombit /
        out.reduce(function(a, b) {
          return a + b;
        });
      var result = out.map(function(el) {
        return Math.floor(el * mult + min);
      });
      var excess = number - result.reduce((t, c) => t + c);
      result[result.length - 1] += excess;
      return result;
    }
  },
  computed: {
    login_rdo() {
      return this.$store.state.tax_form.login_rdo;
    }
  },
};
</script>

<style>
.statistic-chart {
  height: 33vh !important;
}

.statistic-chart canvas {
  height: 100% !important;
}

.statistic-chart .ant-card-actions {
  height: 5vh !important;
}

.collection-counts {
  position: absolute;
  text-align: end;
  top: 1vh;
  right: 0.5vw;
}

.counts {
  font-weight: bold;
  font-size: 30px;
  color: gray;
  line-height: 1;
}

.counts-label {
  font-size: 11px;
  line-height: 1;
  font-weight: bold;
}

/* Remove spaces(padding, margin) of container */
.select-yearly .ant-card-actions li,
.select-monthly .ant-card-actions li {
  margin: 0;
  padding: 2px 0;
  height: 100%;
}

/* Custom selected option */
.select-yearly .ant-card-actions li:nth-child(1),
.select-monthly .ant-card-actions li:nth-child(2) {
  background: #1167a0;
  color: white;
}

/* Maximize span size */
.select-yearly .ant-card-actions li span,
.select-yearly .ant-card-actions li span div,
.select-monthly .ant-card-actions li span,
.select-monthly .ant-card-actions li span div {
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Custom on hover if selected */
.select-yearly .ant-card-actions li:nth-child(1) span:hover,
.select-monthly .ant-card-actions li:nth-child(2) span:hover {
  color: white;
  font-weight: bold;
}

/* Custom on hover if not selected */
.select-yearly .ant-card-actions li:nth-child(2) span:hover,
.select-monthly .ant-card-actions li:nth-child(1) span:hover {
  color: #1167a0;
  font-weight: bold;
}

.max-height {
  height: 100% !important;
}

.loading-spin {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>