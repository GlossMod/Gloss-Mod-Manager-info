<script lang='ts' setup>

const props = defineProps<{
    data: IGitHubRelease
}>()

const select = defineModel<IGitHubAsset>()

// watch(select, () => {
//     console.log(select.value);

// })

</script>
<template>
    <div class="github">
        <div class="release">
            <div class="asset-list " v-for="item in data.assets" :class="{ select: item.id == select?.id }"
                @click="select = item">
                {{ item.name }}
            </div>
        </div>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'AddTaskGitHub',
}
</script>
<style lang='less' scoped>
.github {
    .release {
        display: flex;
        flex-direction: column;

        .asset-list {
            padding: 10px;
            cursor: pointer;
        }

        .select {
            color: aqua;
        }
    }
}
</style>