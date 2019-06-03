export const routes = [
  {
    path: "/",
    // 默认进入控制台
    redirect: {
      name: "login"
    }
  },
  {
    path: "/login",
    name: "login",
    component: resolve => require(["@/pages/login/index.vue"], resolve)
  },
  /* 公司管理 */
  {
    path: "/index",
    name: "index",
    meta: { title: "公司库", keepAlive: false, scrollY: 0 },
    component: resolve => require(["@/pages/index/index.vue"], resolve)
  },
  // 审核管理
  {
    path: "/check",
    name: "check",
    meta: { title: "审核管理", keepAlive: true, scrollY: 0 },
    component: resolve => require(["../App.vue"], resolve),
    children: [
      {
        path: "companyCheck",
        name: "companyCheck",
        meta: { title: "公司审核管理", keepAlive: true, flag: "shenheguanli" },
        component: resolve =>
          require(["@/pages/companyCheck/index.vue"], resolve)
      },
      {
        path: "recruitmentOfficer",
        name: "recruitmentOfficer",
        meta: { title: "招聘官管理", keepAlive: true },
        component: resolve =>
          require(["@/pages/officerManage/index.vue"], resolve)
      }
    ]
  },
  /* 面试管理 */
  {
    path: "/interview",
    name: "interview",
    meta: { title: "面试管理", keepAlive: false, scrollY: 0 ,flag: "shenheguanli" },
    component: resolve => require(["../App.vue"], resolve),
    children: [
      {
        path: "List",
        name: "List",
        meta: { title: "申请列表管理", haveParent: false, keepAlive: true },
        component: resolve =>
          require(["@/pages/application/index.vue"], resolve)
      },
      {
        path: "invite",
        name: "invite",
        meta: { title: "邀请列表管理", haveParent: false, keepAlive: true },
        component: resolve => require(["@/pages/invite/index.vue"], resolve)
      }
    ]
  },
  /* 面试邀请列表 */
  // {
  //   path: "/interview/invite",
  //   name: "invite",
  //   meta: { title: "邀请列表管理", haveParent: false, keepAlive: true },
  //   component: resolve => require(["@/pages/invite/index.vue"], resolve)
  // },
  /* 面试申请列表 */
  // {
  //   path: "/interview/List",
  //   name: "application",
  //   meta: { title: "申请列表管理", haveParent: false, keepAlive: true },
  //   component: resolve => require(["@/pages/application/index.vue"], resolve)
  // },
  /* 招聘官管理 */
  //  {
  //   path: "/check/recruitmentOfficer",
  //   name: "recruitmentOfficer",
  //   meta: { title: "招聘官管理", keepAlive: true },
  //   component: resolve => require(["@/pages/officerManage/index.vue"], resolve)
  // },
  /* 公司审核管理 */
  // {
  //   path: "/check/companyCheck",
  //   name: "companyCheck",
  //   meta: { title: "公司审核管理", keepAlive: true, flag: "gongsiku" },
  //   component: resolve => require(["@/pages/companyCheck/index.vue"], resolve)
  // },
  /* 公司审核 */
  {
    path: "/check/companyCheck/verify",
    name: "companyCheckverify",
    meta: {
      title: "公司审核",
      haveParent: true,
      parentPath: "/check/companyCheck",
      parentName: "公司审核管理"
    },
    component: resolve => require(["@/pages/companyCheck/verify.vue"], resolve)
  },
  /* 编辑公司审核里的用户信息 */
  {
    path: "/check/companyCheck/editUser/:id",
    name: "editUser",
    meta: {
      title: "编辑用户信息",
      haveParent: true,
      parentPath: "/check/companyCheck",
      parentName: "公司审核管理"
    },
    component: resolve => require(["@/pages/user/addUser.vue"], resolve)
  },

  /* 编辑申请招聘官用户信息 */
  {
    path: "/check/recruitmentOfficer/editUser/:id",
    name: "editOfficerUser",
    meta: {
      title: "编辑招聘官信息",
      haveParent: true,
      parentPath: "/check/recruitmentOfficer",
      parentName: "招聘官审核"
    },
    component: resolve => require(["@/pages/user/addUser.vue"], resolve)
  },
  /* 招聘官审核详情 */
  {
    path: "/check/recruitmentOfficer/reviewDetails",
    name: "reviewDetails",
    meta: {
      title: "招聘官审核详情",
      haveParent: true,
      parentPath: "/check/recruitmentOfficer",
      parentName: "招聘官管理"
    },
    component: resolve =>
      require(["@/pages/officerManage/reviewDetails.vue"], resolve)
  },
  /* 编辑审核公司信息 */
  {
    path: "/check/companyCheck/:checkId",
    name: "editCheckCompany",
    meta: {
      title: "编辑公司信息",
      haveParent: true,
      parentPath: "/check/companyCheck",
      parentName: "公司审核管理"
    },
    component: resolve => require(["@/pages/createCompany/index.vue"], resolve)
  },
  /* 公司录入详情 */
  {
    path: "/index/companyInfo",
    name: "companyInfo",
    meta: {
      title: "公司详情",
      haveParent: true,
      parentPath: "/index",
      parentName: "公司库",
      flag: "gongsiku"
    },
    component: resolve => require(["@/pages/index/companyInfo.vue"], resolve)
  },

  /* 职位管理 */
  {
    path: "/positionManage",
    name: "positionManage",
    meta: { title: "职位管理", keepAlive: true },
    component: resolve => require(["@/pages/positionManage/index.vue"], resolve)
  },
  /* 职位审核详情 */
  {
    path: "/positionManage/positionAuditDetail",
    name: "positionAuditDetail",
    meta: {
      title: "职位审核详情",
      haveParent: true,
      parentPath: "/positionManage",
      parentName: "职位管理"
    },
    component: resolve =>
      require(["@/pages/positionAuditDetail/index.vue"], resolve)
  },
  /* 职位发布编辑 */
  {
    path: "/positionManage/positionPost",
    name: "positionPost",
    meta: {
      title: "职位发布",
      haveParent: true,
      parentPath: "/positionManage",
      parentName: "职位管理"
    },
    component: resolve => require(["@/pages/positionPost/index.vue"], resolve)
  },
  /* 创建公司 */
  {
    path: "/index/createCompany",
    name: "createCompany",
    meta: {
      title: "创建公司",
      haveParent: true,
      parentPath: "/index",
      parentName: "公司库"
    },
    component: resolve => require(["@/pages/createCompany/index.vue"], resolve)
  },
  /* 编辑公司信息 */
  {
    path: "/index/editCompany/:id",
    name: "editCompany",
    meta: {
      title: "编辑公司信息",
      haveParent: true,
      parentPath: "/index",
      parentName: "公司库"
    },
    component: resolve => require(["@/pages/createCompany/index.vue"], resolve)
  },

  /* 编辑身份信息 */
  {
    path: "/index/editIdentity",
    name: "editIdentity",
    meta: {
      title: "编辑身份信息",
      haveParent: true,
      parentPath: "/index",
      parentName: "公司库"
    },
    component: resolve =>
      require(["@/pages/editCompany/editIdentity.vue"], resolve)
  },

  /* 用户列表 */
  {
    path: "/user",
    name: "user",
    meta: { title: "用户管理", haveParent: false, keepAlive: true },
    component: resolve => require(["@/pages/user/index.vue"], resolve)
  },
  /* 添加用户 */
  {
    path: "/user/addUser",
    name: "addUser",
    meta: {
      title: "添加用户",
      haveParent: true,
      parentPath: "/user",
      parentName: "用户管理"
    },
    component: resolve => require(["@/pages/user/addUser.vue"], resolve)
  },
  /* 编辑用户 */
  {
    path: "/user/editUser/:id",
    name: "editUser",
    meta: {
      title: "编辑用户信息",
      haveParent: true,
      parentPath: "/user",
      parentName: "用户管理"
    },
    component: resolve => require(["@/pages/user/addUser.vue"], resolve)
  },
  /* 查看用户 */
  {
    path: "/user/userInfo/:id",
    name: "userInfo",
    meta: {
      title: "查看用户详情",
      haveParent: true,
      parentPath: "/user",
      parentName: "用户管理"
    },
    component: resolve => require(["@/pages/user/userInfo.vue"], resolve)
  },
  /* 编辑招聘官信息 */
  {
    path: "/user/editRecruiter/:id",
    name: "editRecruiter",
    meta: {
      title: "查看用户详情",
      haveParent: true,
      parentPath: "/user",
      parentName: "用户管理"
    },
    component: resolve => require(["@/pages/user/editRecruiter.vue"], resolve)
  },
  /* 简历库 */
  {
    path: "/resumeStore",
    name: "resumeStore",
    meta: { title: "简历库", haveParent: false, keepAlive: true },
    component: resolve =>
      require(["@/pages/resumeStore/resumeStore.vue"], resolve)
  },
  /* 简历详情 */
  {
    path: "/resumeDetails",
    name: "resumeDetails",
    meta: { title: "简历详情", haveParent: false, keepAlive: true },
    component: resolve =>
      require(["@/pages/resumeDetails/resumeDetails.vue"], resolve)
  }
];
