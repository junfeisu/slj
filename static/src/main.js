import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import config from './route.config'
import sljComponent from './slj/slj'
import res from '../res.js'
import filter from './filter.js'

Vue.use(VueRouter)
Vue.use(filter)
Vue.use(sljComponent)

const router = new VueRouter({
  saveScrollPosition: true
})

window.res = res
config(router)

router.start(App, 'App')
