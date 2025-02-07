
import { join } from 'path'

export const supportedGames: ISupportedGames = {
    GlossGameId: 403,
    steamAppID: 1643320,
    gameName: "Stalker2",
    installdir: "S.T.A.L.K.E.R. 2 Heart of Chornobyl",
    gameExe: 'Stalker2.exe',
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/1643320'
        },
        {
            name: '直接启动',
            exePath: 'Stalker2.exe'
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "Local", "Stalker2", "Saved"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/mod/202412/MOD675955ed444f0.png@webp",
    modType: UnrealEngine.modType("Stalker2", true),
    checkModType: UnrealEngine.checkModType
}