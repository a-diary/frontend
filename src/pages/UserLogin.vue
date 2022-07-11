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
            <a-button type="primary" @click="onLogin" style="width: 100%">
                登录
            </a-button>
        </a-space>
    </div>
</template>

<script setup>
import { ref } from "vue";
const username = ref(""),
    password = ref("");
const submit = async () => {
    const res = await axios.post("/api/login", {
        username: username.value,
        password: password.value,
    });
    if (res.data.success) {
        window.location.href = "/";
    } else {
        alert(res.data.message);
    }
};
</script>
