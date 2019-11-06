<template>
  <div>
    <a-form :form="form_general" v-show="step===0">
      <a-divider>
        <b>Withholding Tax Declaration (1604c)</b>
      </a-divider>
      <a-form-item label="1." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-date-picker v-model="form.start_month" placeholder="Select Year" />
      </a-form-item>
      <a-form-item label="2. Amended Return">
        <a-radio-group v-model="form.amended_yn">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="3." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input-number
          style="width:100%"
          v-model="form.num_of_sheet"
          placeholder="No. of Sheets Attached"
        ></a-input-number>
      </a-form-item>
    </a-form>

    <!-- Part I -->
    <a-form :form="form_part1" v-show="step===1">
      <a-divider orientation="left">
        <b>Part I: Background Information</b>
      </a-divider>
      <!-- buyers tin -->
      <a-form-item label="4." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input
          style="100%"
          v-model="form.taxpayer.tin"
          placeholder="Taxpayer Identification Number (TIN)"
        ></a-input>
      </a-form-item>
      <a-form-item label="5." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.taxpayer.rdo_code" placeholder="RDO CODE"></a-input>
      </a-form-item>
      <a-form-item label="6." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.taxpayer.registered_name" placeholder="Registered Name"></a-input>
      </a-form-item>

      <a-form-item label="7." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-textarea
          style="100%"
          v-model="form.taxpayer.registered_address"
          placeholder="Registered Address"
        ></a-textarea>
      </a-form-item>
      <a-form-item label="7A" :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.taxpayer.zip_code" placeholder="ZIP Code"></a-input>
      </a-form-item>

      <a-form-item label="8. Category of Withholding Agent">
        <a-radio-group v-model="form.category_of_agent">
          <a-radio :value="true">Private</a-radio>
          <a-radio :value="false">Government</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="8A If Private, top withholding agent?">
        <a-radio-group v-model="form.top_withholding_agent">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="9." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.taxpayer.contact" placeholder="Contact Number"></a-input>
      </a-form-item>

      <a-form-item label="10." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.taxpayer.email" placeholder="Email Address"></a-input>
      </a-form-item>
      <a-form-item label="11. Adjustment">
        <a-radio-group v-model="form.is_refund_released">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>

        <a-form-item label="11A" :labelCol="{span:1}" :wrapperCol="{span:12}">
          <a-date-picker
            style="width:100%"
            v-model="form.date_of_refund"
            placeholder="If Yes specify the date of refund"
          />
        </a-form-item>
      </a-form-item>

      <a-form-item label="12." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-input style="100%" v-model="form.total_overremittance_amount" placeholder="Total Amount on Tax"></a-input>
      </a-form-item>

      <a-form-item label="13." :labelCol="{span:1}" :wrapperCol="{span:12}">
        <a-month-picker v-model="form.overremittance_first_crediting_month" />
      </a-form-item>
    </a-form>
    <!-- Part II -->
    <a-form :form="form_part1" v-show="step===2">
      <a-divider orientation="left">
        <b>Part II - Summary of Remittances per BIR Form N0. 1601-C</b>
      </a-divider>
      <a-button type="primary" @click="showDrawer">BIR Form N0. 1601-C</a-button>
      <a-drawer
        width="1200"
        title="Part II - Summary of Remittances per BIR Form N0. 1601-C"
        placement="right"
        :closable="false"
        @close="onClose"
        :visible="visible"
      >
        <a-table :dataSource="data" :columns="columns" :pagination="false">
          <template slot="date_of_remittance" slot-scope="text, record, index">
          <a-date-picker v-model="record.date_remittance" v-show="index<12"  />
          </template>
          <template slot="bank" slot-scope="text, record, index">
            <a-input type="text" v-show="index<12"></a-input>
          </template>
             <template slot="taxes" slot-scope="text, record, index">
            <a-input-number type="text" v-model="record.taxes" v-show="index<12" style="width:100%"></a-input-number>
          </template>
           <template slot="adjustment" slot-scope="text, record, index">
            <a-input-number type="text" v-model="record.adjustment"  v-show="index<12" style="width:100%"></a-input-number>
          </template>
           <template slot="penalties" slot-scope="text, record, index">
            <a-input-number type="text" v-model="record.penalties"  style="width:100%" v-show="index<12"></a-input-number>
          </template>
           <template slot="remitted" slot-scope="text, record, index">
            <a-input type="text" v-model="record.remitted"  :value="getTotalAmtRemit(index)" disabled ></a-input>
          </template>
        </a-table>
      </a-drawer>
      <!-- ok 36 -->
    </a-form>
  </div>
