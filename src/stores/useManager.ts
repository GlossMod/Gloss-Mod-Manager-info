import { defineStore } from "pinia";
import path from 'path'
import { getAllExpands } from "@/Expands";
import { ipcRenderer } from "electron";
import { ElMessage } from "element-plus";
import { FileHandler } from "@/model/FileHandler";

export const useManager = defineStore('Manager', {
    state: () => ({
        supportedGames: getAllExpands() as ISupportedGames[],
        managerModList: [] as IModInfo[],
        tags: [] as ITag[],
        filterTags: [] as ITag[],
        selectGameDialog: false,
        maxID: 0,
        filterType: 0 as number,
        search: "",
        dragIndex: 0,
        installLoading: false,
        selectionMode: false,
        selectionList: [] as IModInfo[],
        runing: false,
        showShare: false,
        shareList: [] as IModInfo[],
    }),
    getters: {
        /**
         * Mod存储路径
         * @returns 
         */
        modStorage() {
            const settings = useSettings()
            return path.join(settings.settings.modStorageLocation, settings.settings.managerGame?.gameName ?? "")
        },
        /**
        * 游戏路径
        * @returns 
        */
        gameStorage() {
            const settings = useSettings()
            return settings.settings.managerGame?.gamePath ?? ""
        },
        filterModList(state) {
            // state.filterTags

            let list = state.managerModList.filter((item) => item?.modName.toLowerCase().indexOf(state.search.toLowerCase()) != -1)
            if (state.filterType != 0) {
                list = list.filter(item => item?.modType == state.filterType)
            }

            if (state.filterTags.length > 0) {
                // 通过 tag.name 过滤
                list = list.filter(item => {
                    let is = false
                    item.tags?.forEach(tag => {
                        if (state.filterTags.findIndex(t => t.name == tag.name) != -1) {
                            is = true
                        }
                    })
                    return is
                })
            }

            return list

            // if (state.filterType == 0) return state.managerModList.filter((item) => item?.modName.indexOf(state.search) != -1)
            // return state.managerModList.filter(item => item?.modType == state.filterType && item?.modName.indexOf(state.search) != -1)
        },
        canChange(state) {
            let settings = useSettings()
            return state.runing && (!settings.settings.changeInRun)
        },
        plugins(state) {
            const game = useGames()
            const settings = useSettings()

            let plugins = game.GamePlugins.filter(item => item.plugins_gameId == settings.settings.managerGame?.GlossGameId)

            plugins = plugins.filter(item => {
                // 判断是否已经添加
                let mod = state.managerModList.filter(m =>
                ((m.webId && m.webId == item.plugins_webId) ||
                    (m.webId && m.webId == item.plugins_modIo_id) ||
                    (m.other && m.other.name == item.plugins_Thunderstore_name) ||
                    (m.modWebsite && m.modWebsite == item.plugins_website)
                ))
                // 如果存在则从这里移除
                // console.log(mod);

                return mod.length == 0
            })

            return plugins || []
        }
    },
    actions: {
        // 选择Mod文件
        selectMoeFiles() {
            ipcRenderer.invoke("select-file", {
                properties: ['openFile', 'multiSelections'],
                filters: [
                    { name: 'Zip Files', extensions: ['zip', 'rar', '7z', 'gmm'] },
                ]
            }).then((res: string[]) => {
                if (res.length > 0) {
                    res.forEach(async file => {
                        await this.addModFile(file)
                    });
                }
            })
        },
        // 通过md5 判断是否已经添加
        isAdded(md5: string) {
            let is = false
            this.managerModList.forEach(item => {
                if (item.md5 == md5) {
                    is = true
                }
            })

            return is
        },
        // 通过id 判断是否已经添加
        isAddedId(id: number) {
            let is = false;
            this.managerModList.forEach(item => {
                if (item.id == id) is = true
            })

            return is
        },
        // 通过webId 判断是否已经添加
        isAddedWebId(id: number) {
            let modId = null as null | number;
            this.managerModList.forEach(item => {
                if (item.webId == id) modId = item.id
            })
            return modId
        },
        // 将选中的Mod文件添加到管理器
        async addModFile(file: string) {

            FileHandler.writeLog(`Add File: ${file}`)

            const settings = useSettings()

            if (path.extname(file) == '.gmm') {
                return this.addModByGmm(file)
            }

            if (settings.settings.modStorageLocation == '') {
                ElMessage.error('请先选择Mod存放位置')
                return
            }

            const allowedExtensions = ['.zip', '.rar', '.7z', '.gmm'];

            if (allowedExtensions.some(ext => file.endsWith(ext))) {
                this.maxID++
                let id = this.maxID.toString()
                console.log(id);

                let md5 = await FileHandler.getFileMd5(file).catch(err => {
                    return ''
                })

                // 检查是否已经添加
                if (this.isAdded(md5)) {
                    ElMessage.error(`您已经添加过『${path.basename(file)}』这款Mod了!`)
                    return
                }

                let target = path.join(
                    settings.settings.modStorageLocation,
                    settings.settings.managerGame?.gameName ?? "",
                    id
                )

                let res = await Unzipper.unzip(file, target)
                let files: string[] = []
                res.forEach((item) => {
                    if (item.status == 'extracted') {
                        files.push(item.file)
                    }
                });
                await this.addModInfo(file, parseInt(id), files, md5);
            } else if (FileHandler.isDir(file)) {
                this.maxID++
                let id = this.maxID.toString()
                console.log(id);


                let Folder = file;
                let files = FileHandler.getAllFilesInFolder(Folder, true, true)
                // 将 Folder 从 files 的路径中删除
                files = files.map(item => item.replace(Folder, ''))

                let md5 = await FileHandler.getFolderHMd5(Folder)
                // 检查是否已经添加
                if (this.isAdded(md5)) {
                    ElMessage.error(`您已经添加过『${path.basename(Folder)}』这款Mod了!`)
                    return
                }
                let target = path.join(
                    settings.settings.modStorageLocation,
                    settings.settings.managerGame?.gameName ?? "",
                    id
                )
                await FileHandler.copyFolder(Folder, target)
                this.addModInfo(file, parseInt(id), files, md5);
            }
        },
        /**
         * 通过下载任务添加Mod
         * @param task 
         */
        async addModByTask(task: IDownloadTask, modStorage?: string) {

            FileHandler.writeLog(`Add Task: ${task.name}`)

            this.maxID++
            let id = this.maxID.toString()
            const settings = useSettings()
            if (settings.settings.modStorageLocation == '') {
                ElMessage.error('请先选择Mod存放位置')
                return
            }
            if (!modStorage) {
                modStorage = (() => {
                    return path.join(settings.settings.modStorageLocation, 'cache', task.fileName)
                })()
            }

            if (!modStorage) {
                ElMessage.error(`${modStorage} 文件不存在`)
                return
            }

            let md5 = await FileHandler.getFileMd5(modStorage).catch(err => {
                return ''
            })
            // 检查是否已经添加
            if (this.isAdded(md5)) {
                ElMessage.error(`您已经添加过 『${path.basename(task.name)}』 这款Mod了!`)
                return
            }

            console.log(id);

            let target = path.join(
                settings.settings.modStorageLocation,
                settings.settings.managerGame?.gameName || "",
                id
            )

            await Unzipper.unzip(modStorage, target)
            let files: string[] = []

            files = FileHandler.getAllFilesInFolder(target, true, true)

            files = files.map(item => item.replace(target, ''))

            let mod: IModInfo = {
                id: parseInt(id),
                from: task.from,
                webId: task.webId,
                modName: task.name,
                md5: md5,
                modVersion: task.version,
                isInstalled: false,
                weight: 500,
                modFiles: files,
                modAuthor: task.modAuthor,
                modWebsite: task.modWebsite,
                fileName: task.fileName,
                key: task.key,
                other: task.other,
                tags: task.tags,
            }
            if (task.modType) {
                mod.modType = task.modType
            } else {
                if (typeof (settings.settings.managerGame?.checkModType) == "function") {
                    mod.modType = settings.settings.managerGame?.checkModType(mod)
                }
            }

            this.managerModList.push(mod)
            ElMessage.success(`『${task.name}』已添加到管理列表`)
        },
        // 在管理器中添加Mod信息
        async addModInfo(file: string, id: number, files: string[], md5: string) {
            // console.log(md5);
            const settings = useSettings()
            let mod: IModInfo = {
                id: id,
                modName: path.basename(file),
                md5: md5,
                modVersion: '1.0.0',
                isInstalled: false,
                weight: 500,
                modFiles: files,
                fileName: path.basename(file),
            }
            if (typeof (settings.settings.managerGame?.checkModType) == "function") {
                mod.modType = settings.settings.managerGame?.checkModType(mod)
            }

            this.managerModList.push(mod)
            // this.saveModInfo()
        },
        // 保存Mod信息
        saveModInfo() {
            let settings = useSettings()
            let savePath = path.join(settings.settings.modStorageLocation, settings.settings.managerGame?.gameName ?? "")
            // console.log(savePath);
            Manager.saveModInfo(this.managerModList, savePath)
        },
        // 获取Mod信息
        async getModInfo() {
            let settings = useSettings()
            let savePath = path.join(settings.settings.modStorageLocation, settings.settings.managerGame?.gameName ?? "")
            this.managerModList = await Manager.getModInfo(savePath) as IModInfo[]
        },
        // 删除Mod
        deleteMod(mod: IModInfo) {
            let settings = useSettings()
            let savePath = path.join(settings.settings.modStorageLocation, settings.settings.managerGame?.gameName ?? "", mod.id.toString())
            let modIndex = this.managerModList.findIndex(item => item.id == mod.id)
            // console.log(savePath);
            Manager.deleteMod(savePath)
            this.managerModList.splice(modIndex, 1)
        },
        // 获取标签列表
        async getTagsList() {
            let settings = useSettings()
            let savePath = path.join(settings.settings.modStorageLocation, settings.settings.managerGame?.gameName ?? "")
            this.tags = await Manager.getModInfo(savePath, "tags.json") as ITag[]
        },
        // 保存标签列表
        async savaTagsList() {
            let settings = useSettings()
            let savePath = path.join(settings.settings.modStorageLocation, settings.settings.managerGame?.gameName ?? "")
            Manager.saveModInfo(this.tags, savePath, "tags.json")
        },
        // 通过md5获取Mod信息
        getModInfoByMd5(md5: string) {
            return this.managerModList.find(item => item.md5 == md5)
        },
        // 通过id获取Mod信息
        getModInfoById(id: number) {
            return this.managerModList.find(item => item.id == id)
        },
        getModInfoByWebId(webId: number) {
            return this.managerModList.find(item => item.webId == webId)
        },
        /**
         * 通过Gmm包安装文件
         * @param file 
         */
        async addModByGmm(file: string) {
            if (path.extname(file) != '.gmm') return

            //#region 读取info
            const packs = usePacks()
            this.installLoading = true
            const settings = useSettings()
            let info: any = JSON.parse(await Unzipper.readZipFile(file, 'info.json'))
            this.installLoading = false

            if (info.gameID != settings.settings.managerGame?.GlossGameId) {
                ElMessage.error(`该 .GMM 包并不属于${settings.settings.managerGame?.gameName}, 请先选择正确的游戏.`)
                return
            }
            console.log(info);
            packs.Info = info
            packs.inputPacks = info.packs
            packs.inpurtFile = file
            packs.inpurtDialog = true
            //#endregion

        },
        // 检查所有Mod更新
        async checkAllModUpdate() {
            let modId = [] as number[]
            this.managerModList.forEach(item => {
                if (item.webId) modId.push(item.webId as number)
            })

            if (modId.length > 0) {
                ipcRenderer.invoke("check-mod-update", modId).then(({ data }) => {
                    data?.forEach((item: any) => {
                        let mod = this.getModInfoByWebId(item.id)
                        if (mod) {
                            if (mod.modVersion != item.mods_version) {
                                mod.isUpdate = true
                                console.log(`『${mod.modName}』 有新版本可用.`);
                            }
                        }
                    })
                })
            }
        },

        async updateMod(mod: IModInfo) {
            // const { t } = useI18n()
            if (mod.from) {

                const settings = useSettings()
                const download = useDownload()

                let modStorage = path.join(settings.settings.modStorageLocation, 'cache', mod.fileName ?? "")

                download.ReStart(mod, modStorage)
            }
        },

        // 检查游戏是否在运行
        async checkRuning() {
            let settings = useSettings()
            let gameExe = settings.settings.managerGame?.gameExe
            if (gameExe) {
                if (typeof (gameExe) == 'string') {
                    let res = await FileHandler.existsSync(gameExe)
                    this.runing = res
                } else {
                    let runing = false
                    for (let i in gameExe) {
                        const item = gameExe[i];
                        let res = await FileHandler.existsSync(item.name)
                        if (res) {
                            runing = true
                            break
                        }
                    }
                    this.runing = runing
                }
            }
            // console.log(this.runing);

        }
    }
})