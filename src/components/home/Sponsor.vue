<script lang='ts' setup>

import ModIo from '@/components/home/logo/ModIo.vue'
import Thunderstore from '@/components/home/logo/Thunderstore.vue'
import CurseForge from '@/components/home/logo/CurseForge.vue'
import NexusMods from '@/components/home/logo/NexusMods.vue'
</script>
<template>
    <v-card>
        <v-card-title>{{ $t('Partner') }}</v-card-title>
        <v-card-text>
            <v-row class="sponsor">
                <v-col cols="4" class="partner">
                    <a href="https://mod.3dmgame.com/" target="_blank">
                        <v-img src="imgs/3DMGAME.webp" alt="3DMGAME" class="gloss-logo"></v-img>
                    </a>
                </v-col>
                <v-col cols="4" class="partner">
                    <a href="https://thunderstore.io/" target="_blank">
                        <Thunderstore width="100%"></Thunderstore>
                    </a>
                </v-col>
                <v-col cols="4" class="partner">
                    <a href="https://mod.io/" target="_blank">
                        <ModIo width="100%"></ModIo>
                    </a>
                </v-col>
                <v-col cols="4" class="partner">
                    <a href="https://www.curseforge.com/" target="_blank">
                        <CurseForge width="100%"></CurseForge>
                    </a>
                </v-col>
                <v-col cols="4" class="partner">
                    <a href="https://gamebanana.com/" target="_blank">
                        <v-img src="imgs/Gamebanana.png" alt="Gamebanana" class="gloss-logo"></v-img>
                    </a>
                </v-col>
                <!-- <v-col cols="4">
                    <a href="https://www.nexusmods.com/">
                        <NexusMods height="84px" width="100%"></NexusMods>
                    </a>
                </v-col> -->
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'Sponsor',
}
</script>
<style lang='less' scoped>
a {
    transition: 1s;

    :hover {
        opacity: .8;
    }
}

.sponsor {
    display: flex;
    align-items: center;

    .gloss-logo {
        width: 300px;
    }

    .partner {
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }
}
</style>