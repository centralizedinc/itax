<template>
  <a-card :bodyStyle="{ display: 'flex', 'align-items': 'center', 'justify-content': 'center' }">
    <div slot="title">
      <a-row>
        <a-col :span="15">
          <span>Collection Per Taxtype</span>
        </a-col>
        <a-col :span="4">
          <a-select @change="changeMode" defaultValue="d" size="small">
            <a-select-option key="d" value="d">Per Taxtype</a-select-option>
            <a-select-option key="m" value="m">Monthly</a-select-option>
            <a-select-option key="y" value="y">Yearly</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="5">
          <span style="margin-right: 1vw;">Tax Type:</span>
          <a-select @change="changeTaxtype" defaultValue="I" size="small">
            <a-select-option key="I" value="I">Individual</a-select-option>
            <a-select-option key="C" value="C">Corporate</a-select-option>
          </a-select>
        </a-col>
      </a-row>
    </div>
    <doughnut v-show="mode==='d'" class="doughnut-collection-taxtype" ref="taxtype_doughnut_chart" />
    <bar v-show="mode!=='d'" class="bar-collection-taxtype" ref="taxtype_bar_chart" />
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
      datasets: []
    };
  },
  created() {
    this.changeTaxtype();
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
  methods: {
    changeMode(mode) {
      this.mode = mode;
      if (mode === "y") {
        this.chartdata.labels = [
          2009,
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
      } else
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
      this.renderChart();
    },
    changeTaxtype(taxtype) {
      //   Sample data
      var datasets = [];
      for (let index = 0; index < 12; index++) {
        var val = Math.floor(Math.random() * 200) + 30;
        datasets.push(val);
      }
      this.datasets = datasets;
    },
    renderChart() {
      if (this.mode === "d")
        this.$refs.taxtype_doughnut_chart.renderChart(this.chartdata, null);
      else this.$refs.taxtype_bar_chart.renderChart(this.chartdata, this.options);
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