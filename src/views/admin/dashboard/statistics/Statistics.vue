<template>
  <a-row class="statistic-chart" type="flex" justify="space-around">
    <!-- Collection -->
    <a-col :xs="{ span: 24 }" :md="{ span: 7 }">
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
              <span>Collected last month</span>
            </a-col>
          </a-row>
        </span>
        <line-chart ref="collection_line_chart" />
      </a-card>
    </a-col>
    <!-- Returns -->
    <a-col :xs="{ span: 24 }" :md="{ span: 7 }">
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
              <span>Returns last month</span>
            </a-col>
          </a-row>
        </span>
        <line-chart ref="returns_line_chart" />
      </a-card>
    </a-col>
    <!-- Taxpayers -->
    <a-col :xs="{ span: 24 }" :md="{ span: 7 }">
      <a-card :bodyStyle="{ padding: 0 }">
        <span class="collection-counts">
          <a-row type="flex" align="middle" style="width: 100%; height: 100%;">
            <a-col :span="24">
              <a-tooltip>
                <span slot="title">{{formatCounts(52605, true)}}</span>
                <span class="counts">{{formatCounts(52605)}}</span>
              </a-tooltip>
              <br />
              <span>Total Taxpayers last 12 months</span>
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
    this.$refs.collection_line_chart.renderChart(
      this.collection_data,
      this.options
    );
    this.$refs.returns_line_chart.renderChart(this.returns_data, this.options);
    this.$refs.taxpayers_line_chart.renderChart(
      this.taxpayers_data,
      this.options
    );
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
            radius: 5,
            borderWidth: 2,
            borderColor: "blue",
            backgroundColor: "#ddddff",
            data: [80, 100, 60, 80, 100, 110, 150, 75]
          }
        ]
      },
      returns_data: {
        labels: [
          "October 3, 2019",
          "October 5, 2019",
          "October 7, 2019",
          "October 8, 2019",
          "October 9, 2019",
          "October 10, 2019",
          "October 12, 2019",
          "October 15, 2019",
          "October 16, 2019",
          "October 18, 2019",
          "October 20, 2019",
          "October 24, 2019",
          "October 25, 2019",
          "October 30, 2019"
        ],
        datasets: [
          {
            label: "Returns",
            radius: 5,
            borderWidth: 2,
            borderColor: "red",
            backgroundColor: "#ffdddd",
            data: [150, 80, 100, 70, 70, 80, 100, 110, 80, 60, 100, 70, 80,70]
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
            radius: 5,
            borderWidth: 2,
            borderColor: "green",
            backgroundColor: "#ddffdd",
            data: [80, 100, 110, 150, 80, 100, 90, 100, 80, 100, 110, 80]
          }
        ]
      },
      options: {
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
                stepSize: 10,
                beginAtZero: true,
                max: 200
              }
              // }
            }
          ]
        }
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
  font-size: 24px;
}
</style>