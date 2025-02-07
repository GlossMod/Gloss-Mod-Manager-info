/**
 * @description 骑马与砍杀2 安装支持
 */

import { basename, join, extname, dirname } from 'node:path'
import { statSync } from "fs";
import { ElMessage } from "element-plus";
function getModFolder(mod: IModInfo) {
    let modFolder = ""
    const manager = useManager()
    for (let index = 0; index < mod.modFiles.length; index++) {
        const item = mod.modFiles[index];
        let modStorage = join(manager.modStorage ?? "", mod.id.toString(), item)
        if (statSync(modStorage).isFile()) {
            if (basename(modStorage).toLowerCase() == 'submodule.xml') {
                modFolder = dirname(modStorage)
                break
            }
        }
    }
    return modFolder
}

// 处理 mods
function handleMods(mod: IModInfo, installPath: string, isInstall: boolean) {

    let modFolder = getModFolder(mod)
    const manager = useManager()

    let gameStorage = join(manager.gameStorage ?? "", installPath, basename(modFolder))

    if (isInstall) return FileHandler.createLink(modFolder, gameStorage)
    else return FileHandler.removeLink(gameStorage)

}

export const supportedGames: ISupportedGames = {
    GlossGameId: 225,
    steamAppID: 261550,
    NexusMods: {
        game_domain_name: "mountandblade2bannerlord",
        game_id: 3174
    },
    installdir: join("Mount & Blade II Bannerlord", "bin", "Win64_Shipping_Client"),
    gameName: "MountBlade2",
    gameExe: [
        {
            name: "Bannerlord.exe",
            rootPath: join('..', '..')
        }
    ],
    startExe: [
        {
            name: 'steam 启动',
            cmd: 'steam://rungameid/261550'
        },
        {
            name: '直接启动',
            exePath: join("bin", "Win64_Shipping_Client", "TaleWorlds.MountAndBlade.Launcher.exe")
        }
    ],
    archivePath: join(FileHandler.getMyDocuments(), "Mount and Blade II Bannerlord"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/225.png",
    modType: [
        {
            id: 1,
            name: "Modules",
            installPath: "Modules",
            async install(mod) {
                return handleMods(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return handleMods(mod, this.installPath ?? "", false)
            }
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
        let modules = false

        mod.modFiles.forEach(item => {
            if (basename(item).toLowerCase() == 'submodule.xml') modules = true
        })

        if (modules) return 1

        return 99
    }
}