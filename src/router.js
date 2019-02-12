import Vue from 'vue'
import Router from 'vue-router'
import Style from './views/Style.vue'
import Components from './views/Components.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'style',
      component: Style
    },
    {
      path: '/components',
      name: 'components',
      component: Components
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
