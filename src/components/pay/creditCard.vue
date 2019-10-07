<template>
<div>
    <h2>Credit Card Payment</h2>
    <a-divider></a-divider>
  <div class='card-wrapper' style="margin-bottom: 2vh"></div>
  <a-divider></a-divider>
    <form>
        <!-- <a-input type="text" name="number"></a-input> -->
        <a-form-item :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }" label="Credit Card Number">
            <input placeholder="•••• •••• •••• ••••" type="text" name="number" class="ant-input" v-model="card_no">
        </a-form-item>
        <a-form-item :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }" label="Cardholder Fullname">
        <input placeholder="Enter Fullname" type="text" name="name"  class="ant-input" v-model="card_name"/>
        </a-form-item>
        <a-form-item :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }" label="Expiry Date">
            <input placeholder="••/••" type="text" name="expiry" class="ant-input" v-model="expiry"/>
        </a-form-item>
        <a-form-item :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }" label="CVC">
            <input placeholder="•••" type="text" name="cvc" class="ant-input" v-model="cvc"/>
        </a-form-item>
    </form>
</div>
</template>

<script>
export default {
    data(){
        return{
            card_no:'',
            card_name:'',
            expiry:'',
            cvc:''
        }
        
    },
    mounted(){
        this.$emit('mounted')
    }

}
</script>

<style>

</style>