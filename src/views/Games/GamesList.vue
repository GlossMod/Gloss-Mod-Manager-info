<script lang='ts' setup>
import { useRouter } from "vue-router"
import StartGame from '@/views/Manager/StartGame.vue'
import { join } from 'path'
const props = defineProps<{
    item: ISupportedGames
}>()

const settings = useSettings()
const manager = useManager()
const router = useRouter()
const games = useGames()

function ChangeGame() {
    let sgame = manager.supportedGames.find(item => item.GlossGameId == props.item.GlossGameId)

    AppAnalytics.sendEvent(`switch_game`, props.item.gameName)

    settings.settings.managerGame = {
        ...props.item,
        ...sgame
    }
    router.push({ name: 'Manager' })
}

function Delete() {
    settings.settings.managerGameList = settings.settings.managerGameList.filter(item => item.GlossGameId !== props.item.GlossGameId)
}

function openGameFolder() {
    FileHandler.openFolder(props.item.gamePath ?? "")
}

function openModFolder() {
    FileHandler.openFolder(join(settings.settings.modStorageLocation, props.item.gameName))
}

</script>
<template>
    <v-col cols="12" v-if="games.showLst">
        <el-row class="list" @click="ChangeGame">
            <el-col :span="20">{{ $t(item.gameName) }}</el-col>
            <el-col :span="4">
                <v-menu open-on-hover>
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props">
                            <v-icon>mdi-menu</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item :title="$t('Open Mod Folder')" @click="openModFolder"
                            append-icon="mdi-folder-open-outline"></v-list-item>
                        <v-list-item :title="$t('Open Game Folder')" @click="openGameFolder"
                            append-icon="mdi-folder-open-outline"></v-list-item>
                        <v-list-item @click="Delete" append-icon="mdi-delete-outline">{{ $t("Delete") }}</v-list-item>
                    </v-list>
                </v-menu>
                <StartGame :game="item"></StartGame>
            </el-col>
        </el-row>
    </v-col>
    <v-col cols="3" v-else>
        <v-card>
            <v-img class="cover" @click="ChangeGame" :aspect-ratio="16 / 9" :src="item.gameCoverImg"></v-img>
            <v-card-text>{{ $t(item.gameName) }}</v-card-text>
            <v-card-actions class="actions">
                <v-menu open-on-hover>
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props">
                            <v-icon>mdi-menu</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item :title="$t('Open Mod Folder')" @click="openModFolder"
                            append-icon="mdi-folder-open-outline"></v-list-item>
                        <v-list-item :title="$t('Open Game Folder')" @click="openGameFolder"
                            append-icon="mdi-folder-open-outline"></v-list-item>
                        <v-list-item @click="Delete" append-icon="mdi-delete-outline">{{ $t("Delete") }}</v-list-item>
                    </v-list>
                </v-menu>
                <StartGame :game="item"></StartGame>
            </v-card-actions>
        </v-card>
    </v-col>
</template>
<script lang='ts'>

export default {
    name: 'GameList',
}
</script>
<style lang='less' scoped>
.cover {
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
}

.actions {
    display: flex;
    justify-content: space-between;
}

.list {
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        // 底部阴影
        box-shadow: 0 0 10px rgba(var(--v-theme-on-surface), 0.3);
    }
}
</style>