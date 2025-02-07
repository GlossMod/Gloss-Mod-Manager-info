/**
 * @description 逸剑风云决 支持
 */

import { join } from 'path'

export const supportedGames: ISupportedGames = {
    GlossGameId: 328,
    steamAppID: 1876890,
    installdir: join("Wandering Sword"),
    gameName: "Wandering Sword",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1876890"
        },
        {
            name: "直接启动",
            exePath: "JH.exe"
        }
    ],
    gameExe: "JH.exe",
    archivePath: join(FileHandler.GetAppData(), "Local", "Wandering_Sword", "Saved"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/656d920e5f559.webp",
    modType: UnrealEngine.modType("Wandering_Sword", false),
    checkModType: UnrealEngine.checkModType
}