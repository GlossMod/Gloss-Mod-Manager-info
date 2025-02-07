/**
 * @description 7日杀 支持
 */

import { basename, join, extname } from "node:path"
import { ElMessage } from "element-plus";


export const supportedGames: ISupportedGames = {
    GlossGameId: 40,
    steamAppID: 251570,
    NexusMods: {
        game_id: 1059,
        game_domain_name: "7daystodie",
    },
    installdir: join("7 Days to Die"),
    gameName: "7 Days to Die",
    gameExe: "7DaysToDie.exe",
    archivePath: join(FileHandler.GetAppData(), "Roaming", "7DaysToDie"),
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/251570"
        },
        {
            name: "直接启动",
            exePath: join("7DaysToDie.exe")
        }
    ],
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/40.jpg",
    modType: [
        {
            id: 1,
            name: "Mods",
            installPath: join("Mods"),
            async install(mod) {
                return Manager.installByFile(mod, this.installPath ?? "", 'modinfo.xml', true)
            },
            async uninstall(mod) {
                return Manager.installByFile(mod, this.installPath ?? "", 'modinfo.xml', false)
            }
        },
        {
            id: 2,
            name: "Avatars",
            installPath: join("Mods", "VRoidMod", "Avatars"),
            async install(mod) {
                return Manager.generalInstall(mod, this.installPath ?? "", false)
            },
            async uninstall(mod) {
                return Manager.generalUninstall(mod, this.installPath ?? "", false)
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
        let Mods = false
        let Avatars = false

        mod.modFiles.forEach(item => {
            if (basename(item).toLowerCase() == 'modinfo.xml') Mods = true
            if (extname(item) == '.unity3d') Avatars = true
        })

        if (Mods) return 1
        if (Avatars) return 2

        return 99
    }
}