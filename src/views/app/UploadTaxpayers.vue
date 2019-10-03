<template>
<div>
<a-card>
    <a-upload-dragger name="file" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" @change="handleChange">
    <p class="ant-upload-drag-icon">
      <a-icon type="inbox" />
    </p>
    <p class="ant-upload-text">Click or drag file to this area to upload</p>
    <p class="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
  </a-upload-dragger>
  <input type="file" ref="uploader" @change="handleChange">
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
        
    },
    methods:{
        handleChange(e){
            const files = e.target.files;
            if (files[0] !== undefined) {
                if (files[0].name.lastIndexOf(".") <= 0) {
                return;
                }
                const fr = new FileReader();
                fr.readAsText(files[0]);
                fr.addEventListener("load", () => {
                this.formatResults(fr.result)
                });
            }
        },
        formatResults(results){
            var rows = results.split(/\n/);
        var col = [];
        var json = [];
        // loop for each records
        rows.forEach(row=>{    
            var col = row.replace(/(\r\n|\n|\r)/gm,"").split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            // var col = row.match(/("[^"]*")|[^;]+/g)            
            console.log(JSON.stringify(col))
            var obj = {}
            // this.headers.forEach((header, index)=>{
            //     obj[header] = col[index];
            // })
            //check empty obj
            // if(obj[this.headers[0]]){
            //     json.push(obj);
            // }
            
        });

        // this.$refs.uploader.value = "";
        // this.$emit('parse', json);
        // console.log('parse', json)
        }
    }

}
</script>

<style>

</style>