
import { join } from 'path'

export const supportedGames: ISupportedGames = {
    GlossGameId: 409,
    steamAppID: 1790600,
    gameName: "SparkingZERO",
    installdir: "DRAGON BALL Sparking! ZERO",
    gameExe: 'SparkingZERO.exe',
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/1790600'
        },
        {
            name: '直接启动',
            exePath: 'SparkingZERO.exe'
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "Local", "SparkingZERO", "Saved"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/mod/202412/MOD675a58a521b54.png@webp",
    modType: UnrealEngine.modType("SparkingZERO", true),
    checkModType: UnrealEngine.checkModType
}