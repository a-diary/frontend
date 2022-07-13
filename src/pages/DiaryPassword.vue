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
        <h1>验证日记密码</h1>
        <a-divider />
        <a-space direction="vertical" style="width: 100%" size="middle">
            <a-input
                type="password"
                v-model:value="diaryPassword"
                placeholder="请输入日记密码"
            />
            <a-button type="primary" @click="submit" style="width: 100%">
                验证
            </a-button>
        </a-space>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { router } from "../router";
import { message } from "ant-design-vue";
import Encrypt from "../plugins/encrypt";
const store = useStore(),
    route = useRoute();

const diaryPassword = ref("");
const submit = () => {
    if (
        Encrypt.sha512(diaryPassword.value) ===
        store.state.user.diary_password_hash
    ) {
        sessionStorage.setItem("diaryPassword", diaryPassword.value);
        message.success("验证成功！");
        if (route.params.next) {
            router.push(route.params.next);
        } else {
            router.go(-1);
        }
    } else {
        message.error("验证失败！");
    }
};
</script>
