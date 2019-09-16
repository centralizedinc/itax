<template>
  <div>
    <a-form :form="form">
      <a-divider>
        <b>Withholding Tax Declaration (1601E)</b>
      </a-divider>
      <a-form-item
        label="1. For the month of (MM/YYYY)"
      >
        <a-month-picker v-decorator="['date_month']" />
      </a-form-item>
      <a-form-item label="2. Amended Return">
        <a-radio-group v-decorator="['ammended']" :defaultValue="false">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="3. No. of Sheets Attached">
        <a-input-number v-decorator="['no_sheets']" :defaultValue="0"></a-input-number>
      </a-form-item>
      <a-form-item label="4. Any Taxes Witheld?">
        <a-radio-group v-decorator="['withheld']" :defaultValue="false">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>

    <!-- Part I -->
    <a-form :form="form_part1">
      <a-divider orientation="left">
        <b>Part I: Background Information</b>
      </a-divider>
      <a-form-item label="5. TIN NUMBER">
        <a-input v-decorator="['tin']"></a-input>
      </a-form-item>
      <a-form-item label="6. RDO Code">
        <a-input v-decorator="['rdo_code']"></a-input>
      </a-form-item>
      <a-form-item label="7. Line of Business/Occupation">
        <a-input v-decorator="['line_business']"></a-input>
      </a-form-item>
      <a-form-item
        label="8. Withholding Agent's Name/Registered Name"
      >
        <a-input v-decorator="['taxpayer_name']"></a-input>
      </a-form-item>
      <a-form-item label="9. Telephone Number">
        <a-input-number v-decorator="['telephone_no']"></a-input-number>
      </a-form-item>
      <a-form-item label="10. Registered Address">
        <a-textarea v-decorator="['registered_address']"></a-textarea>
      </a-form-item>
      <a-form-item label="11. Zip Code">
        <a-input-number v-decorator="['zip_code']"></a-input-number>
      </a-form-item>
      <a-form-item label="12. Category of Withholding Agent">
        <a-radio-group v-decorator="['category']" :defaultValue="false">
          <a-radio :value="true">Private</a-radio>
          <a-radio :value="false">Government</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="13. Are you availing of tax relief under Special Law or International Tax Treaty?"
      >
        <a-radio-group v-decorator="['availing_tax_relief']" :defaultValue="false">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="If yes, specify">
        <a-input v-decorator="['specify_availing_tax_relief']"></a-input>
      </a-form-item>
    </a-form>

    <!-- Part II -->
    <a-form :form="form_part2">
      <a-divider orientation="left">
        <b>Part II: Computation of Tax</b>
      </a-divider>
      <a-form-item
        class="computation-item"
        label="14. Total Tax Required to be Withheld and Remitted"
      >
        <a-input-number
          v-decorator="['item14']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="15. Less: Tax Credits/Payments"></a-form-item>
      <a-form-item
        class="computation-item"
        label="15A. Tax Remitted in Return Previously Filed, if this is an Amended Return"
      >
        <a-input-number
          v-decorator="['item15a']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
        <a-form-item
        class="computation-item"
        label="15B. Advance Payments Made(please attach proof of payments - BIR Form No. 0605)"
      >
        <a-input-number
          v-decorator="['item15b']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="15C. Total Tax Credits/Payments(Sum of Items 15A&15b)"
      >
        <a-input-number
          v-decorator="['item15c']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="16. Tax Still Due/(Overremittance)(Sum of Items 15A&15B)"
      >
        <a-input-number
          v-decorator="['item16']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="17. Add: Penalties"></a-form-item>
      <a-form-item
        class="computation-item"
        label="17A. Surcharge"
      >
        <a-input-number
          v-decorator="['item17a']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="17B. Interest"
      >
        <a-input-number
          v-decorator="['item17b']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="17C. Compromise"
      >
        <a-input-number
          v-decorator="['item17c']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="17D"
      >
        <a-input-number
          v-decorator="['item17d']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="18. Total Amount Still Due/(Overremittance)(Sum of Items 16&17D)"
      >
        <a-input-number
          v-decorator="['item18']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="if overremittance, mark one box only:">
        <a-radio-group v-decorator="['overremittance']" :defaultValue="false">
          <a-radio :value="true">To be Refunded</a-radio>
          <a-radio :value="false">To be issued a Tax Credit Certificate</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>

    <!-- Part III -->
    <a-form :form="form_part3">
      <a-divider orientation="left">
        <b>Part III: Details of Payment</b>
      </a-divider>
      <a-form-item
        class="computation-item"
        label="21. Cash/Bank Debit Memo"
      >
        <a-input-number
          v-decorator="['item21']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="22. Check"></a-form-item>
      <a-form-item
        class="computation-item"
        label="22A"
      >
        <a-input-number
          v-decorator="['item21a']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="22B"
      >
        <a-input-number
          v-decorator="['item22b']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="22C"
      >
        <a-input-number
          v-decorator="['item22c']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="22D.">
        <a-input-number
          v-decorator="['item22d']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="23. Others"></a-form-item>
      <a-form-item class="computation-item" label="23A.">
        <a-input-number
          v-decorator="['item23a']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="23B"
      >
        <a-input-number
          v-decorator="['item23b']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="23C"
      >
        <a-input-number
          v-decorator="['item23c']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-form-item
        class="computation-item"
        label="23D"
      >
        <a-input-number
          v-decorator="['item23d']"
          :formatter="value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        ></a-input-number>
      </a-form-item>
      <a-button type="primary" block @click="submit">Submit</a-button>
    </a-form>
  </div>
</template>

<script>
import form_1601e_image from '@/assets/forms/1601e.jpg';

export default {
  data() {
    return {
      form_1601e_image,
      form: this.$form.createForm(this),
      form_part1: this.$form.createForm(this),
      form_part2: this.$form.createForm(this),
      form_part3: this.$form.createForm(this),
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