const MyFilter = {}

MyFilter.install = function (Vue) {
  Vue.filter('time_filter', value => {
    return value.substring(5, 10)
  })
}

export default MyFilter
