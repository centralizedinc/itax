<template>
  <a-drawer
    title="Schedule 2 Purchase/Importation of Capital Goods (Aggregate Amount Not Exceeding ₱1Million)"
    placement="right"
    :closable="true"
    @close="close"
    :visible="show"
    width="500"
  >
    <a-table bordered :dataSource="sched2_data" :columns="columns_sched2">
      <template slot="date_purchased" slot-scope="text, record, index">
        <a-date-picker
          v-model="sched2_data[index].date_purchased"
          @change="check_sched2"
          style="width: 100%"
        />
      </template>
      <template slot="description" slot-scope="text, record, index">
        <a-input v-model="sched2_data[index].description"></a-input>
      </template>
      <template slot="vat" slot-scope="text, record, index">
        <a-input-number
          v-model="sched2_data[index].vat"
          @change="sched2Compute"
        ></a-input-number>
      </template>
      <template slot="tax" slot-scope="text, record, index">
        <a-input-number
          disabled
          v-model="sched2_data[index].tax"  @change="sched2Compute"
        ></a-input-number>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <a-popconfirm
          v-if="sched2_data.length"
          title="Sure to delete?"
          @confirm="() => delete_sched2(index)"
        >
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
      <template slot="footer">
        <a-button @click="addSched2">Add</a-button>
        <a-button>Save</a-button>
        <p align="right">
          18A: {{ form.purCapGoodsNotExceed }} 18B:
          {{ form.outputCapGoodsNotExceed }}
        </p>
      </template>
    </a-table>
  </a-drawer>
</template>

<script>
export default {
  props: ["show", "form"],
  data() {
    return {
      columns_sched2: [
        {
          title: "Date Purchased",
          dataIndex: "date_purchased",
          scopedSlots: { customRender: "date_purchased" }
        },
        {
          title: "Description",
          dataIndex: "description",
          scopedSlots: { customRender: "description" }
        },
        {
          title: "Amount (Net of VAT)",
          dataIndex: "vat",
          scopedSlots: { customRender: "vat" }
        },
        {
          title: "Input Tax",
          dataIndex: "tax",
          scopedSlots: { customRender: "tax" }
        },
        {
          title: "",
          dataIndex: "operation",
          scopedSlots: { cutomRender: "operation" }
        }
      ],
      sched2_data: [],
      data_source: []
    };
  },
  created() {
    console.log("Open Schedule 2 :::", JSON.stringify(this.form.sched2));
    // if(this.form.sched1){
    //   this.data_source = this.deepCopy(this.form.sched1);
    // }else{
    //   this.data_source = [{}]
    // }
  },
  computed: {
    total_atc_amount() {
      var total = 0;
      if (this.data_source && this.data_source.length)
        total = this.data_source.map(v => v.amount).reduce((t, v) => t + v);
      return total;
    },
    total_atc_output_tax() {
      var total = 0;
      if (this.data_source && this.data_source.length)
        total = this.data_source.map(v => v.output_tax).reduce((t, v) => t + v);
      return total;
    }
  },
  methods: {
    sched2Save() {},
    delete_sched2(index) {
      this.sched2_data[index].splice(index, 1);
    },
    check_sched2(value) {
      var only = this.formatDtMonth(this.form.return_period);
      var picked = this.formatDtMonth(value);
      console.log("check sched2: " + value);
      if (picked !== only) {
        console.log("please choose base on return period");
      }
    },
    addSched2() {
      console.log("add sched2 date of return: " + this.sched2_data);

      if (this.sched2_data == false) {
        console.log("sched 2 data fnun");
        this.sched2_data.push({
          date_purchased: "",
          description: "",
          vat: 0,
          tax: 0
        });
      } else {
        var index = this.sched2_data.length - 1;
        console.log("last index sched2_data: " + index);
        if (
          this.sched2_data[index].date_purchased == "" ||
          this.sched2_data[index].description == "" ||
          this.sched2_data[index].tax <= 0 ||
          this.sched2_data[index].vat <= 0
        ) {
          console.log("please fill up all blank");
        } else {
          console.log("pushed");
          this.sched2_data.push({
            date_purchased: "",
            description: "",
            vat: 0,
            tax: 0
          });
        }
      }
    },
    sched2Compute(value) {
      var index = this.sched2_data.length - 1;
      this.form.purCapGoodsNotExceed = 0;
      this.form.outputCapGoodsNotExceed = 0;
      this.sched2_data[index].tax = value * 0.12;
      this.sched2_data.forEach(data => {
        this.form.purCapGoodsNotExceed += data.vat;
        this.form.outputCapGoodsNotExceed += data.tax;
      });
    },
    onClose_sched2() {
      this.show_sched2 = false;
    },
    close() {
      this.$emit("close", {
        sched2: this.deepCopy(this.data_source),
        totalAtcAmount: this.deepCopy(this.total_atc_amount),
        totalAtcOutput: this.deepCopy(this.total_atc_output_tax)
      });
    },
    showDrawer2() {
      console.log("data source show drawer; " + this.dataSource);
      this.show_sched2 = true;
    }
  }
};
</script>

<style></style>
