/**
 * @description 全面战争 战锤3 支持
 */

import { basename, join, extname } from "node:path"
import { ElMessage } from "element-plus";
function handlePack(mod: IModInfo, installPath: string, install: boolean) {
    const manager = useManager()
    const modStorage = join(manager.modStorage ?? "", mod.id.toString())
    mod.modFiles.forEach(item => {
        if (extname(item) === ".pack") {
            let source = join(modStorage, item)
            let target = join(manager.gameStorage, installPath ?? "", basename(item))
            if (install) FileHandler.copyFile(source, target)
            else FileHandler.deleteFile(target)
        }
    })
    return true
}

export const supportedGames: ISupportedGames = {
    GlossGameId: 273,
    steamAppID: 1142710,
    NexusMods: {
        game_domain_name: "totalwarwarhammer3",
        game_id: 4717
    },
    installdir: join("Total War WARHAMMER III"),
    gameName: "Total War WARHAMMER III",
    gameExe: "Warhammer3.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1142710"
        },
        {
            name: "直接启动",
            exePath: join("Warhammer3.exe")
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "Roaming", "The Creative Assembly", "Warhammer3"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/61dbfe86987ba.png",
    modType: [
        {
            id: 1,
            name: "pack",
            installPath: "data",
            async install(mod) {

                return handlePack(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {

                return handlePack(mod, this.installPath ?? "", false)
            }
        },
        {
            id: 2,
            name: "UI",
            installPath: join('data', 'UI'),
            async install(mod) {

                return Manager.installByFolder(mod, this.installPath ?? "", "ui", true, false, true)
            },
            async uninstall(mod) {

                return Manager.installByFolder(mod, this.installPath ?? "", "ui", false, false, true)
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
        let pack = false
        let ui = false

        mod.modFiles.forEach(item => {
            if (extname(item) === ".pack") pack = true
            if (item.toLowerCase().includes('ui')) ui = true
        })

        if (pack) return 1
        if (ui) return 2

        return 99
    }
}