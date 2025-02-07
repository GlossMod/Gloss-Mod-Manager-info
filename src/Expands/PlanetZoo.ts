/**
 * @description 动物园之星 支持
 */

import { basename, join, extname } from "node:path"
import { ElMessage } from "element-plus";

export const supportedGames: ISupportedGames = {
    GlossGameId: 327,
    steamAppID: 703080,
    NexusMods: {
        game_domain_name: "planetzoo",
        game_id: 3100
    },
    installdir: join("Planet Zoo"),
    gameName: "Planet Zoo",
    gameExe: "PlanetZoo.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/703080"
        },
        {
            name: "直接启动",
            exePath: join("PlanetZoo.exe")
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "..", "Saved Games", "Frontier Developments", "Planet Zoo"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/653a085c9ddd7.webp",
    modType: [
        {
            id: 1,
            name: "Mods",
            installPath: join("win64", "ovldata"),
            async install(mod) {
                return Manager.installByFile(mod, this.installPath ?? "", 'manifest.xml', true)
            },
            async uninstall(mod) {
                return Manager.installByFile(mod, this.installPath ?? "", 'manifest.xml', false)
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
            if (basename(item).toLowerCase() == 'manifest.xml') mods = true
        })

        if (mods) return 1

        return 99
    }
}