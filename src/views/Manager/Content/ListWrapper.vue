<script lang='ts' setup>
import ContentModList from '@/views/Manager/Content/ModList.vue'
// import { webUtils } from 'electron'

const manager = useManager()
// 移入时触发 第一次
function dragenter(event: DragEvent) {
}
// 移出时触发
function dragleave(event: DragEvent) {
}

// 拖入时触发 一直
function dragover() { }

// 拖拽添加文件
async function drop(event: DragEvent) {
    let files = event.dataTransfer?.files
    if (files) {
        manager.installLoading = true
        for (let i = 0; i < files.length; i++) {
            let file = files[i]
            const { webUtils } = require('electron')
            const path = webUtils.getPathForFile(file)
            // console.log(path);
            await manager.addModFile(path)
        }
        manager.installLoading = false
    }
}

</script>
<template>
    <div class="list-wrap" @dragenter.prevent="dragenter($event)" @dragleave.prevent="dragleave"
        @drop.prevent="drop($event)" @dragover.prevent="dragover">
        <v-card :loading="manager.installLoading">
            <template v-slot:loader="{ isActive }">
                <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
            </template>
            <div class="mod-list" v-if="manager.filterModList.length > 0">
                <v-col cols="12">
                    <v-row>
                        <v-col cols="6">{{ $t('Name') }}</v-col>
                        <v-col cols="1">{{ $t('Version') }}</v-col>
                        <v-col cols="2" class="text-center">{{ $t('Type') }}</v-col>
                        <v-col cols="2" class="text-center">{{ $t('Status') }}</v-col>
                        <v-col cols="1" class="text-center">{{ $t('Action') }}</v-col>
                    </v-row>
                </v-col>
                <TransitionGroup name="list" tag="div" class="container">
                    <template v-for="(item, index) in manager.filterModList">
                        <ContentModList v-if="item" :key="item.md5" :mod="item" :index="index"></ContentModList>
                    </template>
                </TransitionGroup>
            </div>
            <div class="empty" v-else>
                <div class="empty-hint" @click="manager.selectMoeFiles">
                    <p>{{ $t('Drag and drop the Mod compressed package here for management') }}</p>
                    <p>{{ $t('Supports zip, rar, 7z file types') }}</p>
                </div>
            </div>
        </v-card>

    </div>
</template>
<script lang='ts'>

export default {
    name: 'ManagerContentListWrapper',
}
</script>
<style lang='less' scoped>
.list-wrap {
    .mod-list {
        padding: 1rem;
        padding-top: 0;
        min-height: 400px;
    }
}

.empty-hint {
    flex-direction: column;
}

.list-move,
/* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
    transition: all 0.2s ease;
}
</style>