<script lang='ts' setup>

import { watch, nextTick } from 'vue';
const pack = usePacks()

// 监听 pack.logText 的变化
watch(() => pack.logText, async () => {
    await nextTick(); // 确保 DOM 更新完成
    const textarea = document.querySelector('.logs'); // 根据实际类名选择器调整
    if (textarea) {
        textarea.scrollTop = textarea.scrollHeight; // 滚动到底部
    }
});

</script>
<template>
    <v-card>
        <v-card-text>
            <v-textarea class="logs" :label="$t('Logs')" v-model="pack.logText" variant="solo" readonly></v-textarea>
        </v-card-text>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'PackLogs',
}
</script>
<style lang='less' scoped></style>