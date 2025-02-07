/**
 * @description 山门与幻境 支持
 */

import { join } from 'path'


export const supportedGames: ISupportedGames = {
    GlossGameId: 347,
    steamAppID: 1963040,
    installdir: join("TheLostVillage"),
    gameName: "The Lost Village",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1963040"
        },
        {
            name: "直接启动",
            exePath: "TheLostVillage.exe"
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "Local", "TheLostVillage", "Saved"),
    gameExe: "TheLostVillage.exe",
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/6629bb7235d50.webp",
    modType: UnrealEngine.modType("TheLostVillage", false),
    checkModType: UnrealEngine.checkModType
}