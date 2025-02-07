import path from 'path'
import { defineStore } from "pinia";


export const usePacks = defineStore('Packs', {
    state: () => ({
        Info: {
            version: '1.0.0'
        } as IInfo,
        packs: [] as IModInfo[],
        step: 1,
        length: 3,
        dialog: false,
        exportPath: "",
        logText: "",
        inpurtFile: '',
        inpurtDialog: false,
        inputPacks: [] as IModInfo[],
    }),
    actions: {
        // 清空数据
        clear() {
            console.log('clear');

            this.Info = {
                version: '1.0.0'
            }
            this.step = 1
            this.packs = []
            this.exportPath = ''
            this.logText = ''
            this.inputPacks = []
            this.inpurtFile = ''
        },
        // 打包
        async packToGmm() {
            /**
             * 	1. 创建一个 cache 目录
                2. 将相关数据写入 info.json 文件
                3. 将选择的Mod文件复制到 cache/md5/ 目录中
                4. 将 cache  文件压缩为压缩包, 并重命名
                5. 将 cache  目录删除
             */

            //#region 创建一个 cache 目录
            this.logText += "\n正在初始化."
            let cache = path.join(path.dirname(this.exportPath), 'cache')
            FileHandler.createDirectory(cache)
            //#endregion

            //#region 将相关数据写入 info.json 文件
            this.logText += "\n正在写入info.json."
            let info = {
                ...this.Info,
                packs: this.packs
            }
            FileHandler.ensureDirectoryExistence(path.join(cache, 'info.json'), JSON.stringify(info))
            //#endregion

            //#region 将选择的Mod文件复制到 cache/md5/ 目录中
            this.logText += "\n正在整理文件."
            const manager = useManager()
            for (let index = 0; index < this.packs.length; index++) {
                const item = this.packs[index];
                this.logText += `\n正在处理: ${item.modName} .`
                let modPath = path.join(cache, item.md5)
                FileHandler.createDirectory(modPath)
                let modStorage = path.join(manager.modStorage, item.id.toString())
                await FileHandler.copyFolder(modStorage, modPath)
            }
            //#endregion

            //#region 将 cache  文件压缩为压缩包, 并重命名
            this.logText += "\n正在打包中."

            FileHandler.deleteFile(this.exportPath) // 删除旧文件
            await Unzipper.zip(cache, this.exportPath)    // 打包

            //#endregion

            //#region 将 cache  目录删除
            this.logText += "\n正在清理缓存."
            FileHandler.deleteFolder(cache)

            //#endregion

            this.logText += "\n打包完成."

            this.step = 4
        },
        // 安装
        async installGmm() {
            this.logText += "\n正在安装."
            const manager = useManager()

            for (let index = 0; index < this.packs.length; index++) {
                const item = this.packs[index];

                if (manager.isAdded(item.md5)) {
                    this.logText += `\n${item.modName} 已安装 跳过.`
                    continue
                }

                //#region 开始安装
                manager.maxID++
                item.id = manager.maxID
                item.isInstalled = false
                await Unzipper.unzip2(this.inpurtFile, path.join(manager.modStorage, item.id.toString()), [`${item.md5}\\*`])
                console.log(item);

                FileHandler.moveFolder(path.join(manager.modStorage, item.id.toString(), item.md5), path.join(manager.modStorage, item.id.toString()))

                manager.managerModList.push(item)
                this.logText += `\n${item.modName} 安装完成.`
                //#endregion
            }

            this.step = 4
            this.logText += "\n安装完成."
            console.log(this.step);

        }

    }
})