<template>
  <div class="nav">
    <div class="bg"></div>
    <ul>
      <li v-link="{name: 'index'}">首页</li>
      <li v-link="{name: 'topic'}">话题</li>
      <li>留言册</li>
      <li>回忆相</li>
    </ul>
    <div class="add" @click="toPost()"></div>
    <img class="user" :src="userIcon" alt="">
  </div>
</template>

<script>
  export default {
    name: 'nav',
    data () {
      return {
        userIcon: ''
      }
    },
    methods: {
      toPost () {
        this.$route.router.go({name: 'postTopic'})
      }
    },
    ready () {
      let user = JSON.parse(window.localStorage.getItem('login_user'))
      console.log(user)
      user ? this.userIcon = user.photo : this.$router.go({name: 'login'})
    }
  }
</script>

<style lang="scss" scoped>
  @import './../assets/style/mixin.scss';
  .nav {
    display: flex;
    align-items: flex-end;
    width: 10rem;
    position: relative;
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
  .add {
    position: absolute;
    right: 0.4rem;
    top: 0.266667rem;
    width: 0.64rem;
    height: 0.64rem;
    background: url('./../assets/image/add.png');
    background-size: cover;
    z-index: 555;
  }
  .user {
    width: 0.96rem;
    height: 0.96rem;
    border-radius: 0.48rem;
    position: absolute;
    left: 0.266667rem;
    bottom: 1.266667rem;
  }
</style>