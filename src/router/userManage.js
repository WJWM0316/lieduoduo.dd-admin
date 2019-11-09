import Layout from '@/pages/layout'

export const userManage = [
  /* 公司管理 */
  {
    path: "/userManage",
    name: "userManageIndex",
    meta: { title: "用户管理" },
    component: Layout,
    children: [
      {
        path: "index",
        name: "userManageIndex",
        meta: { title: "用户管理", haveParent: false, keepAlive: true },
        component: resolve => require(["@/pages/user/index.vue"], resolve)
      },
      {
        path: "addUser",
        name: "addUser",
        meta: { title: "添加用户" },
        component: resolve => require(["@/pages/user/addUser.vue"], resolve)
      },
      {
        path: "editUser/:id",
        name: "editUser",
        meta: { title: "编辑用户信息" },
        component: resolve => require(["@/pages/user/addUser.vue"], resolve)
      },
      {
        path: "detail/:id",
        name: "detail",
        meta: { title: "查看用户详情" },
        component: resolve => require(["@/pages/user/userInfo.vue"], resolve)
      }
    ]
  }
]