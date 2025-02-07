/**
 * @description 龙之信条2 支持
 */

import { join } from 'path'



export const supportedGames: ISupportedGames = {
    GlossGameId: 343,
    steamAppID: 2054970,
    installdir: "Dragons Dogma 2",
    gameName: "Dragons Dogma 2",
    gameExe: 'DD2.exe',
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/2054970'
        },
        {
            name: '直接启动',
            exePath: 'DD2.exe'
        }
    ],
    archivePath: join(Steam.getSteamInstallPath() || "", "userdata", Steam.GetLastSteamId32(), "2054970", "remote"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/65f8f21471754.webp",
    modType: REEngine.modType,
    checkModType: REEngine.checkModType
}