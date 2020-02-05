<template>
<div style="margin-top:5vh">
  <a-steps :current="step_curr" size="small">
    <a-step title="Taxpayer Type"/>
    <a-step title="Taxpayer Information" />
    <a-step title="Contact Information" />
    <a-step title="Connections" />
  </a-steps>
  
  <a-row type="flex" justify="center" :gutter="16" style="margin-top:5vh">
    <template v-if="step_curr==0">
      <a-col :span="24">
        <h2>Select the taxpayer type:</h2>
         <!-- <a-divider></a-divider> -->
      </a-col>
        <a-col :span="12">
          <a-card>
            <a-row type="flex" align="middle" :gutter="8">
              
              <a-col :span="8">
                  <a-avatar  class="avatar_btn" @click="next('I')" shape="square" :size="60" style="z-index:1;background: linear-gradient(to left, #000046, #1cb5e0);">
                        <a-icon style="font-size:24px" :type="taxpayer.taxpayer_type=='I'?'check':'user'"></a-icon>
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
                        <a-icon style="font-size:24px"  :type="taxpayer.taxpayer_type=='C'?'check':'shop'"></a-icon>
                    </a-avatar>
              </a-col>
              <a-col :span="16">
                  <h4>Non-Individual Taxpayer</h4>
                  <p>Lorem ipsum dolor sit amet labore et dolore magna aliqua.</p>
              </a-col>
            </a-row>
           </a-card>
           
         </a-col>
         <!-- <a-col :span="24">
           <a-divider></a-divider>
           <h2>How are you connected to this taxpayer?</h2>
           <a-select
              mode="multiple"
              placeholder="Please select"
              style="width: 100%"
            >
              <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
                {{(i + 9).toString(36) + i}}
              </a-select-option>
          </a-select>
         </a-col> -->
         <a-col :span="24">
         <a-row type="flex" justify="end" :gutter="16">
                  <a-col :span="24">
                    <a-divider></a-divider>
                  </a-col>
                  <!-- <a-col :span="6">
                    <a-button block @click="step_curr=0"> <a-icon type="left"></a-icon>Back</a-button>
                  </a-col>  -->
                  <a-col :span="6">
                    <a-button block type="primary" @click="step_curr++">Next <a-icon type="right"></a-icon></a-button>
                  </a-col>
                </a-row>
            </a-col>
    </template>
    <template v-if="step_curr == 1">
         <a-col :span="24">
           <a-card>
             <a-form>
               <a-row type="flex" justify="center">
                 <a-col :span="24">
                   <h2>Choose a profile picture for the taxpayer.</h2>
                    <!-- <a-divider></a-divider> -->
                 </a-col>                 
                  <a-col :span="6" style="margin-top:2vh; margin-bottom: 5vh">
                      <a-avatar  v-if="!taxpayer.avatar"  class="profile_pic" :size="150" shape="square" @click="$refs.upload.click()">
                        <h1 style="color:#FFFFFF">TP</h1>
                      </a-avatar>
                      <a-avatar  v-else class="profile_pic" :size="150" shape="square" @click="$refs.upload.click()" :src="taxpayer.avatar">
                      </a-avatar>
                      <input type="file" 
                            name="avatar" 
                            accept="image/*"
                            @change="onFilePicked" 
                            ref="upload" 
                            style="display:none"/>
                  </a-col>
                  <a-col :span="24">
                   <h2>Fill-up the taxpayer's details.</h2>
                    <!-- <a-divider></a-divider> -->
                 </a-col>
               </a-row>
              
               <a-form-item label="TIN"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                  <!-- <a-input placeholder="Tax Identification Number" v-model="taxpayer.tin"></a-input> -->
                  <a-input-number
                  style="width:100%"
                  max="9999999999999"
                    placeholder="Tax Identification Number" v-model="taxpayer.tin"
                    :formatter="value => `${value}`.replace(/^(\d{3})(\d{3})(\d{3})(\d{4})/g, '$1-$2-$3-$4')"
                    :parser="value => value.replace(/\$\s?|(-*)/g, '')"
                  ></a-input-number>
                </a-form-item>
                <a-form-item label="RDO"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                  <a-select placeholder="RDO" style="width: 100%"  v-model="taxpayer.rdo_code">
                    <a-select-option v-for="rdo in rdos" :key="rdo._id" :value="rdo.code">{{rdo.code}} - {{rdo.description}} </a-select-option>
                </a-select>
                </a-form-item>
                <!-- For Individual -->
                <template v-if="taxpayer.taxpayer_type === 'I'">
                    <a-form-item label="First Name"
                                :label-col="{ span: 4 }"
                                :wrapper-col="{ span: 18 }">
                        <a-input placeholder="Enter your First Name" v-model="taxpayer.individual_details.firstName"></a-input>
                    </a-form-item>
                    <a-form-item label="Middle Name"
                                :label-col="{ span: 4 }"
                                :wrapper-col="{ span: 18 }">
                        <a-input placeholder="Enter your Middle Name" v-model="taxpayer.individual_details.middleName"></a-input>
                    </a-form-item>
                    <a-form-item label="Last Name"
                                :label-col="{ span: 4 }"
                                :wrapper-col="{ span: 18 }">
                        <a-input placeholder="Enter your Last Name" v-model="taxpayer.individual_details.lastName"></a-input>
                    </a-form-item>
                    <a-form-item label="Birth Date"
                                :label-col="{ span: 4 }"
                                :wrapper-col="{ span: 18 }">
                        <a-date-picker  style="width:100%" placeholder="Enter your Birthdate" v-model="taxpayer.individual_details.birthDate" ></a-date-picker>
                    </a-form-item>
                    <a-form-item label="Gender"
                                :label-col="{ span: 4 }"
                                :wrapper-col="{ span: 18 }">
                        <a-radio-group  buttonStyle="solid" v-model="taxpayer.individual_details.gender">
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
                      <a-input placeholder="Enter the company name" v-model="taxpayer.corporate_details.registeredName"></a-input>
                  </a-form-item>
                  <a-form-item label="Line of Business"
                              :label-col="{ span: 4 }"
                              :wrapper-col="{ span: 18 }">
                      <a-input placeholder="Enter their line of business" v-model="taxpayer.line_of_business"></a-input>
                  </a-form-item>
                  <a-form-item label="Incorporation Date"
                              :label-col="{ span: 4 }"
                              :wrapper-col="{ span: 18 }">
                      <a-date-picker  style="width:100%" placeholder="Date of Registration" v-model="taxpayer.corporate_details.incorporationDate" ></a-date-picker>
                  </a-form-item>
                  <a-form-item label="Accounting Type"
                              :label-col="{ span: 4 }"
                              :wrapper-col="{ span: 18 }">
                      <a-radio-group  buttonStyle="solid" v-model="taxpayer.accounting_type">
                          <a-radio-button value="C">Calendar</a-radio-button>
                          <a-radio-button value="F">Fiscal</a-radio-button>
                      </a-radio-group>
                  </a-form-item>
                  <a-form-item label="Start Month"
                              :label-col="{ span: 4 }"
                              :wrapper-col="{ span: 18 }">
                      <a-select :defaultValue="1" placeholder="Select Start Month" style="width: 100%"  v-model="taxpayer.start_month">
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
                    <a-button block @click="step_curr--"> <a-icon type="left"></a-icon>Back</a-button>
                  </a-col> 
                  <a-col :span="6">
                    <a-button block type="primary" @click="step_curr++">Next <a-icon type="right"></a-icon></a-button>
                  </a-col>
                </a-row>
             </a-form>
           </a-card>
         </a-col>
         </template>
         <template v-if="step_curr == 2">
           <a-col :span="24">
           <a-card>
             <a-row type="flex" justify="center">
                      <a-col :span="24">
                        <h2>Fill contact information of the taxpayer.</h2>
                        <a-divider></a-divider>
                      </a-col>
                   </a-row>
             <a-form>
               <a-form-item label="Email"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                  <a-input placeholder="Enter Taxpayer email" v-model="taxpayer.contact_details.email"></a-input>
                </a-form-item>
                <a-form-item label="Contact Number"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                  <a-input placeholder="Enter Taxpayer contact number" v-model="taxpayer.contact_details.telno"></a-input>
                </a-form-item>
                <a-form-item label="Mobile Number"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                  <a-input placeholder="Enter Taxpayer mobile number" v-model="taxpayer.contact_details.mobile"></a-input>
                </a-form-item>
                <a-form-item label="Address"
                        :label-col="{ span: 4 }"
                        :wrapper-col="{ span: 18 }">
                  <a-textarea :rows="4" placeholder="Enter Taxpayer Address" v-model="taxpayer.contact_details.email"></a-textarea>
                </a-form-item>
                <a-row type="flex" justify="end" :gutter="16">
                  <a-col :span="24">
                    <a-divider></a-divider>
                  </a-col>
                  <a-col :span="6">
                    <a-button block @click="step_curr=1"> <a-icon type="left"></a-icon>Back</a-button>
                  </a-col> 
                  <a-col :span="6">
                    <a-button block type="primary" @click="step_curr++">Next <a-icon type="right"></a-icon></a-button>
                    <!-- <a-button :loading="loading" block type="primary" @click="save">Submit <a-icon type="save"></a-icon></a-button> -->
                  </a-col>
                </a-row>
             </a-form>
           </a-card>
           </a-col>
         </template>
         <template v-if="step_curr == 3">
           <a-col :span="24">
           <a-card>
             <a-row type="flex" justify="center">
                <a-col :span="20">
                  <h2>Connections</h2>                  
                </a-col>
                <a-col :span="4">
                  <a-button block type="primary" @click="search_modal=true">Add Connection</a-button>
                </a-col>
                <a-col :span="24">
                  <a-divider style="margin-top:-1vh"></a-divider>
                  <tree :data="tree"  style="height:80vh"/>
                </a-col>
              </a-row> 
              <a-row type="flex" justify="end" :gutter="16">
                  <a-col :span="24">
                    <a-divider></a-divider>
                  </a-col>
                  <a-col :span="6">
                    <a-button block @click="step_curr=1"> <a-icon type="left"></a-icon>Back</a-button>
                  </a-col> 
                  <a-col :span="6">
                    <!-- <a-button block type="primary" @click="step_curr++">Next <a-icon type="right"></a-icon></a-button> -->
                    <a-button :loading="loading" block type="primary" @click="save">Submit <a-icon type="save"></a-icon></a-button>
                  </a-col>
                </a-row>           
           </a-card>
           </a-col>
         </template>
      </a-row>
      <a-modal v-model="search_modal" :closable="true"  @close="seach_modal=false" title="New Connection">
        <a-row>
          <a-col :span="24">
            <a-input-search placeholder="Enter TIN to search for taxpayer test"></a-input-search>
          </a-col>
           <a-col :span="24">
            <a-select placeholder="Enter Relationship" style="width:100%">
              <a-select-option key="1" value="Employer" >Employer</a-select-option>
            </a-select>
           </a-col>
        </a-row>
      </a-modal>
  </div>
