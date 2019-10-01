<template>
  <div>
    <!-- <pdf style="display:none" :src="preview"></pdf> -->
    <pdf style="width:100%" :src="prev"></pdf>
    <!-- <br /> -->
  </div>
</template>
<script>
// import your plugins pdf printers form
import pdf from "vue-pdf";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Form1601e from "../plugins/pdf/printers/1601e";
import Form2550m from "../plugins/pdf/printers/2550m";
<<<<<<< HEAD
import Form1700 from "../plugins/pdf/printers/1700";
=======
import Form2551m from '../plugins/pdf/printers/2551m'
>>>>>>> c99eff2b705927e78b2f3d7b7c8e924e072431df
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// add printers
const printers = {
  FORM1601E: Form1601e,
  FORM2550M: Form2550m,
<<<<<<< HEAD
  FORM1700: Form1700,
=======
  FORM2551M: Form2551m
>>>>>>> c99eff2b705927e78b2f3d7b7c8e924e072431df
};
export default {
  props: ["form", "type"],
  components: {
    pdf
  },
  data() {
    return {
      prev: ""
      // type: ""
    };
  },
  computed: {
    preview() {
      console.log("computed preview form data: " + JSON.stringify(this.form));
      var printer = printers[this.form_type];
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
    },
    form_type() {
      return `FORM${this.type.toUpperCase()}`;
    }
  },
  watch: {
    form: {
      handler(val) {
        console.log("##### update ", this.form);
        this.refresh();
      },
      deep: true
    }
  },
  created() {
    console.log("form 1601e display");
    console.log("this.type.toUpperCase() :", this.form_type);
    this.refresh();
  },

  methods: {
    refresh() {
      this.form.year = this.formatDtYear(this.form.dateFiled);
      this.form.month = this.formatDtMonth(this.form.dateFiled);

      var printer = printers[this.form_type];
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
    formatDtYear(dt) {
      var date = new Date(dt);
      var month = date.getMonth() + 1;
      var newDT = date.getFullYear();
      return newDT;
    },
    formatDtMonth(dt) {
      var date = new Date(dt);
      var month = date.getMonth() + 1;
      return month;
    },
    download() {
      var filename = this.form_type;
      var printer = printers[this.form_type];
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
      var printer = printers[this.form_type];
      var document = printer.fillup(this.form);
      var self = this;
      pdfMake.createPdf(document).open(dataUrl => {
        console.log("getdata: " + dataUrl);
        self.prev = dataUrl;
      });
      console.log("open form data: " + JSON.stringify(this.form));
      this.refresh();
    }
  }
};
</script>
<style>
</style>