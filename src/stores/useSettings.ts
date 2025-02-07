import { defineStore } from "pinia";


export const useSettings = defineStore('Settings', {
    state: () => ({
        settings: {} as ISettings,
        langList: [
            { text: "简体中文", value: 'zh_CN' },
            { text: "繁体中文", value: "zh_TW" },
            { text: "English", value: 'en_US' },
            { text: "Turkish by:sinnerclown", value: 'tr' },
            { text: "Vietnamese by:TQ34", value: 'vi_VN' },
        ],
    }),
    getters: {
        configFile: () => Config.configFile(),
    },
    actions: {

    }
})