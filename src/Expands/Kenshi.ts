/**
 * @description 剑士 支持
 */

import { basename, join, extname } from "node:path"
import { ElMessage } from "element-plus";

export const supportedGames: ISupportedGames = {
    GlossGameId: 186,
    steamAppID: 233860,
    installdir: join("Kenshi"),
    gameName: "Kenshi",
    gameExe: "kenshi_x64.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/233860"
        },
        {
            name: "直接启动",
            exePath: join("kenshi_x64.exe")
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "Local", "Kenshi", "Saved"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/186.png",
    modType: [
        {
            id: 1,
            name: "Mods",
            installPath: join("mods"),
            async install(mod) {
                return Manager.installByFile(mod, this.installPath ?? "", '.mod', true, true)
            },
            async uninstall(mod) {
                return Manager.installByFile(mod, this.installPath ?? "", '.mod', false, true)
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
            if (extname(item) == '.mod') mods = true
        })

        if (mods) return 1

        return 99
    }
}