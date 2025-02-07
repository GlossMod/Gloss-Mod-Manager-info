<script lang='ts' setup>


const explore = useExplore()

</script>
<template>
    <v-col cols="12" class="turn-page">
        <v-pagination v-model="explore.page" :length="explore.pageLength"></v-pagination>
    </v-col>
</template>
<script lang='ts'>

export default {
    name: 'ExploreTurnPage',
}
</script>
<style lang='less' scoped></style>