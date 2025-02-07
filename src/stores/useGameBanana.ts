// GameBanana

import axios from "axios";
import { defineStore } from "pinia";
import { useSettings } from "./useSettings";

export const useGameBanana = defineStore('GameBanana', {
    state: () => ({
        _sName: '',
        _nPage: 1,
        mods: [] as IGameBananaMod[],
        _nRecordCount: 1,
        _nPerpage: 24,
        _csvModelInclusions: ['Mod'],
        loading: false,
        modData: null as IGameBananaMod | null
    }),
    getters: {
        totalPage(state) {
            return Math.ceil(state._nRecordCount / state._nPerpage)
        }
    },
    actions: {
        async GetModList() {
            const settings = useSettings()
            const gamebanana = settings.settings.managerGame?.gamebanana
            if (gamebanana) {
                this.loading = true
                let api = `https://gamebanana.com/apiv11/Mod/Index`
                let data = new URLSearchParams({
                    _nPage: this._nPage.toString(),
                    _nPerpage: this._nPerpage.toString(),
                    _csvModelInclusions: this._csvModelInclusions.join(','),
                    '_aFilters[Generic_Game]': gamebanana.toString(),
                })
                if (this._sName != '') data.append('_aFilters[Generic_Name]', ['contains', this._sName].join(','))
                axios.get(`${api}?${data}`).then(({ data }) => {
                    // console.log(data);
                    this.mods = data._aRecords
                    this._nRecordCount = data._aMetadata._nRecordCount

                    this.loading = false
                })

            }
        },
        async GetModData(id: string) {
            let api = `https://gamebanana.com/apiv11/Mod/${id}/ProfilePage`
            const { data } = await axios.get(api)
            this.modData = data
            return data as IGameBananaMod
        }
    }
})