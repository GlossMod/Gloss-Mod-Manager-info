/**
 * @description 上古卷轴 重制版 安装支持
 */


import { basename, join, extname, dirname } from 'node:path'
import { ElMessage } from "element-plus";
import ini from 'ini'
import { readFileSync, writeFileSync } from "fs";
import { homedir } from 'os'
// 修改 Archive配置
async function setArchive() {
    try {
        let documents = FileHandler.getMyDocuments()
        const Starfield = join(documents, "My Games", "Skyrim Special Edition", "Skyrim.ini")
        let config = ini.parse(readFileSync(Starfield, 'utf-8'))
        // console.log(config);
        if (config.Archive?.bInvalidateOlderFiles == 1) {
            console.log('Skyrim.ini 已配置过, 无需再次配置.');
            return
        }
        if (config.Archive) {
            config.Archive.bInvalidateOlderFiles = 1
            config.Archive.sResourceDataDirsFinal = ""
            writeFileSync(Starfield, ini.stringify(config))
        }
    } catch (error) {
        ElMessage.error(`配置 Skyrim.ini 失败! ${error}`)
    }
}
// 修改 plugins
async function setPlugins(mod: IModInfo, install: boolean) {
    // AppData\Local\Fallout4\plugins.txt
    let documents = join(homedir(), "AppData", "Local", "Skyrim Special Edition", "plugins.txt")
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
    GlossGameId: 2,
    steamAppID: 489830,
    NexusMods: {
        game_domain_name: "skyrimspecialedition",
        game_id: 1704
    },
    // curseforge: 449,
    installdir: join("Skyrim Special Edition"),
    gameName: "Skyrim Special Edition",
    gameExe: "SkyrimSE.exe",
    // startExe: join('bin', 'x64', 'witcher3.exe'),
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/489830'
        },
        {
            name: '直接启动',
            exePath: "SkyrimSE.exe"
        },
        {
            name: 'skse 启动',
            exePath: 'skse64_loader.exe'
        }
    ],
    archivePath: join(FileHandler.getMyDocuments(), "My Games", "Skyrim Special Edition"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/2.jpg",
    modType: [
        {
            id: 1,
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
            id: 2,
            name: 'skse64',
            installPath: '',
            async install(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", "skse64_loader.exe", true)
                // return handleSkse64(mod, true)
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", "skse64_loader.exe", false)
                // return handleSkse64(mod, false)
            }
        },
        {
            id: 3,
            name: 'Plugins',
            installPath: join('Data', 'SKSE'),
            async install(mod) {
                return Manager.installByFolder(mod, this.installPath ?? "", "plugins", true, true, false)
            },
            async uninstall(mod) {
                return Manager.installByFolder(mod, this.installPath ?? "", "plugins", false, true, false)
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
        let data = false
        let skse = false
        let plugins = false

        mod.modFiles.forEach(item => {
            if (item.toLowerCase().includes('data')) data = true
            if (item.toLowerCase().includes('plugins')) plugins = true
            if (basename(item) == 'skse64_loader.exe') skse = true
            if (extname(item) == '.esp' || extname(item) == '.esm') data = true
        })

        if (skse) return 2
        if (data) return 1
        if (plugins) return 3

        return 99
    }
}