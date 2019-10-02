<template>
  <a-card>
    <a-form>
      <a-form-item
        label="Employer"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select
          showSearch
          placeholder="Search by TIN"
          style="width: 100%"
          @search="handleSearch($event, 'employer')"
          @change="handleChange($event, 'employer')"
          :loading="loading"
        >
          <a-select-option
            v-for="(d, index) in employer_taxpayers"
            :key="index"
            :value="d.tin"
          >{{d.tin}}{{d.branch_code}} {{d.individual_details ? `- ${d.individual_details.firstName} ${d.individual_details.lastName}`: '- New Taxpayer'}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="Spouse"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select
          showSearch
          placeholder="Search by TIN"
          optionFilterProp="children"
          style="width: 100%"
          @search="handleSearch($event, 'spouse')"
          @change="handleChange($event, 'spouse')"
          :loading="loading"
        >
          <a-select-option
            v-for="(d, index) in spouse_taxpayers"
            :key="index"
            :value="d.tin"
          >{{d.tin}}{{d.branch_code}} {{d.individual_details ? `- ${d.individual_details.firstName} ${d.individual_details.lastName}`: '- New Taxpayer'}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-for="(other, index) in others" :key="index">
        <a-select
          style="width: 17%"
          @change="other.relationship = $event"
          placeholder="Relationship"
        >
          <a-select-option
            v-for="(item, index) in relationships"
            :key="index"
            :value="item"
          >{{item}}</a-select-option>
        </a-select>
        <a-select
          showSearch
          placeholder="Search by TIN"
          optionFilterProp="children"
          style="width: 75%"
          @search="handleSearch($event, 'others')"
          @change="handleChange($event, 'others', index)"
          :loading="loading"
        >
          <a-select-option
            v-for="(d, index) in others_taxpayers"
            :key="index"
            :value="d.tin"
          >{{d.tin}}{{d.branch_code}} {{d.individual_details ? `- ${d.individual_details.firstName} ${d.individual_details.lastName}`: '- New Taxpayer'}}</a-select-option>
        </a-select>
        <a-icon
          type="delete"
          style="cursor: pointer; color: red;font-size:20px;margin-left:5px;"
          @click="removeTaxpayer(index)"
        />
      </a-form-item>
      <a-form-item style="text-align: center;">
        <!-- <a-button type="primary" @click="addTaxpayer">+ Add Other Taxpayer</a-button> -->
        <span @click="addTaxpayer" style="cursor: pointer; color: #3894D5;">+ Add Other Taxpayer</span>
      </a-form-item>
      <a-button-group style="float: right">
        <!-- <a-button @click="skip">Skip</a-button> -->
        <span
          @click="skip"
          style="cursor: pointer; color: #3894D5;text-decoration:underline;margin-right:25px;"
        >Skip</span>
        <a-button @click="connect" type="primary">Connect</a-button>
      </a-button-group>
    </a-form>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      search_value: "",
      loading: false,
      loading_employer: false,
      loading_spouse: false,
      loading_others: false,
      spouse_taxpayers: [],
      employer_taxpayers: [],
      others_taxpayers: [],
      employer: null,
      spouse: null,
      others: [],
      relationships: ["Officemate", "Siblings"],
      formItemLayout: {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 18
        }
      }
    };
  },
  methods: {
    connect() {},
    skip() {},
    addTaxpayer() {
      this.others.push({
        relationship: "",
        tin: ""
      });
    },
    removeTaxpayer(i) {
      this.others.splice(i, 1);
    },
    handleSearch(value, field) {
      if (value.length >= 12) {
        this.getDataByTIN(value, field);
      }
    },
    handleChange(value, field, index) {
      if (field === "others") {
        this.others[index].tin = value;
      } else this[field] = value;
      this.getDataByTIN(value, field);
    },
    getDataByTIN(tin, field) {
      this[`loading_${field}`] = true;
      this.$store
        .dispatch("SEARCH_TAXPAYER", tin)
        .then(data => {
          console.log("data :", data);
          this[`loading_${field}`] = false;
          this[`${field}_taxpayers`] = data && data.length ? data : [{ tin }];
        })
        .catch(err => {
          this[`loading_${field}`] = false;
          console.log("err :", err);
        });
    }
  }
};
</script>

<style>
</style>