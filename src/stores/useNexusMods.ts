// NexusMods
import { defineStore } from "pinia";
import { ipcRenderer } from "electron";
export const useNexusMods = defineStore('NexusMods', {
    state: () => ({
        mods: [] as IMod[],
        page: 1,
        pageSize: 20,
        count: 1,
        time: null,
        searchText: "",
        sort_by: "lastupdate",
    }),
    getters: {
        pageLength: (state) => Math.ceil(state.count / state.pageSize),
    },
    actions: {
        search() {
            this.page = 1
            this.GetModList()
        },
        async getKey() {
            const key = await ipcRenderer.invoke("get-config")
            return key.modio.api_key
        },
        async GetModList() {
            // todo ...
        },
        async GetDownloadUrl(id: number, game_domain_name: string) {
            // todo ...
        },
        async GetModData(id: number, game_domain_name: string) {
            // todo ...
        }
    }
})