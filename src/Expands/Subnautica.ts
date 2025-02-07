/**
 * @description 深海迷航 支持
 */

import { join } from "node:path"

export const supportedGames: ISupportedGames = {
    GlossGameId: 105,
    steamAppID: 264710,
    NexusMods: {
        game_id: 1155,
        game_domain_name: "subnautica",
    },
    installdir: join("Subnautica"),
    gameName: "Subnautica",
    gameExe: "Subnautica.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/264710"
        },
        {
            name: "直接启动",
            exePath: join("Subnautica.exe")
        }
    ],
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/105a.jpg",
    modType: UnityGame.modType,
    checkModType: UnityGame.checkModType
}