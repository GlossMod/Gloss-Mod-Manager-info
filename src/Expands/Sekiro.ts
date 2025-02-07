/**
 * @description 只狼 安装支持
 */

import { basename, join } from 'node:path'
import { statSync } from "fs";
import { ElMessage } from "element-plus";
let dictionaryList: string[] = []

// function getDictionaryList(data: string[]) {
//     if (dictionaryList.length == 0) {
//         axios.get("res/SekiroDictionary.txt").then(({ data }) => {
//             dictionaryList = data.split("\r\n")
//             data = dictionaryList
//         })
//     }
//     return dictionaryList
// }

async function handleMod(mod: IModInfo, installPath: string, isInstall: boolean) {
    try {
        if (isInstall) {
            if (!Manager.checkInstalled("ModEngine", 71282)) return false
        }

        if (dictionaryList.length == 0) {
            // let SekiroDictionary = (await axios.get("res/SekiroDictionary.txt")).data
            let SekiroDictionary = FileHandler.readFile(join(FileHandler.getResourcesPath(), 'res', 'SekiroDictionary.txt'))
            dictionaryList = SekiroDictionary.split("\r\n")
        }
        const manager = useManager()
        let res: IState[] = []
        mod.modFiles.forEach(async file => {
            try {

                // let modStorage = `${settings.settings.modStorageLocation}\\${settings.settings.managerGame.gameName}\\${mod.id}\\${file}`
                let modStorage = join(manager.modStorage, mod.id.toString(), file)
                // 判断是否是文件
                if (!statSync(modStorage).isFile()) return

                let name = basename(file)
                // 判断name 是否在list中
                if (dictionaryList.some(item => item.includes(name))) {
                    // 获取对应的目录
                    let path = dictionaryList.find(item => item.includes(name))
                    // let gameStorage = `${settings.settings.managerGame.gamePath}\\${installPath}\\${path}`
                    let gameStorage = join(manager.gameStorage ?? "", installPath, path ?? "")
                    if (isInstall) {
                        let state = await FileHandler.copyFile(modStorage, gameStorage)
                        res.push({ file: file, state: state })
                    } else {
                        let state = FileHandler.deleteFile(gameStorage)
                        res.push({ file: file, state: state })
                    }
                }
            } catch (error) {
                res.push({ file: file, state: false })
            }
        })
        return res
    } catch (error) {

        ElMessage.error(`错误:${error}`)
        return false
    }
}


export const supportedGames: ISupportedGames = {
    GlossGameId: 185,
    steamAppID: 814380,
    NexusMods: {
        game_domain_name: "sekiro",
        game_id: 2763
    },
    installdir: "Sekiro",
    gameName: "Sekiro",
    gameExe: 'sekiro.exe',
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/814380'
        },
        {
            name: '直接启动',
            exePath: 'sekiro.exe'
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "Roaming", "Sekiro"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/185.png",
    modType: [
        {
            id: 1,
            name: '基础类型',
            installPath: '\\mods',
            install(mod) {
                return handleMod(mod, this.installPath ?? "", true)
            },
            uninstall(mod) {
                return handleMod(mod, this.installPath ?? "", false)
            },
        },
        {
            id: 2,
            name: 'ModEngine',
            installPath: "",
            async install(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", "dinput8.dll", true)
                // Manager.generalInstall(mod, this.installPath ?? "")
                // return true
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", "dinput8.dll", false)
                // Manager.generalUninstall(mod, this.installPath ?? "")
                // return true
            },
        },
        {
            id: 99,
            name: "未知",
            installPath: "",
            async install(mod) {
                ElMessage.warning("未知类型, 请手动安装")
                return false
            },
            async uninstall(mod) {
                return true
            }
        }
    ],
    checkModType(mod) {
        // if (mod.webId == 71282) return 2

        if (dictionaryList.length == 0) {
            // let SekiroDictionary = (await axios.get("res/SekiroDictionary.txt")).data
            let SekiroDictionary = FileHandler.readFile(join(FileHandler.getResourcesPath(), 'res', 'SekiroDictionary.txt'))
            dictionaryList = SekiroDictionary.split("\r\n")
        }

        let engine = false
        let mods = false

        mod.modFiles.forEach(item => {
            if (basename(item) == 'dinput8.dll') engine = true
            if (dictionaryList.find(item2 => FileHandler.compareFileName(item, item2))) mods = true

        })

        if (engine) return 2
        if (mods) return 1

        return 99
    }
}
