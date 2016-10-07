import sljBtn from './slj-button.vue'
import sljNav from './nav.vue'
import sljRemind from './slj-remind.vue'
import sljUpload from './slj-upload.vue'
import sljComment from './slj-comment.vue'

const sljComponent = {}

sljComponent.install = function (Vue) {
  Vue.component('slj-button', sljBtn)
  Vue.component('slj-nav', sljNav)
  Vue.component('slj-remind', sljRemind)
  Vue.component('slj-upload', sljUpload)
  Vue.component('slj-comment', sljComment)
}

export default sljComponent
