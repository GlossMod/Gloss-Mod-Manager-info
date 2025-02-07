<script lang='ts' setup>

import { computed, ref } from 'vue'
const props = defineProps<{
    item: IArchive
}>()
const emit = defineEmits(['del', 'restoring'])

const { formatSiez } = useMain()
const time = computed(() => {
    return new Date(props.item.time).toLocaleString()
})

const edit = ref(false)

</script>
<template>
    <el-row class="backup-list">
        <el-col :span="15">
            <template v-if="edit">
                <el-input v-model="item.name" @blur="edit = false" @keydown.enter="edit = false" />
            </template>
            <p v-else @dblclick="edit = true">
                {{ item.name }}
                <span class="time">{{ time }}</span>
                <span class="size">{{ formatSiez(item.size) }}</span>
            </p>

        </el-col>
        <el-col :span="9">
            <el-button text type="danger" @click="emit('del')">{{ $t('Delete') }} <v-icon>mdi-delete-outline</v-icon>
            </el-button>
            <el-button text type="success" @click="emit('restoring')">{{ $t('Revert') }}
                <v-icon>mdi-reply-outline</v-icon>
            </el-button>
        </el-col>
    </el-row>
</template>
<script lang='ts'>

export default {
    name: 'BackupList',
}
</script>
<style lang='less' scoped>
.backup-list {
    transition: all 0.3s;
    padding: 0.4rem;

    &:hover {
        // 底部阴影
        box-shadow: 0 0 10px rgba(var(--v-theme-on-surface), 0.3);
    }

    .time,
    .size {
        opacity: .5;
        font-size: 0.7rem;
        margin-left: 0.5rem;
    }
}
</style>