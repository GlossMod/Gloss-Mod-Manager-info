<script lang='ts' setup>
import { onUnmounted, watch } from 'vue'
import { ElMessage } from 'element-plus';
import PackList from '@/components/Manager/Pack/List.vue'
import PackInpurtInfo from '@/components/Manager/Pack/Inpurt/Info.vue'
import PackLogs from '@/components/Manager/Pack/Logs.vue'
import PackFinish from '@/components/Manager/Pack/Finish.vue'
const packs = usePacks()

function prev() {
    packs.step--
    if (packs.step < 1) packs.step = 1
}

function next() {
    packs.step++
    if (packs.step > packs.length) packs.step = packs.length
}

function install() {
    if (packs.packs.length == 0) {
        ElMessage.warning('请先选择要导入的模组');
        return;
    }
    packs.step = 3
    packs.installGmm()
}

watch(() => packs.dialog, () => {
    if (packs.dialog == false) packs.clear()
})

watch(() => packs.inpurtDialog, () => {
    if (packs.inpurtDialog == false) packs.clear()
})

</script>
<template>
    <v-dialog v-model="packs.inpurtDialog" persistent width="900px">
        <v-card class="pack">
            <v-card-title>
                <v-col cols="12" class="top">
                    <div class="title">
                        <div class="text">
                            {{ $t('inport') }}
                        </div>
                    </div>
                    <div class="close">
                        <v-chip label append-icon="mdi-close" @click="packs.inpurtDialog = false" variant="text">{{
                            $t('Close') }}</v-chip>
                    </div>
                </v-col>
            </v-card-title>
            <v-card-text>
                <v-window v-model="packs.step">
                    <v-window-item :value="1">
                        <PackInpurtInfo></PackInpurtInfo>
                    </v-window-item>
                    <v-window-item :value="2">
                        <PackList :mod-list="packs.inputPacks"
                            :subheader="$t('Please select a mod to {0}', [$t('inport')])"></PackList>
                    </v-window-item>
                    <v-window-item :value="3">
                        <PackLogs></PackLogs>
                    </v-window-item>
                    <v-window-item :value="4">
                        <!-- 完成 -->
                        <PackFinish type="inport" />
                    </v-window-item>
                </v-window>
            </v-card-text>
            <v-card-actions class="justify-space-between">
                <!-- || packs.step == 3 -->
                <v-btn variant="plain" prepend-icon="mdi-chevron-left" @click="prev" :disabled="packs.step == 1">{{
                    $t('Previous') }}</v-btn>
                <v-btn v-if="packs.step == 1" variant="plain" append-icon="mdi-chevron-right" @click="next">{{
                    $t('Next') }}</v-btn>
                <v-btn v-else-if="packs.step == 2" variant="text" append-icon="mdi-download-multiple"
                    @click="install">{{ $t('inport') }}</v-btn>
                <v-btn v-else variant="plain" append-icon="mdi-check" :disabled="packs.step == 3"
                    @click="packs.inpurtDialog = false">{{ $t('Finish') }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang='ts'>

export default {
    name: 'PackInport',
}
</script>
<style lang='less' scoped></style>