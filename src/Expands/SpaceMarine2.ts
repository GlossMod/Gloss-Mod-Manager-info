/**
 * @description 战锤40K：星际战士2  支持
 */

import { join, extname } from "node:path"
import { ElMessage } from "element-plus";
export const supportedGames: ISupportedGames = {
    GlossGameId: 390,
    steamAppID: 2183900,
    installdir: join("Space Marine 2"),
    gameName: "Warhammer 40000 Space Marine 2",
    gameExe: "Warhammer 40000 Space Marine 2.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/2183900"
        },
        {
            name: "直接启动",
            exePath: join("Warhammer 40000 Space Marine 2.exe")
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "Local", "Saber", "Space Marine 2"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/mod/202410/MOD6707728ca7d89.webp@webp",
    modType: [
        {
            id: 1,
            name: "pak",
            installPath: join("client_pc", "root", "paks", "client", "default"),
            async install(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", ".pak", true, true, true)
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", ".pak", false, true, true)
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

        let pak = false

        mod.modFiles.forEach(item => {
            if (extname(item) == '.pak') {
                pak = true
            }
        })

        if (pak) return 1

        return 99
    }
}