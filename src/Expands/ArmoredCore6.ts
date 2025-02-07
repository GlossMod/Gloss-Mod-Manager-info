/** 
 * @description 装甲核心6 支持
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
            let EldenRingDictionary = (await axios.get("res/ArmoredCore6Dictionary.txt")).data
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
    GlossGameId: 323,
    steamAppID: 1888160,
    NexusMods: {
        game_domain_name: "armoredcore6firesofrubicon",
        game_id: 5679
    },
    installdir: join('ARMORED CORE VI FIRES OF RUBICON', 'Game'),
    gameName: "Armored Core 6",
    gameExe: 'armoredcore6.exe',
    startExe: [
        {
            name: '启动 激活Mod',
            exePath: 'launchmod_armoredcore6.bat'
        },
        {
            name: 'Steam启动',
            cmd: 'steam://rungameid/1888160'
        }
    ],
    archivePath: join(FileHandler.GetAppData(), 'Roaming', 'ArmoredCore6'),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/64e5a555a4360.webp",
    modType: [
        {
            id: 1,
            name: '通用类型',
            installPath: '\\mods',
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
            installPath: "\\",
            async install(mod) {
                return Manager.generalInstall(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return Manager.generalUninstall(mod, this.installPath ?? "", true)

            },
        }
    ],
    checkModType(mod) {
        if (mod.webId == 197418) {
            return 2
        }
        return 1
    }
}
