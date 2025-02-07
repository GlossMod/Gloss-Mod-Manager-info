<script lang='ts' setup>

const props = defineProps<{
    title: string
}>()

</script>
<template>
    <el-tooltip class="box-item" effect="dark" content="Top Left prompts info" placement="top-start">
        <slot></slot>
    </el-tooltip>
    <!-- <v-tooltip :text="title" location="top">
        <template v-slot:activator="{ props }">

        </template>
    </v-tooltip> -->
</template>
<script lang='ts'>

export default {
    name: 'ModelTooltip',
}
</script>
<style lang='less' scoped></style>