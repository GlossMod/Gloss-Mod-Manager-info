// 边缘世界 MOD

import { join, basename } from 'path'
import { ElMessage } from "element-plus";
async function handleMod(mod: IModInfo, installPath: string, isInstall: boolean) {

    let manager = useManager()

    let modBaseFolder: string[] = []
    mod.modFiles.forEach(item => {
        let path = join(manager.modStorage, mod.id.toString(), item)
        if (basename(path).toLowerCase() == "about.xml") {
            // modBaseFolder = join(path, '..', '..')
            modBaseFolder.push(join(path, '..', '..'));
        }
    })
    if (modBaseFolder.length > 0) {
        // console.log(modBaseFolder);
        modBaseFolder.forEach(item => {
            let destPath = join(manager.gameStorage, installPath, basename(item))
            if (isInstall) {
                FileHandler.createLink(item, destPath)
            } else {
                FileHandler.removeLink(destPath)
            }
        })
        return true
    } else {
        ElMessage.error("未找到 about.xml 文件, 无法安装!")
        return false
    }

}

export const supportedGames: ISupportedGames = {
    GlossGameId: 19,
    steamAppID: 294100,
    NexusMods: {
        game_domain_name: 'rimworld',
        game_id: 424
    },
    installdir: join("RimWorld"),
    gameName: "RimWorld",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/294100"
        },
        {
            name: "直接启动",
            exePath: join("RimWorldWin64.exe")
        }
    ],
    gameExe: "RimWorldWin64.exe",
    archivePath: join(FileHandler.GetAppData(), "LocalLow", "Ludeon Studios", "RimWorld by Ludeon Studios"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/19.jpg",
    modType: [
        {
            id: 1,
            name: "通用类型",
            installPath: "Mods",
            async install(mod) {
                return handleMod(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return handleMod(mod, this.installPath ?? "", false)
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

        let modType = 99

        mod.modFiles.forEach(item => {
            let filename = basename(item)
            if (filename.toLowerCase() == "about.xml") modType = 1
        })

        return modType
    }
}