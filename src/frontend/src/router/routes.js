export default [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index.vue"),
    meta: { layout: "Index" },
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("../views/Login.vue"),
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    meta: { layout: "Cart" },
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/orders",
    name: "Orders",
    meta: { layout: "Orders" },
    component: () => import("../views/Orders.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { layout: "Profile" },
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { layout: "Login" },
    component: () => import("../views/Login.vue"),
  },
];