</template>

<script>

import {tree} from 'vued3tree' 
export default {
  components:{
    tree
  },
  data(){
    return{
      search_modal:false,
      formData:null,
      loading:false,
      step_curr:0,
      rdos:[],
      taxpayer:{
        taxpayer_type:'',
        avatar:null,
        individual_details:{},
        corporate_details:{},
        contact_details:{},        
      },
      tree: {
          name: "123-344-888-0000 ",
          children:[]
      }
    }
  },
  created(){
    this.init()
  },
  methods:{
    init(){
      this.$http.get('/reference/rdos')
      .then(results =>{
        console.log('data', JSON.stringify(results.data))
        this.rdos = results.data
      })
    },
    next(type){
      this.taxpayer.taxpayer_type = type;
      // this.step_curr ++;
    },
    onFilePicked(){
      this.formData = new FormData();
      this.formData.append(
        event.target.name,
        event.target.files[0],
        event.target.files[0].name
      );
      this.taxpayer.avatar = URL.createObjectURL(event.target.files[0]); 
      console.log('onFilePicked: ', this.taxpayer.avatar)     
    },
    /**
     * 
     * @description Save on store only. For testing
     */
    save(){
      this.$store.commit('ADD_TP', this.taxpayer)
      this.$notification.success({
          message: 'Successful',
          description:`New Taxpayer Created!`
        })
      this.$router.push('/app/taxpayer')
    },
    save_db(){
      this.loading=true;
      this.$http.post('/taxpayer', this.taxpayer)
      .then(result=>{
        console.log('result', JSON.stringify(result))
        return this.$http.post('/connection', {
          from:this.$store.state.account_session.user.id,
          to: result.data._id,
          relationship: this.taxpayer.connection
          })
        
      })
      .then(result=>{
        this.$router.push('/app/taxpayer')
        this.loading=false;
        this.$notification.success({
          message: 'Successful',
          description:`Saved!`
        })
      })
      .catch(err =>{
        this.loading=false;
        this.$notification.error({
          message: 'Error',
          description:`Error on saving ::: ${err}`
        })
        console.error(err)
      })
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