<template>
  <div>
    <a-drawer
      title="Schedule IV - Penalties"
      :visible="visible"
      :closable="false"
      @close="onClose"
      :width="720"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <a-form :form="form" layout="vertical" hideRequiredMark>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item style="margin-left: 103px;" label="A) Taxpayer/Filer"></a-form-item>
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="64."
            >
              <a-input-number
                v-model="form.sched4.taxpayer.surcharge"
                style="width:100%"
                placeholder="Surcharge"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item style="margin-left: 103px;" label="B) Spouse"></a-form-item>
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input-number
                v-model="form.sched4.spouse.surcharge"
                style="width:100%"
                placeholder="Surcharge"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="65."
            >
              <a-input-number
                v-model="form.sched4.taxpayer.interest"
                style="width:100%"
                placeholder="Interest"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input-number
                v-model="form.sched4.spouse.interest"
                placeholder="Interest"
                style="width:100%"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="66."
            >
              <a-input-number
                v-model="form.sched4.taxpayer.compromise"
                style="width:100%"
                placeholder="Compromise"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input-number
                style="width:100%"
                v-model="form.sched4.spouse.compromise"
                placeholder="Compromise"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="67."
            >
              <a-input-number
                style="width:100%"
                :value="penalties()"
                placeholder="Total Penalties (Sum of Items 64 to 66) (To Part III, Item 29)"
              ></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input-number
                style="width:100%"
                :value="spouse_penalties()"
                placeholder="Total Penalties (Sum of Items 64 to 67) (To Part III, Item 30)"
              ></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :labelCol="form_layout.label_col"
              :wrapperCol="form_layout.wrapper_col"
              label="68."
            >
              <a-input
                placeholder="Total Amount Payable/(Overpayment) (Sum of Items 63 and 67) (To Part III, Item 30)"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :labelCol="form_layout.label_col" :wrapperCol="form_layout.wrapper_col">
              <a-input
                placeholder="Total Amount Payable/(Overpayment) (Sum of Items 63 and 67) (To Part III, Item 30)"
              />
            </a-form-item>
          </a-col>
        </a-row>-->
      </a-form>
      <div
        :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }"
      >
        <!-- <a-button :style="{marginRight: '8px'}" @click="handleOk">Cancel</a-button>
        <a-button @click="handleOk" type="primary">Submit</a-button>-->
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  props: ["form", "show"],
  data() {
    return {
      visible: true,
      formatter: {
        amount: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      parser: {
        amount: value => value.replace(/\₱\s?|(,*)/g, "")
      },
      form_layout: {
        label_col: { span: 2 },
        wrapper_col: { span: 22 }
      }
    };
  },
  created() {
    console.log("show sched 4: " + this.show);
    // this.visible = this.show;
  },
  watch: {
    show() {
      console.log("show watch!!: " + this.show);
      if (this.show == 4) {
        this.visible = true;
      }
      console.log("visible! : " + this.visible);
    }
  },
  methods: {
    onClose() {
      // this.visible = false;
      this.$emit("close");
    },
    penalties() {
      var total = this.computeSum([
        this.form.sched4.taxpayer.surcharge,
        this.form.sched4.taxpayer.interest,
        this.form.sched4.taxpayer.compromise
      ]);
      this.form.sched4.taxpayer.penalties = total;
      this.form.taxpayer_total_penalties = total;
      return total;
    },
    spouse_penalties() {
      var total = this.computeSum([
        this.form.sched4.spouse.surcharge,
        this.form.sched4.spouse.interest,
        this.form.sched4.spouse.compromise
      ]);
      this.form.sched4.spouse.penalties = total;
      this.form.spouse_total_penalties = total;
      return total;
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      // this.show = 0;
      this.visible = false;
    }
  }
};
</script>