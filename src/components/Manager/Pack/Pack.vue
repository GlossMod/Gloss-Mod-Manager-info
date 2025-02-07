<script lang='ts' setup>

import { ipcRenderer } from 'electron';
import { ElMessage, ElMessageBox } from 'element-plus';
import PackInfo from '@/components/Manager/Pack/Info.vue'
import PackList from '@/components/Manager/Pack/List.vue'
import PackLogs from '@/components/Manager/Pack/Logs.vue'
import PackFinish from '@/components/Manager/Pack/Finish.vue'
import PackMessage from '@/components/Manager/Pack/Message.vue'
const packs = usePacks()
const manager = useManager()

function prev() {
    packs.step--
    if (packs.step < 1) packs.step = 1
    if (packs.step == 3) packs.step = 2
}

function next() {
    packs.step++
    if (packs.step > packs.length) packs.step = packs.length
}

function selectExportPath() {
    if (!packs.Info.name) {
        packs.step = 1;
        ElMessage.warning('请先填写包的名称');
        return;
    }
    if (packs.packs.length == 0) {
        packs.step = 2;
        ElMessage.warning('请先选择要打包的模组');
        return;
    }
    // 选择导出目录
    ipcRenderer.invoke("save-file", {
        properties: ['showOverwriteConfirmation'],
        filters: [
            { name: 'Gloss Mod Manager Pack', extensions: ['gmm'] }
        ],
        title: '选择导出路径',
        defaultPath: `${packs.Info.name}.gmm`
    }).then(async (res: string) => {
        if (res != '') {
            packs.exportPath = res
            packs.packToGmm()
            packs.step = 3
        }
    })
}


</script>
<template>
    <v-dialog v-model="packs.dialog" persistent width="900px">
        <template v-slot:activator="{ props }">
            <v-list-item append-icon="mdi-package-variant-closed" :title="$t('Pack')" v-bind="props"></v-list-item>
        </template>
        <v-card class="pack">
            <v-card-title>
                <v-col cols="12" class="top">
                    <div class="title">
                        <div class="text">
                            {{ $t('Pack') }}
                        </div>
                    </div>
                    <div class="close">
                        <v-chip label append-icon="mdi-close" @click="packs.dialog = false" :disabled="packs.step == 3"
                            variant="text">{{ $t('Close') }}</v-chip>
                    </div>
                </v-col>
            </v-card-title>
            <v-card-text>
                <v-window v-model="packs.step">
                    <v-window-item :value="1">
                        <!-- 信息 -->
                        <PackInfo />
                        <PackMessage></PackMessage>
                    </v-window-item>
                    <v-window-item :value="2">
                        <!-- 列表 -->
                        <PackList :modList="manager.managerModList"
                            :subheader="$t('Please select a mod to {0}', [$t('package')])" />
                    </v-window-item>
                    <v-window-item :value="3">
                        <!-- 日志 -->
                        <PackLogs />
                    </v-window-item>
                    <v-window-item :value="4">
                        <!-- 完成 -->
                        <PackFinish type="pack" />
                    </v-window-item>
                </v-window>
            </v-card-text>
            <v-card-actions class="justify-space-between">
                <v-btn variant="plain" prepend-icon="mdi-chevron-left" @click="prev"
                    :disabled="packs.step == 1 || packs.step == 3">{{ $t('Previous') }}</v-btn>
                <v-item-group v-if="packs.step <= 2" v-model="packs.step" class="text-center" mandatory>
                    <v-item v-for="n in packs.length - 1" :key="`btn-${n}`" v-slot="{ isSelected, toggle }" :value="n">
                        <!-- <v-btn :variant="isSelected ? 'outlined' : 'text'" icon="mdi-record" @click="toggle"></v-btn> -->
                        <v-btn variant="text" :color="isSelected ? '#1E88E5' : ''" icon="mdi-record"
                            @click="toggle"></v-btn>
                    </v-item>
                </v-item-group>
                <v-btn v-if="packs.step == 1" variant="plain" append-icon="mdi-chevron-right" @click="next">{{
                    $t('Next')
                    }}</v-btn>
                <v-btn v-else-if="packs.step == 2" variant="plain" append-icon="mdi-content-save-all-outline"
                    @click="selectExportPath">{{ $t('package') }}</v-btn>
                <v-btn v-else variant="plain" append-icon="mdi-check" :disabled="packs.step == 3"
                    @click="packs.dialog = false">{{ $t('Finish') }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang='ts'>

export default {
    name: 'ContentPack',
}
</script>
<style lang='less' scoped></style>