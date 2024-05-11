---

titleTemplate: Gloss Mod Manager

---

# What to do if the game doesn't start (or shows an error)?

Let's answer this question by category:

## If the game doesn't start from the manager
- For games like Elden Ring, Spiritfarer, Ghost of Tsushima, and Long Live the Queen, you need the original game to start the game normally.
- For Elden Ring and Stardew Valley, you need to install the corresponding prerequisite plugins to start normally.
  - Elden Ring requires installing [Mod Engine 2](https://mod.3dmgame.com/mod/197418).
  - Stardew Valley requires installing [SMAPI - Stardew Valley Mod API For GMM](https://mod.3dmgame.com/mod/197894).

## If the game shows an error
This situation is usually caused by a mismatch between the game version and the Mod version. The manager automatically downloads prerequisites that are adapted for the original version, and there may be compatibility issues with the learning version, such as:
- For the Resident Evil series, the [REFramework](https://github.com/praydog/REFramework/releases) framework, which is incompatible, can cause the Mod to be invalid or the game to crash.
- For Monster Hunter World, the [Stracker's Loader](https://www.nexusmods.com/monsterhunterworld/mods/1982).
- For Red Dead Redemption 2, the [LML](https://www.rdr2mods.com/downloads/rdr2/tools/76-lennys-mod-loader-rdr/).

The prerequisite plugins for the examples of a few games mentioned above are adapted for the original version.

## If the game crashes

If you didn't have any issues playing the game before installing Mods,
then this is very likely due to the game crashing caused by the Mods,
which could be due to Mod conflicts or the Mods not being compatible with the game version.
The solution is to troubleshoot yourself,
for example, by disabling all Mods and then opening them one by one, starting the game to identify which Mod is causing the problem, and then disabling or deleting it.