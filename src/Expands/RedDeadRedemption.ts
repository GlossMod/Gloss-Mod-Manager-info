
import { Manager } from '@/model/Manager'
import { ElMessage } from 'element-plus'
import { join, extname, basename } from 'path'

export const supportedGames: ISupportedGames = {
    GlossGameId: 398,
    steamAppID: 2668510,
    gameName: "Red Dead Redemption",
    installdir: "Red Dead Redemption",
    gameExe: 'RDR.exe',
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/2668510'
        },
        {
            name: '直接启动',
            exePath: 'RDR.exe'
        }
    ],
    // archivePath: join(FileHandler.GetAppData(), "Local", "SparkingZERO", "Saved"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/mod/202410/MOD6721f29b85384.jpg@webp",
    modType: [
        {
            id: 1,
            name: 'ScriptHookRDR',
            installPath: "",
            async install(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", "dinput8.dll", true)
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", "dinput8.dll", false)
            }
        },
        {
            id: 2,
            name: "RedHook",
            installPath: "",
            async install(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", "RedHook.dll", true)
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", "RedHook.dll", false)
            }
        },
        {
            id: 3,
            name: 'asi',
            installPath: "",
            async install(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", ".asi", true, true)
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", ".asi", false, true)
            },
        },
        {
            id: 4,
            name: "red",
            installPath: "",
            async install(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", ".red", true, true)
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", ".red", false, true)
            },
        },
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
        let ScriptHookRDR = false
        let RedHook = false
        let asi = false
        let red = false


        mod.modFiles.forEach(item => {
            if (basename(item) == 'dinput8.dll') ScriptHookRDR = true
            if (basename(item) == 'RedHook.dll') RedHook = true
            if (extname(item) == '.asi') asi = true
            if (extname(item) == '.red') red = true
        })

        if (ScriptHookRDR) return 1
        if (RedHook) return 2
        if (asi) return 3
        if (red) return 4

        return 99
    }
}