
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
      this.chartdata.labels = this.taxtypes.map(v => v.name);
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
      this.$refs.rdo_doughnut_chart.renderChart(this.chartdata, {
        legend: { position: "right" }
      });
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