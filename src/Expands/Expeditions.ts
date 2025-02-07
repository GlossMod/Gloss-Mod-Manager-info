/**
 * @description 远征：泥泞奔驰游戏 支持
 */

import { join, extname } from 'path'
import { ElMessage } from "element-plus";

export const supportedGames: ISupportedGames = {
    GlossGameId: 356,
    steamAppID: 2477340,
    mod_io: 5734,
    installdir: join("Expeditions A MudRunner Game", "Sources", "Bin"),
    gameName: "Expeditions A MudRunner Game",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/2477340"
        },
        {
            name: "直接启动",
            exePath: join("Sources", "Bin", "Expeditions.exe")
        }
    ],
    gameExe: [
        {
            name: "Expeditions.exe",
            rootPath: join("..", "..")
        }
    ],
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/6670007e442e8.webp",
    modType: [
        {
            id: 1,
            name: "pak",
            installPath: join("preload", "paks", "client"),
            async install(mod) {
                return Manager.generalInstall(mod, this.installPath ?? "", false)
            },
            async uninstall(mod) {
                return Manager.generalUninstall(mod, this.installPath ?? "", false)
            },
        },
        {
            id: 99,
            name: '未知',
            installPath: '\\',
            async install(mod) {
                ElMessage.warning("该mod类型未知, 无法自动安装, 请手动安装!")
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
            if (extname(item) == '.pak') pak = true
        })

        if (pak) return 1

        return 99
    }
}