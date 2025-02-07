<script lang='ts' setup>

import Markdown from '@/components/Model/Markdown.vue'
const packs = usePacks()

</script>
<template>
    <v-card>
        <v-card-title>{{ packs.Info.name }}</v-card-title>
        <v-card-subtitle>
            <v-chip variant="text"> {{ `${$t('Author')}: ${packs.Info.author}` }} </v-chip>
            <v-chip variant="text"> {{ ` ${$t('Version')}: ${packs.Info.version}` }} </v-chip>
        </v-card-subtitle>
        <v-card-text>
            <Markdown :text="packs.Info.description ?? $t('No introduction')"></Markdown>
        </v-card-text>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'PackInpurtInfo',
}
</script>
<style lang='less' scoped></style>