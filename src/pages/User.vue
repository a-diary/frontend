<template>
    <div>
        <h1>欢迎回来，{{ $store.state.user.username }}</h1>
        <a-button
            type="primary"
            @click="
                $store.commit('logout');
                $router.push({ name: 'login' });
            "
        >
            退出登录
        </a-button>
    </div>
    <a-divider />
    <a-form
        :model="user"
        name="basic"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 8 }"
        autocomplete="off"
        @finish="submit"
    >
        <a-form-item label="用户名" name="username">
            <a-input v-model:value="user.username" :disabled="true" />
        </a-form-item>

        <a-form-item
            label="昵称"
            name="nickname"
            :rules="[
                { required: true, message: '请输入昵称', whitespace: true },
            ]"
        >
            <a-input v-model:value="user.nickname" />
        </a-form-item>

        <a-form-item
            label="邮箱"
            name="email"
            :rules="[
                {
                    required: true,
                    message: '请输入邮箱',
                    whitespace: true,
                    type: 'email',
                },
            ]"
        >
            <a-input v-model:value="user.email" />
        </a-form-item>

        <a-form-item
            label="旧密码"
            name="password_old"
            :rules="[{ required: user.password_new, message: '请输入旧密码' }]"
        >
            <a-input-password v-model:value="user.password_old" />
        </a-form-item>
        <a-form-item
            label="新密码"
            name="password_new"
            :rules="[{ required: Boolean(user.password_new) }]"
        >
            <a-input-password v-model:value="user.password_new" />
        </a-form-item>
        <a-form-item
            label="确认新密码"
            name="password_new_re"
            :rules="[
                {
                    required: user.password_new,
                    message: '两次输入的密码不一致',
                    len: (user.password_new ?? '').length,
                    validator: (rule, value, cb) =>
                        value === user.password_new ? cb() : cb(rule.message),
                },
            ]"
        >
            <a-input-password v-model:value="user.password_new_re" />
        </a-form-item>

        <a-form-item label="日记密码(SHA)" name="diary_password_hash">
            <a-input-password
                :value="user.diary_password_hash"
                :disabled="user.save_method === 'normal'"
            />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: isMobile ? 0 : 4 }">
            <a-button
                type="primary"
                html-type="submit"
                :disabled="submitDisabled"
            >
                提交
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script setup>
import { ref, computed } from "vue";
import { Axios } from "../plugins/axios";
import { store } from "../store";
import { message } from "ant-design-vue";

const user = ref(store.state.user),
    submitDisabled = ref(false);

const isMobile = computed({
    get() {
        return window.innerWidth < 768;
    },
});

const submit = () => {
    submitDisabled.value = true;
    Axios.put("/user/" + user.value.id, user.value)
        .then(res => {
            store.commit("setUser", res.user);
            user.value = res.user;
            message.success("修改成功");
        })
        .finally(() => {
            submitDisabled.value = false;
        });
};
</script>

<style scoped>
h1 {
    font-size: x-large;
}
</style>
