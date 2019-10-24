<template>
  <div>
    <a-row type="flex" align="middle" :gutter="5" class="row-fields">
      <a-col :xs="{ span: 12 }" :md="{ span: 4  }" class="text-right">TIN:</a-col>
      <a-col :xs="{ span: 12 }" :md="{ span: 7  }">
        <a-input v-model="details.spouse_details.tin" placeholder="TIN" @blur="searchTin" />
      </a-col>
      <a-col :xs="{ span: 12 }" :md="{ span: 2  }" class="text-right">RDO:</a-col>
      <a-col :xs="{ span: 12 }" :md="{ span: 3  }">
        <a-select style="width: 100%" v-model="details.spouse_details.rdo_code">
          <a-select-option
            v-for="(item, index) in rdos"
            :key="index"
            :value="item.code"
          >{{item.code}}</a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="{ span: 12 }" :md="{ span: 4  }" class="text-right">Line of Business:</a-col>
      <a-col :xs="{ span: 12 }" :md="{ span: 4  }">
        <a-input v-model="details.spouse_details.line_of_business" placeholder="Line of Business" />
      </a-col>
    </a-row>

    <a-row type="flex" align="middle" :gutter="5" class="row-fields">
      <a-col :xs="{ span: 12 }" :md="{ span: 4 }" class="text-right">Filer Type:</a-col>
      <a-col :xs="{ span: 12 }" :md="{ span: 20 }">
        <a-radio-group buttonStyle="solid" v-model="details.spouse_details.filer_type">
          <a-radio-button value="sp">Single Proprietor</a-radio-button>
          <a-radio-button value="p">Professional</a-radio-button>
          <a-radio-button value="em">Employee</a-radio-button>
          <a-radio-button value="e">Estate</a-radio-button>
          <a-radio-button value="t">Trust</a-radio-button>
        </a-radio-group>
      </a-col>
    </a-row>

    <a-row type="flex" align="middle" :gutter="5" class="row-fields">
      <a-col :xs="{ span: 24 }" :md="{ span: 4 }" class="text-right">Spouse's Name:</a-col>
      <a-col :xs="{ span: 24 }" :md="{ span: 7 }">
        <a-input
          v-model="details.spouse_details.individual_details.firstName"
          placeholder="First Name"
        />
      </a-col>
      <a-col :xs="{ span: 24 }" :md="{ span: 6 }">
        <a-input
          v-model="details.spouse_details.individual_details.middleName"
          placeholder="Middle Name"
        />
      </a-col>
      <a-col :xs="{ span: 24 }" :md="{ span: 7 }">
        <a-input
          v-model="details.spouse_details.individual_details.lastName"
          placeholder="Last Name"
        />
      </a-col>
    </a-row>

    <a-row type="flex" align="middle" :gutter="5" class="row-fields">
      <a-col :span="4" class="text-right">Registered Name:</a-col>
      <a-col :span="20">
        <a-input v-model="details.spouse_details.registered_name" placeholder="Registered Name" />
      </a-col>
    </a-row>

    <a-row type="flex" align="middle" :gutter="5" class="row-fields">
      <a-col :xs="{ span: 12 }" :md="{ span: 4 }" class="text-right">Date of Birth:</a-col>
      <a-col :xs="{ span: 12 }" :md="{ span: 7 }">
        <a-date-picker
          style="width:100%"
          placeholder="Date of Birth"
          v-model="details.spouse_details.individual_details.birthDate"
        ></a-date-picker>
      </a-col>
      <a-col :xs="{ span: 12 }" :md="{ span: 2 }" class="text-right">Gender:</a-col>
      <a-col :xs="{ span: 12 }" :md="{ span: 4 }">
        <a-radio-group
          buttonStyle="solid"
          v-model="details.spouse_details.individual_details.gender"
        >
          <a-radio-button value="M">Male</a-radio-button>
          <a-radio-button value="F">Female</a-radio-button>
        </a-radio-group>
      </a-col>
      <a-col :xs="{ span: 12 }" :md="{ span: 3 }" class="text-right">Citizenship:</a-col>
      <a-col :xs="{ span: 12 }" :md="{ span: 4 }">
        <a-input
          v-model="details.spouse_details.individual_details.citizenship"
          placeholder="Citizenship"
        />
      </a-col>
    </a-row>

    <a-row type="flex" align="middle" :gutter="5" class="row-fields">
      <a-col :xs="{ span: 12 }" :md="{ span: 4 }" class="text-right">Email:</a-col>
      <a-col :xs="{ span: 12 }" :md="{ span: 7 }">
        <a-input v-model="details.spouse_details.contact_details.email" placeholder="Email" />
      </a-col>
      <a-col :xs="{ span: 12 }" :md="{ span: 2 }" class="text-right">Tel No:</a-col>
      <a-col :xs="{ span: 12 }" :md="{ span: 4 }">
        <a-input v-model="details.spouse_details.contact_details.telno" placeholder="Tel No" />
      </a-col>
      <a-col :xs="{ span: 12 }" :md="{ span: 3 }" class="text-right">Contact No:</a-col>
      <a-col :xs="{ span: 12 }" :md="{ span: 4 }">
        <a-input v-model="details.spouse_details.contact_details.mobile" placeholder="Contact No" />
      </a-col>
    </a-row>

    <a-row :gutter="5" class="row-fields">
      <a-col :span="4" class="text-right">Registered Address:</a-col>
      <a-col :span="20">
        <a-textarea
          :rows="3"
          placeholder="Registered Address"
          v-model="details.spouse_details.address"
        ></a-textarea>
      </a-col>
    </a-row>

    <a-row type="flex" align="middle" :gutter="5" class="row-fields">
      <a-col :xs="{ span: 12 }" :md="{ span: 4 }" class="text-right">Zip Code:</a-col>
      <a-col :xs="{ span: 12 }" :md="{ span: 4 }">
        <a-input v-model="details.spouse_details.address_details.zipCode" placeholder="Zip Code" />
      </a-col>
    </a-row>
    <a-button-group style="float: right">
      <a-button @click="$emit('previous', 1)" :disabled="loading">Previous</a-button>
      <a-button type="primary" @click="next" :loading="loading">Next</a-button>
    </a-button-group>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      default: () => {
        return {
          spouse_details: {
            individual_details: {},
            contact_details: {},
            address_details: {}
          }
        };
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    rdos() {
      return this.$store.state.tax_form.rdos;
    },
    registered_name() {
      return `${this.details.spouse_details.individual_details.firstName} ${this.details.spouse_details.individual_details.middleName} ${this.details.spouse_details.individual_details.lastName}`;
    },
    show_company() {
      return ["sp", "p", "em"].includes(this.details.taxpayer.filer_type);
    }
  },
  watch: {
    registered_name(val) {
      this.details.spouse_details.registered_name = val;
    }
  },
  data() {
    return {
      formItemLayout: {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 20
        }
      }
    };
  },
  methods: {
    searchTin() {
      console.log("search tin :", this.details.spouse_details.tin);
      this.$store
        .dispatch("SEARCH_TAXPAYER", this.details.spouse_details.tin)
        .then(result => {})
        .catch(err => {});
    },
    next() {
      var page = this.show_company ? 3 : 4;
      this.$emit("next", page);
    }
  }
};
</script>

<style>
.row-fields {
  margin-bottom: 3vh;
}

.text-right {
  text-align: right;
  font-weight: 700;
}
</style>