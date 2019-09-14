<template>
  <v-container>  
    <!-- default layout -->
    <v-layout row wrap justify-center v-if="layout == 'default'">
      <v-flex xs6  transition="scale-transition" origin="center center">
        <form-img :form-details="formDetails"
                  @close="closeImage" 
                  @zoom="closeInput">
        </form-img>                  
      </v-flex>
      <v-flex xs6>
            <form-input :form-details="formDetails" @validate="validate"></form-input>  
      </v-flex>       
    </v-layout>

    <!-- full-image layout -->
    <v-layout row wrap justify-center v-else-if="layout == 'fullImage'">
      <v-flex xs12 >
        <form-img  :form-details="formDetails"  @close="setDefault"></form-img>                  
        
      </v-flex>      
    </v-layout>

    <!-- full-input layout -->
    <v-layout row wrap justify-center v-else-if="layout == 'fullInput'">
      <v-flex xs12 >
          <form-input :form-details="formDetails"></form-input>  
      </v-flex> 
      <v-fab-transition v-show="layout == 'fullInput'">
        <v-btn
          color="primary"
          fab
          fixed
          @click="setDefault"
          right
        >
          <v-icon>image_search</v-icon>
        </v-btn>
    </v-fab-transition>  
    </v-layout>
     <form-validation :dialog="showValidation" @exit="closeValidation"></form-validation>
  </v-container>
</template>
<script>
import formImage from "./Image";
import formInput from "./Form";
import formValidation from "./Validation";

export default {
  components: {
    "form-img": formImage,
    "form-input": formInput,
    "form-validation": formValidation
  },
  data() {
    return {
      current_page: 1,
      layout: "default",
      showValidation: false,
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
    closeValidation() {
      this.showValidation = false;
    },
    closeImage() {
      this.layout = "fullInput";
    },
    closeInput() {
      this.layout = "fullImage";
    },
    setDefault() {
      this.layout = "default";
    },
    next() {
      if (this.page <= 3) {
        this.page = this.page + 1;
      }
    },
    back() {
      if (this.page > 1) {
        this.page = this.page - 1;
      }
    },
    validate() {
      this.showValidation = true;
    },
    submit() {
      var self = this;
      self.show = false;
      var details = {
        form_type: "1601E",
        form_details: this.formDetails
      };
      this.$http
        .post("https://itax-api.herokuapp.com/tax/returns", details)
        .then(response => {
          console.log(JSON.stringify(response.data));

          var results = response.data;
          this.errors = results.errors;
        });
    }
  },
  mounted: function() {
    this.$http
      .get("https://itax-api.herokuapp.com/taxpayer?tin=222222222222")
      .then(response => {
        this.formDetails.taxpayer = response.data.data;
      });
  }
};
</script>
