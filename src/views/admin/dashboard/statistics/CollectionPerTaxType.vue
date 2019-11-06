
<template>
  <a-card
    title="Collection Per Tax type"
    :bodyStyle="{ display: 'flex', 'align-items': 'center', 'justify-content': 'center', 'padding': '0' }"
  >
    <doughnut class="doughnut-collection-taxtype" ref="rdo_doughnut_chart" />
  </a-card>
</template>

<script>
import { Doughnut } from "vue-chartjs";

export default {
  components: {
    Doughnut
  },
  mounted() {
    this.getMockTaxtype();
    this.setMockDataRealtime();
  },
  data() {
    return {
      chartdata: {
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
            backgroundColor: [],
            data: []
          }
        ]
      },
      options: {
        legend: {
          display: false
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
              gridLines: {
                display: false
              },
              ticks: {
                stepSize: 10,
                beginAtZero: true
              }
            }
          ]
        }
      },
      taxtypes: [
        {
          code: "IT",
          name: "Income Tax"
        },
        {
          code: "EDT",
          name: "Estate and Donor's Taxes"
        },
        {
          code: "VAT",
          name: "Value-added Tax"
        },
        {
          code: "PT",
          name: "Percentage Taxes"
        },
        {
          code: "ET",
          name: "Excise Taxes"
        },
        {
          code: "DST",
          name: "Documentary Stamp Taxes"
        },
        {
          code: "OT",
          name: "Other Taxes"
        }
      ]
    };
  },
  computed: {
    rdos() {
      return this.$store.state.tax_form.rdos;
    }
  },
  methods: {
    getMockTaxtype() {
      var datasets = [];
      for (let index = 0; index < this.taxtypes.length; index++) {
        var val = Math.floor(Math.random() * 100) + 20;
        var random_color =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        datasets.push({
          label: this.taxtypes[index].name,
          value: val,
          background: random_color
        });
      }
      this.chartdata.labels = datasets.map(v => v.label);
      this.chartdata.datasets[0].data = datasets.map(v => v.value);
      this.chartdata.datasets[0].backgroundColor = datasets.map(
        v => v.background
      );
      this.$refs.rdo_doughnut_chart.renderChart(this.chartdata, {
        legend: { position: "right" }
      });
    },
    setMockDataRealtime() {
      setInterval(() => {
        try {
          var datasets = [];
          for (let i = 0; i < this.chartdata.datasets[0].data.length; i++) {
            var random = Math.round(Math.random() * 5);
            datasets.push({
              label: this.chartdata.labels[i],
              value: this.chartdata.datasets[0].data[i] + random,
              background: this.chartdata.datasets[0].backgroundColor[i]
            });
          }
          this.chartdata.labels = datasets.map(v => v.label);
          this.chartdata.datasets[0].data = datasets.map(v => v.value);
          this.chartdata.datasets[0].backgroundColor = datasets.map(
            v => v.background
          );
          this.$refs.rdo_doughnut_chart.renderChart(this.chartdata, {
            legend: { position: "right" },
            animation: {
              duration: 0
            }
          });
        } catch (error) {}
      }, 1000);
    }
  }
};
</script>

<style>
.doughnut-collection-taxtype {
  position: relative;
  /* width: 25vw !important; */
}
</style>