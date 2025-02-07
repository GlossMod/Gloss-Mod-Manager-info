<script lang='ts' setup>
import { useTheme } from 'vuetify'
import { computed } from "vue";
import marked from '@/plugins/marked';
import 'github-markdown-css/github-markdown.css'; // 引入 GitHub 样式

const props = defineProps<{
    text: string
}>()

const readme = computed(() => {
    return marked(props.text)
})

</script>
<template>
    <div class="markdown-body" v-html="readme"></div>
</template>
<script lang='ts'>

export default {
    name: 'Markdown',
}
</script>
<style lang='less' scoped>
.markdown-body {
    background-color: transparent;
    color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>