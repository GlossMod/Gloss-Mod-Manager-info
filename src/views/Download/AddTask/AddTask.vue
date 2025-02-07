<script lang='ts' setup>
import { ipcRenderer } from 'electron'
import { ElMessage } from 'element-plus';

import AddTaskGitHub from '@/views/Download/AddTask/GitHub.vue'

const download = useDownload()
const settings = useSettings()

const editingProhibited = ref(true)
const visible = ref(false)
const loading = ref(false)

const tag_name = ref('')
const tag_color = ref('#14F7D8')

const form = ref<IDownloadTask>({
    webId: '',
    from: 'GlossMod',
    modWebsite: '',
    name: '',
    fileName: '',
    version: '',
    link: '',
    modAuthor: '',
    tags: [] as ITag[],
} as IDownloadTask)

const types = ref([
    //  "GlossMod", "NexusMods", "Thunderstore", "ModIo", "SteamWorkshop", "CurseForge", "GitHub", "GameBanana", "Customize"
    { label: 'GlossMod', value: 'GlossMod' },
    { label: 'NexusMods', value: 'NexusMods', disabled: true },
    { label: 'Thunderstore', value: 'Thunderstore' },
    { label: 'ModIo', value: 'ModIo' },
    { label: 'SteamWorkshop', value: 'SteamWorkshop', disabled: true },
    { label: 'CurseForge', value: 'CurseForge' },
    { label: 'GitHub', value: 'GitHub' },
    { label: 'GameBanana', value: 'GameBanana' },
    { label: '自定义', value: 'Customize' }
])


async function parsing() {
    /**
     * https://mod.3dmgame.com/mod/213993
     * https://thunderstore.io/package/rob_gaming/Belmont/
     * https://mod.io/g/baldursgate3/m/kays-hair-mod
     * https://www.curseforge.com/stardewvalley/mods/expanded-storage
     * https://gamebanana.com/mods/560006
     * https://github.com/BepInEx/BepInEx
     */
    console.log(form.value.modWebsite);
    let url = form.value.modWebsite
    let type: sourceType

    if (!url) {
        ElMessage.error('请输入要解析的网址')
        return
    }

    loading.value = true

    if (url.includes('mod.3dmgame.com')) {
        type = 'GlossMod';
        let id = url.split('/').pop()

        let data: IMod = await ipcRenderer.invoke("get-mod-data", { id })
        form.value.name = data.mods_title
        form.value.fileName = data.id + '.zip'
        form.value.version = data.mods_version || '1.0.0'
        form.value.link = data.mods_resource_url
        form.value.modAuthor = data.mods_author
        form.value.webId = data.id

    } else if (url.includes('thunderstore.io')) {
        type = 'Thunderstore';
        const thunderstore = useThunderstore()

        let namespace = url.split('/')[4]
        let name = url.split('/')[5].split('?')[0]

        let data = await thunderstore.getModData(namespace, name)
        console.log(data);
        form.value.name = data.name
        form.value.fileName = data.latest.full_name + '.zip'
        form.value.version = data.latest.version_number
        form.value.link = data.latest.download_url
        form.value.modAuthor = data.owner
        form.value.webId = data.uuid4
        form.value.other = {
            namespace: data.owner,
            name: data.name
        }

    } else if (url.includes('mod.io')) {
        type = 'ModIo';
        let game = url.split('/')[4]
        let mod = url.split('/')[6].split('?')[0]

        const modio = useModIo()
        let data = await modio.getModDataByPath(game, mod)
        let file = await modio.getModFile(data.game_id, data.id)

        form.value.name = data.name
        form.value.fileName = file[0].filename
        form.value.version = file[0].version
        form.value.link = file[0].download.binary_url
        form.value.modAuthor = data.submitted_by.username
        form.value.webId = data.id

    } else if (url.includes('curseforge.com')) {
        type = 'CurseForge';
        ElMessage.warning("暂时无法解析 CurseForge 的网址, 请手动输入相关信息")

    } else if (url.includes('gamebanana.com')) {
        type = 'GameBanana';

        let id = url.split('/')[4].split('?')[0]

        if (id) {
            const gamebanana = useGameBanana()
            let data = await gamebanana.GetModData(id)
            form.value.name = data._sName
            form.value.fileName = data._aFiles[0]._sFile
            form.value.version = data._sVersion || "1.0.0"
            form.value.link = data._aFiles[0]._sDownloadUrl
            form.value.modAuthor = data._aSubmitter._sName
            form.value.webId = data._idRow
        }

    } else if (url.includes('github.com')) {
        type = 'GitHub';
        const github = useGithub()
        let data = await github.parse(url)
        // console.log(data);

        if (data) {
            const select = ref<IGitHubAsset>()

            ElMessageBox({
                title: '选择要下载的版本',
                message: () => h(AddTaskGitHub, { data: data, modelValue: select.value, 'onUpdate:modelValue': (value) => select.value = value }),
                draggable: true,
                closeOnClickModal: false,
            }).then(() => {
                if (select.value) {
                    form.value.name = data.name
                    form.value.fileName = select.value.name
                    form.value.version = data.tag_name
                    form.value.link = select.value.browser_download_url
                    form.value.modAuthor = data.author.login
                    form.value.modWebsite = github.website
                    form.value.webId = data.id
                }

                console.log(select.value);

            })
        }

    } else {
        type = 'Customize';
    }

    form.value.from = type;

    editingProhibited.value = false
    loading.value = false
}


