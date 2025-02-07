/**
 * @description 对马岛之鬼 支持
 */

import { join, extname } from 'path'
import { ElMessage } from "element-plus";

export const supportedGames: ISupportedGames = {
    GlossGameId: 351,
    steamAppID: 2215430,
    installdir: join("Ghost of Tsushima DIRECTOR'S CUT"),
    gameName: "Ghost of Tsushima",
    gameExe: "GhostOfTsushima.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/2215430"
        },
        {
            name: "直接启动",
            exePath: "GhostOfTsushima.exe"
        }
    ],
    archivePath: join(FileHandler.getMyDocuments(), "Ghost of Tsushima DIRECTOR'S CUT"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/664703cf381cf.webp",
    modType: [
        {
            id: 1,
            name: "psarc",
            installPath: join("cache_pc", "psarc"),
            async install(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", '.psarc', true, true)
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", '.psarc', false, true)
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
        let psarc = false

        mod.modFiles.forEach(item => {
            if (extname(item) == '.psarc') psarc = true
        })

        if (psarc) return 1

        return 99
    }
}