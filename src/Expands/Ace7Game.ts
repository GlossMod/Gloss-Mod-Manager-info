/**
 * @description 皇牌空战 支持
 */

import { join } from 'path'


export const supportedGames: ISupportedGames = {
    GlossGameId: 341,
    steamAppID: 502500,
    installdir: join("ACE COMBAT 7"),
    gameName: "ACE COMBAT 7",
    archivePath: join(FileHandler.GetAppData(), "Local", "BANDAI NAMCO Entertainment", "ACE COMBAT 7"),
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/502500"
        },
        {
            name: "直接启动",
            exePath: "Ace7Game.exe"
        }
    ],
    gameExe: "Ace7Game.exe",
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/65f174af429dd.webp",
    modType: UnrealEngine.modType("Game", false),
    checkModType: UnrealEngine.checkModType
}