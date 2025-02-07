import { defineStore } from "pinia";
import { } from "electron";
import { useSettings } from "./useSettings";
import { ElMessage } from 'element-plus';
export const useSteamWorkshop = defineStore('SteamWorkshop', {
    state: () => ({
        filter: {
            searchText: ''
        },
        modList: [] as ISteamWorkshopItem[],
        page: 1,
        pageSize: 24,
        count: 1,
        loading: false,
        // steam: new Steam()
    }),
    getters: {
        pageLength: (state) => Math.ceil(state.count / state.pageSize),

    },
    actions: {
        async getModList() {
            this.loading = true
            const settings = useSettings()

            let res = await Steam.getWorkshopList(settings.settings.managerGame?.steamAppID ?? 0, this.page, this.pageSize, true);
            let data = res.data

            console.log(data);
            this.modList = data.response.publishedfiledetails
            this.count = data.response.total

            this.loading = false

        },
        search() {
            this.page = 1
            this.getModList()
        },
        async downloadFile(appid: number, fileId: string) {
            // let res = this.steam.getPublishedFileDetails(appid, fileId)
            ElMessage.warning('暂时无法从 创意工坊 下载内容');
        }
    }
})