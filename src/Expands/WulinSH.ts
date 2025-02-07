/**
 * @description 大侠立志传 支持
 */

import { join, basename, extname } from "node:path"


export const supportedGames: ISupportedGames = {
    GlossGameId: 310,
    steamAppID: 1948980,
    installdir: join("WulinSH"),
    gameName: "WulinSH",
    gameExe: "Wulin.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1948980"
        },
        {
            name: "直接启动",
            exePath: join("Wulin.exe")
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "LocalLow", "DefaultCompany", "Wulin"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/641d08aca63ce.webp",
    modType: [
        {
            id: 4,
            name: 'mods',
            installPath: join('Mods'),
            async install(mod) {
                return Manager.installByFile(mod, this.installPath ?? "", "Info.json", true)
            },
            async uninstall(mod) {
                return Manager.installByFile(mod, this.installPath ?? "", "Info.json", false)
            }
        },
        ...UnityGame.modType
    ],
    checkModType(mod) {
        let BepInEx = false
        let plugins = false
        let mods = false

        mod.modFiles.forEach(item => {
            if (basename(item).toLowerCase() == 'winhttp.dll') BepInEx = true
            if (extname(item) == '.dll') plugins = true
            if (basename(item).toLowerCase() == 'Info.json'.toLowerCase()) mods = true
        })

        if (mods) return 4
        if (BepInEx) return 1
        if (plugins) return 2

        return 99
    }
}