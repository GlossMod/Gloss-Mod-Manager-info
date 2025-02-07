import { defineStore } from "pinia";
import axios from "axios";
import { useSettings } from "./useSettings";
import { ipcRenderer } from "electron";
export const useCurseForge = defineStore('CurseForge', {
    state: () => ({
        mods: [] as ICurseForgeMod[],
        searchFilter: '',
        sortField: 3,
        pageSize: 24,
        page: 1,
        gameVersions: [] as string[],
        categoryIds: [] as number[],
        totalCount: 1,
        modData: undefined as ICurseForgeMod | undefined,
        loading: false
    }),
    getters: {
        totalPage(state) {
            return Math.ceil(state.totalCount / state.pageSize)
        }
    },
    actions: {
        async getKey() {
            const key = await ipcRenderer.invoke("get-config")
            return key.curseforge.api_key
        },
        async GetModList() {
            let url = 'https://api.curseforge.com/v1/mods/search'
            const { searchFilter, sortField, pageSize, page, gameVersions, categoryIds } = this

            const settings = useSettings()
            const gameId = settings.settings.managerGame?.curseforge || ''
            let index = (page - 1) * pageSize

            let data = new URLSearchParams({
                searchFilter,
                sortField: sortField.toString(),
                gameId: gameId.toString(),
                pageSize: pageSize.toString(),
                index: index.toString(),
                // gameVersions: gameVersions.join(','),
                // categoryIds: categoryIds.join(',')
            })

            this.loading = true

            axios.get(`${url}?${data}`, {
                headers: {
                    'x-api-key': await this.getKey(),
                    'Accept': 'application/json'
                }
            }).then(({ data }) => {
                this.mods = data.data
                this.totalCount = data.pagination.totalCount

                this.loading = false
            })
        },
        async GetModDataById(id: number | string) {
            let mod = this.mods.find(mod => mod.id == id)
            if (!mod) {
                let url = `https://api.curseforge.com/v1/mods/${id}`
                let { data } = await axios.get(url, {
                    headers: {
                        'x-api-key': await this.getKey(),
                        'Accept': 'application/json'
                    }
                })
                mod = data.data
            }
            if (mod) this.modData = mod
            return mod
        },
        async GetModDescription(id: string) {
            let { data } = await axios.get(`https://api.curseforge.com/v1/mods/${id}/description`, {
                headers: {
                    'x-api-key': await this.getKey(),
                    'Accept': 'application/json'
                }
            })

            return data.data
        }
    }
})