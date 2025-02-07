
import { defineStore } from "pinia";
import { ipcRenderer } from "electron";
export const useContent = defineStore('Content', {
    state: () => ({
        modData: null as IMod | null,
        loading: false,
    }),
    getters: {
    },
    actions: {
        async getModDataByID(id: number) {
            // get-mod-data
            this.loading = true
            this.modData = await ipcRenderer.invoke('get-mod-data', { id })
            this.loading = false
        }
    },

})