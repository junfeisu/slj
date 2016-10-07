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
    :type="post.comment_content === '' ? 'plain' : 'primary'" 
    size="small" 
    :topic-id="topic"
    :index="order" 
    v-show="isActive" 
    @click="send($event)">发送</slj-button>
</template>

<style lang="scss">
  input {
    border: 0px;
    height: 0.6rem;
    border: 1px solid #ccc;
    padding: 0px 0.1rem;
    font-size: 18px;
  }
  .evaluate {
    width: 9.4rem;
  }
  .evaluate-active {
    width: 8.033333rem;
  }
  .slj-btn-small {
    font-size: 18px;
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
          comment_user: JSON.parse(window.localStorage.getItem('login_user')).username,
          comment_category: 1,
          parent_id: null
        }
      }
    },
    methods: {
      hideSend (event) {
        if (this.post.comment_content === '') {
          this.isActive = false
          event.target.id = 'evaluate'
        }
      },
      send (event) {
        let index = event.target.getAttribute('index')
        console.log(index)
        this.post.parent_id = event.target.getAttribute('topic-id')
        res.comment.post_comment(this.post)
          .then(data => {
            if (data.msg === '评论成功') {
              this.$parent.topics[index].comments.push(data.comment)
              this.post.comment_content = ''
            }
          })
          .catch(error => {
            this.$root.add({type: 'error', msg: JSON.stringify(error)})
          })
      },
      showSend () {
        this.isActive = true
      }
    }
  }
</script>