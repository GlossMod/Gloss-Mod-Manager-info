/**
 * @description 冰汽时代 2 支持
 */

import { join } from "node:path"

export const supportedGames: ISupportedGames = {
    GlossGameId: 387,
    steamAppID: 1601580,
    installdir: join("Frostpunk2"),
    gameName: "Frostpunk 2",
    gameExe: "Frostpunk2.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1601580"
        },
        {
            name: "直接启动",
            exePath: join("Frostpunk2.exe")
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "Local", "11bitstudios", "Frostpunk2"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/mod/202410/MOD6706347b70717.webp@webp",
    modType: UnrealEngine.modType("Frostpunk2", false),
    checkModType: UnrealEngine.checkModType
}