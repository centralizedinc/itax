<template>
  <div>
    <!-- <v-toolbar color="primary"> -->
    <!-- <v-btn icon @click="close()">
        <v-icon>close</v-icon>
    </v-btn>-->
    <!-- <v-toolbar-title>Form 1601-E</v-toolbar-title> -->

    <a-button @click="back()">
      <a-icon type="arrow-left" />
    </a-button>
    <a-button>
      <a-icon type="save" />
    </a-button>
    <a-button @click="next()">
      <a-icon type="arrow-right" />
    </a-button>
    <!-- <v-btn icon @click="back()">
                <v-icon>mdi-skip-previous</v-icon>
              </v-btn>
              <v-btn icon @click="validate">
                <v-icon>save</v-icon>
              </v-btn>
              <v-btn icon @click="next()">
                <v-icon>mdi-skip-next</v-icon>
    </v-btn>-->
    <!-- </v-toolbar> -->
    <!-- page 1 -->
    <page-1 :form-details="formDetails" v-show="formDetails.page==1"></page-1>
    <!-- page 2 -->
    <page-2 :form-details="formDetails" v-show="formDetails.page==2"></page-2>
    <!-- page 3 -->
    <page-3 :form-details="formDetails" v-show="formDetails.page==3"></page-3>
    <!-- page 4 -->
    <page-4 :form-details="formDetails" v-show="formDetails.page==4"></page-4>
  </div>
</template>
<script>
import page1 from "./Page1";
import page2 from "./Page2";
import page3 from "./Page3";
import page4 from "./Page4";

export default {
  // props: ["formDetails"],
  components: {
    "page-1": page1,
    "page-2": page2,
    "page-3": page3,
    "page-4": page4
  },
  data() {
    return {
      // page: 1,
      formDetails: {
        page: 1,
        dateFormatted: "12/2017",
        amendedYn: "N",
        numOfSheet: 0,
        opnYn: "N",
        maskTin: "### - ### - ### - ###",
        taxpayer: {}
      }
    };
  },
  methods: {
    //   validate(){
    //     this.$emit('validate')
    //   },
    //   close(){
    //     this.$emit('close');
    //   },
    next() {
      if (this.formDetails.page <= 3) {
        this.formDetails.page = this.formDetails.page + 1;
      }
    },
    back() {
      if (this.formDetails.page > 1) {
        this.formDetails.page = this.formDetails.page - 1;
      }
    }
    //   submit() {
    //     var self = this;
    //     self.show = false;
    //     var details = {
    //       form_type: "1601E",
    //       form_details: this.formDetails
    //     };
    //     this.$http
    //       .post("https://itax-api.herokuapp.com/tax/returns", details)
    //       .then(response => {
    //         console.log(JSON.stringify(response.data));

    //         var results = response.data;
    //         this.errors = results.errors;

    //       });
    //   }
    // },
    // mounted: function() {
    //   this.$http
    //     .get("https://itax-api.herokuapp.com/taxpayer?tin=222222222222")
    //     .then(response => {
    //       this.formDetails.taxpayer = response.data.data;
    //     });
  }
};
</script>
