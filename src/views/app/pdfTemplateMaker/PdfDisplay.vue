<template>
  <div>
    <div v-if="getting_data_error">Error in getting data...</div>
    <template v-else>
      <pdf style="width:100%" :src="prev" @progress="load" v-show="!loading"></pdf>
      <a-row type="flex" justify="center" v-show="loading" style="height:100vh">
        <a-col :span="6">
          Please wait...
          <a-icon theme="twoTone" type="hourglass" style="margin-top: 30vh; font-size:60px" spin></a-icon>
        </a-col>
      </a-row>
    </template>
  </div>
</template>
<script>
// import your plugins pdf printers form
import pdf from "vue-pdf";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import pdf_template from "./pdf_template";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  props: ["record"],
  components: {
    pdf
  },
  data() {
    return {
      prev: "",
      loading: false,
      percent: 0,
      getting_data_error: false,
      pages_data: []
    };
  },
  watch: {
    record: {
      handler(val) {
        console.log("#update record ", this.record);
        this.refresh();
      },
      deep: true
    }
  },
  created() {
    console.log("#record :", this.record);
    // console.log("#type :", type);
    // this.getPdfConfig();
    this.refresh();
  },
  methods: {
    // getPdfConfig() {
    //   this.loading = true;
    //   this.getting_data_error = false;
    //   this.$http
    //     .get(`/pdf_config/code/${this.type}`)
    //     .then(results => {
    //       console.log("#results in getting pdf data :", results);
    //       if (results.data && !results.data.error && results.data.length) {
    //         this.pages_data = results.data;
    //         this.getting_data_error = false;
    //         this.refresh();
    //       } else {
    //         console.log("results.data.error :", results.data.error);
    //         this.getting_data_error = true;
    //       }
    //     })
    //     .catch(err => {
    //       console.log("err :", err);
    //       this.getting_data_error = true;
    //     });
    // },
    load(e) {
      console.log("loaded: ", e);
      this.percent = e * 100;
    },
    refresh() {
      this.loading = true;
      pdf_template
        .fillup(null, [this.record])
        .then(document => {
          var self = this;
          const pdfDocGenerator = pdfMake.createPdf(document);
          pdfDocGenerator.getBuffer(function(buffer) {
            var file = new Blob([buffer], {
              type: "application/pdf"
            });
            var dataUrl = URL.createObjectURL(file);
            console.log("dataurl: " + dataUrl);
            self.prev = dataUrl;
            self.loading = false;
          });
        })
        .catch(err => {
          console.log("error in fillup :", err);
          this.loading = false;
        });
    },
    // download() {
    //   var filename = this.form_type;
    //   var printer = printers[this.form_type];
    //   var document = printer.fillup(this.form);
    //   var self = this;
    //   pdfMake.createPdf(document).download(filename, err => {
    //     if (err) {
    //       console.log("err: " + err);
    //     } else {
    //       self.prev = filename;
    //       this.refresh();
    //     }
    //   });
    // },
    // open() {
    //   var printer = printers[this.form_type];
    //   this.form.whole_pdf = true;
    //   console.log("form details open: " + JSON.stringify(this.form));
    //   var pdf_list = [];
    //   // for (var x = 0; x <= 1; x++) {
    //   //   this.form.pdf_page = x;
    //   var document = printer.fillup(this.form);
    //   var self = this;
    //   pdfMake.createPdf(document).open(dataUrl => {
    //     pdf_list.push(dataUrl);
    //     console.log("getdata: " + dataUrl);
    //     self.prev = dataUrl;
    //   });
    //   this.refresh();
    //   console.log("open form data: " + JSON.stringify(this.form));
    //   // }
    //   console.log("pdf list data: " + JSON.stringify(pdf_list));
    // },
    // upload() {
    //   var printer = printers[this.form_type];
    //   var document = printer.fillup(this.form);
    //   var self = this;
    //   return pdfMake.createPdf(document);
    // }
  }
};
</script>
<style>
</style>