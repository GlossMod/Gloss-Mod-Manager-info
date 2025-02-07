// 饥荒 Mod支持

import { basename, join, dirname } from 'path'
import { ElMessage } from "element-plus";
function handleMods(mod: IModInfo, installPath: string, isInstall: boolean) {
    let res: IState[] = []
    const manager = useManager()
    let modStorage = join(manager.modStorage, mod.id.toString())
    let gameStorage = join(manager.gameStorage ?? "", installPath)
    let folder: string[] = []
    mod.modFiles.forEach(item => {
        if (basename(item).toLowerCase() == "modmain.lua") {
            folder.push(dirname(join(modStorage, item)))
        }
    })
    // console.log(folder);
    if (folder.length > 0) {
        folder.forEach(item => {
            let target = join(gameStorage, basename(item))
            if (isInstall) {
                // console.log(item, target);
                FileHandler.createLink(item, target)
                // FileHandler.copyFolder(item, target)
            } else {
                // FileHandler.deleteFolder(target)
                FileHandler.removeLink(target)
            }
        })
    }
    return res
}

export const supportedGames: ISupportedGames = {
    GlossGameId: 14,
    steamAppID: 322330,
    NexusMods: {
        game_domain_name: 'dontstarvetogether',
        game_id: 2709
    },
    installdir: join("Don't Starve Together", "bin"),
    gameName: "Don't Starve Together",
    gameExe: [
        {
            name: 'dontstarve_steam.exe',
            rootPath: join('..')
        },
        {
            name: 'dontstarve_steam_x64.exe',
            rootPath: join('..')
        }
    ],
    startExe: [
        {
            name: 'steam 启动',
            cmd: 'steam://rungameid/322330'
        },
        {
            name: '启动 x32',
            exePath: join('bin', 'dontstarve_steam.exe')
        },
        {
            name: '启动 x64',
            exePath: join('bin64', 'dontstarve_steam_x64.exe')
        },
    ],
    archivePath: join(FileHandler.getMyDocuments(), "Klei"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/14.jpg",
    modType: [
        {
            id: 1,
            name: '通用类型',
            installPath: join('mods'),
            async install(mod) {
                return handleMods(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return handleMods(mod, this.installPath ?? "", false)
            },
        },
        {
            id: 99,
            name: '未知',
            installPath: '',
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
        let lua = false

        mod.modFiles.forEach(item => {
            if (basename(item) == 'modmain.lua') lua = true
        })

        if (lua) return 1
        return 99
    }
}