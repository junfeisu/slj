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
          <div>{{topic.created}}</div>
        </div>
      </div>
      <div class="topic-name">
        {{topic.topic_name}}
      </div>
      <div class="topic-comment">
        <div class="comment-specifc" v-for="comment in topic.comments">
          <span class="comment-user">{{comment.comment_user}}</span>
          <div class="comment-content">{{comment.comment_content}}</div>
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
    width: 10rem;
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
    }
  }
</style>

<script>
  export default {
    name: 'topicList',
    data () {
      return {
        topics: null
      }
    },
    methods: {
      getList () {
        res.topic.get_alltopic()
          .then(data => {
            this.topics = data
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    ready () {
      this.getList()
    }
  }
</script>