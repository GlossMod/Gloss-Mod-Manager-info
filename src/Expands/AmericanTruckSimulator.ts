/**
 * @description 美国卡车模拟器2 Mod支持
 */


import { join, basename, extname } from 'path'
import { ElMessage } from "element-plus";
async function handleMod(mod: IModInfo, installPath: string, isInstall: boolean) {
    let manager = useManager()
    mod.modFiles.forEach(item => {
        if (extname(item) == '.scs') {
            if (isInstall) {
                let source = join(manager.modStorage, mod.id.toString(), item)
                FileHandler.copyFile(source, join(installPath, basename(item)))
            } else {
                FileHandler.deleteFile(join(installPath, basename(item)))
            }
        }
    })
    return true
}

export const supportedGames: ISupportedGames = {
    GlossGameId: 52,
    steamAppID: 1222670,
    curseforge: 4819,
    installdir: join("American Truck Simulator", "bin", "win_x64"),
    gameName: "American Truck Simulator",
    gameExe: [
        {
            name: 'amtrucks.exe',
            rootPath: join('..', '..')
        }
    ],
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/1222670'
        },
        {
            name: '直接启动',
            exePath: join('bin","win_x64', 'amtrucks.exe')
        }
    ],
    archivePath: join(FileHandler.getMyDocuments(), "American Truck Simulator"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/52.jpg",
    modType: [
        {
            id: 1,
            name: "scs",
            installPath: join(FileHandler.getMyDocuments(), "American Truck Simulator", "mod"),
            async install(mod: IModInfo) {
                return handleMod(mod, this.installPath ?? "", true)
            },
            async uninstall(mod: IModInfo) {
                return handleMod(mod, this.installPath ?? "", false)
            }
        },
        {
            id: 2,
            name: "manifest",
            installPath: join(FileHandler.getMyDocuments(), "American Truck Simulator", "mod"),
            async install(mod: IModInfo) {
                return Manager.installByFile(mod, this.installPath ?? "", 'manifest.sii', true, false)
            },
            async uninstall(mod: IModInfo) {
                return Manager.installByFile(mod, this.installPath ?? "", 'manifest.sii', false, false)
            }
        },
        {
            id: 3,
            name: 'versions',
            installPath: join('Mod'),
            async install(mod: IModInfo) {
                ElMessage.warning("此mod 为创意工坊Mod, 请去创意工坊订阅后使用!")
                return false
            },
            async uninstall(mod: IModInfo) {
                return false
            }
        },
        {
            id: 4,
            name: '主目录',
            installPath: '\\',
            async install(mod) {
                return Manager.generalInstall(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return Manager.generalUninstall(mod, this.installPath ?? "", true)
            }
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
        let scs = false
        let manifest = false
        let versions = false
        mod.modFiles.forEach(item => {
            if (extname(item) == '.scs') scs = true
            if (basename(item) == 'manifest.sii') manifest = true
            if (basename(item) == 'versions.sii') versions = true
        })

        if (scs) return 1
        if (manifest) return 2
        if (versions) return 3

        return 99
    }
}