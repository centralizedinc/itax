<template>
<div>
    <!-- <a-affix :offsetTop="64"> -->
        <a-tabs @change="changeView" style="background-color:#FFFFFF; margin-top: 13vh ">
            <a-tab-pane key="0" tab="For Payment"></a-tab-pane>
            <a-tab-pane key="1" tab="Paid"></a-tab-pane>
        </a-tabs>
    <!-- </a-affix> -->

    <div style="margin-top: 1vh">
        <component v-bind:is="currentView"></component>
    </div>
</div>


</template>

<script>
import New from '@/components/pay/new'
import Paid from '@/components/pay/paid'

export default {
    components:{
        New,
        Paid
    },
    data(){
        return{
            currentView:'new',
            tabView:['new', 'paid']
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