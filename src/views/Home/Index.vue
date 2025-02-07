<script lang='ts' setup>

import Welcome from '@/components/home/Welcome.vue'
import Sponsor from '@/components/home/Sponsor.vue'
import News from '@/components/home/News.vue'
</script>
<template>
    <v-container fluid>
        <Welcome></Welcome>
        <Sponsor></Sponsor>
        <!-- <News></News> -->
    </v-container>
</template>
<script lang='ts'>

export default {
    name: 'Home',
}
</script>
<style lang='less' scoped></style>