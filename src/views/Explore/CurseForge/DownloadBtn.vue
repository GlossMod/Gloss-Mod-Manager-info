<script lang='ts' setup>



import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const props = defineProps<{
    mod: ICurseForgeMod
}>()

const { t } = useI18n()
const settings = useSettings()
const { formatSiez } = useMain()
const download = useDownload()

const task = computed(() => {
    return download.getTaskById(props.mod.id)
})

let downloaded = computed(() => {
    if (task.value) {
        // console.log(task.value);
        // return task.value.progress
        return Math.floor(task.value.downloadedSize / task.value.totalSize * 10000) / 100; // 计算下载进度
    }
    return 0
})

let isDownloading = computed(() => {
    if (task.value) return true
    return false
})

const text = computed(() => {
    if (!settings.settings.managerGame) return t('Please manage the game first.')
    if (task.value && task.value.totalSize == task.value.downloadedSize) return t('Downloaded')
    if (isDownloading.value) return `${downloaded.value} %`

    return `${t('Download')} | ${formatSiez(props.mod.latestFiles[0].fileLength)}`
})

// 禁用按钮
let disabled = computed(() => {
    if (!settings.settings.managerGame) return true
    if (isDownloading.value) return true
    return false
})

function toDownload() {

    if (props.mod.latestFiles[0].downloadUrl) {
        download.addDownloadByCurseForge(props.mod)
    } else {
        window.open(props.mod.links.websiteUrl)
    }

}

</script>
<template>
    <v-chip label color="orange-lighten-2" variant="text" @click="toDownload" :disabled="disabled"
        v-if="props.mod.latestFiles[0].downloadUrl">
        <template v-slot:append>
            <v-progress-circular v-if="isDownloading" :model-value="downloaded" color="deep-orange-lighten-2"
                size="25"></v-progress-circular>
            <v-icon v-else>mdi-download</v-icon>
        </template>
        {{ text }}
    </v-chip>
    <v-chip v-else label variant="text" append-icon="mdi-open-in-new" target="_blank"
        :href="props.mod.links.websiteUrl">{{
            $t('Open') }}</v-chip>
</template>
<script lang='ts'>

export default {
    name: 'DownloadBtn',
}
</script>
<style lang='less' scoped></style>