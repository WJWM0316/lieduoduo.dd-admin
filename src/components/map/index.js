import mapSearch from './map.vue'
mapSearch.install = function (Vue) {
  Vue.component(mapSearch.options.name, mapSearch)
}

export default mapSearch
