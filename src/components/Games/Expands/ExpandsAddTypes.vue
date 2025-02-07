<script lang='ts' setup>

const value = defineModel<IType>()

</script>
<template>
    <el-form class="form" label-width="80" v-if="value">
        <el-form-item label="ID" required>
            <el-input v-model="value.id" type="number"></el-input>
        </el-form-item>
        <el-form-item label="名称" required>
            <el-input v-model="value.name" placeholder="显示的类型名称"></el-input>
        </el-form-item>
        <el-form-item label="安装路径" required>
            <el-input v-model="value.installPath" placeholder="相对于游戏目录的路径"></el-input>
        </el-form-item>
        <h4>安装</h4>
        <ExpandsAddTypesInstall v-model="value.install"></ExpandsAddTypesInstall>
        <h4>卸载</h4>
        <ExpandsAddTypesInstall v-model="value.uninstall"></ExpandsAddTypesInstall>
    </el-form>
</template>
<script lang='ts'>

export default {
    name: 'ExpandsAddTypes',
}
</script>
<style lang='less' scoped>
.form {
    width: 350px;
}
</style>
