<template>
  <a-row class="statistic-chart" :gutter="10">
    <!-- Collection this year -->
    <!-- <a-col :xs="{ span: 24 }" :md="{ span: 24 }">
      <a-card :bodyStyle="{ padding: 0 }">
        <span class="collection-counts">
          <a-row type="flex" align="middle" style="width: 100%; height: 100%;">
            <a-col :span="24">
              <a-tooltip>
                <span slot="title">{{formatCounts(1299990, true)}}</span>
                <span class="counts">
                  <a-icon type="arrow-down" style="color: red"/> {{formatCounts(1299990)}}
                </span>
              </a-tooltip>
              <br />
              <span class="counts-label">Collected this year</span>
            </a-col>
          </a-row>
        </span>
        <line-chart ref="collection_line_chart_year" />
      </a-card>
    </a-col>-->
    <!-- Collection this month -->
    <a-col :xs="{ span: 24 }" :md="{ span: 8 }">
      <a-card :bodyStyle="{ padding: 0 }">
        <span class="collection-counts">
          <a-row type="flex" align="middle" style="width: 100%; height: 100%;">
            <a-col :span="24">
              <a-tooltip>
                <span slot="title">{{formatCounts(1299990, true)}}</span>
                <span class="counts">
                  <a-icon type="arrow-down" style="color: red" />
                  {{formatCounts(1299990)}}
                </span>
              </a-tooltip>
              <br />
              <span class="counts-label">Collected this month</span>
            </a-col>
          </a-row>
        </span>
        <line-chart ref="collection_line_chart" />
      </a-card>
    </a-col>

    <!-- Returns this year -->
    <!-- <a-col :xs="{ span: 24 }" :md="{ span: 24 }">
      <a-card :bodyStyle="{ padding: 0 }">
        <span class="collection-counts">
          <a-row type="flex" align="middle" style="width: 100%; height: 100%;">
            <a-col :span="24">
              <a-tooltip>
                <span slot="title">{{formatCounts(1582214, true)}}</span>
                <span class="counts">
                  <a-icon type="arrow-up" style="color: green"/> {{formatCounts(1582214)}}
                </span>
              </a-tooltip>
              <br />
              <span class="counts-label">Returns this year</span>
            </a-col>
          </a-row>
        </span>
        <line-chart ref="returns_line_chart_year" />
      </a-card>
    </a-col>-->
    <!-- Returns this month -->
    <a-col :xs="{ span: 24 }" :md="{ span: 8 }">
      <a-card :bodyStyle="{ padding: 0 }">
        <span class="collection-counts">
          <a-row type="flex" align="middle" style="width: 100%; height: 100%;">
            <a-col :span="24">
              <a-tooltip>
                <span slot="title">{{formatCounts(1582214, true)}}</span>
                <span class="counts">
                  <a-icon type="arrow-up" style="color: green" />
                  {{formatCounts(1582214)}}
                </span>
              </a-tooltip>
              <br />
              <span class="counts-label">Returns this month</span>
            </a-col>
          </a-row>
        </span>
        <line-chart ref="returns_line_chart" />
      </a-card>
    </a-col>

    <!-- Taxpayers this year -->
    <!-- <a-col :xs="{ span: 24 }" :md="{ span: 24 }">
      <a-card :bodyStyle="{ padding: 0 }">
        <span class="collection-counts">
          <a-row type="flex" align="middle" style="width: 100%; height: 100%;">
            <a-col :span="24">
              <a-tooltip>
                <span slot="title">{{formatCounts(52605, true)}}</span>
                <span class="counts">{{formatCounts(52605)}}</span>
              </a-tooltip>
              <br />
              <span class="counts-label">Total Taxpayers this year</span>
            </a-col>
          </a-row>
        </span>
        <line-chart ref="taxpayers_line_chart_year" />
      </a-card>
    </a-col>-->
    <!-- Taxpayers this month -->
    <a-col :xs="{ span: 24 }" :md="{ span: 8 }">
      <a-card :bodyStyle="{ padding: 0 }">
        <span class="collection-counts">
          <a-row type="flex" align="middle" style="width: 100%; height: 100%;">
            <a-col :span="24">
              <a-tooltip>
                <span slot="title">{{formatCounts(52605, true)}}</span>
                <span class="counts">{{formatCounts(52605)}}</span>
              </a-tooltip>
              <br />
              <span class="counts-label">Total Taxpayers this month</span>
            </a-col>
          </a-row>
        </span>
        <line-chart ref="taxpayers_line_chart" />
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { Line } from "vue-chartjs";

