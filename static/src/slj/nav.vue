<template>
  <div class="nav">
    <div class="bg"></div>
    <ul>
      <li v-link="{name: 'index'}">首页</li>
      <li v-link="{name: 'topic'}">话题</li>
      <li>留言册</li>
      <li>回忆相</li>
    </ul>
  </div>
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
  @import './../assets/style/mixin.scss';
  .nav {
    display: flex;
    align-items: flex-end;
  }
  .bg {
    @include fullscreen;
    background: url('http://7xrp7o.com1.z0.glb.clouddn.com/baby.png');
    background-position: 0% 70%;
    background-size: cover;
    height: 6.0rem;
  }
  ul {
    display: flex;
    width: 10.0rem;
    height: 0.8rem;
    background: rgba(0, 0, 0, .7);
    color: #fff;
    justify-content: space-around;
    align-items: center;
    z-index: 99;
    margin-top: 5.2rem;
  }
  li {
    display: flex;
    justify-content: center;
    height: 0.4rem;
    align-items: center;
    flex: 1;
    border-right: 1px solid #fff;
    &:last-child {
      border-right: 0.0rem;
    }
  }
</style>