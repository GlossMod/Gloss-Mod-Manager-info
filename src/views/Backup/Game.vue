<script lang='ts' setup>


import GameList from '@/views/Backup/GameList.vue'
import GameBackup from '@/views/Backup/GameBackup.vue'
const backupGame = useBackupGame()

backupGame.getGameFileList()

function openGameFolder() {
    FileHandler.openFolder(backupGame.gamePath || "")
}

function openBackup() {
    FileHandler.openFolder(backupGame.backupPath || "")
}

</script>
<template>
    <v-card>
        <v-card-title>
            {{ $t('Backup Games') }}
            <v-chip label @click="openGameFolder" variant="text" append-icon="mdi-folder-open-outline">
                {{ $t('Game Folder') }}</v-chip>
            <v-chip label @click="openBackup" variant="text" append-icon="mdi-folder-zip-outline">
                {{ $t('Backup Directory') }}</v-chip>
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="6">
                    <GameList></GameList>
                </v-col>
                <v-col cols="6">
                    <GameBackup></GameBackup>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'Game',
}
</script>
<style lang='less' scoped></style>