import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import axios from "axios";
export const useGithub = defineStore('Github', {
    state: () => ({
        url: '',
        assets: [] as IGitHubAsset[],
        selectAsset: {} as IGitHubAsset,
        release: {} as IGitHubRelease,
        website: '',
        loading: false,
        version: '',
    }),
    actions: {
        async parse(url: string) {
            const reg = /https:\/\/github.com\/([^/]+)\/([^/]+)($|\/)/
            const result = url.match(reg)
            if (!result) {
                ElMessage.error('请输入正确的GitHub仓库地址')
                return
            }
            const owner = result[1]
            const repo = result[2]
            this.website = `https://github.com/${owner}/${repo}`
            this.loading = true
            let { data } = await axios.get(`https://api.github.com/repos/${owner}/${repo}/releases/latest`)
            this.loading = false
            // console.log(data);
            this.version = data.tag_name
            this.assets = data.assets
            this.release = data

            return this.release
        }
    }
})