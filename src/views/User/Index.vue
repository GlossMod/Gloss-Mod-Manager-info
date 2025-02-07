<script lang='ts' setup>

import UserInfo from '@/views/User/UserInfo.vue'
import UserCollect from '@/views/User/UserCollect.vue'

// function test() {
//     Steam.getWorkshopList(292030, 1)
// }

</script>
<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" md="6">
                <UserInfo></UserInfo>
                <!-- <v-btn @click="test">测试</v-btn> -->
            </v-col>
            <v-col cols="12" md="6">
                <UserCollect></UserCollect>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang='ts'>

export default {
    name: 'User',
}
</script>
<style lang='less' scoped></style>