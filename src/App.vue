<template>
    <a-config-provider :locale="locale">
        <a-drawer
            :width="300"
            :closable="false"
            placement="left"
            :visible="drawerVisiable"
            @close="drawerVisiable = false"
        >
            <Menu />
        </a-drawer>
        <a-layout>
            <a-layout-sider
                v-if="!isMobile"
                style="min-height: 100vh; background-color: white"
            >
                <div class="logo" />
                <Menu />
            </a-layout-sider>
            <a-layout style="min-height: 100vh">
                <a-layout-header
                    :style="{ background: '#fff', paddingLeft: '20px' }"
                >
                    <MenuUnfoldOutlined
                        v-if="isMobile"
                        style="font-size: x-large"
                        @click="drawerVisiable = true"
                    />
                    <h1
                        style="
                            font-weight: bold;
                            font-size: x-large;
                            display: inline;
                        "
                    >
                        A Diary 日记本
                    </h1>
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
                    <!-- Ant Design ©2018 Created by Ant UED -->
                </a-layout-footer>
            </a-layout>
        </a-layout>
        <a-back-top />
    </a-config-provider>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { store } from "./store";
import { MenuUnfoldOutlined } from "@ant-design/icons-vue";
import "@/components/Menu.vue";
import Menu from "./components/Menu.vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";

const locale = zhCN;

const route = useRoute();

const selectedKeys = ref([""]),
    drawerVisiable = ref(false);

watch(route, newVal => {
    selectedKeys.value = [newVal.path.split("/")[1]];
});

const isMobile = computed({
    get() {
        return window.innerWidth < 768;
    },
});

if (store.state.jwt) {
    let data = atob(store.state.jwt.split(".")[1]);
    data = JSON.parse(data);
    if (data.exp + 86100 < Date.now() / 1000) {
        store.commit("logout");
    } else {
        setTimeout(() => {
            store.commit("logout");
        }, (data.exp + 86400) * 1000 - Date.now());
    }
}
</script>

<style></style>
