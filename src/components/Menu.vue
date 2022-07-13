<template>
    <a-menu v-model:selectedKeys="selectedKeys" :theme="theme" mode="inline">
        <a-menu-item key="">
            <RouterLink to="/">
                <BankOutlined />
                <span class="nav-text">首页</span>
            </RouterLink>
        </a-menu-item>
        <!-- <a-menu-item key="diary">
            <RouterLink to="/diary">
                <BookOutlined />
                <span class="nav-text">日记</span>
            </RouterLink>
        </a-menu-item> -->
        <a-sub-menu key="Diary">
            <template #icon>
                <BookOutlined />
            </template>
            <template #title>日记</template>
            <a-menu-item key="diary">
                <RouterLink to="/diary">
                    <span class="nav-text">我的日记</span>
                </RouterLink>
            </a-menu-item>
            <a-menu-item key="diary_public">
                <RouterLink to="/diary/public">
                    <span class="nav-text">公开日记</span>
                </RouterLink>
            </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="user">
            <RouterLink to="/user">
                <UserOutlined />
                <span class="nav-text">用户中心</span>
            </RouterLink>
        </a-menu-item>
    </a-menu>
</template>

<script setup>
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

const selectedKeys = ref([""]);

const route = useRoute();

const nameMap = {
    "/": "首页",
    "/diary": "日记",
    "/diary/public": "公开日记",
    "/diary/:id": "日记",
    "/user": "用户中心",
};
watch(route, newVal => {
    selectedKeys.value = [newVal.meta.menu];
});
</script>
