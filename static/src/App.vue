<template>
  <div id="app">
    <slj-remind></slj-remind>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      add (data) {
        this.$root.$children[0].addRemind(data)
      }
    },
    ready () {
      let socket = window.io('http://115.159.224.128:8000')
      socket.on('connection', function () {
        socket.emit('addme', function () {
          console.log('addme')
        })
      })
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
    height: 100%;
    align-items: flex-start;
    flex-wrap: wrap;
    background: #eee;
  }
</style>
