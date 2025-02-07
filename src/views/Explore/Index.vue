<script lang='ts' setup>
import Header from "@/views/Explore/Header.vue";
import GlossMod from "@/views/Explore/GlossMod/GlossMod.vue";
import NexusMods from "@/views/Explore/NexusMods/NexusMods.vue";
import Thunderstore from "@/views/Explore/Thunderstore/Thunderstore.vue"
import ModIo from "@/views/Explore/ModIo/ModIo.vue"
import SteamWorkshop from "@/views/Explore/SteamWorkshop/SteamWorkshop.vue"
import CurseForge from "@/views/Explore/CurseForge/CurseForge.vue"
import GameBanana from "@/views/Explore/GameBanana/GameBanana.vue"

const settings = useSettings()

</script>
<template>
    <v-container fluid>
        <Header></Header>
        <template v-if="$route.name == 'Explore'">
            <GlossMod v-if="settings.settings.exploreType == 'GlossMod'"> </GlossMod>
            <NexusMods v-if="settings.settings.exploreType == 'NexusMods'"> </NexusMods>
            <Thunderstore v-if="settings.settings.exploreType == 'Thunderstore'"> </Thunderstore>
            <ModIo v-if="settings.settings.exploreType == 'ModIo'"> </ModIo>
            <SteamWorkshop v-if="settings.settings.exploreType == 'SteamWorkshop'"></SteamWorkshop>
            <CurseForge v-if="settings.settings.exploreType == 'CurseForge'"></CurseForge>
            <GameBanana v-if="settings.settings.exploreType == 'GameBanana'"></GameBanana>
        </template>
        <router-view></router-view>
    </v-container>
</template>
<script lang='ts'>

export default {
    name: 'Explore',
}
</script>
<style lang='less' scoped></style>