<template>
  <div id="app">
    <slj-nav></slj-nav>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style>
  html {
    width: 100%;
    height: 100%;
    font-family: 'Microsoft YaHei' !important;
  }
  body {
    height: 100%;
  }
  #app {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
