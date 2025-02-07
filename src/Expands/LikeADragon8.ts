/**
 * @description 如龙8 支持
 */

import { join, basename } from "node:path"
import { ElMessage } from "element-plus";


function runSRMM() {
    // 运行 RyuModManager.exe 文件
    const manager = useManager()
    FileHandler.runExe(join(manager.gameStorage, "RyuModManager.exe"))
}

export const supportedGames: ISupportedGames = {
    GlossGameId: 334,
    steamAppID: 2072450,
    installdir: join("LikeADragon8", "runtime", "media"),
    gameName: "LikeADragon8",
    gameExe: "likeadragon8.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/2072450"
        },
        {
            name: "直接启动",
            exePath: join("likeadragon8.exe")
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "Local", "SEGA", "LikeADragon8"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/65b9e51412790.webp",
    modType: [
        {
            id: 1,
            name: "mods",
            installPath: join("mods"),
            async install(mod) {
                if (!Manager.checkInstalled("Shin Ryu Mod Manager", 206132)) return false

                Manager.generalInstall(mod, this.installPath ?? "", true)
                runSRMM()
                return true
            },
            async uninstall(mod) {
                Manager.generalUninstall(mod, this.installPath ?? "", true)
                runSRMM()
                return true

            }
        },
        {
            id: 2,
            name: "RyuModManager",
            installPath: join(""),
            async install(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", "RyuModManager.exe", true)
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", "RyuModManager.exe", false)
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
        // let loader = false
        // let mods = false
        let RyuModManager = false

        mod.modFiles.forEach(item => {
            // if (basename(item) == 'python35.dll') loader = true
            // 判断路径是否包含 data
            // if (item.includes('data')) mods = true
            if (FileHandler.compareFileName(basename(item), "RyuModManager.exe")) RyuModManager = true
        })

        // if (loader) return 1
        // if (mods) return 1
        if (RyuModManager) return 2

        return 1
    }
}