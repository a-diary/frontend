import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const routes = [
    {
        path: "/",
        name: "index",
        component: () => import("@/pages/HelloWorld.vue"),
        meta: {
            title: "首页",
            keepAlive: true,
        },
    },
    {
        path: "/diary",
        name: "diaryList",
        component: () => import("@/pages/DiaryList.vue"),
        meta: {
            title: "日记",
        },
    },
    {
        path: "/home",
        name: "home",
        component: () => import("@/pages/Home.vue"),
        meta: {
            title: "首页",
        },
    },
    {
        path: "/:catchAll(.*)",
        name: "404",
        component: () => import("@/pages/404.vue"),
        // hidden: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

NProgress.configure({
    showSpinner: false,
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
