<script lang='ts' setup>

const props = defineProps<{
    tags: IModInfo['tags']
}>()

</script>
<template>
    <v-chip class="tags" size="small" v-for="item in tags" label :key="item.name" :color="item.color">
        {{ item.name }}</v-chip>
</template>
<script lang='ts'>

export default {
    name: 'ModTags',
}
</script>
<style lang='less' scoped>
.tags {
    margin-right: 10px;
}
</style>
