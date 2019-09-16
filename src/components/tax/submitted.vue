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
          dataIndex: 'form',
        },
        {
          title: 'Form',
          dataIndex: 'form',
        },
        {
          title: 'Taxpayer',
          dataIndex: 'taxpayer',
        },
        {
          title: 'Date Submitted',
          dataIndex: 'created_date',
        },
        {
          title: 'Status',
          dataIndex: 'created_date',
        },
        {
          title: 'Actions',
          dataIndex: 'actions',
        }
      ]
    }
  }

}
</script>