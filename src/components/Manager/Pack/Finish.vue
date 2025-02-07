<script lang='ts' setup>

import path from 'path'
const packs = usePacks()
const props = defineProps<{
    type: 'pack' | 'inport'
}>()

function open() {
    // console.log(path.dirname(packs.exportPath));
    FileHandler.openFolder(path.dirname(packs.exportPath))
}

</script>
<template>
    <el-result v-if="type == 'pack'" icon="success" :title="$t('Finish')"
        :sub-title="$t('Your GMM package has been exported, you can...')">
        <template #extra>
            <v-btn variant="text" append-icon="mdi-share-variant" href="https://mod.3dmgame.com/Workshop/PublishMod">{{
                $t('Share to Mod Station') }}</v-btn>
            <v-btn variant="text" append-icon="mdi-folder-open-outline" @click="open">{{ $t('Open location') }}</v-btn>
        </template>
    </el-result>
    <el-result v-else-if="type == 'inport'" icon="success" :title="$t('Finish')"
        :sub-title="$t('Import completed, you can now enable these mods in the manager and enter the game...')">
    </el-result>
</template>
<script lang='ts'>

export default {
    name: 'PackFinish',
}
</script>
<style lang='less' scoped></style>