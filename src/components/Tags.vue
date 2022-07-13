<template>
    <div>
        <template v-for="(tag, index) in _tags" :key="tag">
            <a-tag
                :color="getColor(tag)"
                :closable="allowEdit"
                @close="delTag(index)"
            >
                {{ tag }}
            </a-tag>
        </template>
        <a-input
            v-if="allowEdit && inputingTag && _tags.length < 5"
            ref="inputRef"
            v-model:value="newTag"
            type="text"
            size="small"
            :style="{ width: '100px' }"
            @blur="addTag"
            @keyup.enter="addTag"
            :maxlength="20"
        />
        <a-tag
            v-else-if="allowEdit"
            style="background: #fff; border-style: dashed"
            @click="
                if (tags.length <= 10) inputingTag = true;
                else message.warning('最多只能添加10个标签');
            "
        >
            <PlusOutlined />
            新建标签
        </a-tag>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { message } from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";
const emit = defineEmits(["update:tags", "update:allowEdit"]);

const props = defineProps({
    tags: Array,
    allowEdit: Boolean,
});

const allowEdit = props.allowEdit;
const _tags = computed({
    get() {
        return props.tags;
    },
    set(val) {},
});

const colors = ["pink", "red", "orange", "green", "cyan", "blue", "purple"];

const inputingTag = ref(false),
    newTag = ref("");

const addTag = () => {
    const tag = newTag.value;
    if (tag.length === 0 || _tags.value.includes(tag)) {
        inputingTag.value = false;
        return;
    } else if (tag.length > 15) {
        message.warning("标签不能超过15个字符");
        return;
    }
    _tags.value.push(tag);
    newTag.value = "";
    inputingTag.value = false;
};

const delTag = index => {
    _tags.value.splice(index, 1);
};

const getColor = text => {
    let num = 0;
    for (let i = 0; i < text.length; i++) {
        num += text.charCodeAt(i);
    }
    return colors[num % colors.length];
};
</script>
