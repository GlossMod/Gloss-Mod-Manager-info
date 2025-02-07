<script lang='ts' setup>

import ContentList from '@/views/Manager/Content/ListWrapper.vue'
import { computed } from "vue";
import ManagerContentTags from '@/views/Manager/Content/Tags.vue'
import ManagerContentGamePlugins from '@/views/Manager/Content/GamePlugins.vue'
const manager = useManager()
const settings = useSettings()

let types = computed(() => {
    return settings.settings.managerGame?.modType ?? []
})

</script>
<template>
    <div class="content">
        <div class="empty" v-if="!settings.settings.managerGame">
            <div @click="manager.selectGameDialog = true" class="empty-hint">
                {{ $t('You have not selected a game yet. Please select a game first') }} <v-icon>mdi-plus</v-icon>
            </div>
        </div>
        <div class="const-list" v-else>
            <v-app-bar :elevation="0" density="compact">
                <v-col cols="12">
                    <div class="const-header">
                        <v-chip-group v-model="manager.filterType" mandatory>
                            <v-chip label variant="text" :value="0">{{ $t('All') }}
                                <small v-if="manager.filterType == 0">({{ manager.filterModList.length }})</small>
                            </v-chip>
                            <v-chip label variant="text" v-for="item in types" :key="item.id" :value="item.id">
                                {{ $t(item.name) }}
                                <small v-if="manager.filterType == item.id">({{ manager.filterModList.length }})</small>
                            </v-chip>
                        </v-chip-group>
                        <div class="const-search">
                            <v-text-field density="compact" variant="solo" :label="$t('Search Mod')"
                                append-inner-icon="mdi-magnify" single-line hide-details
                                v-model="manager.search"></v-text-field>
                        </div>
                    </div>
                </v-col>
            </v-app-bar>
            <v-app-bar :elevation="0" density="compact">
                <v-col cols="12">
                    <ManagerContentTags></ManagerContentTags>
                </v-col>
            </v-app-bar>
            <ManagerContentGamePlugins></ManagerContentGamePlugins>
            <ContentList></ContentList>
        </div>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'ManagerContent',
}
</script>
<style lang='less' scoped>
small {
    font-size: 12px;
    color: #999;
    margin-left: 0.5rem;
}

.const-header {
    display: flex;
    align-items: center;

    .const-search {
        margin-left: 1rem;
        flex: 1 1 auto
    }
}

.app-col {
    padding-top: 0;
    padding-bottom: 0;
}
</style>