<template>
  <div>
    <!-- <pdf style="display:none" :src="preview"></pdf> -->
    <pdf style="width:100%" :src="prev" @progress="load" v-show="!loading"></pdf>
    <a-row type="flex" justify="center" v-show="loading" style="height:100vh">
      <a-col :span="6">
        Please wait...
        <a-icon theme="twoTone" type="hourglass" style="margin-top: 30vh; font-size:60px" spin></a-icon>
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
import Form2000ot from "../plugins/pdf/printers/2000ot";
import Form1604e from "../plugins/pdf/printers/1604e";
import Form1601f from "../plugins/pdf/printers/1601f";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const printers = {
  FORM1601E: Form1601e,
  FORM1604E: Form1604e,
  FORM2550M: Form2550m,
  FORM1700: Form1700,
  FORM2551Q: Form2551q,
  FORM1701Q: Form1701q,
  FORM2550Q: Form2550q,
  FORM2000OT: Form2000ot,
  FORM1601F: Form1601f,
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
      if (!form.taxpayer) {
        form.taxpayer = {};
      }
      if (!form.taxpayer.address_details) {
        form.taxpayer.address_details = {};
      }
      if (!form.taxpayer.contact_details) {
        form.taxpayer.contact_details = {};
      }
      form.year = this.formatDtYear(form.dateFiled);
      // form.month = this.formatDtMonth(form.dateFiled);
      // var return_period = {
      //   month: this.formatDtMonth(form.return_period),
      //   year: this.formatDtYear(form.return_period)
      // };
      // form.return_period = return_period;
      var dateFiled1 = {
        month: this.formatDtMonth(form.dateFiled1),
        year: this.formatDtYear(form.dateFiled1)
      };
      form.dateFiled1 = dateFiled1;

      var birthday = {
        month: this.formatDtMonth(form.taxpayer.birthday),
        year: this.formatDtYear(form.taxpayer.birthday),
        day: this.formatDtDay(form.taxpayer.birthday)
      };
      console.log("taxpayer.birthday :", birthday);
      form.birthday = birthday;

      var sbirthday = {
        month: this.formatDtMonth(form.taxpayer.sbirthday),
        year: this.formatDtYear(form.taxpayer.sbirthday),
        day: this.formatDtDay(form.taxpayer.sbirthday)
      };
      console.log("taxpayer.birthday :", sbirthday);
      form.sbirthday = sbirthday;

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
    },
    upload(){
      var printer = printers[this.form_type];
      var document = printer.fillup(this.form);
      var self = this;
      return pdfMake.createPdf(document)
      
    }
  }
};
</script>
<style>
</style>