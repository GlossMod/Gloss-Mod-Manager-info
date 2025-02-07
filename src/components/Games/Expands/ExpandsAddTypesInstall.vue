<script lang='ts' setup>
const value = defineModel<install>()

</script>
<template>
    <el-form class="form" label-width="130" v-if="value && typeof (value) == 'object'">
        <el-form-item label="方法" required>
            <el-select v-model="value.UseFunction">
                <el-option label="基础安装" value="generalInstall"></el-option>
                <el-option label="基础卸载" value="generalUninstall"></el-option>
                <el-option label="以某个文件夹为分割 安装/卸载 文件" value="installByFolder"></el-option>
                <el-option label="以某个文件为基础 将其父级目录软链 进行 安装/卸载" value="installByFile"></el-option>
                <el-option label="以某个文件为基础, 将该文件同级的所有文件安装/卸载" value="installByFileSibling"></el-option>
                <el-option label="以某个文件夹为基础，将其父级目录软链 进行 安装/卸载" value="installByFolderParent"></el-option>
                <el-option label="未知" value="Unknown"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="文件夹名称" required
            v-if="['installByFolder', 'installByFolderParent'].includes(value.UseFunction)">
            <el-input v-model="value.folderName" placeholder="文件夹名称"></el-input>
        </el-form-item>
        <el-form-item label="是否为安装"
            v-if="['installByFolder', 'installByFile', 'installByFileSibling', 'installByFolderParent'].includes(value.UseFunction)">
            <el-switch v-model="value.isInstall" inline-prompt active-text="安装" inactive-text="卸载"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="文件名称" required
            v-if="['installByFile', 'installByFileSibling'].includes(value.UseFunction)">
            <el-input v-model="value.fileName" placeholder="文件名称"></el-input>
        </el-form-item>
        <el-form-item label="是否包含文件夹" v-if="['installByFolder'].includes(value.UseFunction)">
            <el-switch v-model="value.include"></el-switch>
        </el-form-item>
        <el-form-item label="是否保留其他文件" v-if="['installByFolder'].includes(value.UseFunction)">
            <el-switch v-model="value.spare"></el-switch>
        </el-form-item>
        <el-form-item label="是否保留路径" v-if="['generalInstall', 'generalUninstall'].includes(value.UseFunction)">
            <el-switch v-model="value.keepPath"></el-switch>
        </el-form-item>
        <el-form-item label="是否按拓展名匹配" v-if="['installByFile', 'installByFileSibling'].includes(value.UseFunction)">
            <el-switch v-model="value.isExtname"></el-switch>
        </el-form-item>
        <el-form-item label="在游戏目录中"
            v-if="['generalInstall', 'generalUninstall', 'installByFile', 'installByFileSibling', 'installByFolderParent'].includes(value.UseFunction)">
            <el-switch v-model="value.inGameStorage"></el-switch>
        </el-form-item>
    </el-form>
</template>
<script lang='ts'>

export default {
    name: 'ExpandsAddTypesInstall',
}
</script>
<style lang='less' scoped>
.form {
    width: 350px;
}
</style>
