<script lang='ts' setup>
// import SelectGame from '@/views/Manager/SelectGame.vue'
import { computed } from "vue";
import GlossModSelectGame from '@/views/Explore/SelectGame.vue'
const settings = useSettings()

let uploadMod = computed(() => {

    if (settings.settings.exploreType == "GlossMod") {
        return `https://mod.3dmgame.com/Workshop/PublishMod?gameId=${settings.settings.managerGame?.GlossGameId}`
    } else if (settings.settings.exploreType == "NexusMods") {
        return `https://www.nexusmods.com/${settings.settings.managerGame?.NexusMods?.game_domain_name}/mods/add`
    } else if (settings.settings.exploreType == "Thunderstore") {
        return `https://thunderstore.io/c/${settings.settings.managerGame?.Thunderstore?.community_identifier}/create/`
    } else if (settings.settings.exploreType == "ModIo") {
        return `https://mod.io/games/${settings.settings.managerGame?.mod_io}/add/mod`
    }
})

</script>
<template>
    <v-app-bar :elevation="0">
        <v-row>
            <v-col cols="12" class="header">
                <div class="left">
                    <SelectGame></SelectGame>
                    <v-chip label variant="text" append-icon="mdi-arrow-expand-up" target="_blank" color="#4FC3F7"
                        :href="uploadMod">
                        {{ $t('Upload a Mod') }}
                    </v-chip>
                    <GlossModSelectGame v-if="!settings.settings.managerGame"></GlossModSelectGame>
                </div>
                <div class="right">
                    <v-chip-group v-model="settings.settings.exploreType" mandatory>
                        <v-chip label variant="text" value="GlossMod">{{ $t('3DM Mods') }} </v-chip>
                        <v-chip label v-if="settings.settings.managerGame?.Thunderstore?.community_identifier"
                            variant="text" value="Thunderstore">{{ $t('Thunderstore') }} </v-chip>
                        <v-chip label v-if="settings.settings.managerGame?.mod_io" variant="text" value="ModIo">{{
                            $t('mod.io') }}</v-chip>
                        <v-chip label v-if="settings.settings.managerGame?.SteamWorkshop" variant="text"
                            value="SteamWorkshop"> {{ $t('SteamWorkshop') }}</v-chip>
                        <v-chip label v-if="settings.settings.managerGame?.curseforge" variant="text"
                            value="CurseForge">{{ $t('CurseForge') }}</v-chip>
                        <v-chip label v-if="settings.settings.managerGame?.gamebanana" variant="text"
                            value="GameBanana">{{ $t('GameBanana') }}</v-chip>
                    </v-chip-group>
                </div>
            </v-col>
        </v-row>
    </v-app-bar>
</template>
<script lang='ts'>

export default {
    name: 'ExploreHeader',
}
</script>
<style lang='less' scoped>
.header {
    display: flex;
    justify-content: space-between;
}
</style>