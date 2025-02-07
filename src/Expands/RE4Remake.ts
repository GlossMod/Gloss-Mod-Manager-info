/**
 * @description 生化危机4 重制版 支持
 */

import { join } from 'path'
import { REEngine } from '@/model/REEngine';

export const supportedGames: ISupportedGames = {
    GlossGameId: 303,
    steamAppID: 2050650,
    NexusMods: {
        game_domain_name: "residentevil42023",
        game_id: 5195
    },
    installdir: "RESIDENT EVIL 4  BIOHAZARD RE4",
    gameName: "RE4Remake",
    gameExe: 're4.exe',
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/2050650'
        },
        {
            name: '直接启动',
            exePath: 're4.exe'
        }
    ],
    archivePath: join(Steam.getSteamInstallPath() || "", "userdata", Steam.GetLastSteamId32(), "2050650", "remote"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/63e310bf62591.webp",
    modType: REEngine.modType,
    checkModType: REEngine.checkModType,
}