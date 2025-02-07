/**
 * @description 原子之心 支持
 */

import { join } from 'path'


export const supportedGames: ISupportedGames = {
    GlossGameId: 304,
    steamAppID: 668580,
    installdir: join("Atomic Heart"),
    gameName: "Atomic Heart",
    gameExe: "AtomicHeart.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/668580"
        },
        {
            name: "直接启动",
            exePath: "AtomicHeart.exe"
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "..", "Saved Games", "AtomicHeart"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/63f5846644d4e.webp",
    modType: UnrealEngine.modType("AtomicHeart", false),
    checkModType: UnrealEngine.checkModType
}