export default {
  components: {
    LineChart: Line
  },
  mounted() {
    this.getDataReturnsYearly();
    this.getDataCollectionYearly();
    this.getDataTaxpayersYearly();
  },
  data() {
    return {
      collection_data: {
        labels: [
          "October 3, 2019",
          "October 7, 2019",
          "October 10, 2019",
          "October 12, 2019",
          "October 16, 2019",
          "October 20, 2019",
          "October 24, 2019",
          "October 30, 2019"
        ],
        datasets: [
          {
            label: "Collection",
            radius: 4,
            borderWidth: 3,
            borderColor: "blue",
            backgroundColor: "#ddddff",
            data: [80, 100, 60, 80, 100, 110, 150, 75]
          }
        ]
      },
      returns_data: {
        labels: [],
        datasets: [
          {
            label: "Returns",
            radius: 4,
            borderWidth: 3,
            borderColor: "red",
            backgroundColor: "#ffdddd",
            data: []
          }
        ]
      },
      taxpayers_data: {
        labels: [
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
        datasets: [
          {
            label: "Taxpayers",
            radius: 4,
            borderWidth: 3,
            borderColor: "green",
            backgroundColor: "#ddffdd",
            data: [80, 100, 110, 150, 80, 100, 90, 100, 80, 100, 110, 80]
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
              // gridLines: {
              //   color: "rgba(0, 0, 0, 0)"
              // }
              // gridLines: {
              display: false
              // }
            }
          ],
          yAxes: [
            {
              // gridLines: {
              //   color: "rgba(0, 0, 0, 0)"
              // }
              // gridLines: {
              display: false,
              ticks: {
                beginAtZero: true,
                max: 200
              }
              // }
            }
          ]
        },
        onClick: this.getData
      },
      collections_options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              // gridLines: {
              //   color: "rgba(0, 0, 0, 0)"
              // }
              // gridLines: {
              display: false
              // }
            }
          ],
          yAxes: [
            {
              // gridLines: {
              //   color: "rgba(0, 0, 0, 0)"
              // }
              // gridLines: {
              display: false,
              ticks: {
                beginAtZero: true,
                max: 200
              }
              // }
            }
          ]
        },
        onClick: this.getData
      },
      taxpayers_options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              // gridLines: {
              //   color: "rgba(0, 0, 0, 0)"
              // }
              // gridLines: {
              display: false
              // }
            }
          ],
          yAxes: [
            {
              // gridLines: {
              //   color: "rgba(0, 0, 0, 0)"
              // }
              // gridLines: {
              display: false,
              ticks: {
                beginAtZero: true,
                max: 200
              }
              // }
            }
          ]
        },
        onClick: this.getData
      }
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
    getDataCollectionYearly() {
      // Last 10 years
      var returns_data = this.deepCopy(this.returns_data.datasets[0].data);
      var datasets = {
        labels: [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010],
        data: []
      };
      for (let index = 0; index < datasets.labels.length; index++) {
        var val = this.getRandomArbitrary(returns_data[index], returns_data[index]/4)
        datasets.data.push(val);
      }
      this.collection_data.labels = this.deepCopy(datasets.labels);
      this.collection_data.datasets[0].data = this.deepCopy(datasets.data);
      var findMax = this.deepCopy(datasets.data).sort((a, b) => b - a);
      this.collections_options.scales.yAxes[0].ticks.max = findMax[0] + Math.floor(findMax[0]/10);
      this.$refs.collection_line_chart.renderChart(
        this.collection_data,
        this.collections_options
      );
    },
    getDataCollectionMonthly() {},

    // Returns
    getDataReturnsYearly() {
      // Last 10 years
      var datasets = {
        labels: [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010],
        data: []
      };
      for (let index = 0; index < datasets.labels.length; index++) {
        var val = this.getRandomArbitrary(2000000, 500000)
        datasets.data.push(val);
      }
      this.returns_data.labels = this.deepCopy(datasets.labels);
      this.returns_data.datasets[0].data = this.deepCopy(datasets.data);
      var findMax = this.deepCopy(datasets.data).sort((a, b) => b - a);
      this.returns_options.scales.yAxes[0].ticks.max = findMax[0] + Math.floor(findMax[0]/10);
      this.$refs.returns_line_chart.renderChart(
        this.returns_data,
        this.returns_options
      );
    },
    getDataReturnsMonthly() {},

    // Taxpayers
    getDataTaxpayersYearly() {
      var datasets = this.getMockData("y", 200000);
      console.log("taxpayers yearly datasets :", datasets);
      this.taxpayers_data.labels = this.deepCopy(datasets.labels);
      this.taxpayers_data.datasets[0].data = this.deepCopy(datasets.data);
      var findMax = this.deepCopy(datasets.data).sort((a, b) => b - a);
      this.taxpayers_options.scales.yAxes[0].ticks.max = findMax[0] + Math.floor(findMax[0]/10);
      this.$refs.taxpayers_line_chart.renderChart(
        this.taxpayers_data,
        this.taxpayers_options
      );
    },
    getDataTaxpayersMonthly() {},

    // For mock data only
    getMockData(mode, max_amount) {
      var datasets = {
        labels: [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010],
        data: []
      };
      if (mode === "m")
        // monthly
        datasets.labels = [
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
        ];
      for (let index = 0; index < datasets.labels.length; index++) {
        var val =
          Math.floor(Math.random() * max_amount) + Math.floor(max_amount / 4);
        datasets.data.push(val);
      }
      return datasets;
    },
    getRandomArbitrary(max, min){
      return Math.floor(Math.random() * (max -min) + min);
    }
  }
};
</script>

<style>
.statistic-chart canvas {
  height: 25vh !important;
}

.collection-counts {
  position: absolute;
  color: black;
  width: 100%;
  text-align: end;
  padding-right: 0.5vw;
  bottom: 0;
}

.counts {
  font-weight: bold;
  font-size: 16px;
  color: gray;
}

.counts-label {
  font-size: 12px;
}
</style>