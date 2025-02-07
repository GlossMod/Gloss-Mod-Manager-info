/**
 * @description 师父 支持
 */

import { basename, join, extname } from "node:path"


function handlePack(mod: IModInfo, installPath: string, install: boolean) {
    const manager = useManager()
    const modStorage = join(manager.modStorage ?? "", mod.id.toString())
    mod.modFiles.forEach(item => {
        if (extname(item) === ".pack") {
            let source = join(modStorage, item)
            let target = join(manager.gameStorage, installPath ?? "", basename(item))
            if (install) FileHandler.copyFile(source, target)
            else FileHandler.deleteFile(target)
        }
    })
    return true
}

export const supportedGames: ISupportedGames = {
    GlossGameId: 64,
    steamAppID: 2138710,
    NexusMods: {
        game_domain_name: "sifu",
        game_id: 4309
    },
    installdir: join("Sifu"),
    gameName: "SiFu",
    gameExe: "Sifu.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/2138710"
        },
        {
            name: "直接启动",
            exePath: join("Sifu.exe")
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "Local", "Sifu", "Saved"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/62207195e18a2.png",
    modType: UnrealEngine.modType("Sifu", false),
    checkModType: UnrealEngine.checkModType
}