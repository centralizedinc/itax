<template>
  <a-row type="flex" justify="center" :gutter="8">
    <a-col :span="12">
      <a-card>
        <a-row type="flex" align="middle" :gutter="8">
          <a-col :span="8">
            <a-popover title trigger="click" placement="right">
              <a-avatar
                class="avatar_btn"
                shape="square"
                :size="60"
                style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);"
              >IT</a-avatar>
              <template slot="content">
                <a-menu @click="nav">
                  <a-menu-item key="1700">From 1700</a-menu-item>
                  <a-menu-item key="1701">From 1701</a-menu-item>
                  <a-menu-item key="1701q">Form 1701Q</a-menu-item>
                  <a-menu-item key="1702">Form 1702</a-menu-item>
                  <a-menu-item key="1702q">Form 1702Q</a-menu-item>
                  <a-menu-item key="1702rt">Form 1702-RT</a-menu-item>
                </a-menu>
              </template>
            </a-popover>
          </a-col>
          <a-col :span="16">
            <h4>Income Tax</h4>
            <p>Income Tax is a tax on a person's income, emoluments, profits arising from property, practice of profession, conduct of trade or business or on the pertinent items of gross income specified in the Tax Code of 1997 (Tax Code), as amended, less the deductions if any, authorized for such types of income, by the Tax Code, as amended, or other special laws.</p>
            <a>Learn More</a>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
    <a-col :span="12">
      <a-card>
        <a-row type="flex" align="middle" :gutter="8">
          <a-col :span="8">
            <a-popover title trigger="click" placement="right">
              <a-avatar
                class="avatar_btn"
                shape="square"
                :size="60"
                style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);"
              >VT</a-avatar>
              <template slot="content">
                <a-menu @click="nav">
                  <a-menu-item key="2550m">From 2550M</a-menu-item>
                  <a-menu-item key="2550q">Form 2550Q</a-menu-item>
                </a-menu>
              </template>
            </a-popover>
          </a-col>
          <a-col :span="16">
            <h4>Value Added Tax</h4>
            <p>Value-Added Tax is a business tax imposed and collected from the seller in the course of trade or business on every sale of properties (real or personal) lease of goods or properties (real or personal) or vendors of services. It is an indirect tax, thus, it can be passed on to the buyer.</p>
            <a>Learn More</a>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
    <a-divider></a-divider>
    <a-col :span="12">
      <a-card>
        <a-row type="flex" align="middle" :gutter="8">
          <a-col :span="8">
            <a-popover title trigger="click" placement="right">
              <a-avatar
                class="avatar_btn"
                shape="square"
                :size="60"
                style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);"
              >VT</a-avatar>
              <template slot="content">
                <a-menu @click="nav">
                  <a-menu-item key="1601e">Form 1601E</a-menu-item>
                  <a-menu-item key="1601eq">Form 1601EQ</a-menu-item>
                </a-menu>
              </template>
            </a-popover>
          </a-col>
          <a-col :span="16">
            <h4>Withholding Tax</h4>
            <p>Lorem ipsum dolor sit amet labore et dolore magna aliqua.</p>
            <a>Learn More</a>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
    <a-col :span="12">
      <a-card>
        <a-row type="flex" align="middle" :gutter="8">
          <a-col :span="8">
            <a-popover title trigger="click" placement="right">
              <a-avatar
                class="avatar_btn"
                shape="square"
                :size="60"
                style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);"
              >PT</a-avatar>
              <template slot="content">
                <a-menu @click="nav">
                  <a-menu-item key="2551m">Form 2551m</a-menu-item>
                </a-menu>
              </template>
            </a-popover>
          </a-col>
          <a-col :span="16">
            <h4>Percentage Tax</h4>
            <p>Percentage Tax is a business tax imposed on persons or entities who sell or lease goods, properties or services in the course of trade or business whose gross annual sales or receipts do not exceed P550,000 and are not VAT-registered.</p>
            <a>Learn More</a>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
export default {
  data() {
    return {
      cols: [
        {
          title: "Name",
          dataIndex: "name",
          sorter: true
        }
      ]
    };
  },
  methods: {
    nav(e) {
      console.log("New filling tax :", e.key);
      if (e.key) {
        const ref_no = new Date().getTime().toString();
        this.$store.dispatch("ADD_DRAFT_FORM", {
          ref_no,
          form: e.key,
          taxpayer: "",
          created_date: new Date()
        });
        window.open(
          `http://localhost:8080/#/tax/form/${e.key}?ref_no=${ref_no}`
        );
        this.$emit("changeActiveKey", 1);
      }
    }
  }
};
</script>

<style>
</style>