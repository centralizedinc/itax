<template>
  <a-card title="Target Collection per RDO" :bodyStyle="{ padding: '2px 0'}">
    <bar ref="bar_collection_returns" class="bar-collection-returns" />
  </a-card>
</template>

<script>
import { Bar } from "vue-chartjs";
export default {
  components: {
    Bar
  },
  data() {
    return {
      interval: {},
      chartdata: {
        datasets: [
          {
            label: "Target",
            data: [],
            backgroundColor: "#ff7777"
          },
          {
            label: "Collection",
            data: [15, 5],
            backgroundColor: "#8888ff"
          }
        ],
        labels: []
      },
      options: {
        hover: {
          animationDuration: 0
        },
        animation: {
          duration: 0,
          onComplete: function(animation) {
            var ctx = this.chart.ctx;
            ctx.fillStyle = "#000000";
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";

            this.data.datasets[0]._meta[
              Object.keys(this.data.datasets[0]._meta)[0]
            ].data.forEach((bar, i) => {
              ctx.fillText(
                nFormatter(this.data.datasets[0].data[i], 1),
                bar._model.x,
                bar._model.y - 2
              );
            });

            this.data.datasets[1]._meta[
              Object.keys(this.data.datasets[1]._meta)[0]
            ].data.forEach((bar, i) => {
              ctx.fillText(
                nFormatter(this.data.datasets[1].data[i], 1),
                bar._model.x,
                bar._model.y - 2
              );
            });

            function nFormatter(num, digits) {
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
                (num / si[i].value).toFixed(digits).replace(rx, "$1") +
                si[i].symbol
              );
            }
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                max: 5100000,
                beginAtZero: true
              }
            }
          ]
        }
      }
    };
  },
  created() {
    this.$store
      .dispatch("GET_RDOS")
      .then(result => {
        this.getMockData();
        this.setMockDataRealtime();
      })
      .catch(err => {});
  },
  computed: {
    rdos() {
      return this.$store.state.tax_form.rdos.slice(0, 5);
    }
  },
  methods: {
    getMockData() {
      var datasets = [];
      var mock_targets = [5000000, 4500000, 4000000, 4800000, 4200000];
      for (let index = 0; index < this.rdos.length; index++) {
        var target = Math.floor(Math.random() * 4);
        var collection =
          Math.floor(Math.random() * (mock_targets[target] - 3900000)) + 3500000;
        datasets.push({
          label: this.rdos[index].code,
          target: mock_targets[target],
          collection
        });
      }
      datasets.sort((a, b) => b.collection - a.collection);
      this.options.scales.yAxes[0].ticks.max = datasets[0].target + Math.floor(datasets[0].target/10);
      this.chartdata.labels = datasets.map(v => v.label);
      this.chartdata.datasets[0].data = datasets.map(v => v.target);
      this.chartdata.datasets[1].data = datasets.map(v => v.collection);
      this.$refs.bar_collection_returns.renderChart(
        this.chartdata,
        this.options
      );
    },
    setMockDataRealtime() {
      this.interval = setInterval(() => {
        try {
          var datasets = [];
          for (let i = 0; i < this.chartdata.datasets[0].data.length; i++) {
            var random = Math.round(Math.random() * 2000) +2000;
            datasets.push({
              label: this.chartdata.labels[i],
              target: this.chartdata.datasets[0].data[i],
              collection: this.chartdata.datasets[1].data[i] + random
            });
          }
          datasets.sort((a, b) => b.collection - a.collection);
          if(datasets[0].target <= datasets[0].collection){
            this.options.scales.yAxes[0].ticks.max = datasets[0].collection + Math.floor(datasets[0].collection/5);
          }
          this.chartdata.labels = datasets.map(v => v.label);
          this.chartdata.datasets[0].data = datasets.map(v => v.target);
          this.chartdata.datasets[1].data = datasets.map(v => v.collection);
          this.$refs.bar_collection_returns.renderChart(
            this.chartdata,
            this.options
          );
        } catch (error) {}
      }, 1000);
    }
  }
};
</script>

<style>
.bar-collection-returns canvas {
  height: 62vh !important;
}
</style>