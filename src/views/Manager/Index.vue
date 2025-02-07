<script lang='ts' setup>

import ManagerHeader from '@/views/Manager/Header.vue'
import ManagerContent from '@/views/Manager/Content.vue'
</script>
<template>
    <v-container fluid>
        <ManagerHeader></ManagerHeader>
        <ManagerContent></ManagerContent>
    </v-container>
</template>
<script lang='ts'>

export default {
    name: 'Manager',
}
</script>
<style lang='less' scoped></style>