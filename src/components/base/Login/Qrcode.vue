<script lang='ts' setup>

import { ref, onMounted, onUnmounted } from "vue";
let qrcode = ref()
const user = useUser()

// 每隔1 秒刷新
user.timer = setInterval(() => {
    user.checkQrcodeLogin()
}, 1000)

onMounted(() => {
    user.getQrcode(qrcode.value)
})
onUnmounted(() => {
    clearInterval(user.timer!)
})
</script>
<template>
    <div class="">
        <div class="title">{{ $t('QrloginTip') }}</div>
        <div class="qrcode">
            <canvas ref="qrcode"></canvas>
        </div>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'Qrcode',
}
</script>
<style lang='less' scoped>
.title {
    text-align: center;
}

.qrcode {
    text-align: center;
}
</style>