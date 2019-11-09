// export const routes = [
//   {
//     path: "/",
//     // 默认进入控制台
//     redirect: {
//       name: "login"
//     }
//   },
  
  
  
//   // 审核管理
//   {
//     path: "/check",
//     name: "check",
//     meta: { title: "审核管理", keepAlive: false, scrollY: 0, flag: "check" },
//     component: resolve => require(["../App.vue"], resolve),
//     children: [
//       {
//         path: "companyCheck",
//         name: "companyCheck",
//         meta: { title: "公司审核管理", keepAlive: false, flag: "check" },
//         component: resolve =>
//           require(["@/pages/companyCheck/index.vue"], resolve)
//       },
//       {
//         path: "recruitmentOfficer",
//         name: "recruitmentOfficer",
//         meta: { title: "招聘官管理", keepAlive: false, flag: "check" },
//         component: resolve =>
//           require(["@/pages/officerManage/index.vue"], resolve)
//       }
//     ]
//   },
//   {
//     path: "/check/companyCheck/verify",
//     name: "companyCheckverify",
//     meta: {
//       title: "公司审核",
//       haveParent: true,
//       keepAlive: false,
//       parentPath: "/check/companyCheck",
//       parentName: "公司审核管理"
//     },
//     component: resolve => require(["@/pages/companyCheck/verify.vue"], resolve)
//   },
//   /* 编辑公司审核里的用户信息 */
//   {
//     path: "/check/companyCheck/editUser/:id",
//     name: "editUser",
//     meta: {
//       title: "编辑用户信息",
//       haveParent: true,
//       parentPath: "/check/companyCheck",
//       parentName: "公司审核管理"
//     },
//     component: resolve => require(["@/pages/user/addUser.vue"], resolve)
//   },

//   /* 编辑申请招聘官用户信息 */
//   {
//     path: "/check/recruitmentOfficer/editUser/:id",
//     name: "editOfficerUser",
//     meta: {
//       title: "编辑招聘官信息",
//       haveParent: true,
//       parentPath: "/check/recruitmentOfficer",
//       parentName: "招聘官审核"
//     },
//     component: resolve => require(["@/pages/user/addUser.vue"], resolve)
//   },
//   /* 招聘官审核详情 */
//   {
//     path: "/check/recruitmentOfficer/reviewDetails",
//     name: "reviewDetails",
//     meta: {
//       title: "招聘官审核详情",
//       haveParent: true,
//       parentPath: "/check/recruitmentOfficer",
//       parentName: "招聘官管理"
//     },
//     component: resolve =>
//       require(["@/pages/officerManage/reviewDetails.vue"], resolve)
//   },
//   /* 编辑审核公司信息 */
//   {
//     path: "/check/companyCheck/:checkId",
//     name: "editCheckCompany",
//     meta: {
//       title: "编辑公司信息",
//       haveParent: true,
//       parentPath: "/check/companyCheck",
//       parentName: "公司审核管理"
//     },
//     component: resolve => require(["@/pages/createCompany/index.vue"], resolve)
//   },
//   /* 公司录入详情 */
//   {
//     path: "/index/companyInfo",
//     name: "companyInfo",
//     meta: {
//       title: "公司详情",
//       haveParent: true,
//       parentPath: "/index",
//       parentName: "公司库",
//       flag: "gongsiku"
//     },
//     component: resolve => require(["@/pages/index/companyInfo.vue"], resolve)
//   },
//   /* 创建公司 */
//   {
//     path: "/index/createCompany",
//     name: "createCompany",
//     meta: {
//       title: "创建公司",
//       haveParent: true,
//       parentPath: "/index",
//       parentName: "公司库"
//     },
//     component: resolve => require(["@/pages/createCompany/index.vue"], resolve)
//   },
//   /* 编辑公司信息 */
//   {
//     path: "/index/editCompany/:id",
//     name: "editCompany",
//     meta: {
//       title: "编辑公司信息",
//       haveParent: true,
//       parentPath: "/index",
//       parentName: "公司库"
//     },
//     component: resolve => require(["@/pages/createCompany/index.vue"], resolve)
//   },

//   /* 编辑身份信息 */
//   {
//     path: "/index/editIdentity",
//     name: "editIdentity",
//     meta: {
//       title: "编辑身份信息",
//       haveParent: true,
//       parentPath: "/index",
//       parentName: "公司库"
//     },
//     component: resolve =>
//       require(["@/pages/editCompany/editIdentity.vue"], resolve)
//   },

//   /* 用户列表 */
//   {
//     path: "/user",
//     name: "user",
//     meta: { title: "用户管理", haveParent: false, keepAlive: true },
//     component: resolve => require(["@/pages/user/index.vue"], resolve)
//   },
//   {
//     path: "/recruiter",
//     name: "recruiterList",
//     meta: { title: "招聘官管理", haveParent: false},
//     component: resolve => require(["@/pages/user/recruiter.vue"], resolve)
//   },
//   /* 添加用户 */
//   {
//     path: "/user/addUser",
//     name: "addUser",
//     meta: {
//       title: "添加用户",
//       haveParent: true,
//       parentPath: "/user",
//       parentName: "用户管理"
//     },
//     component: resolve => require(["@/pages/user/addUser.vue"], resolve)
//   },
//   /* 编辑用户 */
//   {
//     path: "/user/editUser/:id",
//     name: "editUser",
//     meta: {
//       title: "编辑用户信息",
//       haveParent: true,
//       parentPath: "/user",
//       parentName: "用户管理"
//     },
//     component: resolve => require(["@/pages/user/addUser.vue"], resolve)
//   },
//   /* 查看用户 */
//   {
//     path: "/user/userInfo/:id",
//     name: "userInfo",
//     meta: {
//       title: "查看用户详情",
//       haveParent: true,
//       parentPath: "/user",
//       parentName: "用户管理"
//     },
//     component: resolve => require(["@/pages/user/userInfo.vue"], resolve)
//   },
//   /* 招聘官详情 */
//   {
//     path: "/recruiter/recruiterInfo/:id",
//     name: "recruiter_info",
//     meta: {
//       title: "编辑详情",
//       haveParent: true,
//       parentPath: "/recruiter",
//       parentName: "招聘官管理"
//     },
//     component: resolve => require(["@/pages/user/info_recruiter.vue"], resolve)
//   },
//   /* 编辑招聘官信息 */
//   {
//     path: "/user/editRecruiter/:id",
//     name: "editRecruiter",
//     meta: {
//       title: "查看用户详情",
//       haveParent: true,
//       parentPath: "/user",
//       parentName: "用户管理"
//     },
//     component: resolve => require(["@/pages/user/editRecruiter.vue"], resolve)
//   },
//   /* 编辑招聘官信息 */
//   {
//     path: "/user/edit_recruiter/:id",
//     name: "edit_recruiter",
//     meta: {
//       title: "编辑招聘官信息",
//       haveParent: true,
//       parentPath: "/user",
//       parentName: "用户管理"
//     },
//     component: resolve => require(["@/pages/user/edit_recruiter.vue"], resolve)
//   }
// ]
