/**
 * @description 暖雪 支持
 */

import { join } from "node:path"


export const supportedGames: ISupportedGames = {
    GlossGameId: 274,
    steamAppID: 1296830,
    installdir: join("WarmSnow"),
    gameName: "WarmSnow",
    gameExe: "WarmSnow.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1296830"
        },
        {
            name: "直接启动",
            exePath: join("WarmSnow.exe")
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "LocalLow", "BadMudStudio", "WarmSnow"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/61eb6d1e3f646.png",
    modType: UnityGame.modType,
    checkModType: UnityGame.checkModType
}