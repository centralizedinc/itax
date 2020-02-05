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
export default {
  data() {
    return {
      moment,
      form_type:'',
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
        {
          title: "Status",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        },
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
      console.log("print record form data: " + JSON.stringify(this.form))
      this.selected_record = record.reference_no
      this.printing = true;
      this.$store.dispatch("GET_UPLOAD_TAX_RETURNS", {
        form: record.form_type,
        ref_no:record.reference_no
      })
      .then(result=>{
        console.log('RESULT :::',JSON.stringify(result))
        this.printing = false;
        window.open(result.data.model.url)
      })
      .catch(error=>{
        this.printing = false;
        console.log('ERROR :::',JSON.stringify(error))
      })
    },
    open() {
      var printer = printers[this.form_type];
      this.form.whole_pdf = true;
      console.log("form details open: " + JSON.stringify(this.form));
      var pdf_list = [];
      // for (var x = 0; x <= 1; x++) {
      //   this.form.pdf_page = x;
      var document = printer.fillup(this.form);
      var self = this;
      pdfMake.createPdf(document).open(dataUrl => {
        pdf_list.push(dataUrl);
        console.log("getdata: " + dataUrl);
        self.prev = dataUrl;
      });
      this.refresh();
      console.log("open form data: " + JSON.stringify(this.form));
      // }
      console.log("pdf list data: " + JSON.stringify(pdf_list));
    },
  }
};
</script>