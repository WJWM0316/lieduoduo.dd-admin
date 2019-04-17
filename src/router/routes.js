export const routes = [
  {
    path: '/',
    // 默认进入控制台
    redirect: {
      name: 'login'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/pages/login/index.vue'], resolve),
  },
  /* 公司管理 */
  {
    path: '/index',
    name: 'index',
    meta: {title: '公司库', keepAlive: true, scrollY: 0},
    component: resolve => require(['@/pages/index/index.vue'], resolve),
  },
  /* 公司审核管理 */
  {
    path: '/companyCheck',
    name: 'companyCheck',
    meta: {title: '公司审核管理', keepAlive: true},
    component: resolve => require(['@/pages/companyCheck/index.vue'], resolve),
  },
  /* 公司录入详情 */
  {
    path: '/index/companyInfo',
    name: 'companyInfo',
    meta: {title: '公司详情', haveParent: true, parentPath: '/index', parentName: '公司库'},
    component: resolve => require(['@/pages/index/companyInfo.vue'], resolve),
  },
  /* 公司审核 */
  {
    path: '/companyCheck/verify',
    name: 'companyCheckverify',
    meta: {title: '公司审核', haveParent: true, parentPath: '/companyCheck', parentName: '公司审核管理'},
    component: resolve => require(['@/pages/companyCheck/verify.vue'], resolve),
  },
  /* 招聘官管理 */
  {
    path: '/recruitmentOfficer',
    name: 'recruitmentOfficer',
    meta: {title: '招聘官管理', keepAlive: true},
    component: resolve => require(['@/pages/officerManage/index.vue'], resolve),
  },
  /* 招聘官审核详情 */
  {
    path: '/recruitmentOfficer/reviewDetails',
    name: 'reviewDetails',
    meta: {title: '招聘官审核详情', haveParent: true, parentPath: '/recruitmentOfficer', parentName: '招聘官管理'},
    component: resolve => require(['@/pages/officerManage/reviewDetails.vue'], resolve),
  },
  /* 职位管理 */
  {
    path: '/positionManage',
    name: 'positionManage',
    meta: {title: '职位管理', keepAlive: true},
    component: resolve => require(['@/pages/positionManage/index.vue'], resolve),
  },
  /* 职位审核详情 */
  {
    path: '/positionManage/positionAuditDetail',
    name: 'positionAuditDetail',
    meta: {title: '职位审核详情', haveParent: true, parentPath: '/positionManage', parentName: '职位管理'},
    component: resolve => require(['@/pages/positionAuditDetail/index.vue'], resolve),
  },
  /* 职位发布编辑 */
  {
    path: '/positionManage/positionPost',
    name: 'positionPost',
    meta: {title: '职位发布', haveParent: true, parentPath: '/positionManage', parentName: '职位管理'},
    component: resolve => require(['@/pages/positionPost/index.vue'], resolve),
  },
  /* 创建公司 */
  {
    path: '/index/createCompany',
    name: 'createCompany',
    meta: {title: '创建公司', haveParent: true, parentPath: '/index', parentName: '公司库'},
    component: resolve => require(['@/pages/createCompany/index.vue'], resolve)
  },
  /* 编辑公司信息 */
  {
    path: '/index/editCompany/:id',
    name: 'editCompany',
    meta: {title: '编辑公司信息', haveParent: true, parentPath: '/index', parentName: '公司库'},
    component: resolve => require(['@/pages/createCompany/index.vue'], resolve)
  },
  /* 编辑身份信息 */
  {
    path: '/index/editIdentity',
    name: 'editIdentity',
    meta: {title: '编辑身份信息', haveParent: true, parentPath: '/index', parentName: '公司库'},
    component: resolve => require(['@/pages/editCompany/editIdentity.vue'], resolve)
  },
  /* 面试申请列表 */
  {
    path: '/interview',
    name: 'application',
    meta: {title: '申请列表管理', haveParent: false, keepAlive: true},
    component: resolve => require(['@/pages/application/index.vue'], resolve)
  },
  /* 面试邀请列表 */
  {
    path: '/interview/invite',
    name: 'invite',
    meta: {title: '邀请列表管理', haveParent: false, keepAlive: true},
    component: resolve => require(['@/pages/invite/index.vue'], resolve)
  },
  /* 用户列表 */
  {
    path: '/user',
    name: 'user',
    meta: {title: '用户管理', haveParent: false, keepAlive: true},
    component: resolve => require(['@/pages/user/index.vue'], resolve)
  },
  /* 添加用户 */
  {
    path: '/user/addUser',
    name: 'addUser',
    meta: {title: '用户管理', haveParent: false, keepAlive: true},
    component: resolve => require(['@/pages/user/addUser.vue'], resolve)
  }
]
