<script lang='ts' setup>

import { ElMessageBox } from 'element-plus';
import { computed, watch } from "vue";
const props = defineProps<{
    mod: IModInfo,
    showAdvanced: boolean
}>()

const emits = defineEmits(["changeAdvanced"])

if (!props.mod.advanced) {
    props.mod.advanced = {
        enabled: false,
        data: {}
    }
}

const settings = useSettings()

const advanced = computed(() => {
    return settings.settings.managerGame?.modType.find((item) => {
        return item.id == props.mod.modType
    })?.advanced
})
const show = computed({
    get: () => props.showAdvanced,
    set: (value) => emits('changeAdvanced', value)
})

watch(() => props.mod.advanced?.enabled, () => {
    if (props.mod.advanced && props.mod.advanced.enabled) {
        ElMessageBox.confirm("您将打开高级设置, 如果不了解请不要随意开启此选项, 否则会导致Mod或游戏损坏!", "警告", {
            confirmButtonText: '继续开启',
            cancelButtonText: '算了',
            type: 'warning',
        }).then(() => {
            props.mod.advanced!.enabled = true

            advanced?.value?.item.forEach(item => {
                if (!props.mod.advanced?.data[item.key]) props.mod.advanced!.data[item.key] = item.defaultValue
            });

        }).catch(() => {
            props.mod.advanced!.enabled = false
        })
    }
})

</script>
<template>
    <!-- <v-btn v-if="advanced" variant="text" size="small" @click="showAdvanced = true"
        :title="advanced.name"><v-icon>{{ advanced.icon }}</v-icon></v-btn> -->
    <Teleport to="body">
        <el-dialog v-model="show" :close-on-click-modal="false" width="600" align-center :title="advanced?.name">
            <el-form v-if="mod.advanced" label-width="150px" v-model="mod.advanced">
                <el-form-item :label="$t('开启')">
                    <el-switch v-model="mod.advanced.enabled"></el-switch>
                </el-form-item>
                <el-form-item v-if="mod.advanced.enabled" v-for="item in advanced?.item" :label="item.label">
                    <el-input v-if="item.type == 'input'" v-model="mod.advanced.data[item.key]"></el-input>
                    <el-select v-if="item.type == 'selects'" v-model="mod.advanced.data[item.key]" value-key="value">
                        <el-option v-for="option in item.selectItem" :key="option.value" :label="option.name"
                            :value="option.value">
                        </el-option>
                    </el-select>
                    <el-switch v-if="item.type == 'switch'" v-model="mod.advanced.data[item.key]"></el-switch>
                </el-form-item>
            </el-form>
        </el-dialog>
    </Teleport>
</template>
<script lang='ts'>

export default {
    name: 'ContentAdvanced',
}
</script>
<style lang='less' scoped></style>