<template>
<a-card title="My Network" >
    <!-- <tree :data="tree"  style="height:100vh">
        <template #node="{data, node: {depth}, radius, isRetracted}">
            <circle r="4" :stroke="blue">
                <a-icon type="user"></a-icon>
            </circle>
           <text>{{data.text}} {{depth}}</text>
        </template>
    </tree> -->
   <section id="vis"></section>
</a-card>
    
</template>

<script>
import {tree} from 'vued3tree'
import * as d3 from 'd3'

export default {
    components:{
        tree
    },
    data(){
        return{
            w : 960,
            h : 800,
            maxNodeSize : 50,
            x_browser : 20,
            y_browser : 25,
            root: null,
            force:null,
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
            this.force = d3.forceSimulation()
            this.vis = d3.select("#vis").append("svg").attr("width", w).attr("height", h);

            d3.json("marvel.json", function(json) {
                this.root = json;
                this.root.fixed = true;
                this.root.x = w / 2;
                this.root.y = h / 4;
                
                
                        // Build the path
                var defs = this.vis.insert("svg:defs")
                    .data(["end"]);
                
                
                defs.enter().append("svg:path")
                    .attr("d", "M0,-5L10,0L0,5");
                
                    this.update();
            });

        }, 
        update(){
            
        }
    }


}
</script>

<style>

</style>