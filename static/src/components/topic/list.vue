<template>
  <slj-nav></slj-nav>
  <slj-image-modal></slj-image-modal>
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
      <div class="illustration" @click="showModal($event)">
        <img 
          :src="illustration" 
          v-for="illustration in topic.illustrations">
      </div>
      <div class="topic-comment" :topic-id="topic.topic_id">
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
      justify-content: space-around;
      flex-wrap: wrap;
      img {
        width: 3rem;
        height: 3rem;
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
      // 当点击具体的评论时自动聚焦评论框，并且获取你想回复的用户名
      autoFocus (event) {
        let target = event.target
        let className = target.className
        let parent = target.parentElement
        let commentTarget = className === 'comment-specifc' ? target : parent
        let index = +commentTarget.getAttribute('index')
        let childrenComment = this.$children[index + 2]
        childrenComment.tip = '回复' + commentTarget.getAttribute('name')
        commentTarget.parentElement.querySelector('input').focus()
      },
      getList () {
        // 获取所有的topic
        res.topic.get_alltopic()
          .then(data => {
            this.topics = data.reverse()
          })
          .catch(error => {
            console.log(error)
          })
      },
      showModal (event) {
        let target = event.target
        console.log(this.$children[1])
        if (target.nodeName === 'IMG') {
          console.log('123')
          this.$children[1].isModal = true
          this.$children[1].imageSrc = target.getAttribute('src')
        }
      }
    },
    ready () {
      this.getList()
    }
  }
</script>