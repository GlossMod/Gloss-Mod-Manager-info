import { defineStore } from "pinia";
import { ipcRenderer } from "electron";


export const useExplore = defineStore('Explore', {
    state: () => ({
        searchText: "",
        page: 1,
        pageSize: 24,
        original: 0,
        time: 0,
        order: 0,
        key: 0,
        gameType: 0,
        mods: [] as IMod[],
        gameList: [] as ISupportedGames[],
        showTourGameListDialog: false,
        gameTypeList: [] as any[],
        count: 1,
        loading: false,

    }),
    getters: {
        pageLength: (state) => Math.ceil(state.count / state.pageSize),
        gameId: () => {
            const settings = useSettings()
            let id = 0 as number | string
            if (settings.settings.managerGame?.GlossGameId) id = settings.settings.managerGame?.GlossGameId
            else {
                id = settings.settings.tourGameList.join(',')
            }
            return id
        }
    },
    actions: {
        async GetModList() {
            const user = useUser()
            this.loading = true
            let data = await ipcRenderer.invoke("get-mod-list", {
                page: this.page,
                pageSize: this.pageSize,
                title: this.searchText,
                original: this.original,
                time: this.time,
                order: this.order,
                key: this.key,
                gameId: this.gameId,
                gameType: this.gameType,
                show_adult: user.user?.user_p_show_adult == 1 ? user.user?.user_p_show_adult : null,
                show_charge: user.user?.user_p_show_charge == 1 ? user.user?.user_p_show_adult : null,
            })

            this.mods = data.data.mod
            this.count = data.data.count
            // document.documentElement.scrollTop = 0
            this.loading = false
        },
        getGameType() {
            const settings = useSettings()
            ipcRenderer.invoke("get-types", { gameId: settings.settings.managerGame?.GlossGameId }).then(data => {
                // console.log(data);
                let type = [] as any[]
                data.forEach((item: any) => {
                    type.push({
                        value: item.id,
                        text: item.mods_type_name
                    })
                })
                this.gameTypeList = type
            })
        },
        search() {
            this.page = 1
            this.GetModList()
        }
    }
})