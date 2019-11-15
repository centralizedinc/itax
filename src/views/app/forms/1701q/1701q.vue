<template>
  <div>
    <a-form v-show="step===0">
      <a-divider>
        <b>Quarterly Income Tax Return(1701Q)</b>
      </a-divider>

      <!-- 1 -->
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="1"
        :validate-status="error_item('return_period_year')"
        :help="error_desc('return_period_year')"
      >
        <a-select placeholder="For the Year" style="width: 100%" v-model="form.return_period_year">
          <a-select-option key="y0" :value="new Date().getFullYear()">{{new Date().getFullYear()}}</a-select-option>
          <a-select-option
            v-for="item in 30"
            :key="`y${item}`"
            :value="new Date().getFullYear() - item"
          >{{new Date().getFullYear() - item}}</a-select-option>
        </a-select>
      </a-form-item>

      <!-- 2 -->
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="2"
        :validate-status="error_item('quarter')"
        :help="error_desc('quarter')"
      >
        <a-radio-group v-model="form.quarter" buttonStyle="solid" style="width: 100%">
          <span style="margin-right: 14px">Quarter</span>
          <a-radio-button :value="1">First</a-radio-button>
          <a-radio-button :value="2">Second</a-radio-button>
          <a-radio-button :value="3">Third</a-radio-button>
        </a-radio-group>
      </a-form-item>

      <!-- 3 -->
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="3"
        style="width: 100%"
      >
        <span style="margin-right: 14px">Amended</span>
        <a-radio-group v-model="form.amended_yn">
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>

      <!-- 4 -->
      <a-form-item
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
        label="4"
      >
        <a-input-number
          maxlength="2"
          placeholder="Number of Sheets"
          v-model="form.num_of_sheet"
          style="width: 100%"
        ></a-input-number>
      </a-form-item>
    </a-form>

    <!-- Part I -->
    <a-form v-show="step===1">
      <a-divider>
        <b>Part I: BACKGROUND INFORMATION ON TAXPAYER/FILER</b>
      </a-divider>

      <a-row :gutter="4">
        <!-- 5 -->
        <a-col :span="24">
          <a-form-item
            :labelCol="{span: 2}"
            :wrapperCol="{span: 20}"
            label="5"
            :validate-status="error_item('taxpayer.tin')"
            :help="error_desc('taxpayer.tin')"
          >
            <a-input
              maxlength="13"
              placeholder="Taxpayer Identification Number (TIN)"
              v-model="form.taxpayer.tin"
            ></a-input>
          </a-form-item>
        </a-col>
        <!-- 6 -->
        <a-col :span="24">
          <a-form-item :labelCol="{span: 2}" :wrapperCol="{span: 20}" label="6">
            <a-input maxlength="3" placeholder="RDO Code" v-model="form.taxpayer.rdo_code"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <!-- 7 -->
          <a-form-item
            label="7"
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
            :validate-status="error_item('taxpayer.filer_type')"
            :help="error_desc('taxpayer.filer_type')"
          >
            <span style="margin-right: 14px">Taxpayer/Filer Type</span>
            <a-radio-group
              v-model="form.taxpayer.filer_type"
              @change="atc_code_change"
              :defaultValue="this.form.taxpayer.filer_type"
            >
              <a-radio :value="'s'">Single Proprietor</a-radio>
              <a-radio :value="'p'">Professional</a-radio>
              <a-radio :value="'e'">Estate</a-radio>
              <a-radio :value="'t'">Trust</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <!-- 8 -->
        <a-col :span="24">
          <a-form-item
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
            :validate-status="error_item('taxpayer_atc_code')"
            :help="error_desc('taxpayer_atc_code')"
            label="8"
          >
            <span style="margin-right: 14px">Alphanumeric Tax Code (ATC)</span>
            <br />
            <a-radio-group v-model="form.taxpayer_atc_code">
              <a-radio
                :value="'II012'"
                :disabled="form.taxpayer.filer_type == 'p'|| form.taxpayer.filer_type == '' || form.taxpayer.filer_type == null"
              >II012 Business Income-Graduated IT Rates</a-radio>
              <br />
              <a-radio
                :value="'II015'"
                :disabled="form.taxpayer.filer_type == 'p'||form.taxpayer.filer_type == 't' || form.taxpayer.filer_type == 'e' || form.taxpayer.filer_type == '' || form.taxpayer.filer_type == null"
              >II015 Business Income - 8% IT Rate</a-radio>
              <br />

              <a-radio
                :value="'II014'"
                :disabled="form.taxpayer.filer_type == 's' || form.taxpayer.filer_type == 't' || form.taxpayer.filer_type == 'e' || form.taxpayer.filer_type == '' || form.taxpayer.filer_type == null"
              >II014 Income from Profession–Graduated IT Rates</a-radio>
              <br />

              <a-radio
                :value="'II017'"
                :disabled="form.taxpayer.filer_type == 's' ||form.taxpayer.filer_type == 't' || form.taxpayer.filer_type == 'e' || form.taxpayer.filer_type == '' || form.taxpayer.filer_type == null"
              >II017 Income from Profession – 8% IT Rate</a-radio>
              <br />

              <a-radio
                :value="'II013'"
                :disabled="form.taxpayer.filer_type == 't' || form.taxpayer.filer_type == 'e' || form.taxpayer.filer_type == '' || form.taxpayer.filer_type == null"
              >II013 Mixed Income–Graduated IT Rates</a-radio>
              <br />

              <a-radio
                :value="'II016'"
                :disabled="form.taxpayer.filer_type == 't' || form.taxpayer.filer_type == 'e' || form.taxpayer.filer_type == '' || form.taxpayer.filer_type == null"
              >II016 Mixed Income – 8% IT Rate</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <!-- 9 -->
        <a-col :span="24">
          <a-form-item
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
            :validate-status="error_item('taxpayer.Taxpayer_name')"
            :help="error_desc('taxpayer.Taxpayer_name')"
            label="9"
          >
            <a-input
              placeholder="Last Name, First Name, Middle Name"
              v-model="form.taxpayer.registered_name"
            ></a-input>
          </a-form-item>
        </a-col>
        <!-- 10 -->
        <a-col :span="24">
          <a-form-item
            label="10"
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
            :validate-status="error_item('taxpayer.registered_address')"
            :help="error_desc('taxpayer.registered_address')"
          >
            <a-tooltip>
              <template
                slot="title"
              >Indicate complete address. If branch, indicate the branch address. If the registered address is different from the current address, go to the RDO to update registered address by using BIR Form No. 1905</template>
              <a-textarea
                autosize
                placeholder="Indicate complete address. If branch, indicate the branch address. If the registered address is different from the current address, go to the RDO to update registered address by using BIR Form No. 1905"
                v-model="form.taxpayer.address"
                style="width:100%"
              ></a-textarea>
            </a-tooltip>
          </a-form-item>
        </a-col>
        <!-- 10 -->
        <a-col :span="24">
          <a-form-item
            label="10A"
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
            :validate-status="error_item('taxpayer.zip_code')"
            :help="error_desc('taxpayer.zip_code')"
          >
            <a-input
              v-model="form.taxpayer.address_details.zipCode"
              placeholder="Zipcode"
              maxlength="4"
            ></a-input>
          </a-form-item>
        </a-col>
        <!-- 11 -->
        <a-col :span="24">
          <a-form-item
            label="11"
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
            :validate-status="error_item('taxpayer.individual_details.birthDate')"
            :help="error_desc('taxpayer.individual_details.birthDate')"
          >
            <a-date-picker
              style="width: 100%"
              v-model="form.taxpayer.individual_details.birthDate"
              placeholder="Date of Birth (MM/DD/YYYY)"
            ></a-date-picker>
          </a-form-item>
        </a-col>
        <!-- 12 -->
        <a-col :span="24">
          <a-form-item
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
            :validate-status="error_item('taxpayer.contact_details.email')"
            :help="error_desc('taxpayer.contact_details.email')"
            label="12"
          >
            <a-input
              style="width: 100%"
              v-model="form.taxpayer.contact_details.email"
              placeholder="Email Address"
            ></a-input>
          </a-form-item>
        </a-col>
        <!-- 13 -->
        <a-col :span="24">
          <a-form-item
            label="13"
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
            :validate-status="error_item('taxpayer.citizenship')"
            :help="error_desc('taxpayer.citizenship')"
          >
            <a-input
              style="width: 100%"
              v-model="form.taxpayer.citizenship"
              placeholder="Citizenship"
            ></a-input>
          </a-form-item>
        </a-col>
        <!-- 14 -->
        <a-col :span="24">
          <a-form-item
            label="14"
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
            :validate-status="error_item('taxpayer_foreign_tax_credits')"
            :help="error_desc('taxpayer_foreign_tax_credits')"
          >
            <a-input
              :disabled="form.taxpayer_foreign_tax_credits == false"
              v-model="form.taxpayer_foreign_tax_number"
              placeholder="Foreign Tax Number"
            ></a-input>
          </a-form-item>
        </a-col>
        <!-- 15 -->
        <a-col :span="24">
          <a-form-item
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
            label="15"
            :validate-status="error_item('taxpayer.taxpayer_foreign_tax_credits')"
            :help="error_desc('taxpayer.taxpayer_foreign_tax_credits')"
          >
            <span style="margin-right: 14px">Claiming Foreign Tax Credits?</span>
            <a-radio-group v-model="form.taxpayer_foreign_tax_credits" @change="changeTaxNo">
              <a-radio :value="true">Yes</a-radio>
              <a-radio :value="false">No</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <!-- 16 -->
        <a-col :span="24">
          <a-form-item
            label="16"
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
          >
            <span
              style="margin-right: 14px"
            >Tax Rate* (choose one, for income from business/profession)</span>
            <a-radio-group v-model="form.taxpayer_tax_rate" :value="changeATC()" disabled>
              <a-tooltip>
                <template
                  slot="title"
                >Graduated Rates per Tax Table- page 2 (Choose Method of Deduction in Item 16A)</template>
                <a-radio :value="'GR'">Graduated Rates per Tax Table- page 2</a-radio>
              </a-tooltip>
              <a-tooltip>
                <template slot="title">
                  8% on gross sales/receipts & other non-operating income in lieu of Graduated Rates under Sec. 24(A)(2)(a) & Percentage Tax
                  under Sec. 116 of the NIRC, as amended [available if gross sales/receipts and other non-operating income do not exceed Three million pesos (P3M)]
                </template>
                <a-radio :value="'GS'">8% on gross sales/receipts & other non-operating income</a-radio>
              </a-tooltip>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <!-- 16A -->
        <a-col :span="24">
          <a-form-item
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
            label="16A"
            :validate-status="error_item('taxpayer_method_deduction')"
            :help="error_desc('taxpayer_method_deduction')"
          >
            <span style="margin-right: 14px">Method of Deduction:</span>
            <a-radio-group
              v-model="form.taxpayer_method_deduction"
              :disabled="form.taxpayer_tax_rate !== 'GR'"
            >
              <a-radio :value="'ID'">Itemized Deduction [Sec. 34(A-J), NIRC]</a-radio>
              <a-tooltip>
                <template
                  slot="title"
                >Optional Standard Deduction (OSD) [40% of Gross Sales/Receipts/Revenues/Fees[Sec. 34(L), NIRC]</template>
                <a-radio :value="'OSD'">Optional Standard Deduction (OSD)</a-radio>
              </a-tooltip>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <!-- Part II -->
    <a-form v-show="step===2">
      <a-divider>
        <b>
          Part II: BACKGROUND INFORMATION ON SPOUSE
          <br />(if applicable)
        </b>
      </a-divider>

      <!-- 17 -->
      <a-form-item
        label="17"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input
          :disabled="form.taxpayer.filer_type == 'e' || form.taxpayer.filer_type == 't'"
          :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' / ')"
          placeholder="Spouse's Tax Identification Number"
          v-model="form.spouse_details.tin"
          maxlength="13"
        ></a-input>
      </a-form-item>

      <!-- 18 -->
      <a-form-item
        label="18"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input
          v-model="form.spouse_details.rdo_code"
          :disabled="form.taxpayer.filer_type == '' || form.taxpayer.filer_type == null || form.taxpayer.filer_type == 'e' || form.taxpayer.filer_type == 't'"
          placeholder="RDO Code"
          maxlength="3"
        ></a-input>
      </a-form-item>

      <!-- 19 -->
      <a-form-item
        label="19"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <span style="margin-right: 14px">Filer's Spouse Type</span>
      </a-form-item>
      <a-form-item>
        <a-row :gutter="8">
          <a-col :span="8">
            <a-checkbox
              style="width: 100%"
              @change="spouse_type"
              v-model="SP"
              :disabled="form.taxpayer.filer_type == '' || form.taxpayer.filer_type == null || form.taxpayer.filer_type == 'e' || form.taxpayer.filer_type == 't'"
            >Single Proprietor</a-checkbox>
          </a-col>
          <a-col :span="6">
            <a-checkbox
              @change="spouse_type"
              v-model="P"
              :disabled="form.taxpayer.filer_type == '' || form.taxpayer.filer_type == null || form.taxpayer.filer_type == 'e' || form.taxpayer.filer_type == 't'"
            >Professional</a-checkbox>
          </a-col>
          <a-col :span="10">
            <a-checkbox
              @change="spouse_type"
              v-model="CE"
              :disabled="form.taxpayer.filer_type == '' || form.taxpayer.filer_type == null || form.taxpayer.filer_type == 'e' || form.taxpayer.filer_type == 't'"
            >Compensation Earner</a-checkbox>
          </a-col>
        </a-row>
      </a-form-item>

      <a-form-item
        label="20"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-radio-group v-model="form.spouse_atc_code">
          <span style="margin-right: 14px">ATC (Alphanumeric Tax Code)</span>
          <br />
          <a-radio
            :value="'SII012'"
            @change="form.spouse_tax_rate ='SGR'"
            :disabled="form.spouse_details.filer_type !=='SP'"
          >II012 Business Income-Graduated IT Rates</a-radio>
          <br />
          <a-radio
            :value="'SII015'"
            @change="form.spouse_tax_rate ='SOGS'"
            :disabled="form.spouse_details.filer_type !=='SP'"
          >II015 Business Income - 8% IT Rate</a-radio>
          <br />
          <a-radio
            :value="'SII014'"
            @change="form.spouse_tax_rate ='SGR'"
            :disabled="form.spouse_details.filer_type !=='P'"
          >II014 Income from Profession–Graduated IT Rates</a-radio>
          <br />
          <a-radio
            :value="'SII017'"
            @change="form.spouse_tax_rate ='SOGS'"
            :disabled="form.spouse_details.filer_type !=='P'"
          >II017 Income from Profession – 8% IT Rate</a-radio>
          <br />
          <a-radio
            :value="'SII013'"
            @change="form.spouse_tax_rate ='SGR'"
            :disabled="form.spouse_details.filer_type =='P' || form.spouse_details.filer_type =='SP' || form.spouse_details.filer_type =='CE' ||form.taxpayer.spouse_tax_filter_type !=='SPCE'"
          >II013 Mixed Income–Graduated IT Rates</a-radio>
          <br />
          <a-radio
            :value="'SII016'"
            @change="form.spouse_tax_rate ='SOGS'"
            :disabled="form.spouse_details.filer_type =='P' || form.spouse_details.filer_type =='SP' || form.spouse_details.filer_type =='CE'"
          >II016 Mixed Income – 8% IT Rate</a-radio>
          <br />
          <a-radio
            :value="'SII011'"
            @change="form.spouse_tax_rate =''"
            :disabled="form.spouse_details.filer_type !=='CE'"
          >II011 Compensation Income</a-radio>
        </a-radio-group>
      </a-form-item>

      <!-- 21 -->
      <a-form-item
        label="21"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-row :gutter="5">
          <a-col :span="8">
            <a-input
              v-model="form.spouse_details.individual_details.lastName"
              placeholder="Last Name"
            />
          </a-col>
          <a-col :span="8">
            <a-input
              v-model="form.spouse_details.individual_details.firstName"
              placeholder="First Name"
            />
          </a-col>
          <a-col :span="8">
            <a-input
              v-model="form.spouse_details.individual_details.middleName"
              placeholder="Middle Name"
            />
          </a-col>
        </a-row>

        <!-- <a-input
          placeholder="Spouse's Name: Last Name, First Name, Middle Name"
          v-model="form.spouse_details.registered_name"
          :disabled="form.taxpayer.filer_type == 'e' || form.taxpayer.filer_type == 't'"
        ></a-input>-->
      </a-form-item>

      <!-- 22 -->
      <a-form-item
        label="22"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input
          placeholder="Spouse's Citizenship"
          v-model="form.spouse_details.citizenship"
          :disabled="form.taxpayer.filer_type == 'e' || form.taxpayer.filer_type == 't'"
        ></a-input>
      </a-form-item>

      <!-- 23 -->
      <a-form-item
        label="23"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <a-input
          @change="changeTaxNo"
          placeholder="Foreign Tax Number (if applicable)"
          v-model="form.spouse_foreign_tax_number"
          :disabled="form.spouse_foreign_tax_credits == false || form.taxpayer.filer_type == 'e' || form.taxpayer.filer_type == 't'"
        ></a-input>
      </a-form-item>

      <!-- 24 -->
      <a-form-item
        label="24"
        :labelCol="form_layout.label_col"
        :wrapperCol="form_layout.wrapper_col"
      >
        <span style="margin-right: 14px">Claiming Foreign Tax Credits?</span>
        <a-radio-group
          @change="changeSpouseTaxNo"
          v-model="form.spouse_foreign_tax_credits"
          :disabled="form.taxpayer.filer_type == 'e' || form.taxpayer.filer_type == 't'"
        >
          <a-radio :value="true">Yes</a-radio>
          <a-radio :value="false">No</a-radio>
        </a-radio-group>
      </a-form-item>

      <!-- 25 -->
      <a-row :gutter="4">
        <a-col :span="24">
          <a-form-item
            label="25"
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
          >
            <span
              style="margin-right: 14px"
            >Tax Rate* (choose one, for income from business/profession):</span>
            <a-radio-group v-model="form.spouse_tax_rate" :value="changeSpouseATC()" disabled>
              <a-tooltip>
                <template
                  slot="title"
                >Graduated Rates per Tax Table- page 2 (Choose Method of Deduction in Item 25A)</template>
                <a-radio :value="'SGR'">Graduated Rates per Tax Table- page 2</a-radio>
              </a-tooltip>
              <a-tooltip>
                <template
                  slot="title"
                >8% on gross sales/receipts & other non-operating income in lieu of Graduated Rates under Sec. 24(A)(2)(a) & Percentage Tax under Sec. 116 of the NIRC, as amended [available if gross sales/receipts and other non-operating income do not exceed Three million pesos (P3M)]</template>
                <a-radio :value="'SOGS'">8% on gross sales/receipts & other non-operating income</a-radio>
              </a-tooltip>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="25A"
            :labelCol="form_layout.label_col"
            :wrapperCol="form_layout.wrapper_col"
          >
            <span style="margin-right: 14px">Method of Deduction:</span>
            <a-radio-group
              v-model="form.spouse_method_deduction"
              :disabled="form.taxpayer.filer_type == 'e' || form.spouse_rate == 'SGR'||  form.spouse_atc_code == 'SII015' || form.spouse_atc_code == 'SII017' ||form.spouse_atc_code == 'SII016' || form.spouse_atc_code == 'SII011' ||  
              form.taxpayer.filer_type == 't'"
            >
              <a-radio :value="'SID'">Itemized Deduction [Sec. 34(A-J), NIRC]</a-radio>
              <a-tooltip>
                <template
                  slot="title"
                >Optional Standard Deduction (OSD) [40% of Gross Sales/Receipts/Revenues/Fees[Sec. 34(L), NIRC]</template>
                <a-radio :value="'SOSD'">Optional Standard Deduction (OSD)</a-radio>
              </a-tooltip>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <!-- Part III -->
    <a-form v-show="step===3">
      <a-divider>
        <b>Part III: TOTAL TAX PAYABLE</b>
      </a-divider>
      <a-row :gutter="12">
        <a-col :span="12">
          <a-form-item style="margin-left: 75px;" label="A) Taxpayer/Filer"></a-form-item>
          <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}" label="26">
            <a-tooltip>
              <template
                slot="title"
              >Tax Due (From Part V, Schedule I-Item 46 OR Schedule II-Item 54)</template>
              <a-input-number
                style="width: 100%"
                disabled
                :value="total_tax_payable()"
                v-model="form.taxpayer_prev_tax_due"
                placeholder="Tax Due"
              ></a-input-number>
            </a-tooltip>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item style="margin-left: 75px;" label="B) Spouse"></a-form-item>
          <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}">
            <a-input-number
              style="width: 100%"
              v-model="form.spouse_prev_tax_due"
              placeholder="Tax Due"
              disabled
            ></a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
      <div style="font-size: 14px ; margin-left: 2.5vw">
        (From Part V,
        <span class="text-link" @click="openSched1()">Schedule I</span>-Item 46 OR (From Part V,
        <span class="text-link" @click="openSched2()">Schedule II</span>-Item 54)
      </div>
      <br />
      <!-- <a-button style="margin-left: 15px;" type="link" @click="sched = 1">Schedule I</a-button>
      <a-button style="margin-left: 15px;" type="link" @click="sched = 2">Schedule II</a-button>-->
      <a-row :gutter="6">
        <a-col :span="12">
          <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}" label="27">
            <a-tooltip>
              <template slot="title">Less: Tax Credits/Payments (From Part V, Schedule III-Item 62)</template>
              <a-input-number
                style="width: 100%"
                v-model="form.taxpayer_tax_credit"
                placeholder="Less: Tax Credits/Payments "
                disabled
              ></a-input-number>
            </a-tooltip>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}">
            <a-input-number style="width: 100%" v-model="form.spouse_tax_credit" disabled></a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
      <div style="font-size: 14px ; margin-left: 2.5vw">
        (From Part V,
        <span class="text-link" @click="openSched3()">Schedule III</span>-Item 62)
      </div>
      <br />
      <!-- <a-button style="margin-left: 15px;" type="link" @click="sched = 3">Schedule III</a-button> -->

      <a-row :gutter="6">
        <a-col :span="12">
          <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}" label="28">
            <a-tooltip>
              <template
                slot="title"
              >Tax Payable/(Overpayment) (Item 26 Less Item 27) (From Part V, Item 63)</template>
              <a-input-number
                style="width: 100%"
                :value="taxpayer_tax_due()"
                v-model="form.taxpayer_tax_due"
                placeholder="Tax Payable/(Overpayment)"
                disabled
              ></a-input-number>
            </a-tooltip>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}">
            <a-input-number
              style="width: 100%"
              :value="taxpayer_tax_due()"
              v-model="form.spouse_tax_due"
              placeholder="26 Less Item 27 From Part V,Item 63)"
              disabled
            ></a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
      <br />
      <a-row :gutter="6">
        <a-col :span="12">
          <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}" label="29">
            <a-tooltip>
              <template slot="title">Add: Total Penalties (From Part V, Schedule IV-Item 67)</template>
              <a-input-number
                style="width: 100%"
                v-model="form.taxpayer_total_penalties"
                placeholder="Total Penalties"
                disabled
              ></a-input-number>
            </a-tooltip>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}">
            <a-input-number style="width: 100%" v-model="form.spouse_total_penalties" disabled></a-input-number>
          </a-form-item>
        </a-col>
      </a-row>

      <div style="font-size: 14px ; margin-left: 2.5vw">
        (From Part V,
        <span class="text-link" @click="openSched4()">Schedule IV</span>-Item 67)
      </div>
      <br />
      <!-- <a-button style="margin-left: 15px;" type="link" @click="sched = 4">Schedule IV</a-button> -->

      <a-row :gutter="6">
        <a-col :span="12">
          <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}" label="30">
            <a-tooltip>
              <template slot="title">Total Amount Payable/ (Overpayment)</template>
              <a-input-number
                style="width: 100%"
                :value="taxpayer_total_amount_payable()"
                v-model="form.taxpayer_total_amount_payable"
                placeholder="Total Amount Payable/Overpayment"
                disabled
              ></a-input-number>
            </a-tooltip>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}">
            <a-input-number
              style="width: 100%"
              :value="taxpayer_total_amount_payable()"
              v-model="form.spouse_total_amount_payable"
              disabled
            ></a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
      <br />
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item :labelCol="{span: 3}" :wrapperCol="{span: 21}" label="31">
            <a-tooltip>
              <template slot="title">Aggregate Amount Payable/(Overpayment)</template>
              <a-input-number
                style="width: 100%"
                v-model="form.taxpayer_aggregate_amount_payable"
                placeholder="Aggregate Amount Payable/(Overpayment)"
                disabled
              ></a-input-number>
            </a-tooltip>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <sched1 v-if="sched == 1" :show="show" :form="form" @close="closeSched()"></sched1>
    <sched2 v-if="sched == 2" :show="show" :form="form" @close="closeSched()"></sched2>
    <sched3 v-if="sched == 3" :show="show" :form="form" @close="closeSched()"></sched3>
    <sched4 v-if="sched == 4" :show="show" :form="form" @close="closeSched()"></sched4>
  </div>
