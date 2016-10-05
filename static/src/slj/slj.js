import sljBtn from './slj-button.vue'
import sljNav from './nav.vue'
import sljRemind from './slj-remind.vue'

const sljComponent = {}

sljComponent.install = function (Vue) {
  Vue.component('slj-button', sljBtn)
  Vue.component('slj-nav', sljNav)
  Vue.component('slj-remind', sljRemind)
}

export default sljComponent
