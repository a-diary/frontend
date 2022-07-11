<template>
    <MdEditor
        v-model="_content"
        noKatex
        noMermaid
        prettierCDN="https://cdn.staticfile.org/prettier/2.0.3/standalone.min.js"
        prettierMDCDN="https://cdn.staticfile.org/prettier/2.0.3/parser-markdown.min.js"
        cropperCss="https://cdn.staticfile.org/cropperjs/1.5.12/cropper.min.css"
        cropperJs="https://cdn.staticfile.org/cropperjs/1.5.12/cropper.min.js"
        screenfullJs="https://cdn.staticfile.org/screenfull.js/5.1.0/screenfull.min.js"
        :toolbars="
            isMobile
                ? [
                      'link',
                      'image',
                      '-',
                      'save',
                      '-',
                      'pageFullscreen',
                      'preview',
                  ]
                : [
                      'revoke',
                      'next',
                      '-',
                      'bold',
                      'underline',
                      'strikeThrough',
                      'quote',
                      '-',
                      'link',
                      'image',
                      'table',
                      '-',
                      'save',
                      '-',
                      'pageFullscreen',
                      'preview',
                  ]
        "
        :preview="previewOnly || !isMobile"
        :previewOnly="previewOnly"
        :historyLength="20"
        showCodeRowNumber
        :sanitize="extendMarkdown"
        previewTheme="vuepress"
        :onSave="onSave"
        :onUploadImg="onUploadImg"
    />
</template>

<script setup>
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { computed } from "vue";
import { extendMarkdown } from "@/plugins/markdown";
const emit = defineEmits(["update:content"]);

const name = "MdEditor";
const props = defineProps({
    content: String,
    previewOnly: {
        type: Boolean,
        default() {
            return false;
        },
    },
    onSave: {
        type: Function,
        default() {
            return () => {};
        },
    },
    onUploadImg: {
        type: Function,
        default() {
            return () => {};
        },
    },
});
const _content = computed({
    get() {
        return props.content;
    },
    set(val) {
        // console.log(content, "OK", val);
        emit("update:content", val);
    },
});
const isMobile = computed({
    get() {
        return window.innerWidth < 768;
    },
    set() {},
});
</script>

<style>
.markdown-emoji {
    display: inline-block;
    width: 1.2rem !important;
    height: 1.2rem !important;
    margin: 0 3px !important;
    border-radius: 0 !important;
}
</style>