function addTag() {
    if (tag_name.value != "") {
        if (!form.value.tags) form.value.tags = []
        form.value.tags.push({
            name: tag_name.value,
            color: tag_color.value
        })
        tag_name.value = ""
        visible.value = false
    } else {
        ElMessage.warning("名称不能为空！")
    }
}

function save() {

    if (form.value.link == '') {
        ElMessage.error('下载链接不能为空')
        return
    }

    download.addDownloadTask(form.value)
    download.showAddTaskDialog = false
    form.value = {
        webId: '',
        from: 'GlossMod',
        modWebsite: '',
        name: '',
        fileName: '',
        version: '',
        link: '',
        modAuthor: '',
        tags: [] as ITag[],
    } as IDownloadTask
    editingProhibited.value = true
}

</script>
<template>
    <v-chip append-icon="mdi-plus" @click="download.showAddTaskDialog = !download.showAddTaskDialog" label
        variant="text"> {{ $t('New Download') }}</v-chip>
    <el-dialog v-model="download.showAddTaskDialog" draggable :close-on-click-modal="false" append-to-body
        width="900px">
        <template #header>
            <div class="text"> {{ $t('New Download') }} </div>
        </template>
        <!-- <el-card> -->
        <el-form label-width="120" v-model="form">
            <el-form-item :label="$t('Website')">
                <el-input v-model="form.modWebsite" :placeholder="$t('Website Tip')">
                    <template #append>
                        <el-button @click="parsing" :loading="loading">{{ $t('Analyze') }}</el-button>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item :label="$t('From')">
                <!-- <el-input v-model="form.type" disabled></el-input> -->
                <el-select v-model="form.from" :disabled="editingProhibited">
                    <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"
                        :disabled="item.disabled" />
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('Mod name')" :disabled="editingProhibited">
                <el-input v-model="form.name" :disabled="editingProhibited"></el-input>
            </el-form-item>
            <el-form-item :label="$t('File Name')" :disabled="editingProhibited">
                <el-input v-model="form.fileName" :disabled="editingProhibited"></el-input>
            </el-form-item>
            <el-form-item :label="$t('Version')" :disabled="editingProhibited">
                <el-input v-model="form.version" :disabled="editingProhibited"></el-input>
            </el-form-item>
            <el-form-item :label="$t('Download Link')">
                <el-input v-model="form.link" :disabled="editingProhibited"></el-input>
            </el-form-item>
            <el-form-item :label="$t('Author')">
                <el-input v-model="form.modAuthor" :disabled="editingProhibited"></el-input>
            </el-form-item>
            <el-form-item :label="$t('Tag')">
                <div class="tags">
                    <ModTags :tags="form.tags"></ModTags>
                    <!-- <el-button link>
                        <el-icon>
                            <el-icon-plus></el-icon-plus>
                        </el-icon>
                    </el-button> -->
                    <el-popover :visible="visible" placement="bottom" :width="250">
                        <v-card color="#0000">
                            <v-card-title>{{ $t("Add") }} {{ $t("Tag") }}</v-card-title>
                            <v-card-text>
                                <el-input v-model="tag_name" :placeholder="$t('Name')">
                                    <template #append>
                                        <span class="demonstration">{{ $t("Color") }}</span>
                                        <el-color-picker v-model="tag_color" />
                                    </template>
                                </el-input>
                            </v-card-text>
                            <v-card-actions style="text-align: right; margin: 0">
                                <el-button size="small" text @click="visible = false">{{ $t("Cancel") }}</el-button>
                                <el-button size="small" type="primary" @click="addTag">{{ $t("Add") }}</el-button>
                            </v-card-actions>
                        </v-card>
                        <template #reference>
                            <el-button @click="visible = true"
                                link><el-icon><el-icon-plus></el-icon-plus></el-icon></el-button>
                        </template>
                    </el-popover>
                </div>
            </el-form-item>
            <el-form-item :label="$t('Type')" v-if="settings.settings.managerGame">
                <el-select v-model="form.modType">
                    <el-option v-for="item in settings.settings.managerGame?.modType" :key="item.id" :label="item.name"
                        :value="item.id" />
                </el-select>
            </el-form-item>
        </el-form>
        <v-card-actions>
            <v-btn color="primary" @click="save">{{ $t('OK') }}</v-btn>
            <v-btn @click="download.showAddTaskDialog = false">{{ $t('Cancel') }}</v-btn>
        </v-card-actions>
        <!-- </el-card> -->
    </el-dialog>
</template>
<script lang='ts'>

export default {
    name: 'DownloadAddTask',
}
</script>
<style lang='less' scoped></style>