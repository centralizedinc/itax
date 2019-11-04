
<template>
  <a-card :bodyStyle="{ display: 'flex', 'align-items': 'center', 'justify-content': 'center' }">
    <div slot="title">
      <a-row>
        <a-col :span="12">
          <span>Collection Per Tax type</span>
        </a-col>
        <a-col :span="7">
          <span style="margin-right: 1vw;" v-if="mode!=='d'">Tax Type:</span>
          <a-select @change="changeTaxtype" defaultValue="IT" size="small" v-if="mode!=='d'">
            <a-select-option
              v-for="item in taxtypes"
              :key="item.code"
              :value="item.code"
            >{{item.name}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="5">
          <span style="margin-right: 5px;">Filter by:</span>
          <a-select @change="changeMode" defaultValue="d" size="small" style="width: 8vw;">
            <a-select-option key="d" value="d">Per Tax Type</a-select-option>
            <a-select-option key="m" value="m">Monthly</a-select-option>
            <a-select-option key="y" value="y">Yearly</a-select-option>
          </a-select>
        </a-col>
      </a-row>
    </div>
    <doughnut v-show="mode==='d'" class="doughnut-collection-taxtype" ref="rdo_doughnut_chart" />
    <bar v-show="mode!=='d'" class="bar-collection-taxtype" ref="rdo_bar_chart" />
  </a-card>
</template>

<script>
import { Bar, Doughnut } from "vue-chartjs";

export default {
  components: {
    Bar,
    Doughnut
  },
  mounted() {
    this.renderChart();
  },
  data() {
    return {
      mode: "d",
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
      datasets: [],
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
  created() {
    this.changeMode("d");
  },
  watch: {
    datasets(datas) {
      var backgrounds = [];
      datas.forEach(data => {
        if (data >= 100) backgrounds.push("green");
        else if (data >= 50) backgrounds.push("blue");
        else backgrounds.push("red");
      });
      this.chartdata.datasets[0].data = datas;
      this.chartdata.datasets[0].backgroundColor = backgrounds;
      this.renderChart();
    }
  },
  computed: {
    rdos() {
      return this.$store.state.tax_form.rdos;
    }
  },
  methods: {
    changeMode(mode) {
      this.mode = mode;
      if (mode === "y") {
        this.chartdata.labels = [
          2010,
          2011,
          2012,
          2013,
          2014,
          2015,
          2016,
          2017,
          2018,
          2019
        ];
        this.changeTaxtype("IT");
      } else if (mode === "m") {
        this.chartdata.labels = [
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
        this.changeTaxtype("IT");
      } else {
        this.chartdata.labels = this.taxtypes.map(v => v.name);
        this.getMockTaxtype();
      }
      this.renderChart();
    },
    changeTaxtype(taxtype) {
      //   Sample data where getting collection of selected taxtype from store
      this.datasets = this.mock_datasets();
    },
    renderChart() {
      if (this.mode === "d")
        this.$refs.rdo_doughnut_chart.renderChart(this.chartdata, null);
      else this.$refs.rdo_bar_chart.renderChart(this.chartdata, this.options);
    },
    getMockTaxtype() {
      this.chartdata.datasets[0].data = this.mock_datasets();
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
    },
    mock_datasets() {
      var datasets = [],
        range = this.mode === "y" ? 10 : this.mode === "m" ? 12 : this.taxtypes.length;
      for (let index = 0; index < range; index++) {
        var val = Math.floor(Math.random() * 200) + 30;
        datasets.push(val);
      }
      return datasets;
    }
  }
};
</script>

<style>
.bar-collection-taxtype canvas {
  height: 70vh !important;
  width: 60vw !important;
}
.doughnut-collection-taxtype {
  position: relative;
  width: 40vw;
}
</style>