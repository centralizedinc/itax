<template>
  <a-row class="statistic-chart" :gutter="10">
    <!-- Collection -->
    <a-col style="height: 28vh;" :xs="{ span: 24 }" :md="{ span: 8 }">
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
    <a-col style="height: 28vh;" :xs="{ span: 24 }" :md="{ span: 8 }">
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
    <a-col style="height: 28vh;" :xs="{ span: 24 }" :md="{ span: 8 }">
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
        // to prevent reloading yearly for mock data

        // var returns_data = this.deepCopy(this.returns_data.datasets[0].data);
        // var datasets = {
        //   labels: [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010],
        //   data: []
        // };
        // for (let index = 0; index < datasets.labels.length; index++) {
        //   var val = this.getRandomArbitrary(
        //     returns_data[index],
        //     returns_data[index] / 4
        //   );
        //   datasets.data.push(val);
        // }
        // this.collection_data.labels = this.deepCopy(datasets.labels);
        // this.collection_data.datasets[0].data = this.deepCopy(datasets.data);
        // var findMax = this.deepCopy(datasets.data).sort((a, b) => b - a);
        // this.collections_options.scales.yAxes[0].ticks.max =
        //   findMax[0] + Math.floor(findMax[0] / 2);
        // this.$refs.collection_line_chart.renderChart(
        //   this.collection_data,
        //   this.collections_options
        // );

        // this.collections_total = datasets.data.reduce((t, c) => t + c);
        // console.log("this.$refs :", this.$refs);
        // this.$refs.collections_line_chart.renderChart(
        //   this.collection_data,
        //   this.collections_options
        // );
        // this.collections_mode = "y";
        // this.loading_collection = true;
        // var collection_chart = this.$refs.collections_line_chart;
        // var result = await axios.get(
        //   `${process.env.VUE_APP_BASE_API_URI}collections/yearly`
        // );
        // var results = result.data;
        // console.log("results :", results);
        // results.sort((a, b) => a.year - b.year);

        // this.collection_data.labels = results.map(v => v.year);
        // this.collection_data.datasets[0].data = results.map(v => v.collection);
        // var collections = results.map(v => v.collection).sort((a, b) => b - a);
        // this.collections_options.scales.yAxes[0].ticks.max =
        //   collections[0] + Math.floor(collections[0] / 2);
        // console.log("this.$refs :", this.$refs);
        // collection_chart.renderChart(
        //   this.collection_data,
        //   this.collections_options
        // );

        // this.collections_total = collections.reduce((t, c) => t + c);
        // this.loading_collection = false;
        this.collections_mode = "y";
        this.loading_collection = true;
        var result = await axios.get(
          `${process.env.VUE_APP_BASE_API_URI}collections/yearly`
        );
        var results = result.data;
        results.sort((a, b) => a.year - b.year);

        this.collection_data.labels = results.map(v => v.year);
        this.collection_data.datasets[0].data = results.map(v => v.collection);
        var collections = results.map(v => v.collection).sort((a, b) => b - a);
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
        // to prevent reloading monthly for mock data
        // if (
        //   year === null ||
        //   year === undefined ||
        //   amount === null ||
        //   amount === undefined
        // ) {
        //   year = new Date().getFullYear();
        //   const index = this.collection_data.labels.findIndex(v => v === year);
        //   amount = this.collection_data.datasets[0].data[index] || 0;
        // }
        // this.collections_year = year;
        // this.collections_mode = "m";
        // this.collections_total = amount;
        // var datasets = {
        //   labels: [],
        //   data: []
        // };
        // this.months.forEach(m => {
        //   datasets.labels.push(`${m} ${year}`);
        // });
        // var mock_data = this.divideTotal(amount, 12, Math.floor(amount / 20));
        // mock_data.forEach(data => {
        //   datasets.data.push(data);
        // });
        // this.collection_data.labels = this.deepCopy(datasets.labels);
        // this.collection_data.datasets[0].data = this.deepCopy(datasets.data);
        // var findMax = this.deepCopy(datasets.data).sort((a, b) => b - a);
        // this.collections_options.scales.yAxes[0].ticks.max =
        //   findMax[0] + Math.floor(findMax[0] / 2);
        // // this.$refs.collection_line_chart.renderChart(
        // //   this.collection_data,
        // //   this.collections_options
        // // );
        if(!year) year = new Date().getFullYear();
        this.collections_mode = "m";
        this.loading_collection = true;
        var result = await axios.get(
          `${process.env.VUE_APP_BASE_API_URI}collections/monthly/${year}`
        );
        var results = result.data;
        results.sort((a, b) => a.year - b.year);

        this.collection_data.labels = results.map(v => this.months[v.month]);
        this.collection_data.datasets[0].data = results.map(v => v.collection);
        var collections = results.map(v => v.collection).sort((a, b) => b - a);
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
        // to prevent reloading yearly for mock data
        // var datasets = {
        //   labels: [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010],
        //   data: []
        // };
        // for (let index = 0; index < datasets.labels.length; index++) {
        //   var val = this.getRandomArbitrary(2000000, 500000);
        //   datasets.data.push(val);
        // }
        // this.returns_data.labels = this.deepCopy(datasets.labels);
        // this.returns_data.datasets[0].data = this.deepCopy(datasets.data);
        // var findMax = this.deepCopy(datasets.data).sort((a, b) => b - a);
        // this.returns_options.scales.yAxes[0].ticks.max =
        //   findMax[0] + Math.floor(findMax[0] / 2);
        // // this.collection_data.datasets[0].borderColor = "red";
        // // this.collection_data.datasets[0].backgroundColor = "#ffcccc";
        // this.$refs.returns_line_chart.renderChart(
        //   this.returns_data,
        //   this.returns_options
        // );

        // this.returns_total = datasets.data.reduce((t, c) => t + c);
        // this.returns_mode = "y";

        this.returns_mode = "y";
        this.loading_returns = true;
        var result = await axios.get(
          `${process.env.VUE_APP_BASE_API_URI}collections/yearly/returns`
        );
        var results = result.data;
        results.sort((a, b) => a.year - b.year);

        this.returns_data.labels = results.map(v => v.year);
        this.returns_data.datasets[0].data = results.map(v => v.returns);
        var returns = results.map(v => v.returns).sort((a, b) => b - a);
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
        // to prevent reloading monthly for mock data
        // if (
        //   year === null ||
        //   year === undefined ||
        //   amount === null ||
        //   amount === undefined
        // ) {
        //   year = new Date().getFullYear();
        //   const index = this.returns_data.labels.findIndex(v => v === year);
        //   amount = this.returns_data.datasets[0].data[index] || 0;
        // }
        // this.returns_year = year;
        // this.returns_mode = "m";
        // this.returns_total = amount;
        // var datasets = {
        //   labels: [],
        //   data: []
        // };
        // this.months.forEach(m => {
        //   datasets.labels.push(`${m} ${year}`);
        // });
        // var mock_data = this.divideTotal(amount, 12, Math.floor(amount / 20));
        // mock_data.forEach(data => {
        //   datasets.data.push(data);
        // });
        // this.returns_data.labels = this.deepCopy(datasets.labels);
        // this.returns_data.datasets[0].data = this.deepCopy(datasets.data);
        // var findMax = this.deepCopy(datasets.data).sort((a, b) => b - a);
        // this.returns_options.scales.yAxes[0].ticks.max =
        //   findMax[0] + Math.floor(findMax[0] / 2);
        // this.$refs.returns_line_chart.renderChart(
        //   this.returns_data,
        //   this.returns_options
        // );
        if(!year) year = new Date().getFullYear();
        this.returns_mode = "m";
        this.loading_returns = true;
        var result = await axios.get(
          `${process.env.VUE_APP_BASE_API_URI}collections/monthly/returns/${year}`
        );
        console.log('result.data :', result.data);
        var results = result.data;
        results.sort((a, b) => a.year - b.year);
        
        this.returns_data.labels = results.map(v => this.months[v.month]);
        this.returns_data.datasets[0].data = results.map(v => v.count);
        var returns = results.map(v => v.count).sort((a, b) => b - a);
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
        // to prevent reloading yearly for mock data
        // var datasets = {
        //   labels: [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010],
        //   data: []
        // };
        // for (let index = 0; index < datasets.labels.length; index++) {
        //   var val = this.getRandomArbitrary(250000, 150000);
        //   datasets.data.push(val);
        // }
        // this.taxpayers_data.labels = this.deepCopy(datasets.labels);
        // this.taxpayers_data.datasets[0].data = this.deepCopy(datasets.data);
        // var findMax = this.deepCopy(datasets.data).sort((a, b) => b - a);
        // this.taxpayers_options.scales.yAxes[0].ticks.max =
        //   findMax[0] + Math.floor(findMax[0] / 2);
        // this.$refs.taxpayers_line_chart.renderChart(
        //   this.taxpayers_data,
        //   this.taxpayers_options
        // );

        // this.taxpayers_total = datasets.data.reduce((t, c) => t + c);
        // this.taxpayers_mode = "y";
        this.taxpayers_mode = "y";
        this.loading_taxpayers = true;
        var result = await axios.get(
          `${process.env.VUE_APP_BASE_API_URI}collections/yearly`
        );
        var results = result.data;
        results.sort((a, b) => a.year - b.year);

        this.taxpayers_data.labels = results.map(v => v.year);
        this.taxpayers_data.datasets[0].data = results.map(v => v.collection);
        var taxpayers = results.map(v => v.collection).sort((a, b) => b - a);
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
    getDataTaxpayersMonthly(year, amount) {
      if (this.taxpayers_mode !== "m") {
        //to prevent reloading month for mock data
        if (
          year === null ||
          year === undefined ||
          amount === null ||
          amount === undefined
        ) {
          year = new Date().getFullYear();
          const index = this.taxpayers_data.labels.findIndex(v => v === year);
          amount = this.taxpayers_data.datasets[0].data[index] || 0;
        }
        this.taxpayers_year = year;
        this.taxpayers_mode = "m";
        this.taxpayers_total = amount;
        var datasets = {
          labels: [],
          data: []
        };
        this.months.forEach(m => {
          datasets.labels.push(`${m} ${year}`);
        });
        var mock_data = this.divideTotal(amount, 12, Math.floor(amount / 20));
        mock_data.forEach(data => {
          datasets.data.push(data);
        });
        this.taxpayers_data.labels = this.deepCopy(datasets.labels);
        this.taxpayers_data.datasets[0].data = this.deepCopy(datasets.data);
        var findMax = this.deepCopy(datasets.data).sort((a, b) => b - a);
        this.taxpayers_options.scales.yAxes[0].ticks.max =
          findMax[0] + Math.floor(findMax[0] / 2);
        this.$refs.taxpayers_line_chart.renderChart(
          this.taxpayers_data,
          this.taxpayers_options
        );
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
  }
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