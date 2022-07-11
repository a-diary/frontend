<template>
    <a-card
        hoverable
        style="width: 300px"
        v-for="i in [1, 2, 3, 4, 5, 6, 7]"
        :key="i"
    >
        <template #cover>
            <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
        </template>
        <template #actions>
            <setting-outlined key="setting" />
            <edit-outlined key="edit" />
            <ellipsis-outlined key="ellipsis" />
        </template>
        <a-card-meta title="Card title" description="This is the description" />
    </a-card>
</template>

<script setup lang="ts">
import {
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined,
} from "@ant-design/icons-vue";
</script>
