<script lang='ts' setup>

import { ipcRenderer } from "electron";
import { ElMessage } from "element-plus";
import { join } from "node:path"
import { useI18n } from 'vue-i18n';
const main = useMain()
const settings = useSettings()
const i18n = useI18n()

let langIsCn = computed(() => {
    // console.log(locale);
    return i18n.locale.value.includes("zh")
})


function openDownloadCache() {
    let downloadCachePath = join(settings.settings.modStorageLocation, "cache")
    FileHandler.openFolder(downloadCachePath)

}

function openGameFolder() {
    FileHandler.openFolder(settings.settings.managerGame?.gamePath ?? "")
}

async function exportLang() {

    console.log(i18n);
    // 获取所有语言
    const languages = i18n.availableLocales;
    // console.log(languages);
    languages.forEach(lang => {
        // 获取语言数据
        const langData = i18n.getLocaleMessage(lang);
        let data = {
            data: {
                name: settings.langList.find(item => item.value == lang)?.text,
                code: lang,
                author: "",
                version: main.version,
            },
            Language: langData
        }
        LocalLang.saveLanguage(data)
    })

    FileHandler.openFolder(LocalLang.langFolder)
}

function checkUpdates() {
    ipcRenderer.invoke('check-for-updates')
}

</script>
<template>
    <v-row>
        <v-col cols="12">
            <h3>{{ $t('Features') }}</h3>
        </v-col>
        <v-col cols="12">
            <!-- <v-chip label variant="text" append-icon="mdi-delete-clock-outline" @click="clearCache">
                {{ $t('Clean cache') }}
                <small>({{ main.formatSiez(cache) }})</small>
            </v-chip> -->
            <v-chip label variant="text" append-icon="mdi-folder-download-outline" @click="openDownloadCache">
                {{ $t('Open Download Folder') }}
            </v-chip>
            <v-chip label variant="text" v-if="settings.settings.managerGame"
                append-icon="mdi-folder-arrow-right-outline" @click="openGameFolder">{{ $t('Open Game Folder')
                }}</v-chip>
            <v-chip label variant="text" append-icon="mdi-export-variant" @click="exportLang">{{ $t('Export Language')
                }}</v-chip>
            <v-chip label variant="text" @click="checkUpdates">{{ `${$t('Current version')}: v${main.version}`
                }}</v-chip>
        </v-col>
        <v-col cols="12">
            <h3>{{ $t('Feedback') }}</h3>
        </v-col>
        <v-col cols="12">
            <v-chip variant="text" label append-icon="mdi-text-box-search-outline" href="https://gmm.aoe.top/">
                {{ $t('Document') }}
            </v-chip>
            <v-chip variant="text" label append-icon="mdi-qqchat" href="https://qm.qq.com/q/3PzfmR1sBi">
                {{ $t('QQChat') }}
            </v-chip>
            <v-chip variant="text" label append-icon="mdi-github"
                href="https://github.com/GlossMod/Gloss-Mod-Manager-info/issues">
                Github
            </v-chip>
            <v-chip v-if="!langIsCn" variant="text" label href="https://discord.gg/TF46tu7Upw">
                <template v-slot:append>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor"
                        class="bi bi-discord" viewBox="0 0 16 16">
                        <path
                            d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                    </svg>
                </template>
                Discord </v-chip>
        </v-col>
        <!-- <v-col cols="12">
            <h3>{{ $t('Support') }}</h3>
        </v-col>
        <v-col cols="12">
            <v-chip variant="text" label append-icon="mdi-patreon"
                href="https://www.patreon.com/GlossModManager">Patreon</v-chip>
            <v-chip variant="text" label href="https://discord.gg/TF46tu7Upw">
                <template v-slot:append>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-discord"
                        viewBox="0 0 16 16">
                        <path
                            d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                    </svg>
                </template>
                Discord </v-chip>
            <v-chip variant="text" label href="https://aoe.top/donate"
                append-icon="mdi-gift-outline">{{ $t('Feed Xiaom') }}</v-chip>
        </v-col> -->
    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'SettingsBtn',
}
</script>
<style lang='less' scoped>
.bi {
    margin-left: 6px;
}
</style>