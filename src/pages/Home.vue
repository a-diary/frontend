<script setup>
import { defineProps } from "vue";

defineProps({
    msg: String,
});
</script>

<template>
    <h1>{{ msg }}</h1>

    <a-input v-model:value="msg" />
    <a-input :value="msg"></a-input>
    <a-button @click="$router.push('/')">12</a-button>
</template>
