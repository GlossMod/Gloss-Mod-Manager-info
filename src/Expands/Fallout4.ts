/**
 * @description 辐射4 安装支持
 */

import { basename, join, extname } from 'node:path'
import { ElMessage } from "element-plus";
import ini from 'ini'
import { writeFileSync } from "fs";
import { homedir } from 'os'
// 修改 Archive配置
async function setArchive() {
    try {
        let documents = FileHandler.getMyDocuments()
        const Fallout4Ini = join(documents, "My Games", "Fallout4", "Fallout4.ini")
        let config = ini.parse(await FileHandler.readFileSync(Fallout4Ini, ''))
        // console.log(config);
        if (config.Archive?.bInvalidateOlderFiles == 1) {
            console.log('Fallout4.ini 已配置过, 无需再次配置.');
            return
        }
        if (config.Archive) {
            config.Archive.bInvalidateOlderFiles = 1
            config.Archive.sResourceDataDirsFinal = ""
            writeFileSync(Fallout4Ini, ini.stringify(config))
        }
    } catch (error) {
        // ElMessage.error(`配置 Fallout4.ini 失败! ${error}`)
        console.log(`配置 Fallout4.ini 失败! ${error}`);
    }
}
// 修改 plugins
async function setPlugins(mod: IModInfo, install: boolean) {
    // AppData\Local\Fallout4\plugins.txt
    let documents = join(homedir(), "AppData", "Local", "Fallout4", "plugins.txt")
    let plugins = await FileHandler.readFileSync(documents)
    let arr = plugins.split('\n')
    mod.modFiles.forEach(item => {
        if (extname(item) == '.esp' || extname(item) == '.esm') {
            if (install) {
                arr.push(`*${basename(item)}`)
            } else {
                arr = arr.filter(i => i != `*${basename(item)}`)
            }
        }
    })
    // arr 中移除空内容
    arr = arr.filter(i => i != "")

    FileHandler.writeFile(documents, arr.join('\n'))

}

export const supportedGames: ISupportedGames = {
    GlossGameId: 6,
    steamAppID: 377160,
    NexusMods: {
        game_domain_name: "fallout4",
        game_id: 1151
    },
    installdir: join("Fallout 4"),
    gameName: "Fallout 4",
    gameExe: [
        {
            name: "Fallout4.exe",
            rootPath: ""
        },
        {
            name: "Fallout4Launcher.exe",
            rootPath: ""
        }
    ],
    // startExe: join('bin', 'x64', 'witcher3.exe'),
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/377160'
        },
        {
            name: '直接启动',
            exePath: "Fallout4.exe"
        },
        {
            name: 'F4SE 启动',
            exePath: 'f4se_loader.exe'
        }
    ],
    archivePath: join(FileHandler.getMyDocuments(), "My Games", "Fallout4"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/6b.png",
    modType: [
        {
            id: 1,
            name: 'Plugins',
            installPath: join("Data", "F4SE", "plugins"),
            async install(mod) {
                return Manager.installByFolder(mod, this.installPath ?? "", "plugins", true, false, true)

            },
            async uninstall(mod) {
                return Manager.installByFolder(mod, this.installPath ?? "", "plugins", false, false, true)

            },
        },
        {
            id: 2,
            name: "Data",
            installPath: "Data",
            async install(mod) {
                setPlugins(mod, true)
                setArchive()
                return Manager.installByFolder(mod, this.installPath ?? "", "data", true, false, true)
            },
            async uninstall(mod) {
                setPlugins(mod, false)
                return Manager.installByFolder(mod, this.installPath ?? "", "data", false, false, true)
            }
        },
        {
            id: 3,
            name: 'f4se',
            installPath: '',
            async install(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", "f4se_loader.exe", true)
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", "f4se_loader.exe", false)
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
        // let esp = false
        let data = false
        let plugins = false
        let f4se = false

        mod.modFiles.forEach(item => {
            // if (extname(item) == '.esp') esp = true
            if (extname(item) == '.dll') plugins = true
            if (item.toLowerCase().includes('data')) data = true
            if (basename(item) == 'f4se_loader.exe') f4se = true
            if (extname(item) == '.esp' || extname(item) == '.esm') data = true
        })

        if (f4se) return 3
        if (data) return 2

        if (plugins) return 1

        // if (esp) return 1
        // if (esm) return 3

        return 99
    }
}