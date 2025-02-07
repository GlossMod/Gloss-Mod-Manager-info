/**
 * @description 猎人 荒野的召唤 支持
 */

import { basename, join, extname } from "node:path"
import { ElMessage } from "element-plus";

export const supportedGames: ISupportedGames = {
    GlossGameId: 322,
    steamAppID: 518790,
    installdir: join("theHunterCotW"),
    gameName: "The Hunter CotW",
    gameExe: "theHunterCotW_F.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/518790"
        },
        {
            name: "直接启动",
            exePath: join("theHunterCotW_F.exe")
        }
    ],
    archivePath: join(FileHandler.getMyDocuments(), "Avalanche Studios", "theHunter Call of the Wild", "Saves"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/64e2df9a8310c.webp",
    modType: [
        {
            id: 1,
            name: "dropzone",
            installPath: join("dropzone"),
            async install(mod) {
                return Manager.installByFolder(mod, this.installPath ?? "", "dropzone", true, false, true)
            },
            async uninstall(mod) {
                return Manager.installByFolder(mod, this.installPath ?? "", "dropzone", false, false, true)
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
        let dropzone = false

        mod.modFiles.forEach(item => {
            let list = FileHandler.pathToArray(item)
            if (list.includes('dropzone')) dropzone = true
        })

        if (dropzone) return 1

        return 99
    }
}