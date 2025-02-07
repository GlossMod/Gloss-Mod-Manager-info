
import { join } from 'path'
export const supportedGames: ISupportedGames = {
    GlossGameId: 325,
    steamAppID: 1627720,
    NexusMods: {
        game_domain_name: "liesofp",
        game_id: 5441
    },
    installdir: join("Lies of P"),
    gameName: "Lies of P",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1627720"
        },
        {
            name: "直接启动",
            exePath: "LOP.exe"
        }
    ],
    gameExe: "LOP.exe",
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/65127b4a5041a.webp",
    modType: UnrealEngine.modType("LiesofP", false),
    checkModType: UnrealEngine.checkModType,
}