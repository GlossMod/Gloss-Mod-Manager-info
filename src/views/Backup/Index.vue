<script lang='ts' setup>
import Archive from '@/views/Backup/Archive.vue'
import BackupGame from '@/views/Backup/Game.vue'
</script>
<template>
    <v-container fluid>
        <Archive></Archive>
        <v-divider></v-divider>
        <BackupGame></BackupGame>
    </v-container>
</template>
<script lang='ts'>

export default {
    name: 'Backup',
}
</script>
<style lang='less' scoped></style>