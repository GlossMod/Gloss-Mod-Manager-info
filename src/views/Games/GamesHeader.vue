<script lang='ts' setup>

import SelectGame from '@/components/Games/SelectGame.vue'
import GameList from '@/views/Games/GamesList.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n';
const games = useGames()
const manager = useManager()
const { t } = useI18n()
const Settings = useSettings()

const gameList = computed(() => {

    let list = Settings.settings.managerGameList
    if (games.search != '') {
        list = list.filter(item => t(item.gameName).includes(games.search))
    }

    console.log(list);

    return list
})

</script>
<template>
    <v-app-bar :elevation="0" density="compact">
        <v-container fluid>
            <v-row>
                <v-col cols="4" class="hader-lift">
                    游戏库 <SelectGame></SelectGame>
                    <v-btn @click="games.showLst = !games.showLst">
                        <v-icon v-if="games.showLst">mdi-view-comfy</v-icon>
                        <v-icon v-else>mdi-format-list-bulleted</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="8">
                    <v-text-field hide-details variant="solo" append-inner-icon="mdi-magnify" placeholder="搜索游戏"
                        v-model="games.search">
                    </v-text-field>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>

    <v-card>
        <v-card-text>
            <v-row>
                <v-col cols="3" v-if="!games.showLst">
                    <div class="add-game" @click="manager.selectGameDialog = true"></div>
                    <div class="add-game-text">{{ $t("Add Game") }}</div>
                </v-col>
                <GameList v-for="item in gameList" :key="item.GlossGameId" :item="item"></GameList>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'GamesHeader',
}
</script>
<style lang='less' scoped>
.hader-lift {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.add-game {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 50px auto;
    cursor: pointer;


    &::before,
    &::after {
        content: '';
        position: absolute;
        background: transparent;
        border-style: dashed;
        border-color: rgb(--v-theme-surface);
        // 动画时间 1s
        transition: all .6s;
    }

    &::before {
        top: 50%;
        left: 0;
        right: 0;
        height: 0;
        border-width: 1px 0 0 0;
    }

    &::after {
        top: 0;
        bottom: 0;
        left: 50%;
        width: 0;
        border-width: 0 0 0 1px;
    }

    &:hover {

        &::before,
        &::after {
            opacity: .5;
        }
    }
}

.add-game-text {
    text-align: center;
}
</style>