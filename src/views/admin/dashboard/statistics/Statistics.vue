<template>
  <a-row :gutter="50" class="statistic-chart">
    <!-- Collection -->
    <a-col :xs="{ span: 24 }" :md="{ span: 8 }">
      <a-card :bodyStyle="{ padding: 0 }">
        <span class="collection-counts">100</span>
        <line-chart :chartdata="collection_data" :options="options" />
      </a-card>
    </a-col>
    <!-- Returns -->
    <a-col :xs="{ span: 24 }" :md="{ span: 8 }">
      <a-card :bodyStyle="{ padding: 0 }">
        <span class="collection-counts">100</span>
        <line-chart :chartdata="returns_data" :options="options" />
      </a-card>
    </a-col>
    <!-- Taxpayers -->
    <a-col :xs="{ span: 24 }" :md="{ span: 8 }">
      <a-card :bodyStyle="{ padding: 0 }">
        <span class="collection-counts">100</span>
        <line-chart :chartdata="taxpayers_data" :options="options" />
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import LineChart from "./charts/LineChart";

export default {
  components: {
    LineChart
  },
  data() {
    return {
      collection_data: {
        labels: [1, 2, 3, 4],
        datasets: [
          {
            label: "Collection",
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 0, 0)",
            data: [25, 100, 110, 150]
          }
        ]
      },
      returns_data: {
        labels: [1, 2, 3, 4],
        datasets: [
          {
            label: "Returns",
            borderColor: "red",
            backgroundColor: "rgba(0, 0, 0, 0)",
            data: [25, 100, 38, 150]
          }
        ]
      },
      taxpayers_data: {
        labels: [1, 2, 3, 4],
        datasets: [
          {
            label: "Taxpayers",
            borderColor: "green",
            backgroundColor: "rgba(0, 0, 0, 0)",
            data: [25, 100, 38, 150]
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              // gridLines: {
              //   color: "rgba(0, 0, 0, 0)"
              // }
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              // gridLines: {
              //   color: "rgba(0, 0, 0, 0)"
              // }
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
    };
  }
};
</script>

<style>
.statistic-chart canvas {
  height: 35vh !important;
}

.collection-counts {
  position: absolute;
  bottom: 20%;
  right: 20%;
  color: black;
  font-size: 30px;
}
</style>