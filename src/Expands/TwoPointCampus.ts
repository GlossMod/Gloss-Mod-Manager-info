/**
 * @description 双点学校 支持
 */

import { join, extname } from "node:path"
import { homedir } from "os";
import { ElMessage } from "element-plus";


export const supportedGames: ISupportedGames = {
    GlossGameId: 331,
    steamAppID: 1649080,
    installdir: join("Two Point Campus"),
    gameName: "Two Point Campus",
    gameExe: "TPC.exe",
    mod_io: 4081,
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1649080"
        },
        {
            name: "直接启动",
            exePath: join("TPC.exe")
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "LocalLow", "Two Point Studios", "Two Point Campus"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/65a74761bb3fe.webp",
    modType: [
        {
            id: 1,
            name: "mods",
            installPath: join(homedir(), "AppData", "LocalLow", "Two Point Studios", "Two Point Campus", "Mods"),
            async install(mod) {
                return Manager.installByFile(mod, this.installPath ?? "", ".json", true, true, false)
            },
            async uninstall(mod) {
                return Manager.installByFile(mod, this.installPath ?? "", ".json", false, true, false)
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
        // // let loader = false
        let mods = false

        mod.modFiles.forEach(item => {
            if (extname(item) == '.json') mods = true
        })

        if (mods) return 1

        return 99
    }
}