import Vue from 'vue'
import Router from 'vue-router'

import {login} from '@/router/login'
import {companyManage} from '@/router/companyManage'
import {platformManage} from '@/router/platformManage'
import {recruiterManage} from '@/router/recruiterManage'
import {userManage} from '@/router/userManage'
import {verifyManage} from '@/router/verifyManage'

let routes = [
  ...login,
  ...platformManage,
  ...companyManage,
  ...userManage,
  ...recruiterManage,
  ...verifyManage
]

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes,
  // linkActiveClass:'pathactive',
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    } else {
      return savedPosition ? savedPosition : { x: 0, y: 0 }
    } 
  }
})
router.beforeEach((to, from, next) => {
  if (from.name !== to.name) {
    window.scrollTo(0, 0)
  }
  if (to.path === '/check') {
    next('/check/companyCheck')
  } else {
    next(true)
  }
})

export default router

