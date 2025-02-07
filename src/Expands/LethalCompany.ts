/**
 * @description 致命公司 支持
 */

import { join } from "node:path"


export const supportedGames: ISupportedGames = {
    GlossGameId: 329,
    steamAppID: 1966720,
    Thunderstore: {
        community_identifier: 'lethal-company'
    },
    installdir: join("Lethal Company"),
    gameName: "Lethal Company",
    gameExe: "Lethal Company.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1966720"
        },
        {
            name: "直接启动",
            exePath: join("Lethal Company.exe")
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "LocalLow", "ZeekerssRBLX"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/65a0f0fb13a40.webp",
    modType: UnityGame.modType,
    checkModType: UnityGame.checkModType
}