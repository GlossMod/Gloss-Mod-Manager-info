/** 
 * @description 艾尔登法环 支持
*/



import axios from "axios";
import { ElMessage } from "element-plus";
import { statSync } from "fs";
import { basename, join } from "path";
let dictionaryList: string[] = []

async function handleMod(mod: IModInfo, installPath: string, isInstall: boolean) {
    try {
        if (isInstall) {
            if (!Manager.checkInstalled("ModEngine2", 197418)) return false
        }

        if (dictionaryList.length == 0) {
            let EldenRingDictionary = FileHandler.readFile(join(FileHandler.getResourcesPath(), 'res', 'EldenRingDictionary.txt'))
            dictionaryList = EldenRingDictionary.split("\r\n")
        }

        const manager = useManager()
        let res: IState[] = []
        mod.modFiles.forEach(async file => {
            try {
                let modStorage = join(manager.modStorage ?? "", mod.id.toString(), file)
                // 判断是否是文件
                if (!statSync(modStorage).isFile()) return

                let name = basename(file)
                // 判断name 是否在list中
                if (dictionaryList.some(item => item.includes(name))) {
                    // 获取对应的目录
                    let path = dictionaryList.find(item => item.includes(name))
                    let gameStorage = join(manager.gameStorage ?? "", installPath, path ?? "")
                    if (isInstall) {
                        let state = await FileHandler.copyFile(modStorage, gameStorage)
                        res.push({ file: file, state: state })
                    } else {
                        let state = FileHandler.deleteFile(gameStorage)
                        res.push({ file: file, state: state })
                    }
                }
            } catch (error) {
                res.push({ file: file, state: false })
            }
        })
        return res
    } catch (error) {
        ElMessage.error(`错误:${error}`)
        return false
    }
}

export const supportedGames: ISupportedGames = {
    GlossGameId: 275,
    steamAppID: 1245620,
    NexusMods: {
        game_domain_name: "eldenring",
        game_id: 4333
    },
    installdir: join('Elden Ring', 'Game'),
    gameName: "ELDEN RING",
    gameExe: 'eldenring.exe',
    archivePath: join(FileHandler.GetAppData(), "Roaming", "EldenRing"),
    startExe: [
        {
            name: '启动 激活Mod',
            exePath: 'launchmod_eldenring.bat'
        },
        {
            name: 'Steam启动',
            cmd: 'steam://rungameid/1245620'
        }
    ],
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/620b6924d8c0d.png",
    modType: [
        {
            id: 1,
            name: '通用类型',
            installPath: join("mods"),
            async install(mod) {
                return handleMod(mod, this.installPath ?? '', true)
            },
            async uninstall(mod) {
                return handleMod(mod, this.installPath ?? '', false)
            }
        },
        {
            id: 2,
            name: 'Engine 2',
            installPath: join(""),
            async install(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", "modengine2_launcher.exe", true)
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", "modengine2_launcher.exe", false)

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
        // if (mod.webId == 197418) {
        //     return 2
        // }

        if (dictionaryList.length == 0) {
            let EldenRingDictionary = FileHandler.readFile(join(FileHandler.getResourcesPath(), 'res', 'EldenRingDictionary.txt'))
            dictionaryList = EldenRingDictionary.split("\r\n")
        }

        // console.log(dictionaryList);

        let engine = false
        let mods = false

        mod.modFiles.forEach(item => {
            if (basename(item) == 'modengine2_launcher.exe') engine = true
            if (dictionaryList.find(item2 => FileHandler.compareFileName(item, item2))) mods = true
        })

        if (engine) return 2

        if (mods) return 1

        return 99
    }
}
