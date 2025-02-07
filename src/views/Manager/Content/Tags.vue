<script lang='ts' setup>

import { ElMessage, ElMessageBox } from 'element-plus';
import { ref } from 'vue';
const manager = useManager()
let visible = ref(false)
let name = ref("")
let color = ref("#14F7D8")

function add() {
    if (name.value != "") {
        manager.tags.push({
            name: name.value,
            color: color.value
        })
        name.value = ""
        visible.value = false
    } else {
        ElMessage.warning("名称不能为空！")
    }
}

function del(item: ITag) {
    ElMessageBox.confirm(`确定要删除标签: ${item.name} 吗?`).then(() => {
        // 从 manager.tags 中 移除 item
        manager.tags = manager.tags.filter(tag => tag.name != item.name)
    }).catch(() => {
        // props.mod.modType = ondValue
    })
    return false
}

// 标签 拖拽排序

function dragstart(e: any, index: number, item: ITag) {
    e.stopPropagation()
    e.dataTransfer.setData('name', item.name)
    e.dataTransfer.setData('color', item.color)
    manager.dragIndex = index
    setTimeout(() => {
        e.target.classList.add('moveing')
    }, 0)
}
function dragenter(e: any, index: number) {
    e.preventDefault()
    // 拖拽到原位置时不触发
    if (manager.dragIndex !== index) {
        manager.tags.splice(index, 0, manager.tags.splice(manager.dragIndex, 1)[0])
        manager.dragIndex = index
    }
}
function dragover(e: any) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
}
function dragend(e: any) {
    e.target.classList.remove('moveing')
}

</script>
<template>
    <div class="tags">
        <v-chip-group class="group" v-model="manager.filterTags" multiple>
            <v-chip class="chip" v-for="(item, index) in manager.tags" :key="item.name" label variant="text"
                :value="item" :draggable="true" @dragstart="dragstart($event, index, item)"
                @dragenter="dragenter($event, index)" @dragend="dragend" @dragover="dragover">
                <!-- <v-chip label variant="text" :color="item.color"> </v-chip> -->
                <div :style="{ color: item.color }">{{ item.name }}</div>
                <template #append>
                    <v-btn variant="text" size="x-small" icon="mdi-close" @click.stop="del(item)"></v-btn>
                    <!-- <v-icon icon="mdi-close" size="small"></v-icon> -->
                </template>
            </v-chip>
            <el-popover :visible="visible" placement="bottom" :width="250">
                <v-card color="#0000">
                    <v-card-title>{{ $t("Add") }} {{ $t("Tag") }}</v-card-title>
                    <v-card-text>
                        <el-input v-model="name" :placeholder="$t('Name')">
                            <template #append>
                                <span class="demonstration">{{ $t("Color") }}</span>
                                <el-color-picker v-model="color" />
                            </template>
                        </el-input>
                    </v-card-text>
                    <v-card-actions style="text-align: right; margin: 0">
                        <el-button size="small" text @click="visible = false">{{ $t("Cancel") }}</el-button>
                        <el-button size="small" type="primary" @click="add">{{ $t("Add") }}</el-button>
                    </v-card-actions>
                </v-card>
                <template #reference>
                    <el-button @click="visible = true"><v-icon>mdi-plus</v-icon></el-button>
                </template>
            </el-popover>
        </v-chip-group>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'ManagerContentTags',
}
</script>
<style lang='less' scoped>
.tags {

    .group {
        display: flex;
        align-items: center;
        // 滚动条
        overflow: auto;
        flex-wrap: nowrap;

        .chip {
            min-width: 80px;
        }
    }
}
</style>