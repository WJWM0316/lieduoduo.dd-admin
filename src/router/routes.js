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
    meta: {title: '公司管理'},
    component: resolve => require(['@/pages/index/index.vue'], resolve),
  },
  /* 公司审核管理 */
  {
    path: '/companyCheck',
    name: 'companyCheck',
    meta: {title: '公司审核管理'},
    component: resolve => require(['@/pages/companyCheck/index.vue'], resolve),
  },
  /* 公司审核详情 */
  {
    path: '/verify',
    name: 'verify',
    meta: {title: '公司审核详情', haveParent: true, parentPath: '/companyCheck', parentName: '公司审核管理'},
    component: resolve => require(['@/pages/companyCheck/verify.vue'], resolve),
  },
  /* 招聘官管理 */
  {
    path: '/recruitmentOfficer',
    name: 'recruitmentOfficer',
    meta: {title: '招聘官管理'},
    component: resolve => require(['@/pages/officerManage/index.vue'], resolve),
  },
  /* 招聘官审核详情 */
  {
    path: '/reviewDetails',
    name: 'reviewDetails',
    meta: {title: '招聘官审核详情', haveParent: true, parentPath: '/recruitmentOfficer', parentName: '招聘官管理'},
    component: resolve => require(['@/pages/officerManage/reviewDetails.vue'], resolve),
  },
  /* 职位管理 */
  {
    path: '/positionManage',
    name: 'positionManage',
    meta: {title: '职位管理'},
    component: resolve => require(['@/pages/positionManage/index.vue'], resolve),
  },
  /* 创建公司 */
  {
    path: '/createCompany',
    name: 'createCompany',
    meta: {title: '创建公司', haveParent: true, parentPath: '/companyCheck', parentName: '公司审核管理'},
    component: resolve => require(['@/pages/createCompany/index.vue'], resolve),
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/pages/login/index.vue'], resolve),
  }
]
