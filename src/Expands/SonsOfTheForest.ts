/**
 * @description 森林之子 支持
 */

import { join } from "node:path"


export const supportedGames: ISupportedGames = {
    GlossGameId: 305,
    steamAppID: 1326470,
    Thunderstore: {
        community_identifier: 'sons-of-the-forest'
    },
    installdir: join("Sons Of The Forest"),
    gameName: "Sons Of The Forest",
    gameExe: "SonsOfTheForest.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1326470"
        },
        {
            name: "直接启动",
            exePath: join("SonsOfTheForest.exe")
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "LocalLow", "Endnight", "SonsOfTheForest"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/63fc08e3ef48b.webp",
    modType: UnityGame.modType,
    checkModType: UnityGame.checkModType
}