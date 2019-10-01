<template>
<a-card>
  <a-table :dataSource="records" :columns="cols">
    <span slot="action" slot-scope="text, record">
      <a-button type="primary" @click="show_payment=true"><a-icon type="credit-card"></a-icon>Pay Now</a-button>
      <!-- <a-button type="primary" @click="show_payment=true"><a-icon type="shop"></a-icon>Over the Counter</a-button> -->
    </span>
  </a-table>
  <a-drawer
      title="Payment"
      :width="720"
      @close="show_payment=false"
      :visible="show_payment">
      <a-row type="flex" :gutter="16">
        <a-divider orientation="left">Payment Option</a-divider>
        <a-col :span="12">
          <a-card class="payment_card">
              <h3 style="color:#ffffff">Credit Card</h3>
            </a-card>
        </a-col>
        <a-col :span="12">
          <a-card class="payment_card">
              <h3 style="color:#ffffff">Over The Counter</h3>
            </a-card>
        </a-col>
        <a-divider orientation="left">Payment Details</a-divider>
      </a-row>
  </a-drawer>
  <!-- <a-modal v-model="show_payment" >
  
    <a-row type="flex" align="middle">
      <a-col :span="24">
        <a-steps size="small">
          <a-step title="Payment Option" description="Select mode of payment from one of the option"></a-step>
          <a-step title="Payment Details" description="Enter payment details"></a-step>
          <a-step title="Confirm" description="Confirm your payment"></a-step>
        </a-steps>
      </a-col>
      
      <a-col :span="24">
        <a-row :gutter="16" justify="center">
          <a-col :span="12">
            <a-card class="payment_card">
              <h3 style="color:#ffffff">Credit Card</h3>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card class="payment_card">
              <h3 style="color:#ffffff">Over the Counter</h3>
            </a-card>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-modal> -->
  </a-card>
</template>

<script>
import Payment from '@/components/pay/payment'
export default {
  components:{Payment},
  data(){
    return{
      show_payment:false,
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
  }

}
</script>