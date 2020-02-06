<template>
  <a-card>
    <a-table :loading="loading" :columns="cols" :dataSource="tax_returns">
      <span slot="form" slot-scope="form">Form {{form}}</span>
      <a-tooltip slot="datetime" slot-scope="date_created" :title="moment(date_created).fromNow()">
        <span>{{formatDate(date_created, {
                        hour12: true,
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                    })}}</span>
      </a-tooltip>
      <div slot="taxpayer" slot-scope="tin">
        {{formatTIN(tin)}}
      </div>
      <div slot="actions" slot-scope="text, record">
        <a-tooltip>
          <span slot="title">Print</span>
          <a-icon :type="printing && record.reference_no===selected_record?'loading':'printer'" @click="print(record)" style="cursor: pointer; font-size: 18px;" />
        </a-tooltip>
        <!-- <a-tooltip>
          <span slot="title">Download</span>
          <a-icon type="download" style="cursor: pointer" />
        </a-tooltip> -->
        <!-- <a-popconfirm title="Pay this form?" okText="Yes" cancelText="Cancel">
          <a-tooltip>
            <span slot="title">Payment</span>
            <a-icon type="shopping-cart" style="cursor: pointer" />
          </a-tooltip>
        </a-popconfirm> -->
      </div>
    </a-table>
    <!-- <form-display ref="form_display_component" :type="form_type" :form="form"  style="display:none"/> -->
  </a-card>
</template>

<script>
import moment from "moment";
// import FormDisplay from "@/components/FormDisplay.vue";
import pdf from "vue-pdf";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Form2550m from "../../plugins/pdf/printers/2550m";
import Form1701q from "../../plugins/pdf/printers/1701q";
import Form2000ot from "../../plugins/pdf/printers/2000ot";
import Form1600wp from "../../plugins/pdf/printers/1600wp";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const printers = {
  FORM2550M: Form2550m,
  FORM1701Q: Form1701q,
  FORM2000OT: Form2000ot,
  FORM1600WP: Form1600wp,
};
export default {
  components: {
    pdf
  },
  data() {
    return {
      moment,
      form_type:'',
      prev: '',
      form:{},
      printing:false,
      loading: false,
      selected_record:'',
      cols: [
        {
          title: "Reference No",
          dataIndex: "reference_no"
        },
        {
          title: "Form",
          dataIndex: "form_type",
          scopedSlots: { customRender: "form" }
        },
        {
          title: "Taxpayer",
          dataIndex: "tin",
          scopedSlots: { customRender: "taxpayer" }
        },
        {
          title: "Date Submitted",
          dataIndex: "date_created",
          scopedSlots: { customRender: "datetime" }
        },
        // {
        //   title: "Status",
        //   dataIndex: "status",
        //   scopedSlots: { customRender: "status" }
        // },
        {
          title: "",
          dataIndex: "actions",
          scopedSlots: { customRender: "actions" }
        }
      ]
    };
  },
  computed: {
    tax_returns() {
      return this.deepCopy(this.$store.state.tax_form.tax_returns);
    }
  },
  methods: {
    init() {
      this.loading = true;
      console.log("GET_TAX_RETURNS");
      this.$store
        .dispatch("GET_TAX_RETURNS")
        .then(result => {
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    }
  },
  created() {
    this.init();
  }, 
  methods:{
    print(record){
      console.log("print record form data: " + JSON.stringify(record))
      this.selected_record = record.reference_no
      this.printing = true;
      this.$store.dispatch("GET_UPLOAD_TAX_RETURNS", {
        form: record.form_type,
        ref_no:record.reference_no
      })
      .then(result=>{
        console.log('RESULT 1:::',JSON.stringify(result.data.model))
        console.log("record data: " + JSON.stringify(record.form_type))
        // this.printing = false;
        this.open(record.form_type, result.data.model)
        // window.open(result.data.model.url)
      })
      .catch(error=>{
        this.printing = false;
        console.log('ERROR :::',JSON.stringify(error))
      })
    },
    form_types(type) {
      return `FORM${type.toUpperCase()}`;
    },
    open(form_typed, form_data_model) {
      var form_model = form_data_model
      console.log("form_typed data: " + JSON.stringify(form_typed))
      console.log("form_model data: " + JSON.stringify(form_model))
      var type_form = `FORM${form_typed.toUpperCase()}`;
      console.log("type_form: ", type_form)
      var printer = printers[type_form];
      form_model.whole_pdf = true;
      var pdf_list = [];
      // for (var x = 0; x <= 1; x++) {
      //   this.form.pdf_page = x;
      var document = printer.fillup(form_model);
      var self = this;
      pdfMake.createPdf(document).open(dataUrl => {
        console.log("inside pdfmake")
        pdf_list.push(dataUrl);
        console.log("getdata submitted: " + dataUrl);
        self.prev = dataUrl;
      });
      this.refresh();
      console.log("open form data: " + JSON.stringify(form_model));
      // }
      console.log("pdf list data: " + JSON.stringify(pdf_list));
    },
  }
};
</script>