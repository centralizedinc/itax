<template>
<a-card>
  <a-table :dataSource="records" :columns="cols">
    <span slot="action" slot-scope="text, record">
      <a-button type="primary" @click="show"><a-icon type="credit-card"></a-icon>Pay Now</a-button>
      <!-- <a-button type="primary" @click="show_payment=true"><a-icon type="shop"></a-icon>Over the Counter</a-button> -->
    </span>
  </a-table>
  <a-drawer
      title="Payment Options"
      :width="800"
      @close="show_payment=false"
      :visible="show_payment">
      <a-row type="flex" :gutter="16">
        
        <a-col :span="14">
          
            <a-tabs @change="navigate">
              <a-tab-pane key="0">
                <template slot="tab">
                 <a-tooltip title="Credit Card">
                 <a-icon type="credit-card" style="font-size: 24px"></a-icon>
                 </a-tooltip>      
               </template>
              </a-tab-pane>
              <a-tab-pane key="1">
               <template slot="tab">
                 <a-tooltip title="Online Banking">
                  <a-icon type="bank" style="font-size: 24px"></a-icon>
                 </a-tooltip>                 
               </template>
             </a-tab-pane>
             <a-tab-pane key="2">
               <template slot="tab">
                 <a-tooltip title="Over the Counter">
                 <a-icon type="shop" style="font-size: 24px"></a-icon>
                 </a-tooltip>
               </template>
             </a-tab-pane>
            </a-tabs>
            
          <a-card>
            <component :is="current_option" @mounted="init_card"/>
          </a-card>
        </a-col>
        <a-col :span="10" style="margin-top:10vh">
          <a-card style="background: linear-gradient(to bottom, #000046, #1cb5e0)">
            <h2 style="color: #FFFFFF">Summary</h2>
            <a-divider></a-divider>
            <a-row>
              <a-col :span="14">
                <p style="color: #FFFFFF">Tax Due:</p>
                <p style="color: #FFFFFF">Penalties:</p>
                <p style="color: #FFFFFF">Convenience Fee:</p>
                <a-divider></a-divider>
                <p style="color: #FFFFFF"><b>Total: </b></p>
              </a-col>
              <a-col :span="10">
                <p style="text-align: right;color: #FFFFFF">₱ 12,000.00</p>
                <p style="text-align: right;color: #FFFFFF">₱ 1,200.00</p>
                <p style="text-align: right;color: #FFFFFF">₱ 50.00</p>
                <a-divider></a-divider>
                  <p style="text-align: right;color: #FFFFFF"><b>₱ 13,250.00</b></p>
              </a-col>
            </a-row>
          </a-card>
          <a-button ghost block type="primary" size="large" style="margin-top: 5vh">Submit</a-button>
        </a-col>
      </a-row>
  </a-drawer>
  </a-card>
</template>

<script>
import Payment from '@/components/pay/payment'
import CreditCard from './creditCard'
import OnlineBanking from './onlineBanking'
import OverCounter from './overCounter'
import Card from 'card'
export default {
  components:{Payment, CreditCard, OnlineBanking, OverCounter},
  data(){
    return{
      current_option:'CreditCard',
      card:null,
      show_payment:false,
      tabs:['CreditCard', 'OnlineBanking', 'OverCounter'],
      records:[
        /**
         * placeholder only, to be overridden
         */
        {
          frn:'2019-001230012',
          form:'2550M',
          tin: '111-222-333-444-0000',
          amount:'23,500.00',
          expiry_date:'09/30/2019'
        },
        {
          frn:'2019-001230013',
          form:'2550M',
          tin: '111-222-333-444-0000',
          amount:'23,500.00',
          expiry_date:'09/30/2019'  
        }
      ],
      cols:[
        {
          title: 'FRN',
          dataIndex: 'frn',
        },
        {
          title: 'Form',
          dataIndex: 'form',
        },
        {
          title: 'TIN',
          dataIndex: 'tin',
        },
        {
          title: 'Amount Due',
          dataIndex: 'amount',
        },
        {
          title: 'Expiry',
          dataIndex: 'expiry_date',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
        }
      ]
    }
  },
  created(){
      this.init()
  },
  methods:{
    init(){
    },
    show(){
      this.show_payment = true;
    },
    navigate(e){
      this.current_option = this.tabs[e]
    },
    init_card(){
        if(!this.card){
          this.card = new Card({
              form: 'form',
              container: '.card-wrapper'
          });
        }
      }
  }    

}
</script>