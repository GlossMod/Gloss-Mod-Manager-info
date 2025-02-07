
import { join } from 'path'

export const supportedGames: ISupportedGames = {
    GlossGameId: 410,
    steamAppID: 2701660,
    gameName: "DQIIIHD2DRemake",
    installdir: "DRAGON QUEST III HD-2D Remake",
    gameExe: 'DQIIIHD2DRemake.exe',
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/2701660'
        },
        {
            name: '直接启动',
            exePath: 'DQIIIHD2DRemake.exe'
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "Local", "SparkingZERO", "Saved"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/mod/202412/MOD675a59d27912a.png@webp",
    modType: UnrealEngine.modType("Game", true),
    checkModType: UnrealEngine.checkModType
}