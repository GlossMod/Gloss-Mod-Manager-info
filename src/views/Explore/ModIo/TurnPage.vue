<script lang='ts' setup>


const modio = useModIo()

</script>
<template>
    <v-col cols="12" class="turn-page">
        <v-pagination v-model="modio.page" :length="modio.pageLength"></v-pagination>
    </v-col>
</template>
<script lang='ts'>

export default {
    name: 'TurnPage',
}
</script>
<style lang='less' scoped></style>