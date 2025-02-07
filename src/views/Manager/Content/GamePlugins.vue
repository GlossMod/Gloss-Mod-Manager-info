<script lang='ts' setup>



const manager = useManager()

function install(plugins: IGamePlugins) {

    let mod: IModInfo = {
        id: plugins.plugins_webId as number,
        modName: plugins.plugins_name,
        fileName: '',
        md5: '',
        modVersion: plugins.plugins_version,
        isInstalled: false,
        weight: 0,
        modFiles: [],
        webId: plugins.plugins_webId,
        from: plugins.plugins_from as sourceType,
        modWebsite: plugins.plugins_website

    }

    manager.updateMod(mod)
}

</script>
<template>
    <v-card variant="tonal" color="#FFAB00" v-if="manager.plugins.length > 0">
        <v-card-title>所需前置
            <v-chip color="#1E88E5" label variant="text" target="_blank" href="https://cloud.aoe.top/s/KrRfO"
                append-icon="mdi-open-in-new">前置包
                <v-tooltip activator="parent" location="bottom">一键下载并安装所有前置</v-tooltip>
            </v-chip>
        </v-card-title>
        <v-card-text>
            <v-table density="compact" class="table">
                <thead>
                    <tr>
                        <th class="text-left">
                            {{ $t('Name') }}
                        </th>
                        <th class="text-left">
                            {{ $t('Action') }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in manager.plugins">
                        <td>
                            <v-chip variant="text" prepend-icon="mdi-help-circle-outline">
                                {{ item.plugins_name }}
                                <v-tooltip activator="parent" location="top">{{ item.plugins_desc }}</v-tooltip>
                            </v-chip>
                        </td>
                        <td>
                            <el-button @click="install(item)">安装</el-button>

                        </td>
                    </tr>
                </tbody>

            </v-table>
        </v-card-text>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'ManagerContentGamePlugins',
}
</script>
<style lang='less' scoped></style>