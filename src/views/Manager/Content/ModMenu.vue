<script lang='ts' setup>



import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { join } from 'path'
import ContentAdvanced from '@/views/Manager/Content/Advanced.vue'
const props = defineProps<{
    mod: IModInfo
}>()

const settings = useSettings()
const manager = useManager()
const download = useDownload()
const { t } = useI18n()

let showEdit = ref(false)
let showAdvanced = ref(false)

let type = computed<IType | undefined>(() => {
    return settings.settings.managerGame?.modType.find((item) => {
        return item.id == props.mod.modType
    })
})

const advanced = computed(() => {
    return settings.settings.managerGame?.modType.find((item) => {
        return item.id == props.mod.modType
    })?.advanced
})

let modStorage = computed({
    get: () => join(settings.settings.modStorageLocation, settings.settings.managerGame?.gameName ?? "", props.mod.id.toString()),
    set: (value) => { }
})
let MD5 = computed({
    get: () => props.mod.md5,
    set: (value) => { }
})
let Website = computed({
    get: () => {
        if (props.mod.modWebsite) return props.mod.modWebsite
        if (props.mod.webId) return `https://mod.3dmgame.com/mod/${props.mod.webId}`
        // if (props.mod.nexus_id) {
        //     // nomanssky_1750
        //     // https://www.nexusmods.com/nomanssky/mods/1750
        //     if (props.mod.nexus_id.match(/(.+)_(\d+)/)) {
        //         let [, game, id] = props.mod.nexus_id.match(/(.+)_(\d+)/) ?? []
        //         return `https://www.nexusmods.com/${game}/mods/${id}`
        //     }
        // }
        else return undefined
    },
    set: (value) => {
        props.mod.modWebsite = value
    }
})

function open() {
    // let modStorage = `${settings.settings.modStorageLocation}\\${settings.settings.managerGame.gameName}\\${props.mod.id}`
    let modStorage = join(settings.settings.modStorageLocation, settings.settings.managerGame?.gameName ?? "", props.mod.id.toString())
    FileHandler.openFolder(modStorage)
}

function openWeb() {
    if (Website.value) {
        window.open(Website.value)
    } else {
        ElMessage.error(t('This mod has no website'))
    }
}

function toDel() {
    if (props.mod.isInstalled) {
        if (typeof (type.value?.uninstall) == 'function') {
            type.value?.uninstall(props.mod)
        }
    }
    FileHandler.writeLog(`删除: ${props.mod.modName}`)
    manager.deleteMod(props.mod)
}

function del() {
    ElMessageBox.confirm(t('Are you sure you want to delete this Mod?'), { draggable: true })
        .then(toDel)
        .catch(() => { })
}

async function reinstall() {
    manager.updateMod(props.mod)
    toDel()

}

</script>
<template>
    <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
            <v-btn variant="text" v-bind="props">
                <v-badge v-if="mod.isUpdate" dot floating color="success">
                    <v-icon>mdi-menu</v-icon>
                </v-badge>
                <v-icon v-else>mdi-menu</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item append-icon="mdi-square-edit-outline" :title="t('Edit')" @click="showEdit = true">
            </v-list-item>
            <v-list-item v-if="advanced" :append-icon="advanced.icon" :title="advanced.name"
                @click="showAdvanced = true"></v-list-item>
            <v-list-item append-icon="mdi-folder-open-outline" :title="t('Open')" @click="open"></v-list-item>
            <v-list-item v-if="Website" append-icon="mdi-web" :title="t('Website')" @click="openWeb"></v-list-item>
            <v-list-item v-if="(props.mod.webId || mod.from)" :title="t('Update')" @click="reinstall"
                :disabled="manager.canChange">
                <template v-slot:append>
                    <v-badge v-if="mod.isUpdate" dot floating color="success">
                        <v-icon>mdi-refresh</v-icon>
                    </v-badge>
                    <v-icon v-else>mdi-refresh</v-icon>
                </template>
            </v-list-item>
            <v-list-item append-icon="mdi-trash-can-outline" :title="t('Delete')" @click="del"
                :disabled="manager.canChange">
            </v-list-item>
        </v-list>
    </v-menu>
    <Teleport to="body">
        <el-dialog v-model="showEdit" :close-on-click-modal="false" width="600" align-center :title="$t('Edit')">
            <el-form label-width="80px">
                <el-form-item :label="t('Name')">
                    <el-input v-model="mod.modName"></el-input>
                </el-form-item>
                <el-form-item :label="t('Version')">
                    <el-input v-model="mod.modVersion"></el-input>
                </el-form-item>
                <el-form-item :label="t('Tag')">
                    <el-select multiple style="width: 100%" v-model="mod.tags" value-key="name">
                        <el-option v-for="item in manager.tags" :key="item.name" :label="item.name" :value="item"
                            class="option">
                            <div :style="{ color: item.color }">{{ item.name }}</div>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="t('MD5')">
                    <el-input v-model="MD5" disabled></el-input>
                </el-form-item>
                <el-form-item :label="t('Storage Location')">
                    <el-input v-model="modStorage" disabled></el-input>
                </el-form-item>
                <el-form-item :label="t('Website')">
                    <el-input v-model="Website"></el-input>
                </el-form-item>
                <el-form-item :label="t('Author')">
                    <el-input v-model="mod.modAuthor"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>
    </Teleport>
    <ContentAdvanced :mod="mod" :showAdvanced="showAdvanced" @changeAdvanced="(value: any) => showAdvanced = value">
    </ContentAdvanced>
</template>
<script lang='ts'>

export default {
    name: 'ContentModMenu',
}
</script>
<style lang='less' scoped>
.info {
    padding: 1rem;
    box-shadow: 0 0 5px black;

    * {
        // 允许复制
        user-select: text;
    }

    .option {
        z-index: 9999;
    }
}
</style>