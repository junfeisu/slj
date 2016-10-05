<template>
  <div class="background"></div>
  <div class="login">
    <div class="username">
      <input type="text" v-model="username" placeholder="用户名">
    </div>
    <div class="password">
      <input type="password" placeholder="密码" v-model="password">
    </div>
    <div class="operate">
      <slj-button :type="primary" :size="normal" @click="login()">登录</slj-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../assets/style/mixin.scss';
  .background {
    @include fullscreen;
    background: url('../../assets/image/background.jpg');
    background-size: cover;
  }
  .login {
    display: flex;
    z-index: 1;
    width: 8.0rem;
    height: 5.0rem;
    @include line-center;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background: #fff;
    opacity: 0.7;
    border-radius: 0.066667rem;
    .username {
      display: flex;
      width: 6.666667rem;
    }
    .password {
      display: flex;
      width: 6.666667rem;
    }
    .operate {
      display: flex;
      width: 6.666667rem;
      justify-content: center;
    }
    input {
      width: 6.4rem;
      height: 0.666667rem;
      border: 1px solid #ccc;
      padding: 0.0rem 0.093333rem;
      outline: none;
      border-radius: 0.066667rem;
      &:focus {
        border: 1px solid #4285f4;
      }
    }
  }
</style>

<script>
  export default {
    name: 'login',
    data () {
      return {
        password: '',
        username: ''
      }
    },
    methods: {
      login () {
        res.user.post_login({
          password: this.password,
          username: this.username
        })
          .then(data => {
            if (data.msg === '登录成功') {
              window.localStorage.setItem('login_user', JSON.stringify(data.user))
              this.$router.go({name: 'index'})
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>