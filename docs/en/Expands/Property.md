# Property Introduction

## GlossGameId
- Type: `number`
- Game ID on the Mod site
- Used to retrieve `3DM Mod` data on the `Browse` page. If the Mod does not have this game, you can fill in `0`, but filling in `0` will prevent installation through the website's `One-Click Install` feature.

You can find the game ID on the game page of the Mod site by opening the `Developer Menu` with F12. In the `GetGameData` interface, you can find the game ID:

![GetGameData Interface](https://mod.3dmgame.com/static/upload/mod/202401/MOD65af2f06e8716.png@webp)

If the Mod site does not have this game, you can contact the administrator to create this game.

## steamAppID
- Type: `number`
- The AppId of the game on Steam,
- Mainly used to locate the game's directory.

You can find the game's AppId directly in the game store.

## installdir
- Type: `string`
- Game installation directory
- Mainly used to locate the main program directory of the game.

For example, if the main program of Cyberpunk 2077 is located at `F:\steam\steamapps\common\Cyberpunk 2077\bin\x64\Cyberpunk2077.exe`, you can fill in:
```ts
installdir: join("Cyberpunk 2077", 'bin', 'x64')
// or
installdir: "Cyberpunk 2077\\bin\\x64"
```

## gameName
- Type: `string`
- Game name
- This will be the unique identifier for GMM to locate the game. Please use the English name of the game as much as possible and do not include special characters.

If you want to display the game in Chinese in the manager, you can export the language pack, and then create a new line according to the format in `My Documents\Gloss Mod Manager\lang\zh_CN.json`.

## gameExe
- Type: `string | IGameExe[]`
- Main program of the game
- This is used by the user to determine if the correct game has been selected, as well as to locate the game root directory.
- When the game root directory is the same as the game main program, only the main program's name needs to be filled in, such as: `gameExe: "Palworld.exe"`
- When the game has multiple main programs in different directories, or the main program is not in the same directory as the game root, `IGameExe[]` needs to be used.
- `IGameExe[]` has two parameters:
  - name: `string`
    - Game exe name
  - rootPath: `string`
    - Path relative to the main program

Example:
```js
gameExe: [
    {
        name: "Cyberpunk2077.exe",
        rootPath: join("..", "..")  //.. indicates the parent directory
    },
    {
        name: "REDprelauncher.exe",
        rootPath: ""
    }
],
```

## startExe
- Type: `string | IStartExe[]`
- Game startup program
- The content executed when selecting "Start Game". When it is a `string`, it indicates that there is only one way to start. When it is `IStartExe[]`, a dropdown box will appear.
- `IStartExe` has two parameters:
   - name: `string`
     - The name displayed in the dropdown box
   - exePath: `string`
     - Startup instruction

Regarding the startup instruction,
- If it is a Steam start, fill in directly: `steam://rungameid/XXX` (XXX is the Steam APPID)
- If it is started by running the program, fill in `*.exe` with the relative path to the game root directory, such as: `join('bin', 'x64', 'Cyberpunk2077.exe')`

Example:
```js
startExe: [
    {
        name: 'Steam Start',
        exePath: 'steam://rungameid/1091500'
    },
    {
        name: "Direct Start",
        exePath: join('bin', 'x64', 'Cyberpunk2077.exe')
    }
],
```

## gameCoverImg
- Type: `string`
- Game cover image
- Used to display the image when selecting a game.
- Currently, the images used are mostly from the Mod site's cover image. If it's a local image, it might not display, so I generally fill in the URL here. Image ratio: `247 / 139` (Why this ratio? I also think it's weird)
- Recommended image: Size `1200 * 674`, Format `webp`

## modType
- Type: `IType[]`
- Mod type list
- This is the core content of Mod installation. The next section will detail this property.

## checkModType
- Type: `(mod: IModInfo) => number`
- Automatic check of Mod type
- Determines the type of Mod based on its content, returning the ID of `modType`.

## Thunderstore (Optional)
- Type: `community_identifier: string`
- Thunderstore's `community Id`
- Used to retrieve the Mod list from Thunderstore. If filled in, it will display the Thunderstore tag in the `Browse` module.

## mod_io (Optional)
- Type: `game_id: number`
- mod.io's `game id`
- Used to retrieve the Mod list from mod.io. If filled in, it will display the mod.io tag in the `Browse` module.