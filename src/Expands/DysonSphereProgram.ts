/**
 * @description 戴森球计划 支持
 */

import { join } from "node:path"


export const supportedGames: ISupportedGames = {
    GlossGameId: 245,
    steamAppID: 1366540,
    Thunderstore: {
        community_identifier: 'dyson-sphere-program'
    },
    installdir: join("Dyson Sphere Program"),
    gameName: "Dyson Sphere Program",
    gameExe: "DSPGAME.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1366540"
        },
        {
            name: "直接启动",
            exePath: join("DSPGAME.exe")
        }
    ],
    archivePath: join(FileHandler.getMyDocuments(), "Dyson Sphere Program"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/60112fb1bdafa.png",
    modType: UnityGame.modType,
    checkModType: UnityGame.checkModType
}