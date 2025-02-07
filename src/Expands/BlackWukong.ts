/**
 * @description 黑神话 悟空 支持
 */


import { join, dirname } from 'path'



export const supportedGames: ISupportedGames = {
    GlossGameId: 376,
    steamAppID: 2358720,
    installdir: join("BlackMythWukong"),
    gameName: "Black Myth Wukong",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/2358720"
        },
        {
            name: "直接启动",
            exePath: "b1.exe"
        }
    ],
    gameExe: "b1.exe",
    archivePath: join(FileHandler.GetAppData(), "Local", "b1", "Saved"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/mod/202408/MOD66b5c72696594.webp@webp",
    modType: [
        ...UnrealEngine.modType("b1", false),
        {
            id: 3,
            name: "mods",
            installPath: join("b1", "Binaries", "Win64", "ue4ss", "Mods"),
            async install(mod) {
                console.log(this.installPath);

                return Manager.installByFolderParent(mod, this.installPath ?? "", "Enabled.txt", true)
            },
            async uninstall(mod) {
                return Manager.installByFolderParent(mod, this.installPath ?? "", "Enabled.txt", false)
            }
        },
        {
            id: 5,
            name: "Scripts",
            installPath: join("“b1", "Binaries", "Win64", "ue4ss", "Mods"),
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
        }
    ],
    checkModType(mod) {
        let b1 = false
        mod.modFiles.forEach(item => {
            // 路径中是否有 Scripts
            let arr = FileHandler.pathToArray(item)
            if (arr.includes("b1")) b1 = true
        })

        if (b1) return 6

        let type = UnrealEngine.checkModType(mod)
        return type
    }
}