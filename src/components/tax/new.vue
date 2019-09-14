<template>
  <a-row type="flex" justify="center" :gutter="8">
        <a-col :span="10">
            <a-card>
            <a-row type="flex" align="middle" :gutter="8">
              <a-col :span="8">
                  <a-avatar shape="square" :size="60" style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);">
                        IT
                    </a-avatar>
              </a-col>
              <a-col :span="16">
                  <h4>Income Tax</h4>
                  <p>Lorem ipsum dolor sit amet labore et dolore magna aliqua.</p>
              </a-col>
            </a-row>
            </a-card>
        </a-col>
        <a-col :span="10">
            <a-card>
            <a-row type="flex" align="middle" :gutter="8">
              <a-col :span="8">
                  <a-avatar shape="square" :size="60" style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);">
                        VT
                    </a-avatar>
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
                  <a-avatar shape="square" :size="60" style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);">
                        WT
                    </a-avatar>
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
                  <a-avatar shape="square" :size="60" style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);">
                        PT
                    </a-avatar>
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
  data(){
    return{
      cols:[
        {
          title: 'Name',
          dataIndex: 'name',
          sorter: true
        }
      ]
    }
  }

}
</script>

<style>

</style>