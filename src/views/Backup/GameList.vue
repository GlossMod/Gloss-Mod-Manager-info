<script lang='ts' setup>

import { ElMessage, ElMessageBox, ElTree } from 'element-plus';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
const backupGame = useBackupGame()
const { t } = useI18n()

const treeRef = ref<InstanceType<typeof ElTree>>()

function getChiden(item: ITree[]) {
    let list = [] as string[]
    item.forEach(item => {
        list.push(item.filePath)
        if (item.children) {
            list.push(...getChiden(item.children))
        }
    })
    return list
}

const allList = computed(() => {
    let list = getChiden(backupGame.gameFileList)
    return list
})

// 全选
function selectAll() {
    treeRef.value?.setCheckedKeys(allList.value)
}

// 反选
function reverseSelect() {
    let node = treeRef.value?.getCheckedKeys()
    let list = allList.value
    let result = list.filter(item => !node?.includes(item))
    treeRef.value?.setCheckedKeys(result)
}

function backup() {
    let node = treeRef.value?.getCheckedNodes()

    if (node && node.length > 0) {
        ElMessageBox.prompt(t("Backup Name"), {
            title: t("Backup")
        }).then(name => {
            if (name.value) {

                // 判断 名称是否已经在 archive.backupArchiveList 中
                if (backupGame.backupFileList.find(item => item.name === name.value)) {
                    ElMessage.warning(t("Name already exists"))
                    return
                }
                if (node) backupGame.backup(node, name.value)
            } else {
                ElMessage.warning(t("Please enter a name"))
            }
        }).catch(() => { })
    } else {
        ElMessage.warning(t("Please select at least one saves to back up"))
    }
}
</script>
<template>
    <v-card>
        <v-card-title>
            {{ t('Game Folder') }}
            <el-button text @click="backupGame.getGameFileList">{{ t('Refresh') }}
                <v-icon>mdi-restart</v-icon></el-button>
            <el-button text @click="selectAll">{{ t('Select All') }} <v-icon>mdi-check</v-icon> </el-button>
            <el-button text @click="reverseSelect">{{ t('Invert Select') }}
                <v-icon>mdi-shuffle-variant</v-icon></el-button>
            <el-button text @click="backup">{{ t('Backup') }} <v-icon>mdi-content-save-all-outline</v-icon></el-button>
        </v-card-title>
        <v-card-text>
            <el-tree show-checkbox :data="backupGame.gameFileList" node-key="filePath" ref="treeRef"
                :empty-text="t('The game directory is empty')">
            </el-tree>
        </v-card-text>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'GameList',
}
</script>
<style lang='less' scoped></style>