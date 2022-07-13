<template>
    <div
        style="
            width: 50%;
            min-width: 250px;
            max-width: 500px;
            margin: 0 auto;
            text-align: center;
        "
    >
        <h1>登录 A Diary</h1>
        <a-divider />
        <a-space direction="vertical" style="width: 100%" size="middle">
            <a-input v-model:value="username" placeholder="请输入用户名" />
            <a-input
                type="password"
                v-model:value="password"
                placeholder="请输入密码"
            />
            <a-button type="primary" @click="submit" style="width: 100%">
                登录
            </a-button>
            <a-button
                @click="$router.push({ name: 'register' })"
                style="width: 100%"
            >
                注册
            </a-button>
        </a-space>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { Axios } from "../plugins/axios";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { router } from "../router";
import { message } from "ant-design-vue";
const store = useStore(),
    route = useRoute();

const username = ref(""),
    password = ref("");
const submit = () => {
    Axios.post("/user/login", {
        username: username.value,
        password: password.value,
    }).then(res => {
        console.log(res);
        store.commit("setJwt", res.jwt);
        store.commit("setUser", res.user);
        message.success("登录成功！");
        if (route.params.next) {
            router.push(route.params.next);
        } else {
            router.go(-1);
        }
    });
};
</script>
