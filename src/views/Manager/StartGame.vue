<script lang='ts' setup>
import { join } from 'path';
import { exec } from 'child_process';
import { ElMessage } from 'element-plus';
const props = defineProps<{
    game: ISupportedGames
}>()

async function startGame(startExe: string) {

    startExe = join(props.game?.gamePath ?? "", startExe)
    FileHandler.runExe(startExe)
    ElMessage.success("启动成功~")
}

function startGameByCmd(cmd: string) {
    console.log(cmd);

    exec(`start ${cmd}`)
    ElMessage.success("启动成功~")
}

</script>
<template>
    <template v-if="game?.startExe">
        <v-chip label variant="text" v-if="typeof (game.startExe) == 'string'"
            @click="startGame(game.startExe as string)" append-icon="mdi-menu-right">{{ $t("Launch Game") }}</v-chip>
        <v-menu v-else open-on-hover>
            <template v-slot:activator="{ props }">
                <v-chip label variant="text" v-bind="props" @click="1" append-icon="mdi-menu-right">
                    {{ $t('Launch Game') }}
                </v-chip>
            </template>
            <v-card>
                <v-list>
                    <template v-for="item in game.startExe">
                        <v-list-item v-if="item.exePath" :title="$t(item.name)"
                            @click="startGame(item.exePath)"></v-list-item>
                        <v-list-item v-if="item.cmd" :title="$t(item.name)"
                            @click="startGameByCmd(item.cmd)"></v-list-item>
                    </template>

                </v-list>
            </v-card>
        </v-menu>
    </template>
</template>
<script lang='ts'>

export default {
    name: 'StartGame',
}
</script>
<style lang='less' scoped></style>