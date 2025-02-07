/**
 * @description 道衍诀 支持
 */

import { join } from 'path'


export const supportedGames: ISupportedGames = {
    GlossGameId: 350,
    steamAppID: 1951220,
    installdir: join("DaoYanJue"),
    gameName: "DaoYanJue",
    gameExe: "FNGameX.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1951220"
        },
        {
            name: "直接启动",
            exePath: "FNGameX.exe"
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "LocalLow", "FNGameX", "Saved"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/66447d161b2ff.webp",
    modType: UnrealEngine.modType("FNGameX", false),
    checkModType: UnrealEngine.checkModType
}