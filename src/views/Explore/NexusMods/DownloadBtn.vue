<script lang='ts' setup>


import { useI18n } from "vue-i18n";
import { ref, computed } from "vue";

const props = defineProps<{
    mod: IMod
}>()

const download = useDownload()
const settings = useSettings()
const nexusMods = useNexusMods()
const { t } = useI18n()

let link = ref("")  // 下载地址
let isDownloading = computed(() => {
    if (task.value) return true
    return false
})

// 禁用按钮
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
let task = computed<IDownloadTask | undefined>(() => {
    return download.getTaskById(props.mod.id)
})

let text = computed(() => {
    if (!settings.settings.managerGame) return t('Please manage the game first.')
    if (task.value && task.value.totalSize == task.value.downloadedSize) return t('Downloaded')
    if (isDownloading.value) return `${downloaded.value} %`

    return `${t('Download')} | ${props.mod.mods_resource_size}`
})

async function toDownload() {
    let mod_id = props.mod.id
    let game_domain_name = settings.settings.managerGame?.NexusMods?.game_domain_name
    if (game_domain_name) {
        let url = await nexusMods.GetDownloadUrl(mod_id, game_domain_name)

        // download.addDownloadByNexus(props.mod, url, game_domain_name)
    }

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