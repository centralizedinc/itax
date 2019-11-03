<template>
  <a-card :bodyStyle="{ display: 'flex', 'align-items': 'center', 'justify-content': 'center' }">
    <div slot="title">
      <a-row>
        <a-col :span="15">
          <span>Collection Per RDO</span>
        </a-col>
        <a-col :span="4">
          <a-select @change="changeMode" defaultValue="d" size="small">
            <a-select-option key="d" value="d">Per RDO</a-select-option>
            <a-select-option key="m" value="m">Monthly</a-select-option>
            <a-select-option key="y" value="y">Yearly</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="5">
          <span style="margin-right: 1vw;">RDO:</span>
          <a-select @change="changeRdo" defaultValue="001" size="small" style="width: 5vw;">
            <a-select-option v-for="item in rdos" :key="item.code" :value="item.code">{{item.code}}</a-select-option>
          </a-select>
        </a-col>
      </a-row>
    </div>
    <doughnut v-show="mode==='d'" class="doughnut-collection-rdo" ref="rdo_doughnut_chart" />
    <bar v-show="mode!=='d'" class="bar-collection-rdo" ref="rdo_bar_chart" />
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
    this.changeRdo();
    this.$store.dispatch("GET_RDOS");
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
    changeRdo(rdo) {
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
        this.$refs.rdo_doughnut_chart.renderChart(this.chartdata, null);
      else this.$refs.rdo_bar_chart.renderChart(this.chartdata, this.options);
    }
  }
};
</script>

<style>
.bar-collection-rdo canvas {
  height: 70vh !important;
  width: 60vw !important;
}
.doughnut-collection-rdo {
  position: relative;
  width: 40vw;
}
</style>