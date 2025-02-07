<script lang='ts' setup>


const news = useNews()
const manager = useManager()

news.getSupportedGames()
news.getNewMods()
news.getHotMods()

</script>
<template>
    <v-card>
        <v-card-text>
            <v-row>
                <v-col cols="4">
                    <v-card>
                        <v-card-title class="title">
                            {{ $t('New Games') }}
                            <v-chip label variant="text" append-icon="mdi-chevron-double-right"
                                @click="manager.selectGameDialog = true">{{ $t('More') }}</v-chip>
                        </v-card-title>
                        <v-card-text>
                            <v-list>
                                <v-list-item v-for="item in news.SupportedGames" :key="item">{{ item }}</v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <v-card>
                        <v-card-title class="title">
                            {{ $t('New Mods') }}
                            <v-chip label variant="text" append-icon="mdi-chevron-double-right"
                                :to="{ name: 'Explore' }">{{ $t('More') }}</v-chip>
                        </v-card-title>
                        <v-card-text>
                            <v-list>
                                <v-list-item v-for="item in news.newMods" :key="item.id"
                                    :to="{ name: 'GlossModContent', params: { modId: item.id } }">
                                    {{ item.mods_title }}
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <v-card>
                        <v-card-title class="title">
                            {{ $t('Hot Mods') }}
                            <v-chip label variant="text" append-icon="mdi-chevron-double-right"
                                :to="{ name: 'Explore' }">{{ $t('More') }}</v-chip>
                        </v-card-title>
                        <v-card-text>
                            <v-list>
                                <v-list-item v-for="item in news.hotMods" :key="item.id"
                                    :to="{ name: 'GlossModContent', params: { modId: item.id } }">
                                    {{ item.mods_title }}
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'News',
}
</script>
<style lang='less' scoped>
.title {
    display: flex;
    justify-content: space-between;
}
</style>