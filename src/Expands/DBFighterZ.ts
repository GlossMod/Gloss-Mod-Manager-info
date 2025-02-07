
import { join } from 'path'

export const supportedGames: ISupportedGames = {
    GlossGameId: 157,
    steamAppID: 678950,
    gameName: "DRAGON BALL FighterZ",
    installdir: "DRAGON BALL FighterZ",
    gameExe: 'DBFighterZ.exe',
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/678950'
        },
        {
            name: '直接启动',
            exePath: 'DBFighterZ.exe'
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "Local", "DBFighterZ", "Saved"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/157.jpg",
    modType: UnrealEngine.modType("RED", false),
    checkModType: UnrealEngine.checkModType
}