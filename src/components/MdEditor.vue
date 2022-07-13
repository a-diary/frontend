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
#md-editor-v3 .markdown-emoji {
    display: inline-block;
    width: 1.2rem !important;
    height: 1.2rem !important;
    margin: 0 3px !important;
    border-radius: 0 !important;
}

#md-editor-v3 img {
    max-width: 70% !important;
    margin: 0 auto !important;
}

@media (max-width: 768px) {
    #md-editor-v3 img {
        max-width: 100% !important;
    }
}
</style>
