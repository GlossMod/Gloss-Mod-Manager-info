/**
 * 虚幻引擎通用安装
 */

import { join, dirname, extname } from "path"

import { ElMessage } from "element-plus"


export class UnrealEngine {
    public static modType(bassPath: string = "", useUE4SS: boolean = true): ISupportedGames["modType"] {
        return [
            {
                id: 1,
                name: 'pak',
                installPath: join(bassPath, 'Content', 'Paks'),
                advanced: {
                    name: '配置',
                    icon: 'mdi-align-horizontal-center',
                    item: [
                        {
                            type: 'input',
                            label: '安装位置',
                            key: 'installPath',
                            defaultValue: useUE4SS ? 'LogicMods' : '~mods'
                        }
                    ]
                },
                async install(mod) {
                    // if (useUE4SS) UnrealEngine.setBPModLoaderMod(bassPath)
                    let installPath = join(
                        this.installPath ?? "",
                        mod.advanced?.enabled ? mod.advanced?.data.installPath : this.advanced?.item[0].defaultValue
                    )
                    return Manager.generalInstall(mod, installPath)
                },
                async uninstall(mod) {
                    let installPath = join(
                        this.installPath ?? "",
                        mod.advanced?.enabled ? mod.advanced?.data.installPath : this.advanced?.item[0].defaultValue
                    )
                    return Manager.generalUninstall(mod, installPath)
                }
            },
            {
                id: 2,
                name: "UE4SS",
                installPath: join(bassPath, "Binaries", "Win64"),
                async install(mod) {
                    for (let index in mod.modFiles) {
                        const item = mod.modFiles[index];
                        if (FileHandler.compareFileName(item, 'dwmapi.dll')) {
                            return Manager.installByFileSibling(mod, this.installPath ?? "", "dwmapi.dll", true)
                        }
                        if (FileHandler.compareFileName(item, 'xinput1_3.dll')) {
                            return Manager.installByFileSibling(mod, this.installPath ?? "", "xinput1_3.dll", true)
                        }
                    }

                    ElMessage.warning("未找到dwmapi.dll或xinput1_3.dll, 类型可能错误, 请重新导入! ")

                    return false
                },
                async uninstall(mod) {
                    for (let index in mod.modFiles) {
                        const item = mod.modFiles[index];
                        if (FileHandler.compareFileName(item, 'dwmapi.dll')) {
                            return Manager.installByFileSibling(mod, this.installPath ?? "", "dwmapi.dll", false)
                        }
                        if (FileHandler.compareFileName(item, 'xinput1_3.dll')) {
                            return Manager.installByFileSibling(mod, this.installPath ?? "", "xinput1_3.dll", false)
                        }
                    }
                    ElMessage.warning("未找到dwmapi.dll或xinput1_3.dll, 类型可能错误, 请重新导入! ")

                    return false
                }
            },
            {
                id: 3,
                name: "mods",
                installPath: join(bassPath, "Binaries", "Win64", "Mods"),
                async install(mod) {
                    console.log(this.installPath);

                    return Manager.installByFolderParent(mod, this.installPath ?? "", "Enabled.txt", true)
                },
                async uninstall(mod) {
                    return Manager.installByFolderParent(mod, this.installPath ?? "", "Enabled.txt", false)
                }
            },
            {
                id: 4,
                name: "LogicMods",
                installPath: join(bassPath, "Content", "Paks", "LogicMods"),
                async install(mod) {
                    // UnrealEngine.setBPModLoaderMod(bassPath)
                    return Manager.generalInstall(mod, this.installPath ?? "")
                },
                async uninstall(mod) {
                    return Manager.generalUninstall(mod, this.installPath ?? "")
                }
            },
            {
                id: 5,
                name: "Scripts",
                installPath: join(bassPath, "Binaries", "Win64", "Mods"),
                async install(mod) {
                    const manage = useManager()

                    // 获取 Scripts 文件夹的父级目录
                    let parent = ""
                    for (let index in mod.modFiles) {
                        const element = mod.modFiles[index];
                        let arr = FileHandler.pathToArray(element)
                        if (arr.includes("Scripts")) {
                            parent = dirname(element)
                            break
                        }
                    }

                    let enableFile = join(manage.modStorage, mod.id.toString(), parent, "Enabled.txt")

                    // console.log(enableFile);
                    FileHandler.ensureDirectoryExistence(enableFile)

                    return Manager.installByFolderParent(mod, this.installPath ?? "", "Scripts", true)
                },
                async uninstall(mod) {
                    return Manager.installByFolderParent(mod, this.installPath ?? "", "Scripts", false)
                }
            },
            {
                id: 6,
                name: "游戏根目录",
                installPath: join(),
                async install(mod) {
                    return Manager.generalInstall(mod, this.installPath ?? "", true)
                },
                async uninstall(mod) {
                    return Manager.generalUninstall(mod, this.installPath ?? "", true)
                }
            },
            {
                id: 99,
                name: '未知',
                installPath: '\\',
                async install(mod) {
                    ElMessage.warning("该mod类型未知, 无法自动安装, 请手动安装!")
                    return false
                },
                async uninstall(mod) {
                    return true
                }
            }
        ]
    }

    public static checkModType(mod: IModInfo) {
        let pak = false
        let us4ss = false
        let mods = false
        let Scripts = false

        mod.modFiles.forEach(item => {
            if (extname(item) == '.pak') pak = true
            if (FileHandler.compareFileName(item, 'Enabled.txt')) mods = true

            if (FileHandler.compareFileName(item, 'ue4ss.dll')) us4ss = true
            if (FileHandler.compareFileName(item, 'dwmapi.dll')) us4ss = true
            if (FileHandler.compareFileName(item, 'xinput1_3.dll')) us4ss = true

            // 路径中是否有 Scripts
            let arr = FileHandler.pathToArray(item)
            if (arr.includes("Scripts")) Scripts = true

        })

        if (us4ss) return 2
        if (pak) return 1
        if (mods) return 3
        if (Scripts) return 5

        return 99
    }

    public static setBPModLoaderMod(bassPath: string) {

        const manager = useManager()

        let filepath = join(manager.gameStorage, bassPath, "Binaries", "Win64", "Mods", "mods.txt")

        // 判断文件是否存在
        if (!FileHandler.fileExists(filepath)) {
            ElMessage.warning("未找到mods.txt, 部分Mod可能不生效, 请确保您已安装 UE4SS !")
            return
        }

        // 读取文件
        let data = FileHandler.readFile(filepath, "")
        // console.log(data);

        // 将 BPModLoaderMod : 1 改为 0
        data = data.replace(/BPModLoaderMod : 0/g, "BPModLoaderMod : 1")
        // console.log(data);

        // 写入回去
        FileHandler.writeFile(filepath, data)
    }

}