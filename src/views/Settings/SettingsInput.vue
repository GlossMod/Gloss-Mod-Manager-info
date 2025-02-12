<script lang='ts' setup>
import { ipcRenderer } from "electron";
import { watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
const settings = useSettings()

// 选择mod储存位置
function selectModStorageLocation() {
    ipcRenderer.invoke("select-file", {
        properties: ['openDirectory'],
        filters: []
    }).then((res: string[]) => {
        if (res.length > 0) {
            try {

                // 防呆提示
                let files = FileHandler.getAllFilesInFolder(res[0], false, true)
                if (files.length > 0 && !(files.includes('mod.json'))) {
                    ElMessage.warning(`${res[0]}目录不为空, 请重新选择`)
                    return
                }

                // 判断选择的目录是否包含 "Gloss Mod Manager"
                if (res[0].includes("Gloss Mod Manager")) {
                    ElMessageBox.confirm(`储存目录不能在软件安装目录里面，不然软件更新后Mod会被清空!`, '警告', {
                        confirmButtonText: '好的',
                        cancelButtonText: '取消',
                        type: 'error',
                        dangerouslyUseHTMLString: true
                    }).then(() => {
                        // settings.settings.modStorageLocation = res[0]
                    }).catch(() => { })
                    return
                }

                settings.settings.modStorageLocation = res[0]
            } catch (error) {
                ElMessage.error(`错误: ${error}`)
            }

        }
    })
}

watch(() => settings.settings.autoLaunch, () => {
    ipcRenderer.invoke("set-auto-launch", settings.settings.autoLaunch)
})

</script>
<template>
    <v-row>
        <v-col cols="12">
            <h3 class="title">{{ $t('Settings') }}</h3>
        </v-col>

        <v-col cols="12" md="3">
            <!-- 设置Mod储存路径 -->
            <v-text-field :label="$t('Storage Location')" v-model="settings.settings.modStorageLocation"
                :hint="$t('Mod Folder Tip')" persistent-hint>
                <template v-slot:append-inner>
                    <v-btn variant="text" @click="selectModStorageLocation">{{ $t('Select') }}</v-btn>
                </template>
            </v-text-field>

        </v-col>
        <v-col cols="12" md="3">
            <!-- 设置语言 -->
            <v-select variant="solo" :label="$t('Language')" v-model="settings.settings.language"
                :items="settings.langList" item-title="text" item-value="value"></v-select>
        </v-col>
        <v-col cols="12" md="3">
            <!-- 设置主题 -->
            <v-select variant="solo" :label="$t('Theme')" v-model="settings.settings.theme" :items="[
                { text: $t('Auto'), value: 'system' },
                { text: $t('Light'), value: 'light' },
                { text: $t('Dark'), value: 'dark' },
            ]" item-title="text" item-value="value"></v-select>
        </v-col>
        <v-col cols="3">
            <!-- 默认启动页 -->
            <v-select variant="solo" :label="$t('Default Page')" v-model="settings.settings.defaultPage" :items="[
                { text: $t('Home'), value: 'Home' },
                { text: $t('Games'), value: 'Games' },
                { text: $t('Manager'), value: 'Manager' },
                { text: $t('Tour'), value: 'Explore' },
                { text: $t('Download'), value: 'Download' },
                { text: $t('Backup'), value: 'Backup' },
                { text: $t('Settings'), value: 'Settings' },
                { text: $t('About'), value: 'About' },
            ]" item-title="text" item-value="value"></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3">
            <v-switch
                v-model="settings.settings.showPlugins" 
                :label="$t('Show Plugins List')" color="#039BE5"
                persistent-hint
                :hint="$t('Show required plugins list when connected to network')"
            ></v-switch>
        </v-col>
        <v-col cols="12" sm="6" md="3">
            <v-switch :label="$t('Auto install for download')" color="#039BE5"
                v-model="settings.settings.autoInstall"></v-switch>
        </v-col>
        <v-col cols="12" sm="6" md="3">
            <v-switch :label="$t('Select Game By folder')" color="#039BE5"
                v-model="settings.settings.selectGameByFolder"></v-switch>
        </v-col>
        <v-col cols="12" sm="6" md="3">
            <v-switch :label="$t('Auto start for windows')" color="#039BE5"
                v-model="settings.settings.autoLaunch"></v-switch>
        </v-col>
        <v-col cols="12" sm="6" md="3">
            <v-switch :label="$t('Change in Game run')" color="#039BE5"
                v-model="settings.settings.changeInRun"></v-switch>
        </v-col>
    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'SettingsInput',
}
</script>
<style lang='less' scoped></style>