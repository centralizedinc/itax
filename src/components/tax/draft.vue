<template>
  <a-table :columns="cols" :dataSource="draft_forms">
    <span slot="form" slot-scope="form">Form {{form}}</span>
    <a-tooltip slot="datetime" slot-scope="created_date" :title="moment(created_date).fromNow()">
      <span>{{formatDate(created_date)}}</span>
    </a-tooltip>

    <a-button-group slot="actions" slot-scope="text, record">
      <a-button type="primary" @click="reOpenForm(record.form, record.ref_no)">Edit</a-button>
      <a-button type="danger" @click="removeDraft(record.ref_no)">Remove</a-button>
    </a-button-group>
  </a-table>
</template>

<script>
import moment from "moment";

export default {
  methods: {
    reOpenForm(form, ref_no) {
      window.open(`http://localhost:8080/#/tax/form/${form}?ref_no=${ref_no}`);
    },
    removeDraft(ref_no){
      this.$store.commit('REMOVE_DRAFT_FORM', ref_no)
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
          dataIndex: "taxpayer"
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
      return this.deepCopy(this.$store.state.tax_form.draft_forms);
    }
  }
};
</script>