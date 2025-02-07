<script lang='ts' setup>
import { ElMessage } from 'element-plus';
import ContentPack from '@/components/Manager/Pack/Pack.vue'
import ManagerSort from '@/views/Manager/Sort.vue'
import StartGame from '@/views/Manager/StartGame.vue'
import SortMod from '@/views/Manager/SortMod/SortMod.vue'
import SelectionMode from '@/views/Manager/SelectionMode.vue'
import ManagerShare from '@/views/Manager/Share.vue'

const settings = useSettings()
const manager = useManager()
const user = useUser()

function allInstall() {
    if (!user.user) {
        user.loginBox = true
        ElMessage.warning('登录后可使用本功能！')
        return
    }

    let list = manager.filterModList
    // console.log(list);
    list.forEach(item => {
        item.isInstalled = true
    })
}

function allUnInstall() {
    if (!user.user) {
        user.loginBox = true
        ElMessage.warning('登录后可使用本功能！')
        return
    }
    let list = manager.filterModList
    // console.log(list);
    list.forEach(item => {
        item.isInstalled = false
    })
}

function openFolder() {
    const modStorage = `${settings.settings.modStorageLocation}\\${settings.settings.managerGame?.gameName}`
    FileHandler.openFolder(modStorage)
}
function openGameFolder() {
    FileHandler.openFolder(settings.settings.managerGame?.gamePath ?? "")
}

// 每秒检查游戏是否在运行中
setInterval(() => {
    manager.checkRuning()
}, 1000)

</script>
<template>
    <v-app-bar :elevation="0" density="compact">
        <div class="header">
            <div class="header-btn">
                <SelectGame></SelectGame>
                <template v-if="settings.settings.managerGame">
                    <v-chip label variant="text" append-icon="mdi-arrow-bottom-left-thick"
                        @click="manager.selectMoeFiles">{{ $t('Import Mod') }}</v-chip>
                    <StartGame :game="settings.settings.managerGame"></StartGame>
                    <!-- <el-button text @click="settings.settings.fold = !settings.settings.fold">
                        <v-icon
                            :icon="settings.settings.fold ? 'mdi-unfold-more-horizontal' : 'mdi-unfold-less-horizontal'"></v-icon>
                        <v-tooltip activator="parent" location="top">{{ $t('Fold') }}</v-tooltip>
                    </el-button> -->
                    <v-btn variant="text" href="https://gmm.aoe.top/" target="_blank">
                        <v-icon>mdi-help</v-icon>
                        <v-tooltip activator="parent" location="top">{{ $t('Help') }}</v-tooltip>
                    </v-btn>
                    <ManagerShare></ManagerShare>
                    <SortMod v-if="settings.settings.managerGame?.sortMod"></SortMod>
                    <v-menu open-on-hover>
                        <template v-slot:activator="{ props }">
                            <v-btn variant="text" v-bind="props"><v-icon>mdi-menu</v-icon></v-btn>
                        </template>
                        <v-list>
                            <v-list-item :title="$t('Install All')" append-icon="mdi-download"
                                @click="allInstall"></v-list-item>
                            <v-list-item :title="$t('Uninstall All')" append-icon="mdi-close"
                                @click="allUnInstall"></v-list-item>
                            <v-list-item :title="$t('Check Mod Update')" append-icon="mdi-refresh"
                                @click="manager.checkAllModUpdate"></v-list-item>
                            <v-list-item :title="$t('Open Mod Folder')" @click="openFolder"
                                append-icon="mdi-folder-open-outline"></v-list-item>
                            <v-list-item :title="$t('Open Game Folder')" @click="openGameFolder"
                                append-icon="mdi-folder-open-outline"></v-list-item>
                            <ContentPack></ContentPack>
                            <ManagerSort></ManagerSort>
                        </v-list>
                    </v-menu>
                </template>
            </div>
            <div class="select-game">
                <v-chip color="#00C853" variant="text" v-if="manager.runing">{{ $t("Game is running...") }}</v-chip>
                {{ $t('Current Game', [settings.settings.managerGame?.gameName ?
                    $t(settings.settings.managerGame.gameName) :
                    $t('Not Selected')]) }}
            </div>
        </div>
    </v-app-bar>
    <v-app-bar :elevation="0" density="compact">
        <v-col cols="12">
            <SelectionMode></SelectionMode>
        </v-col>
    </v-app-bar>
</template>
<script lang='ts'>

export default {
    name: 'ManagerHeader',
}
</script>
<style lang='less' scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.select-game {
    display: flex;
    align-items: center;
}
</style>