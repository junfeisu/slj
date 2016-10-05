<template>
  <div class="topic">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
  .topic {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
  }
</style>

<script>
  export default {
    name: 'topic',
    data () {
      return {}
    }
  }
</script>