<script lang='ts' setup>



const props = defineProps<{
    mod: IModInfo
    index: number
}>()

const sortMod = useSortMod()

//#region 拖拽
function dragstart(e: any, index: number) {
    e.stopPropagation()

    sortMod.dragIndex = index
    setTimeout(() => {
        e.target.classList.add('moveing')
    }, 0)
}
function dragenter(e: any, index: number, mod: IModInfo) {
    e.preventDefault()
    // console.log(mod, e);

    if (sortMod.dragIndex !== index) {
        const source = sortMod.sortModList[sortMod.dragIndex];

        sortMod.sortModList.splice(sortMod.dragIndex, 1);
        sortMod.sortModList.splice(index, 0, source);

        // 更新节点位置
        sortMod.dragIndex = index
    }

}
function dragover(e: any) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
}
function dragend(e: any) {
    e.target.classList.remove('moveing')
}

//#endregion

//#region 手动排序
function up(mod: IModInfo) {
    const index = sortMod.sortModList.findIndex(item => item.md5 === mod.md5)
    if (index === 0) return
    const source = sortMod.sortModList[index];
    sortMod.sortModList.splice(index, 1);
    sortMod.sortModList.splice(index - 1, 0, source);
}
function down(mod: IModInfo) {
    const index = sortMod.sortModList.findIndex(item => item.md5 === mod.md5)
    if (index === sortMod.sortModList.length - 1) return
    const source = sortMod.sortModList[index];
    sortMod.sortModList.splice(index, 1);
    sortMod.sortModList.splice(index + 1, 0, source);
}
function top(mod: IModInfo) {
    const index = sortMod.sortModList.findIndex(item => item.md5 === mod.md5)
    if (index === 0) return
    const source = sortMod.sortModList[index];
    sortMod.sortModList.splice(index, 1);
    sortMod.sortModList.splice(0, 0, source);
}
function bottom(mod: IModInfo) {
    const index = sortMod.sortModList.findIndex(item => item.md5 === mod.md5)
    if (index === sortMod.sortModList.length - 1) return
    const source = sortMod.sortModList[index];
    sortMod.sortModList.splice(index, 1);
    sortMod.sortModList.splice(sortMod.sortModList.length, 0, source);
}

//#endregion

</script>
<template>
    <el-col :span="24">
        <el-row class="mod-list">
            <el-col :span="20" class="name">
                <v-icon class="list-sort" icon="mdi-dots-vertical" draggable="true"
                    @dragstart="dragstart($event, index)" @dragenter="dragenter($event, index, mod)" @dragend="dragend"
                    @dragover="dragover">mdi-dots-vertical</v-icon>
                <p>{{ mod.modName }}</p>
            </el-col>
            <el-col :span="4">
                <el-button variant="text" link :disabled="index == 0" @click="top(mod)">
                    <v-icon>mdi-chevron-double-up</v-icon>
                </el-button>
                <el-button variant="text" link @click="up(mod)"> <v-icon>mdi-menu-up-outline</v-icon> </el-button>
                <el-button variant="text" link @click="down(mod)"> <v-icon>mdi-menu-down-outline</v-icon> </el-button>
                <el-button variant="text" link :disabled="index == sortMod.sortModList.length - 1" @click="bottom(mod)">
                    <v-icon>mdi-chevron-double-down</v-icon>
                </el-button>
            </el-col>
        </el-row>

    </el-col>
</template>
<script lang='ts'>

export default {
    name: 'SortModList',
}
</script>
<style lang='less' scoped>
.mod-list {
    .name {
        display: flex;
    }

    .list-sort {
        // 移动的手势
        cursor: move;

        &:hover {
            color: rgb(var(--v-theme-primary));
        }
    }
}

.list-move,
/* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
    transition: all 0.2s ease;
}
</style>