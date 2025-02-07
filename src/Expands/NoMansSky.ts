/**
 * @description 无人深空 支持
 */

import { join, extname } from "node:path"
import { ElMessage } from "element-plus";
async function renameFile() {
    const manager = useManager()
    let gameStorage = join(manager.gameStorage ?? "", "GAMEDATA", "PCBANKS")
    let txt = join(gameStorage, 'DISABLEMODS.TXT')
    if (FileHandler.fileExists(txt)) {
        FileHandler.renameFile(txt, join(gameStorage, 'DISABLEMODS.TXT.bak'))
    }
}

export const supportedGames: ISupportedGames = {
    GlossGameId: 24,
    steamAppID: 275850,
    NexusMods: {
        game_domain_name: "nomanssky",
        game_id: 1634
    },
    installdir: join("No Man's Sky", "Binaries"),
    gameName: "No Man's Sky",
    gameExe: [
        {
            name: "NMS.exe",
            rootPath: join('..')
        }
    ],
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/275850"
        },
        {
            name: "直接启动",
            exePath: join("Binaries", "NMS.exe")
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "Roaming", "HelloGames", "NMS"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/24.jpg",
    modType: [
        {
            id: 1,
            name: "pak/lua",
            installPath: join("GAMEDATA", "PCBANKS", "MODS"),
            async install(mod) {
                renameFile()
                return Manager.generalInstall(mod, this.installPath ?? "", false)
            },
            async uninstall(mod) {
                return Manager.generalUninstall(mod, this.installPath ?? "", false)
            }
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
        let pak = false

        mod.modFiles.forEach(item => {
            if (extname(item) === ".pak" || extname(item) == '.lua') pak = true
        })

        if (pak) return 1

        return 99
    }
}