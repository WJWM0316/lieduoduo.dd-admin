export const login = [
	{
    path: "/",
    name: "/",
    redirect: {
      name: "login"
    }
  },
  {
    path: "/login",
    name: "login",
    component: resolve => require(["@/pages/login/index.vue"], resolve)
  }
]