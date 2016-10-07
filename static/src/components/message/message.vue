<template>
  <div class="message">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
  .message {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
  }
</style>

<script>
  export default {
    name: 'message',
    data () {
      return {}
    }
  }
</script>