<template>
    <v-layout row wrap>      
      <v-flex xs12 mr-3>
        
      <v-toolbar color="primary" >
        <v-btn icon color="primary" @click="close" v-show="!isFullScreen">
          <v-icon>close</v-icon>
        </v-btn>
        
        <v-toolbar-title>Preview</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon color="primary" @click="zoom" v-show="!isFullScreen">
          <v-icon>zoom_in</v-icon>
        </v-btn>
        <v-btn icon color="primary" @click="close" v-show="isFullScreen">
          <v-icon>zoom_out</v-icon>
        </v-btn>
      </v-toolbar>
      <img src="~@/assets/1601e.jpg" alt="" style="width:100%;">   
            <canvas style="position: relative" id="canvas" height="450" width="550"
              v-form-details="formDetails"></canvas>
      </v-flex>
    </v-layout> 
</template>
<script>
export default {
  props: ["formDetails", "layout"],
  data() {
    return {
      isFullScreen: false
    };
  },
  methods: {
    refreshCanvas() {},
    close() {
      this.$emit("close");
      this.isFullScreen = false;
    },
    zoom() {
      this.$emit("zoom");
      this.isFullScreen = true;
    }
  },
  mounted: function() {},

  directives: {
    "form-details": function(canvasElement, binding) {
      // Get canvas context
      var ctx = canvasElement.getContext("2d");

      // Clear the canvas
      ctx.clearRect(0, 0, 800, 800);
      // Insert stuff into canvas
      var base_image = new Image();
      ctx.drawImage(base_image, 0, 0);

      ctx.font = "14px Arial";
      //item 1
      // ctx.fillText(binding.value, 55, 67);

      //item 2
      if (binding.value.amendedYn == "Y") {
        ctx.fillText("x", 225, 32);
      } else {
        ctx.fillText("x", 265, 32);
      }

      //item3
      ctx.fillText(binding.value.numOfSheet, 340, 32);

      //item 4
      if (binding.value.opnYn == "Y") {
        ctx.fillText("x", 435, 32);
      } else {
        ctx.fillText("x", 485, 32);
      }

      //item 5
      ctx.fillText(binding.value.taxpayer.tin.substring(0, 3), 40, 60);
      ctx.fillText(binding.value.taxpayer.tin.substring(3, 6), 90, 60);
      ctx.fillText(binding.value.taxpayer.tin.substring(6, 9), 140, 60);
      ctx.fillText(binding.value.taxpayer.tin.substring(9, 12), 190, 60);

      //item 5
      ctx.fillText(binding.value.taxpayer.rdo_code, 310, 60);

      //item 7
      ctx.fillText(binding.value.taxpayer.line_of_business, 430, 60);

      //item 11
      // ctx.fillText(binding.value.taxpayer.line_of_business, 380, 65);

      ctx.scale(1, 1);
    }
  }
};
</script>
<style>
#canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -190%);
}
</style>
