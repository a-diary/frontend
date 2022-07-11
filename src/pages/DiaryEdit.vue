<template>
    <a-input
        v-model:value="diary.title"
        placeholder="日记标题"
        style="margin-bottom: 10px"
    />
    <MdEditor
        v-model:content="diary.content"
        :onSave="onSave"
        :onUploadImg="onUploadImg"
        style="margin-bottom: 10px; height: 80vh"
    />
    <a-button type="primary" @click="submit">提交</a-button>
</template>

<script setup>
import MdEditor from "@/components/MdEditor.vue";
import { ref, computed } from "vue";
import router from "@/router/index";
import { message } from "ant-design-vue";

const diary = ref({ title: "", content: "" });
const isMobile = computed({
    get() {
        return window.innerWidth < 768;
    },
    set() {},
});
const onSave = () => {
    console.log("onSave");
};
const onUploadImg = () => {
    console.log("onUploadImg");
};
const submit = () => {
    localStorage.setItem("diary", JSON.stringify(diary.value));
    message.success("提交成功！");
    router.push("/diary");
};
</script>
