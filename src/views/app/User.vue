<template>
  <div>     
  <a-tabs @change="changetab" style="background-color:#FFFFFF">
    <a-tab-pane key="0" tab="Account Information"/>
    <a-tab-pane key="1" tab="Taxpayer Information"/>
    <a-tab-pane key="2" tab="Billing Information"/>
  </a-tabs>
  <a-card style="margin-top: 5vh">
    <!-- <transition-group name="fade" mode="out-in"> -->
    <template v-if="curr_tab == 0">
      <a-row type="flex" justify="center">
            <a-col :span="24">
                <a-card style="background: linear-gradient(to right, #000046, #1cb5e0)">
                    <span style="color:#FFFFFF"> <a-icon type="exclamation-circle"></a-icon>  This is the your account details on iTax.</span>                    
                </a-card>
            </a-col>
          <a-col :span="4" style="margin-top:2vh; margin-bottom: 5vh">
               <a-avatar class="profile_pic" :size="150" shape="square" :src="user.avatar"></a-avatar>
          </a-col>
        </a-row>
        <a-form>
            <a-form-item label="Email"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                <a-input placeholder="Enter your email"  v-model="user.email"></a-input>
            </a-form-item>
            <a-form-item label="First Name"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                <a-input placeholder="Enter your First Name" v-model="user.name.first"></a-input>
            </a-form-item>
            <a-form-item label="Middle Name"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                <a-input placeholder="Enter your Middle Name" v-model="user.name.middle"></a-input>
            </a-form-item>
            <a-form-item label="Last Name"
                        :label-col="{ span: 4 }"  
                        :wrapper-col="{ span: 18 }">
                <a-input placeholder="Enter your Last Name" v-model="user.name.last"></a-input>
            </a-form-item>
        </a-form>
    </template>
    <template v-else-if="curr_tab ==1">
        <a-row type="flex" justify="center">
            <a-col :span="24" style="margin-top:2vh; margin-bottom: 5vh">
                <a-card style="background: linear-gradient(to right, #000046, #1cb5e0)">
                    <span style="color:#FFFFFF"> <a-icon type="exclamation-circle"></a-icon>  Your Taxpayer details. These information will serve as your tax filing reference.</span>                    
                </a-card>
            </a-col>
         </a-row>
        <a-form>            
            <a-form-item label="TIN"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                <a-input placeholder="TIN" v-model="taxpayer.tin"></a-input>
            </a-form-item>
            <a-form-item label="RDO"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                <a-select placeholder="RDO" style="width: 100%" v-model="taxpayer.rdo_code">
                    <a-select-option value="001">RDO 001 - </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="Address"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                <a-textarea :rows="4" placeholder="Address" v-model="taxpayer.address"></a-textarea>
            </a-form-item>
            <a-form-item label="Birth Date"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                <a-date-picker  style="width:100%" placeholder="Enter your Birthdate" v-model="taxpayer.individual_details.birthDate"></a-date-picker>
            </a-form-item>
             <a-form-item label="Gender"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                <a-radio-group  buttonStyle="solid"  v-model="taxpayer.individual_details.gender">
                    <a-radio-button value="M">Male</a-radio-button>
                    <a-radio-button value="F">Female</a-radio-button>
                </a-radio-group>
            </a-form-item>
             <a-form-item label="Civil Status"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                <a-radio-group  buttonStyle="solid"  v-model="taxpayer.individual_details.civil_status">
                    <a-radio-button value="S">Single</a-radio-button>
                    <a-radio-button value="M">Married</a-radio-button>
                    <a-radio-button value="SP">Separated</a-radio-button>
                    <a-radio-button value="W">Widower</a-radio-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="Spouse TIN"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                <a-input placeholder="Spouse TIN" v-model="taxpayer.individual_details.spouse_tin"></a-input>
            </a-form-item>
        </a-form>
    </template>
    <template v-else-if="curr_tab ==2">
         <a-row type="flex" justify="center">
            <a-col :span="24" style="margin-top:2vh; margin-bottom: 5vh">
                <a-card style="background: linear-gradient(to right, #000046, #1cb5e0)">
                    <span style="color:#FFFFFF"> <a-icon type="exclamation-circle"></a-icon>  For faster transaction, input your billing details</span>                    
                </a-card>
            </a-col>
         </a-row>
         <a-form>
         
        <a-form-item>
            <a-input placeholder="Credit Card Number"></a-input>
        </a-form-item>
        <a-form-item>
            <a-input placeholder="Expiry Date"></a-input>
        </a-form-item>
        <a-form-item>
            <a-textarea :rows="5" placeholder="Billing Address"></a-textarea>
        </a-form-item>
        </a-form>
    </template>
    <!-- </transition-group> -->
        <a-divider></a-divider>
        <a-row type="flex" justify="end" :gutter=8>
            <a-col :span="6">
                <a-button block type="primary" @click="save">Save Changes<a-icon type="save"></a-icon></a-button>
            </a-col>
        </a-row>
        
  </a-card>
  
  
  </div>
</template>

<script>
export default {
    data(){
        return{
            curr_tab:0,
            user:{
                name:{}
            },
            taxpayer:{
                individual_details:{}
            }
        }
    }, 
    created(){
        this.init()
    },    
    methods:{
        init(){
            this.user = JSON.parse(JSON.stringify(this.$store.state.account_session.user))
        },
        save(){
            this.$http.post('/taxpayer', )
        },
        changetab(e){
            console.log('change', e)
            this.curr_tab = e
        }
    }

}
</script>

<style>

</style>