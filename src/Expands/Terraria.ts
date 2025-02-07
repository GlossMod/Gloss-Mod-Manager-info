/**
 * @description 泰拉瑞亚 支持
 */

import { join, extname, basename } from "node:path"
import { ElMessage } from "element-plus";


export const supportedGames: ISupportedGames = {
    GlossGameId: 320,
    steamAppID: 105600,
    // curseforge: 431,
    SteamWorkshop: true,
    installdir: join("Terraria"),
    gameName: "Terraria",
    gameExe: "Terraria.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/105600"
        },
        {
            name: "直接启动",
            exePath: join("Terraria.exe")
        }
    ],
    archivePath: join(FileHandler.getMyDocuments(), "My Games", "Terraria"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/64cc631c336ce.webp",
    modType: [
        {
            id: 1,
            name: "pack",
            installPath: join(FileHandler.getMyDocuments(), "My Games", "Terraria", "ResourcePacks"),
            async install(mod) {
                return Manager.installByFile(mod, this.installPath ?? "", "pack.json", true, false, false)
            },
            async uninstall(mod) {
                return Manager.installByFile(mod, this.installPath ?? "", "pack.json", false, false, false)
            }
        },
        {
            id: 2,
            name: "tmod",
            installPath: join(FileHandler.getMyDocuments(), "My Games", "Terraria", "tModLoader", "Mods"),
            async install(mod) {
                // return Manager.installByFolderParent(mod, this.installPath ?? "", "data", true, false)
                // return Manager.generalInstall(mod, this.installPath ?? "", false, false)
                return Manager.installByFile(mod, this.installPath ?? "", "workshop.json", true, false, false)
            },
            async uninstall(mod) {
                // return Manager.installByFolderParent(mod, this.installPath ?? "", "data", false, false)
                // return Manager.generalUninstall(mod, this.installPath ?? "", false, false)
                return Manager.installByFile(mod, this.installPath ?? "", "workshop.json", false, false, false)
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
        let pack = false
        let tmod = false

        mod.modFiles.forEach(item => {
            if (basename(item) == 'pack.json') pack = true
            if (extname(item) == '.tmod') tmod = true
        })

        if (pack) return 1
        if (tmod) return 2

        return 99
    }
}