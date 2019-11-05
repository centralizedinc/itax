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
    this.$refs.rdo_bar_chart.renderChart(this.chartdata, this.options);
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
        ],
        showTooltips: false,
        onAnimationComplete: function() {
          var ctx = this.chart.ctx;
          ctx.font = this.scale.font;
          ctx.fillStyle = this.scale.textColor;
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";

          this.datasets.forEach(function(dataset) {
            dataset.bars.forEach(function(bar) {
              ctx.fillText(bar.value, bar.x, bar.y - 5);
            });
          });
        }
      },
      options: {
        hover: {
          animationDuration: 0
        },
        animation: {
          duration: 0,
          onComplete: function(animation) {
            // console.log(this.data.datasets[0]._meta[Object.keys(this.data.datasets[0]._meta)[0]].data)
            console.log(this);
            var ctx = this.chart.ctx;
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";

            this.data.datasets[0]._meta[
              Object.keys(this.data.datasets[0]._meta)[0]
            ].data.forEach((bar, i) => {
              ctx.fillText(
                nFormatter(this.data.datasets[0].data[i], 1),
                bar._model.x + 15,
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
            // this.datasets.forEach(function(dataset) {
            //   dataset.bars.forEach(function(bar) {
            //     ctx.fillText(bar.value, bar.x, bar.y - 5);
            //   });
            // });
          }
        },
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
    this.$store
      .dispatch("GET_RDOS")
      .then(result => {
        this.getMockRdo();
      })
      .catch(err => {});
  },
  computed: {
    rdos() {
      return this.$store.state.tax_form.rdos;
    }
  },
  methods: {
    getMockRdo() {
      this.chartdata.labels = this.rdos.map(v => `RDO ${v.code}`);
      var datasets = [];
      for (let index = 0; index < this.chartdata.labels.length; index++) {
        var val = Math.floor(Math.random() * 200) + 30;
        datasets.push(val);
      }
      this.chartdata.datasets[0].data = datasets;
      var backgrounds = [];
      for (
        let index = 0;
        index < this.chartdata.datasets[0].data.length;
        index++
      ) {
        var random_color =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        backgrounds.push(random_color);
      }
      this.chartdata.datasets[0].backgroundColor = backgrounds;
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
  }
};
</script>

<style>
.bar-collection-rdo canvas {
  width: 25vw !important;
}
</style>