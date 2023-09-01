import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: require('@/components/Login').default,
    },
    {
      path: '/protal',
      name: 'protal',
      component: require('@/components/ProtalMain').default
    },
    {
      path: '/msg',
      name: 'msg',
      component: require('@/components/MsgMain').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
