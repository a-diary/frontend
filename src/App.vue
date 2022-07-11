<template>
    <a-layout>
        <a-layout-sider
            breakpoint="lg"
            collapsed-width="0"
            style="min-height: 100vh"
        >
            <div class="logo" />
            <a-menu
                v-model:selectedKeys="selectedKeys"
                theme="dark"
                mode="inline"
            >
                <a-menu-item key="/">
                    <RouterLink to="/">
                        <BankOutlined />
                        <span class="nav-text">首页</span>
                    </RouterLink>
                </a-menu-item>
                <a-menu-item key="/diary">
                    <RouterLink to="/diary">
                        <BookOutlined />
                        <span class="nav-text">日记</span>
                    </RouterLink>
                </a-menu-item>
                <a-menu-item key="/user">
                    <RouterLink to="/user">
                        <UserOutlined />
                        <span class="nav-text">用户中心</span>
                    </RouterLink>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header
                :style="{ background: '#fff', paddingLeft: '20px' }"
            >
                <h1 style="font-weight: bold; font-size: x-large">日记</h1>
            </a-layout-header>
            <a-layout-content :style="{ margin: '24px 16px 0' }">
                <div
                    :style="{
                        padding: '24px',
                        background: '#fff',
                        minHeight: '360px',
                    }"
                >
                    <RouterView />
                </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import {
    UserOutlined,
    BookOutlined,
    BankOutlined,
} from "@ant-design/icons-vue";

const route = useRoute();

const selectedKeys = ref<string[]>([""]);

onMounted(() => {
    console.log(isMobile.value);
});

watch(route, newVal => {
    selectedKeys.value = [newVal.path];
});

const isMobile = computed({
    get() {
        return window.innerWidth < 768;
    },
    set() {},
});
</script>

<style></style>
