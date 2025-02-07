/**
 * @description 下一站江湖2 支持
 */

import { join } from "node:path"


export const supportedGames: ISupportedGames = {
    GlossGameId: 346,
    steamAppID: 1606180,
    installdir: join("下一站江湖Ⅱ", "下一站江湖Ⅱ"),
    gameName: "Next Jianghu 2",
    gameExe: "下一站江湖Ⅱ.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1606180"
        },
        {
            name: "直接启动",
            exePath: join("下一站江湖Ⅱ.exe")
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "LocalLow", "inmotiongame", "下一站江湖Ⅱ"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/6629b6eff3688.webp",
    modType: UnityGame.modType,
    checkModType: UnityGame.checkModType
}