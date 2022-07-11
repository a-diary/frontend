<template>
    <div>
        &nbsp;
        <a-radio-group v-model:value="useWaterfall" v-if="!isMobile">
            <a-radio-button value="true">
                <AppstoreOutlined />
            </a-radio-button>
            <a-radio-button value="false">
                <UnorderedListOutlined />
            </a-radio-button>
        </a-radio-group>
        <a-button
            type="primary"
            :size="'large'"
            style="float: right"
            @click="$router.push('/diary/edit')"
        >
            <template #icon>
                <FormOutlined />
            </template>
            新日记
        </a-button>
    </div>
    <a-spin tip="Loading..." :spinning="diarySpinning">
        <Waterfall
            style="margin-top: 25px; min-height: 500px"
            :list="data"
            :gutter="20"
            :hasAroundGutter="hasAroundGutter"
            :breakpoints="
                useWaterfall === 'true'
                    ? {
                          99999: {
                              rowPerView: 5,
                          },
                          2000: {
                              rowPerView: 4,
                          },
                          1600: {
                              rowPerView: 3,
                          },
                          1200: {
                              rowPerView: 2,
                          },
                          700: {
                              rowPerView: 1,
                          },
                      }
                    : {
                          99999: {
                              rowPerView: 1,
                          },
                      }
            "
        >
            <template #item="{ item, index }">
                <a-card
                    hoverable
                    style="width: 90%; max-width: 900px; margin: 0 auto"
                >
                    <template #cover>
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            v-if="index % 2"
                        />
                    </template>
                    <template #actions>
                        <setting-outlined key="setting" />
                        <edit-outlined key="edit" />
                        <ellipsis-outlined key="ellipsis" />
                    </template>
                    <a-card-meta
                        :title="diary.title + index"
                        :description="diary.content"
                    />
                </a-card>
            </template>
        </Waterfall>
    </a-spin>
    <a-pagination
        v-model:current="pageInfo.current"
        v-model:pageSize="pageInfo.size"
        :total="500"
        :hideOnSinglePage="true"
        :simple="true"
        @change="getDiaryList"
        @showSizeChange="getDiaryList"
        style="margin-top: 25px"
    />
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import {
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined,
    UnorderedListOutlined,
    AppstoreOutlined,
    FormOutlined,
} from "@ant-design/icons-vue";
import { Waterfall } from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/style.css";

const diary = ref({
    id: 0,
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
});

onMounted(() => {
    diary.value = JSON.parse(localStorage.getItem("diary") || "{}");
});

const isMobile = computed({
    get() {
        return window.innerWidth < 768;
    },
    set() {},
});

const data = [1, 2, 3, 4, 5, 6],
    useWaterfall = ref(String(!isMobile.value)),
    pageInfo = ref({
        current: 1,
        size: 10,
    }),
    diarySpinning = ref(false),
    hasAroundGutter = ref(true);

const getDiaryList = () => {};

watch(useWaterfall, () => {
    hasAroundGutter.value = !hasAroundGutter.value;
    setTimeout(() => {
        hasAroundGutter.value = !hasAroundGutter.value;
    }, 350);
});
</script>
