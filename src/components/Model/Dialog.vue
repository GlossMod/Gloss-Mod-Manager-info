<script lang='ts' setup>

const model = defineModel<boolean>()

const props = defineProps({
    draggable: {
        type: Boolean,
        default: true
    }
})

const emits = defineEmits(['close'])

</script>
<template>
    <el-dialog class="dialog" v-model="model" :draggable="draggable" :close-on-click-modal="false" append-to-body
        width="900px" :show-close="false" @close="emits('close')">
        <template #header>
            <div class="title">
                <div class="title-content">
                    <slot name="header"></slot>
                </div>
                <el-button link @click="model = false">
                    <el-icon><el-icon-close></el-icon-close></el-icon>
                </el-button>
            </div>
        </template>
        <template #default>
            <slot></slot>
        </template>
        <template #footer>
            <slot name="footer"></slot>
        </template>

    </el-dialog>
</template>
<script lang='ts'>

export default {
    name: 'Dialog',
}
</script>
<style lang='less' scoped>
.dialog {
    z-index: 100000000;
}

.title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title-content {
        flex-grow: 1;
    }
}
</style>
