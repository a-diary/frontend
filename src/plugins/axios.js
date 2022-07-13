import axios from "axios";
import { router } from "../router";
import { store } from "../store";
import { message } from "ant-design-vue";

export const Axios = axios.create({
    // baseURL: import.meta.env.PROD ? "https://gtapi.yxzl.top" : "/api",
    baseURL: "/api",
});

Axios.interceptors.request.use(
    async config => {
        if (config.url.indexOf("http") !== 0) {
            if (store.state.jwt) {
                config.headers.Authorization = store.state.jwt;
            }
            // if (["post", "put", "patch"].includes(config.method)) {
            //     config.data = window.GuardEncode(JSON.stringify(config.data));
            // }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    response => {
        response = response.data;
        if (response.status && response.status !== "success") {
            message.error(response.message);
            return Promise.reject(response);
        }
        return response;
    },
    async error => {
        if (!error.response) {
            message.error(error.message);
            return Promise.reject(error.message);
        } else if (error.response.status === 405) {
            message.info(
                "恭喜你找到了开发者写的一个脑残Bug（认真的），请联系开发者，谢谢！"
            );
            return Promise.reject(error.response);
        } else if (error.response.status === 404) {
            router.push("/404");
            return Promise.reject(error.response);
        } else if (error.response.status === 403) {
            if (error.response.data.message) {
                message.error(error.response.data.message);
                return Promise.reject(error.response.data.message);
            } else if (!store.getters.loggedIn) {
                message.error("请先登录");
                return Promise.reject("用户未登录");
            }
            message.error("403错误: 身份校验失败");
            if (error.response.data.action === "login") {
                store.commit("logout");
                router.push({ name: "login" });
            }
            return Promise.reject("身份校验失败");
        }
        const reason = error.response.data.message ?? error.response.data[0];
        if (error.response.status === 400) {
            if (reason) message.error(reason);
            return Promise.reject(reason);
        } else if (error.response.status === 500) {
            message.error("服务器错误");
            return Promise.reject("服务器错误");
        } else {
            return Promise.reject(reason);
        }
    }
);

export default {
    Axios,
    install(app) {
        app.config.globalProperties.$axios = Axios;
    },
};
