/**
 * @description 怪物猎人崛起 支持
 */


import { join, basename, extname, parse } from 'path'
import { statSync } from "fs";
import { ElMessage } from "element-plus";
function handlePlugins(mod: IModInfo, installPath: string, split: string, isInstall: boolean) {
    // if (isInstall) if (!Manager.checkInstalled("REFramework", 199521)) return false
    let res: IState[] = []
    const manager = useManager()
    mod.modFiles.forEach(async item => {
        let modStorage = join(manager.modStorage ?? "", mod.id.toString(), item)
        if (statSync(modStorage).isFile()) {
            let path = modStorage.split(split)[1]
            let gameStorage = join(manager.gameStorage ?? "", installPath, path ?? item)

            if (isInstall) {
                let state = await FileHandler.copyFile(modStorage, gameStorage)
                res.push({ file: item, state: state })
            } else {
                let state = FileHandler.deleteFile(gameStorage)
                res.push({ file: item, state: state })
            }
        }
    })
    return res
}

function handleMod(mod: IModInfo, installPath: string, isInstall: boolean) {
    // if (isInstall) {
    //     if (!Manager.checkInstalled("First Natives", 199507)) return false
    // }

    const manager = useManager()
    let res: IState[] = []
    mod.modFiles.forEach(async item => {
        try {
            let modStorage = join(manager.modStorage ?? "", mod.id.toString(), item)

            if (statSync(modStorage).isFile()) {
                // 获取 natives 后的路径, 包含 natives
                // let path = modStorage.split(/natives/i)[1]
                let path = FileHandler.getFolderFromPath(modStorage, "natives")
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

function handlePak(mod: IModInfo, isInstall: boolean) {
    const manager = useManager()

    mod.modFiles.forEach(item => {
        let modStorage = join(manager.modStorage ?? "", mod.id.toString(), item)
        if (statSync(modStorage).isFile()) {
            let gameStorage = join(manager.gameStorage ?? "")
            // 获取游戏目录下所有 *.pak 文件
            let pakFiles = FileHandler.getFolderFiles(gameStorage).filter(item => extname(item) == '.pak')
            // console.log(pakFiles);
            // 获取 "re_chunk_000.pak.patch_001.pak" 中的 patch_001.pak 为 1
            let pakNum = pakFiles.map(item => {
                let name = basename(item)
                let num = name.split('.pak')
                // 获取 倒数第二个
                let num2 = num[num.length - 2]
                return Number.isNaN(Number(num2.split('_')[1])) ? 0 : Number(num2.split('_')[1])
            })
            // 获取最大的数字
            let maxNum = Math.max(...pakNum)

            // 001 或 010
            let num = isInstall ? String(maxNum + 1).padStart(3, '0') : String(maxNum).padStart(3, '0')
            let pakName = `re_chunk_000.pak.patch_${num}.pak`
            // console.log(pakName);

            let gamePak = join(gameStorage, pakName)
            if (isInstall) {
                FileHandler.copyFile(modStorage, gamePak)
            } else {
                if (num != '001') FileHandler.deleteFile(gamePak)
            }
        }
    })
    return true
}

export const supportedGames: ISupportedGames = {

    GlossGameId: 270,
    steamAppID: 1446780,
    NexusMods: {
        game_domain_name: "monsterhunterrise",
        game_id: 4095
    },
    installdir: "MonsterHunterRise",
    gameName: "MonsterHunterRise",
    gameExe: "MonsterHunterRise.exe",
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/1446780'
        },
        {
            name: '直接启动',
            exePath: 'MonsterHunterRise.exe'
        }
    ],
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/61dbdb30cdbce.png",
    archivePath: join(Steam.getSteamInstallPath() || "", "userdata", Steam.GetLastSteamId32(), "1446780", "remote"),
    modType: [
        {
            id: 1,
            name: "REFramework",
            installPath: join(''),
            async install(mod) {
                return Manager.generalInstall(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return Manager.generalUninstall(mod, this.installPath ?? "", true)
            }
        },
        {
            id: 2,
            name: "Lua插件",
            installPath: join('reframework', 'autorun'),
            async install(mod) {
                return handlePlugins(mod, this.installPath ?? "", "autorun", true)
            },
            async uninstall(mod) {
                return handlePlugins(mod, this.installPath ?? "", "autorun", false)
            }
        },
        {
            id: 3,
            name: "Dll插件",
            installPath: join('reframework', 'plugins'),
            async install(mod) {
                return handlePlugins(mod, this.installPath ?? "", "plugins", true)
            },
            async uninstall(mod) {
                return handlePlugins(mod, this.installPath ?? "", "plugins", false)
            }
        },
        {
            id: 4,
            name: "natives",
            installPath: join('natives'),
            async install(mod) {
                return handleMod(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return handleMod(mod, this.installPath ?? "", false)
            }
        },
        {
            id: 5,
            name: "pak",
            installPath: join(''),
            async install(mod) {
                return handlePak(mod, true)
            },
            async uninstall(mod) {
                return handlePak(mod, false)
            }
        },
        {
            id: 6,
            name: "组合插件",
            installPath: join('reframework'),
            async install(mod) {
                return handlePlugins(mod, this.installPath ?? "", "reframework", true)
            },
            async uninstall(mod) {
                return handlePlugins(mod, this.installPath ?? "", "reframework", false)
            }
        },
        {
            id: 99,
            name: "未知",
            installPath: join(''),
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
        let natives = false
        let luaPlugins = false
        let dllPlugins = false
        let pak = false
        let reframework = false

        if (mod.webId == 199521) return 1

        mod.modFiles.forEach(item => {
            if (item.toLowerCase().includes('natives')) natives = true
            if (item.toLowerCase().includes('reframework')) reframework = true
            if (extname(item) == '.lua') luaPlugins = true
            if (extname(item) == '.dll') dllPlugins = true
            if (extname(item) == '.pak') pak = true
        })

        // if (natives && plugins) return 4

        if (reframework) return 6
        if (luaPlugins) return 2
        if (dllPlugins) return 3
        if (natives) return 4
        if (pak) return 5

        return 99
    }
}