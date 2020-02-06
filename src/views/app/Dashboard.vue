<template>
<div>
  <a-row type="flex" :gutter="16">
    <!-- <a-col :span="24">
        <a-card style="background: linear-gradient(to right, #000046, #1cb5e0);">
            <h2 style="color: #FFFFFF">Welcome {{$store.state.account_session.user.name.first}}!</h2>
            <a-divider></a-divider>
            
        </a-card>
    </a-col> -->
    <a-col :span="8" style="margin-top:1vh" >
        <a-card style="min-height:250px">
            <a-row type="flex" align="middle" :gutter="24">
              <a-col :span="24" align="">
                  <span style="font-size:22px">Taxpayer</span>
              </a-col>
              <a-col :span="12" align="center">
                  <span style="font-size:22px;font-weight:bold">{{taxpayer_count.length}}</span>
              </a-col>
              <a-col :span="12">
                  <apexchart  type="bar" :options="chartOptions" :series="taxpayer_series" />
              </a-col>
            </a-row>  
            <a-divider></a-divider>  
            <span style="font-size:10px">The last taxpayer (TIN:{{formatTIN(taxpayer_count[taxpayer_count.length-1].tin)}}) you've registered was on {{formatDate(taxpayer_count[taxpayer_count.length-1].date_created)}}</span>        
        </a-card>          
    </a-col>
    <a-col :span="8" style="margin-top:1vh">
        <a-card style="min-height:250px">
            <a-row type="flex" align="middle" :gutter="24">
              <a-col :span="24" align="">
                  <span style="font-size:22px">Tax Returns</span>
              </a-col>
              <a-col :span="12" align="center">
                  <span style="font-size:22px;font-weight:bold">{{returns_count.length}}</span>
              </a-col>
              <a-col :span="12">
                  <apexchart  type="bar" :options="chartOptions" :series="returns_series" />
              </a-col>
            </a-row>     
            <a-divider></a-divider>  
            <span style="font-size:10px" v-if="!returns_count.length">No returns filed.
                <br/>
                This section displays the last tax return filed.
            </span>  
            <span style="font-size:10px" v-else>You have filed {{returns_count[0].form_type}} with ref# {{returns_count[0].reference_no}} last {{returns_count[0].date_created}}</span>         
        </a-card>        
    </a-col>
    <a-col :span="8" style="margin-top:1vh" >
        <a-card style="min-height:250px">
            <a-row type="flex" align="middle" :gutter="24">
              <a-col :span="24" align="">
                  <span style="font-size:22px">Payments</span>
              </a-col>
              <a-col :span="12" align="center">
                  <span style="font-size:20px;font-weight:bold">{{formatAmount(payments_count.total)}}</span>
              </a-col>
              <a-col :span="12">
                  <apexchart  type="bar" :options="chartOptions" :series="payments_series" />
              </a-col>
            </a-row>  
            <a-divider></a-divider> 
            <span style="font-size:10px" v-if="!payments_count.length">
                No payments made
                <br/>
                This will display the lastest payment made.
            </span>  
            <span style="font-size:10px" v-else>Last Payment with the amount of ₱{{formatAmount(payments_count[payments_count.length-1].amount_paid)}} was paid last {{formatDate(payments_count[payments_count.length-1].date_created)}}</span>          
        </a-card>        
    </a-col>
    <a-col :span="24" style="margin-top:1vh">
       <a-card
        
        style="box-shadow: 0px 0px 10px 2px #88888847"
        :headStyle="{'background-color': 'e6e6e6'}"
      >
      <span slot="title">
          <!-- <a-row>
            <a-col :span="12"></a-col>
          </a-row> -->
          <h3>Activity Feeds</h3>
          <span style="font-size:10px">All actvities you've done on SmartTax are listed in your feed.</span>          
      </span>
        <!-- <span slot="extra">
            <a-row type="flex" justify="end" align="bottom" style="margin-right: 2vh">
                <template v-if="!loading">
              <a-col :span="3" v-for="i in subscribers" :key="i.name" >
                  <a-badge status="success" :offset="[-10,3]">
                  <a-avatar style="border: solid 1px #1cb5e0" :src="i.avatar"></a-avatar>
                  </a-badge>
              </a-col>
              </template>
              <template v-else>
              <a-col :span="2" v-for="i in 4" :key="i" >
                  <a-skeleton active avatar :paragraph="{rows: 0}" :title="{width:0}" />
              </a-col>
              </template>
            </a-row>
        </span> -->
        <a-row type="flex" justify="end" >
            <!-- <a-col :span="2">
                <a-avatar
                    shape="square"
                    :size="60"
                    :src="$store.state.account_session.user && $store.state.account_session.user.avatar ? $store.state.account_session.user.avatar.location : null"
                    style="border: 1px solid #FFFFFF; cursor:pointer"
                    >{{$store.state.account_session.user && $store.state.account_session.user.name && $store.state.account_session.user.name.first ? $store.state.account_session.user.name.first[0] : '?'}}</a-avatar>
            </a-col>
          <a-col :span="22">
              <a-textarea rows="2" placeholder="Post something..."></a-textarea>
          </a-col>
          <a-col :span="6" style="margin-top:1vh" align="right">
              <a-button-group block>
                    <a-button type="primary" ghost icon="link">Attach</a-button>
                    <a-button icon="upload" type="primary">Post</a-button>
                </a-button-group>
          </a-col> -->
        </a-row>
        
       </a-card>
       
       <template v-if="!loading">
        <a-card v-for="item in feed" :key="item.content" style="margin-top:1vh; margin-bottom:1vh" >
            <a-comment 
                :author="item.created_by.display_name.toUpperCase()"
                
            >
            <template slot="avatar">
                <a-avatar shape="square" :src="item.created_by.avatar && item.created_by.avatar.location? item.created_by.avatar.location : null">
                    {{$store.state.account_session.user && $store.state.account_session.user.name && $store.state.account_session.user.name.first ? $store.state.account_session.user.name.first[0].toUpperCase() : ''}}{{$store.state.account_session.user && $store.state.account_session.user.name && $store.state.account_session.user.name.last ? $store.state.account_session.user.name.last[0].toUpperCase() : ''}}
                </a-avatar>
            </template>
                <!-- <template slot="actions">
                     <span>
                        <a-tooltip title="Like">
                        <a-icon type="like" :theme="action === 'liked' ? 'filled' : 'outlined'" @click="like" />
                        </a-tooltip>
                        <span style="padding-left: '8px';cursor: 'auto'">
                        {{90}}
                        </span>
                    </span>
                    <span>
                        <a-tooltip title="Dislike">
                        <a-icon
                            type="dislike"
                            :theme="action === 'disliked' ? 'filled' : 'outlined'"
                            @click="dislike"
                        />
                        </a-tooltip>
                        <span style="padding-left: '8px';cursor: 'auto'">
                        {{5}}
                        </span>
                    </span>
                </template> -->
                <template slot="content">
                    <p>{{item.description}}</p>
                    <template v-if="getAttachments(item.reference_no)">
                        <a-row>
                          <a-col :span="8">
                              <pdf :src="getAttachments(item.reference_no)" style="width:90%; cursor:zoom; border: 1px solid" @click="window.open(getAttachments(item.reference_no))" /> 
                          </a-col>
                        </a-row>
                        
                    </template>
                </template>
                <a-tooltip slot="datetime" >
                <span>{{moment(item.created_date).fromNow()}}</span>
                </a-tooltip>
            </a-comment>
            </a-card>
       </template>
       <template v-else>
           <a-card v-for="i in 4" :key="i" style="margin-top: 1vh">
            <a-skeleton active avatar :paragraph="{rows: 4}" />
        </a-card>
       </template>
    </a-col>
  </a-row>

  
  <!-- <a-row type="flex" align="center" :gutter="16" style="margin-top: 2vh">
      <a-col :span="8">
        <a-card >
             <a-row type="flex" align="middle">
              <a-col :span="8">
                  <a-icon type="idcard" theme="twoTone"  style="font-size: 40px"></a-icon>
              </a-col>
              <a-col :span="16">
                  <h3>Taxpayers</h3>
                  <p>0</p>
              </a-col>
            </a-row>
        </a-card>
    </a-col>
    <a-col :span="8">
        <a-card >
            <a-row type="flex" align="middle">
              <a-col :span="8">
                  <a-icon type="file" theme="twoTone"  style="font-size: 40px"></a-icon>
              </a-col>
              <a-col :span="16">
                  <h3>Tax Returns</h3>
                  <p>0</p>
              </a-col>
            </a-row>
            
        </a-card>
    </a-col>
    <a-col :span="8">
        <a-card >
             <a-row type="flex" align="middle">
              <a-col :span="8">
                  <a-icon type="credit-card" theme="twoTone"  style="font-size: 40px"></a-icon>
              </a-col>
              <a-col :span="16">
                  <h3>Payments</h3>
                  <p>0</p>
              </a-col>
            </a-row>
        </a-card>
    </a-col>
    
  </a-row> -->
  <!-- <a-row type="flex" align="middle" justify="center" :gutter="16" style="margin-top: 5vh">
    <a-col :span="24">
        <h3>Quick View</h3>
        <a-divider></a-divider>
    </a-col>
    <a-col :span="1" style="margin-right: 2vh">
        <a-avatar shape="square"><a-icon type="left"></a-icon></a-avatar>
    </a-col>
    <a-col :span="6" v-for="i in 3" :key="i">
        <a-card>
            <img style="width:60%"
                alt="example"
                src="https://busapcom.files.wordpress.com/2014/10/1601-c.jpg?w=350&h=200&crop=1"
                slot="cover"
            />
            <template class="ant-card-actions" slot="actions">
                <a-icon type="edit" />
                <a-icon type="credit-card" />
                <a-icon type="download" />
            </template>
            <a-card-meta
                title="1603"
                description="09/20/2019">
            </a-card-meta>
        </a-card>
    </a-col>
    <a-col :span="1">
        <a-avatar shape="square"><a-icon type="right"></a-icon></a-avatar>
    </a-col>
  </a-row> -->
  </div>
