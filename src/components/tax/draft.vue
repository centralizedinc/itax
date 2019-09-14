<template>
  <a-table :columns="cols"></a-table>
</template>

<script>
export default {
  data(){
    return{
      cols:[
        {
          title: 'Form',
          dataIndex: 'form',
        },
        {
          title: 'Taxpayer',
          dataIndex: 'taxpayer',
        },
        {
          title: 'Date Created',
          dataIndex: 'created_date',
        },
        {
          title: 'Continue',
          dataIndex: 'actions',
        }
      ]
    }
  }

}
</script>