import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/products/:id",
      alias: "/products/:id",
      name: "product-details",
      component: () => import("./components/Product")
    },
    {
      path: "/",
      alias: "/products",
      name: "products",
      component: () => import("./components/ProductsList")
    },
    {
      path: "/tutorials",
      alias: "/tutorials",
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
      component: () => import("./components/AddTutorial")
    }
  ]
});
