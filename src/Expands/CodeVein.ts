
import { join } from 'path'

export const supportedGames: ISupportedGames = {
    GlossGameId: 207,
    steamAppID: 678960,
    gameName: "CODE VEIN",
    installdir: "CodeVein",
    gameExe: 'CodeVein.exe',
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/678960'
        },
        {
            name: '直接启动',
            exePath: 'CodeVein.exe'
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "Local", "CodeVein", "Saved"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/207.png",
    modType: UnrealEngine.modType("CodeVein", false),
    checkModType: UnrealEngine.checkModType
}