/**
 * @description 仁王2 支持
 */

import { basename, join, extname, } from "node:path"
import { ElMessage } from "element-plus";


function installMod(mod: IModInfo, isInstall: boolean) {

    if (isInstall && !Manager.checkInstalled("Nioh 2 Mod Enabler", 204153)) return false

    const manager = useManager()
    const modStorage = join(manager.modStorage, mod.id.toString())
    const gameStorage = join(manager.gameStorage ?? "")

    if (isInstall) {
        return FileHandler.createLink(modStorage, join(gameStorage, 'mods', mod.id.toString()))
    } else {
        return FileHandler.deleteFolder(join(gameStorage, 'mods', mod.id.toString()))
    }
}

export const supportedGames: ISupportedGames = {
    GlossGameId: 249,
    steamAppID: 1325200,
    NexusMods: {
        game_domain_name: 'nioh2',
        game_id: 3660
    },
    installdir: join("Nioh2"),
    gameName: "Nioh 2",
    gameExe: "nioh2.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1325200"
        },
        {
            name: "直接启动",
            exePath: join("nioh2.exe")
        }
    ],
    archivePath: join(FileHandler.getMyDocuments(), "KoeiTecmo", "Nioh2"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/6041c647d7a35.png",
    modType: [
        {
            id: 1,
            name: "Mod Enabler",
            installPath: join(""),
            async install(mod) {
                return Manager.generalInstall(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return Manager.generalUninstall(mod, this.installPath ?? "", true)
            }
        },
        {
            id: 2,
            name: "mods",
            installPath: join("mods"),
            async install(mod) {
                return installMod(mod, true)
            },
            async uninstall(mod) {
                return installMod(mod, false)
            }
        },
        {
            id: 3,
            name: "游戏根目录",
            installPath: "",
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
        let ModEnabler = false
        let Mods = false
        mod.modFiles.forEach(item => {
            // 判断目录是否包含 folderList
            let list = FileHandler.pathToArray(item)
            if (basename(item) == 'd3dcompiler_46.dll') ModEnabler = true
            // if (list.some(item => folderList.includes(item))) rootFolder = true
            if (extname(item) == '.ini') Mods = true
            // if (extname(item) == '.dll') scripts = true
            // if (basename(item) == 'install.xml') lml = true
        })

        if (ModEnabler) return 1
        if (Mods) return 2

        return 99
    }
}