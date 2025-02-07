

import { join, basename, dirname } from 'path'
import { ElMessage } from "element-plus";
function handlePlugins(mod: IModInfo, installPath: string, isInstall: boolean) {
    let res: IState[] = []
    const manager = useManager()
    let modStorage = join(manager.modStorage, mod.id.toString())
    let gameStorage = join(manager.gameStorage ?? "", installPath)
    let folder: string[] = []
    mod.modFiles.forEach(item => {
        if (basename(item).toLowerCase() == "modexportdata.cache") {
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
    GlossGameId: 248,
    steamAppID: 1468810,
    NexusMods: {
        game_domain_name: "taleofimmortal",
        game_id: 4447
    },
    installdir: "鬼谷八荒",
    gameName: "Tale of Immortal",
    gameExe: 'guigubahuang.exe',
    // https://store.steampowered.com/app/1468810/_/
    startExe: [
        {
            name: "Steam 启动",
            cmd: 'steam://rungameid/1468810'
        }
    ],
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/603e05b7aef61.png",
    modType: [
        {
            id: 1,
            name: "通用",
            installPath: join("ModExportData"),
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
            if (basename(item).toLowerCase() == "modexportdata.cache") {
                isMod = true
            }
        })

        if (isMod) return 1

        return 2
    }
}