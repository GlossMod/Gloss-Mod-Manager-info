/**
 * @description 生化危机2 重制版 支持
 */

import { join } from 'path'

export const supportedGames: ISupportedGames = {
    GlossGameId: 180,
    steamAppID: 883710,
    NexusMods: {
        game_domain_name: "residentevil22019",
        game_id: 2702
    },
    installdir: "RESIDENT EVIL 2  BIOHAZARD RE2",
    gameName: "Resident Evil 2",
    gameExe: 're2.exe',
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/883710'
        },
        {
            name: '直接启动',
            exePath: 're2.exe'
        }
    ],
    archivePath: join(Steam.getSteamInstallPath() || "", "userdata", Steam.GetLastSteamId32(), "883710", "remote"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/180.png",
    modType: REEngine.modType,
    checkModType: REEngine.checkModType,
}