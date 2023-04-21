import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Auth/RegistrationView.vue"
      ),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Auth/LoginView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/User/Profile.vue"),
  },
  {
    path: "/product/create",
    name: "product create",
    component: () => import("../views/User/ProductCreate.vue"),
  },
  {
    path: "/error",
    name: "error",
    component: () => import("../views/Common/404.vue"),
  },
  {
    path: "/manufacturer-products/",
    name: "manufacturer-products",
    component: () => import("../views/User/Products.vue"),
  },
  {
    path: "/manufacturer-product-update/:id",
    name: "manufacturer-product-update",
    component: () => import("../views/User/ProductUpdate.vue"),
    beforeEnter: () => {
      return true;
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/home", "/error", "/"];
  const authRequired = !publicPages.includes(to.path);
  const manufacturerPages = [
    new RegExp("/product/create"),
    new RegExp("/profile"),
    new RegExp("/manufacturer-products"),
    new RegExp("/manufacturer-product-update"),
  ];
  const isManufacturerRequested = manufacturerPages.some((i) =>
    i.test(to.path)
  );
  const distrubutorPages = ["/test", "/profile"];
  const isDistributorRequested = distrubutorPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    next("/login");
  } else if (!authRequired && !loggedIn) next();
  else {
    store.dispatch("auth/GetUserRole").then(() => {
      if (!authRequired && loggedIn) next();
      else {
        if (
          isManufacturerRequested &&
          store.state.auth.role == "Manufacturer"
        ) {
          next();
        } else if (
          isDistributorRequested &&
          store.state.auth.role == "Distributor"
        ) {
          next();
        } else {
          next("/error");
        }
      }
    });
  }

  // trying to access a restricted page + not logged in
  // redirect to login page
});

export default router;
