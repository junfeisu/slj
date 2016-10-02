<template>
  <ul>
    <li v-link="{name: 'index'}">首页</li>
    <li v-link="{name: 'topic'}">话题</li>
    <li>留言册</li>
    <li>回忆相</li>
  </ul>
</template>

<script>
  export default {
    name: 'nav',
    data () {
      return {}
    }
  }
</script>

<style lang="scss">
  ul {
    display: flex;
    position: fixed;
    width: 10.0rem;
    height: 0.8rem;
    background: rgba(0, 0, 0, .7);
    color: #fff;
    left: 0;
    top: 0;
    justify-content: space-around;
    align-items: center;
  }
  li {
    display: flex;
    justify-content: center;
    height: 0.4rem;
    align-items: center;
    flex: 1;
    border-right: 1px solid #fff
  }
</style>