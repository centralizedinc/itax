<template>
    <a-row type="flex" :gutter="8">
        <a-col :span="8">
            <a-card>
            <a-row type="flex" align="middle" :gutter="8">
              <a-col :span="8">
                  <a-avatar class="avatar_btn" @click="$router.push('/app/taxpayer/new')" shape="square" :size="60" style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);">
                        <a-icon style="font-size:24px" type="user-add"></a-icon>
                    </a-avatar>
              </a-col>
              <a-col :span="16">
                  <h4>Add New Taxpayer</h4>
                  <p>Lorem ipsum dolor sit amet labore et dolore magna aliqua.</p>
              </a-col>
            </a-row>
            </a-card>
        </a-col>
        <a-col :span="8">
            <a-card>
            <a-row type="flex" align="middle" :gutter="8">
              <a-col :span="8">
                  <a-avatar class="avatar_btn" @click="$router.push('/app/taxpayer/upload')"  shape="square" :size="60" style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);">
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
        <a-col :span="8">
            <a-card>
            <a-row type="flex" align="middle" :gutter="8">
              <a-col :span="8">
                  <a-avatar class="avatar_btn" @click="$router.push('/app/taxpayer/search')"  shape="square" :size="60" style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);">
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

        <a-col :span="24" style="margin-top: 2vh">
            <a-card>
                 <h3>My Taxpayer Vault</h3>
                 <a-divider></a-divider>
                 <!-- <a-table :dataSource="taxpayers" :columns="cols"></a-table> -->
                  <a-list itemLayout="horizontal" :dataSource="taxpayers" >
                        <a-list-item slot="renderItem" slot-scope="item, index">
                        <a-list-item-meta>
                            <p slot="title" >{{item.tin}}</p>
                            <template slot="description" >
                                <p>{{item.taxpayer_type}}</p>
                            </template>
                            <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        </a-list-item-meta>
                        </a-list-item>
                    </a-list>
            </a-card>
           
        </a-col>
          
          
        <!-- <a-col  :span="12">
          <a-input-search
            placeholder="Search"
            @search="onSearch"
          />
      </a-col>
      <a-col :span="24" style="margin-top: 2vh">          
          <a-table :columns="cols"></a-table>
      </a-col> -->
    </a-row>
</template>

<script>
export default {
    data(){
        return{
            loading:false,
            taxpayers:[],
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
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            this.loading = true;
            this.$http.get('/taxpayer')
            .then(result=>{
                this.loading = false;
                console.log('result', JSON.stringify(result))
                this.taxpayers = result.data.data
            })

        }
    }


}
</script>

<style>

</style>