// /**
//  * @description 模拟农场22 支持
//  */


// import { join, extname, basename } from "node:path"
// import { ElMessage } from "element-plus";

// export const supportedGames: ISupportedGames = {
//     GlossGameId: 265,
//     steamAppID: 1248130,
//     installdir: join("Farming Simulator 22"),
//     gameName: "Farming Simulator 22",
//     gameExe: "FarmingSimulator2022.exe",
//     startExe: [
//         {
//             name: "Steam 启动",
//             cmd: "steam://rungameid/1248130"
//         },
//         {
//             name: "直接启动",
//             exePath: join("x64", "FarmingSimulator2022.exe")
//         }
//     ],
//     archivePath: join(FileHandler.getMyDocuments(), "My Games", "FarmingSimulator2022"),
//     gameCoverImg: "https://mod.3dmgame.com/static/upload/game/61a9e018c601c.png",
//     modType: [
//         {
//             id: 1,
//             name: "通用类型",
//             installPath: join(FileHandler.getMyDocuments(), "My Games", "FarmingSimulator2022", "mods"),
//             async install(mod) {
//                 return Manager.installByFile(mod, this.installPath ?? "", 'modDesc.xml', true, false, false)
//             },
//             async uninstall(mod) {
//                 return Manager.installByFile(mod, this.installPath ?? "", 'modDesc.xml', false, false, false)
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
//         let mods = false

//         mod.modFiles.forEach(item => {
//             if (basename(item) == 'modDesc.xml') mods = true
//         })

//         if (mods) return 1

//         return 99
//     }
// }