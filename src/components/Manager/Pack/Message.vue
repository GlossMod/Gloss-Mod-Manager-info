<script lang='ts' setup>

import { ElMessageBox } from 'element-plus';
const settings = useSettings()

if (settings.settings.showPakeMessage) {
    show()
}

function show() {
    let html = `在打包的时候, 请将前置和Mod本体 以及可选文件分为多个Mod进行打包, 例如: <a href="https://mod.3dmgame.com/mod/204427" target="_blank" >这个作品</a> <br/>  
更多 打包相关的内容请参考wiki: <a href="https://gmm.aoe.top/GMMFile/Make.html">如何制作GMM文件</a>`

    ElMessageBox.confirm(html, '提示', {
        confirmButtonText: '我知道了',
        cancelButtonText: '不再提示',
        dangerouslyUseHTMLString: true,
    }).then(() => { }).catch(() => {
        settings.settings.showPakeMessage = false
    })
}

</script>
<template>
    <v-col cols="12" class="message">
        <v-btn icon="mdi-information-variant-circle-outline" @click="show" variant="text"></v-btn>
    </v-col>
</template>
<script lang='ts'>

export default {
    name: 'Message',
}
</script>
<style lang='less' scoped>
.message {
    text-align: right;
}
</style>