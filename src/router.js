import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router =  new Router({
  mode: "history",
  routes: [
    {
      path: "/products/:id",
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
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddProduct")
    }
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