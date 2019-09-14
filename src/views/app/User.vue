<template>
  <a-card>
  <a-tabs>
    <a-tab-pane key="1" tab="Account Information">
        <a-form>
            <a-form-item>
                <a-avatar :size="150" shape="square" src="https://lh3.googleusercontent.com/a-/AAuE7mCkAaeluurFVT0Px52MI7IE7DUGr9Bko7fePKGgAg"></a-avatar>
            </a-form-item>
            <a-form-item>
                <a-input placeholder="First Name"></a-input>
            </a-form-item>
            <a-form-item>
                <a-input placeholder="Middle Name"></a-input>
            </a-form-item>
            <a-form-item>
                <a-input placeholder="Last Name"></a-input>
            </a-form-item>
            <a-form-item>
                <a-input placeholder="Email"></a-input>
            </a-form-item>
        </a-form>
    </a-tab-pane>
    <a-tab-pane key="2" tab="Billing Information">
        <a-form-item>
            <a-input placeholder="Credit Card Number"></a-input>
        </a-form-item>
        <a-form-item>
            <a-input placeholder="Expiry Date"></a-input>
        </a-form-item>
        <a-form-item>
            <a-textarea :rows="5" placeholder="Billing Address"></a-textarea>
        </a-form-item>
        
    </a-tab-pane>
  </a-tabs>
  <a-divider></a-divider>
  <a-button type="primary">Save Changes</a-button>
  </a-card>
</template>

<script>
export default {

}
</script>

<style>

</style>