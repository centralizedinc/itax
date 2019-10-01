<template>
  
</template>

<script>
export default {
  props: ['on', 'actions'],

  render: () => null,

  created () {
    const {on, actions: {toggleExpandCollapse}} = this;

    on('clicked', ({element}) => {
      console.log('element', JSON.stringify(element));
    })
  }
}
</script>

<style>

</style>