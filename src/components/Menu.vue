<template>
    <a-menu v-model:selectedKeys="selectedKeys" :theme="theme" mode="inline">
        <a-menu-item key="">
            <RouterLink to="/">
                <BankOutlined />
                <span class="nav-text">首页</span>
            </RouterLink>
        </a-menu-item>
        <a-menu-item key="diary">
            <RouterLink to="/diary">
                <BookOutlined />
                <span class="nav-text">日记</span>
            </RouterLink>
        </a-menu-item>
        <a-menu-item key="user">
            <RouterLink to="/user">
                <UserOutlined />
                <span class="nav-text">用户中心</span>
            </RouterLink>
        </a-menu-item>
    </a-menu>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
    UserOutlined,
    BookOutlined,
    BankOutlined,
} from "@ant-design/icons-vue";

defineProps({
    theme: {
        type: String,
        default: "light",
    },
});

const name = "menu";

const selectedKeys = ref<string[]>([""]);

const route = useRoute();

watch(route, newVal => {
    selectedKeys.value = [newVal.path.split("/")[1]];
});
</script>
