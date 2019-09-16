<template>
  <div>
    <pdf style="width:100%" :src="preview"></pdf>
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
  props: ["data"],
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
      return this.prev;
    }
  },
  created() {
    console.log("form 1601e display");
    this.refresh();
  },

  methods: {
    refresh() {
      this.data = {
        tax_computation: [
          {
            income_nature: "Gambling",
            atc: "WC 140",
            tax_base: 2,
            tax_rate: 20,
            tax_widthheld: 200
          },
          {
            income_nature: "Gambling",
            atc: "WC 140",
            tax_base: 2,
            tax_rate: 20,
            tax_widthheld: 200
          },
          {
            income_nature: "Gambling",
            atc: "WC 140",
            tax_base: 2,
            tax_rate: 20,
            tax_widthheld: 200
          }
        ]
      };
      // this.$preview(data, "TEST", "fda-receipt.pdf").then(result => {
      //   console.log("result :" + JSON.stringify(result));
      //   this.prev = result;
      //   console.log("prev data: " + JSON.stringify(this.prev));
      // });
      var printer = printers[this.type];
      var document = printer.fillup(this.data);
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
    }
  }
};
</script>
<style>
</style>