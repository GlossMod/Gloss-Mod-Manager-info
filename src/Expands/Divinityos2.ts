/**
 * @description 神界：原罪2 支持
 */

import { join, extname, sep, basename, dirname } from 'path'
import { ElMessage } from "element-plus";

async function handlePakMod(mod: IModInfo, isInstall: boolean) {

    let myDocuments = await FileHandler.getMyDocuments();
    const manager = useManager()
    let installPath = join(myDocuments, "Larian Studios", "Divinity Original Sin 2 Definitive Edition", "Mods")

    mod.modFiles.forEach(item => {
        let name = basename(item)
        if (extname(item) == '.pak') {
            let modStorage = join(manager.modStorage, mod.id.toString(), item)
            // console.log(modStorage);

            if (isInstall) {
                FileHandler.copyFile(modStorage, join(installPath, name))
            } else {
                FileHandler.deleteFile(join(installPath, name))
            }
        }
    })

    return true
}

export const supportedGames: ISupportedGames = {
    GlossGameId: 34,
    steamAppID: 435150,
    NexusMods: {
        game_domain_name: "divinityoriginalsin2",
        game_id: 1661
    },
    installdir: join("Divinity Original Sin 2", "DefEd", "bin"),
    gameName: "Divinity Original Sin 2",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/435150"
        },
        {
            name: "直接启动",
            exePath: join("DefEd", "bin", "EoCApp.exe")
        }
    ],
    gameExe: [
        {
            name: "EoCApp.exe",
            rootPath: join('..', '..')
        }
    ],
    archivePath: join(FileHandler.getMyDocuments(), "Larian Studios", "Divinity Original Sin 2 Definitive Edition"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/34.jpg",
    modType: [
        {
            id: 1,
            name: 'pak',
            installPath: join('mods'),
            async install(mod) {
                return handlePakMod(mod, true)
            },
            async uninstall(mod) {
                return handlePakMod(mod, false)
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

        let pak = false
        mod.modFiles.forEach(item => {
            let ext = extname(item)
            if (ext == '.pak') pak = true
        })

        if (pak) return 1

        return 99
    }
}