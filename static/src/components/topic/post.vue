<template>
  <div class="post">
    <div class="cancel">取消</div>
    <div class="post-topic">
      <textarea name="topic" id="post-content" placeholder="发表点什么吧..."></textarea>
      <div class="preview">
        <img :src="img" alt="" v-for="img in imgs">
        <div class="cover">
          上传照片
        </div>
        <input type="file" id="upload" @change="readFile($event)" accept="image/png,image/jpeg" multiple="multiple">
      </div>
      <!-- <slj-upload></slj-upload> -->
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
  .post-topic {
    position: relative;
    background: #fff;
    #post-content {
      width: 9.733333rem;
      border: 0px;
      height: 5.333333rem;
      border-bottom: 0.5px solid #ccc;
      padding: 0.133333rem;
      resize: none;
    }
    .cover, #upload {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #aaa;
      width: 2.0rem;
      height: 2.0rem;
      margin-left: 0.133333rem;
      z-index: 1;
      background: url('./../../assets/image/upload.png');
      background-size: cover;
    }
    .preview {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      bottom: 1.133333rem;
      left: 0.33333rem;
      img {
        width: 2.0rem;
        height: 2.0rem
      }
    }
    #upload {
      opacity: 0;
      z-index: 999;
      margin-left: -2.133333rem
    }
  }
  .operate {
    display: flex;
    justify-content: flex-end;
    background: #fff;
    padding: 0.266667rem 0.0rem;
    padding-right: 0.4rem;
  }
</style>

<script>
  export default {
    name: 'postTopic',
    data () {
      return {
        imgs: [],
        post: {
          topic_id: 1,
          post_user: '',
          topic_name: '',
          illustrations: null
        }
        // data: [{
        //   topic_id: 1,
        //   post_user: '乖宝宝',
        //   topic_name: '地主要榨干工人的血汗，包括他的胳膊'
        // }]
      }
    },
    methods: {
      publish () {
        let postContent = document.getElementById('post-content')
        this.post.topic_name = postContent.value
        this.post.illustrations = this.imgs
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
      },
      readFile (event) {
        var self = this
        let file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          self.imgs.push(e.target.result)
        }
      }
    },
    ready () {
      this.post.post_user = JSON.parse(window.localStorage.getItem('login_user')).username
    }
  }
</script>