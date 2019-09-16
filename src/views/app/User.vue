<template>
  <a-card>
  <a-tabs>
    <a-tab-pane key="1" tab="Account Information">
        <a-row type="flex" justify="center">
            <a-col :span="24">
                <a-card style="background: linear-gradient(to right, #000046, #1cb5e0)">
                    <span style="color:#FFFFFF"> <a-icon type="exclamation-circle"></a-icon>  This is the your account details on iTax.</span>                    
                </a-card>
            </a-col>
          <a-col :span="8" style="margin-top:2vh; margin-bottom: 5vh">
               <a-avatar class="profile_pic" :size="150" shape="square" src="https://lh3.googleusercontent.com/a-/AAuE7mCkAaeluurFVT0Px52MI7IE7DUGr9Bko7fePKGgAg"></a-avatar>
          </a-col>
        </a-row>
        <a-form>
            <a-form-item label="Email"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                <a-input placeholder="Enter your email"></a-input>
            </a-form-item>
            <a-form-item label="First Name"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                <a-input placeholder="Enter your First Name"></a-input>
            </a-form-item>
            <a-form-item label="Middle Name"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                <a-input placeholder="Enter your Middle Name"></a-input>
            </a-form-item>
            <a-form-item label="Last Name"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                <a-input placeholder="Enter your Last Name"></a-input>
            </a-form-item>
            <a-form-item label="Brith Date"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                <a-date-picker  style="width:100%" placeholder="Enter your Birthdate" ></a-date-picker>
            </a-form-item>
             <a-form-item label="Gender"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                <a-radio-group  buttonStyle="solid">
                    <a-radio-button value="M">Male</a-radio-button>
                    <a-radio-button value="F">Female</a-radio-button>
                </a-radio-group>
            </a-form-item>
             <a-form-item label="Civil Status"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                <a-radio-group  buttonStyle="solid">
                    <a-radio-button value="S">Single</a-radio-button>
                    <a-radio-button value="M">Married</a-radio-button>
                    <a-radio-button value="SP">Separated</a-radio-button>
                    <a-radio-button value="W">Widower</a-radio-button>
                </a-radio-group>
            </a-form-item>
        </a-form>
    </a-tab-pane>
    <a-tab-pane key="2" tab="Taxpayer Information">
         <a-row type="flex" justify="center">
            <a-col :span="24" style="margin-top:2vh; margin-bottom: 5vh">
                <a-card style="background: linear-gradient(to right, #000046, #1cb5e0)">
                    <span style="color:#FFFFFF"> <a-icon type="exclamation-circle"></a-icon>  Your Taxpayer details. Please make sure that all your inormation are correct.</span>                    
                </a-card>
            </a-col>
         </a-row>
        <a-form>            
            <a-form-item>
                <a-input placeholder="TIN"></a-input>
            </a-form-item>
            <a-form-item>
                <a-select placeholder="RDO" style="width: 100%" @change="handleChange">
                    <a-select-option value="001">RDO 001 - </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item>
                <a-textarea :rows="4" placeholder="Address"></a-textarea>
            </a-form-item>
        </a-form>
    </a-tab-pane>
    <a-tab-pane key="3" tab="Billing Information">
        <a-row type="flex" justify="center">
            <a-col :span="24" style="margin-top:2vh; margin-bottom: 5vh">
                <a-card style="background: linear-gradient(to right, #000046, #1cb5e0)">
                    <span style="color:#FFFFFF"> <a-icon type="exclamation-circle"></a-icon>  For faster transaction, input your billing details</span>                    
                </a-card>
            </a-col>
         </a-row>
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
.profile_pic{
    cursor: pointer;
}
.profile_pic:hover{
    opacity: 0.6;
}
</style>