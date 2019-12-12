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
        meta: { title: "用户管理" },
        component: resolve => require(["@/pages/userManage/index.vue"], resolve)
      },
      {
        path: "addUser",
        name: "addUser",
        meta: { title: "添加用户" },
        component: resolve => require(["@/pages/userManage/addUser.vue"], resolve)
      },
      {
        path: "editUser/:id",
        name: "editUser",
        meta: { title: "编辑用户信息" },
        component: resolve => require(["@/pages/userManage/addUser.vue"], resolve)
      },
      {
        path: "detail/:id",
        name: "detail",
        meta: { title: "查看用户详情" },
        component: resolve => require(["@/pages/userManage/userInfo.vue"], resolve)
      }
    ]
  }
]