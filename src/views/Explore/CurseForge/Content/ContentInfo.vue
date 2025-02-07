<script lang='ts' setup>

import DownloadBtn from '@/views/Explore/CurseForge/DownloadBtn.vue'
const curseforge = useCurseForge()

</script>
<template>
    <v-row v-if="curseforge.modData">
        <v-col cols="12">
            <el-descriptions size="large" :column="1" border>
                <el-descriptions-item min-width="100" :label="$t('Author')">
                    <v-chip label variant="text" v-for="item in curseforge.modData.authors" :key="item.id"
                        :href="item.url" target="_blank">
                        {{ item.name }}
                    </v-chip>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('Release time')">{{ new
                    Date(curseforge.modData.dateReleased).toLocaleString() }}</el-descriptions-item>
                <el-descriptions-item :label="$t('Update time')">{{ new
                    Date(curseforge.modData.dateModified).toLocaleString() }}</el-descriptions-item>
                <el-descriptions-item :label="$t('Download count')">{{ curseforge.modData.downloadCount
                    }}</el-descriptions-item>
            </el-descriptions>
        </v-col>
        <v-col cols="12" class="download">
            <v-chip label variant="text" :href="curseforge.modData.links.websiteUrl" target="_blank"
                append-icon="mdi-open-in-new">{{ $t('Open in browser') }}</v-chip>
            <DownloadBtn :mod="curseforge.modData"></DownloadBtn>
        </v-col>
    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'ContentInfo',
}
</script>
<style lang='less' scoped>
.download {
    text-align: right;
}
</style>