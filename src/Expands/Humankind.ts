// /**
//  * @description 人类 支持
//  */

// import { join, extname, basename } from "node:path"
// import { ElMessage } from "element-plus";


// export const supportedGames: ISupportedGames = {
//     GlossGameId: 330,
//     steamAppID: 1124300,
//     installdir: join("Humankind"),
//     gameName: "Humankind",
//     gameExe: "Humankind.exe",
//     mod_io: 2599,
//     startExe: [
//         {
//             name: "Steam 启动",
//             cmd: "steam://rungameid/1124300"
//         },
//         {
//             name: "直接启动",
//             exePath: join("Humankind.exe")
//         }
//     ],
//     archivePath: join(FileHandler.getMyDocuments(), "Humankind"),
//     gameCoverImg: "https://mod.3dmgame.com/static/upload/game/65a7365985d61.webp",
//     modType: [
//         {
//             id: 1,
//             name: "mods",
//             installPath: join(FileHandler.getMyDocuments(), "Humankind", "Community", "Scenarios"),
//             async install(mod) {
//                 const manager = useManager()
//                 let folderPath = join(manager.modStorage, mod.id.toString())
//                 let destPath = join(this.installPath || "", mod.id.toString())
//                 return FileHandler.createLink(folderPath, destPath, true)
//             },
//             async uninstall(mod) {
//                 let target = join(this.installPath || "", mod.id.toString())
//                 return FileHandler.removeLink(target, true)
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
//         // // let loader = false
//         // let mods = false

//         // mod.modFiles.forEach(item => {
//         //     // if (basename(item) == 'python35.dll') loader = true
//         //     // 判断路径是否包含 data
//         //     if (item.includes('ws64')) mods = true
//         // })

//         // // if (loader) return 1
//         // if (mods) return 1

//         return 1
//     }
// }