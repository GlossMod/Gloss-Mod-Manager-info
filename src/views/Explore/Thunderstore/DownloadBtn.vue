<script lang='ts' setup>


import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";


const props = defineProps<{
    mod: IThunderstoreMod
}>()

const download = useDownload()
const settings = useSettings()
const thunderstore = useThunderstore()
const manager = useManager()
const { formatSiez } = useMain()
const { t } = useI18n()

const show = ref(false)

if (!props.mod.latest) {
    props.mod.latest = props.mod.versions[0]
}

const task = computed<IDownloadTask | undefined>(() => {
    return download.getTaskById(props.mod.package_url)
})

const isDownloading = computed(() => {
    if (task.value) return true
    return false
})
const text = computed(() => {
    if (!settings.settings.managerGame) return t('Please manage the game first.')
    if (task.value && task.value.totalSize == task.value.downloadedSize) return t('Downloaded')
    if (isDownloading.value) return `${downloaded.value} %`

    return `${t('Download')} | ${formatSiez(props.mod.latest?.file_size)}`
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

const dependencies = computed(() => {
    let dependencies = props.mod.latest.dependencies
    // 转换为 [{name:description}]
    return dependencies.map((value, index) => {
        let isAdd = manager.managerModList.find(item => item.key == value)
        let isDownloading = download.downloadTaskList.find(item => item.key == value)
        return {
            value, isAdd, isDownloading,
            btnText: isAdd ? t('Installed') : isDownloading ? t('Downloading') : t('Install')
        }
    })
})

// 下载
function toDownload() {
    if (dependencies.value.length > 0) {
        // 判断依赖是否已经安装
        dependencies.value.forEach(item => {
            if (!item.isAdd && !item.isDownloading) {
                show.value = true
                return
            }
        })
    }
    let data = props.mod
    // console.log(data);

    let key = `${data?.owner}-${data?.name}-${data?.latest.version_number}`
    download.addDownloadByThunderstore(props.mod, key)
}

// 下载依赖
async function installDependence(name: string) {
    let [owner, modName, version] = name.split('-')

    let data = await thunderstore.getModData(owner, modName)
    data.latest = await thunderstore.getModVersionData(owner, modName, version)

    let key = `${data?.owner}-${data?.name}-${data?.latest.version_number}`

    download.addDownloadByThunderstore(data, key)
}

function installAllDependence() {
    dependencies.value.forEach(item => {
        if (!item.isAdd && !item.isDownloading) {
            installDependence(item.value)
        }
    })
    show.value = false
}

</script>
<template>
    <teleport to="body">
        <el-dialog :title="$t('Dependencies')" width="700" v-model="show" draggable>
            <el-table :data="dependencies">
                <el-table-column prop="value" label="名称"></el-table-column>
                <el-table-column :width="120" label="安装">
                    <template #default="scope">
                        <el-button type="success" plain :disabled="scope.row.isAdd || scope.row.isDownloading"
                            @click="installDependence(scope.row.value)">{{ scope.row.btnText }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <template #footer>
                <el-button @click="show = false">{{ $t('Close') }}</el-button>
                <el-button type="primary" plain @click="installAllDependence">{{ $t('Install All') }}</el-button>
            </template>
        </el-dialog>
    </teleport>
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
    name: 'ThunderstoreDownloadBtn',
}
</script>
<style lang='less' scoped></style>