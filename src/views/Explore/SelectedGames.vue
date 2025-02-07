<script lang='ts' setup>

import { computed } from "vue";


const props = defineProps<{
    id: number
}>()

const manager = useManager()
const settings = useSettings()
const { lazy_img } = useMain()

const data = computed(() => {
    return manager.supportedGames.find(item => item.GlossGameId === props.id)
})

function del() {
    settings.settings.tourGameList = settings.settings.tourGameList.filter(item => item !== props.id)
}

</script>
<template>
    <v-row v-if="data" class="games" no-gutters>
        <div class="close-btn">
            <v-btn icon="mdi-close" @click="del"></v-btn>
        </div>
        <v-col cols="12">
            <v-img :lazy-src="lazy_img" :aspect-ratio="247 / 139" :src="data.gameCoverImg" :alt="data.gameName"
                min-height="90px" />
        </v-col>
        <v-col class="game-name" cols="12">{{ $t(data.gameName) }}</v-col>
    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'GlossModSelectedGames',
}
</script>
<style lang='less' scoped>
.games {
    position: relative;

    .close-btn {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
    }

    &:hover {
        .close-btn {
            display: block;
        }
    }
}
</style>