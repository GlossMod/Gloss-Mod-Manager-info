
import { defineStore } from "pinia";
export const useThunderstore = defineStore('Thunderstore', {
    state: () => ({
        modList: [] as IThunderstoreMod[],
        loading: false,
        page: 1,
        pageSize: 24,
        filter: {
            time: "All",
            sort_by: "Default" as "Default" | "lastupdate" | "downloads" | "Likes",
            categories: "All",
            searchText: "",
        },
        selected: {
            data: null as IThunderstoreMod | null,
            readme: "",
        }
    }),
    getters: {
        modListFilter(state) {
            // 分页、搜索、排序、筛选
            // let modList = (() => state.modList)()
            let modList: IThunderstoreMod[] = JSON.parse(JSON.stringify(state.modList))
            if (modList?.length > 0) {
                let { page, pageSize, filter } = state
                let { time, sort_by, categories, searchText } = filter
                let start = (page - 1) * pageSize
                let end = start + pageSize

                //#region 筛选
                if (searchText !== "") {
                    let modListFilter = modList.filter((mod, index) => {
                        let { name, } = mod
                        let search = `${name}`.toLowerCase()
                        return search.includes(searchText.toLowerCase())
                    })
                    modList = modListFilter
                }
                if (categories !== "All") {
                    let modListFilter = modList.filter((mod, index) => {
                        let { categories: categoriesList } = mod
                        return categoriesList.includes(categories)
                    })
                    modList = modListFilter
                }
                if (time !== "All") {
                    let modListFilter = modList.filter((mod, index) => {
                        let { date_updated } = mod
                        let timeNow = new Date().getTime()
                        let timeMod = new Date(date_updated).getTime()
                        let timeDiff = timeNow - timeMod
                        let timeDiffDay = timeDiff / 1000 / 60 / 60 / 24
                        if (time === "Today") {
                            return timeDiffDay < 1
                        }
                        if (time === "7Today") {
                            return timeDiffDay < 7
                        }
                        if (time === "30Today") {
                            return timeDiffDay < 30
                        }
                        if (time === "90Today") {
                            return timeDiffDay < 90
                        }
                        if (time === "All") {
                            return true
                        }
                        return false
                    })
                    modList = modListFilter
                }
                if (sort_by !== "Default") {
                    let modListFilter = modList.sort((modA, modB) => {
                        let { date_updated: date_updatedA, rating_score: rating_scoreA } = modA
                        let { date_updated: date_updatedB, rating_score: rating_scoreB } = modB
                        let downloadsA = modA.versions[0].downloads
                        let downloadsB = modB.versions[0].downloads
                        let timeNow = new Date().getTime()
                        let timeModA = new Date(date_updatedA).getTime()
                        let timeModB = new Date(date_updatedB).getTime()
                        let timeDiffA = timeNow - timeModA
                        let timeDiffB = timeNow - timeModB
                        let timeDiffDayA = timeDiffA / 1000 / 60 / 60 / 24
                        let timeDiffDayB = timeDiffB / 1000 / 60 / 60 / 24
                        if (sort_by === "lastupdate") {
                            return timeDiffDayA - timeDiffDayB
                        }
                        if (sort_by === "downloads") {
                            return downloadsB - downloadsA
                        }
                        if (sort_by === "Likes") {
                            return rating_scoreB - rating_scoreA
                        }
                        return 0
                    })
                    modList = modListFilter
                }

                //#endregion

                // 分页
                modList = modList.slice(start, end)
            }
            return modList
        },
        categories(state) {
            let categories = state.modList?.map((mod) => {
                let { categories } = mod
                return categories
            }).flat()
            // 去重
            categories = [...new Set(categories)]
            return categories
        },
        pageLength: (state) => Math.ceil(state.modList.length / state.pageSize),

    },
    actions: {
        async getModList() {
            const settings = useSettings()
            let community_identifier = settings.settings.managerGame?.Thunderstore?.community_identifier
            if (community_identifier) {
                this.loading = true
                let response = await fetch(`https://thunderstore.io/c/${community_identifier}/api/v1/package/`, {
                    headers: {
                        'Accept-Encoding': 'gzip',
                    }
                })
                this.modList = await response.json()
                this.page = 1
                this.loading = false
            }
        },
        async getModData(namespace?: string, name?: string) {

            let data = this.modList.find(item => item.owner == namespace && item.name == name)
            // console.log(data);

            let response = await fetch(`https://thunderstore.io/api/experimental/package/${namespace}/${name}/`, {
                headers: {
                    'Accept-Encoding': 'gzip',
                }
            })
            let modData = await response.json()
            return { ...modData, ...data } as IThunderstoreMod

        },
        async getReadme(namespace: string, name: string, version: string) {
            // /api/experimental/package/{namespace}/{name}/{version}/readme/
            if (namespace && name && version) {
                let response = await fetch(`https://thunderstore.io/api/experimental/package/${namespace}/${name}/${version}/readme/`, {
                    headers: {
                        'Accept-Encoding': 'gzip',
                    }
                })
                let readme = await response.json()
                this.selected.readme = readme.markdown
            }
        },
        async getModVersionData(namespace: string, name: string, version: string) {
            let response = await fetch(`https://thunderstore.io/api/experimental/package/${namespace}/${name}/${version}/`, {
                headers: {
                    'Accept-Encoding': 'gzip',
                }
            })

            return await response.json()
        }
    },
})