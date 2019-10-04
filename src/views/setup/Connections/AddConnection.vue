<template>
  <a-modal
      :visible="showAddTP"
      @cancel="$emit('showAddTP', false)"
      title="Add Taxpayer"
      :footer="null"
    >
      <a-form>
        <a-form-item
          label="Search By TIN"
          :validate-status="relationship_status"
          :help="relationship_status === 'error' ? 'Relationship is required.' : ''"
        >
          <a-select
            style="width: 25%"
            @change="relationship = $event"
            v-bind="default_relationship ? { defaultValue: default_relationship } : {}"
            placeholder="Relationship"
            :disabled="loading_submit"
          >
            <a-select-option
              v-for="(item, index) in relationships"
              :key="index"
              :value="item"
            >{{item}}</a-select-option>
          </a-select>
          <a-input-search
            style="width: 75%"
            v-model="search_tin"
            placeholder="Search TIN"
            @search="getDataByTIN"
            enterButton
            :loading="loading"
            :disabled="loading_submit"
          />
        </a-form-item>
      </a-form>
      <div v-if="loading" class="align-items-middle">
        <a-spin />
      </div>
      <template v-else-if="is_busy">
        <a-card
          :bodyStyle="{ padding: '2vh' }"
          v-if="taxpayer && Object.keys(taxpayer).length && user && Object.keys(user).length"
        >
          <a-avatar
            :src="user && user.avatar ? user.avatar.location : null"
          >{{user && user.name && user.name.first ? user.name.first[0] : '?' }}</a-avatar>
          <span
            style="margin-left: 1vh;font-weight:bold;"
          >{{taxpayer.individual_details.firstName}} {{taxpayer.individual_details.lastName}}</span>
          <a-button
            style="float: right;"
            :type="check_connectivity ? 'danger' : 'primary'"
            @click="connect"
          >{{ check_connectivity ? 'Remove Connection' : 'Connect'}}</a-button>
        </a-card>
        <div v-else-if="search_tin && search_tin.length > 12">
          <p
            style="font-style: italic;font-size: 12px;"
          >Taxpayer does not exist. Please input the details of the TIN owner.</p>
          <a-form>
            <a-form-item
              label="Taxpayer Type"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-radio-group
                buttonStyle="solid"
                v-model="new_taxpayer.taxpayer_type"
                :disabled="loading_submit"
              >
                <a-radio-button value="I">Individual</a-radio-button>
                <a-radio-button value="C">Corporate</a-radio-button>
              </a-radio-group>
            </a-form-item>
            <a-form-item
              label="Email"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                v-model="new_taxpayer.email"
                placeholder="Email"
                :disabled="loading_submit"
                @keypress.enter="addTaxpayer"
              />
            </a-form-item>
            <a-form-item
              label="First Name"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                v-model="new_taxpayer.first_name"
                placeholder="First Name"
                :disabled="loading_submit"
                @keypress.enter="addTaxpayer"
              />
            </a-form-item>
            <a-form-item
              label="Last Name"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                v-model="new_taxpayer.last_name"
                placeholder="Last Name"
                :disabled="loading_submit"
                @keypress.enter="addTaxpayer"
              />
            </a-form-item>
            <a-button block type="primary" @click="addTaxpayer" :loading="loading_submit">Submit</a-button>
          </a-form>
        </div>
        <span v-else style="font-style: italic;">Invalid input TIN</span>
      </template>
    </a-modal>
</template>

<script>
export default {
    props: ["showAddTP"]
}
</script>

<style>

</style>