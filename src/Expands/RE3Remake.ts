/**
 * @description 生化危机3 重制版 支持
 */

import { join, } from 'path'

export const supportedGames: ISupportedGames = {
    GlossGameId: 224,
    steamAppID: 952060,
    NexusMods: {
        game_domain_name: "residentevil32020",
        game_id: 3191
    },
    installdir: "RE3",
    gameName: "Resident Evil 3",
    gameExe: 're3.exe',
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/952060'
        },
        {
            name: '直接启动',
            exePath: 're3.exe'
        }
    ],
    archivePath: join(Steam.getSteamInstallPath() || "", "userdata", Steam.GetLastSteamId32(), "952060", "remote"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/224.png",
    modType: REEngine.modType,
    checkModType: REEngine.checkModType,
}