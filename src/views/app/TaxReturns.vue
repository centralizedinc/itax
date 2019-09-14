<template>
<div>
  <a-tabs @change="changeView">
    <a-tab-pane key="0" tab="New"></a-tab-pane>
    <a-tab-pane key="1" tab="Draft"></a-tab-pane>
    <a-tab-pane key="2" tab="Submitted"></a-tab-pane>
  </a-tabs>

    <div style="margin-top: 5vh">
        <component v-bind:is="currentView"></component>
    </div>
</div>


</template>

<script>
import New from '@/components/tax/new'
import Draft from '@/components/tax/draft'
import Submitted from '@/components/tax/submitted'

export default {
    components:{
        New,
        Draft, 
        Submitted
    },
    data(){
        return{
            currentView:'new',
            tabView:['new', 'draft', 'submitted']
        }
    },
    methods:{
        changeView(key){
            this.currentView = this.tabView[key]
            window.scrollTo(0,0)
        }
    }

}
</script>

<style>

</style>