<script lang='ts' setup>



import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import GlossModSelectedGames from '@/views/Explore/SelectedGames.vue'
const explore = useExplore()
const manager = useManager()
const settings = useSettings()
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

function select(all: boolean) {
    if (all) {
        settings.settings.tourGameList = list.value.map(item => item.GlossGameId)
    } else {
        // 反选
        settings.settings.tourGameList = list.value.filter(item => !settings.settings.tourGameList.includes(item.GlossGameId)).map(item => item.GlossGameId)
    }
}

function isOk() {
    // console.log(settings.settings.tourGameList);
    explore.showTourGameListDialog = false
}

</script>
<template>
    <v-dialog v-model="explore.showTourGameListDialog" persistent width="900px">
        <template v-slot:activator="{ props }">
            <v-chip append-icon="mdi-package-variant-closed" v-bind="props" label variant="text"> 选择游览游戏</v-chip>
        </template>
        <v-card>
            <v-card-title>
                <v-col cols="12" class="top">
                    <div class="title">
                        <div class="text">
                            {{ $t('select game') }}
                            <small>({{ ` ${settings.settings.tourGameList.length}/${list.length}` }})</small>
                            <v-chip label append-icon="mdi-check" @click="select(true)" variant="text">全选</v-chip>
                            <v-chip label append-icon="mdi-close" @click="select(false)" variant="text">反选</v-chip>
                        </div>
                        <v-text-field density="compact" variant="solo" :label="$t('Search Game')"
                            append-inner-icon="mdi-magnify" single-line hide-details
                            v-model="searchText"></v-text-field>
                    </div>
                    <div class="close">
                        <v-chip label append-icon="mdi-close" @click="explore.showTourGameListDialog = false"
                            variant="text">{{
                                $t('Close') }}</v-chip>
                    </div>
                </v-col>
            </v-card-title>
            <v-card-text class="content">
                <v-card v-if="settings.settings.tourGameList.length > 0">
                    <v-card-title>已选游戏</v-card-title>
                    <v-card-text>
                        <v-row class="selected-games">
                            <v-col cols="2" v-for="item in settings.settings.tourGameList" :key="item">
                                <GlossModSelectedGames :id="item"></GlossModSelectedGames>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-item-group multiple v-model="settings.settings.tourGameList">
                    <v-row class="list-wrap">
                        <v-item v-for="item in list" v-slot="{ isSelected, toggle }" :value="item.GlossGameId">
                            <v-col class="game-list" cols="2" @click="toggle" :class="isSelected ? 'primary' : ''">
                                <v-row no-gutters>
                                    <v-col cols="12">
                                        <v-img :lazy-src="lazy_img" :aspect-ratio="247 / 139" :src="item.gameCoverImg"
                                            :alt="item.gameName" min-height="90px" />
                                    </v-col>
                                    <v-col class="game-name" cols="12">{{ $t(item.gameName) }}</v-col>
                                </v-row>
                            </v-col>
                        </v-item>
                    </v-row>
                </v-item-group>
            </v-card-text>
            <v-card-actions class="flex-row-reverse">
                <v-chip label variant="text" @click="isOk">确定</v-chip>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang='ts'>

export default {
    name: 'GlossModSelectGame',
}
</script>
<style lang='less' scoped>
.content {
    min-height: 300px;
    max-height: 400px;
    overflow: auto;

    .selected-games {
        margin-bottom: 10px;
        // 横向滚动条
        overflow-x: auto;
        white-space: nowrap;
        flex-wrap: nowrap;
    }

    .list-wrap {

        .game-list {
            cursor: pointer;

            &:hover {
                background-color: rgba(0, 0, 0, 0.2);
            }
        }

        .primary {
            background-color: rgba(0, 0, 0, 0.6);

        }
    }
}
</style>