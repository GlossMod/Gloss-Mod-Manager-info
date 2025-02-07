<script lang='ts' setup>

const user = useUser()

// console.log(user.user);

</script>
<template>
    <v-card v-if="user.user">
        <v-card-title>个人资料</v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12" md="4" class="avatar">
                    <v-avatar size="150">
                        <v-img :src="user.getUserAvatar"></v-img>
                    </v-avatar>
                </v-col>
                <v-col cols="12" md="8" class="info">
                    <v-row>
                        <v-col cols="12">{{ user.user.user_nickName }} <UserTag :user="user.user"></UserTag> </v-col>
                        <v-col cols="12">{{ user.user.user_Intr ?? "这个人很懒, 什么也没留下~" }}</v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'UserInfo',
}
</script>
<style lang='less' scoped>
.avatar {
    display: flex;
    align-items: center;
    justify-content: center;
}

.info {
    display: flex;
    align-items: center;
}
</style>