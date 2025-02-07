<script lang='ts' setup>
import { ref, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";

const manager = useManager()
const settings = useSettings()
const { t } = useI18n()

//#region 变量
let showEdit = ref(false)
let modDetails = ref({
    modVersion: "",
    tags: [] as ITag[],
    modWebsite: "",
    modAuthor: "",
    modType: 0,
})
//#endregion

//#region 监听
watch(() => modDetails.value.modVersion, (newVal) => {
    for (const mod of manager.selectionList) {
        mod.modVersion = newVal;
    }
});
watch(() => modDetails.value.tags, (newVal) => {
    for (const mod of manager.selectionList) {
        mod.tags = newVal;
    }
}, { deep: true });
watch(() => modDetails.value.modWebsite, (newVal) => {
    for (const mod of manager.selectionList) {
        mod.modWebsite = newVal;
    }
});
watch(() => modDetails.value.modAuthor, (newVal) => {
    for (const mod of manager.selectionList) {
        mod.modAuthor = newVal;
    }
});
watch(() => modDetails.value.modType, (newVal) => {
    if (newVal) {
        for (const mod of manager.selectionList) {
            mod.modType = newVal;
        }
    }
})

//#endregion

//#region 方法

// 选择全部
function selectAll() {
    manager.selectionList = manager.filterModList
}
// 取消选择
function unselectAll() {
    manager.selectionList = []
}
// 反选
function selectInvert() {
    manager.selectionList = manager.filterModList.filter(item => !manager.selectionList.includes(item))
}
// 编辑
function edit() {
    if (manager.selectionList.length > 0) {
        modDetails.value = {
            modVersion: getCommonValue(manager.selectionList, 'modVersion') as string,
            tags: getTags(manager.selectionList) as ITag[],
            modWebsite: getCommonValue(manager.selectionList, 'modWebsite') as string,
            modAuthor: getCommonValue(manager.selectionList, 'modAuthor') as string,
            modType: getCommonValue(manager.selectionList, 'modType') as number,
        }
        showEdit.value = true
    } else {
        ElMessage.warning('请选择要编辑的Mod')
    }
}
// 获取相同的值
function getCommonValue(list: IModInfo[], key: keyof IModInfo) {
    const firstValue = list[0][key] || '';
    return list.every(item => item[key] === firstValue) ? firstValue : '';
}

function getTags(list: IModInfo[]) {
    const tags = list.map(item => item.tags).flat()

    // 深度 去重
    let arr = [...new Set(tags.map(item => item ? JSON.stringify(item) : undefined))].map(item => item ? JSON.parse(item) : undefined);
    // console.log(arr);

    return arr
}

// 全部安装
function allInstall() {
    manager.selectionList.forEach(item => {
        item.isInstalled = true
    })
}
// 全部卸载
function allUnInstall() {
    manager.selectionList.forEach(item => {
        item.isInstalled = false
    })
}
// 全部删除
function allDelete() {
    ElMessageBox.confirm(t('Are you sure you want to delete this Mod?'), { draggable: true })
        .then(toDel)
        .catch(() => { })
}
function toDel() {
    manager.selectionList.forEach(item => {
        item.isInstalled = false
        FileHandler.writeLog(`delete: ${item.modName}`)
        manager.deleteMod(item)
    })
    manager.selectionList = []

}
//#endregion
</script>
<template>
    <el-switch v-model="manager.selectionMode" :inactive-text="$t('Selection Mode')" />
    <template v-if="manager.selectionMode">
        <div class="btn">
            <el-button @click="selectAll" text>
                <v-icon>mdi-check</v-icon>
                <v-tooltip activator="parent" location="top">{{ $t('Select All') }}</v-tooltip>
            </el-button>
            <el-button @click="unselectAll" text>
                <v-icon>mdi-close</v-icon>
                <v-tooltip activator="parent" location="top">{{ $t('Unselect All') }}</v-tooltip>
            </el-button>
            <el-button @click="selectInvert" text>
                <v-icon>mdi-shuffle-variant</v-icon>
                <v-tooltip activator="parent" location="top">{{ $t('Invert Select') }}</v-tooltip>
            </el-button>
            <template v-if="manager.selectionList.length > 0">
                <el-button @click="edit" text>
                    <v-icon>mdi-square-edit-outline</v-icon>
                    <v-tooltip activator="parent" location="top">{{ $t('Edit') }}</v-tooltip>
                </el-button>
                <el-button @click="allInstall" text>
                    <v-icon>mdi-download</v-icon>
                    <v-tooltip activator="parent" location="top">{{ $t('Install') }}</v-tooltip>
                </el-button>
                <el-button @click="allUnInstall" text>
                    <v-icon>mdi-download-off</v-icon>
                    <v-tooltip activator="parent" location="top">{{ $t('Uninstall') }}</v-tooltip>
                </el-button>
                <el-button @click="allDelete" text>
                    <v-icon>mdi-trash-can</v-icon>
                    <v-tooltip activator="parent" location="top">{{ $t('Delete') }}</v-tooltip>
                </el-button>
            </template>
        </div>
    </template>
    <Teleport to="body">
        <el-dialog v-model="showEdit" :close-on-click-modal="false" width="600" align-center :title="$t('Edit')">
            <el-form label-width="80px">
                <el-form-item :label="$t('Version')">
                    <el-input v-model="modDetails.modVersion"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Tag')">
                    <el-select multiple style="width: 100%" v-model="modDetails.tags" value-key="name">
                        <el-option v-for="item in manager.tags" :key="item.name" :label="item.name" :value="item"
                            class="option">
                            <div :style="{ color: item.color }">{{ item.name }}</div>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('Type')">
                    <el-select v-model="modDetails.modType" style="width: 100%">
                        <el-option v-for="item in settings.settings.managerGame?.modType" :key="item.id"
                            :label="$t(item.name)" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('Website')">
                    <el-input v-model="modDetails.modWebsite"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Author')">
                    <el-input v-model="modDetails.modAuthor"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>
    </Teleport>
</template>
<script lang='ts'>

export default {
    name: 'SelectionMode',
}
</script>
<style lang='less' scoped>
.btn {
    display: inline;
    padding: 0 1rem;
}
</style>