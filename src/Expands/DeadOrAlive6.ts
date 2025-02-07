// /**
//  * @description 死或生 6 支持
//  */

// import { join, extname, basename } from "node:path"
// import { ElMessage } from "element-plus";


// export const supportedGames: ISupportedGames = {
//     GlossGameId: 182,
//     steamAppID: 838380,
//     installdir: join("Dead or Alive 6"),
//     gameName: "Dead or Alive 6",
//     gameExe: "DOA6.exe",
//     // mod_io: {
//     //     game_id: 4169
//     // },
//     startExe: [
//         {
//             name: "Steam 启动",
//             cmd: "steam://rungameid/838380"
//         },
//         {
//             name: "直接启动",
//             exePath: join("DOA6.exe")
//         }
//     ],
//     gameCoverImg: "https://mod.3dmgame.com/static/upload/game/182.jpg",
//     modType: [
//         {
//             id: 1,
//             name: "mods",
//             installPath: join("REDELBE", "Layer2"),
//             async install(mod) {
//                 return Manager.installByFile(mod, this.installPath ?? "", "mod.ini", true)
//             },
//             async uninstall(mod) {
//                 return Manager.installByFile(mod, this.installPath ?? "", "mod.ini", false)
//             }
//         },
//         {
//             id: 2,
//             name: "Redelbe",
//             installPath: join(""),
//             async install(mod) {
//                 return Manager.installByFileSibling(mod, this.installPath ?? "", "dinput8.dll", true)
//             },
//             async uninstall(mod) {
//                 return Manager.installByFileSibling(mod, this.installPath ?? "", "dinput8.dll", false)
//             }
//         },
//         {
//             id: 3,
//             name: "游戏根目录",
//             installPath: join(""),
//             async install(mod) {
//                 return Manager.generalInstall(mod, this.installPath ?? "", true)
//             },
//             async uninstall(mod) {
//                 return Manager.generalUninstall(mod, this.installPath ?? "", true)
//             }
//         },
//         {
//             id: 99,
//             name: "未知",
//             installPath: "",
//             async install(mod) {
//                 ElMessage.warning("未知类型, 请手动安装")
//                 return false
//             },
//             async uninstall(mod) {
//                 return true
//             }
//         }
//     ],
//     checkModType(mod) {
//         let redelbe = false
//         let mods = false

//         mod.modFiles.forEach(item => {
//             if (FileHandler.compareFileName(item, 'dinput8.dll')) redelbe = true
//             if (FileHandler.compareFileName(item, 'mod.ini')) mods = true
//         })

//         // if (loader) return 1
//         if (mods) return 1
//         if (redelbe) return 2

//         return 99
//     }
// }