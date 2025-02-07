<script lang='ts' setup>

import DownloadBtn from "@/views/Explore/GlossMod/DownloadBtn.vue"
const content = useContent()

</script>
<template>
    <v-row v-if="content.modData">
        <v-col cols="12">
            <el-descriptions size="large" :column="1" border>
                <el-descriptions-item min-width="100" :label="$t('Author')">{{ content.modData.mods_author
                    }}</el-descriptions-item>
                <el-descriptions-item :label="$t('Update time')">{{ content.modData.mods_updateTime
                    }}</el-descriptions-item>
                <el-descriptions-item :label="$t('Download count')">{{ content.modData.mods_download_cnt
                    }}</el-descriptions-item>
                <el-descriptions-item :label="$t('Mark count')">{{ content.modData.mods_mark_cnt
                    }}</el-descriptions-item>
                <el-descriptions-item :label="$t('Tour')">{{ content.modData.mods_click_cnt }}</el-descriptions-item>
                <el-descriptions-item :label="$t('Version')">{{ content.modData.mods_version }}</el-descriptions-item>
            </el-descriptions>
        </v-col>
        <v-col cols="12" class="download-btn">
            <v-chip label variant="text" :href="`https://mod.3dmgame.com/mod/${content.modData.id}`" target="_blank"
                append-icon="mdi-open-in-new">{{ $t('Open in browser') }}</v-chip>
            <DownloadBtn :id="content.modData.id" :size="content.modData.mods_resource_size"></DownloadBtn>
        </v-col>
    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'ExploreContentInfo',
}
</script>
<style lang='less' scoped>
.download-btn {
    text-align: right;
}
</style>