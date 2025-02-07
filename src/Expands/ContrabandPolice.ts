/**
 * @description 缉私警察 支持
 */

import { join, basename, extname } from "node:path"


export const supportedGames: ISupportedGames = {
    GlossGameId: 339,
    steamAppID: 756800,
    installdir: join("Contraband Police"),
    gameName: "Contraband Police",
    gameExe: "ContrabandPolice.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/756800"
        },
        {
            name: "直接启动",
            exePath: join("ContrabandPolice.exe")
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "LocalLow", "CrazyRocks", "ContrabandPolice"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/65f1169237040.webp",
    modType: [
        ...UnityGame.modType
    ],
    checkModType: UnityGame.checkModType
}