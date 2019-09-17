<template>
  <div>
    <pdf style="display:none" :src="preview"></pdf>
    <pdf style="width:50%" :src="prev"></pdf>
    <a-button @click="download">Download</a-button>
    <a-button @click="open">Open</a-button>
  </div>
</template>
<script>
import pdf from "vue-pdf";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Form1601e from "../../../plugins/pdf/printers/1601e";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const printers = {
  FORM1601E: Form1601e
};
export default {
  props: ["form"],
  components: {
    pdf
  },
  data() {
    return {
      prev: "",
      type: "FORM1601E"
    };
  },
  computed: {
    preview() {
      var printer = printers[this.type];
      var document = printer.fillup(this.form);

      const pdfDocGenerator = pdfMake.createPdf(document);
      var self = this;
      pdfDocGenerator.getBuffer(function(buffer) {
        var file = new Blob([buffer], {
          type: "application/pdf"
        });
        var dataUrl = URL.createObjectURL(file);
        console.log(dataUrl);
        self.prev = dataUrl;
        return dataUrl;
      });
      // var printer = printers[this.type];
      // var document = printer.fillup(this.data);
      // var self = this;
      // const pdfDocGenerator = pdfMake.createPdf(document);
      // pdfDocGenerator.getBuffer(function(buffer) {
      //   var file = new Blob([buffer], {
      //     type: "application/pdf"
      //   });
      //   var dataUrl = URL.createObjectURL(file);
      //   console.log("dataurl: " + dataUrl);
      //   self.prev = dataUrl;
      // });
      // return this.prev;
    }
  },
  watch: {
    form() {
      console.log("##### update");
    }
  },
  created() {
    console.log("form 1601e display");
    this.refresh();
  },

  methods: {
    refresh() {
      // this.data = {};
      // this.data = {
      //   month: 12,
      //   tax_computation: [
      //     {
      //       income_nature: "Gambling",
      //       atc: "WC 140",
      //       tax_base: 2,
      //       tax_rate: 20,
      //       tax_widthheld: 200
      //     },
      //     {
      //       income_nature: "Gambling",
      //       atc: "WC 140",
      //       tax_base: 2,
      //       tax_rate: 20,
      //       tax_widthheld: 200
      //     },
      //     {
      //       income_nature: "Gambling",
      //       atc: "WC 140",
      //       tax_base: 2,
      //       tax_rate: 20,
      //       tax_widthheld: 200
      //     }
      //   ]
      // };
      // this.$preview(data, "TEST", "fda-receipt.pdf").then(result => {
      //   console.log("result :" + JSON.stringify(result));
      //   this.prev = result;
      //   console.log("prev data: " + JSON.stringify(this.prev));
      // });
      var printer = printers[this.type];
      var document = printer.fillup(this.form);
      var self = this;
      const pdfDocGenerator = pdfMake.createPdf(document);
      pdfDocGenerator.getBuffer(function(buffer) {
        var file = new Blob([buffer], {
          type: "application/pdf"
        });
        var dataUrl = URL.createObjectURL(file);
        console.log("dataurl: " + dataUrl);
        self.prev = dataUrl;
      });
    },
    download() {
      var filename = "Form 1601E";
      var printer = printers[this.type];
      var document = printer.fillup(this.form);
      var self = this;
      pdfMake.createPdf(document).download(filename, err => {
        if (err) {
          console.log("err: " + err);
        } else {
          self.prev = filename;
          this.refresh();
        }
      });
    },
    open() {
      var printer = printers[this.type];
      var document = printer.fillup(this.form);
      var self = this;
      pdfMake.createPdf(document).open(dataUrl => {
        console.log("getdata: " + dataUrl);
        self.prev = dataUrl;
      });
    }
  }
};
</script>
<style>
</style>