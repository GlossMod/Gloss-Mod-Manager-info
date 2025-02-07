/**
 * @description 城市天际线2 支持
 */

import { join, basename, extname } from "node:path"
import { homedir } from 'os'

export const supportedGames: ISupportedGames = {
    GlossGameId: 326,
    steamAppID: 949230,
    Thunderstore: {
        community_identifier: 'cities-skylines-ii'
    },
    installdir: join("Cities Skylines II"),
    gameName: "Cities Skylines II",
    gameExe: "Cities2.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/949230"
        },
        {
            name: "直接启动",
            exePath: join("Cities2.exe")
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "LocalLow", "Colossal Order", "Cities Skylines II"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/6535dbba96ba3.webp",
    modType: [
        {
            id: 4,
            name: 'Map',
            installPath: "",
            async install(mod) {
                // "%UserProfile%\AppData\LocalLow\Colossal Order\Cities Skylines II\Maps"
                let installPath = join(homedir(), "AppData", "LocalLow", "Colossal Order", "Cities Skylines II", "Maps")
                return Manager.installByFileSibling(mod, installPath, '.cok', true, true, false)
            },
            async uninstall(mod) {
                let installPath = join(homedir(), "AppData", "LocalLow", "Colossal Order", "Cities Skylines II", "Maps")
                return Manager.installByFileSibling(mod, installPath, '.cok', false, true, false)
            }
        },
        ...UnityGame.modType
    ],
    checkModType(mod) {
        let BepInEx = false
        let plugins = false
        let map = false

        mod.modFiles.forEach(item => {
            if (basename(item).toLowerCase() == 'winhttp.dll') BepInEx = true
            if (extname(item) == '.dll') plugins = true
            if (extname(item) == '.cok') map = true
        })

        if (BepInEx) return 1
        if (plugins) return 2
        if (map) return 4

        return 99
    }
}