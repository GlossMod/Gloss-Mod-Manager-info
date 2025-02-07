<script lang='ts' setup>

import ThunderstoreDownloadBtn from '@/views/Explore/Thunderstore/DownloadBtn.vue'
import { computed } from "vue";
const thunderstore = useThunderstore()

// mod.date_updated = 2023-09-14T06:59:03.293588Z
// 格式化 为 2023-09-14 06:59:03
function time(date: string) {
    return date.split('T')[0] + ' ' + date.split('T')[1].split('.')[0]
}

const webUrl = computed(() => {
    const settings = useSettings()
    let url = 'https://thunderstore.io/'

    let community_identifier = settings.settings.managerGame?.Thunderstore?.community_identifier

    if (community_identifier) {
        url = `https://thunderstore.io/c/${community_identifier}/p/${thunderstore.selected.data?.owner}/${thunderstore.selected.data?.name}/`
    }

    return url
})

</script>
<template>
    <v-row v-if="thunderstore.selected.data">
        <v-col cols="12">
            <el-descriptions size="large" :column="1" border>
                <el-descriptions-item min-width="100" :label="$t('Author')">{{ thunderstore.selected.data.owner
                    }}</el-descriptions-item>
                <!-- <el-descriptions-item :label="$t('Update time')">{{ time }}</el-descriptions-item> -->
                <el-descriptions-item :label="$t('Download count')">{{ thunderstore.selected.data.latest?.downloads
                    }}</el-descriptions-item>
                <el-descriptions-item :label="$t('Release time')">{{ time(thunderstore.selected.data.date_created)
                    }}</el-descriptions-item>
                <el-descriptions-item :label="$t('Update time')">{{ time(thunderstore.selected.data.date_updated)
                    }}</el-descriptions-item>
                <!-- <el-descriptions-item :label="$t('Version')">{{ content.modData.mods_version }}</el-descriptions-item> -->
            </el-descriptions>
        </v-col>
        <v-col cols="12" class="download-btn">
            <v-chip label variant="text" :href="webUrl" target="_blank" append-icon="mdi-open-in-new">
                {{ $t('Open in browser') }}</v-chip>
            <ThunderstoreDownloadBtn :mod="thunderstore.selected.data"></ThunderstoreDownloadBtn>
        </v-col>
    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'ContentInfo',
}
</script>
<style lang='less' scoped>
.download-btn {
    text-align: right;
}
</style>