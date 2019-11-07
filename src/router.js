import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Style from './views/Style.vue'
import Components from './views/Components.vue'
import library from '@/assets/library'

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
      redirect: `/components/${library[0].name}`,
      component: Components,
      children: library.map((c) => ({
        path: c.name,
        name: c.name,
        component: c
      }))
    }
  ]
})
