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
  },
  {
    path: "/products-search",
    name: "products-search",
    component: () => import("../views/Search/ProductsSearch.vue")
  },
  {
    path: "/products-search/:id",
    name: "products-search-one",
    component: () => import("../views/Search/ProductSearchItem.vue")
  }
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
    new RegExp("/products-search")
  ];
  const isManufacturerRequested = manufacturerPages.some((i) =>
    i.test(to.path)
  );
  const distrubutorPages = [
    new RegExp("/profile"),
    new RegExp("/products-search"),
  ];
  const isDistributorRequested = distrubutorPages.some((i) => i.test(to.path));
  const loggedIn = localStorage.getItem("user");


  // Routing logic based on roles and auth state of the user

  // #1 If user is not logged in but page requires then redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  }
  // #2 if page does not require auth then move to it
  else if (!authRequired && !loggedIn) next();
  else {
    store.dispatch("auth/GetUserRole").then(() => {
      // #3 if auth not required and user is loggedIn then move to page (similar to #2 condition)
      if (!authRequired && loggedIn) next();
      // #4 if auth is required based on roles
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
        }
        // #5 Error page
        else {
          next("/error");
        }
      }
    });
  }
});

export default router;
