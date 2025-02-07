/**
 * @description 哈迪斯2 支持
 */

import { basename, join, extname, dirname } from "node:path"
import { ElMessage } from "element-plus"

import { spawn } from 'child_process'
function ModImporter() {
    const manage = useManager()

    let Modimporter = join(manage.gameStorage, "Content", "modimporter.exe")
    // 判断 ModImporter 是否存在此文件
    if (!FileHandler.fileExists(ModImporter)) {
        ElMessage.warning("未找到 modimporter.exe, 您的Mod可能不会生效, 请先安装 ModImporter")
        return true
    }

    let cmd = `start cmd /S /C modimporter.exe --no-input`
    spawn(cmd, {
        cwd: dirname(ModImporter),
        shell: true,
    })

}

export const supportedGames: ISupportedGames = {
    GlossGameId: 349,
    steamAppID: 1145350,
    installdir: join("Hades II", "Ship"),
    gameName: "Hades2",
    Thunderstore: {
        community_identifier: 'hades-ii'
    },
    gameExe: [
        {
            name: "Hades2.exe",
            rootPath: join('..')
        }
    ],
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1145350"
        },
        {
            name: "直接启动",
            exePath: join("Ship", "Hades2.exe")
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "..", "Saved Games", "Hades II"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/663add9906fe2.webp",
    modType: [
        {
            id: 1,
            name: "Mods",
            installPath: join("Content", "Mods"),
            async install(mod) {
                Manager.installByFile(mod, this.installPath ?? "", 'modfile.txt', true, false, true, false)
                ModImporter()
                return true

            },
            async uninstall(mod) {
                Manager.installByFile(mod, this.installPath ?? "", 'modfile.txt', false, false, true, false)
                ModImporter()
                return true
            }
        },
        {
            id: 2,
            name: "ModImporter",
            installPath: join("Content"),
            async install(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", 'modimporter.exe', true)
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", 'modimporter.exe', false)
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
        let mods = false
        let Modimporter = false
        mod.modFiles.forEach(item => {
            if (basename(item) == 'modfile.txt') mods = true
            if (basename(item) == 'modimporter.exe') ModImporter = true
        })

        if (Modimporter) return 2
        if (mods) return 1

        return 99
    }
}