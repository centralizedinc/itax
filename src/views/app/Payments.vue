<template>
<div>
    <!-- <a-affix :offsetTop="64"> -->
        <a-tabs @change="changeView" style="background-color:#FFFFFF; margin-top: 1vh ">
            <a-tab-pane key="0" >
                <template slot="tab">
                    <a-icon type="credit-card"></a-icon>
                    <span>For Payment</span>
                </template>
            </a-tab-pane>
            <a-tab-pane key="1">
                <template slot="tab">
                    <a-icon type="file-done"></a-icon>
                    <span>Paid</span>
                </template>
            </a-tab-pane>
        </a-tabs>
    <!-- </a-affix> -->

    <div style="margin-top: 1vh">
        <component v-bind:is="tabView[view]"></component>
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
            view: 0,
            currentView:'new',
            tabView:['new', 'paid']
        }
    },
    methods: {
        changeView(key){
            console.log("change view key: " + key)
            this.view = key
        }
    }
    

}
</script>

<style>

</style>