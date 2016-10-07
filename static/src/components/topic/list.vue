<template>
  <slj-nav></slj-nav>
  <div class="list">
    <div class="specifc" v-for="topic in topics">
      <div class="user-message">
        <div class="user-icon">
          <img :src="topic.user.photo" alt="">
        </div>
        <div class="username">
          <div>{{topic.user.username}}</div>
          <div>{{topic.created | time_filter}}</div>
        </div>
      </div>
      <div class="topic-name">
        {{topic.topic_name}}
      </div>
      <div class="illustration">
        <img :src="illustration" alt="" v-for="illustration in topic.illustrations">
      </div>
      <div class="topic-comment">
        <div class="comment-specifc" v-for="comment in topic.comments" @click="autoFocus($event)" :name="comment.comment_user">
          <span class="comment-user">{{comment.comment_user}}:</span>
          <div class="comment-content">{{comment.comment_content}}</div>
        </div>
        <div class="comment-post">
          <input 
            id="evaluate" 
            type="text" 
            :placeholder="tip" 
            @focus="showSend()" 
            @blur="hideSend($event)" 
            v-model="post.comment_content"
          >
          <slj-button 
            :type="isNull ? 'plain' : 'primary'" 
            size="small" 
            :topic-id="topic.topic_id"
            :index="$index" 
            v-show="isActive[$index]" 
            @click="send($event)">发送</slj-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import './../../assets/style/mixin.scss';
  .list {
    width: 10rem;
    padding: 0.266667rem 0rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .specifc {
    width: 9.533333rem;
    display: flex;
    padding: 0.2rem 0.233333rem;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 0.4rem;
    background: #fff;
    .user-message {
      width: 100%;
      align-content: stretch;
      display: flex;
      flex-wrap: wrap;
      .user-icon {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      img {
        width: 0.64rem;
        height: 0.64rem;
        border-radius: 0.32rem;
      }
      .username {
        margin-left: 0.133333rem;
      }
    }
    .topic-name {
      width: 100%;
      padding: 0.266667rem 0rem;
      border-bottom: 1px solid #ccc;
    }
    .illustration {
      margin: 0.133333rem 0.0rem;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      img {
        width: 2.0rem;
        height: 2.0rem
      }
    }
    .comment-specifc {
      display: flex;
      margin-top: 0.133333rem;
      &:first-child {
        margin-top: 0.4rem;
      }
      .comment-user {
        color: #4285f4;
        cursor: pointer;
      }
      .comment-content {
        display: flex;
        flex-wrap: wrap;
        margin-left: 0.133333rem;
      }
    }
    .comment-post {
      width: 9.533333rem;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: space-around;
      margin-top: 0.4rem;
      input {
        border: 0px;
        height: 0.6rem;
        border: 1px solid #ccc;
        padding: 0px 0.1rem;
        font-size: 18px;
      }
      #evaluate {
        width: 9.4rem;
      }
      #evaluate-active {
        width: 8.033333rem;
      }
      button {
        font-size: 18px;
        height: 0.6rem;
      }
    }
  }
</style>

<script>
  export default {
    name: 'topicList',
    data () {
      return {
        isActive: false,
        isNull: true,
        post: {
          comment_content: '',
          comment_id: 1,
          comment_user: JSON.parse(window.localStorage.getItem('login_user')).username,
          comment_category: 1,
          parent_id: null
        },
        tip: '评论',
        topics: null
      }
    },
    methods: {
      autoFocus (event) {
        let target = event.target
        let className = target.className
        let parent = target.parentElement
        if (className === 'comment-specifc') {
          this.tip = '回复' + target.getAttribute('name') + ':'
        } else {
          this.tip = '回复' + parent.getAttribute('name') + ':'
        }
        this.showSend()
      },
      changeBtnStatus () {
        this.post.comment_content === '' ? this.isNull = true : this.isNull = false
      },
      getList () {
        // 获取所有的topic
        res.topic.get_alltopic()
          .then(data => {
            this.topics = data
          })
          .catch(error => {
            console.log(error)
          })
      },
      // 隐藏发送按钮
      hideSend (event) {
        if (this.post.comment_content === '') {
          this.isActive = false
          event.target.id = 'evaluate'
        }
      },
      send (event) {
        let index = event.target.getAttribute('index')
        this.post.parent_id = event.target.getAttribute('topic-id')
        res.comment.post_comment(this.post)
          .then(data => {
            if (data.msg === '评论成功') {
              console.log(data)
              console.log(this.topics[index].comments)
              this.topics[index].comments.push(data.comment)
            }
          })
          .catch(error => {
            this.$root.add({type: 'error', msg: JSON.stringify(error)})
          })
      },
      showSend () {
        let evaluate = document.getElementById('evaluate')
        if (evaluate !== null) {
          this.isActive = true
          evaluate.id = 'evaluate-active'
        }
      }
    },
    watch: {
      // 监测评论框的内容
      'post.comment_content': 'changeBtnStatus',
      deep: true
    },
    ready () {
      this.getList()
    }
  }
</script>