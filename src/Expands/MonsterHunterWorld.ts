/**
 * @description 怪物猎人世界 支持
 */


import { join, basename, extname } from 'path'
import { statSync } from "fs";
import { ElMessage } from "element-plus";
// let dictionaryList: string[] = []

async function handleMod(mod: IModInfo, installPath: string, isInstall: boolean) {
    if (isInstall) {
        if (!Manager.checkInstalled("Stracker's Loader", 197740)) return false
    }

    // if (dictionaryList.length == 0) {
    //     let dictionary = (await axios.get("res/MonsterHunterWorldDictionary.txt")).data
    //     dictionaryList = dictionary.split("\r\n")
    // }
    const manager = useManager()
    let res: IState[] = []
    mod.modFiles.forEach(async item => {
        try {
            let modStorage = join(manager.modStorage ?? "", mod.id.toString(), item)

            if (statSync(modStorage).isFile()) {
                // 获取 nativePC 后的路径, 包含 nativePC
                // let path = modStorage.split(/nativepc/i)[1]
                let path = FileHandler.getFolderFromPath(modStorage, "nativepc")
                if (path) {
                    let gameStorage = join(manager.gameStorage ?? "", installPath, path ?? "")
                    if (isInstall) {
                        let state = await FileHandler.copyFile(modStorage, gameStorage)
                        res.push({ file: item, state: state })
                    } else {
                        let state = FileHandler.deleteFile(gameStorage)
                        res.push({ file: item, state: state })
                    }
                }
            }
        } catch {
            res.push({ file: item, state: false })
        }
    })

    return res
}

export const supportedGames: ISupportedGames = {
    GlossGameId: 161,
    steamAppID: 582010,
    NexusMods: {
        game_domain_name: "monsterhunterworld",
        game_id: 2531
    },
    installdir: "Monster Hunter World",
    gameName: "Monster Hunter World",
    gameExe: "MonsterHunterWorld.exe",
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/582010'
        },
        {
            name: '直接启动',
            exePath: 'MonsterHunterWorld.exe'
        }
    ],
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/161b.png",
    archivePath: join(Steam.getSteamInstallPath() || "", "userdata", Steam.GetLastSteamId32(), "582010", "remote"),
    modType: [
        {
            id: 1,
            name: "Stracker's Loader",
            installPath: '\\',
            async install(mod) {
                const manager = useManager()
                let modStorage = join(manager.modStorage ?? "", mod.id.toString())
                mod.modFiles.forEach(item => {
                    try {
                        let file = join(modStorage, item)
                        if (statSync(file).isFile()) {
                            FileHandler.copyFile(file, join(manager.gameStorage ?? "", item))
                        }
                    } catch { }

                })
                return true
            },
            async uninstall(mod) {
                const manager = useManager()
                mod.modFiles.forEach(item => {
                    try {
                        let target = join(manager.gameStorage ?? "", item)
                        if (statSync(target).isFile()) {
                            FileHandler.deleteFile(target)
                        }
                    } catch { }

                })
                return true
            }
        },
        {
            id: 2,
            name: "通用类型",
            installPath: '\\nativePC',
            async install(mod) {
                return handleMod(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return handleMod(mod, this.installPath ?? "", false)
            }
        },
        {
            id: 3,
            name: '插件',
            installPath: join('nativePC', 'plugins'),
            async install(mod) {
                const manager = useManager()
                let res: IState[] = []
                mod.modFiles.forEach(async item => {
                    try {
                        let modStorage = join(manager.modStorage ?? "", mod.id.toString(), item)
                        let gameStorage = join(manager.gameStorage ?? "", this.installPath ?? "", basename(item))
                        if (statSync(modStorage).isFile()) {
                            // 获取文件后缀名
                            if (extname(modStorage) == '.dll') {
                                let state = FileHandler.deleteFile(gameStorage)
                                res.push({ file: item, state: state })
                            }
                        }
                    } catch (error) {
                        res.push({ file: item, state: false })
                    }
                })

                return res
            },
            async uninstall(mod) {
                const manager = useManager()
                let res: IState[] = []

                mod.modFiles.forEach(async item => {
                    try {
                        let modStorage = join(manager.modStorage ?? "", mod.id.toString(), item)
                        let gameStorage = join(manager.gameStorage ?? "", this.installPath ?? "", basename(item))
                        if (statSync(modStorage).isFile()) {
                            // 获取文件后缀名
                            if (extname(modStorage) == '.dll') {
                                let state = await FileHandler.copyFile(modStorage, gameStorage)
                                res.push({ file: item, state: state })
                            }
                        }
                    } catch (error) {
                        res.push({ file: item, state: false })
                    }
                })

                return res
            }
        },
        {
            id: 4,
            name: '未知',
            installPath: "",
            async install(mod) {
                ElMessage.warning("该mod类型未知, 无法自动安装, 请手动安装!")
                return false
            },
            async uninstall(mod) {
                return false
            }
        }
    ],
    checkModType(mod) {
        // 判断是否是 Stracker's Loader
        if (mod.webId == 197740) return 1

        let nativePC = false
        let plugins = false
        mod.modFiles.forEach(item => {
            if (item.toLowerCase().includes('nativepc')) nativePC = true
            // 判断后缀是否有 dll
            if (item.endsWith('.dll')) plugins = true
        })

        if (nativePC) return 2

        if (plugins) return 3

        return 4
    }
}