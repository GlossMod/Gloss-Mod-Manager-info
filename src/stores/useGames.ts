import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";
import axios from "axios";
export const useGames = defineStore("Games", {
    state: () => ({
        search: '',
        showLst: false,
        GamePlugins: [] as IGamePlugins[],
        showExpandsGame: false,
    }),
    getters: {
        // gameList(state) {
        //     const { t } = useI18n()
        //     const Settings = useSettings()
        //     let list = Settings.settings.managerGameList
        //     if (state.search != '') {
        //         list = list.filter(item => t(item.gameName).includes(state.search))
        //     }

        //     return list
        // }
    },
    actions: {
        async getGamePlugins() {
            const settings = useSettings()
            if (!settings.settings.showPlugins) {
                this.GamePlugins = []
                return
            }

            try {
                const { data } = await axios.post('https://mod.3dmgame.com/api/v2/GetPluginsList', {}, {
                    headers: {
                        "Authorization": "67d8667248a801ff6ddc74ac43016168"
                    }
                })
                if (data && data.data) {
                    this.GamePlugins = data.data
                } else {
                    this.GamePlugins = []
                }
            } catch (error) {
                console.error('获取前置列表失败:', error)
                this.GamePlugins = []
            }
        }
    }
})