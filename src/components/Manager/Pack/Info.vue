<script lang='ts' setup>



import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const packs = usePacks()
const manager = useManager()
const { t } = useI18n()
const settings = useSettings()
const user = useUser()

let gameList = computed(() => {
    const list = manager.supportedGames.map((item) => ({
        name: t(item.gameName),
        id: item.GlossGameId,
    }));
    return list
})

packs.Info.gameID = settings.settings.managerGame?.GlossGameId
packs.Info.author = user.user?.user_nickName

// console.log(packs.Info.gameID);

</script>
<template>
    <v-row>
        <v-col cols="12">
            <v-text-field :label="$t('Name')" v-model="packs.Info.name" variant="underlined"></v-text-field>
        </v-col>
        <v-col cols="4">
            <v-text-field :label="$t('Author')" v-model="packs.Info.author" variant="underlined"></v-text-field>
        </v-col>
        <v-col cols="4">
            <v-text-field :label="$t('Version')" v-model="packs.Info.version" variant="underlined"></v-text-field>
        </v-col>
        <v-col cols="4">
            <v-select v-model="packs.Info.gameID" variant="underlined" :items="gameList" :hide-details="true"
                item-title="name" item-value="id">
            </v-select>
        </v-col>
        <v-col cols="12">
            <v-textarea :label="$t('Desc')" v-model="packs.Info.description" variant="outlined" rows="3"></v-textarea>
        </v-col>
    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'PackInfo',
}
</script>
<style lang='less' scoped></style>