/**
 * @description 暗黑地牢2 支持
 */

import { join } from "node:path"


export const supportedGames: ISupportedGames = {
    GlossGameId: 353,
    steamAppID: 1940340,
    installdir: join("Darkest Dungeon® II"),
    gameName: "Darkest Dungeon 2",
    gameExe: "Darkest Dungeon II.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/1940340"
        },
        {
            name: "直接启动",
            exePath: join("Darkest Dungeon II.exe")
        }
    ],
    archivePath: join(FileHandler.getMyDocuments(), "Darkest"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/664ef0d003b8a.webp",
    modType: [
        ...UnityGame.modType,
        {
            id: 4,
            name: "StreamingAssets",
            installPath: join("Darkest Dungeon II_Data", "StreamingAssets"),
            async install(mod) {
                return Manager.installByFolder(mod, this.installPath ?? "", "StreamingAssets", true, false, true)
            },
            async uninstall(mod) {
                return Manager.installByFolder(mod, this.installPath ?? "", "StreamingAssets", false, false, true)
            }
        }
    ],
    checkModType(mod) {
        let id = UnityGame.checkModType(mod)

        if (id == 99) {
            mod.modFiles.forEach(item => {
                if (FileHandler.getFolderFromPath(item, "StreamingAssets")) {
                    id = 4
                }
            })
        }

        return id
    }
}