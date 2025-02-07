/**
 * @description 幻兽帕鲁 支持
 */

import { join } from 'path'


export const supportedGames: ISupportedGames = {
    GlossGameId: 333,
    steamAppID: 1623730,
    curseforge: 85196,
    installdir: join("Palworld"),
    gameName: "Palworld",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1623730"
        },
        {
            name: "直接启动",
            exePath: "Palworld.exe"
        }
    ],
    gameExe: [
        {
            name: "Palworld.exe",
            rootPath: "."
        },
        {
            name: "PalServer.exe",
            rootPath: ".",
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "Local", "Pal", "Saved"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/65ae3cdbc7680.webp",
    modType: UnrealEngine.modType("Pal"),
    checkModType: UnrealEngine.checkModType
}