<template>
<div>
    <a-card title="My Network" >
    <tree :data="tree"  style="height:100vh" @clickedText="showDetails">
    </tree>
    <a-drawer
      title="Basic Drawer"
      :visible="visible"
      :closable="false"
      @close="visible=false"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
</a-card>

</div>

    
</template>

<script>
import {tree} from 'vued3tree' 

export default {
    components:{
        tree,
        
    },
    data(){
        return{
            visible:false,
            tree: {
                    name: "123-344-888-0000 ",
                    children:[{
                    name: "son1",
                    children:[ {name: "grandson"}, {name: "grandson2"}]
                    },{
                    name: "son2",
                    children:[ {name: "grandson3"}, {name: "grandson4"}]
                    }]
                }
        }
                   
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            

        },
        showDetails(element, data){
            console.log(`element`, JSON.stringify(element.data))
            console.log(`visible`, this.visible)
            this.visible = true;

        }
    }


}
</script>

<style>

</style>