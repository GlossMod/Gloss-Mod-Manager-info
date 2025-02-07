/**
 * @description 消逝的光芒2 支持
 */

import { join, extname, basename } from 'path'
import { statSync } from 'fs'
import { ElMessage } from "element-plus";

let pakList = {
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

function getGameFileName(isDat: boolean) {
    const manager = useManager()
    let dataFolder = join(manager.gameStorage, "ph", "source")

    let datFiles = FileHandler.getFolderFiles(dataFolder).filter(item => extname(item) == '.pak')

    // 获取 "data3.pak" 中的 data3.pak 为 3
    let datNum = datFiles.map(item => {
        const match = item.match(/data(\d+)/i);
        return match ? parseInt(match[1]) : 0;
    })
    // 获取最大的数字
    let maxNum = Math.max(...datNum)

    if (isDat) maxNum += 1

    let datName = `data${maxNum}`
    // console.log(datName);
    return datName
}

async function handlePak(mod: IModInfo, isInstall: boolean) {
    const manager = useManager()
    let pakListData = pakList.data

    mod.modFiles.forEach(item => {
        let modStorage = join(manager.modStorage ?? "", mod.id.toString(), item)

        if (statSync(modStorage).isFile() && extname(modStorage) == '.pak') {

            let gameStorage = join(manager.gameStorage ?? "")

            if (isInstall) {
                let pakName = getGameFileName(extname(modStorage) == '.pak')
                let gamePak = join(gameStorage, 'ph', 'source', pakName + extname(modStorage))

                FileHandler.copyFile(modStorage, gamePak)
                pakListData.push([mod.id.toString(), basename(modStorage), pakName + extname(modStorage)])
            } else {
                let modPakInGamePak = pakListData.filter(item => item[0] == mod.id.toString())
                let pakName = modPakInGamePak.find(item => extname(item[1]) == extname(modStorage))
                if (pakName) {
                    // console.log(pakName[2]);
                    pakListData = pakListData.filter(item => item != pakName)
                    let gamePak = join(gameStorage, 'ph', 'source', pakName[2])
                    FileHandler.deleteFile(gamePak)
                }

            }
        }
    })

    if (!isInstall) {
        /** 
         * 卸载逻辑 文件命名规则为 
           data0.pak
           data1.pak
           data2.pak
           data3.pak
           data4.pak
           data5.pak
           data6.pak
           如果卸载的是 data2.pak, 那么后面的 data3.pak 以后的文件都要往前移动
           先获取所有pak文件，然后判断缺少了哪个 pak 再将后面的pak 往前移动序号
           pakListData 里面是当前剩余的 pak 列表
        */

        // 按照文件名进行排序
        pakListData.sort((a, b) => {
            const fileNumA = parseInt(a[2].replace('data', '').replace('.pak', ''))
            const fileNumB = parseInt(b[2].replace('data', '').replace('.pak', ''))
            return fileNumA - fileNumB
        })

        let expectedFileNum = 2
        for (let index in pakListData) {
            let item = pakListData[index]
            const currentFileNum = parseInt(item[2].replace('data', '').replace('.pak', ''))

            // 如果当前的文件号和预期的文件号不匹配
            // 那么我们就找到了所需跳动的文件号
            if (currentFileNum !== expectedFileNum) {
                const manager = useManager()
                const fileName = `data${String(expectedFileNum)}.pak`
                await FileHandler.renameFile(join(manager.gameStorage, 'ph', 'source', item[2]), join(manager.gameStorage, 'ph', 'source', fileName))
                item[2] = fileName
            }

            // 预期的文件号进行加 1 操作
            expectedFileNum++
        }

    }

    pakList.data = pakListData
    // console.log(pakListData);

    return true
}




export const supportedGames: ISupportedGames = {
    GlossGameId: 272,
    steamAppID: 534380,
    installdir: join("Dying Light 2", "ph", "work", "bin", "x64"),
    gameName: "Dying Light 2",
    gameExe: [
        {
            name: "DyingLightGame_x64_rwdi.exe",
            rootPath: join('..', '..', '..', "..")
        }
    ],
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/534380"
        },
        {
            name: "直接启动",
            exePath: join("ph", "work", "bin", "x64", "DyingLightGame_x64_rwdi.exe")
        }
    ],
    archivePath: join(FileHandler.getMyDocuments(), "dying light 2", "out"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/61dbf5a660a03.png",
    modType: [
        {
            id: 1,
            name: 'dat',
            installPath: join('ph', 'source'),
            async install(mod) {
                return handlePak(mod, true)
            },
            async uninstall(mod) {
                return handlePak(mod, false)
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
    ],
    checkModType(mod) {

        let data = false

        mod.modFiles.forEach(item => {
            if (extname(item) == '.pak') data = true
        })

        if (data) return 1

        return 99
    }
}