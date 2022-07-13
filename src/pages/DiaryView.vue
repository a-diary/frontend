<template>
    <a-spin tip="加载中..." :spinning="loading">
        <h2>
            {{ diary.title }}
            <RouterLink
                v-if="diary.user"
                :to="{ name: 'diaryEdit', params: { id: diary.id } }"
            >
                <a-button type="primary" style="float: right">
                    <FormOutlined />
                </a-button>
            </RouterLink>
        </h2>
        <div style="margin-bottom: 10.5px">
            <span style="margin-right: 20px">
                创建于 {{ $moment(diary.create_time).calendar() }}
            </span>
            <span>修改于 {{ $moment(diary.update_time).calendar() }}</span>
        </div>
        <Tags v-model:tags="diary.tags" :allowEdit="false" />
        <a-divider />

        <MdEditor
            v-model:content="diary.content"
            :previewOnly="true"
            style="width: 90%; margin: 0 auto"
        />
    </a-spin>
</template>

<script setup>
import MdEditor from "../components/MdEditor.vue";
import Tags from "../components/Tags.vue";
import { useRoute } from "vue-router";
import { Axios } from "../plugins/axios";
import { ref } from "vue";
import { FormOutlined } from "@ant-design/icons-vue";
import { store } from "../store";
import Encrypt from "../plugins/encrypt";
const route = useRoute();

const diary = ref({
        id: 0,
        title: "",
        content: "",
        tags: [],
    }),
    loading = ref(false);

loading.value = true;
Axios.get("/diary/" + route.params.id)
    .then(res => {
        const data = res.data;
        data.tags = data.tags.split("|||").filter(tag => tag !== "");
        if (store.state.user.save_method === "aes" && !data.public) {
            data.content = Encrypt.cbc_decrypt(
                data.content,
                sessionStorage.getItem("diaryPassword")
            );
        }
        diary.value = data;
    })
    .finally(() => {
        setTimeout(() => {
            loading.value = false;
        }, 400);
    });
</script>
