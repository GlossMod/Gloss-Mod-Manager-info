/**
 * @description 剑士 支持
 */

import { basename, join, extname } from "node:path"
import { ElMessage } from "element-plus";
export const supportedGames: ISupportedGames = {
    GlossGameId: 168,
    steamAppID: 831560,
    installdir: join("WARRIORS OROCHI 4"),
    gameName: "Warriors Orochi 4",
    gameExe: "WO4.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/831560"
        },
        {
            name: "直接启动",
            exePath: join("WO4.exe")
        }
    ],
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/168.jpg",
    modType: [
        {
            id: 1,
            name: "bin",
            installPath: join("tmp", 'dlc'),
            async install(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", '.bin', true, true)
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", '.bin', false, true)
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
        let bin = false

        mod.modFiles.forEach(item => {
            if (extname(item) == '.bin') bin = true
        })

        if (bin) return 1

        return 99
    }
}