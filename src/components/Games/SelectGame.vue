<script lang='ts' setup>



const settings = useSettings()

const manager = useManager()

// 快捷 切换游戏
function switchGame(game: ISupportedGames) {
    // console.log(game);
    // manager.supportedGames

    let sGame = manager.supportedGames.find(item => item.GlossGameId == game.GlossGameId)

    settings.settings.managerGame = {
        ...game,
        ...sGame,
    }

    // console.log(settings.settings.managerGame);

    manager.getModInfo()
}

function delSwitchGame(game: ISupportedGames) {
    settings.settings.managerGameList = settings.settings.managerGameList.filter(item => item.gameName !== game.gameName)
}

</script>
<template>
    <!-- <template v-if="settings.settings.managerGameList?.length > 0">
        <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
                <v-btn variant="text" append-icon="mdi-menu-down" v-bind="props">{{ $t('select game') }}</v-btn>
            </template>
<v-list>
    <v-list-item :title="$t('select game')" append-icon="mdi-plus"
        @click="manager.selectGameDialog = true"></v-list-item>
    <v-list-item v-for="item in settings.settings.managerGameList" :key="item.gameName"
        @click.pointer="switchGame(item)" :title="$t(item.gameName)">
        <template v-slot:append>
                        <v-btn icon="mdi-delete-outline" @click="delSwitchGame(item)" variant="text"></v-btn>
                    </template>
    </v-list-item>
</v-list>
</v-menu>
</template>
<template v-else>
        <v-chip label variant="text" append-icon="mdi-plus"
            @click="manager.selectGameDialog = true">{{ $t('select game') }}</v-chip>
    </template> -->
    <v-chip label variant="text" append-icon="mdi-plus" @click="manager.selectGameDialog = true">{{ $t('select game')
        }}</v-chip>
</template>
<script lang='ts'>

export default {
    name: 'SelectGame'
}
</script>
<style lang='less' scoped></style>