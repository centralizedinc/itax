<template>
  <div>
    <a-card title="RDO" />
    <GmapMap
      id="map"
      ref="map"
      :center="center"
      :zoom="7"
      map-type-id="terrain"
      draggable="true"
      style="width: 100%; height: 150vh"
    >
      <!-- <GmapPolygon :paths="polygon"></GmapPolygon> -->
      <GmapCircle
        v-for="(item, index) in rdo_coordinates"
        :key="index"
        :center="item.coordinates"
        :radius="item.coordinates.radius"
        :options="item.options"
        @mouseover="onHover(item.code)"
        @mouseout="onMouseOut(item.code)"
        @click="displayInfo(item.code)"
      ></GmapCircle>
    </GmapMap>
  </div>
</template>

<script>
export default {
  data() {
    return {
      center: { lat: 12.917797021533946, lng: 122.05196587070316 },
      rdo_coordinates: [],
      info_data: {}
    };
  },
  
  created() {
    this.$store
      .dispatch("GET_RDOS")
      .then(result => {
        this.rdo_coordinates = this.deepCopy(this.rdos).map(v => {
          v.options = {
            strokeOpacity: 0.8,
            fillOpacity: 0.3
          }
          return v;
        });
        console.log('this.rdo_coordinates :', this.rdo_coordinates);
      })
      .catch(err => {});
  },
  computed: {
    rdos() {
      return this.$store.state.tax_form.rdos;
    }
  },
  methods: {
    onHover(rdo) {
      // this.rdo_coordinates.forEach((val) => {
      //   if(val.rdo === rdo){
      //     val.options.strokeOpacity = 0.8;
      //     val.options.fillOpacity = 0.3;
      //   } else {
      //     val.options.strokeOpacity = 0;
      //     val.options.fillOpacity = 0;
      //   }
      // })
      const index = this.rdo_coordinates.findIndex(v => v.code === rdo);
      this.rdo_coordinates[index].options.strokeOpacity = 0.8;
      this.rdo_coordinates[index].options.fillOpacity = 0.3;
    },
    onMouseOut(rdo) {
      // const index = this.rdo_coordinates.findIndex(v => v.code === rdo);
      // this.rdo_coordinates[index].options.strokeOpacity = 0;
      // this.rdo_coordinates[index].options.fillOpacity = 0;
    },
    displayInfo(rdo) {
      this.info_data.code = rdo;
      const data = this.rdo_coordinates.find(v => v.code === rdo);
      console.log('data :', data);
    }
  }
};
</script>

<style>
</style>