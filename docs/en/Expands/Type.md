---

titleTemplate: Gloss Mod Manager

---

# Mod Type

Each game's Mod installation method is different, and different types have different installation methods. To make it easier for everyone to better adapt to more types, I designed it from the beginning to be divided into various types.

## Interface

```ts
interface IType {
    id: number
    name: string
    installPath?: string
    advanced?: {
        name: string
        icon: string
        item: IAdvancedItem[]
    }
    install: (mod: IModInfo) => Promise<IState[] | boolean>
    uninstall: (mod: IModInfo) => Promise<IState[] | boolean>
}
```

- id:
  - Unique identifier for the type
- name:
  - The name displayed in the management interface
- installPath:
  - Installation path
- install:
  - Method executed during installation
- uninstall:
  - Method executed during uninstallation
- advanced:
  - Advanced options, if the type requires user custom configuration, this configuration item can be used,
  - I have written related types in [GTA5.ts](https://github.com/GlossMod/gmm-expands/blob/bef6a6d9f10390592725fb7832bae5975a35fdf1/GTA5.ts#L777) for reference

## Game Directory and Mod Directory

You can get these two configuration items in the following way:
https://github.com/GlossMod/gmm-api/blob/master/test/src/Manager.ts#L294

```ts
export class Config {
    // Mod storage directory
    public static modStorage = (() => {
        let config = this.getConfig()
        return join(config.modStorageLocation, config.managerGame?.gameName?? "")
    })()

    // Game storage directory
    public static gameStorage = (() => {
        let config = this.getConfig()
        return config.managerGame?.gamePath?? ""
    })()

    public static configFolder() {
        let ConfigFolder = join(homedir(), 'My Documents', 'Gloss Mod Manager')
        if (!FileHandler.fileExists(join(homedir(), 'My Documents'))) {
            ConfigFolder = join("C:", 'Gloss Mod Manager')
        }
        return ConfigFolder
    }

    // Configuration file path
    public static configFile() {
        const configPath = join(this.configFolder(), 'config.json')
        FileHandler.ensureDirectoryExistence(configPath, '{}')
        return configPath
    }

    // Read configuration file
    public static getConfig(): ISettings {
        let config = readFileSync(this.configFile(), 'utf-8')
        let settings: ISettings = JSON.parse(config)
        return settings
    }
}

```

Usage:
```ts
// Get the directory of the Mod
let modStorage = join(Config.modStorage, mod.id.toString())

// Game directory
let gameStorage = Config.gameStorage
```