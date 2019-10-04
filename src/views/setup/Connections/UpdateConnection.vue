<template>
  <a-modal :visible="show" title="Update Taxpayer">
      <a-form>
        <a-form-item>
            <a-input></a-input>
        </a-form-item>
      </a-form>
  </a-modal>
</template>

<script>
export default {
    props: ["show", "details"]
}
</script>

<style>

</style>