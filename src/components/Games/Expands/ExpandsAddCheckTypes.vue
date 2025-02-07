<script lang='ts' setup>

const value = defineModel<ICheckModType>()

</script>
<template>
    <el-form class="form" label-width="80" v-if="value">
        <el-form-item label="类型ID" required>
            <el-input v-model="value.TypeId" type="number" placeholder="与类型的ID对应"></el-input>
        </el-form-item>
        <el-form-item label="方法" required>
            <el-select v-model="value.UseFunction">
                <el-option label="通过拓展名判断 " value="extname"></el-option>
                <el-option label="通过文件名判断" value="basename"></el-option>
                <el-option label="通过路径判断" value="inPath"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="关键词" required>
            <el-input-tag v-model="value.Keyword"></el-input-tag>
        </el-form-item>
    </el-form>
</template>
<script lang='ts'>

export default {
    name: 'ExpandsAddCheckTypes',
}
</script>
<style lang='less' scoped>
.form {
    width: 350px;
}
</style>
