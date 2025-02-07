/**
 * @description 赛博朋克2077 支持
 */



import { join, extname, sep, basename, dirname } from 'path'
import { statSync } from "fs";
import { ElMessage } from "element-plus";
function getCommonParentFolder(paths: string[]): string {

    /// AI 给的写法 虽然看不懂 但感觉很酷
    const dirs = paths.map((p) => p.split(sep));
    if (dirs.some((d) => d.length === 0)) return "";
    for (let i = 0; i < dirs[0].length; i++) {
        const current = dirs[0][i];
        if (dirs.some((d) => d[i] !== current)) {
            return dirs[0].slice(0, i).join(sep);
        }
    }
    return dirs[0].join(sep);
}

function handlePlugins(mod: IModInfo, installPath: string, isInstall: boolean) {

    // if (isInstall) {
    //     if (!Manager.checkInstalled("Cyber Engine Tweaks (CET)", 197625)) return false
    // }

    const manager = useManager()
    let modStorage = join(manager.modStorage, mod.id.toString())
    let gameStorage = join(manager.gameStorage ?? "", installPath ?? "")
    let files: string[] = []
    mod.modFiles.forEach(item => {
        try {
            let file = join(modStorage, item)
            if (statSync(file).isFile()) {
                files.push(file)
            }
        } catch { }

    })

    let folder = getCommonParentFolder(files);
    let lastFolder = basename(folder)

    // 如果只有一个文件
    if (files.length == 1) {
        folder = dirname(files[0])
        lastFolder = basename(folder)
    }
    if (isInstall) {
        return FileHandler.copyFolder(folder, join(gameStorage, lastFolder))
    } else {
        return FileHandler.deleteFolder(join(gameStorage, lastFolder))
    }
}

export const supportedGames: ISupportedGames = {
    GlossGameId: 195,
    steamAppID: 1091500,
    NexusMods: {
        game_domain_name: "cyberpunk2077",
        game_id: 3333
    },
    installdir: join("Cyberpunk 2077", 'bin', 'x64'),
    gameName: "Cyberpunk 2077",
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/1091500'
        },
        {
            name: "直接启动",
            exePath: join('bin', 'x64', 'Cyberpunk2077.exe')
        }
    ],
    gameExe: [
        {
            name: "Cyberpunk2077.exe",
            rootPath: join("..", "..")
        },
        {
            name: "REDprelauncher.exe",
            rootPath: ""
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "..", "Saved Games", "CD Projekt Red"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/195.png",
    modType: [
        {
            id: 1,
            name: 'CET',
            installPath: '\\',
            async install(mod) {
                const manager = useManager()
                let modStorage = join(manager.modStorage, mod.id.toString())
                let gameStorage = join(manager.gameStorage ?? "", this.installPath ?? "")
                mod.modFiles.forEach(item => {
                    try {
                        let file = join(modStorage, item)
                        let target = join(gameStorage, item)
                        if (statSync(file).isFile()) {
                            FileHandler.copyFile(file, target)
                        }
                    } catch { }
                })
                return true
            },
            async uninstall(mod) {
                const manager = useManager()
                let gameStorage = join(manager.gameStorage ?? "", this.installPath ?? "")

                mod.modFiles.forEach(item => {
                    try {
                        let target = join(gameStorage, item)
                        // 判断是否是文件
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
            name: 'archive',
            installPath: join('archive', 'pc', 'mod'),
            async install(mod) {
                return Manager.generalInstall(mod, this.installPath ?? "")
                // return true
            },
            async uninstall(mod) {
                return Manager.generalUninstall(mod, this.installPath ?? "")
            }
        },
        {
            id: 3,
            name: '脚本',
            installPath: join('bin', 'x64', 'plugins', 'cyber_engine_tweaks', 'mods'),
            async install(mod) {
                return handlePlugins(mod, this.installPath ?? '', true)
            },
            async uninstall(mod) {
                return handlePlugins(mod, this.installPath ?? '', false)
            }
        },
        {
            id: 4,
            name: '主目录',
            installPath: '\\',
            async install(mod) {
                return Manager.generalInstall(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return Manager.generalUninstall(mod, this.installPath ?? "", true)
            }
        },
        {
            id: 5,
            name: '未知',
            installPath: '\\',
            async install(mod) {
                ElMessage.warning("该mod类型未知, 无法自动安装, 请手动安装!")
                return false
            },
            async uninstall(mod) {
                return true
            }
        }
    ],
    checkModType(mod) {
        // 判断是否是CET
        // if (mod.webId == 197625) return 1

        let folderList = ['archive', 'bin', 'engine', 'r6', 'mods']

        let cet = false
        let archive = false
        let lua = false
        let mainFolder = false
        mod.modFiles.forEach(item => {

            // 判断目录是否包含 folderList
            let list = FileHandler.pathToArray(item)
            // console.log(list);

            if (list.some(item => folderList.includes(item))) mainFolder = true
            // 是否有archive文件
            let exe = extname(item)
            if (exe == ".archive") archive = true
            if (exe == ".lua") lua = true
            if (basename(item) == 'cyber_engine_tweaks.asi') cet = true

        })

        if (cet) return 1
        if (mainFolder) return 4
        // if (archive && lua) return 4
        if (archive) return 2
        if (lua) return 3
        return 5
    }
}