<template>
<div>
<a-card>
    <a-upload-dragger name="file" :multiple="true" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" @change="handleChange">
    <p class="ant-upload-drag-icon">
      <a-icon type="inbox" />
    </p>
    <p class="ant-upload-text">Click or drag file to this area to upload</p>
    <p class="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
  </a-upload-dragger>
</a-card>
<a-table :columns="cols"></a-table>
</div>
  
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