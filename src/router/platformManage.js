import Layout from '@/pages/layout'

export const platformManage = [
  /* 平台管理 */
  {
    path: "/platformManage",
    name: "platformManageIndex",
    meta: { title: "平台管理" },
    component: Layout,
    children: [
      /* 平台信息 */
      {
        path: "index",
        name: "platformManageIndex",
        meta: { title: "平台信息" },
        component: resolve => require(["@/pages/platformManage/platformMsg.vue"], resolve)
      },
      /* 发版管理 */
      {
        path: "publishMag",
        name: "publishMag",
        meta: { title: "发版管理" },
        component: resolve => require(["@/pages/platformManage/publishMag.vue"], resolve)
      },
      /* 发版详情 */
      {
        path: "detail",
        name: "publishDetail",
        meta: { title: "发版详情" },
        component: resolve => require(["@/pages/platformManage/publishDetail.vue"], resolve)
      },
    ]
  },
]