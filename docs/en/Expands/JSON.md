# Adding Game Support to Gloss Mod Manager

~~In version 1.29.0, we opened the game support section for open source, allowing all players and developers to create their own game adaptations.~~

In version 1.36.0, I simplified custom extensions, using a `json` format for adaptation. The adaptation method in version 1.29.0 was too difficult due to its high complexity, so this update significantly lowers the barrier to entry, but it lacks the high extensibility of TypeScript. You can choose based on your ability.


## Prerequisites

- [vs code](https://code.visualstudio.com/)

## JSON Parameter Explanation

[More Detailed Properties](Property.md)

```json
{
    "GlossGameId": 0,           // Game ID on the Mod site, number type
    "steamAppID": 0,           // Game's AppId on Steam, number type
    "installdir": "",           // Game installation directory, string type
    "gameName": "",             // Game name, string type, preferably in English
    "gameExe":  "",             // Game's main program, string | IGameExe[] type
    "startExe": "",             // Game startup program, string | IStartExe[] type
    "gameCoverImg": "",         // Game cover, string type
    "modType": [
        {
            "id": 1,            // Unique identifier for the type, number type
            "name": "",         // Display name in the management interface
            "installPath": "",  // Installation path
            "install": {
                // UseFunction reference https://gist.github.com/3DMXM/ed15e18a1442d69bfafcb05534561fc4
                // "generalInstall" | "generalUninstall" | "installByFolder" | "installByFile" | "installByFileSibling" | "installByFolderParent" | "Unknown"
                // Other parameters are the values passed to UseFunction, only fill in what UseFunction needs, all have comments.
                "UseFunction": "",
                "folderName": "",
                "isInstall": true | false,   // Install or uninstall
                "fileName": "",             // File name or extension (.*)
                "include": true | false,    
                "spare": true | false,
                "keepPath": true | false,
                "isExtname": true | false,
                "inGameStorage": true | false,
                "pass": []
            },
            "uninstall": {
                // Same as install
               ...
            }
        }
    ],
    "checkModType": [
        {
            // "extname"    By extension name
            // "basename"   By file name
            // "inPath"     By path
            "UseFunction": "",
            "Keyword": [],      // File name or extension or path contains
            "TypeId": 1,        // If contains, return this ID
        }
    ]
}
```

## Interface Structure

This is the interface when parsed with TS.

```ts
export type InstallUseFunction = "generalInstall" | "generalUninstall" | "installByFolder" | "installByFile" | "installByFileSibling" | "installByFolderParent" | "Unknown"

export interface IGameExe {
    name: string
    rootPath: string
}
export interface IStartExe {
    name: string
    exePath: string
}

export interface IGameInfo {
    GlossGameId: number
    steamAppID: number
    installdir?: string
    gameName: string
    gameExe: string | IGameExe[]
    startExe?: string | IStartExe[]
    gamePath?: string
    gameVersion?: string
    gameCoverImg?: string
    NexusMods?: {
        game_id: number
        game_domain_name: string
    },
    Thunderstore?: {
        community_identifier: string
    },
    mod_io?: {
        game_id: number
    }
}

export interface IState {
    file: string,
    state: boolean
}

interface IAdvancedItem {
    type: "input" | "selects" | "switch"
    label: string
    key: string
    selectItem?: { name: string, value: string }[]
    defaultValue?: string | boolean
}

export interface ITypeInstall {
    UseFunction: InstallUseFunction
    folderName?: string
    isInstall?: boolean
    fileName?: string
    include?: boolean
    spare?: boolean
    keepPath?: boolean
    isExtname?: boolean
    inGameStorage: boolean
    pass?: string[]
}

export interface ICheckModType {
    UseFunction: "extname" | "basename" | "inPath"
    Keyword: string | []
    TypeId: number
}

export interface IType {
    id: number
    name: string
    installPath?: string
    advanced?: {
        name: string
        icon: string
        item: IAdvancedItem[]
    }
    install: ((mod: IModInfo) => Promise<IState[] | boolean>) | ITypeInstall
    uninstall: (mod: IModInfo) => Promise<IState[] | boolean> | ITypeInstall
    checkPlugin?: (plugin: IModInfo) => boolean
}

export interface ISupportedGames extends IGameInfo {
    modType: IType[]
    checkModType: (mod: IModInfo) => number | ICheckModType[]
    sortMod?: (list: IModInfo[]) => boolean
}
```

## Example

Let's explain the `json` adaptation method with an example:

```json
{
    "GlossGameId": 344,
    "steamAppID": 2420110,
    "installdir": "Horizon Forbidden West Complete Edition",
    "gameName": "Horizon Forbidden West",
    "gameExe": "HorizonForbiddenWest.exe",
    "startExe": [
        {
            "name": "Steam 启动",
            "exePath": "steam://rungameid/2420110"
        },
        {
            "name": "直接启动",
            "exePath": "HorizonForbiddenWest.exe"
        }
    ],
    "gameCoverImg": "https://mod.3dmgame.com/static/upload/game/65fd1629ab1c6.webp",
    "modType": [
        {
            "id": 1,
            "name": "stream",
            "installPath": "LocalCacheWinGame\\package\\mods",
            "install": {
                "UseFunction": "installByFileSibling",
                "fileName": ".stream",
                "isInstall": true,
                "isExtname": true,
                "inGameStorage": true,
                "pass": []
            },
            "uninstall": {
                "UseFunction": "installByFileSibling",
                "fileName": ".stream",
                "isInstall": false,
                "isExtname": true,
                "inGameStorage": true,
                "pass": []
            }
        },
        {
            "id": 2,
            "name": "core",
            "installPath": "LocalCacheWinGame\\package\\mods",
            "install": {
                "UseFunction": "installByFileSibling",
                "fileName": ".core",
                "isInstall": true,
                "isExtname": true,
                "inGameStorage": true,
                "pass": []
            },
            "uninstall": {
                "UseFunction": "installByFileSibling",
                "fileName": ".core",
                "isInstall": false,
                "isExtname": true,
                "inGameStorage": true,
                "pass": []
            }
        },
        {
            "id": 99,
            "name": "未知",
            "installPath": "\\",
            "install": {
                "UseFunction": "Unknown"
            },
            "uninstall": {
                "UseFunction": "Unknown"
            }
        }
    ],
    "checkModType": [
        {
            "UseFunction": "extname",
            "Keyword": [
                ".stream"
            ],
            "TypeId": 1
        },
        {
            "UseFunction": "extname",
            "Keyword": [
                ".core"
            ],
            "TypeId": 2
        }
    ]
}
```

## Installation

Place the `json` file in the `My Documents\Gloss Mod Manager\Expands` directory, then refresh in the manager by pressing `Ctrl+R`. You should find your newly added game at the end of the `Select Game` list.