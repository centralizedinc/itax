<template>
  <div>
    <a-form :form="form">
      <a-divider>
        <b>Monthly Value-Added Tax Declaration (2550m)</b>
      </a-divider>
      <a-form-item
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 16 }"
        label="1. For the month of (MM/YYYY)"
      >
        <a-month-picker v-decorator="['date_month']" />
      </a-form-item>
      <a-form-item label="2. Ammended Return" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
        <a-radio-group v-decorator="['ammended']" :defaultValue="false">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="3. Number of Sheets" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
        <a-input-number v-decorator="['no_sheets']" :defaultValue="0"></a-input-number>
      </a-form-item>
    </a-form>

    <!-- Part I -->
    <a-form :form="form_part1">
      <a-divider orientation="left">
        Part I:
        <b>Background Information</b>
      </a-divider>
      <a-form-item label="4. TIN" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
        <a-input v-decorator="['tin']"></a-input>
      </a-form-item>
      <a-form-item label="5. RDO Code" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
        <a-input v-decorator="['rdo_code']"></a-input>
      </a-form-item>
      <a-form-item label="6. Line of Business" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
        <a-input v-decorator="['line_business']"></a-input>
      </a-form-item>
      <a-form-item
        label="7. Taxpayer/Registered Name"
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 16 }"
      >
        <a-input v-decorator="['taxpayer_name']"></a-input>
      </a-form-item>
      <a-form-item label="8. Telephone Number" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
        <a-input-number v-decorator="['telephone_no']"></a-input-number>
      </a-form-item>
      <a-form-item label="9. Registered Address" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
        <a-textarea v-decorator="['registered_address']"></a-textarea>
      </a-form-item>
      <a-form-item label="10. Zip Code" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
        <a-input-number v-decorator="['zip_code']"></a-input-number>
      </a-form-item>
      <a-form-item
        label="11. Are you availing of tax relief under Special Law or International Tax Treaty?"
        :labelCol="{ span: 19 }"
        :wrapperCol="{ span: 5 }"
      >
        <a-radio-group v-decorator="['availing_tax_relief']" :defaultValue="false">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="If yes, specify" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
        <a-input v-decorator="['specify_availing_tax_relief']"></a-input>
      </a-form-item>
    </a-form>

    <!-- Part II -->
    <a-form :form="form_part2">
      <a-divider orientation="left">
        Part II:
        <b>Computation of Tax</b>
      </a-divider>
      <a-form-item label="12. Vatable Sales/Receipt-Private (Sch. 1)"></a-form-item>
      <a-form-item
        class="computation-item"
        label="12A. Sales/Receipt for the Month"
        :labelCol="{ span: 10 }"
      >
        <a-input-number
          v-decorator="['item12a']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="12B. Output Tax Due for the Month"
        :labelCol="{ span: 10 }"
      >
        <a-input-number
          v-decorator="['item12b']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="13. Sales to Government"></a-form-item>
      <a-form-item
        class="computation-item"
        label="13A. Sales/Receipt for the Month"
        :labelCol="{ span: 10 }"
      >
        <a-input-number
          v-decorator="['item13a']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="13B. Output Tax Due for the Month"
        :labelCol="{ span: 10 }"
      >
        <a-input-number
          v-decorator="['item13b']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="14. Zero Rated Sales/Receipts"></a-form-item>
      <a-form-item
        class="computation-item"
        label="14. Sales/Receipt for the Month"
        :labelCol="{ span: 10 }"
      >
        <a-input-number
          v-decorator="['item14']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="15. Exempt Sales/Receipts"></a-form-item>
      <a-form-item
        class="computation-item"
        label="15. Sales/Receipt for the Month"
        :labelCol="{ span: 10 }"
      >
        <a-input-number
          v-decorator="['item15']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="16. Total Sales/Receipts and Output Tax Due"></a-form-item>
      <a-form-item
        class="computation-item"
        label="16A. Sales/Receipt for the Month"
        :labelCol="{ span: 10 }"
      >
        <a-input-number
          v-decorator="['item16a']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="16B. Output Tax Due for the Month"
        :labelCol="{ span: 10 }"
      >
        <a-input-number
          v-decorator="['item16b']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="17. Less: Allowable Input Tax (Output Tax Due)"></a-form-item>
      <a-form-item
        class="computation-item"
        label="17A. Input Tax Carried Over from Previous Period"
        :labelCol="{ span: 24 }"
        :wrapperCol="{ span: 8 }"
      >
        <a-input-number
          v-decorator="['item17a']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="17B. Input Tax Deferred on Capital Goods Exceeding ₱1Million from Previous Period"
        :labelCol="{ span: 24 }"
        :wrapperCol="{ span: 8 }"
      >
        <a-input-number
          v-decorator="['item17b']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="17C. Transitional Input Tax"
        :labelCol="{ span: 10 }"
      >
        <a-input-number
          v-decorator="['item17c']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="17D. Presumptive Input Tax"
        :labelCol="{ span: 10 }"
      >
        <a-input-number
          v-decorator="['item17d']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="17E. Others" :labelCol="{ span: 10 }">
        <a-input-number
          v-decorator="['item17e']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="17F. Total" :labelCol="{ span: 10 }">
        <a-input-number
          v-decorator="['item17f']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-form-item label="17. Less: Allowable Input Tax (Output Tax Due)"></a-form-item>
      <a-form-item
        class="computation-item"
        label="17A. Input Tax Carried Over from Previous Period"
        :labelCol="{ span: 24 }"
        :wrapperCol="{ span: 8 }"
      >
        <a-input-number
          v-decorator="['item17a']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="17B. Input Tax Deferred on Capital Goods Exceeding ₱1Million from Previous Period"
        :labelCol="{ span: 24 }"
        :wrapperCol="{ span: 8 }"
      >
        <a-input-number
          v-decorator="['item17b']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="17C. Transitional Input Tax"
        :labelCol="{ span: 10 }"
      >
        <a-input-number
          v-decorator="['item17c']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="17D. Presumptive Input Tax"
        :labelCol="{ span: 10 }"
      >
        <a-input-number
          v-decorator="['item17d']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="17E. Others" :labelCol="{ span: 10 }">
        <a-input-number
          v-decorator="['item17e']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="17F. Total" :labelCol="{ span: 10 }">
        <a-input-number
          v-decorator="['item17f']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>

      <a-button type="primary" block @click="submit">Submit</a-button>
    </a-form>
  </div>
</template>

<script>
import form_2550m_image from "@/assets/forms/2550M.jpeg";

export default {
  data() {
    return {
      form_2550m_image,
      form: this.$form.createForm(this),
      form_part1: this.$form.createForm(this),
      form_part2: this.$form.createForm(this),
      image_height: 1000
    };
  },
  methods: {
    submit() {
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) console.log("values :", values);
      });
    }
  },
  created() {
    console.log("this.$ref.container.height :", this.$refs);
    console.log("test :", this.$refs.container.height);
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style>
/* .tax-form .computation-item {
  padding-left: 50px;
}

.tax-form .computation-item .ant-input-number {
  width: 40vh;
} */
</style>