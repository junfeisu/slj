import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import config from './route.config'
import sljComponent from './slj/slj'
import res from '../res.js'

Vue.use(VueRouter)
Vue.use(sljComponent)

const router = new VueRouter({
  saveScrollPosition: true,
  history: true
})

window.res = res
config(router)

router.start(App, 'App')
