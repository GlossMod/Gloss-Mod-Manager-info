/**
 * @description 英灵神殿 支持
 */

import { join, basename, extname } from "node:path"


export const supportedGames: ISupportedGames = {
    GlossGameId: 340,
    steamAppID: 892970,
    Thunderstore: {
        community_identifier: 'valheim'
    },
    installdir: join("Valheim"),
    gameName: "Valheim",
    gameExe: "valheim.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/892970"
        },
        {
            name: "直接启动",
            exePath: join("valheim.exe")
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "LocalLow", "IronGate", "Valheim"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/65f1415124b36.webp",
    modType: UnityGame.modType,
    checkModType: UnityGame.checkModType
}