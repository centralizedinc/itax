<template>
  <a-card>
    <a-table :columns="cols" :dataSource="draft_forms">
      <span slot="form" slot-scope="form">Form {{form}}</span>
      <a-tooltip slot="datetime" slot-scope="created_date" :title="moment(created_date).fromNow()">
        <span>{{formatDate(created_date)}}</span>
      </a-tooltip>

      <span slot="tin" slot-scope="tin">
        {{formatTIN(tin)}}
      </span>
      <a-button-group slot="actions" slot-scope="text, record">
        <a-button type="primary" @click="reOpenForm(record.form, record.ref_no)">Continue</a-button>
        <a-popconfirm
          title="Remove this from draft?"
          @confirm="removeDraft(record.form, record.ref_no)"
          okText="Yes"
          cancelText="Cancel"
        >
          <a-button type="danger">Remove</a-button>
        </a-popconfirm>
      </a-button-group>
    </a-table>
  </a-card>
</template>

<script>
import moment from "moment";

export default {
  methods: {
    reOpenForm(form, ref_no) {
      this.$notification.open({
        message: `Edit Form ${form.toUpperCase()}.`,
        icon: <a-icon type="check" style="color: blue" />
      });
      window.open(`${process.env.VUE_APP_HOME_URL}tax/form/${form}?ref_no=${ref_no}`);
    },
    removeDraft(form, ref_no) {
      this.$store.commit("REMOVE_DRAFT_FORM", ref_no);
      this.$notification.open({
        message: `Successfully remove form ${form.toUpperCase()} in draft.`,
        icon: <a-icon type="check" style="color: blue" />
      });
    }
  },
  data() {
    return {
      moment,
      cols: [
        {
          title: "Form",
          dataIndex: "form"
        },
        {
          title: "Taxpayer",
          dataIndex: "taxpayer",
          scopedSlots: { customRender: "tin" }
        },
        {
          title: "Date Created",
          dataIndex: "created_date",
          scopedSlots: { customRender: "datetime" }
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
    draft_forms() {
      console.log(JSON.stringify(this.$store.state.tax_form.draft_forms))
      return this.deepCopy(this.$store.state.tax_form.draft_forms);
    }
  }
};
</script>