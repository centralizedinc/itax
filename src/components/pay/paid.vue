<template>
  <a-table :columns="cols"></a-table>
</template>

<script>
export default {
  data(){
    return{
      cols:[
        {
          title: 'PRN',
          dataIndex: 'prn',
        },
        {
          title: 'Amount Due',
          dataIndex: 'form',
        },
        {
          title: 'Amount Paid',
          dataIndex: 'taxpayer',
        },
        {
          title: 'Payment Date',
          dataIndex: 'created_date',
        },
        {
          title: 'Status',
          dataIndex: 'created_date',
        },
        {
          title: 'Channel',
          dataIndex: 'created_date',
        },
      ]
    }
  }

}
</script>