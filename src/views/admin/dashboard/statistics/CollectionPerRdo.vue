<template>
  <a-card
    title="Top 10 collection per rdo as of today"
    :bodyStyle="{ display: 'flex', 'align-items': 'center', 'justify-content': 'left', 'padding': '0 24px' }"
  >
    <horizontal-bar class="bar-collection-rdo" ref="rdo_bar_chart" />
  </a-card>
</template>

<script>
import { HorizontalBar } from "vue-chartjs";

export default {
  components: {
    HorizontalBar
  },
  mounted() {
    // this.$refs.rdo_bar_chart.renderChart(this.chartdata, this.options);
    this.getRdoMockData();
  },
  data() {
    return {
      mode: "d",
      chartdata: {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: []
          }
        ]
      },
      options: {
        hover: {
          animationDuration: 0
        },
        animation: {
          duration: 0,
          onComplete: function(animation) {
            var ctx = this.chart.ctx;
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";

            this.data.datasets[0]._meta[
              Object.keys(this.data.datasets[0]._meta)[0]
            ].data.forEach((bar, i) => {
              ctx.fillText(
                nFormatter(this.data.datasets[0].data[i], 1),
                bar._model.x + 20,
                bar._model.y + 8
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
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              display: false,
              ticks: {
                max: 250
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
    };
  },
  created() {
    // this.$store
    //   .dispatch("GET_RDOS")
    //   .then(result => {
    //     // this.getMockRdo();
    //     // this.setMockDataRealtime();
    //   })
    //   .catch(err => {});
    
  },
  computed: {
    rdos() {
      return this.$store.state.tax_form.rdos.slice(0, 10);
    }
  },
  watch: {
    rdos() {
      this.getRdoMockData();
    }
  },
  methods: {
    getRdoMockData() {
      var datasets = [];
      for (let index = 0; index < this.rdos.length; index++) {
        // var val = Math.floor(Math.random() * 100000) + 10000;
        var random_color =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        datasets.push({
          label: this.rdos[index].code,
          value: this.rdos[index].collections,
          background:
            this.chartdata.datasets[0].backgroundColor[index] || random_color
        });
      }
      datasets.sort((a, b) => b.value - a.value);
      this.chartdata.labels = datasets.map(v => `RDO ${v.label}`);
      this.chartdata.datasets[0].data = datasets.map(v => v.value);
      this.chartdata.datasets[0].backgroundColor = datasets.map(
        v => v.background
      );
      this.options.scales.xAxes[0].ticks.max =
        this.chartdata.datasets[0].data[0] +
        Math.floor(this.chartdata.datasets[0].data[0] / 5);
      this.$refs.rdo_bar_chart.renderChart(this.chartdata, this.options);
    },
    getMockRdo() {
      var datasets = [];
      for (let index = 0; index < this.rdos.length; index++) {
        // var val = Math.floor(Math.random() * 100000) + 10000;
        var random_color =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        datasets.push({
          label: this.rdos[index].code,
          value: this.rdos[index].collections,
          background: random_color
        });
      }
      datasets.sort((a, b) => b.value - a.value);
      this.chartdata.labels = datasets.map(v => `RDO ${v.label}`);
      this.chartdata.datasets[0].data = datasets.map(v => v.value);
      this.chartdata.datasets[0].backgroundColor = datasets.map(
        v => v.background
      );
      this.options.scales.xAxes[0].ticks.max =
        this.chartdata.datasets[0].data[0] +
        Math.floor(this.chartdata.datasets[0].data[0] / 5);
      this.$refs.rdo_bar_chart.renderChart(this.chartdata, this.options);
    },
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
    // setMockDataRealtime() {
    //   setInterval(() => {
    //     try {
    //       var datasets = [];
    //       for (let i = 0; i < this.chartdata.datasets[0].data.length; i++) {
    //         var random = Math.round(Math.random() * 2000) + 2000;
    //         datasets.push({
    //           label: this.chartdata.labels[i],
    //           value: this.chartdata.datasets[0].data[i] + random,
    //           background: this.chartdata.datasets[0].backgroundColor[i]
    //         });
    //       }
    //       datasets.sort((a, b) => b.value - a.value);
    //       this.chartdata.labels = datasets.map(v => v.label);
    //       this.chartdata.datasets[0].data = datasets.map(v => v.value);
    //       this.chartdata.datasets[0].backgroundColor = datasets.map(
    //         v => v.background
    //       );
    //       this.options.scales.xAxes[0].ticks.max =
    //         this.chartdata.datasets[0].data[0] + Math.floor(this.chartdata.datasets[0].data[0]/5);
    //       this.$refs.rdo_bar_chart.renderChart(this.chartdata, this.options);
    //     } catch (error) {}
    //   }, 1000);
    // }
  }
};
</script>

<style>
.bar-collection-rdo canvas {
  /* width: 25vw !important; */
}
</style>