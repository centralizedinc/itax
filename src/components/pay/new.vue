<template>
  <a-table :columns="cols"></a-table>
</template>

<script>
export default {
  data(){
    return{
      cols:[
        {
          title: 'FRN',
          dataIndex: 'prn',
        },
        {
          title: 'Form',
          dataIndex: 'form',
        },
        {
          title: 'TIN',
          dataIndex: 'taxpayer',
        },
        {
          title: 'Amount Due',
          dataIndex: 'created_date',
        },
        {
          title: 'Expiry',
          dataIndex: 'created_date',
        }
      ]
    }
  }

}
</script>