/**
 * @description 街头霸王6 支持
 */

import { join, basename } from 'path'
import { ElMessage } from "element-plus";

export const supportedGames: ISupportedGames = {
    GlossGameId: 317,
    steamAppID: 1364780,
    installdir: "Street Fighter 6",
    gameName: "Street Fighter 6",
    gameExe: 'StreetFighter6.exe',
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/1364780'
        },
        {
            name: '直接启动',
            exePath: 'StreetFighter6.exe'
        }
    ],
    archivePath: join(Steam.getSteamInstallPath() || "", "userdata", Steam.GetLastSteamId32(), "632360", "remote"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/64ad1276b1fca.png",
    modType: [
        {
            id: 2,
            name: "REFramework",
            installPath: join(''),
            async install(mod) {
                return Manager.generalInstall(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return Manager.generalUninstall(mod, this.installPath ?? "", true)
            }
        },
        {
            id: 1,
            name: "autorun",
            installPath: join('reframework', 'autorun'),
            async install(mod) {
                if (!Manager.checkInstalled("REFramework", 207299)) return false
                return Manager.installByFolder(mod, this.installPath ?? "", 'autorun', true)
            },
            async uninstall(mod) {
                return Manager.installByFolder(mod, this.installPath ?? "", 'autorun', false)
            }
        },
        {
            id: 4,
            name: 'plugins',
            installPath: join('reframework', 'plugins'),
            async install(mod) {
                if (!Manager.checkInstalled("REFramework", 207299)) return false
                return Manager.installByFolder(mod, this.installPath ?? "", 'plugins', true)
            },
            async uninstall(mod) {
                return Manager.installByFolder(mod, this.installPath ?? "", 'plugins', false)
            }
        },
        {
            id: 3,
            name: "模型替换",
            installPath: join('natives'),
            async install(mod) {
                if (!Manager.checkInstalled("REFramework", 207299)) return false
                if (!Manager.checkInstalled("FirstNatives", 202971)) return false

                return Manager.installByFolder(mod, this.installPath ?? "", 'natives', true)
            },
            async uninstall(mod) {
                return Manager.installByFolder(mod, this.installPath ?? "", 'natives', false)
            }
        },
        {
            id: 5,
            name: '主目录',
            installPath: join(''),
            async install(mod) {
                return Manager.generalInstall(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return Manager.generalUninstall(mod, this.installPath ?? "", true)
            }
        },
        {
            id: 99,
            name: "未知",
            installPath: join(''),
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
        let natives = false
        let plugins = false
        let autorun = false
        let REFramework = false
        // if (mod.webId == 197869) return 2

        mod.modFiles.forEach(item => {
            if (basename(item) == 'dinput8.dll') REFramework = true
            if (item.toLowerCase().includes('natives')) natives = true
            if (item.toLowerCase().includes('autorun')) autorun = true
            if (item.toLowerCase().includes('plugins')) plugins = true
        })

        if (REFramework) return 2
        if (autorun) return 1
        if (plugins) return 4
        if (natives) return 3

        return 99
    }
}