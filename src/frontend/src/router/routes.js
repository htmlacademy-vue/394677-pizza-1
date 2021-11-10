import isLoggedIn from "@/middlewares/isLoggedIn";
import auth from "@/middlewares/auth";

export default [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Builder.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: { layout: "ProfileLayout", middlewares: [auth] },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: { layout: "ProfileLayout", middlewares: [auth] },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      middlewares: [isLoggedIn],
    },
  },
];
