/**
 * @description 黑神话 悟空 支持
 */


import { join, extname, basename } from 'path'
import { ElMessage } from "element-plus";
export const supportedGames: ISupportedGames = {
    GlossGameId: 291,
    steamAppID: 0,
    installdir: join("Genshin Impact"),
    gameName: "Genshin Impact",
    gamebanana: 8552,
    startExe: [
        {
            name: "启动Mod",
            exePath: "3DMigoto Loader.exe"
        },
        {
            name: "启动 (国际服)",
            exePath: "GenshinImpact.exe"
        },
        {
            name: "启动 (国服)",
            exePath: "YuanShen.exe"
        }
    ],
    gameExe: [
        {
            name: "GenshinImpact.exe",
            rootPath: "",
        },
        {
            name: "YuanShen.exe",
            rootPath: ""
        }
    ],
    // archivePath: join(FileHandler.GetAppData(), "Local", "b1", "Saved"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/66da7e920f43e.webp",
    modType: [
        {
            id: 1,
            name: "mods",
            installPath: join("Mods"),
            async install(mod) {
                return Manager.installByFile(mod, this.installPath ?? "", ".ini", true, true, true, true, true)
            },
            async uninstall(mod) {
                return Manager.installByFile(mod, this.installPath ?? "", ".ini", false, true, true, true, true)
            }
        },
        {
            id: 2,
            name: "GIMI",
            installPath: "",
            async install(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", "3DMigoto Loader.exe", true)
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", "3DMigoto Loader.exe", false)
            }
        },
        {
            id: 99,
            name: '未知',
            installPath: '',
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
        let mods = false
        let GIMI = false
        mod.modFiles.forEach(item => {
            if (extname(item) == '.ini') mods = true
            if (basename(item) == '3DMigoto Loader.exe') GIMI = true
        })

        if (mods) return 1
        if (GIMI) return 2

        return 99
    }
}