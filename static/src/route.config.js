import index from 'components/index/index.vue'

export default function config (router) {
  router.map({
    '/': {
      name: 'index',
      component: index,
      docTitle: '首页'
    },
    '/login': {
      name: 'login',
      component: resolve => {
        require.ensure(['./components/login/login.vue'], () => {
          resolve(require('./components/login/login.vue'))
        })
      },
      docTitle: '登录'
    },
    '/topic': {
      name: 'topic',
      component: resolve => {
        require.ensure(['./components/topic/topic.vue'], () => {
          resolve(require('./components/topic/topic.vue'))
        })
      },
      docTitle: '话题',
      subRoutes: {
        '/': {
          name: 'topicList',
          component: resolve => {
            require.ensure(['./components/topic/list.vue'], () => {
              resolve(require('./components/topic/list.vue'))
            })
          }
        },
        '/post': {
          name: 'postTopic',
          component: resolve => {
            require.ensure(['./components/topic/post.vue'], () => {
              resolve(require('./components/topic/post.vue'))
            })
          }
        }
      }
    }
  })
  router.afterEach(function (transition) {
    document.title = transition.to.docTitle || 'slj'
  })
}
