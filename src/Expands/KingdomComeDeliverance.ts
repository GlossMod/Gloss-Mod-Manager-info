/**
 * @description 天国 拯救 支持
 */

import { basename, join, extname } from "node:path"
import { ElMessage } from "element-plus";

export const supportedGames: ISupportedGames = {
    GlossGameId: 155,
    steamAppID: 379430,
    installdir: join("KingdomComeDeliverance", "Bin", "Win64"),
    gameName: "Kingdom Come Deliverance",
    gameExe: [
        {
            name: "KingdomCome.exe",
            rootPath: join('..', '..')
        }
    ],
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/379430"
        },
        {
            name: "直接启动",
            exePath: join("Bin", "Win64", "KingdomCome.exe")
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "..", "Saved Games", "kingdomcome"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/155.jpg",
    modType: [
        {
            id: 1,
            name: "Mods",
            installPath: join("Mods"),
            async install(mod) {
                return Manager.installByFile(mod, this.installPath ?? "", "mod.manifest", true)
            },
            async uninstall(mod) {
                return Manager.installByFile(mod, this.installPath ?? "", "mod.manifest", false)
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
        let mods = false

        mod.modFiles.forEach(item => {
            let list = FileHandler.pathToArray(item)
            if (basename(item) == 'mod.manifest') mods = true
        })

        if (mods) return 1

        return 99
    }
}