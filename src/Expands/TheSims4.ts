/**
 * @description 模拟人生4 支持
 */



import { join, basename, extname } from 'path'
import { homedir } from "os";
function handleMod(mod: IModInfo, isInstall: boolean) {

    let manager = useManager()
    let srcPath = join(manager.modStorage, mod.id.toString())
    let destPath = join(FileHandler.getMyDocuments(), "Electronic Arts", "The Sims 4", "Mods", "Gloss Mod Manager", mod.id.toString())
    if (isInstall) {
        return FileHandler.createLink(srcPath, destPath)

    } else {
        return FileHandler.removeLink(destPath)
    }
}

export const supportedGames: ISupportedGames = {
    GlossGameId: 8,
    steamAppID: 1222670,
    installdir: join("The Sims 4", "Game", "Bin"),
    gameName: "The Sims 4",
    curseforge: 78062,
    gameExe: [
        {
            name: 'TS4_x64.exe',
            rootPath: join('..', '..')
        }
    ],
    startExe: [
        {
            name: 'Steam 启动',
            cmd: 'steam://rungameid/1222670'
        },
        {
            name: '直接启动',
            exePath: join('Game', 'Bin', 'TS4_x64.exe')
        }
    ],
    archivePath: join(FileHandler.getMyDocuments(), "Electronic Arts", "The Sims 4"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/8a.jpg",
    modType: [
        {
            id: 1,
            name: "通用类型",
            installPath: join("The Sims 4", "Mods"),
            install: async (mod: IModInfo) => {
                return handleMod(mod, true)
            },
            uninstall: async (mod: IModInfo) => {
                return handleMod(mod, false)
            }
        }
    ],
    checkModType(mod) {

        return 1
    }
}