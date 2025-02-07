/**
 * @description 泰坦陨落2 支持
 */

import { join, extname, basename } from "node:path"
import { ElMessage } from "element-plus";


export const supportedGames: ISupportedGames = {
    GlossGameId: 332,
    steamAppID: 1237970,
    installdir: join("Titanfall2"),
    gameName: "Titanfall 2",
    gameExe: "Titanfall2.exe",
    Thunderstore: {
        community_identifier: "northstar",
    },
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1237970"
        },
        {
            name: "激活Mod启动",
            exePath: join("NorthstarLauncher.exe")
        }
    ],
    archivePath: join(FileHandler.getMyDocuments(), "Respawn", "Titanfall2"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/65a9d3b2453ae.webp",
    modType: [
        {
            id: 1,
            name: "mods",
            installPath: join("R2Northstar", "mods"),
            async install(mod) {
                return Manager.installByFile(mod, this.installPath ?? "", "mod.json", true)
            },
            async uninstall(mod) {
                return Manager.installByFile(mod, this.installPath ?? "", "mod.json", false)
            }
        },
        {
            id: 2,
            name: "Northstar",
            installPath: join(""),
            async install(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", "NorthstarLauncher.exe", true)
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", "NorthstarLauncher.exe", false)
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
        let Northstar = false

        mod.modFiles.forEach(item => {
            if (basename(item) == 'mod.json') mods = true
            if (basename(item) == 'NorthstarLauncher.exe') Northstar = true
        })

        if (Northstar) return 2
        if (mods) return 1

        return 99
    }
}