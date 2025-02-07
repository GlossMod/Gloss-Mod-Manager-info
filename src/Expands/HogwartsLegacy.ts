/** 
 * @description 霍格沃茨之遗 安装
*/

import { join } from 'node:path'

export const supportedGames: ISupportedGames = {
    GlossGameId: 302,
    steamAppID: 990080,
    NexusMods: {
        game_domain_name: "hogwartslegacy",
        game_id: 5113
    },
    installdir: "HogwartsLegacy",
    gameName: "Hogwarts Legacy",
    gameExe: 'HogwartsLegacy.exe',
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/990080'
        },
        {
            name: '直接启动',
            exePath: 'HogwartsLegacy.exe'
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "Local", "HogwartsLegacy", "Saved"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/63e2f9656f092.webp",
    modType: UnrealEngine.modType("Phoenix", false),
    checkModType: UnrealEngine.checkModType,
}

