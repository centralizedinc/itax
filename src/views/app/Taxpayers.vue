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
                  <a-list itemLayout="horizontal" :dataSource="taxpayers" :loading="loading">
                        <a-list-item slot="renderItem" slot-scope="item, index">
                            <!-- <a-card> -->
                            <a slot="actions">edit</a>
                            <a slot="actions">view</a>
                        <a-list-item-meta>
                            
                            <p slot="title" >{{item.taxpayer_type=='I'?`${item.individual_details.lastName}, ${item.individual_details.firstName} ${item.individual_details.middleName}`:'item.corporate_details.registeredName'}}</p>
                            <template slot="description" >
                                <p>{{item.tin}}</p>
                                <p>{{item.taxpayer_type=='I'?'Individual':'Non-Individual'}}</p>
                            </template>
                            <a-avatar style="border: solid 1px #1cb5e0" slot="avatar" :src="item.avatar" :size="64" />
                        </a-list-item-meta>
                        <!-- </a-card> -->
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
            this.$http.get('/taxpayer/all')
            .then(result=>{
                this.loading = false;
                console.log('result', JSON.stringify(result))
                this.taxpayers = result.data.data
            })
            .catch(err=>{
                this.loading = false;
            })
            // this.taxpayers = this.$store.state.taxpayers.records
            

        }
    }


}
</script>

<style>

</style>