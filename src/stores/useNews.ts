import { defineStore } from "pinia";
import axios from "axios";

export const useNews = defineStore("News", {
    state: () => ({
        SupportedGames: [],
        newMods: [] as IMod[],
        hotMods: [] as IMod[],
        key: '67d8667248a801ff6ddc74ac43016168'
    }),
    actions: {
        async getSupportedGames() {
            const { data } = await axios.get(`https://p.aoe.top/githubusercontent/GlossMod/Gloss-Mod-Manager-info/main/docs/SupportedGames.md`)
            let SupportedGames = data.split('\n')

            // 进行倒着排序
            this.SupportedGames = SupportedGames.reverse().slice(0, 10).map((item: string) => {
                // 移除 - 
                return item.replace(/-/g, '').trim()
            })
        },
        async getNewMods() {
            const settings = useSettings()
            const { data } = await axios.post(`https://mod.3dmgame.com/api/v2/GetModList`, {
                pageSize: 10,
                game_id: settings.settings.managerGame?.GlossGameId
            }, {
                headers: {
                    "Authorization": this.key,
                    "Content-Type": "application/json",
                }
            })
            if (data.code == "00") {
                this.newMods = data.data.mod
            }
        },
        async getHotMods() {
            const settings = useSettings()
            const { data } = await axios.post(`https://mod.3dmgame.com/api/v2/GetModList`, {
                pageSize: 10,
                game_id: settings.settings.managerGame?.GlossGameId,
                order: 1,
                time: 3
            }, {
                headers: {
                    "Authorization": this.key,
                    "Content-Type": "application/json",
                }
            })
            if (data.code == "00") {
                this.hotMods = data.data.mod
            }
        }
    }
})