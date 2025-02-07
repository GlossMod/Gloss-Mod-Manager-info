/**
 * @description 堕落之主 支持
 */

import { join } from 'path'


export const supportedGames: ISupportedGames = {
    GlossGameId: 352,
    steamAppID: 1501750,
    installdir: join("Lords of the Fallen"),
    gameName: "Lords of the Fallen",
    gameExe: "LOTF2.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1501750"
        },
        {
            name: "直接启动",
            exePath: "LOTF2.exe"
        }
    ],
    archivePath: (() => {
        return join(FileHandler.GetAppData(), "Local", "LOTF2", "Saved")
    })(),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/664db7b3148f8.webp",
    modType: UnrealEngine.modType("LOTF2", false),
    checkModType: UnrealEngine.checkModType
}