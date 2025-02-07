/**
 * @description 欧洲卡车模拟器2 Mod支持
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
    GlossGameId: 15,
    steamAppID: 227300,
    installdir: join("Euro Truck Simulator 2", "bin", "win_x64"),
    gameName: "Euro Truck Simulator 2",
    gameExe: [
        {
            name: 'eurotrucks2.exe',
            rootPath: join('..', '..')
        }
    ],
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/227300'
        },
        {
            name: '直接启动',
            exePath: join('bin","win_x64', 'eurotrucks2.exe')
        }
    ],
    archivePath: join(FileHandler.getMyDocuments(), "Euro Truck Simulator 2"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/15.jpg",
    modType: [
        {
            id: 1,
            name: "scs",
            installPath: join(FileHandler.getMyDocuments(), "Euro Truck Simulator 2", "mod"),
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
            installPath: join(FileHandler.getMyDocuments(), "Euro Truck Simulator 2", "mod"),
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