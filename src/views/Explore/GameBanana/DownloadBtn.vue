<script lang='ts' setup>



import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
const props = defineProps<{
    mod: IGameBananaMod
}>()

const settings = useSettings()
const download = useDownload()
const { t } = useI18n()
const { formatSiez } = useMain()

const isDownloading = computed(() => {
    if (task.value) return true
    return false
})
const disabled = computed(() => {
    if (!settings.settings.managerGame) return true
    if (isDownloading.value) return true
    return false
})
const downloaded = computed(() => {
    if (task.value) {
        // console.log(task.value);
        // return task.value.progress
        return Math.floor(task.value.downloadedSize / task.value.totalSize * 10000) / 100; // 计算下载进度
    }
    return 0
})

const task = computed(() => {
    return download.getTaskById(props.mod._idRow)
})

const text = computed(() => {
    if (!settings.settings.managerGame) return t('Please manage the game first.')
    if (task.value && task.value.totalSize == task.value.downloadedSize) return t('Downloaded')
    if (isDownloading.value) return `${downloaded.value} %`

    return t('Download') + (props.mod._aFiles ? formatSiez(props.mod._aFiles[0]._nFilesize) : '')
})

function toDownload() {
    download.addDownloadByGameBanana(props.mod._idRow)
}

</script>
<template>
    <v-chip label color="orange-lighten-2" variant="text" @click="toDownload" :disabled="disabled">
        <template v-slot:append>
            <v-progress-circular v-if="isDownloading" :model-value="downloaded" color="deep-orange-lighten-2"
                size="25"></v-progress-circular>
            <v-icon v-else>mdi-download</v-icon>
        </template>
        {{ text }}
    </v-chip>
</template>
<script lang='ts'>

export default {
    name: 'DownloadBtn',
}
</script>
<style lang='less' scoped></style>