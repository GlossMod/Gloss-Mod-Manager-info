/**
 * @description 坎巴拉太空计划 支持
 */

import { join, basename, extname } from 'path'
import { ElMessage } from "element-plus";


/**
 * 安装/卸载 .craft 类型的Mod
 * @param mod 
 * @param install 
 */
function craft(mod: IModInfo, install: boolean) {
    const manager = useManager()

    const gameStorage = manager.gameStorage
    const modStorage = manager.modStorage
    const saves = FileHandler.getAllFolderInFolder(join(gameStorage, 'saves'))

    mod.modFiles.forEach(item => {
        if (extname(item) == '.craft') {
            for (let i in saves) {
                const save = saves[i]
                if (install) {
                    FileHandler.copyFile(join(modStorage, mod.id.toString(), item), join(save, 'Ships', 'VAB', basename(item)))
                } else {
                    FileHandler.deleteFile(join(save, 'Ships', 'VAB', basename(item)))
                }
            }
        }
    })
    return true
}

export const supportedGames: ISupportedGames = {
    GlossGameId: 62,
    steamAppID: 220200,
    curseforge: 4401,
    installdir: join("Kerbal Space Program"),
    gameName: "Kerbal Space Program",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/220200"
        },
        {
            name: "直接启动",
            exePath: "KSP_x64.exe"
        }
    ],
    gameExe: "KSP_x64.exe",
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/62.jpg",
    modType: [
        {
            id: 1,
            name: "GameData",
            installPath: join('GameData'),
            async install(mod) {
                return Manager.installByFolder(mod, this.installPath || "", 'GameData', true, false, true)
            },
            async uninstall(mod) {
                return Manager.installByFolder(mod, this.installPath || "", 'GameData', false, false, true)
            },
        },
        {
            id: 2,
            name: "craft",
            installPath: join('craft'),
            async install(mod) {
                return craft(mod, true)
            },
            async uninstall(mod) {
                return craft(mod, false)
            },
        },
        {
            id: 99,
            name: '未知',
            installPath: '\\',
            async install(mod) {
                ElMessage.warning("该mod类型未知, 无法自动安装, 请手动安装!")
                return false
            },
            async uninstall(mod) {
                return true
            }
        }
    ],
    checkModType(mod) {

        let GameData = false
        let craft = false

        mod.modFiles.forEach(item => {
            if (item.toLowerCase().includes('gamedata')) GameData = true
            if (extname(item) == '.craft') craft = true
        })

        if (GameData) return 1
        if (craft) return 2

        return 99
    }
}