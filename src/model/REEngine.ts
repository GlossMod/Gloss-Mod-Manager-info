/**
 * RE 引擎 通用安装
 */


import { join, extname, basename } from 'path'
import { ElMessage } from "element-plus";
import { statSync } from "fs"

export class REEngine {

    // 获取游戏目录下所有 pak 的名称
    static getGamePakName() {
        const manager = useManager()
        let gameStorage = manager.gameStorage
        // 获取游戏目录下所有 *.pak 文件
        let pakFiles = FileHandler.getFolderFiles(gameStorage).filter(item => extname(item) == '.pak')
        // console.log(pakFiles);
        // 获取 "re_chunk_000.pak.patch_001.pak" 中的 patch_001.pak 为 1
        let pakNum = pakFiles.map(item => {
            let name = basename(item)
            let num = name.split('.pak')
            // 获取 倒数第二个
            let num2 = num[num.length - 2]
            return Number.isNaN(Number(num2.split('_')[1])) ? 0 : Number(num2.split('_')[1])
        })
        // 获取最大的数字
        let maxNum = Math.max(...pakNum)

        // 001 或 010
        let num = String(maxNum + 1).padStart(3, '0')
        let pakName = `re_chunk_000.pak.patch_${num}.pak`

        return pakName
    }

    // 安装 pak
    static async handlePak(mod: IModInfo, isInstall: boolean) {
        const manager = useManager()

        let pakListData = REEngine.pakList.data
        mod.modFiles.forEach(item => {
            let modStorage = join(manager.modStorage ?? "", mod.id.toString(), item)
            if (statSync(modStorage).isFile() && extname(modStorage) == '.pak') {
                let gameStorage = join(manager.gameStorage ?? "")

                if (isInstall) {
                    let pakName = REEngine.getGamePakName()
                    let gamePak = join(gameStorage, pakName)
                    FileHandler.copyFile(modStorage, gamePak)
                    pakListData.push([mod.id.toString(), basename(modStorage), pakName])
                } else {
                    let modPakInGamePak = pakListData.filter(item => item.includes(basename(modStorage)))
                    let pakName = modPakInGamePak[0][2];
                    pakListData = pakListData.filter(item => !item.includes(pakName))
                    let gamePak = join(gameStorage, pakName)
                    console.log(gamePak);

                    FileHandler.deleteFile(gamePak)
                }
            }
        })

        if (!isInstall) {
            // 当卸载了某个 pak 时，只需将最后一个重命名为这个即可
            pakListData.sort((a, b) => {
                const patchNumA = parseInt(a[2].split('_').pop() ?? "0")
                const patchNumB = parseInt(b[2].split('_').pop() ?? "0")
                return patchNumA - patchNumB
            })

            // 获取最后一个 pak 的名称
            const lastPak = pakListData[pakListData.length - 1]
            if (lastPak) {
                console.log(lastPak);

                const lastPakName = lastPak[2]
                // 获取被卸载的 pak 名称
                // const uninstalledPakName = `re_chunk_000.pak.patch_${String(pakListData.length).padStart(3, '0')}.pak`
                const uninstalledPakName = REEngine.pakList.data.find(item => item[0] == mod.id.toString())?.[2] ?? ""
                // console.log("pakListData:", uninstalledPakName);
                // console.log("mod.id:", mod.id);

                // 重命名最后一个 pak
                await FileHandler.renameFile(join(manager.gameStorage, lastPakName), join(manager.gameStorage, uninstalledPakName))
                // 更新 pakListData 中的名称
                lastPak[2] = uninstalledPakName
            }
        }

        REEngine.pakList.data = pakListData

        return true
    }

    static pakList = {
        get data() {
            let manager = useManager()
            let file = join(manager.modStorage, 'pakList.txt')
            // console.log(file);

            let data = FileHandler.readFile(file, '')
            // 将字符串转为数组
            let dataList = data.split('\n')
            // 将里面的空字符串去掉
            let list = dataList.filter(item => item != '')
            // 将数组转换为二维数组, 使用 | 分割
            let pakList = list.map(item => item.split('|'))
            return pakList
        },
        set data(value) {
            // console.log("写入");

            let manager = useManager()
            let file = join(manager.modStorage, 'pakList.txt')
            let data = value.map(item => item.join('|')).join('\n')
            FileHandler.writeFile(file, data)
        }
    }

