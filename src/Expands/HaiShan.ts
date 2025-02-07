/**
 * @description 海山 支持
 */

import { join } from "node:path"

export const supportedGames: ISupportedGames = {
    GlossGameId: 366,
    steamAppID: 2180340,
    Thunderstore: {
        community_identifier: 'dyson-sphere-program'
    },
    installdir: join("HaiShan", "HaiShan"),
    gameName: "HaiShan",
    gameExe: "海山.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/2180340"
        },
        {
            name: "直接启动",
            exePath: join("海山.exe")
        }
    ],
    gameCoverImg: "https://mod.3dmgame.com/static/upload/mod/202407/MOD669638c34fae8.webp@webp",
    modType: UnityGame.modType,
    checkModType: UnityGame.checkModType
}