<template>
    <h2>日记导出选项</h2>
    <a-divider />
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 8 }">
        <a-form-item label="时间范围">
            <a-range-picker
                v-model:value="time_range"
                show-time
                :disabled="no_range"
            />
        </a-form-item>
        <a-form-item label="导出所有">
            <a-switch
                v-model:checked="no_range"
                checked-children="是"
                un-checked-children="否"
            />
        </a-form-item>
        <a-form-item label="导出格式">
            <a-radio-group v-model:value="format">
                <a-radio :value="'json'">JSON</a-radio>
            </a-radio-group>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: isMobile ? 0 : 4 }">
            <a-button type="primary" @click="submit" :disabled="submitDisabled">
                提交
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script setup>
import { ref, computed } from "vue";
import { message } from "ant-design-vue";
import { Axios } from "../plugins/axios";
import { saveFile } from "../plugins/utils";
import moment from "moment";

const time_range = ref(),
    no_range = ref(false),
    format = ref("json"),
    submitDisabled = ref(false);

const isMobile = computed({
    get() {
        return window.innerWidth < 768;
    },
});

const submit = () => {
    if (!no_range.value && time_range.value.length < 2) {
        message.error("请选择时间范围");
        return;
    }
    let start = null,
        end = null;
    if (!no_range.value) {
        (start = moment(time_range.value[0].$d).toISOString(true)),
            (end = moment(time_range.value[1].$d).toISOString(true));
    }
    submitDisabled.value = true;
    Axios.get("/diary/export", {
        params: {
            start: start,
            end: end,
            no_range: no_range.value,
            format: format.value,
        },
    })
        .then(res => {
            console.log(res);
            // saveFile(JSON.stringify(res.data, null, 4), "日记导出.json");
        })
        .finally(() => {
            submitDisabled.value = false;
        });
};
</script>
