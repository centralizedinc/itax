<template>
  <div>
    <a-card title="RDO" />
    <a-card>
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
          :radius="item.radius"
          :options="item.options"
          @mouseover="onHover(item.rdo)"
          @mouseout="onMouseOut(item.rdo)"
          @click="displayInfo(item.rdo)"
        ></GmapCircle>
      </GmapMap>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      center: { lat: 12.917797021533946, lng: 122.05196587070316 },
      rdo_coordinates: [
        {
          rdo: "001",
          coordinates: { lat: 18.22491, lng: 120.607 },
          radius: 12157
        },
        {
          rdo: "17A",
          coordinates: { lat: 15.48532, lng: 120.63655 },
          radius: 10200
        },
        {
          rdo: "17B",
          coordinates: { lat: 15.66862, lng: 120.578331 },
          radius: 6000
        }
      ],
      info_data: {}
    };
  },
  created() {},
  methods: {
    setCoordinate(e) {
      this.coordinates.lat = e.latLng.lat();
      this.coordinates.lng = e.latLng.lng();
      console.log(this.coordinates);
      /**
       * 
        options: {
          fillOpacity: 0,
          strokeOpacity: 0
        }
       */
    },
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
      const index = this.rdo_coordinates.findIndex(v => v.rdo === rdo);
      this.rdo_coordinates[index].options.strokeOpacity = 0.8;
      this.rdo_coordinates[index].options.fillOpacity = 0.3;
    },
    onMouseOut(rdo) {
      const index = this.rdo_coordinates.findIndex(v => v.rdo === rdo);
      this.rdo_coordinates[index].options.strokeOpacity = 0;
      this.rdo_coordinates[index].options.fillOpacity = 0;
    },
    displayInfo(rdo) {
      this.info_data.rdo = rdo;
    }
  }
};
</script>

<style>
</style>