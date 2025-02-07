<script lang='ts' setup>

import { ElMessage } from 'element-plus';
import { ref, onMounted } from "vue";
import QrcodeVue from '@/components/base/Login/Qrcode.vue'
const user = useUser()

let loading = ref(false)
let loginType = ref(0)

let rules = {
    username: [(v: any) => !!v || '用户名不能为空',],
    password: [(v: any) => !!v || '密码不能为空',]
};

function login() {

    if (user.username == '' || user.password == '') {
        ElMessage.error('账号或密码为空')
        return
    }

    loading.value = true
    user.login(user.username, user.password).then(res => {
        user.getUser()
        user.loginBox = false
        loading.value = false
    }).catch(err => {
        loading.value = false
    })
}

</script>
<template>
    <v-dialog v-model="user.loginBox" persistent width="400px">
        <v-card class="user-login">
            <v-col cols="12">
                <div class="top">
                    <div class="text">
                        <v-chip-group v-model="loginType" mandatory>
                            <v-chip label variant="text" :value="0">{{ $t('Qrlogin') }} </v-chip>
                            <v-chip label variant="text" :value="1">{{ $t('UserNameLogin') }} </v-chip>
                        </v-chip-group>
                    </div>
                    <div class="close">
                        <v-chip label append-icon="mdi-close" @click="user.loginBox = false" variant="text">{{
                            $t('Close') }}</v-chip>
                    </div>
                </div>
            </v-col>

            <!-- 扫码登录 -->
            <v-col cols="12" class="qrcode-login" v-show="loginType == 0">
                <QrcodeVue></QrcodeVue>
            </v-col>

            <!-- 账号密码登录 -->
            <v-col cols="12" class="account-login" v-show="loginType == 1">
                <v-form class="login-from" ref="form" lazy-validation>
                    <v-text-field :label="$t('phone number / 3DM username')" :rules="rules.username"
                        v-model="user.username" prepend-inner-icon="mdi-account" @keydown.enter="login">
                    </v-text-field>
                    <v-text-field type="password" :label="$t('password')" :rules="rules.password"
                        v-model="user.password" prepend-inner-icon="mdi-lock" @keydown.enter="login">
                    </v-text-field>
                    <v-switch v-model="user.remember" :label="$t('Remember me')" color="blue darken-1"
                        hide-details></v-switch>
                    <div class="login-btn">
                        <div class="login-link">
                            <a href="https://my.3dmgame.com/register">{{ $t('Register') }}</a> | <a
                                href="https://my.3dmgame.com/findpasswd">{{ $t('Forgot password') }}</a>
                        </div>
                        <v-chip label :loading="loading" :disabled="loading" variant="text"
                            append-icon="mdi-login-variant" @click="login">
                            {{ $t('Login') }}
                            <!-- <template v-slot:loader>
                                <span>{{ $t('Logining') }}</span>
                            </template> -->
                        </v-chip>
                    </div>
                </v-form>
            </v-col>
        </v-card>
    </v-dialog>
</template>
<script lang='ts'>

export default {
    name: 'BaseLogin',
}
</script>
<style lang='less' scoped>
.user-login {
    .top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .account-login {
        display: flex;
        flex-direction: column;

        .login-from {
            padding: 1.2rem;
            font-weight: 400;
            border: 0;

            .login-btn {
                display: flex;
                align-items: center;
                justify-content: space-between;

                a {
                    color: #fff;
                    text-decoration: none;
                    // 添加黑色描边
                    text-shadow: 0 0 0.2rem #000;

                    &:hover {
                        opacity: .7;
                    }
                }
            }

        }

    }

    .qrcode-login {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        // .qrcode {
        //     canvas {
        //         width: 300px;
        //         height: 300px;
        //     }
        // }
    }
}
</style>