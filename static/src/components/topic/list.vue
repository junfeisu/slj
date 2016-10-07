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
        <div :index="$parent.$index" class="comment-specifc" v-for="comment in topic.comments" @click="autoFocus($event)" :name="comment.comment_user">
          <span class="comment-user">{{comment.comment_user}}:</span>
          <div class="comment-content">{{comment.comment_content}}</div>
        </div>
        <div class="comment-post">
          <slj-comment :topic="topic.topic_id" :order="$index"></slj-comment>
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
    }
  }
</style>

<script>
  export default {
    name: 'topicList',
    data () {
      return {
        topics: null,
        placeholder: []
      }
    },
    methods: {
      autoFocus (event) {
        let target = event.target
        let className = target.className
        let parent = target.parentElement
        let index = ''
        if (className === 'comment-specifc') {
          index = +target.getAttribute('index')
          this.$children[index + 1].tip = '回复' + target.getAttribute('name') + ':'
        } else {
          index = +parent.getAttribute('index')
          this.$children[index + 1].tip = '回复' + parent.getAttribute('name') + ':'
        }
        this.$children[index + 1].showSend()
      },
      getList () {
        // 获取所有的topic
        res.topic.get_alltopic()
          .then(data => {
            this.topics = data
            this.topics.forEach(() => {
              this.placeholder.push('评论')
            })
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    ready () {
      this.getList()
      console.log(this.$children)
    }
  }
</script>