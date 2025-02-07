<script lang='ts' setup>

import { watch } from "vue";
import BackupList from '@/views/Backup/BackupList.vue'
import { ElMessageBox } from 'element-plus';
import { useI18n } from 'vue-i18n';
const archive = useArchive()
const { t } = useI18n()

archive.getArchiveList()

watch(() => archive.backupArchiveList, () => {
    archive.saveBackupList()
}, { deep: true })

function del(item: IArchive) {
    ElMessageBox.confirm(t("Are you sure you want to delete this backup?")).then(() => {
        archive.delBackup(item)
    }).catch(() => { })
}

function restoring(item: IArchive) {
    // restoringBackup
    ElMessageBox.confirm(t("Are you sure you want to restore this backup?")).then(() => {
        archive.restoringBackup(item)
    }).catch(() => { })
}

</script>
<template>
    <v-card :title="t('Backup List')">
        <v-card-text>
            <BackupList v-if="archive.backupArchiveList.length > 0" v-for="item in archive.backupArchiveList"
                :item="item" :key="item.time" @del="del(item)" @restoring="restoring(item)" />
            <el-empty v-else :description="t('No backup yet')" />
        </v-card-text>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'ArchiveBackup',
}
</script>
<style lang='less' scoped></style>