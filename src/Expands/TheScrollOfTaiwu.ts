/**
 * @description 太吾绘卷 支持
 */



import { join, basename, dirname } from 'path'
import { ElMessage } from "element-plus";
function handlePlugins(mod: IModInfo, installPath: string, isInstall: boolean) {
    let res: IState[] = []
    const manager = useManager()
    let modStorage = join(manager.modStorage, mod.id.toString())
    let gameStorage = join(manager.gameStorage ?? "", installPath)
    let folder: string[] = []
    mod.modFiles.forEach(item => {
        if (basename(item).toLowerCase() == "config.lua") {
            folder.push(dirname(join(modStorage, item)))
        }
    })
    // console.log(folder);
    if (folder.length > 0) {
        folder.forEach(item => {
            let target = join(gameStorage, basename(item))
            if (isInstall) {
                // FileHandler.copyFolder(item, target)
                FileHandler.createLink(item, target)
            } else {
                // FileHandler.deleteFolder(target)
                FileHandler.removeLink(target)
            }
        })
    }
    return res
}

export const supportedGames: ISupportedGames = {
    GlossGameId: 167,
    steamAppID: 838350,
    NexusMods: {
        game_domain_name: "thescrolloftaiwu",
        game_id: 99999
    },
    installdir: "The Scroll Of Taiwu",
    gameName: "The Scroll Of Taiwu",
    gameExe: [
        {
            name: "The Scroll of Taiwu.exe",
            rootPath: ""
        }
    ],
    // https://store.steampowered.com/app/838350?snr=5000_5100___primarylinks
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/838350'
        }
    ],
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/167.png",
    modType: [
        {
            id: 1,
            name: "通用",
            installPath: join("Mod"),
            async install(mod) {
                return handlePlugins(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return handlePlugins(mod, this.installPath ?? "", false)
            }
        },
        {
            id: 2,
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
        let isMod = false
        mod.modFiles.forEach(item => {
            if (basename(item).toLowerCase() == "config.lua") {
                isMod = true
            }
        })
        if (isMod) return 1

        return 2
    }
}