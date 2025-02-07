<script lang='ts' setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";



const props = defineProps<{
    mod: IModIo
}>()

const download = useDownload()
const settings = useSettings()
const { formatSiez } = useMain()
const { t } = useI18n()

let task = computed<IDownloadTask | undefined>(() => {
    return download.getTaskById(props.mod.id)
})

let isDownloading = computed(() => {
    if (task.value) return true
    return false
})
let text = computed(() => {
    if (!settings.settings.managerGame) return t('Please manage the game first.')
    if (task.value && task.value.totalSize == task.value.downloadedSize) return t('Downloaded')
    if (isDownloading.value) return `${downloaded.value} %`

    return `${t('Download')} | ${formatSiez(props.mod.modfile.filesize)}`
})
let disabled = computed(() => {
    if (!settings.settings.managerGame) return true
    if (isDownloading.value) return true
    return false
})
let downloaded = computed(() => {
    if (task.value) {
        // console.log(task.value);
        // return task.value.progress
        return Math.floor(task.value.downloadedSize / task.value.totalSize * 10000) / 100; // 计算下载进度
    }
    return 0
})

function toDownload() {
    download.addDownloadByModIo(props.mod)
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