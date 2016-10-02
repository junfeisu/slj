import sljBtn from './slj-button.vue'
import sljNav from './nav.vue'

const sljComponent = {}

sljComponent.install = function (Vue) {
  Vue.component('slj-button', sljBtn)
  Vue.component('slj-nav', sljNav)
}

export default sljComponent
