/**
 * @description 荒野大镖客 支持
 */

import { basename, join, extname, } from "node:path"
import { ElMessage } from "element-plus";

// import xml2js from "xml2js"
const xml2js = require('xml2js')

let mods_xml = {
    get data() {
        let manager = useManager()
        let gameStorage = join(manager.gameStorage ?? "")
        let data = FileHandler.readFile(join(gameStorage, 'lml', 'mods.xml'), `<ModsManager> 
        <Mods />
        <LoadOrder />
        </ModsManager>`)
        return xml2js.parseStringPromise(data)
    },
    set data(value) {
        let manager = useManager()
        let gameStorage = join(manager.gameStorage ?? "")
        let file = join(gameStorage, 'lml', 'mods.xml')
        let data = new xml2js.Builder().buildObject(value)
        if (data) FileHandler.writeFile(file, data)
    }
}

function asi(mod: IModInfo, isInstall: boolean) {
    let manager = useManager()
    let modStorage = join(manager.modStorage, mod.id.toString())
    mod.modFiles.forEach(item => {
        if (basename(item) == 'install.xml') {
            install_xml(join(modStorage, item), isInstall)
        }
    })
    return Manager.installByFileSibling(mod, "", '.asi', isInstall, true)
}

async function install_xml(file: string, isInstall: boolean) {
    let data = FileHandler.readFile(file)
    let xml = await xml2js.parseStringPromise(data)
    let name = xml.EasyInstall.Name[0]
    let folder = basename(join(file, '..'))

    let mods_xml_data = await mods_xml.data;
    let { ModsManager } = mods_xml_data
    // console.log(ModsManager);

    let Mods = ModsManager.Mods
    let mod = Mods[0].Mod?.find((item: any) => item.$?.folder == folder)
    if (mod) {
        // 如果存在 将 Enabled 设为 true
        mod.Enabled[0] = isInstall
    } else {
        if (!Mods[0].Mod) Mods[0] = { Mod: [] }
        Mods[0].Mod.push({
            $: {
                folder: folder,
            },
            Name: [name],
            Enabled: [isInstall],
            Overwrite: ['false'],
            DisabledGroups: ['']
        })
    }

    let LoadOrder: any[] = ModsManager.LoadOrder

    // let list = LoadOrder[0].Mod
    // 判断 folder 是否在 LoadOrder[0].Mod 中
    if (!LoadOrder[0].Mod?.includes(folder)) {
        if (!LoadOrder[0].Mod) LoadOrder[0] = { Mod: [] }
        LoadOrder[0].Mod.push(folder)
    }

    mods_xml.data = mods_xml_data
}

function lmi(mod: IModInfo, installPath: string, isInstall: boolean) {
    let manager = useManager()
    let modStorage = join(manager.modStorage, mod.id.toString())
    // 获取 install.xml 路径
    let xml = mod.modFiles.filter(item => basename(item) == 'install.xml')
    if (xml) {
        xml.forEach(item => {
            install_xml(join(modStorage, item), isInstall)
            Manager.installByFileSibling(mod, join(installPath, basename(join(item, '..'))), "install.xml", isInstall)
        })
        // return Manager.installByFileSibling(mod, installPath, "install.xml", isInstall)
        return true
    } else {
        ElMessage.warning("未找到 install.xml")
        return false
    }
}

export const supportedGames: ISupportedGames = {
    GlossGameId: 208,
    steamAppID: 1174180,
    NexusMods: {
        game_domain_name: 'reddeadredemption2',
        game_id: 3024
    },
    installdir: join("Red Dead Redemption 2"),
    gameName: "Red Dead Redemption 2",
    gameExe: "RDR2.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1174180"
        },
        {
            name: "直接启动",
            exePath: join("RDR2.exe")
        }
    ],
    archivePath: join(FileHandler.getMyDocuments(), "Rockstar Games", "Red Dead Redemption 2"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/208.png",
    modType: [
        {
            id: 1,
            name: "asi",
            installPath: join(""),
            async install(mod) {
                return asi(mod, true)
            },
            async uninstall(mod) {
                return asi(mod, false)
            }
        },
        {
            id: 2,
            name: "lml",
            installPath: join("lml"),
            async install(mod) {
                return lmi(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return lmi(mod, this.installPath ?? "", false)
            }
        },
        {
            id: 3,
            name: "游戏根目录",
            installPath: "",
            async install(mod) {
                return Manager.generalInstall(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return Manager.generalUninstall(mod, this.installPath ?? "", true)
            }
        },
        {
            id: 4,
            name: "ScriptHookRDR2",
            installPath: "",
            async install(mod) {
                // ScriptHookRDR2.dll
                return Manager.installByFileSibling(mod, this.installPath ?? "", 'ScriptHookRDR2.dll', true)
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", 'ScriptHookRDR2.dll', false)
            }
        },
        {
            id: 5,
            name: 'script',
            installPath: join('scripts'),
            async install(mod) {
                return Manager.generalInstall(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return Manager.generalUninstall(mod, this.installPath ?? "", true)
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
        let asi = false
        let rootFolder = false
        let folderList = ['x64']
        let lml = false
        let ScriptHookRDR2 = false
        let scripts = false

        mod.modFiles.forEach(item => {
            // 判断目录是否包含 folderList
            let list = FileHandler.pathToArray(item)
            if (list.some(item => folderList.includes(item))) rootFolder = true

            if (extname(item) == '.asi') asi = true
            if (extname(item) == '.dll') scripts = true
            if (basename(item) == 'install.xml') lml = true
            if (basename(item) == 'ScriptHookRDR2.dll') ScriptHookRDR2 = true
        })

        if (ScriptHookRDR2) return 4

        if (asi) return 1
        if (lml) return 2
        if (rootFolder) return 3
        if (scripts) return 5

        return 99
    }
}