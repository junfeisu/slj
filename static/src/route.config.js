import index from 'components/index/index.vue'

import login from 'components/login/login.vue'

import topic from 'components/topic/topic.vue'
import topicList from 'components/topic/list.vue'
import postTopic from 'components/topic/post.vue'

export default function config (router) {
  router.map({
    '/': {
      name: 'index',
      component: index,
      docTitle: '首页'
    },
    '/login': {
      name: 'login',
      component: login,
      docTitle: '登录'
    },
    '/topic': {
      name: 'topic',
      component: topic,
      docTitle: '话题',
      subRoutes: {
        '/': {
          name: 'topicList',
          component: topicList
        },
        '/post': {
          name: 'postTopic',
          component: postTopic
        }
      }
    }
  })
  router.afterEach(function (transition) {
    document.title = transition.to.docTitle || 'slj'
  })
}
