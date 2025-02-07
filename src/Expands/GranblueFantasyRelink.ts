// /**
//  * @description 蔚蓝幻想 Relink 支持
//  */

// import { join } from 'path'

// export const supportedGames: ISupportedGames = {
//     GlossGameId: 336,
//     steamAppID: 881020,
//     installdir: join("Granblue Fantasy Relink"),
//     gameName: "Granblue Fantasy Relink",
//     gameExe: "granblue_fantasy_relink.exe",
//     startExe: [
//         {
//             name: "Steam 启动",
//             cmd: "steam://rungameid/881020"
//         },
//         {
//             name: "直接启动",
//             exePath: "granblue_fantasy_relink.exe"
//         }
//     ],
//     gameCoverImg: "https://mod.3dmgame.com/static/upload/game/65bb62a24e92f.webp",
//     modType: UnrealEngine.modType("Polaris", false),
//     checkModType: UnrealEngine.checkModType
// }