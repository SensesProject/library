import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Style from './views/Style.vue'
import Components from './views/Components.vue'
import library from '@/assets/library.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/style',
      name: 'style',
      component: Style
    },
    {
      path: '/components',
      name: 'components',
      component: Components,
      children: library.map(({ name }) => ({
        path: `${name}`,
        component: () => import(`@/components/${name}.vue`)
      }))
    }
  ]
})
