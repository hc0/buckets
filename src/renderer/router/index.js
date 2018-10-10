import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'oss-page',
      component: require('@/components/oss.vue').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
