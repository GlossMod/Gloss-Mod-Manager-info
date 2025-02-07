<script lang='ts' setup>

import DownloadBtn from '@/views/Explore/GameBanana/DownloadBtn.vue'
const gamebanana = useGameBanana()

</script>
<template>
    <v-row v-if="gamebanana.modData">
        <v-col cols="12">
            <el-descriptions size="large" :column="1" border>
                <el-descriptions-item min-width="100" :label="$t('Author')">
                    <v-chip label variant="text" :href="gamebanana.modData._aSubmitter._sProfileUrl" target="_blank">
                        <v-avatar :image="gamebanana.modData._aSubmitter._sAvatarUrl" size="20"></v-avatar>
                        {{ gamebanana.modData._aSubmitter._sName }}
                    </v-chip>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('Release time')">{{ new Date(gamebanana.modData._tsDateAdded ||
                    0).toLocaleString() }}</el-descriptions-item>
                <el-descriptions-item :label="$t('Update time')">{{ new Date(gamebanana.modData._tsDateModified ||
                    0).toLocaleString() }}</el-descriptions-item>
                <el-descriptions-item :label="$t('Download count')">{{ gamebanana.modData._nDownloadCount
                    }}</el-descriptions-item>
                <el-descriptions-item :label="$t('Tour')">{{ gamebanana.modData._nViewCount }}</el-descriptions-item>
                <el-descriptions-item :label="$t('Mark count')">{{ gamebanana.modData._nLikeCount
                    }}</el-descriptions-item>

            </el-descriptions>
        </v-col>
        <v-col cols="12" class="download">
            <v-chip label variant="text" :href="gamebanana.modData._sProfileUrl" target="_blank"
                append-icon="mdi-open-in-new">{{ $t('Open in browser') }}</v-chip>
            <DownloadBtn :mod="gamebanana.modData"></DownloadBtn>
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