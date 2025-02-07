<script lang='ts' setup>

import BaseLogin from '@/components/base/Login/Login.vue'
import { computed } from "vue";
const user = useUser()
const settings = useSettings()

if (!user.user) {
    user.getUser()
}

</script>
<template>
    <div class="user">
        <v-col cols="12" class="user-avatar" v-if="!user.user">
            <v-avatar icon="mdi-account" size="30" @click="user.loginBox = true"> </v-avatar>
            <div class="btn" v-if="!settings.settings.leftMenuRail">
                <v-chip label variant="text" @click="user.loginBox = true">{{ $t('Login') }}</v-chip>
                <v-chip label variant="text" href="https://my.3dmgame.com/register">{{ $t('Register') }}</v-chip>
            </div>
            <BaseLogin v-if="user.loginBox"></BaseLogin>
        </v-col>
        <v-col cols="12" class="user-data" v-else>
            <router-link to="/User">
                <v-avatar size="35">
                    <v-img :src="user.getUserAvatar" :alt="user.user.user_nickName" />
                </v-avatar>
            </router-link>
            <div v-if="!settings.settings.leftMenuRail" class="user-operate">
                <div class="user-name">{{ user.user.user_nickName }}</div>
                <v-chip label variant="text" @click="user.logout">{{ $t('Logout') }}</v-chip>
            </div>
        </v-col>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'BaseUser',
}
</script>
<style lang='less' scoped>
.user {
    padding: 0.5rem 0;

    .user-avatar {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .user-data {
        display: flex;
        flex-direction: column;
        align-items: center;

        .user-operate {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0.5rem 0;
        }
    }
}
</style>