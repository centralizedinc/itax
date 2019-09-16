<template>
<div>
  <a-steps :current="step_curr" size="small">
    <a-step title="Taxpayer Type"/>
    <a-step title="Taxpayer Information" />
    <a-step title="Contact Information" />
  </a-steps>
  
  <a-row type="flex" justify="center" :gutter="16" style="margin-top:5vh">
    <template v-if="step_curr==0">
        <a-col :span="12">
          <a-card>
            <a-row type="flex" align="middle" :gutter="8">
              <a-col :span="8">
                  <a-avatar class="avatar_btn" @click="next('I')" shape="square" :size="60" style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);">
                        <a-icon style="font-size:24px" type="user-add"></a-icon>
                    </a-avatar>
              </a-col>
              <a-col :span="16">
                  <h4>Individual Taxpayer</h4>
                  <p>Lorem ipsum dolor sit amet labore et dolore magna aliqua.</p>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
         <a-col :span="12">
           <a-card>
             <a-row type="flex" align="middle" :gutter="8">
              <a-col :span="8">
                  <a-avatar class="avatar_btn" @click="next('C')" shape="square" :size="60" style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);">
                        <a-icon style="font-size:24px" type="shop"></a-icon>
                    </a-avatar>
              </a-col>
              <a-col :span="16">
                  <h4>Non-Individual Taxpayer</h4>
                  <p>Lorem ipsum dolor sit amet labore et dolore magna aliqua.</p>
              </a-col>
            </a-row>
           </a-card>
         </a-col>
    </template>
    <template v-if="step_curr == 1">
         <a-col :span="24">
           <a-card>
             <a-form>
               <a-row type="flex" justify="center">
                  <a-col :span="6" style="margin-top:2vh; margin-bottom: 5vh">
                      <a-avatar class="profile_pic" :size="150" shape="square">
                        <h1 style="color:#FFFFFF">TP</h1>
                      </a-avatar>
                  </a-col>
               </a-row>
               <a-form-item label="Connection"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                  <a-input placeholder="Your connection to this taxpayer"></a-input>
                </a-form-item>
               <a-form-item label="TIN"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                  <a-input placeholder="Tax Identification Number"></a-input>
                </a-form-item>
                <a-form-item label="RDO"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                  <a-select placeholder="RDO" style="width: 100%" @change="handleChange">
                    <a-select-option value="001">RDO 001 - </a-select-option>
                </a-select>
                </a-form-item>
                <!-- For Individual -->
                <template v-if="tp_type === 'I'">
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
                </template>
                <!-- For Corporation -->
                <template v-else>
                  <a-form-item label="Business Name"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                      <a-input placeholder="Enter the company name"></a-input>
                  </a-form-item>
                  <a-form-item label="Line of Business"
                              :label-col="{ span: 4 }"
                              :wrapper-col="{ span: 18 }">
                      <a-input placeholder="Enter their line of business"></a-input>
                  </a-form-item>
                  <a-form-item label="Incorporation Date"
                              :label-col="{ span: 4 }"
                              :wrapper-col="{ span: 18 }">
                      <a-date-picker  style="width:100%" placeholder="Date of Registration" ></a-date-picker>
                  </a-form-item>
                  <a-form-item label="Accounting Type"
                              :label-col="{ span: 4 }"
                              :wrapper-col="{ span: 18 }">
                      <a-radio-group  buttonStyle="solid">
                          <a-radio-button value="C">Calendar</a-radio-button>
                          <a-radio-button value="F">Fiscal</a-radio-button>
                      </a-radio-group>
                  </a-form-item>
                  <a-form-item label="Start Month"
                              :label-col="{ span: 4 }"
                              :wrapper-col="{ span: 18 }">
                      <a-select :defaultValue="1" placeholder="RDO" style="width: 100%" @change="handleChange">
                          <a-select-option value="1">01 - January</a-select-option>
                          <a-select-option value="2">02 - Febuary</a-select-option>
                          <a-select-option value="3">03 - March</a-select-option>
                          <a-select-option value="4">04 - April</a-select-option>
                          <a-select-option value="5">05 - May</a-select-option>
                          <a-select-option value="6">06 - June</a-select-option>
                          <a-select-option value="7">07 - July</a-select-option>
                          <a-select-option value="8">08 - August</a-select-option>
                          <a-select-option value="9">09 - September</a-select-option>
                          <a-select-option value="10">10 - October</a-select-option>
                          <a-select-option value="11">11 - November </a-select-option>
                          <a-select-option value="12">12 - December</a-select-option>

                      </a-select>
                  </a-form-item>
                </template>
                
                <a-row type="flex" justify="end" :gutter="16">
                  <a-col :span="24">
                    <a-divider></a-divider>
                  </a-col>
                  <a-col :span="6">
                    <a-button block @click="step_curr=0"> <a-icon type="left"></a-icon>Back</a-button>
                  </a-col> 
                  <a-col :span="6">
                    <a-button block type="primary" @click="step_curr=2">Next <a-icon type="right"></a-icon></a-button>
                  </a-col>
                </a-row>
             </a-form>
           </a-card>
         </a-col>
         </template>
         <template v-if="step_curr == 2">
           <a-col :span="24">
           <a-card>
             <a-form>
               <a-form-item label="Email"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                  <a-input placeholder="Enter Taxpayer email"></a-input>
                </a-form-item>
                <a-form-item label="Contact Number"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                  <a-input placeholder="Enter Taxpayer contact number"></a-input>
                </a-form-item>
                <a-form-item label="Mobile Number"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                  <a-input placeholder="Enter Taxpayer mobile number"></a-input>
                </a-form-item>
                <a-form-item label="Address"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                  <a-textarea :rows="4" placeholder="Enter Taxpayer Address"></a-textarea>
                </a-form-item>
                <a-row type="flex" justify="end" :gutter="16">
                  <a-col :span="24">
                    <a-divider></a-divider>
                  </a-col>
                  <a-col :span="6">
                    <a-button block @click="step_curr=1"> <a-icon type="left"></a-icon>Back</a-button>
                  </a-col> 
                  <a-col :span="6">
                    <a-button block type="primary" @click="step_curr=2">Submit <a-icon type="save"></a-icon></a-button>
                  </a-col>
                </a-row>
             </a-form>
           </a-card>
           </a-col>
         </template>
      </a-row>
    
  </div>
</template>

<script>
export default {
  data(){
    return{
      step_curr:0,
      tp_type:''
    }
  },
  methods:{
    next(type){
      this.tp_type = type;
      this.step_curr ++;
    }
  },
  computed:{
    avatar_name(){
      var name = 'TP'
      
    }
  }

}
</script>

<style>

</style>