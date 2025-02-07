/**
 * @description Jump大乱斗 支持
 */

import { join } from 'path'


export const supportedGames: ISupportedGames = {
    GlossGameId: 181,
    steamAppID: 816020,
    installdir: join("JUMP FORCE"),
    gameName: "JUMP FORCE",
    gameExe: "JUMP_FORCE.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/816020"
        },
        {
            name: "直接启动",
            exePath: "JUMP_FORCE.exe"
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "local", "JUMP_FORCE", "Saved"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/181.jpg",
    modType: UnrealEngine.modType("JUMP_FORCE", false),
    checkModType: UnrealEngine.checkModType
}