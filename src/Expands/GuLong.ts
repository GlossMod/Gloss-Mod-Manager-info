// /**
//  * @description 古龙风云录 支持
//  */

// import { join } from "node:path"


// export const supportedGames: ISupportedGames = {
//     GlossGameId: 337,
//     steamAppID: 2340650,
//     installdir: join("古龙风云录"),
//     gameName: "GuLong",
//     gameExe: "GuLong.exe",
//     startExe: [
//         {
//             name: "Steam 启动",
//             cmd: "steam://rungameid/2340650"
//         },
//         {
//             name: "直接启动",
//             exePath: join("GuLong.exe")
//         }
//     ],
//     gameCoverImg: "https://mod.3dmgame.com/static/upload/game/65bef978b5da4.webp",
//     modType: [
//         {
//             id: 4,
//             name: "Mods",
//             installPath: join("Mods"),
//             async install(mod) {
//                 return Manager.installByFolder(mod, this.installPath ?? "", "Mods", true, false, true)
//             },
//             async uninstall(mod) {
//                 return Manager.installByFolder(mod, this.installPath ?? "", "Mods", false, false, true)
//             }
//         },
//         ...UnityGame.modType
//     ],
//     checkModType(mod) {
//         let id = 99

//         if (id == 99) {
//             id = UnityGame.checkModType(mod)
//         }

//         return id
//     }
// }
