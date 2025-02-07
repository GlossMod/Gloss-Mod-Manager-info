// /**
//  * @description 幽浮2 支持
//  */

// import { basename, join, extname } from "node:path"
// import { ElMessage } from "element-plus";
// async function handleMods(mod: IModInfo, installPath: string, isInstall: boolean) {
//     let manager = useManager()
//     let srcPath = join(manager.modStorage, mod.id.toString())
//     let destPath = join(await FileHandler.getMyDocuments(), "Electronic Arts", "The Sims 4", "Mods", "Gloss Mod Manager", mod.id.toString())
//     if (isInstall) {
//         return FileHandler.createLink(srcPath, destPath)

//     } else {
//         return FileHandler.removeLink(destPath)
//     }
// }

// export const supportedGames: ISupportedGames = {
//     gameID: 38,
//     steamAppID: 268500,
//     installdir: join("XCOM 2", "Binaries", "Win64"),
//     gameName: "XCOM2",
//     gameExe: [
//         {
//             name: "XCom2.exe",
//             rootPath: join('..', '..')
//         }
//     ],
//     startExe: [
//         {
//             name: "Steam 启动",
//             cmd: "steam://rungameid/268500"
//         },
//         {
//             name: "直接启动",
//             exePath: join("Binaries", "Win64", "XCom2.exe")
//         }
//     ],
//     gameCoverImg: "https://mod.3dmgame.com/static/upload/game/38.jpg",
//     modType: [
//         {
//             id: 1,
//             name: "通用类型",
//             installPath: "Mods",
//             async install(mod) {
//                 // return handleMods(mod, this.installPath ?? "", true)
//                 return true
//             },
//             async uninstall(mod) {

//                 // return handleMods(mod, this.installPath ?? "", false)
//                 return true
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
//         let Mods = false

//         mod.modFiles.forEach(item => {
//             if (extname(item) === ".XComMod") Mods = true
//         })

//         if (Mods) return 1

//         return 99
//     }
// }