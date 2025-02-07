/**
 * @description 纪元1800 支持
 */

import { join, extname, basename } from "node:path"
import { ElMessage } from "element-plus";


export const supportedGames: ISupportedGames = {
    GlossGameId: 189,
    steamAppID: 916440,
    installdir: join("Anno 1800", "Bin", "Win64"),
    gameName: "Anno 1800",
    gameExe: [
        {
            name: "Anno1800.exe",
            rootPath: join('..', '..')
        }
    ],
    mod_io: 4169,
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/916440"
        },
        {
            name: "直接启动",
            exePath: join("Bin", "Win64", "Anno1800.exe")
        }
    ],
    archivePath: join(FileHandler.getMyDocuments(), "Anno 1800"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/189.png",
    modType: [
        {
            id: 1,
            name: "mods",
            installPath: join("mods"),
            async install(mod) {
                return Manager.installByFolderParent(mod, this.installPath ?? "", "data", true)
            },
            async uninstall(mod) {
                return Manager.installByFolderParent(mod, this.installPath ?? "", "data", false)
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
        let mods = false

        mod.modFiles.forEach(item => {
            // if (basename(item) == 'python35.dll') loader = true
            // 判断路径是否包含 data
            if (item.includes('data')) mods = true
        })

        // if (loader) return 1
        if (mods) return 1

        return 99
    }
}