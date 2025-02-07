<script lang='ts' setup>
import { ipcRenderer } from "electron";
import { dirname, join } from 'path'
import { ElMessage } from "element-plus";
import { ref, computed } from "vue"
import { useI18n } from "vue-i18n";


const manager = useManager()
const settings = useSettings()
const games = useGames()
const { lazy_img } = useMain()
const { t } = useI18n()

let searchText = ref("")

let list = computed<ISupportedGames[]>(() => {
    const list = manager.supportedGames.map((item) => ({
        name: t(item.gameName),
        game: item,
    }));
    const filterList = list.filter(({ name }) =>
        name.toLowerCase().includes(searchText.value.toLowerCase())
    );
    return filterList.map(({ game }) => game);

})

// =========== 让用户选择指定游戏 ===========
function select(item: ISupportedGames) {

    let arg = {
        properties: ['openFile'],
        filters: [{ name: '游戏主程序', extensions: ['exe'] }],
        defaultPath: Steam.getSteamGamePath(item.steamAppID, item.installdir)
    }

    if (settings.settings.selectGameByFolder) {
        arg.properties = ['openDirectory']
    }

    ipcRenderer.invoke("select-file", arg).then((arg: string[]) => {
        if (arg.length > 0) {
            let folder = settings.settings.selectGameByFolder ? arg[0] : dirname(arg[0])

            let files = FileHandler.getAllFilesInFolder(folder)

            if (typeof (item.gameExe) == 'string') {
                // 判断 item.gameExe 是否存在于 files 中
                if (files.includes(item.gameExe)) {
                    settings.settings.managerGame = item
                    settings.settings.managerGame.gamePath = folder

                } else {
                    ElMessage.error(`请选择 ${item.gameExe} 所在目录.`)
                    return
                }
            } else {
                // 判断 item.gameExe 是否存在于 files 中
                let exe = item.gameExe.find(item => files.includes(item.name))
                if (exe) {
                    // console.log(exe);
                    settings.settings.managerGame = item
                    settings.settings.managerGame.gamePath = join(folder, exe.rootPath)
                } else {
                    let exename = item.gameExe.map(item => item.name).join(' 或 ')
                    ElMessage.error(`请选择 ${exename} 所在目录.`)
                    return
                }
            }

            // console.log(settings.settings);
            manager.selectGameDialog = false
            manager.getModInfo()
            AppAnalytics.sendEvent(`switch_game`, item.gameName)

            // 判断 settings.settings.managerGameList 中是否有 item
            let game = settings.settings.managerGameList?.find(game => game.gameName === item.gameName)
            if (game) {
                // game = item
                // 更新 settings.settings.managerGameList
                settings.settings.managerGameList = settings.settings.managerGameList.map(game => {
                    if (game.gameName === item.gameName) {
                        return item
                    } else {
                        return game
                    }
                })
            } else {
                settings.settings.managerGameList = [...settings.settings.managerGameList, item]
            }
        }
    })
}

const ExpandsGameRef = ref()

function editGame(item: ISupportedGames) {
    console.log(ExpandsGameRef.value);
    ExpandsGameRef.value.setForm(item)
    games.showExpandsGame = true
}

</script>
<template>
    <ExpandsGame ref="ExpandsGameRef"></ExpandsGame>
    <Dialog v-model="manager.selectGameDialog" persistent width="900px">
        <template #header>
            <div class="title">
                <div class="text">
                    {{ $t('select game') }}
                    <small>({{ $t('{0} games', [list.length]) }})</small>
                </div>
                <el-input v-model="searchText" :placeholder="$t('Search Game')" />
            </div>
        </template>
        <div class="select-game">
            <v-row>
                <v-col cols="12" class="content">
                    <v-row>
                        <v-col cols="6" sm="4" md="3" class="game-list expands-games"
                            @click="games.showExpandsGame = true">
                            <v-icon>mdi-plus</v-icon>
                            {{ $t("Create a custom game") }}
                        </v-col>
                        <v-col cols="6" sm="4" md="3" class="game-list" v-for="item in list" :key="item.gameName"
                            @click="select(item)">
                            <el-row no-gutters>
                                <el-col :span="24" class="game-image">
                                    <v-img :lazy-src="lazy_img" :aspect-ratio="247 / 139" :src="item.gameCoverImg"
                                        :alt="item.gameName" min-height="90px" />
                                    <div class="from" v-if="item.from">{{ $t(item.from) }}</div>
                                </el-col>
                                <v-col class="game-name" cols="12">
                                    {{ $t(item.gameName) }}
                                    <el-button link v-if="item.from == 'Local'" @click.stop="editGame(item)">
                                        编辑 <el-icon><el-icon-edit /></el-icon>
                                    </el-button>
                                </v-col>
                            </el-row>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </div>
    </Dialog>
</template>
<script lang='ts'>

export default {
    name: 'SelectGameWindows',
}
</script>
<style lang='less' scoped>
.title {
    display: flex;
    align-items: center;

    .text {
        flex: 1 0 auto;
        margin-right: 15px;
    }
}

.select-game {
    padding: 1rem;

    .content {
        min-height: 300px;
        max-height: 400px;
        overflow: auto;

        .game-list {
            cursor: pointer;
            transition: background-color 0.3s ease-in-out;

            &:hover {
                background-color: rgba(0, 0, 0, 0.6);
            }

            .game-name {
                margin-top: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }

        .expands-games {
            display: flex;
            justify-content: center;
            align-items: center;
            // 虚线边框
            flex-direction: column;
        }

        .game-image {
            position: relative;

            .from {
                position: absolute;
                color: black;
                // 字体加粗
                font-weight: bold;
                top: 8px;
                right: -15px;
                transform: rotate(45deg);
                height: 0;
                border-left: 20px solid transparent;
                border-right: 20px solid transparent;
                border-bottom: 20px solid yellow;
            }
        }
    }
}
</style>