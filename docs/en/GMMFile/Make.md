# Creating *.GMM Files

## What is this?
`*.gmm` files are packages created by Gloss Mod Manager in a one-click installation format.

Main advantages:
- Mod authors can more conveniently share their works along with the necessary dependencies and some optional files.
- It also solves the problem of works being re-uploaded by third-party websites without updates for years, where people still ask with outdated versions why they get errors.
- Allows players to install mods along with prerequisite dependencies and some optional files at the same time.
- The manager can automatically remove duplicates, preventing newbies from installing duplicate or incompatible versions of prerequisite mods.
- It can automatically check for updates to prevent newbies from causing game errors due to using low versions of prerequisite mods or mods.

## Getting Started

> Prerequisites:
> GMM supports your game ([List of Supported Games](https://github.com/GlossMod/Gloss-Mod-Manager-info/blob/main/README_zh_CN.md#%E6%94%AF%E6%8C%81%E7%9A%84%E6%B8%B8%E6%88%8F))

1. Add the mod to GMM and then select to package it.
   ![](https://mod.3dmgame.com/static/upload/mod/202311/MOD655db65ba3e44.png@webp)
2. Fill in the relevant mod description and click next.
   ![](https://mod.3dmgame.com/static/upload/mod/202311/MOD655db6d459be7.png@webp)
3. Select your mod work and related prerequisites, then click to package (if you want the prerequisites to automatically update, then the prerequisites should also be imported through one-click installation).
   ![](https://mod.3dmgame.com/static/upload/mod/202311/MOD655db71d49281.png@webp)
4. Choose the save location, and you can also modify the filename as needed, then click save.
   ![](https://mod.3dmgame.com/static/upload/mod/202311/MOD655db7add2d5b.png@webp)
5. Wait a moment, and the packaging will be completed. (The time depends on your computer's performance and the size of the mod.)
   ![](https://mod.3dmgame.com/static/upload/mod/202311/MOD655db82588589.png@webp)

6. Finally, you can choose to share this `*.gmm` file to any platform you want to publish.

## Data Included in the Package

When packaging, GMM will include all related data for your mod, including:
- Mod name, ID, version, author, type, website, etc.
- Custom tags you added for the mod
- Custom names you added for the mod
- Some advanced settings

These parameters will help you better share your work.

## The Essence of.gmm Files

If you like to tinker, you'll find that GMM files are actually just a compressed package.

The main data is stored in the `info.json` file.

I have not encrypted this file, welcome to research, and look forward to seeing what you can come up with.

## About Updates

When a mod contains `webId` or `from` has a value, an `Update` button will be displayed.

Updates will be determined based on the `from` parameter to decide where to update the data, currently, it's roughly divided into the following situations:

- 3DM Mod:
  - Get updates based on `webId`, `webId` must have a value
- ModIo:
  - Get updates based on `modIo_id`, `modIo_id` must have a value

## About URLs

You can specify a URL for each mod, when the user clicks "Operations"->"URL", it will open the website you entered here.

It is generally recommended to fill in the original author's publishing place, such as the 3DM Mod site, Thunderstore, ModIo, NexusMods' URLs.

If it's downloaded from the manager, it will generally be automatically filled in, if you are manually imported from other places, you can edit according to your situation, of course, you can also choose not to fill in.

This button's main purpose is to prevent forgetting how to use the mod or needing feedback when encountering problems after installing many mods, so you can contact the original author immediately for feedback.

## About Tags

In the current version, you can create custom tags according to your habits, and you can directly rename and change the color of custom tags, these tags are included in the packaging.

When you package or when the player imports, you can see the tags, so adding appropriate tags can let more players know what the mod is for.

Tags can be used for filtering and can be sorted by tags, and the sorting method is based on your tags.

If you want to share your own tags as well, you can choose `Open Folder`, then share the `tags.json` file inside.
[](https://mod.3dmgame.com/static/upload/mod/202404/MOD6618a127144ff.png@webp)