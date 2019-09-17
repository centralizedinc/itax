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
import Form2550m from "../../../plugins/pdf/printers/2550m";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const printers = {
  FORM1601E: Form1601e,
  FORM2550M: Form2550m
};
export default {
  props: ["form"],
  components: {
    pdf
  },
  data() {
    return {
      prev: "",
      type: "FORM2550M"
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
      var data_holder = this.form;
      data_holder.amendedYn;

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
    formatDt(dt) {
      var date = new Date(dt);
      var month = date.getMonth() + 1;
      var newDT = date.getFullYear() + "-" + month + "-" + date.getDate();
      return newDT;
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