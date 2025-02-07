/**
 * @description 群星 支持
 */

import { join, extname } from "node:path"
import { ElMessage } from "element-plus";

export const supportedGames: ISupportedGames = {
    GlossGameId: 21,
    steamAppID: 281990,
    installdir: join("Stellaris"),
    gameName: "Stellaris",
    gameExe: "stellaris.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/281990"
        },
        {
            name: "直接启动",
            exePath: join("stellaris.exe")
        }
    ],
    archivePath: join(FileHandler.getMyDocuments(), "Paradox Interactive", "Stellaris"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/21.jpg",
    modType: [
        {
            id: 1,
            name: "Mods",
            installPath: join(FileHandler.getMyDocuments(), "Paradox Interactive", "Stellaris", "mod"),
            async install(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", '.mod', true, true, false, ["descriptor.mod"])
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", '.mod', false, true, false, ["descriptor.mod"])
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