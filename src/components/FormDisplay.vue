<template>
  <div>
    <!-- <pdf style="display:none" :src="preview"></pdf> -->
    <pdf style="width:100%" :src="prev" @progress="load" v-show="!loading"></pdf>
    <a-row type="flex" align="middle" justify="center" v-show="loading">
      <a-col :span="6">
        <a-icon type="loading" style="margin-top: 30vh; font-size:42px"></a-icon>
        <!-- <a-progress type="circle" :percent="percent" /> -->
      </a-col>
    </a-row>
  </div>
</template>
<script>
// import your plugins pdf printers form
import pdf from "vue-pdf";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Form1601e from "../plugins/pdf/printers/1601e";
import Form2550m from "../plugins/pdf/printers/2550m";
import Form1700 from "../plugins/pdf/printers/1700";
import Form2551q from "../plugins/pdf/printers/2551q";
import Form1701q from "../plugins/pdf/printers/1701q";
import Form2550q from "../plugins/pdf/printers/2550q";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const printers = {
  FORM1601E: Form1601e,
  FORM2550M: Form2550m,
  FORM1700: Form1700,
  FORM2551Q: Form2551q,
  FORM1701Q: Form1701q,
  FORM2550Q: Form2550q
};
export default {
  props: ["form", "type"],
  components: {
    pdf
  },
  data() {
    return {
      prev: "",
      loading: false,
      percent: 0
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
    console.log("form display :", this.form);
    console.log("this.type.toUpperCase() :", this.form_type);
    this.refresh();
  },

  methods: {
    load(e) {
      console.log("loaded: ", e);
      this.percent = e * 100;
    },
    refresh() {
      this.loading = true;
      var form = this.deepCopy(this.form);
      form.year = this.formatDtYear(form.dateFiled);
      form.month = this.formatDtMonth(form.dateFiled);
      var dateFiled1 = {
        month: this.formatDtMonth(form.dateFiled1),
        year: this.formatDtYear(form.dateFiled1)
      };

      var birthday = {
        month: this.formatDtMonth(form.taxpayer.birthday),
        year: this.formatDtYear(form.taxpayer.birthday),
        day: this.formatDtDay(form.taxpayer.birthday)
      };
      console.log("taxpayer.birthday :", birthday);
      form.birthday = birthday;

      var dateFiled2 = {
        month: this.formatDtMonth(form.dateFiled2),
        year: this.formatDtYear(form.dateFiled2)
      };
      console.log("dateField2 :", dateFiled2);
      form.dateFiled2 = dateFiled2;

      console.log("this.form##### : ", form);
      var printer = printers[this.form_type];
      var document = printer.fillup(form);
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