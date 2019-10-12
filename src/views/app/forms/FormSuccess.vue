<template>
  <a-modal :visible="show" title="Success">
    <a-card style="width:100%">
      <a-row type="flex" align="middle">
        <a-col :span="22">
            <a-avatar
              style="border: solid 1px #1cb5e0"
              :src="item.avatar"
              :size="64"
            />
          <p
              slot="title"
            >{{item.taxpayer_type=='I'?`${item.individual_details.lastName}, ${item.individual_details.firstName} ${item.individual_details.middleName}`:'item.corporate_details.registeredName'}}</p>
            <template slot="description">
              <p>{{formatTIN(item.tin)}}</p>
              <p>{{item.taxpayer_type=='I'?'Individual':'Non-Individual'}}</p>
            </template>
        </a-col>
        <a-col :span="2">
          <a-icon v-if="isSelected(index)" type="check" style="color:#115B95;font-size:24px"></a-icon>
        </a-col>
      </a-row>
    </a-card>
  </a-modal>
</template>

<script>
export default {
  props: ["show"]
};
</script>

<style>
</style>