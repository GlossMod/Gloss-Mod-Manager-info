<script lang='ts' setup>

import SortModList from "@/views/Manager/SortMod/ModList.vue"
import { ElMessage } from "element-plus"
const sortMod = useSortMod()

const settings = useSettings()

sortMod.init()

// 应用排序
function toSortMod() {
    if (settings.settings.managerGame?.sortMod) {
        sortMod.sortModList = sortMod.sortModList.map((item, index) => {
            item.weight = index;
            return item;
        });
        if (settings.settings.managerGame.sortMod(sortMod.sortModList)) {
            ElMessage.success('排序成功')
        } else {
            ElMessage.warning('排序失败')
        }
    }
}

</script>
<template>
    <v-btn @click="sortMod.dialogVisible = true" variant="text">
        <v-icon>mdi-sort</v-icon>
        <v-tooltip activator="parent" location="top">{{ $t('Mod Sort') }}</v-tooltip>
    </v-btn>
    <Teleport to="body">
        <el-dialog v-model="sortMod.dialogVisible" title="排序管理" width="70%" :draggable="true"
            :close-on-click-modal="false">
            <v-card color="#0000" v-if="settings.settings.managerGame?.sortMod">
                <v-card-title class="title">
                    <div class="btn">
                        <div class="left">
                            <v-btn variant="text" append-icon="mdi-tray-arrow-down"> 导入排序 </v-btn>
                            <v-btn variant="text" append-icon="mdi-tray-arrow-up">导出排序</v-btn>
                            <v-btn variant="text" append-icon="mdi-refresh" @click="sortMod.init">刷新</v-btn>
                        </div>
                        <div class="right">
                            <v-badge dot color="#0097A7">
                                <v-btn variant="text" append-icon="mdi-check-bold" @click="toSortMod">应用</v-btn>
                            </v-badge>
                        </div>
                    </div>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="wrap">
                    <TransitionGroup name="list" tag="el-row" class="container">
                        <template v-for="(item, index) in sortMod.sortModList" :key="item.md5">
                            <SortModList :mod="item" :index="index"></SortModList>
                        </template>
                    </TransitionGroup>
                </v-card-text>
            </v-card>
        </el-dialog>
    </Teleport>
</template>
<script lang='ts'>

export default {
    name: 'SortMod',
}
</script>
<style lang='less' scoped>
.title {
    .btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}

.wrap {
    max-height: 400px;
    overflow-y: auto;
}
</style>