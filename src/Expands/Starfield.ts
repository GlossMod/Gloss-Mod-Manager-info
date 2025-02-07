// 星空 Mod支持

import { extname, basename, join, dirname } from 'path'
import { ElMessage } from "element-plus";
import { statSync, readFileSync, writeFileSync } from "fs";
import ini from 'ini'
import { homedir } from 'os'
//#region  data 类型的mod

// 设置 Starfield.ini
async function setArchive() {
    try {
        const manager = useManager()
        // let documents = await FileHandler.getMyDocuments()
        const Starfield = join(manager.gameStorage, "Starfield.ini")
        let config = ini.parse(readFileSync(Starfield, 'utf-8'))
        // console.log(config);
        if (config.Archive?.bInvalidateOlderFiles == 1) {
            console.log('StarfieldPrefs.ini 已配置过, 无需再次配置.');
            return
        }
        if (config.Archive) {
            config.Archive.bInvalidateOlderFiles = 1
            config.Archive.sResourceDataDirsFinal = ""
            writeFileSync(Starfield, ini.stringify(config))
        }
    } catch (error) {
        ElMessage.error(`配置 StarfieldPrefs.ini 失败! ${error}`)
    }
}

// 修改 plugins
async function setPlugins(mod: IModInfo, install: boolean) {
    // AppData\Local\Fallout4\plugins.txt
    let documents = join(homedir(), "AppData", "Local", "Starfield", "plugins.txt")
    let plugins = await FileHandler.readFileSync(documents)
    let arr = plugins.split('\n')

    if (arr[0] != "# This file is used by Starfield to keep track of your downloaded content. (You HAVE to keep a # on the first line here)") {
        arr.unshift("# This file is used by Starfield to keep track of your downloaded content. (You HAVE to keep a # on the first line here)")
    }

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

//#endregion

//#region  Plugins 类型的mod

// 安装到 Plugins
async function handlePlugins(mod: IModInfo, installPath: string, isInstall: boolean) {

    if (isInstall) Manager.checkInstalled("SFSE", 201756)

    return Manager.installByFolder(mod, installPath, "plugins", isInstall, false, true)
}

//#endregion

//#region  esp 类型的mod

function setGeneral(name: string, isInstall: boolean) {
    const manager = useManager()
    // let documents = await FileHandler.getMyDocuments()
    const Starfield = join(manager.gameStorage, "Starfield.ini")
    let config = ini.parse(readFileSync(Starfield, 'utf-8'))
    // 获取 config.General 下面的所有 key
    let keys = Object.keys(config.General)
    // console.log(keys);

    if (isInstall) {
        // 判断 key 中是否有包含 sTestFile 的
        let hasKey = keys.some(item => item.includes('sTestFile'))
        if (hasKey) {
            /**
             * sTestFile1
             * sTestFile2
             * sTestFile3
             */
            let lastKey = keys[keys.length - 1]
            let lastNum = parseInt(lastKey[lastKey.length - 1])
            config.General[`sTestFile${lastNum + 1}`] = name
        } else {
            config.General.sTestFile1 = name
        }
    } else {
        // 如果是卸载 将所有 sTestFileX=name 删除
        keys.forEach(item => {
            if (config.General[item] == name) {
                delete config.General[item]
            }
        })
    }

    writeFileSync(Starfield, ini.stringify(config))

}

function handleEsps(mod: IModInfo, installPath: string, isInstall: boolean) {
    const manager = useManager()
    mod.modFiles.forEach(item => {
        let file = join(manager.modStorage, mod.id.toString(), item)
        if (statSync(file).isFile()) {
            let name = basename(file)
            if (extname(file) == '.esp') setGeneral(name, isInstall)

            let target = join(manager.gameStorage ?? "", installPath, item)
            if (isInstall) {
                FileHandler.copyFile(file, target)
            } else {
                FileHandler.deleteFile(target)
            }
        }
    })

    return true
}

//#endregion

// 获取 sfse_loader.exe 所在目录
function getBaseFolder(mod: IModInfo) {
    let folder = ""
    mod.modFiles.forEach(item => {
        if (basename(item) == 'sfse_loader.exe') {
            folder = dirname(item)
        }
    })
    return folder
}

function handleSfse(mod: IModInfo, install: boolean) {
    const manager = useManager()
    const modStorage = join(manager.modStorage ?? "", mod.id.toString())

    let baseFolder = getBaseFolder(mod)
    if (baseFolder == "") {
        ElMessage.error(`未找到 sfse_loader.exe, 请不要随意修改MOD类型`)
        return false
    }

    mod.modFiles.forEach(item => {
        let source = join(modStorage, item)
        if (statSync(source).isFile()) {
            // 从 item 中移除 folder

            let path = item
            if (baseFolder != '.') {
                path = item.replace(baseFolder, "")
            }
            // console.log(path);
            let target = join(manager.gameStorage ?? "", path)
            if (install) FileHandler.copyFile(source, target)
            else FileHandler.deleteFile(target)
        }
    })

    return true
}

export const supportedGames: ISupportedGames = {
    GlossGameId: 321,
    steamAppID: 1716740,
    NexusMods: {
        game_domain_name: "starfield",
        game_id: 4187
    },
    installdir: join("Starfield"),
    gameName: "Starfield",
    gameExe: "Starfield.exe",
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/1716740'
        },
        {
            name: 'SFSE 启动',
            exePath: 'sfse_loader.exe'
        },
        {
            name: '直接启动',
            exePath: 'Starfield.exe'
        },
    ],
    archivePath: join(FileHandler.getMyDocuments(), "My Games", "Starfield"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/64db454e9f5c4.webp",
    modType: [
        {
            id: 1,
            name: 'data',
            installPath: join("Data"),
            async install(mod) {
                setArchive();
                // symlinkData();
                setPlugins(mod, true)
                return Manager.installByFolder(mod, this.installPath ?? "", "data", true, false, true)
            },
            async uninstall(mod) {
                setPlugins(mod, false)
                return Manager.installByFolder(mod, this.installPath ?? "", "data", false, false, true)
            },
        },
        {
            id: 2,
            name: '游戏根目录',
            installPath: join(""),
            async install(mod) {
                return Manager.generalInstall(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return Manager.generalUninstall(mod, this.installPath ?? "", true)
            },
        },
        {
            id: 3,
            name: 'sfse',
            installPath: join(""),
            async install(mod) {
                return handleSfse(mod, true)
            },
            async uninstall(mod) {
                return handleSfse(mod, false)
            },
        },
        {
            id: 4,
            name: 'Plugins',
            installPath: join("Data", "SFSE", "plugins"),
            async install(mod) {
                return handlePlugins(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return handlePlugins(mod, this.installPath ?? "", false)
            }
        },
        {
            id: 5,
            name: 'esp',
            installPath: join("Data"),
            async install(mod) {
                return handleEsps(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return handleEsps(mod, this.installPath ?? "", false)
            }
        },
        {
            id: 99,
            name: '未知',
            installPath: '',
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

        let data = false
        let plugins = false
        let esp = false
        let sfse = false

        mod.modFiles.forEach(item => {
            if (item.toLowerCase().includes('data')) data = true
            if (item.toLowerCase().includes('plugins')) plugins = true
            // if (extname(item) == '.dll') plugins = true
            if (extname(item) == '.esp' || extname(item) == '.esm') data = true
            if (basename(item) == 'sfse_loader.exe') sfse = true
        })

        if (sfse) return 3

        if (data) return 1
        if (plugins) return 4
        if (esp) return 5

        return 99
    }
}