<template>
  <a-row type="flex" justify="center" :gutter="8">
    <a-col :span="10">
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
            <p>Lorem ipsum dolor sit amet labore et dolore magna aliqua.</p>
            <a>Learn More</a>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
    <a-col :span="10">
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
            <p>Lorem ipsum dolor sit amet labore et dolore magna aliqua.</p>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
    <a-col :span="10">
      <a-card>
        <a-row type="flex" align="middle" :gutter="8">
          <a-col :span="8">
            <a-avatar
              class="avatar_btn"
              shape="square"
              :size="60"
              style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);"
            >WT</a-avatar>
          </a-col>
          <a-col :span="16">
            <h4>Withholding Tax</h4>
            <p>Lorem ipsum dolor sit amet labore et dolore magna aliqua.</p>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
    <a-col :span="10">
      <a-card>
        <a-row type="flex" align="middle" :gutter="8">
          <a-col :span="8">
            <a-avatar
              class="avatar_btn"
              shape="square"
              :size="60"
              style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);"
            >PT</a-avatar>
          </a-col>
          <a-col :span="16">
            <h4>Percentage Tax</h4>
            <p>Lorem ipsum dolor sit amet labore et dolore magna aliqua.</p>
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
      if (e.key) this.$router.replace(`../${e.key}`);
    }
  }
};
</script>

<style>
</style>