</template>

<script>
// import form_1606_image from "@/assets/forms/1606.jpg";

export default {
  props: ["form", "step"],
  data() {
    return {
      sub: false,
      // form_1606_image,
      form_general: this.$form.createForm(this),
      form_part1: this.$form.createForm(this),
      form_part2: this.$form.createForm(this),
      form_part3: this.$form.createForm(this),
      image_height: 1000,
      form_layout: {
        label_col: { span: 2 },
        wrapper_col: { span: 22 }
      },
      visible: false,
      columns: [
        {
          title: "Month",
          dataIndex: "month",
          key: "month",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "month" },
          width: "5%"
        },
        {
          title: "Date of Remittance (MM/DD/YYYY)",
          dataIndex: "date_of_remittance",
          key: "date_of_remittance",
          scopedSlots: { customRender: "date_of_remittance" },
          width: "15%"
        },
        {
          title: "Drawee Bank/ Bank Code/ Agency",
          dataIndex: "bank",
          key: "bank",
          scopedSlots: { customRender: "bank" },
          width: "15%"
        },
        {
          title: "Taxes Withheld",
          key: "taxes",
          dataIndex: "taxes",
          scopedSlots: { customRender: "taxes" },
          width: "15%"
        },
        {
          title: "Adjustment",
          key: "adjustment",
          dataIndex: "adjustment",
          scopedSlots: { customRender: "adjustment" },
          width: "15%"
        },
        {
          title: "Penalties",
          key: "penalties",
          dataIndex: "penalties",
          scopedSlots: { customRender: "penalties" },
          width: "15%"
        },
        {
          title: "Total Amount Remitted",
          key: "remitted",
          dataIndex: "remitted",
          scopedSlots: { customRender: "remitted" },
          width: "15%"
        }
      ],
      data: [
        {
          month: "January",
          bank: 0,
          taxes: 0,
          adjustment: 0,
          penalties: 0,
          remitted: 0
          
          
        },
        {
         month: "February",
         bank: 0,
          taxes: 0,
          adjustment: 0,
          penalties: 0,
          remitted: 0
        },
        {
          key: "3",
          month: "March",
          bank: 0,
          taxes: 0,
          adjustment: 0,
          penalties: 0,
          remitted: 0
        },
        {
          key: "4",
          month: "April",
         bank: 0,
          taxes: 0,
          adjustment: 0,
          penalties: 0,
          remitted: 0
        },
        {
          key: "5",
          month: "May",
          bank: 0,
          taxes: 0,
          adjustment: 0,
          penalties: 0,
          remitted: 0
        },
        {
          key: "6",
          month: "June",
         bank: 0,
          taxes: 0,
          adjustment: 0,
          penalties: 0,
          remitted: 0
        },
        {
          key: "7",
          month: "July",
          bank: 0,
          taxes: 0,
          adjustment: 0,
          penalties: 0,
          remitted: 0
        },
        {
          key: "8",
          month: "August",
         bank: 0,
          taxes: 0,
          adjustment: 0,
          penalties: 0,
          remitted: 0
        },
        {
          key: "9",
          month: "September",
         bank: 0,
          taxes: 0,
          adjustment: 0,
          penalties: 0,
          remitted: 0
        },
        {
          key: "10",
          month: "Octuber",
         bank: 0,
          taxes: 0,
          adjustment: 0,
          penalties: 0,
          remitted: 0
        },
        {
          key: "11",
          month: "November",
         bank: 0,
          taxes: 0,
          adjustment: 0,
          penalties: 0,
          remitted: 0
        },
        {
          key: "12",
          month: "December",
          bank: 0,
          taxes: 0,
          adjustment: 0,
          penalties: 0,
          remitted: 0
        },
        {
          key: "13",
          month: "Total",
         bank: 0,
          taxes: 0,
          adjustment: 0,
          penalties: 0,
          remitted: 0
        }
      ]
    };
  },
  watch: {
    form() {
      console.log(
        "created taxpayer data: " + JSON.stringify(this.form.taxpayer)
      );
    }
    // step() {
    //   if (this.step < 0) {
    //     this.$router.push("/");
    //   } else if (this.step == 2) {
    //     this.sub = true;
    //   }
    // }
  },
  methods: {
    save_draft() {},
    changeStep(step, form) {
      this.$emit("changeStep", step);
      this.$emit("updateForm", form);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
     getTotalAmtRemit(val) {
      var total = this.computeSum([
        this.data[val].taxes,
        this.data[val].adjustment,
        this.data[val].penalties
      ]);
      this.data[val].remitted = total;
      this.total()
     },

 total() {
      var total_tax_with = 0
      var total_adjust = 0
      var total_penalty = 0
      var total_remitted = 0
      for(var x = 0; x<12; x++){
         total_tax_with += this.data[x].taxes 
      total_adjust += this.data[x].adjustment
       total_penalty += this.data[x].penalties
       total_remitted += this.data[x].remitted
      }
      this.data[12].taxes = total_tax_with
      this.data[12].adjustment = total_adjust
      this.data[12].penalties = total_penalty
      this.data[12].remitted = total_remitted
     },


    validate() {
      this.changeStep(this.step + 1);
      // if(this.step === 0) this.validateGeneral();
      // else if(this.step === 1) this.validatePartI();
    },
    // validateGeneral() {
    //   this.loading = true;
    //   this.form_general.validateFieldsAndScroll((err, values) => {
    //     if (!err) {
    //       console.log("validateGeneral :", values);
    //       this.changeStep(1, values);
    //     }
    //     this.loading = false;
    //   });
    // },
    // validatePartI() {
    //   this.loading = true;
    //   this.form_part1.validateFieldsAndScroll((err, values) => {
    //     if (!err) {
    //       console.log("validatePartI :", values);
    //       this.changeStep(2, values);
    //     }
    //     this.loading = false;
    //   });
    // },
    // validatePartII() {
    //   this.loading = true;
    //   this.form_part2.validateFieldsAndScroll((err, values) => {
    //     if (!err) {
    //       console.log("validatePartII :", values);
    //       this.$emit("updateForm", values);
    //     } else this.loading = false;
    //   });
    // },
    submit() {
      this.loading = true;
      this.$store
        .dispatch("VALIDATE_AND_SAVE", {
          form_type: "1604c",
          form_details: this.form
        })
        .then(result => {
          console.log("VALIDATE_AND_SAVE result:", result.data);
          this.loading = false;
          this.$store.commit("REMOVE_DRAFT_FORM", this.$route.query.ref_no);
          this.$store.commit("NOTIFY_MESSAGE", {
            message: "Successfully submitted Form 1604c."
          });
          // window.opener.location.reload();
          window.close();
        })
        .catch(err => {
          console.log("VALIDATE_AND_SAVE", err);
          this.loading = false;
        });
    },
    save_draft() {},
    changeStep(step, form) {
      this.$emit("changeStep", step);
      this.$emit("updateForm", form);
    }
    // submit() {
    //   this.form.validateFieldsAndScroll((err, values) => {
    //     if (!err) console.log("values :", values);
    //   });
    // }
  },
  // watch: {
  //   form: {
  //     handler(val) {
  //       console.log("##### update 1606 ");
  //     },
  //     deep: true
  //   }
  // },
  created() {
    // console.log("this.$ref.container.height :", this.$refs);
    // console.log("test :", this.$refs.container.height);
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