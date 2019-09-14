<template>

    <a-row>
        <a-col :span="14">
            <a-card>
            <a-row type="flex" align="middle" :gutter="8">
              <a-col :span="8">
                  <a-avatar shape="square" :size="60" style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);">
                        <a-icon style="font-size:24px" type="plus"></a-icon>
                    </a-avatar>
              </a-col>
              <a-col :span="16">
                  <h4>Add New Taxpayer</h4>
                  <p>Lorem ipsum dolor sit amet labore et dolore magna aliqua.</p>
              </a-col>
            </a-row>
            </a-card>
        </a-col>
        <a-col :span="14">
            <a-card>
            <a-row type="flex" align="middle" :gutter="8">
              <a-col :span="8">
                  <a-avatar shape="square" :size="60" style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);">
                        <a-icon style="font-size:24px" type="upload"></a-icon>
                    </a-avatar>
              </a-col>
              <a-col :span="16">
                  <h4>Upload Taxpayer</h4>
                  <p>Lorem ipsum dolor sit amet labore et dolore magna aliqua.</p>
              </a-col>
            </a-row>
            </a-card>
        </a-col>
        <a-col :span="14">
            <a-card>
            <a-row type="flex" align="middle" :gutter="8">
              <a-col :span="8">
                  <a-avatar shape="square" :size="60" style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);">
                        <a-icon style="font-size:24px" type="search"></a-icon>
                    </a-avatar>
              </a-col>
              <a-col :span="16">
                  <h4>Import Taxpayer</h4>
                  <p>Lorem ipsum dolor sit amet labore et dolore magna aliqua.</p>
              </a-col>
            </a-row>
            </a-card>
        </a-col>
        <a-divider></a-divider>
        <a-col :push="12" :span="12">
          <a-input-search
            placeholder="Search"
            @search="onSearch"
          />
      </a-col>
      <a-col :span="24">
          <p>My Taxpayer Vault</p>
          <a-divider></a-divider>
          <a-table :columns="cols"></a-table>
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
                },
                {
                    title: 'TIN',
                    dataIndex: 'tin'
                },
                {
                    title: 'Classification',
                    dataIndex: 'classification'
                },
                {
                    title: 'RDO',
                    dataIndex: 'rdo'
                }
            ]

        }
        
    }

}
</script>

<style>

</style>