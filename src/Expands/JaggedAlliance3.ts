/**
 * @description 铁血联盟3 支持
 */


import { join, basename } from "node:path"
import { ElMessage } from "element-plus";

export const supportedGames: ISupportedGames = {
    GlossGameId: 318,
    steamAppID: 1084160,
    installdir: join("Jagged Alliance 3"),
    gameName: "Jagged Alliance 3",
    gameExe: "JA3.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1084160"
        },
        {
            name: "直接启动",
            exePath: join("JA3.exe")
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "Roaming", "Jagged Alliance 3"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/64be23bb84fe3.webp",
    modType: [
        {
            id: 1,
            name: "通用类型",
            installPath: join(FileHandler.GetAppData(), "Roaming", "Jagged Alliance 3", "Mods"),
            async install(mod) {
                return Manager.installByFile(mod, this.installPath ?? "", 'metadata.lua', true, false, false)
            },
            async uninstall(mod) {
                return Manager.installByFile(mod, this.installPath ?? "", 'metadata.lua', false, false, false)
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
            if (basename(item) == 'metadata.lua') mods = true
        })

        if (mods) return 1

        return 99
    }
}