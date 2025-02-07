/**
 * @description 地狱之刃2 支持
 */

import { join } from 'path'


export const supportedGames: ISupportedGames = {
    GlossGameId: 355,
    steamAppID: 2461850,
    installdir: join("Senua's Saga Hellblade II"),
    gameName: "Senua's Saga Hellblade 2",
    gameExe: "Hellblade2.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/2461850"
        },
        {
            name: "直接启动",
            exePath: "Hellblade2.exe"
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "Local", "Hellblade2", "Saved"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/181.jpg",
    modType: UnrealEngine.modType("Hellblade2", false),
    checkModType: UnrealEngine.checkModType
}