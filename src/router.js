import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router =  new Router({
  mode: "history",
  routes: [
    {
      path: "/products/edit/:id",
      // alias: "/products/:id",
      name: "product-details",
      component: () => import("./components/Product")
    },
    {
      path: "/products",
      // alias: "/products",
      name: "products",
      component: () => import("./components/ProductsList")
    },
    {
      path: "/products/add",
      name: "product-add",
      component: () => import("./components/AddProduct")
    },
    {
      path: "/buys/edit/:id",
      // alias: "/buys/:id",
      name: "buy-details",
      component: () => import("./components/Buy")
    },
    {
      path: "/buys",
      // alias: "/buys",
      name: "buys",
      component: () => import("./components/BuyList")
    },
    {
      path: "/buys/add",
      name: "buy-add",
      component: () => import("./components/AddProduct")
    },
    {
      path: "/sells/edit/:id",
      // alias: "/sells/:id",
      name: "sell-details",
      component: () => import("./components/Sell")
    },
    {
      path: "/sells",
      // alias: "/sells",
      name: "sells",
      component: () => import("./components/SellList")
    },
    {
      path: "/sells/add",
      name: "sell-add",
      component: () => import("./components/AddProduct")
    },
    {
      path: '/login',
      component: () => import("./components/Login")
    },
    {
      path: '/register',
      component: () => import("./components/Register")
    },
    {
      path: '/profile',
      component: () => import("./components/Profile")
    },
    {
      path: "/tutorials",
      // alias: "/tutorials",
      name: "tutorials",
      component: () => import("./components/TutorialsList")
    },
    {
      path: "/tutorials/:id",
      name: "tutorial-details",
      component: () => import("./components/Tutorial")
    },
    
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;