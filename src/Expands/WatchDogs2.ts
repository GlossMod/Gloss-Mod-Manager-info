/**
 * @description 看门狗2 支持
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
    let dataFolder = join(manager.gameStorage, "data_win64")

    let datFiles = FileHandler.getFolderFiles(dataFolder).filter(item => extname(item) == '.dat')

    // 获取 "patch3.dat" 中的 patch3.dat 为 3
    let datNum = datFiles.map(item => {
        const match = item.match(/patch(\d+)/i);
        return match ? parseInt(match[1]) : 0;
    })
    // 获取最大的数字
    let maxNum = Math.max(...datNum)

    if (isDat) maxNum += 1

    let datName = `patch${maxNum}`
    // console.log(datName);
    return datName
}

async function handlePak(mod: IModInfo, isInstall: boolean) {
    const manager = useManager()
    let pakListData = pakList.data

    mod.modFiles.forEach(item => {
        let modStorage = join(manager.modStorage ?? "", mod.id.toString(), item)

        if (statSync(modStorage).isFile() && (extname(modStorage) == '.dat' || extname(modStorage) == '.fat')) {

            let gameStorage = join(manager.gameStorage ?? "")

            if (isInstall) {
                let pakName = getGameFileName(extname(modStorage) == '.dat')
                let gamePak = join(gameStorage, 'data_win64', pakName + extname(modStorage))

                FileHandler.copyFile(modStorage, gamePak)
                pakListData.push([mod.id.toString(), basename(modStorage), pakName + extname(modStorage)])
            } else {
                let modPakInGamePak = pakListData.filter(item => item[0] == mod.id.toString())
                let pakName = modPakInGamePak.find(item => extname(item[1]) == extname(modStorage))
                if (pakName) {
                    // console.log(pakName[2]);
                    pakListData = pakListData.filter(item => item != pakName)
                    let gamePak = join(gameStorage, 'data_win64', pakName[2])
                    FileHandler.deleteFile(gamePak)
                }

            }
        }
    })

    pakList.data = pakListData
    // console.log(pakListData);

    return true
}




export const supportedGames: ISupportedGames = {
    GlossGameId: 304,
    steamAppID: 447040,
    installdir: join("Watch_Dogs2"),
    gameName: "Watch Dogs 2",
    gameExe: "EAC.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/447040"
        },
        {
            name: "直接启动",
            exePath: "EAC.exe"
        }
    ],
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/176.jpg",
    modType: [
        {
            id: 1,
            name: 'dat',
            installPath: join('data_win64'),
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
            if (extname(item) == '.dat') data = true
        })

        if (data) return 1

        return 99
    }
}