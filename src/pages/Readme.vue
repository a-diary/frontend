<script setup>
import MdEditor from "@/components/MdEditor.vue";

const introduction = `
## Hi，大家好！

欢迎使用 A Diary 日记本。

这是一个使用 Vue3 + Ant Design 编写的日记本项目，您可以在这里写下您的日记。

本项目的灵感来源于本人使用的日记软件在一次换机时差点忘记备份，险些造成数据丢失的惨案。

因此，本项目以**数据安全、易导出**为中心设计理念，或许功能没有那么完备，但是简洁的 Markdown 格式，随时可用的 JSON Markdown 图片 和自有加密格式导出，让您可以安心使用。

用任何问题，欢迎 [在GitHub与我们联系](https://github.com/a-diary) 或 [发送邮件](mailto:mail@yixiangzhilv.com) 。
`;
</script>

<template>
    <MdEditor :content="introduction" :previewOnly="true" />
</template>
