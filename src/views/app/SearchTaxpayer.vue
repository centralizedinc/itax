<template>
  <a-row>
    <a-col :span="24">
        <a-input-search
            placeholder="Search"
            @search="onSearch"
          />
    </a-col>
    <a-col :span="24" style="margin-top: 5vh">
    <a-card title="Taxpayer Details">
        <a-button type="primary">
            <a-icon type="download"></a-icon>
            Save
        </a-button>
    </a-card>
    </a-col>
  </a-row>
</template>

<script>
export default {

}
</script>

<style>

</style>