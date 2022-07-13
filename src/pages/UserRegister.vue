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
        <h1>注册 A Diary</h1>
        <a-divider />
        <a-space direction="vertical" style="width: 100%" size="middle">
            <a-input v-model:value="email" placeholder="请输入邮箱" />
            <a-input v-model:value="username" placeholder="请输入用户名" />
            <a-input
                type="password"
                v-model:value="password"
                placeholder="请输入密码"
            />
            <a-input
                type="password"
                v-model:value="password_confirmation"
                placeholder="请再次输入密码"
            />
            <a-input
                v-model:value="nickname"
                placeholder="请输入昵称（若不填将使用用户名）"
            />
            <span
                >请选择你的日记存储模式（
                <a
                    @click="showIntroduction = true"
                    style="display: inline-block"
                >
                    这是什么？
                </a>
                ）
            </span>
            <a-radio-group v-model:value="save_method">
                <a-radio-button value="normal"> 普通模式 </a-radio-button>
                <a-radio-button value="aes"> AES模式 </a-radio-button>
            </a-radio-group>
            <a-input
                v-if="save_method === 'aes'"
                type="password"
                v-model:value="diary_password"
                placeholder="请输入日记密码"
            />
            <a-input
                v-if="save_method === 'aes'"
                type="password"
                v-model:value="diary_password_confirmation"
                placeholder="请再次输入日记密码"
            />
            <a-button type="primary" @click="submit" style="width: 100%">
                注册
            </a-button>
        </a-space>
        <a-row style="margin-top: 50px"></a-row>
    </div>
    <a-modal
        v-model:visible="showIntroduction"
        title="有关存储方式的解释说明"
        @ok="showIntroduction = false"
    >
        <p style="font-size: medium">
            普通模式：我们会将你的日记内容明文存储于服务器数据库中并定期备份。用户登录账号后可获取、更新日记原文，并随时提供多样的导出选项。
        </p>
        <p style="font-size: medium">
            AES模式：我们会将你的日记内容（仅限Markdown格式的正文，不包含标题、心情等）在客户端完成AES对称对称加密后，将密文存储于服务器数据库中并定期备份。用户登录账号后可获取、更新日记密文，导出功能将由于技术原因受限。
            <br />
            为完成AES加密，你需要再设置一个<b>日记密码</b>。该密码本身不会以任何方式进行传输，服务器仅保存该密码的SHA512单向加密值，以便下次使用时在客户端验证密码正确性。日记密码设置后不可修改，忘记后不可找回。每次使用均需输入一次日记密码（将存储于<code>SessionStorage</code>中）。
        </p>
        <p style="font-size: medium">
            <strong>
                请注意：模式选择后不支持修改；选择AES模式后不支持修改账号密码。
            </strong>
        </p>
    </a-modal>
</template>

<script setup>
import { ref } from "vue";
import Encrypt from "../plugins/encrypt";
import { message } from "ant-design-vue";
import { Axios } from "../plugins/axios";
import { router } from "../router";
const username = ref(""),
    email = ref(""),
    password = ref(""),
    password_confirmation = ref(""),
    save_method = ref("normal"),
    showIntroduction = ref(false),
    nickname = ref(""),
    diary_password = ref(""),
    diary_password_confirmation = ref("");
const submit = () => {
    Axios.post("/user", {
        username: username.value,
        password: password.value,
        email: email.value,
        nickname: nickname.value || username.value,
        save_method: save_method.value,
        diary_password_hash: Encrypt.sha512(diary_password.value),
    }).then(res => {
        console.log(res);
        message.success("注册成功！");
        router.push({ name: "login" });
    });
};
</script>
