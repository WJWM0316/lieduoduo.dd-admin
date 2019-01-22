export const routes = [
  {
    path: '/',
    // 默认进入控制台
    redirect: {
      name: 'index'
    }
  },
  /* 公司管理 */
  {
    path: '/index',
    name: 'index',
    component: resolve => require(['@/pages/index/index.vue'], resolve),
  },
  /* 审核管理 */
  {
    path: '/companyCheck',
    name: 'companyCheck',
    component: resolve => require(['@/pages/companyCheck/index.vue'], resolve),
  },
  {
    path: '/verify',
    name: 'verify',
    component: resolve => require(['@/pages/companyCheck/verify.vue'], resolve),
  },
  /* 招聘官管理 */
  {
    path: '/recruitmentOfficer',
    name: 'recruitmentOfficer',
    component: resolve => require(['@/pages/officerManage/index.vue'], resolve),
  },
  /* 职位管理 */
  {
    path: '/positionManage',
    name: 'positionManage',
    component: resolve => require(['@/pages/positionManage/index.vue'], resolve),
  },
]
