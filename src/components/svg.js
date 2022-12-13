import Vue from 'vue'
const Icon = () => import('@components/SvgIcon')
const components = {
  Icon
}
 
Object.keys(components).forEach(item => {
  Vue.component(item, components[item])
})