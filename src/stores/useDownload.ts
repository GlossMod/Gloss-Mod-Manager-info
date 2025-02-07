import { defineStore } from "pinia";
import { extname, join } from "node:path";
import { useSettings } from "./useSettings";
import { ElMessage } from "element-plus";
import { ipcRenderer } from "electron";


import axios from "axios";
export const useDownload = defineStore('Download', {
    state: () => ({
        tab: 'all' as 'all' | "active" | "waiting" | "paused" | "error" | "complete" | "removed",
        downloadTaskList: [] as IDownloadTask[],    // 下载任务列表
        // downloadProcessList: [] as Download[],      // 下载进程列表 进程列表会在重启软件后清空
        searchName: "",
        // aria2: new APIAria2(),
        showAddTaskDialog: false,
        addTaskTab: 'GlossMod',
        form: {
            url: '',
            id: '',
            name: '',
            link: '',
        },
        autoInstall: true,
    }),
    getters: {
        configPath(): string {
            const settings = useSettings()
            return `${settings.settings.modStorageLocation}\\cache\\download.json`
        }
    },
    actions: {
        async initialization() {
            let config = await FileHandler.readFileSync(this.configPath, "[]")  // 读取文件
            this.downloadTaskList = JSON.parse(config)    // 转换为对象
        },

        /**
         * 通过ID添加下载任务
         * @param id 
         */
        async addDownloadById(mod: IModInfo | IDownloadTask | number) {
            let id: number
            if (typeof mod == 'number') {
                id = mod
            } else {
                id = mod.webId as number
            }

            let data = await ipcRenderer.invoke("get-mod-data", { id })
            // 将 link.value 里面的 http://mod.3dmgame.com 换成 https://mod.3dmgame.com
            console.log(id);

            data.mods_resource_url = data.mods_resource_url.replace("http://mod.3dmgame.com", "https://mod.3dmgame.com")
            let link = data.mods_resource_url

            if (!link.includes("https://mod.3dmgame.com")) {
                window.open(`https://mod.3dmgame.com/mod/${id}`)
                return
            }
            let fileExt = extname(data.mods_resource_url)
            let fileName = data.id + fileExt
            let task: IDownloadTask = {
                id: APIAria2.randomNumbers(),
                webId: data.id,
                from: "GlossMod",
                name: data.mods_title,
                version: data.mods_version ?? "1.0.0",
                speed: 0,
                totalSize: 0,
                downloadedSize: 0,
                link: data.mods_resource_url,
                modAuthor: data.mods_author,
                status: "waiting",
                fileName: fileName,
                tags: (mod as IModInfo).tags,
                modType: (mod as IModInfo).modType,
            }
            this.addDownloadTask(task)
        },
        /**
         * 通过ID获取任务
         * @param id 任务ID
         * @returns 
         */
        getTaskById(id: number | string) {
            return this.downloadTaskList.find(item => item.webId == id)
        },

        /**
         * 保存任务配置
         */
        saveTaskConfig() {
            let tasks: IDownloadTask[] = JSON.parse(JSON.stringify(this.downloadTaskList))
            FileHandler.writeFile(this.configPath, JSON.stringify(tasks))
        },

        //#region 添加下载到任务

        /**
         * 通过网页添加下载任务
         * @param url 
         */
        async addDownloadByWeb(url: string) {
            if (!url.startsWith("gmm://installmod")) return
            // let url = gmm://installmod/172999?game=185&name=只狼：影逝二度
            const params = new URLSearchParams(url.replace("gmm://installmod/", ""));
            const id = params.get("id");

            this.addDownloadById(Number(id))
        },

        async addDownloadByThunderstore(mod: IThunderstoreMod, key?: string) {
            // // 判断是否已经存在
            // if (this.getTaskById(mod.uuid4)) {
            //     // 如果已存在则移除
            //     this.downloadTaskList = this.downloadTaskList.filter(item => item.id != mod.uuid4)
            // }
            let fileExt = '.zip'
            let fileName = mod.name + fileExt
            let task: IDownloadTask = {
                id: APIAria2.randomNumbers(),
                webId: mod.package_url,
                from: "Thunderstore",
                name: mod.name,
                version: mod.latest.version_number,
                speed: 0,
                totalSize: 0,
                downloadedSize: 0,
                link: mod.latest.download_url,
                modAuthor: mod.owner,
                status: "waiting",
                modWebsite: mod.package_url,
                fileName: fileName,
                key: key,
                other: {
                    namespace: mod.owner,
                    name: mod.name
                }
            }

            this.addDownloadTask(task)
        },

        async addDownloadByModIo(mod: IModIo) {
            // console.log(mod.id);

            // // 判断是否已经存在
            // if (this.getTaskById(mod.id)) {
            //     // 如果已存在则移除
            //     this.downloadTaskList = this.downloadTaskList.filter(item => item.id != mod.id)
            // }

            let fileExt = '.zip'
            let fileName = mod.id + fileExt
            let task: IDownloadTask = {
                id: APIAria2.randomNumbers(),
                webId: mod.id,
                from: "ModIo",
                name: mod.name,
                version: mod.modfile.version ?? "1.0.0",
                speed: 0,
                totalSize: 0,
                downloadedSize: 0,
                link: mod.modfile.download.binary_url,
                modAuthor: mod.submitted_by.username,
                status: "waiting",
                modWebsite: mod.profile_url,
                fileName: fileName
            }
            this.addDownloadTask(task)

            // let task = this.getTaskById(mod.id) as IDownloadTask

            // const settings = useSettings()

            // // let dest = `${settings.settings.modStorageLocation}\\cache\\`
            // let dest = join(settings.settings.modStorageLocation, 'cache')
            // FileHandler.deleteFile(join(dest, fileName))   // 删除旧文件

            // let gid = await APIAria2.addUri(task.link, fileName, dest).catch(err => {
            //     ElMessage.error(`下载错误: ${err}`)
            // })
            // console.log(gid);

            // task.gid = gid.result

            // ElMessage.success(`${task.name} 已添加到下载列表`)

        },

        async addDownloadByCurseForge(mod: ICurseForgeMod) {
            // // 判断是否已经存在
            // if (this.getTaskById(mod.id)) {
            //     // 如果已存在则移除
            //     this.downloadTaskList = this.downloadTaskList.filter(item => item.id != mod.id)
            // }

            // 将 mod.latestFiles[0].downloadUrl 里面的 edge.forgecdn.net 替换为 mediafilez.forgecdn.net
            let downloadUrl = mod.latestFiles[0].downloadUrl.replace("edge.forgecdn.net", "mediafilez.forgecdn.net")

            let fileName = mod.latestFiles[0].fileName
            let task: IDownloadTask = {
                id: APIAria2.randomNumbers(),
                webId: mod.id,
                from: "CurseForge",
                name: mod.name,
                version: mod.latestFilesIndexes[0].gameVersion,
                speed: 0,
                totalSize: 0,
                downloadedSize: 0,
                link: downloadUrl,
                modAuthor: mod.authors[0].name,
                modWebsite: mod.links.websiteUrl,
                status: "waiting",
                fileName: fileName
            }

            this.addDownloadTask(task)

            // let task = this.getTaskById(mod.id) as IDownloadTask

            // console.log(task);

            // const settings = useSettings()

            // let dest = join(settings.settings.modStorageLocation, 'cache')

            // FileHandler.deleteFile(join(dest, fileName))   // 删除旧文件

            // let gid = await APIAria2.addUri(task.link, fileName, dest).catch(err => {
            //     ElMessage.error(`下载错误: ${err}`)
            // })
            // console.log(gid);

            // task.gid = gid.result

            // ElMessage.success(`${task.name} 已添加到下载列表`)

        },

        async addDownloadByGitHub(release: IGitHubRelease, website: string, fileName: string) {
            // // 判断是否已经存在
            // if (this.getTaskById(mod.id)) {
            //     // 如果已存在则移除
            //     this.downloadTaskList = this.downloadTaskList.filter(item => item.id != mod.id)
            // }

            let _mod = release.assets.find(item => item.name == fileName)
            if (!_mod) {
                ElMessage.warning("未找到对应文件")
                return
            }

            let task: IDownloadTask = {
                id: APIAria2.randomNumbers(),
                webId: release.id,
                from: "GitHub",
                name: release.name,
                version: release.tag_name,
                speed: 0,
                totalSize: 0,
                downloadedSize: 0,
                link: _mod.browser_download_url,
                modAuthor: release.author.login,
                modWebsite: website,
                status: "waiting",
                fileName: release.name
            }

            this.addDownloadTask(task)

            // let task = this.getTaskById(mod.id) as IDownloadTask

            // console.log(task);

            // const settings = useSettings()

            // let dest = join(settings.settings.modStorageLocation, 'cache')

            // FileHandler.deleteFile(join(dest, mod.name))   // 删除旧文件

            // let gid = await APIAria2.addUri(task.link, mod.name, dest).catch(err => {
            //     ElMessage.error(`下载错误: ${err}`)
            // })
            // console.log(gid);

            // task.gid = gid.result

            // ElMessage.success(`${task.name} 已添加到下载列表`)

        },

        async addDownloadByGameBanana(id: number) {
            let { data: mod } = await axios.get<IGameBananaMod>(`https://gamebanana.com/apiv11/Mod/${id}/ProfilePage`)

            // // 判断是否已经存在
            // if (this.getTaskById(mod._idRow)) {
            //     // 如果已存在则移除
            //     this.downloadTaskList = this.downloadTaskList.filter(item => item.id != mod._idRow)
            // }

            let task: IDownloadTask = {
                id: APIAria2.randomNumbers(),
                webId: mod._idRow,
                from: "GameBanana",
                name: mod._sName,
                version: mod._sVersion || '1.0.0',
                speed: 0,
                totalSize: 0,
                downloadedSize: 0,
                link: mod._aFiles[0]._sDownloadUrl,
                modAuthor: mod._aSubmitter._sName,
                modWebsite: mod._sProfileUrl,
                status: "waiting",
                fileName: mod._aFiles[0]._sFile
            }

            this.addDownloadTask(task)

            // let task = this.getTaskById(mod._idRow) as IDownloadTask

            // const settings = useSettings()

            // let dest = join(settings.settings.modStorageLocation, 'cache')

            // FileHandler.deleteFile(join(dest, mod._aFiles[0]._sFile))   // 删除旧文件

            // let gid = await APIAria2.addUri(task.link, mod._aFiles[0]._sFile, dest).catch(err => {
            //     ElMessage.error(`下载错误: ${err}`)
            // })

            // console.log(gid);

            // task.gid = gid.result

            // ElMessage.success(`${task.name} 已添加到下载列表`)

        },

        async addDownloadByCustomize(url: string, name: string) {
            let task: IDownloadTask = {
                id: APIAria2.randomNumbers(),
                webId: APIAria2.uuid(),
                from: "Customize",
                name: name,
                version: "1.0.0",
                speed: 0,
                totalSize: 0,
                downloadedSize: 0,
                link: url,
                modAuthor: "",
                modWebsite: "",
                status: "waiting",
                fileName: name
            }
            this.addDownloadTask(task)
            // this.downloadTaskList.unshift(task)
            // const settings = useSettings()
            // let dest = join(settings.settings.modStorageLocation, 'cache')

            // let gid = await APIAria2.addUri(task.link, name, dest).catch(err => {
            //     ElMessage.error(`下载错误: ${err}`)
            // })

            // console.log(gid);
            // task.gid = gid.result
            // ElMessage.success(`${task.name} 已添加到下载列表`)

        },

        // 添加下载任务
        async addDownloadTask(task: IDownloadTask) {

            // 判断是否已经存在
            if (this.getTaskById(task.webId as string)) {
                // 如果已存在则移除
                this.downloadTaskList = this.downloadTaskList.filter(item => item.webId != task.webId)
            }
            this.downloadTaskList.unshift(task)
            const settings = useSettings()
            let dest = join(settings.settings.modStorageLocation, 'cache')

            let gid = await APIAria2.addUri(task.link, task.fileName, dest).catch(err => {
                ElMessage.error(`下载错误: ${err}`)
            })

            task.gid = gid.result
            console.log(task.gid);

            ElMessage.success(`${task.name} 已添加到下载列表`)
        },

        //#endregion

        //#region 重新下载
        async ReStart(mod: IModInfo | IDownloadTask, modStorage: string) {
            FileHandler.deleteFile(modStorage)
            console.log(mod);

            switch (mod.from) {
                case "GlossMod":
                    this.addDownloadById(mod)
                    break;
                case "Thunderstore":
                    const thunderstore = useThunderstore()
                    if (mod.other) {
                        let data = await thunderstore.getModData(mod.other.namespace, mod.other.name)
                        console.log(data);
                        if (!data.latest) {
                            data.latest = await thunderstore.getModVersionData(mod.other.namespace, mod.other.name, data.versions[0].name)
                        }

                        let key = `${data?.owner}-${data?.name}-${data?.latest.version_number}`
                        this.addDownloadByThunderstore(data, key)
                    }
                    break;
                case 'ModIo':
                    const modio = useModIo()
                    let modio_data = await modio.getModDataById(mod.webId as number)
                    console.log(modio_data);
                    if (modio_data) {
                        this.addDownloadByModIo(modio_data)
                    }
                    break
                case 'CurseForge':
                    const curseforge = useCurseForge()
                    let cf_mod = await curseforge.GetModDataById(mod.webId as number)
                    console.log(cf_mod);
                    if (cf_mod) {
                        this.addDownloadByCurseForge(cf_mod)
                    }

                    break
                case 'GitHub':
                    const github = useGithub()
                    if (mod.modWebsite) {
                        let release = await github.parse(mod.modWebsite)
                        if (release) {
                            console.log(mod.fileName);
                            this.addDownloadByGitHub(release, mod.modWebsite, mod.fileName)

                            // let _mod = release.assets.find(item => item.name == mod.fileName)
                            // if (_mod) {
                            //     this.addDownloadByGitHub(release, release.tag_name, mod.modWebsite)
                            // }
                        }
                    }
                    break
                case 'GameBanana':
                    this.addDownloadByGameBanana(mod.webId as number)
                    break
                default:
                    break;
            }
        },

        //#endregion
    }
})