</template>

<script>
import sched1 from "./schedule1.vue";
import sched2 from "./schedule2.vue";
import sched3 from "./schedule3.vue";
import sched4 from "./schedule4.vue";
export default {
  components: {
    sched1,
    sched2,
    sched3,
    sched4
  },
  props: ["form", "step", "errors"],
  data() {
    return {
      sched: 0,
      show: 0,
      connections: [],
      sub: false,
      spouse_type_list_holder: null,
      SP: false,
      P: false,
      CE: false,
      // form_1601e_image,
      image_height: 1000,
      formatter: {
        amount: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, "-")
      },
      parser: {
        amount: value => value.replace(/\₱\s?|(,*)/g, "")
      },
      form_layout: {
        label_col: { span: 2 },
        wrapper_col: { span: 22 }
      },
      errors: []
    };
  },
  watch: {
    step() {
      if (this.step === 0) {
        this.form.pdf_page = 1;
      } else if (this.step === 1) {
        this.form.pdf_page = 1;
      } else if (this.step === 2) {
        this.form.pdf_page = 1;
      } else {
        this.form.pdf_page = 2;
      }
    },
    loading(val) {
      this.$emit("loading", val);
    },
    form: {
      deep: true,
      handler(val) {
        console.log("form :", JSON.stringify(val));
      }
    }
  },
  computed: {
    tax_due() {
      var tosum = [this.form];
    },
    computeReturnPeriod() {
      var return_period = new Date();
      return_period.setFullYear(this.form.returnPeriodYear);
      if (this.form.quarter === 1) {
        return_period.setMonth(2);
      } else if (this.form.quarter === 2) {
        return_period.setMonth(5);
      } else if (this.form.quarter === 3) {
        return_period.setMonth(8);
      }
      return return_period;
    }
  },
  methods: {
    openSched1() {
      this.sched = 1;
      this.show = 1;
      this.form.pdf_page = 2;
    },
    openSched2(){
      this.sched = 2
      this.show = 2
      this.form.pdf_page = 2
    },
    openSched3() {
      this.sched = 3;
      this.show = 3;
      this.form.pdf_page = 2;
    },
    openSched4() {
      this.sched = 4;
      this.show = 4;
      this.form.pdf_page = 2;
    },
    closeSched(){
      this.form.pdf_page = 1
      this.sched = 0
      this.show = 0
    },
    changeTaxNo() {
      if (this.form.taxpayer_foreign_tax_credits == false) {
        this.form.taxpayer_foreign_tax_number = "";
      }
    },
    changeSpouseTaxNo() {
      if (this.form.spouse_foreign_tax_credits == false) {
        this.form.spouse_foreign_tax_number = "";
      }
    },
    spouse_type() {
      console.log("this.SP :", this.SP);
      var holder = "";
      if (this.SP == true && this.P == true) {
        if (this.spouse_type_list_holder == true) {
          this.SP = true;
          this.P = false;
        }
      }
      if (this.SP == true && this.P == false) {
        this.P = false;
        holder = "SP";

        if (this.SP == true && this.P == false && this.CE == true) {
          holder = "SPCE";
        } else if (this.P == true && this.SP == false && this.CE == true) {
          holder = "PCE";
        }
      } else if (this.P == true) {
        this.SP = false;
        holder = "P";
        if (this.SP == true && this.P == false && this.CE == true) {
          holder = "SPCE";
        } else if (this.P == true && this.SP == false && this.CE == true) {
          holder = "PCE";
        }
      } else if (this.SP == false && this.P == false && this.CE == true) {
        holder = "CE";
      }
      console.log("holder :", holder);
      this.spouse_type_list_holder = this.P;
      this.form.spouse_atc_code = "";
      this.form.spouse_details.filer_type = holder;
      console.log(
        "spouse_tax_filter_type data: " + this.form.spouse_details.filer_type
      );
    },
    spouse_type_filter() {},
    professional(data) {
      if (data == "SP") {
        if (this.SP == true) {
          this.SP = false;
        } else {
          this.SP = true;
        }
      } else if (data == "P") {
        if (this.P == true) {
          this.P = false;
        } else {
          this.P = true;
        }
      }
    },
    CE() {
      this.CE == false ? (this.CE = true) : (this.CE = false);
    },
    total_tax_payable() {
      if (this.form.sched1.taxpayer.total_tax_due > 0) {
        this.form.taxpayer_prev_tax_due = this.form.sched1.taxpayer.total_tax_due;
        this.form.spouse_prev_tax_due = this.form.sched1.spouse.total_tax_due;
      } else if (this.form.sched2.taxpayer.total_tax_due > 0) {
        this.form.taxpayer_prev_tax_due = this.form.sched2.taxpayer.total_tax_due;
        this.form.spouse_prev_tax_due = this.form.sched2.spouse.total_tax_due;
      }

      // this.form.item27a = this.form.item62a;
      // this.form.item27b = this.form.item62b;
      // this.form.item28a = this.form.item26a - this.form.item27a;
      // this.form.item28b = this.form.item26b - this.form.item27b;
      // this.form.item29a = this.form.item67a;
      // this.form.item29b = this.form.item67b;
      // this.form.item30a = this.form.item28a + this.form.item29a;
      // this.form.item30b = this.form.item28b + this.form.item29b;
      // this.form.item31 = this.form.item30a + this.form.item30b;
    },
    taxpayer_tax_due() {
      // Item 26 Less Item 27
      this.form.taxpayer_tax_due =
        (this.form.taxpayer_prev_tax_due || 0) -
        (this.form.taxpayer_tax_credit || 0);
      this.form.spouse_tax_due =
        (this.form.spouse_prev_tax_due || 0) -
        (this.form.spouse_tax_credit || 0);
    },
    taxpayer_total_amount_payable() {
      // Sum of Items 28 and 29
      this.form.taxpayer_total_amount_payable = this.computeSum([
        this.form.taxpayer_tax_due,
        this.form.taxpayer_total_penalties
      ]);

      this.form.spouse_total_amount_payable = this.computeSum([
        this.form.spouse_tax_due,
        this.form.spouse_total_penalties
      ]);

      this.form.taxpayer_aggregate_amount_payable = this.computeSum([
        this.form.taxpayer_total_amount_payable,
        this.form.spouse_total_amount_payable
      ]);
    },
    item26b() {},
    save_draft() {},
    submit() {
      this.loading = true;
      this.errors = [];
      this.form.returnPeriod = this.computeReturnPeriod;
      this.$store
        .dispatch("VALIDATE_AND_SAVE", {
          form_type: "1701Q",
          form_details: this.form
        })
        .then(result => {
          if (result.data.errors && result.data.errors.length > 0) {
            this.errors = result.data.errors;
            console.log("this.errors :", this.errors);
            if (this.errors && this.errors[0] && this.errors[0].page !== null)
              this.$emit("changeStep", this.errors[0].page);
            this.$notification.error({ message: "Validation Error" });
          } else {
            this.$store.commit("REMOVE_DRAFT_FORM", this.$route.query.ref_no);
            this.$store.commit("NOTIFY_MESSAGE", {
              success: true,
              message: "Successfully submitted Form 1701q."
            });
            window.close();
          }
        })
        .catch(err => {
          console.log("VALIDATE_AND_SAVE", err);
          this.loading = false;
        });
    },
    atc_code_change() {
      this.form.taxpayer_atc_code = "";
    },
    changeATC(e) {
      const value = this.form.taxpayer_atc_code;
      console.log("change ATC value :", value);
      const for_gr = ["II012", "II014", "II013"];
      const for_gs = ["II015", "II017", "II016"];
      this.form.taxpayer_tax_rate = for_gr.includes(value)
        ? "GR"
        : for_gs.includes(value)
        ? "GS"
        : "";
    },
    changeSpouseATC(e) {
      const value = this.form.spouse_atc_code;
      const for_sgr = ["SII012", "SII014", "SII013"];
      const for_sogs = ["SII015", "SII017", "SII016"];
      this.form.spouse_tax_rate = for_sgr.includes(value)
        ? "SGR"
        : for_sogs.includes(value)
        ? "SOGS"
        : "";
    },
    error_item(item) {
      return this.errors.find(x => x.field === item) ? "error" : "";
    },
    changeStep(step, form) {
      this.$emit("changeStep", step);
      this.$emit("updateForm", form);
    },
    error_desc(item) {
      return this.errors.find(x => x.field === item)
        ? this.errors.find(x => x.field === item).error
        : "";
    },

    // insert validation
    validate(is_validate_all) {
      var errors = [];
      if (is_validate_all || this.step === 0) {
        if (!this.form.return_period_year) {
          errors.push({
            page: 0,
            field: "return_period_year",
            error: "Please enter a valid year"
          });
        }
        if (!this.form.quarter) {
          errors.push({
            page: 0,
            field: "quarter",
            error: "Please select Quarter in item 2"
          });
        }
      }
      if (is_validate_all || this.step === 1) {
        console.log(
          "this.form.taxpayer.filer_type) :",
          this.form.taxpayer.filer_type
        );
        if (!this.form.taxpayer.filer_type) {
          errors.push({
            page: 1,
            field: "taxpayer.filer_type",
            error: "Please select an option in Filer Type "
          });
        }
        if (!this.form.taxpayer_atc_code) {
          errors.push({
            page: 1,
            field: "taxpayer_atc_code",
            error: "Please select an option in ATC Code "
          });
        }
        if (!this.form.taxpayer.contact_details.email) {
          errors.push({
            page: 1,
            field: "taxpayer.contact_details.email",
            error: "Please enter a valid Email Address"
          });
        }
        if (!this.form.taxpayer.individual_details.birthDate) {
          errors.push({
            page: 1,
            field: "taxpayer.individual_details.birthDate",
            error: "Please enter your Date of Birth "
          });
        }
        if (!this.form.taxpayer.citizenship) {
          errors.push({
            page: 1,
            field: "taxpayer.citizenship",
            error: "Please enter Citizenship  "
          });
        }
        if (
          this.form.taxpayer_foreign_tax_credits === null ||
          (this.form.taxpayer_foreign_tax_credits === undefined &&
            this.form.taxpayer.taxpayer_foreign_tax_credits == false)
        ) {
          errors.push({
            page: 1,
            field: "taxpayer_foreign_tax_credits",
            error:
              "You selected Yes in item 15, please input Foreign Tax Number  "
          });
        }
        if (!this.form.taxpayer_method_deduction) {
          errors.push({
            page: 1,
            field: "taxpayer_method_deduction",
            error: "Please select an option for Method of Deduction"
          });
        }
      }
      this.$emit("error", errors);
      if (!errors.length) {
        this.changeStep(this.step + 1);
      }
    }
  },
  created() {
    this.form.pdf_page = 1;
    this.connections = this.$store.state.relationship.connections;
    console.log(
      "  " + JSON.stringify(this.$store.state.relationship.connections)
    );
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style>
p {
  margin-left: 22px;
  margin-top: -11px;
  margin-bottom: 1em;
}
/* .tax-form .computation-item {
  padding-left: 50px;
}

.tax-form .computation-item .ant-input-number {
  width: 40vh;
} */
</style>