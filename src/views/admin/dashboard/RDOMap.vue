<template>
  <div :class="login_rdo ? 'hide-close' : ''">
    <a-card title="RDO" />
    <GmapMap
      id="map"
      ref="map"
      :center="center"
      :zoom="login_rdo ? 11 : 7"
      map-type-id="terrain"
      draggable="true"
      style="width: 100%; height: 150vh"
    >
      <GmapCircle
        v-for="(item, index) in rdo_coordinates"
        :key="`m${index}`"
        :center="item.coordinates"
        :radius="item.coordinates.radius"
        :options="item.options"
        @mouseover="!login_rdo ? onHover(item.code) : null"
        @mouseout="!login_rdo ? onMouseOut(item.code) : null"
        @click="!login_rdo ? displayInfo(item) : null"
      ></GmapCircle>

      <GmapInfoWindow
        v-for="(item, index) in info_data"
        :key="`i${index}`"
        :position="item.coordinates"
      >
        <h3 style="color: blue">RDO {{item.code}}</h3>
        <h4 style="color: gray">{{item.description}}</h4>
        <h4>{{nFormatter(1500000, 2)}}</h4>
      </GmapInfoWindow>
    </GmapMap>
  </div>
</template>

<script>
export default {
  data() {
    return {
      center: { lat: 12.917797021533946, lng: 122.05196587070316 },
      rdo_coordinates: [],
      info_data: []
    };
  },

  created() {
    this.init();
  },
  computed: {
    rdos() {
      return this.$store.state.tax_form.rdos;
    },
    login_rdo() {
      return this.$store.state.tax_form.login_rdo;
    }
  },
  methods: {
    init() {
      this.$store
        .dispatch("GET_RDOS")
        .then(result => {
          if (this.login_rdo) {
            var rdo = this.deepCopy(this.rdos).find(
              v => v.code === this.login_rdo
            );
            rdo.options = {
              strokeOpacity: 0.8,
              fillOpacity: 0.3
            };
            rdo.coordinates.radius = 20000;
            this.info_data = [rdo];
            this.rdo_coordinates = [rdo];
            this.center = rdo.coordinates;
          } else {
            this.rdo_coordinates = this.deepCopy(this.rdos).map(v => {
              v.coordinates.radius = 20000;
              v.options = {
                strokeOpacity: 0,
                fillOpacity: 0
              };
              return v;
            });
            this.center = { lat: 12.917797021533946, lng: 122.05196587070316 };
          }
        })
        .catch(err => {
          console.log('err :', err);
        });
    },
    onHover(rdo) {
      if (!this.login_rdo) {
        const index = this.rdo_coordinates.findIndex(v => v.code === rdo);
        this.rdo_coordinates[index].options.strokeOpacity = 0.8;
        this.rdo_coordinates[index].options.fillOpacity = 0.3;
      }
    },
    onMouseOut(rdo) {
      if (!this.login_rdo) {
        const index = this.rdo_coordinates.findIndex(v => v.code === rdo);
        this.rdo_coordinates[index].options.strokeOpacity = 0;
        this.rdo_coordinates[index].options.fillOpacity = 0;
      }
    },
    displayInfo(rdo) {
      this.info_data.push(rdo);
      this.center = rdo.coordinates;
      console.log("data :", this.info_data);
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
.hide-close button.gm-ui-hover-effect {
  display: none !important;
}
</style>