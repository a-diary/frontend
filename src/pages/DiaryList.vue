<template>
    <div>
        &nbsp;
        <a-radio-group v-model:value="listMode" v-if="!isMobile">
            <a-radio-button value="waterfall">
                <AppstoreOutlined />
            </a-radio-button>
            <a-radio-button value="list">
                <UnorderedListOutlined />
            </a-radio-button>
        </a-radio-group>
        <a-button
            v-if="route.name === 'diaryList'"
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
    <a-spin tip="加载中..." :spinning="loading">
        <Waterfall
            style="margin-top: 25px; min-height: 500px"
            :list="diarys"
            :gutter="20"
            :hasAroundGutter="hasAroundGutter"
            :breakpoints="
                listMode === 'waterfall'
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
                            v-if="item.cover"
                            :alt="item.title"
                            :src="item.cover"
                        />
                    </template>
                    <template #actions>
                        <EyeOutlined
                            @click="
                                $router.push({
                                    name: 'diaryView',
                                    params: { id: item.id },
                                })
                            "
                        />
                        <EditOutlined
                            v-if="route.name === 'diaryList'"
                            @click="
                                $router.push({
                                    name: 'diaryEdit',
                                    params: { id: item.id },
                                })
                            "
                            style="z-index: 99999"
                        />
                        <EllipsisOutlined />
                    </template>
                    <a-card-meta
                        @click="
                            $router.push({
                                name: 'diaryView',
                                params: { id: item.id },
                            })
                        "
                    >
                        <template #title>
                            <h3
                                style="margin-bottom: 0; font-size: x-large"
                                class="word-break"
                            >
                                {{ item.title }}
                            </h3>
                        </template>
                        <template #description>
                            <div
                                style="color: black; font-size: large"
                                class="word-break"
                            >
                                {{
                                    (
                                        item.content.match(
                                            /[a-zA-Z0-9\u4e00-\u9fa5。？！【】《》@%（）:\/.?]/g
                                        ) || []
                                    ).join("")
                                }}
                            </div>
                            <small style="font-size: medium">
                                {{ $moment(item.create_time).calendar() }}
                            </small>
                        </template>
                    </a-card-meta>
                </a-card>
            </template>
        </Waterfall>
    </a-spin>
    <a-pagination
        v-model:current="pageInfo.current"
        v-model:pageSize="pageInfo.size"
        :total="pageInfo.total"
        :hideOnSinglePage="true"
        :simple="true"
        @change="getDiaryList"
        @showSizeChange="getDiaryList"
        style="margin-top: 25px"
    />
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { Axios } from "../plugins/axios";
import {
    EyeOutlined,
    EditOutlined,
    EllipsisOutlined,
    UnorderedListOutlined,
    AppstoreOutlined,
    FormOutlined,
} from "@ant-design/icons-vue";
import { Waterfall } from "vue-waterfall-plugin-next";
import { store } from "../store";
import "vue-waterfall-plugin-next/style.css";
import { useRoute } from "vue-router";
const route = useRoute();

const isMobile = computed({
    get() {
        return window.innerWidth < 768;
    },
    set() {},
});

const diarys = ref([]),
    pageInfo = ref({
        current: 1,
        size: 20,
        total: 0,
    }),
    loading = ref(false),
    hasAroundGutter = ref(true);

const getDiaryList = () => {
    loading.value = true;
    Axios.get("/diary", {
        params: {
            page: pageInfo.value.current,
            source: route.name,
        },
    }).then(res => {
        pageInfo.value.total = res.total;
        diarys.value = res.data;
        setTimeout(() => {
            loading.value = false;
        }, 400);
    });
};

getDiaryList();

watch(route, newVal => {
    if (["diaryList", "diaryPublicList"].includes(newVal.name)) {
        getDiaryList();
    }
});

const listMode = computed({
    get() {
        return store.state.listMode;
    },
    set(value) {
        store.commit("setListMode", value);
        hasAroundGutter.value = !hasAroundGutter.value;
        setTimeout(() => {
            hasAroundGutter.value = !hasAroundGutter.value;
        }, 350);
    },
});
</script>

<style scoped>
.word-break {
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>
