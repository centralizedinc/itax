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
      <div slot="actions">
        <a-tooltip>
          <span slot="title">Print</span>
          <a-icon type="printer" style="cursor: pointer; margin-right: 2vh;" />
        </a-tooltip>
        <a-tooltip>
          <span slot="title">Download</span>
          <a-icon type="download" style="cursor: pointer" />
        </a-tooltip>
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
      loading: false,
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
          title: "Actions",
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
  }
};
</script>