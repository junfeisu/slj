<template>
  <input 
    :class="isActive ? 'evaluate-active' : 'evaluate'" 
    type="text" 
    :placeholder="tip" 
    @focus="showSend()" 
    @blur="hideSend($event)"
    v-model="post.comment_content"
  >
  <slj-button 
    :type="post.comment_content ? 'primary' : 'plain'" 
    size="small" 
    :topic-id="topic"
    :index="order" 
    v-show="isActive" 
    @click="send($event)"
  >发送</slj-button>
</template>

<style lang="scss">
  input {
    border: 0px;
    height: 0.6rem;
    border: 0.5px solid #ccc;
    padding: 0px 0.1rem;
    font-size: 16px;
    &:focus {
      border-color: #07A7F1
    }
  }
  .evaluate {
    width: 9.4rem;
  }
  .evaluate-active {
    width: 8.033333rem;
  }
  .slj-btn-small {
    height: 0.6rem;
  }
</style>

<script>
  export default {
    name: 'sljComment',
    props: {
      order: {
        type: Number
      },
      tip: {
        type: String,
        default: '评论'
      },
      topic: {
        type: Number
      }
    },
    data () {
      return {
        isActive: false,
        post: {
          comment_content: '',
          comment_id: 1,
          comment_user: '',
          comment_category: 1,
          parent_id: null
        },
        storageMes: ''
      }
    },
    methods: {
      // 是否显示发送按钮
      hideSend (event) {
        let self = this
        let sljBtnPrimary = document.querySelector('.slj-btn-primary')
        if (sljBtnPrimary) {
          sljBtnPrimary.onclick = function (event) {
            self.send(event)
          }
          self.initState()
        } else {
          self.initState()
        }
      },
      initState () {
        this.isActive = false
        this.tip = '评论'
        if (this.post.comment_content !== '') {
          this.storageMes = this.post.comment_content
        }
        this.post.comment_content = ''
      },
      send (event) {
        if (this.post.comment_content) {
          console.log('send')
          let self = this
          let io = window.io('http://127.0.0.1:8000')
          let index = event.target.getAttribute('index')
          let comment = self.post
          self.post.parent_id = event.target.getAttribute('topic-id')
          io.emit('comment', comment)
          // 评论成功之后刷新列表,清空缓存信息和内容
          io.on('comment_update', function (res) {
            console.log('update')
            self.$parent.topics[index].comments.push(res)
            self.post.comment_content = ''
            self.storageMes = ''
          })
          io.on('comment_error', function (err) {
            console.log('error')
            self.$root.add({msg: JSON.stringify(err), type: 'error'})
          })
        }
      },
      // 显示发送按钮
      showSend () {
        this.isActive = true
        this.post.comment_content = this.storageMes
      },
      // 在输入框激活的状态下保持缓存信息和输入框内容一致
      keepStorageMes () {
        if (this.isActive) {
          this.storageMes = this.post.comment_content
        }
      }
    },
    watch: {
      'post.comment_content': {
        handler: 'keepStorageMes',
        deep: true
      }
    },
    ready () {
      let loginUser = window.localStorage.getItem('login_user')
      this.post.comment_user = loginUser ? loginUser.username : this.$router.go({name: 'login'})
    }
  }
</script>