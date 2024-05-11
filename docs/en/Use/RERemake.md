---
titleTemplate: Gloss Mod Manager
---

# Resident Evil Series Mod Installation Guide

The installation methods for Resident Evil 2, 3, 4, 7, and 8 are largely similar, and this article will directly explain the installation method for this series of mods and some things to note.

## Preliminary Work

1. Download and install [Gloss Mod Manager](https://mod.3dmgame.com/mod/197445)
2. Download the prerequisite package [Resident Evil Mod Prerequisite Package](https://cloud.aoe.top/s/KrRfO)

## Select Game

After installing Gloss Mod Manager, start the program, then find Resident Evil, and select the game's executable program:
![Game Selection](https://mod.3dmgame.com/static/upload/mod/202401/MOD65a0d30a79dd8.png@webp)

## Install Prerequisites

The mod prerequisites for Resident Evil are two:
- REFramework: REF Framework, is FirstNatives' prerequisite
- FirstNatives: Initially developed by nfh994 for Resident Evil: Revelations, this plugin allows the game to prioritize loading content from the `natives` folder, adapted by [FluffyQuack](https://github.com/FluffyQuack/FirstNatives/tree/Fluffy) to support the Resident Evil series.

Please note that Resident Evil 2 and 3 are divided into RT (ray tracing) and DX11_NOT-RT (non-ray tracing), and REFramework also has RT and DX11_NOT-RT versions. The prerequisite package marks which version to install during installation, so do not mix them up As of January 2024, Steam defaults to the RT version. You can switch to the DX11_NOT-RT version in the game's properties under the Beta tab.

Additionally, the REFramework provided in the prerequisite package is for the Steam version. If you are using a different version of the game, please find the corresponding version of the REFramework plugin.

## Install Mods

You can download mods from anywhere you like. Here are a few websites for downloading Resident Evil mods:

- 3DM Mods:
  - [BIO2RE](https://mod.3dmgame.com/BIO2RE)
  - [BIO3RE](https://mod.3dmgame.com/BIO3RE)
  - [RE4](https://mod.3dmgame.com/RE4)
  - [Resident Evil Village](https://mod.3dmgame.com/ResidentEvilVillage)
- Nexus Mods:
  - [Resident Evil 2 2019 Mods](https://www.nexusmods.com/residentevil22019/mods/)
  - [Resident Evil 3 2020 Mods](https://www.nexusmods.com/residentevil32020/mods/)
  - [Resident Evil 4 2023 Mods](https://www.nexusmods.com/residentevil42023/mods/)
  - [Resident Evil Village Mods](https://www.nexusmods.com/residentevilvillage/mods/)

Then add the downloaded compressed package to the manager for automatic installation and uninstallation.

## Mods Not Working

If you can't find your mod in the game, check the following:
1. Is there a REFramework frame in the top left corner?
2. Is the FirstNatives plugin enabled?
3. Do your game version and mod version match (RT version vs. DX11_NOT-RT version)?

If your REFramework frame cannot be closed and shows an error, it means your game version and REFramework version do not match. The solution is to:
- If you are using the learning version, find the corresponding version of REFramework yourself.
- If you are using the Steam version, either change the game version or the REFramework version, and they must match.
- If it looks like the following, it means the REFramework framework version and your game version do not match.
4. Ensure you have changed to the corresponding outfit, as some mods require DLC to use.
5. Make sure the mod version matches your game version; mods with RT and DX11_NOT-RT versions are not compatible with each other, and you need to judge whether to change the game version or the mod version.
6. Use [FLUFFY MANAGER 5000](https://fluffyquack.com/tools/modmanager.zip) to install mods. (This manager is in English and has no Chinese translation.)

If none of the above methods work, then the mod is the problem, try another mod.