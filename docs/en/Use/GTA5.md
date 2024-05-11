---
titleTemplate: Gloss Mod Manager
---

# GTA5 Mod Installation Guide

## Preliminary Work

1. Download and install [Gloss Mod Manager](https://mod.3dmgame.com/mod/197445)
2. Download the prerequisite package [GTA5 Mod Prerequisite Package](https://cloud.aoe.top/s/KrRfO)
3. (Optional) Download built-in modifiers: [Menyoo](https://github.com/MAFINS/MenyooSP/releases) | [Localization Patch](https://mod.3dmgame.com/mod/205488)

## Selecting the Game

After installing Gloss Mod Manager, start the program, then find GTA, select the game's executable program:
![](https://mod.3dmgame.com/static/upload/mod/202401/MOD659f911cf0842.png@webp)
![](https://mod.3dmgame.com/static/upload/mod/202401/MOD659f911cd5b92.png@webp)

## Installing Prerequisites

Double-click to run the downloaded GTA5 Mod Prerequisite Package, then select all, import, and then install in the manager:
![](https://mod.3dmgame.com/static/upload/mod/202401/MOD659f918b83e3f.png@webp)

## Installing Mods

You can download any mods you want from various websites. Here are a few websites for downloading GTA Mods:
- 3DM Mod Station: https://mod.3dmgame.com/GTA
- GTA5 Mods: https://zh.gta5-mods.com

Then add the downloaded compressed package to the manager for automatic installation and uninstallation.

## How to Find My Mod in the Game?

First, install Menyoo (drag into GMM and install directly)
> You can install the localization patch according to your needs.

Then enter the game, press 2, then F8 to open the Menyoo modifier.

### Getting Vehicles

Navigate to "Vehicle Option (Vehicle Options)" -> "Vehicle Spawner (Spawn Vehicles)" -> "Input Model (Input Model) (at the bottom)"

Enter the vehicle code in the input box, then press Enter to spawn the vehicle.
> What is the vehicle code?
> Generally, the author will tell you what the code is, but some people who re-upload it think that the string of code is gibberish and do not re-upload it. If the author does not tell you what the code is, you can check how to get vehicle codes in [this article](https://mod.3dmgame.com/wiki/GTA5Mod_Tutorial/s3o4wvaky8#:~:text=%E5%88%B7%E8%BD%A6%E4%BB%A3%E7%A0%81-,%E5%A6%82%E4%BD%95%E6%9F%A5%E7%9C%8B%E5%88%B7%E8%BD%A6%E4%BB%A3%E7%A0%81,-%E4%B8%80%E8%88%AC%EF%BC%8CMod%E4%BD%9C%E8%80%85).

### Getting Characters

Navigate to "Player Options (Player Options)" -> "Model Changer (Change Model)" -> "Input Model (Input Model) (at the bottom)"

Enter the character code in the input box, then press Enter, and your main character will change to the character you installed.
> What is the character code?
> You can use OpenIV, locate `mods\update\x64\dlcpacks\gmm\dlc.rpf\x64\peds.rpf`, and the names of these files are the character codes:
>![](https://mod.3dmgame.com/static/upload/mod/202401/MOD659fa01b5b779.png@webp)

## About Composite Characters

If the character you installed does not work, it may be because it is a composite character, and you may need to manually modify the advanced configuration.

First, uninstall the mod, then select "Operations" -> "Configuration", enable advanced configuration, and here enable the "Composite" option, fill in the model name with your model name, and choose others according to your preferences.

> - About the model name, you can view the directory of the mod by selecting "Operations" -> "Open", look at the "XXX.ydd" file inside, where XXX is the model name.

![](https://mod.3dmgame.com/static/upload/mod/202401/MOD659fa1fa873e8.png@webp)
![](https://mod.3dmgame.com/static/upload/mod/202401/MOD659fa1ca22e91.png@webp)

## Some Error Handling

- Script Hook V Critical Error
    > This error looks something like this:
   ![](https://mod.3dmgame.com/static/upload/mod/202401/MOD65a0a5d8ab169.jpg@webp)

    > The reason is that someone has packed an outdated Script Hook V into the mod, the identification method is that the name is not "Script Hook V" but the type is recognized by GMM as "ScriptHookV".
    
    > The solution is to reinstall "Script Hook V" in the prerequisites (i.e., change the status to "Not Installed", then change it back to "Installed") to solve this problem.

- Game memory is insufficient, please restart the computer and restart the game
    > The reason is that you have installed too many mods, reaching the limit that the game can accommodate, which has little to do with your computer's memory.
    
    > The solution is to install the upper limit patch: [HeapAdjuster](https://www.gta5-mods.com/tools/heapadjuster) | [Packfile Limit Adjuster](https://www.gta5-mods.com/tools/packfile-limit-adjuster)

- ERR_FIL_PACK_1 game error, please restart the computer and restart the game
  - This problem may occur on the `RPF file editing tool`, click "Operations" -> "Update", then reinstall all "additive", "replacement", "character" type mods.
   ![](https://mod.3dmgame.com/static/upload/mod/202403/MOD65e979a07ac8f.png@webp)
  - It may also be that the "dlclist.xml" file is damaged during the installation of mods, in this case, you may need to use [OpenIV](https://mod.3dmgame.com/mod/31262) to repair it, open `mods/update/update.rpf/common/data/dlclist.xml`, then check if there is damage in this file, scroll to the bottom, you might see missing `</Item>` `</Paths>` `</SMandatoryPacksData>` end tags, it should look like this normally.
   ![](https://mod.3dmgame.com/static/upload/mod/202212/MOD6392b1a226e40.jpg@webp)