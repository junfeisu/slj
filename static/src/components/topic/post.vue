<template>
  <div class="post">
    <div class="cancel">取消</div>
    <div class="post-topic">
      <textarea name="topic" id="post-content" placeholder="发表点什么吧..."></textarea>
    </div>
    <div class="operate">
      <slj-button type="primary" size="small" @click="publish()">发表</slj-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import './../../assets/style/mixin.scss';
  .post {
    width: 10rem;
    height: 6.666667rem;
    background: #fff;
  }
  .cancel {
    display: flex;
    width: 9.666667rem;
    height: 0.6rem;
    align-items: center;
    background: #2eb5f3;
    color: #fff;
    padding-left: 0.333333rem;
  }
  #post-content {
    width: 9.733333rem;
    border: 0px;
    height: 5.333333rem;
    border-bottom: 0.5px solid #ccc;
    padding: 10px;
    resize: none;
  }
  .operate {
    display: flex;
    justify-content: flex-end;
    margin-right: 0.4rem;
    font-size: 26px;
  }
</style>

<script>
  export default {
    name: 'postTopic',
    data () {
      return {
        post: {
          topic_id: 1,
          post_user: '',
          topic_name: ''
        }
      }
    },
    methods: {
      publish () {
        let postContent = document.getElementById('post-content')
        this.post.topic_name = postContent.value
        res.topic.post_topic(this.post)
          .then(data => {
            if (data.msg === '添加话题成功') {
              this.$root.add({type: 'success', msg: '发表成功'})
              this.$router.go({name: 'topicList'})
            }
          })
          .catch(error => {
            this.$root.add({type: 'error', msg: JSON.stringify(error)})
          })
      }
    },
    ready () {
      this.post.post_user = JSON.parse(window.localStorage.getItem('login_user')).username
    }
  }
</script>