<script lang='ts' setup>

import ModIoDownloadBtn from "@/views/Explore/ModIo/DownloadBtn.vue"
import { computed } from 'vue';
const modio = useModIo()

let time = computed(() => new Date((modio.selected.data?.date_updated || 0) * 1000).toLocaleString())

</script>
<template>
    <v-row>
        <v-col cols="12">
            <el-descriptions size="large" :column="1" border>
                <el-descriptions-item min-width="100" :label="$t('Author')">{{
                    modio.selected.data?.submitted_by.username }}</el-descriptions-item>
                <el-descriptions-item :label="$t('Update time')">{{ time }}</el-descriptions-item>
                <el-descriptions-item :label="$t('Download count')">{{ modio.selected.data?.stats.downloads_total
                    }}</el-descriptions-item>
                <el-descriptions-item :label="$t('Mark count')">{{ modio.selected.data?.stats.ratings_positive
                    }}</el-descriptions-item>
                <el-descriptions-item :label="$t('Subscribers')">{{ modio.selected.data?.stats.subscribers_total
                    }}</el-descriptions-item>
                <!-- <el-descriptions-item :label="$t('Version')">{{ content.modData.mods_version }}</el-descriptions-item> -->
            </el-descriptions>
        </v-col>
        <v-col cols="12" class="download-btn">
            <v-chip label variant="text" :href="modio.selected.data?.profile_url" target="_blank"
                append-icon="mdi-open-in-new">{{ $t('Open in browser') }}</v-chip>
            <ModIoDownloadBtn v-if="modio.selected.data" :mod="modio.selected.data"></ModIoDownloadBtn>
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