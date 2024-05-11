---

title: Installing and Uninstalling Mods with GMM

---

# Installation and Uninstallation

## Installing and Uninstalling Mods

Before you start installing mods, I need to say a few things:
- First, GMM will automatically recognize the type of mod added to the manager, and you should not arbitrarily modify these types!
- Then, some games' one-click install and uninstall may have bugs (like "The Elder Scrolls 3"), if you find it not working, just click manually to uninstall and install.
- Next, when mod files conflict, you have a manual handling method, for example, the mods for "Elden Ring", if you installed two mods that modify horses, but only one mod can take effect, you can reinstall the mod you want to take effect, this way it will overwrite the other mod.
  - In the future, I may implement automatic handling for such conflicts, but for now, you can only handle it manually.
  - Just remember that the last installed mod will take effect.
- Finally, you should learn to read the mod introduction where the author says how to use the mod, and then ask why it's not working, is there a possibility that the mod has already taken effect, but you just haven't seen it.

You only need to click the switch under `Status` to install and uninstall mods.
> Changing the status from `Not Installed` to `Installed` is called `installation`.
> Changing the status from `Installed` to `Not Installed` is called `uninstallation`.

![Image](https://mod.3dmgame.com/static/upload/mod/202308/MOD64d5e252a3cab.png@webp)

Some games will pop up a box asking you to download prerequisites when installing, in this case, you can usually click `OK`.

![Image](https://mod.3dmgame.com/static/upload/mod/202308/MOD64d5e18b7f33d.png@webp)
![Image](https://mod.3dmgame.com/static/upload/mod/202308/MOD64d5e1eae2512.png@webp)

## Starting the Game

GMM can directly start the game for your convenience, so you don't need to switch to another place to click start.
Normal games do not necessarily need to be started through the manager to enable mods, the purpose of starting the game here is just for your convenience.
But the following games are exceptions:
- Elden Ring (only supports mods installed from Steam)
- Animal Crossing

## Manual Mod Installation

In some cases, the manager may not be able to automatically install the mod for you, and you need to handle it manually. Generally, it falls into the following situations:
- Mod type is `Unknown`
  - In this case, there is a rescue method, find the `Operation` dropdown box at the right end of the mod list, then select `Open`, this will help you open the directory where the mod is located.
   ![Image](https://mod.3dmgame.com/static/upload/mod/202308/MOD64d5ecfbc820f.png@webp)
  - Look and see if there is a compressed package like the one below,
   ![Image](https://mod.3dmgame.com/static/upload/mod/202308/MOD64d5ec1ac9418.png@webp)
  - At this point, you can drag and drop the compressed package into the manager, and the manager should recognize the mod type normally.
   ![Image](https://mod.3dmgame.com/static/upload/mod/202308/MOD64d5ecb7b70ce.png@webp)

- Installation types not supported by the manager
  - There is no rescue method in this case, you must install it manually, open the mod directory as described above, then find the original author's release address, and then install according to the author's instructions.