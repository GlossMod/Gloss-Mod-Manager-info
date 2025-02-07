<script lang='ts' setup>
import { ElCol, ElInput, ElMessage, ElMessageBox } from 'element-plus';


const manager = useManager()

// 全选
function selectAll() {
    manager.shareList = manager.managerModList.filter(item => (item.webId || item.other?.namespace))
}

// 反选
function reverseSelection() {
    manager.shareList = manager.managerModList.filter(item => (item.webId || item.other?.namespace) && !manager.shareList.includes(item))
}

function share() {
    if (manager.shareList.length === 0) {
        ElMessage.warning('请选择要分享的Mod')
        return
    }

    // 剔除 item.modFiles 信息
    let shareData = JSON.parse(JSON.stringify(manager.shareList)) as IModInfo[]

    shareData = shareData.map(item => {
        item.modFiles = []
        return item
    })
    let code = Package.generatePackageCode(shareData)
    code = 'gmm://package/' + code
    ElMessageBox({
        title: "分享代码",
        message: () => h(ElCol, { cols: 24 }, [
            h(ElInput, { value: code, readonly: true, style: 'width: 100%' }),
            h('div', { style: 'opacity: .5' }, '复制代码后打开 GMM 使用 Ctrl+V 粘贴代码即可导入内容'),
        ]),
        showCancelButton: true,
        draggable: true,
        confirmButtonText: '复制代码',
        cancelButtonText: '关闭',
    }).then(() => {
        navigator.clipboard.writeText(code).then(() => {
            ElMessage.success('复制成功')
        }).catch(() => {
            ElMessage.error('复制失败')
        })
    }).catch(() => { })

}

</script>
<template>
    <v-btn @click="manager.showShare = !manager.showShare">
        <v-icon>mdi-share-variant-outline</v-icon>
        <v-tooltip activator="parent" location="top">{{ $t('Share') }}</v-tooltip>
    </v-btn>
    <Dialog v-model="manager.showShare">
        <template #header>
            <div class="text"> {{ $t('Share') }} </div>
        </template>
        <v-col cols="12">
            <v-btn variant="text" @click="selectAll">全选 <v-icon>mdi-check</v-icon> </v-btn>
            <v-btn variant="text" @click="reverseSelection">反选 <v-icon>mdi-close</v-icon></v-btn>
        </v-col>
        <div class="list">
            <el-checkbox-group v-model="(manager.shareList as any[])">
                <v-list-item v-for="item in manager.managerModList" :key="item.id">
                    <el-checkbox :value="item" :disabled="!(item.webId || item.other?.namespace)">
                        <v-list-item-title
                            :title="!(item.webId || item.other?.namespace) ? '本地文件无法分享, 请先上传到任意合作方' : ''">
                            <ModTags :tags="item.tags"></ModTags>
                            {{ item.modName }}
                        </v-list-item-title>
                    </el-checkbox>
                </v-list-item>
            </el-checkbox-group>
        </div>
        <template #footer>
            <v-btn @click="manager.showShare = false">取消</v-btn>
            <v-btn color="primary" @click="share">分享</v-btn>
        </template>
    </Dialog>

</template>
<script lang='ts'>

export default {
    name: 'ManagerShare',
}
</script>
<style lang='less' scoped>
.list {
    max-height: 400px;
    overflow-y: auto;
}
</style>