</template>

<script>
import moment from 'moment'
import pdf from "vue-pdf";
export default {
     components: {
    pdf
  },
    data(){
        return{
            feed:[],
            loading:false,
            subscribers:[],
            data: [],
            moment, 
            attachments:[],
            chartOptions: {
                chart: { type: "line", sparkline: { enabled: true } },
                stroke: { width: 2, curve: "smooth" },
                // tooltip: { x: { show: false } },
                fill: {
                    type: "gradient",
                    gradient: {
                        shade: "dark",
                        gradientToColors: ["#1CA7D4"],
                        shadeIntensity: 1,
                        type: "vertical",
                        opacityFrom: 0.8,
                        opacityTo: 1,
                        stops: [0, 100, 100, 100]
                    }
                }
            },
            series: [{
                name: "Collections",
                data: [
                    // 0,
                    // 0,
                    // 0,
                    // 0,
                    // this.,
                    // 0,
                    // 0
                    ]
                }]
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            this.loading =true;
            this.$http.get(`${process.env.VUE_APP_BASE_API_URI}activities/users/${this.$store.state.account_session.user.account_id}`)
            .then(result=>{                                
                this.feed = result.data.model
                console.log('FEED ::: ',JSON.stringify(this.feed))
            })      
            .catch(error=>{
                console.log('ERROR ::::',error);
                this.loading=false;
            })
        },
        getAttachments(ref_no){
            return this.attachments.find(x=> x.reference_no === ref_no)?this.attachments.find(x=> x.reference_no === ref_no).url:''
        },
        view(url){
            window.open(url)
        }
    },
    computed:{
        taxpayer_series(){
            return [{
                name: "Taxpayer count",
                data: [
                    {x:'Sunday', y:0},
                    {x:'Monday', y:0},
                    {x:'Tuesday', y:0},
                    {x:'Wednesday', y:0},
                    {x:'Thursday', y:this.taxpayer_count.length},
                    {x:'Friday', y:0},
                    {x:'Saturday', y:0}
                    ]
                }]
        },
        returns_series(){
            return [{
                name: "Taxpayer count",
                data: [
                    {x:'Sunday', y:0},
                    {x:'Monday', y:0},
                    {x:'Tuesday', y:0},
                    {x:'Wednesday', y:0},
                    {x:'Thursday', y:this.returns_count.length},
                    {x:'Friday', y:0},
                    {x:'Saturday', y:0}
                    ]
                }]
        },
        payments_series(){
            return [{
                name: "Total payment",
                data: [
                    {x:'Sunday', y:0},
                    {x:'Monday', y:0},
                    {x:'Tuesday', y:0},
                    {x:'Wednesday', y:0},
                    {x:'Thursday', y:this.payments_count.total},
                    {x:'Friday', y:0},
                    {x:'Saturday', y:0}
                    ]
                }]
        }
    },
    asyncComputed:{
        
        taxpayer_count(){
            return new Promise((resolve, reject)=>{
                this.$http.get(`${process.env.VUE_APP_BASE_API_URI}taxpayer/users/${this.$store.state.account_session.user.account_id}`)
                .then(result=>{
                    console.log('RESULTS:::',result.data.model)
                    resolve(result.data.model)
                })
                .catch(err=>{
                    reject(0)
                })
            })
        },
        returns_count(){
            return new Promise((resolve, reject)=>{
                this.$store.dispatch("GET_TAX_RETURNS")
                    .then(result => {
                        console.log('RESULTS:::', JSON.stringify(result))
                        resolve(result)
                    this.loading = false;
                    })
                    .catch(err => {
                    this.loading = false;
                    });
            })
        },
        payments_count(){
            return new Promise((resolve, reject)=>{
                // this.$store.dispatch("GET_TAX_RETURNS")
                //     .then(result => {
                //         console.log('ARIEL :::',JSON.stringify(result))
                //         //TODO: workaround only
                //         var total =0
                //         result.forEach(element => {
                //             total =+ element.total_amount_payable
                //         });
                //         result.total = total
                        
                //         resolve(result)
                //     })
                //     .catch(err => {
                //         reject()
                //     });
                this.$http.get(`/payment/${this.$store.state.account_session.user.account_id}`)
                    .then(result => {
                        console.log("get tax returns paid payment data: " + JSON.stringify(result));
                        this.loading = false;
                        //TODO: workaround only
                        var total =0
                        if(result.data && result.data.model){
                            result.data.model.forEach(element => {
                                total =+ element.amount_paid
                            });
                            result.data.model.total = total
                        }
                        
                        resolve(result.data.model);
                    })
                    .catch(err => {
                        this.loading = false;
                        reject(err)
                    });
            })
        }
    }
}
</script>

<style>
.ant-skeleton-content .ant-skeleton-title {
  height: 9px;
}
.ant-skeleton-content .ant-skeleton-paragraph > li {
  height: 9px;
}
</style>