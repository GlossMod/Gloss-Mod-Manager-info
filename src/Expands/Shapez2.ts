/**
 * @description 海山 支持
 */

import { join } from "node:path"

export const supportedGames: ISupportedGames = {
    GlossGameId: 378,
    steamAppID: 2162800,
    Thunderstore: {
        community_identifier: 'dyson-sphere-program'
    },
    installdir: join("shapez 2"),
    gameName: "Shapez 2",
    gameExe: "shapez 2.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/2162800"
        },
        {
            name: "直接启动",
            exePath: join("shapez 2.exe")
        }
    ],
    gameCoverImg: "https://mod.3dmgame.com/static/upload/mod/202408/MOD66bf055eb2ba5.webp@webp",
    modType: UnityGame.modType,
    checkModType: UnityGame.checkModType
}