    static modType: ISupportedGames["modType"] = [
        {
            id: 1,
            name: "autorun",
            installPath: join('reframework', 'autorun'),
            async install(mod) {
                // if (!Manager.checkInstalled("REFramework", 207695)) return false
                return Manager.installByFolder(mod, this.installPath ?? "", 'autorun', true)
            },
            async uninstall(mod) {
                return Manager.installByFolder(mod, this.installPath ?? "", 'autorun', false)
            }
        },
        {
            id: 2,
            name: "REFramework",
            installPath: join(''),
            async install(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", 'dinput8.dll', true)
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", 'dinput8.dll', false)
            }
        },
        {
            id: 3,
            name: "模型替换",
            installPath: join('natives'),
            async install(mod) {
                // if (!Manager.checkInstalled("REFramework", 202993)) return false
                // if (!Manager.checkInstalled("FirstNatives", 202971)) return false

                return Manager.installByFolder(mod, this.installPath ?? "", 'natives', true)
            },
            async uninstall(mod) {
                return Manager.installByFolder(mod, this.installPath ?? "", 'natives', false)
            }
        },
        {
            id: 4,
            name: 'plugins',
            installPath: join('reframework', 'plugins'),
            async install(mod) {
                // if (!Manager.checkInstalled("REFramework", 207695)) return false
                return Manager.installByFolder(mod, this.installPath ?? "", 'plugins', true)
            },
            async uninstall(mod) {
                return Manager.installByFolder(mod, this.installPath ?? "", 'plugins', false)
            }
        },
        {
            id: 5,
            name: '主目录',
            installPath: join(''),
            async install(mod) {
                return Manager.generalInstall(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return Manager.generalUninstall(mod, this.installPath ?? "", true)
            }
        },
        {
            id: 6,
            name: "pak",
            installPath: join(''),
            async install(mod) {
                return REEngine.handlePak(mod, true)
            },
            async uninstall(mod) {
                return REEngine.handlePak(mod, false)
            },
        },
        {
            id: 7,
            name: 'RefPubgins',
            installPath: join('reframework'),
            async install(mod) {
                // if (!Manager.checkInstalled("REFramework", 207695)) return false
                return Manager.installByFolder(mod, this.installPath ?? "", 'reframework', true)
            },
            async uninstall(mod) {
                return Manager.installByFolder(mod, this.installPath ?? "", 'reframework', false)
            }
        },
        {
            id: 99,
            name: "未知",
            installPath: join(''),
            async install(mod) {
                ElMessage.warning("未知类型, 请手动安装")
                return false
            },
            async uninstall(mod) {
                return true
            }
        }
    ]

    static checkModType(mod: IModInfo) {
        let natives = false
        let plugins = false
        let autorun = false
        let REFramework = false
        let pak = false

        let refPubgins = false

        mod.modFiles.forEach(item => {

            let list = FileHandler.pathToArray(item)

            if (list.some(item => FileHandler.compareFileName(item, 'reframework'))) {
                // console.log(list);
            }

            if (basename(item) == 'dinput8.dll') REFramework = true
            if (list.some(item => FileHandler.compareFileName(item, 'natives'))) natives = true
            if (list.some(item => FileHandler.compareFileName(item, 'autorun'))) autorun = true
            if (list.some(item => FileHandler.compareFileName(item, 'plugins'))) plugins = true
            if (list.some(item => FileHandler.compareFileName(item, 'reframework'))) refPubgins = true
            if (extname(item) == '.pak') pak = true
        })

        if (REFramework) return 2

        if (refPubgins) return 7

        if (autorun) return 1
        if (plugins) return 4
        if (natives) return 3
        if (pak) return 6

        return 99
    }

}