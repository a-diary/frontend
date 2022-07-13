import { createRouter, createWebHistory } from "vue-router";
import { store } from "../store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const routes = [
    {
        path: "/",
        name: "index",
        component: () => import("@/pages/Readme.vue"),
        meta: {
            title: "首页",
            menu: "",
        },
    },
    {
        path: "/diary",
        name: "diaryList",
        component: () => import("@/pages/DiaryList.vue"),
        meta: {
            title: "我的日记",
            requiredLogin: true,
            menu: "diary",
        },
    },
    {
        path: "/diary/public",
        name: "diaryPublicList",
        component: () => import("@/pages/DiaryList.vue"),
        meta: {
            title: "公开日记",
            menu: "diary_public",
        },
    },
    {
        path: "/diary/:id",
        name: "diaryView",
        component: () => import("@/pages/DiaryView.vue"),
        meta: {
            title: "日记详情",
            menu: "diary",
        },
    },
    {
        path: "/diary/edit",
        name: "diaryEdit",
        component: () => import("@/pages/DiaryEdit.vue"),
        meta: {
            title: "写日记",
            requiredLogin: true,
            menu: "diary",
        },
    },
    {
        path: "/user",
        name: "user",
        component: () => import("@/pages/User.vue"),
        meta: {
            title: "个人中心",
            requiredLogin: true,
            menu: "user",
        },
    },
    {
        path: "/user/login",
        name: "login",
        component: () => import("@/pages/UserLogin.vue"),
        meta: {
            title: "登录",
            menu: "user",
        },
    },
    {
        path: "/user/register",
        name: "register",
        component: () => import("@/pages/UserRegister.vue"),
        meta: {
            title: "注册",
            menu: "user",
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
    if (to.meta.requiredLogin && !store.getters.loggedIn) {
        next({ name: "login", params: { next: to.path } });
    }
    window.document.title = to.meta.title + " - A Diary";
    next();
});

router.afterEach(() => {
    NProgress.done();
});

export { router };
