/**
 * @description 最终幻想 7 重制版 支持
 */


import { join } from 'path'

export const supportedGames: ISupportedGames = {
    GlossGameId: 266,
    steamAppID: 1462040,
    NexusMods: {
        game_domain_name: "finalfantasy7remake",
        game_id: 4202
    },
    // curseforge: 4593,
    installdir: join("FINAL FANTASY VII REMAKE"),
    gameName: "FINAL FANTASY VII REMAKE",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1462040"
        },
        {
            name: "直接启动",
            exePath: "ff7remake.exe"
        }
    ],
    gameExe: "ff7remake.exe",
    archivePath: join(FileHandler.getMyDocuments(), "My Games", "FINAL FANTASY VII REMAKE"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/61c027ed1cbc1.png",
    modType: UnrealEngine.modType("End", false),
    checkModType: UnrealEngine.checkModType
}