/**
 * 拓展
 */

import { join, extname, basename } from "path";


import { ElMessage } from "element-plus";
export class Expands {

    /**
     * 初始化拓展
     */
    public static init() {
        this.getExpandsList()
    }

    public static expandsFolder() {
        return join(Config.configFolder(), 'Expands')
    }

    public static saveExpands(data: IExpandsSupportedGames) {
        const file = join(this.expandsFolder(), data.gameName + '.json')
        FileHandler.writeFile(file, JSON.stringify(data, null, 4))
    }

    public static getExpandsList() {
        const expandsFolder = this.expandsFolder()
        FileHandler.createDirectory(expandsFolder)
        const files = FileHandler.getAllFilesInFolder(expandsFolder, true)

        const manager = useManager()

        // 移除旧的
        manager.supportedGames = manager.supportedGames.filter(item => item.from != 'Local')

        // json 实现游戏拓展
        files.forEach(item => {
            if (extname(item) == '.json') {
                const data: IExpandsSupportedGames = JSON.parse(FileHandler.readFile(item))
                const Supported = Expands.JsonToSupportedGamesData(data)
                Supported.from = 'Local'
                manager.supportedGames.unshift(Supported)
            }
        })
    }

    // json 数据转可执行方法
    public static JsonToSupportedGamesData(data: IExpandsSupportedGames): ISupportedGames {
        if (typeof (data.modType) == 'object') {
            data.modType.forEach(item => {
                if (typeof (item.install) == 'object') {
                    console.log(typeof (item.install));
                    let install = item.install
                    item.install = async (mod) => {
                        return Expands.typeToFunction(install, mod, item)
                    }
                }
                if (typeof (item.uninstall) == 'object') {
                    let uninstall = item.uninstall
                    item.uninstall = async (mod) => {
                        return Expands.typeToFunction(uninstall, mod, item)
                    }
                }
            })
        } else {
            switch (data.modType) {
                case "UnityGame.modType": data.modType = UnityGame.modType; break;
                case "UnityGameILCPP2.modType": data.modType = UnityGameILCPP2.modType; break;
                case "UnrealEngine.modType": data.modType = UnrealEngine.modType(data.unrealEngineData?.bassPath, data.unrealEngineData?.useUE4SS); break;
            }
        }

        if (typeof (data.checkModType) == 'object') {
            let checkModType = data.checkModType as ICheckModType[]
            data.checkModType = (mod) => {
                for (let i in mod.modFiles) {
                    let file = mod.modFiles[i]
                    for (let index in checkModType) {
                        let item = checkModType[index]
                        switch (item.UseFunction) {
                            case "extname":
                                if (item.Keyword.includes(extname(file))) return item.TypeId
                            case "basename":
                                if (item.Keyword.includes(basename(file))) return item.TypeId
                            case "inPath":
                                let list = FileHandler.pathToArray(file)
                                if (item.Keyword.every(key => list.includes(key))) return item.TypeId
                        }
                    }
                }
                return 99
            }
        } else {
            switch (data.checkModType) {
                case "UnityGame.checkModType": data.checkModType = UnityGame.checkModType; break;
                case "UnityGameILCPP2.checkModType": data.checkModType = UnityGameILCPP2.checkModType; break;
                case "UnrealEngine.checkModType": data.checkModType = UnrealEngine.checkModType; break;
            }
        }

        // console.log(data.modType);
        return data as ISupportedGames
    }

    // 解析 类型
    public static typeToFunction(install: ITypeInstall, mod: IModInfo, item: IType) {
        // let install = item.install as ITypeInstall
        // console.log(install);

        switch (install.UseFunction) {
            case "generalInstall":
                return Manager.generalInstall(mod, item.installPath ?? "", install.keepPath)
            case "generalUninstall":
                return Manager.generalUninstall(mod, item.installPath ?? "", install.keepPath)
            case "installByFile":
                return Manager.installByFile(
                    mod,
                    item.installPath ?? "",
                    install.fileName ?? "",
                    install.isInstall ?? true,
                    install.isExtname,
                    install.inGameStorage)
            case "installByFileSibling":
                return Manager.installByFileSibling(
                    mod,
                    item.installPath ?? "",
                    install.fileName ?? "",
                    install.isInstall ?? true,
                    install.isExtname,
                    install.inGameStorage,
                    install.pass)
            case "installByFolder":
                return Manager.installByFolder(
                    mod,
                    item.installPath ?? "",
                    install.folderName ?? "",
                    install.isInstall ?? true,
                    install.include,
                    install.spare)
            case "installByFolderParent":
                return Manager.installByFolderParent(
                    mod,
                    item.installPath ?? "",
                    install.folderName ?? "",
                    install.isInstall ?? true,
                    install.inGameStorage)
            case "Unknown":
                ElMessage.warning("未知类型, 请手动安装")
        }

        return false
    }
}

