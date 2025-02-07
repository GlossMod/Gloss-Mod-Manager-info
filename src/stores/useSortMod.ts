import path from "path";
import { defineStore } from "pinia";

import { useManager } from "./useManager";
export const useSortMod = defineStore('SortMod', {
    state: () => ({
        dialogVisible: false,
        sortModList: [] as IModInfo[],
        dragIndex: 0,
    }),
    getters: {

    },
    actions: {
        // 初始化
        async init() {
            let manage = useManager()
            this.sortModList = []   // 清空旧内容

            let sortList = await this.getSortList()

            // 将 sortlist 和 managerModList 合并
            let sortModList = [...sortList, ...manage.managerModList]
            // 去重
            sortModList = [...new Set(sortModList)]

            console.log(sortModList);

            this.sortModList = sortModList
        },
        // 获取派系列表
        async getSortList() {
            let settings = useSettings()
            let savePath = path.join(settings.settings.modStorageLocation, settings.settings.managerGame?.gameName ?? "")
            return await Manager.getModInfo(savePath, "sort.json") as IModInfo[]
        },
        // 保存标签列表
        async savaSortList() {
            let settings = useSettings()
            let savePath = path.join(settings.settings.modStorageLocation, settings.settings.managerGame?.gameName ?? "")
            Manager.saveModInfo(this.sortModList, savePath, "sort.json")
        },
    }
})