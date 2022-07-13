<template>
    <a-space direction="vertical" style="width: 100%" size="middle">
        <a-input
            v-model:value="diary.title"
            placeholder="标题（可选）"
            show-count
            :maxlength="100"
        />
        <MdEditor
            v-model:content="diary.content"
            :onSave="onSave"
            :onUploadImg="onUploadImg"
            style="height: 80vh"
        />
        <a-input-group compact style="width: 100%; display: flex">
            <a-input
                v-model:value="diary.cover"
                placeholder="封面（可选）"
                style="flex: 1"
            />
            <a-button
                type="primary"
                style="width: 20%; max-width: 120px"
                @click="getCoverFromContent"
            >
                从正文获取
            </a-button>
        </a-input-group>
        <Tags v-model:tags="diary.tags" :allowEdit="true" />
        <a-checkbox
            v-if="$store.state.user.save_method === 'normal'"
            v-model:checked="diary.public"
        >
            公开发布
        </a-checkbox>
        <a-button type="primary" @click="submit" :disabled="submitDisabled">
            提交
        </a-button>
    </a-space>
</template>

<script setup>
import MdEditor from "../components/MdEditor.vue";
import Tags from "../components/Tags.vue";
import { Axios } from "../plugins/axios";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { router } from "../router";
import { message } from "ant-design-vue";
const route = useRoute();

const diary = ref({
        title: "",
        content: "",
        tags: [],
        public: false,
        cover: "",
    }),
    submitDisabled = ref(false);

const onSave = () => {
    console.log("onSave");
};

const onUploadImg = () => {
    console.log("onUploadImg");
};

const getCoverFromContent = () => {
    const content = diary.value.content;
    const reg = /!\[.*\]\(.*\)/g;
    const match = content.match(reg);
    if (match) {
        const cover = match[0];
        const reg2 = /\(.*\)/g;
        const match2 = cover.match(reg2);
        if (match2) {
            const coverUrl = match2[0].slice(1, -1);
            diary.value.cover = coverUrl;
            message.success("获取封面成功");
            return;
        }
    }
    message.error("获取封面失败");
};

const submit = () => {
    if (diary.value.content === "") {
        message.warning("请输入内容");
        return;
    }
    submitDisabled.value = true;
    if (route.params.id) {
        Axios.put("/diary/" + route.params.id, {
            title: diary.value.title,
            content: diary.value.content,
            tags: diary.value.tags.join("|||"),
            public: diary.value.public,
            cover: diary.value.cover || null,
        }).then(res => {
            message.success("保存成功");
            submitDisabled.value = false;
            router.push("/diary/" + res.data.id);
        });
    } else {
        Axios.post("/diary", {
            title: diary.value.title,
            content: diary.value.content,
            tags: diary.value.tags.join("|||"),
            public: diary.value.public,
            cover: diary.value.cover || null,
        }).then(res => {
            message.success("保存成功");
            submitDisabled.value = false;
            router.push("/diary/" + res.data.id);
        });
    }
};

if (route.params.id) {
    Axios.get("/diary/" + route.params.id).then(res => {
        const data = res.data;
        data.tags = data.tags.split("|||");
        diary.value = data;
    });
}
</script>
