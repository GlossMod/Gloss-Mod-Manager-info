/**
 * @description 星露谷物语 支持
 */



import { join, basename, dirname, parse } from 'path'
import { ElMessage } from "element-plus";
import { spawn } from 'child_process';
function handleSMAPI(mod: IModInfo, isInstall: boolean) {
    let manager = useManager()
    let modStorage = join(manager.modStorage, mod.id.toString())

    mod.modFiles.forEach(item => {
        // 获取 SMAPI.Installer.exe 的路径
        if (basename(item) == "SMAPI.Installer.exe") {
            modStorage = join(modStorage, dirname(item));
        }
    })

    let SMAPIInstaller = join(modStorage, "SMAPI.Installer.exe")

    let arg = [
        '--no-prompt',
        isInstall ? '--install' : '--uninstall',
        '--game-path',
    ]
    let { root, dir: folder, base: name } = parse(SMAPIInstaller)

    let cmd = `start cmd /S /C SMAPI.Installer.exe ${arg.join(' ')} "${manager.gameStorage}"`

    // console.log(cmd);

    spawn(cmd, {
        cwd: folder,
        shell: true,
    })

    return true
}

export const supportedGames: ISupportedGames = {
    GlossGameId: 10,
    steamAppID: 413150,
    curseforge: 669,
    NexusMods: {
        game_domain_name: 'stardewvalley',
        game_id: 1303
    },
    installdir: "Stardew Valley",
    gameName: "Stardew Valley",
    gameExe: 'Stardew Valley.exe',
    startExe: [
        {
            name: '启用 Mod 并启动游戏',
            exePath: 'StardewModdingAPI.exe'
        },
        {
            name: '禁用 Mod 并启动游戏',
            exePath: 'Stardew Valley.exe'
        },
        {
            name: 'Steam 启动 (无Mod)',
            cmd: 'steam://rungameid/413150'
        }
    ],
    archivePath: join(FileHandler.GetAppData(), "Roaming", "StardewValley"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/10.jpg",
    modType: [
        {
            id: 1,
            name: "SMAPI",
            installPath: "",
            async install(mod) {
                return handleSMAPI(mod, true)
            },
            async uninstall(mod) {
                return handleSMAPI(mod, false)
            }
        },
        {
            id: 2,
            name: "通用",
            installPath: "Mods",
            async install(mod) {
                // if (!Manager.checkInstalled("SMAPI", 207496)) return false
                return Manager.installByFile(mod, this.installPath ?? "", 'manifest.json', true, false)

            },
            async uninstall(mod) {
                return Manager.installByFile(mod, this.installPath ?? "", 'manifest.json', false, false)

            }
        },
        {
            id: 99,
            name: "未知",
            installPath: "",
            async install(mod) {
                ElMessage.warning("未知类型, 请手动安装")
                return false
            },
            async uninstall(mod) {
                return true
            }
        }
    ],
    checkModType(mod) {

        let plugins = false
        let smapi = false

        mod.modFiles.forEach(item => {
            if (FileHandler.compareFileName(basename(item), "SMAPI.Installer.dll")) smapi = true
            if (basename(item) == "manifest.json") plugins = true

        })

        if (smapi) return 1

        if (plugins) return 2

        return 99
    }
}