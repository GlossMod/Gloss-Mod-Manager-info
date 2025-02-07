/**
 * @description 家园3 支持
 */

import { join } from 'path'


export const supportedGames: ISupportedGames = {
    GlossGameId: 312,
    steamAppID: 1840080,
    installdir: join("Homeworld 3"),
    gameName: "Homeworld 3",
    gameExe: "Homeworld3.exe",
    mod_io: 5251,
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1840080"
        },
        {
            name: "直接启动",
            exePath: "Homeworld3.exe"
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "Local", "Homeworld3", "Saved"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/6423ab827ad41.webp",
    modType: UnrealEngine.modType("Homeworld3", false),
    checkModType: UnrealEngine.checkModType
}