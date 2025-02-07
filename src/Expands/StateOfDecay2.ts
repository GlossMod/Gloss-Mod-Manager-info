/**
 * @description 腐烂国度2 支持
 */

import { join } from 'path'

export const supportedGames: ISupportedGames = {
    GlossGameId: 238,
    steamAppID: 495420,
    NexusMods: {
        game_domain_name: "stateofdecay2",
        game_id: 2433
    },
    installdir: join("StateOfDecay2"),
    gameName: "State of Decay 2",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/495420"
        },
        {
            name: "直接启动",
            exePath: "StateOfDecay2.exe"
        }
    ],
    gameExe: "StateOfDecay2.exe",
    archivePath: join(FileHandler.GetAppData(), "Local", "StateOfDecay2", "Saved"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/238.png",
    modType: UnrealEngine.modType("StateOfDecay2", false),
    checkModType: UnrealEngine.checkModType
}