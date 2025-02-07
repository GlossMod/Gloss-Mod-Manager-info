<script lang='ts' setup>

import { ElMessage } from 'element-plus';
import ArchiveList from '@/views/Backup/ArchiveList.vue'
import ArchiveBackup from '@/views/Backup/ArchiveBackup.vue'
import { useI18n } from 'vue-i18n';
const archive = useArchive()
const { t } = useI18n()

archive.getBackupList()

function openArchive() {
    if (archive.archivePath) FileHandler.openFolder(archive.archivePath)
    else ElMessage.error(t('No save directory set'))
}

function openBackup() {
    FileHandler.openFolder(archive.backupPath)
}

</script>
<template>
    <v-card v-if="archive.archivePath">
        <v-card-title>
            {{ t('Backup Saves') }}
            <v-chip label @click="openArchive" variant="text" append-icon="mdi-folder-open-outline">
                {{ t('Saves Directory') }}</v-chip>
            <v-chip label @click="openBackup" variant="text" append-icon="mdi-folder-zip-outline">
                {{ t('Backup Directory') }}</v-chip>
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="6">
                    <ArchiveList></ArchiveList>
                </v-col>
                <v-col cols="6">
                    <ArchiveBackup></ArchiveBackup>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'Archive',
}
</script>
<style lang='less' scoped></style>