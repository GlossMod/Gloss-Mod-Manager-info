/**
 * @description 巫师3 安装支持
 */

import { basename, join } from "node:path"
import { statSync } from "fs";
import { ElMessage } from "element-plus";
/**
 * 获取 mod 文件夹
 * @param mod 
 * @param mark 需要包含的文件夹字符串 
 * @param mark2 需要排除的文件夹名
 * @returns 
 */
function getModFolder(mod: IModInfo, mark: string, mark2: string) {
    const manager = useManager()
    let modFolder: string[] = []
    let isFound = false
    for (let index = 0; index < mod.modFiles.length; index++) {
        const item = mod.modFiles[index];
        let modStorage = join(manager.modStorage ?? "", mod.id.toString(), item)
        if (statSync(modStorage).isFile()) {
            // 将 item 拆分为数组
            let itemArr = item.split("/")
            // console.log(itemArr.length);
            for (let index = 0; index < itemArr.length; index++) {
                const item2 = itemArr[index];
                if (item2.toLowerCase().includes(mark)) {
                    // console.log(element);
                    if (item2 == mark2) {
                        // modFolder = itemArr[index + 1]
                        // 0 到 index + 1 并包含 index + 1
                        modFolder = itemArr.slice(0, index + 2)
                    } else {
                        modFolder = [item2]
                    }
                    isFound = true
                    break
                }
            }
        }
        if (isFound) break
    }
    return join(manager.modStorage ?? "", mod.id.toString(), ...modFolder)
}

// 处理 mods
function handleMods(mod: IModInfo, installPath: string, isInstall: boolean, mark: string, mark2: string = "mods") {
    let modFolder = getModFolder(mod, mark, mark2)
    const manager = useManager()
    let gameStorage = join(manager.gameStorage ?? "", installPath, basename(modFolder))

    if (isInstall) return FileHandler.createLink(modFolder, gameStorage)
    else return FileHandler.removeLink(gameStorage)
}

export const supportedGames: ISupportedGames = {
    GlossGameId: 4,
    steamAppID: 292030,
    NexusMods: {
        game_domain_name: "witcher3",
        game_id: 952
    },
    installdir: join("The Witcher 3", "bin", "x64"),
    gameName: "The Witcher 3",
    gameExe: [
        {
            name: "witcher3.exe",
            rootPath: join("..", "..")
        }
    ],
    startExe: [
        {
            name: "steam 启动",
            cmd: "steam://rungameid/292030"
        },
        {
            name: "直接启动",
            exePath: join("bin", "x64", "witcher3.exe")
        }
    ],
    archivePath: join(FileHandler.getMyDocuments(), "The Witcher 3"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/4a.jpg",
    modType: [
        {
            id: 1,
            name: "mods",
            installPath: "mods",
            async install(mod) {
                return handleMods(mod, this.installPath ?? "", true, "mod")
            },
            async uninstall(mod) {
                return handleMods(mod, this.installPath ?? "", false, "mod")
            },
        },
        {
            id: 2,
            name: "dlc",
            installPath: "dlc",
            async install(mod) {
                return handleMods(mod, this.installPath ?? "", true, "dlc", "dlc")
            },
            async uninstall(mod) {
                return handleMods(mod, this.installPath ?? "", false, "dlc", "dlc")
            },
        },
        // {
        //     id: 3,
        //     name: "bin",
        //     installPath: "bin",
        //     async install(mod) {
        //         return true
        //     },
        //     async uninstall(mod) {
        //         return true
        //     },
        // },
        {
            id: 99,
            name: "未知",
            installPath: "",
            async install(mod) {
                ElMessage.warning("未知类型, 请手动安装")
                return false
            },
            async uninstall(mod) {
                return true
            }
        }
    ],
    checkModType(mod) {

        let mods = false
        let dlc = false
        // let bin = false

        mod.modFiles.forEach(item => {
            if (item.toLowerCase().includes("mod")) mods = true
            if (item.toLowerCase().includes("dlc")) dlc = true
            // if (item.toLowerCase().includes("bin")) bin = true
        })

        if (mods) return 1
        if (dlc) return 2
        // if (bin) return 3

        return 99
    }
}