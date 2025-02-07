/**
 * Unity 引擎 通用安装
 */

import { join, basename, extname } from "path";
import { ElMessage } from "element-plus";
export class UnityGame {
    static modType: ISupportedGames["modType"] = [
        {
            id: 1,
            name: "BepInEx",
            installPath: join(""),
            async install(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", 'winhttp.dll', true)
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", 'winhttp.dll', false)
            }
        },
        {
            id: 2,
            name: "plugins",
            installPath: join("BepInEx", "plugins"),
            async install(mod) {
                return Manager.installByFolder(mod, this.installPath ?? "", "plugins", true, false, true)
            },
            async uninstall(mod) {
                return Manager.installByFolder(mod, this.installPath ?? "", "plugins", false, false, true)
            }
        },
        {
            id: 3,
            name: "游戏根目录",
            installPath: join(""),
            async install(mod) {
                return Manager.generalInstall(mod, this.installPath ?? "", false)
            },
            async uninstall(mod) {
                return Manager.generalUninstall(mod, this.installPath ?? "", false)
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
    ]

    static checkModType(mod: IModInfo) {
        let BepInEx = false
        let plugins = false

        mod.modFiles.forEach(item => {
            if (basename(item).toLowerCase() == 'winhttp.dll') BepInEx = true
            if (extname(item) == '.dll') plugins = true
            if (item.toLocaleLowerCase().indexOf('plugins') > -1) plugins = true
        })

        if (BepInEx) return 1
        if (plugins) return 2

        return 99
    }
}

export class UnityGameILCPP2 {
    static modType: ISupportedGames["modType"] = [
        {
            id: 1,
            name: "MelonLoader",
            installPath: join(''),
            async install(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", 'version.dll', true)
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", 'version.dll', false)
            }
        },
        {
            id: 2,
            name: 'mods',
            installPath: join('mods'),
            async install(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", '.dll', true, true)
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", '.dll', false, true)
            }
        },
        {
            id: 3,
            name: "游戏根目录",
            installPath: join(""),
            async install(mod) {
                return Manager.generalInstall(mod, this.installPath ?? "", false)
            },
            async uninstall(mod) {
                return Manager.generalUninstall(mod, this.installPath ?? "", false)
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
    ]

    static checkModType(mod: IModInfo) {
        let MelonLoader = false
        let mods = false

        mod.modFiles.forEach(item => {
            if (basename(item).toLowerCase() == 'version.dll') MelonLoader = true
            if (extname(item) == '.dll') mods = true
        })

        if (MelonLoader) return 1
        if (mods) return 2

        return 99
    }
}