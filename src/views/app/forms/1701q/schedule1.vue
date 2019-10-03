<template>
  <div>
    <a-modal
      title="Schedule I – For Graduated IT Rate"
      :visible="show"
      @cancel="$emit('close')"
      @ok="handleOk"
    >
      <a-form-item label="36. Sales/Revenues/Receipts/Fees"></a-form-item>
      <a-form-item class="computation-item" label="A)Taxpayer/Filer">
        <a-input-number
          style="width: 100%"
          placeholder="(net of sales returns, allowances and discounts)"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="B)Spouse">
        <a-input-number
          style="width: 100%"
          placeholder="(net of sales returns, allowances and discounts)"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="37. Less: Cost of Sales/Services"></a-form-item>
      <a-form-item class="computation-item" label="A)Taxpayer/Filer">
        <a-input-number
          style="width: 100%"
          placeholder="(applicable only if availing Itemized Deductions)"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="B)Spouse">
        <a-input-number
          style="width: 100%"
          placeholder="(applicable only if availing Itemized Deductions)"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="38. Gross Income/(Loss) from Operation (Item 36 Less Item 37)"></a-form-item>
      <a-form-item class="computation-item" label="A)Taxpayer/Filer">
        <a-input-number style="width: 100%" placeholder="Less: Allowable Deductions"></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="B)Spouse">
        <a-input-number style="width: 100%" placeholder="Less: Allowable Deductions"></a-input-number>
      </a-form-item>
      <a-form-item label="39. Total Allowable Itemized Deductions "></a-form-item>
      <a-form-item class="computation-item" label="A)Taxpayer/Filer">
        <a-input-number style="width: 100%" placeholder="Total Allowable Itemized Deductions "></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="B)Spouse">
        <a-input-number style="width: 100%" placeholder="Total Allowable Itemized Deductions"></a-input-number>
      </a-form-item>
      <a-form-item label="40. Optional Standard Deduction (OSD) (40% of Item 36)"></a-form-item>
      <a-form-item class="computation-item" label="A)Taxpayer/Filer">
        <a-input-number style="width: 100%"></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="B)Spouse">
        <a-input-number style="width: 100%"></a-input-number>
      </a-form-item>
      <a-form-item label="41. Net Income/(Loss) This Quarter "></a-form-item>
      <a-form-item class="computation-item" label="A)Taxpayer/Filer">
        <a-input-number
          style="width: 100%"
          placeholder="(If Itemized: Item 38 Less Item 39; If OSD: Item 38 Less Item 40)"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="B)Spouse">
        <a-input-number
          style="width: 100%"
          placeholder="(If Itemized: Item 38 Less Item 39; If OSD: Item 38 Less Item 40)"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="42. Taxable Income/(Loss) Previous Quarter/s"></a-form-item>
      <a-form-item class="computation-item" label="A)Taxpayer/Filer">
        <a-input-number style="width: 100%" placeholder="Taxable Income/(Loss) Previous Quarter/s"></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="B)Spouse">
        <a-input-number style="width: 100%" placeholder="Taxable Income/(Loss) Previous Quarter/s"></a-input-number>
      </a-form-item>
      <a-form-item label="43. Non-Operating Income (specify)"></a-form-item>
      <a-form-item class="computation-item" label="A)Taxpayer/Filer">
        <a-input-number style="width: 100%"></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="B)Spouse">
        <a-input-number style="width: 100%"></a-input-number>
      </a-form-item>
      <a-form-item label="44. Amount Received/Share in Income by a (GPP)"></a-form-item>
      <a-form-item class="computation-item" label="A)Taxpayer/Filer">
        <a-input-number
          style="width: 100%"
          placeholder="Partner from General Professional Partnership (GPP)"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="B)Spouse">
        <a-input-number
          style="width: 100%"
          placeholder="Partner from General Professional Partnership (GPP)"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="45. Total Taxable Income/(Loss) To Date"></a-form-item>
      <a-form-item class="computation-item" label="A)Taxpayer/Filer">
        <a-input-number style="width: 100%" placeholder="(Sum of Items 41 to 44)"></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="B)Spouse">
        <a-input-number style="width: 100%" placeholder="(Sum of Items 41 to 44)"></a-input-number>
      </a-form-item>
      <a-form-item label="46. TAX DUE"></a-form-item>
      <a-form-item class="computation-item" label="A)Taxpayer/Filer">
        <a-input-number
          style="width: 100%"
          placeholder="(Item 45 x Applicable Tax Rate based on Tax Table below)(To Part III, Item 26)"
        ></a-input-number>
      </a-form-item>
      <a-form-item class="computation-item" label="B)Spouse">
        <a-input-number
          style="width: 100%"
          placeholder="(Item 45 x Applicable Tax Rate based on Tax Table below)(To Part III, Item 26)"
        ></a-input-number>
      </a-form-item>
    </a-modal>
  </div>
</template>
<script>
export default {
  props: ["show"],
  data() {
    return {
      visible: true
    };
  },
  created() {
    console.log("show sched 1: " + this.show);
    this.visible = this.show;
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.show = 0;
      this.visible = false;
    }
  }
};
</script>
