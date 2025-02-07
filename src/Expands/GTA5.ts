/**
 * @description GTA5 支持
 */

import { basename, join, extname, } from "node:path"
import { ElMessage } from "element-plus";

import { execSync } from 'child_process';
const xml2js = require('xml2js')

//#region 脚本相关

let mods_xml = {
    get data() {
        let manager = useManager()
        let gameStorage = join(manager.gameStorage ?? "")
        let data = FileHandler.readFile(join(gameStorage, 'lml', 'mods.xml'), `<ModsManager> 
        <Mods />
        <LoadOrder />
        </ModsManager>`)
        return xml2js.parseStringPromise(data)
    },
    set data(value) {
        let manager = useManager()
        let gameStorage = join(manager.gameStorage ?? "")
        let file = join(gameStorage, 'lml', 'mods.xml')
        let data = new xml2js.Builder().buildObject(value)
        if (data) FileHandler.writeFile(file, data)
    }
}

function asi(mod: IModInfo, isInstall: boolean) {
    let manager = useManager()
    let modStorage = join(manager.modStorage, mod.id.toString())
    mod.modFiles.forEach(item => {
        if (basename(item) == 'install.xml') {
            install_xml(join(modStorage, item), isInstall)
        }
    })
    return Manager.installByFileSibling(mod, "", '.asi', isInstall, true)
}

async function install_xml(file: string, isInstall: boolean) {
    let data = FileHandler.readFile(file)
    let xml = await xml2js.parseStringPromise(data)
    let name = xml.EasyInstall.Name[0]
    let folder = basename(join(file, '..'))

    let mods_xml_data = await mods_xml.data;
    let { ModsManager } = mods_xml_data
    // console.log(ModsManager);

    let Mods = ModsManager.Mods
    let mod = Mods[0].Mod?.find((item: any) => item.$?.folder == folder)
    if (mod) {
        // 如果存在 将 Enabled 设为 true
        mod.Enabled[0] = isInstall
    } else {
        if (!Mods[0].Mod) Mods[0] = { Mod: [] }
        Mods[0].Mod.push({
            $: {
                folder: folder,
            },
            Name: [name],
            Enabled: [isInstall],
            Overwrite: ['false'],
            DisabledGroups: ['']
        })
    }

    let LoadOrder: any[] = ModsManager.LoadOrder

    // let list = LoadOrder[0].Mod
    // 判断 folder 是否在 LoadOrder[0].Mod 中
    if (!LoadOrder[0].Mod?.includes(folder)) {
        if (!LoadOrder[0].Mod) LoadOrder[0] = { Mod: [] }
        LoadOrder[0].Mod.push(folder)
    }

    mods_xml.data = mods_xml_data
}


//#endregion

//#region 添加式

/**
 * 获取 dlc 的名称
 * @param dlc 
 * @returns 
 */
async function GetDlcName(dlc: string) {
    const manager = useManager()
    const tools = manager.getModInfoByWebId(205014);
    const read_path = join(manager.modStorage, tools?.id.toString() ?? "", "_read.bat")
    const cmd = `"${read_path}" "${dlc}" "setup2.xml"`
    // console.log(cmd);
    let xmlData = await xml2js.parseStringPromise(execSync(cmd, { encoding: 'utf8' }).toString());
    // console.log(xmlData);
    return xmlData?.SSetupData?.nameHash[0];
}
/**
 * 写入 dlc 名称到 dlclist.xml
 * @param name 
 */
async function writeDlcName(name: string, isInstall: boolean) {
    const manager = useManager()
    const tools = manager.getModInfoByWebId(205014);

    const tools_path = join(manager.modStorage, tools?.id.toString() ?? "")

    const update_path = join(manager.gameStorage, "mods", "update", "update.rpf")
    // 判断文件是否存在
    if (!FileHandler.fileExists(update_path)) {
        // 在 mods 中创建 update.rpf 文件
        await FileHandler.copyFile(join(manager.gameStorage, "update", "update.rpf"), update_path)
    }

    // 获取 dlclist.xml
    const _getDlcList_path = join(tools_path, "_getDlcList.bat");

    const cmd = `"${_getDlcList_path}" "${update_path}"`
    let xmlData = await xml2js.parseStringPromise(execSync(cmd, { encoding: 'utf8' }).toString());

    let dlclist = xmlData?.SMandatoryPacksData?.Paths[0]?.Item as string[]
    if (isInstall) {
        dlclist.push(`dlcpacks:/${name}/`)
    } else {
        // 从 dlclist 中 移除所有 `dlcpacks:/${name}/`
        xmlData.SMandatoryPacksData.Paths[0].Item = dlclist.filter(item => item != `dlcpacks:/${name}/`)
    }

    // console.log(xmlData);

    let file = join(tools_path, 'dlclist.xml')
    let data = new xml2js.Builder().buildObject(xmlData)
    if (data) {
        await FileHandler.writeFile(file, data)
        const _write_path = join(tools_path, '_write.bat')
        const path = join("common", "data", "dlclist.xml");
        const cmd2 = `"${_write_path}" "${update_path}" "${file}" "${path}"`
        execSync(cmd2, { encoding: 'utf8' }).toString()
    }
}

async function dlcHandler(mod: IModInfo, installPath: string, isInstall: boolean) {
    let manager = useManager()
    let modStorage = join(manager.modStorage, mod.id.toString())
    let gameStorage = join(manager.gameStorage ?? "")

    for (let index in mod.modFiles) {
        const item = mod.modFiles[index];
        if (basename(item) == 'dlc.rpf') {
            let name = await GetDlcName(join(modStorage, item))
            await writeDlcName(name, isInstall);
            if (isInstall) {
                FileHandler.copyFile(join(modStorage, item), join(gameStorage, installPath, name, 'dlc.rpf'))
            } else {
                FileHandler.deleteFile(join(gameStorage, installPath, name, 'dlc.rpf'))
            }
        }
    }

    return true
}

//#endregion

//#region 载具 替换式

function buidGmm() {
    const manager = useManager()
    const gameStorage = join(manager.gameStorage ?? "")
    const tools = manager.getModInfoByWebId(205014);
    const tools_path = join(manager.modStorage, tools?.id.toString() ?? "")

    // 如果不存在 则生成
    let dlcpacks_path = join(gameStorage, "mods", "update", "x64", "dlcpacks")
    const cmd = `"${join(tools_path, "_buidGMM.bat")}" "${dlcpacks_path}"`
    // console.log(cmd);

    execSync(cmd, { encoding: 'utf8' }).toString()
}

// 初始化 gmm 的 dlc.rpf
function initGmm_rpf() {
    const manager = useManager()
    const gameStorage = join(manager.gameStorage ?? "")

    // 判断 gmm 的 dlc.rpf 是否存在
    const gmm_rpf = join(gameStorage, "mods", "update", "x64", "dlcpacks", "gmm", "dlc.rpf")
    if (FileHandler.fileExists(gmm_rpf)) {
        //如果存在 则跳过
        // console.log("gmm 的 dlc.rpf 已存在");
        return
    }
    // buidGmm();
    writeDlcName('gmm', true)

}

async function tyfHandler(mod: IModInfo, isInstall: boolean) {
    initGmm_rpf()
    const manager = useManager()
    const tools = manager.getModInfoByWebId(205014);
    const tools_path = join(manager.modStorage, tools?.id.toString() ?? "")

    const target = join(tools_path, "gmm", "x64", "vehicles.rpf")

    for (let index = 0; index < mod.modFiles.length; index++) {
        const item = mod.modFiles[index];
        let types = ['.yft', '.ytd']
        // 判断文件后缀是否是 types
        if (types.includes(extname(item))) {
            // 如果是 则复制到 gmm 的 dlc.rpf
            if (isInstall) {
                await FileHandler.copyFile(join(manager.modStorage, mod.id.toString(), item), join(target, basename(item)))
            } else {
                await FileHandler.deleteFile(join(target, basename(item)))
            }
        }
    }

    // 生成 gmm 的 dlc.rpf
    buidGmm()

    return true
}

//#endregion

//#region 人物

async function pedItem(name: string, mod: IModInfo, isInstall: boolean) {
    let xml = {
        "Name": [
            mod.advanced?.enabled ? mod.advanced.data.name : name
        ],
        "PropsName": [
            mod.advanced?.enabled ? mod.advanced.data.Pedtype : "null"
        ],
        "ClipDictionaryName": [
            mod.advanced?.enabled ? mod.advanced.data.ClipDictionaryName : "move_m@generic"
        ],
        "BlendShapeFileName": [
            "null"
        ],
        "ExpressionSetName": [
            "expr_set_ambient_male"
        ],
        "ExpressionDictionaryName": [
            "null"
        ],
        "ExpressionName": [
            "null"
        ],
        "Pedtype": [
            "CIVMALE"
        ],
        "MovementClipSet": [
            mod.advanced?.enabled ? mod.advanced.data.MovementClipSet : "move_m@generic"
        ],
        "StrafeClipSet": [
            "move_ped_strafing"
        ],
        "MovementToStrafeClipSet": [
            "move_ped_to_strafe"
        ],
        "InjuredStrafeClipSet": [
            "move_strafe_injured"
        ],
        "FullBodyDamageClipSet": [
            "dam_ko"
        ],
        "AdditiveDamageClipSet": [
            "dam_ad"
        ],
        "DefaultGestureClipSet": [
            "ANIM_GROUP_GESTURE_M_GENERIC"
        ],
        "FacialClipsetGroupName": [
            "facial_clipset_group_gen_male"
        ],
        "DefaultVisemeClipSet": [
            "ANIM_GROUP_VISEMES_M_LO"
        ],
        "SidestepClipSet": [
            "CLIP_SET_ID_INVALID"
        ],
        "PoseMatcherName": [
            "Male"
        ],
        "PoseMatcherProneName": [
            "Male_prone"
        ],
        "GetupSetHash": [
            "NMBS_SLOW_GETUPS"
        ],
        "CreatureMetadataName": [
            mod.advanced?.enabled ? mod.advanced.data.CreatureMetadataName : "null"
        ],
        "DecisionMakerName": [
            mod.advanced?.enabled ? mod.advanced.data.DecisionMakerName : "DEFAULT"
        ],
        "MotionTaskDataSetName": [
            "STANDARD_PED"
        ],
        "DefaultTaskDataSetName": [
            "STANDARD_PED"
        ],
        "PedCapsuleName": [
            "STANDARD_MALE"
        ],
        "PedLayoutName": [
            ""
        ],
        "PedComponentSetName": [
            ""
        ],
        "PedComponentClothName": [
            ""
        ],
        "PedIKSettingsName": [
            ""
        ],
        "TaskDataName": [
            ""
        ],
        "IsStreamedGfx": [
            {
                "$": {
                    "value": mod.advanced?.enabled ? mod.advanced.data.Streamed : "false"
                }
            }
        ],
        "AmbulanceShouldRespondTo": [
            {
                "$": {
                    "value": "true"
                }
            }
        ],
        "CanRideBikeWithNoHelmet": [
            {
                "$": {
                    "value": "false"
                }
            }
        ],
        "CanSpawnInCar": [
            {
                "$": {
                    "value": "true"
                }
            }
        ],
        "IsHeadBlendPed": [
            {
                "$": {
                    "value": "false"
                }
            }
        ],
        "bOnlyBulkyItemVariations": [
            {
                "$": {
                    "value": "false"
                }
            }
        ],
        "RelationshipGroup": [
            "CIVMALE"
        ],
        "NavCapabilitiesName": [
            "STANDARD_PED"
        ],
        "PerceptionInfo": [
            "DEFAULT_PERCEPTION"
        ],
        "DefaultBrawlingStyle": [
            "BS_AI"
        ],
        "DefaultUnarmedWeapon": [
            "WEAPON_UNARMED"
        ],
        "Personality": [
            mod.advanced?.enabled ? mod.advanced.data.Personality : "Streamed_Male"
        ],
        "CombatInfo": [
            mod.advanced?.enabled ? mod.advanced.data.CombatInfo : "DEFAULT"
        ],
        "VfxInfoName": [
            "VFXPEDINFO_HUMAN_GENERIC"
        ],
        "AmbientClipsForFlee": [
            "FLEE"
        ],
        "Radio1": [
            "RADIO_GENRE_CLASSIC_ROCK"
        ],
        "Radio2": [
            "RADIO_GENRE_RIGHT_WING_TALK"
        ],
        "FUpOffset": [
            {
                "$": {
                    "value": "0.000000"
                }
            }
        ],
        "RUpOffset": [
            {
                "$": {
                    "value": "0.000000"
                }
            }
        ],
        "FFrontOffset": [
            {
                "$": {
                    "value": "0.000000"
                }
            }
        ],
        "RFrontOffset": [
            {
                "$": {
                    "value": "0.147000"
                }
            }
        ],
        "MinActivationImpulse": [
            {
                "$": {
                    "value": "20.000000"
                }
            }
        ],
        "Stubble": [
            {
                "$": {
                    "value": "0.000000"
                }
            }
        ],
        "HDDist": [
            {
                "$": {
                    "value": "3.000000"
                }
            }
        ],
        "TargetingThreatModifier": [
            {
                "$": {
                    "value": "1.000000"
                }
            }
        ],
        "KilledPerceptionRangeModifer": [
            {
                "$": {
                    "value": " - 1.000000"
                }
            }
        ],
        "Sexiness": [
            ""
        ],
        "Age": [
            {
                "$": {
                    "value": "0"
                }
            }
        ],
        "MaxPassengersInCar": [
            {
                "$": {
                    "value": "0"
                }
            }
        ],
        "ExternallyDrivenDOFs": [
            ""
        ],
        "PedVoiceGroup": [
            "BAR_PERSON_PVG"
        ],
        "AnimalAudioObject": [
            ""
        ],
        "AbilityType": [
            "SAT_NONE"
        ],
        "ThermalBehaviour": [
            "TB_WARM"
        ],
        "SuperlodType": [
            "SLOD_HUMAN"
        ],
        "ScenarioPopStreamingSlot": [
            "SCENARIO_POP_STREAMING_NORMAL"
        ],
        "DefaultSpawningPreference": [
            "DSP_NORMAL"
        ],
        "DefaultRemoveRangeMultiplier": [
            {
                "$": {
                    "value": "1.000000"
                }
            }
        ],
        "AllowCloseSpawning": [
            {
                "$": {
                    "value": "false"
                }
            }
        ]
    }
    const manager = useManager()
    const tools = manager.getModInfoByWebId(205014);
    const tools_path = join(manager.modStorage, tools?.id.toString() ?? "")

    const meta_path = join(tools_path, "gmm", "data", "pedmodelinfo.meta")

    let metaData = FileHandler.readFile(meta_path, `<?xml version="1.0" encoding="UTF-8"?>
<CPedModelInfo__InitDataList>
    <InitDatas />
</CPedModelInfo__InitDataList>`);

    let PedModelInfo = await xml2js.parseStringPromise(metaData)
    if (!PedModelInfo.CPedModelInfo__InitDataList.InitDatas[0].Item) {
        PedModelInfo.CPedModelInfo__InitDataList = {
            InitDatas: [{
                Item: []
            }]
        }
    }

    if (isInstall) {
        PedModelInfo.CPedModelInfo__InitDataList.InitDatas[0].Item.push(xml)
    } else {
        PedModelInfo.CPedModelInfo__InitDataList.InitDatas[0].Item = PedModelInfo.CPedModelInfo__InitDataList.InitDatas[0].Item.filter((item: any) => {
            return item.Name[0] != name
        })
    }

    let data = new xml2js.Builder().buildObject(PedModelInfo)

    if (data) {
        // console.log(PedModelInfo);
        FileHandler.writeFile(meta_path, data)
    }

}

async function yddHandler(mod: IModInfo, isInstall: boolean) {
    initGmm_rpf()
    const manager = useManager()
    const tools = manager.getModInfoByWebId(205014);
    const tools_path = join(manager.modStorage, tools?.id.toString() ?? "")

    let names = []

    const target = join(tools_path, "gmm", "x64", "peds.rpf")
    for (let index in mod.modFiles) {
        const item = mod.modFiles[index];
        let types = ['.ydd', '.yft', '.yld', '.ymt', '.ytd']
        let source = join(manager.modStorage, mod.id.toString(), item)

        if (types.includes(extname(item)) || FileHandler.isDir(source)) {
            if (mod.advanced?.enabled && mod.advanced.data.Streamed) {
                // 如果是组合式
                if (basename(item, extname(item)) == mod.advanced.data.name) {
                    names.push(mod.advanced.data.name)
                    if (isInstall) {
                        if (FileHandler.isDir(source)) {
                            await FileHandler.copyFolder(source, join(target, basename(item)))
                        } else {
                            await FileHandler.copyFile(source, join(target, basename(item)))
                        }
                    } else {
                        if (FileHandler.isDir(join(target, basename(item)))) {
                            await FileHandler.deleteFolder(join(target, basename(item)))
                        } else {
                            await FileHandler.deleteFile(join(target, basename(item)))
                        }
                    }
                }
            } else {
                // 如果不是组合式
                names.push(basename(item, extname(item)))
                if (!FileHandler.isDir(source)) {
                    if (isInstall) {
                        await FileHandler.copyFile(source, join(target, basename(item)))
                    } else {
                        await FileHandler.deleteFile(join(target, basename(item)))
                    }
                }
            }
        }
    }

    // name 去重
    names = [...new Set(names)]
    for (let index = 0; index < names.length; index++) {
        const item = names[index];
        await pedItem(item, mod, isInstall);
    }

    buidGmm()

    return true

}

//#endregion

// 上限补丁
async function gameconfig(mod: IModInfo, isInstall: boolean) {

    const manager = useManager()
    const tools = manager.getModInfoByWebId(205014);
    const tools_path = join(manager.modStorage, tools?.id.toString() ?? "")

    const update_path = join(manager.gameStorage, "mods", "update", "update.rpf")
    // 判断文件是否存在
    if (!FileHandler.fileExists(update_path)) {
        // 在 mods 中创建 update.rpf 文件
        await FileHandler.copyFile(join(manager.gameStorage, "update", "update.rpf"), update_path)
    }

    mod.modFiles.forEach(item => {

        if (basename(item) == 'gameconfig.xml') {
            const filename = join(manager.modStorage, mod.id.toString(), item)
            const inputFile = join("common", "data", "gameconfig.xml")

            const _write_bat = join(tools_path, '_write.bat')

            const cmd = `"${_write_bat}" "${update_path}" "${filename}" "${inputFile}"`

            // console.log(cmd);

            execSync(cmd, { encoding: 'utf8' }).toString()
        }

    })

    return true;
}

export const supportedGames: ISupportedGames = {
    GlossGameId: 261,
    steamAppID: 271590,
    installdir: join("Grand Theft Auto V"),
    gameName: "Grand Theft Auto V",
    gameExe: "GTA5.exe",
    startExe: [
        {
            name: "Steam 启动",
            cmd: "steam://rungameid/271590"
        },
        {
            name: "直接启动",
            exePath: join("PlayGTAV.exe")
        }
    ],
    archivePath: join(FileHandler.getMyDocuments(), "Rockstar Games", "GTA V"),
    gameCoverImg: "https://mod.3dmgame.com/static/upload/game/616cd448533b9.png",
    modType: [
        {
            id: 1,
            name: "asi",
            installPath: join(""),
            async install(mod) {
                return asi(mod, true)
            },
            async uninstall(mod) {
                return asi(mod, false)
            }
        },
        {
            id: 2,
            name: "gameconfig",
            installPath: join("gameconfig"),
            async install(mod) {
                if (!Manager.checkInstalled("RPF 文件编辑工具", 205014)) return false
                return gameconfig(mod, true)
            },
            async uninstall(mod) {
                return gameconfig(mod, false)
            }
        },
        {
            id: 3,
            name: "游戏根目录",
            installPath: "",
            async install(mod) {
                return Manager.generalInstall(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return Manager.generalUninstall(mod, this.installPath ?? "", true)
            }
        },
        {
            id: 4,
            name: "ScriptHookV",
            installPath: "",
            async install(mod) {
                // ScriptHookV.dll
                return Manager.installByFileSibling(mod, this.installPath ?? "", 'ScriptHookV.dll', true)
            },
            async uninstall(mod) {
                return Manager.installByFileSibling(mod, this.installPath ?? "", 'ScriptHookV.dll', false)
            }
        },
        {
            id: 5,
            name: 'script',
            installPath: join('scripts'),
            async install(mod) {
                return Manager.generalInstall(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return Manager.generalUninstall(mod, this.installPath ?? "", true)
            }
        },
        {
            id: 6,
            name: 'dlc',    // 添加式
            installPath: join("mods", "update", "x64", "dlcpacks"),
            async install(mod) {
                if (!Manager.checkInstalled("RPF 文件编辑工具", 205014)) return false
                return dlcHandler(mod, this.installPath ?? "", true)
            },
            async uninstall(mod) {
                return dlcHandler(mod, this.installPath ?? "", false)
            }
        },
        {
            id: 7,
            name: 'tyf',    // 载具替换式
            installPath: join(""),
            async install(mod) {
                if (!Manager.checkInstalled("RPF 文件编辑工具", 205014)) return false
                return tyfHandler(mod, true)
            },
            async uninstall(mod) {
                return tyfHandler(mod, false)
            }
        },
        {
            id: 8,
            name: 'ydd',    // 人物
            installPath: join("mods", "update", "x64", "dlcpacks"),
            async install(mod) {
                if (!Manager.checkInstalled("RPF 文件编辑工具", 205014)) return false
                return yddHandler(mod, true)
            },
            async uninstall(mod) {
                return yddHandler(mod, false)
            },
            advanced: {
                name: "配置",
                icon: "mdi-align-horizontal-center",
                item: [
                    {
                        type: "input",
                        label: "模型名称",
                        key: "name"
                    },
                    {
                        type: "selects",
                        label: "角色性别",
                        key: "sex",
                        selectItem: [
                            { name: "男", value: "Male" },
                            { name: "女", value: "Female" }
                        ],
                        defaultValue: "Female"
                    },
                    {
                        type: "selects",
                        label: "类型",
                        key: "Pedtype",
                        selectItem: [
                            { name: "CIVMALE", value: "CIVMALE" },
                            { name: "CIVFEMALE", value: "CIVFEMALE" }
                        ],
                        defaultValue: "CIVMALE"
                    },
                    {
                        type: "switch",
                        label: "组合",
                        key: "Streamed"
                    },
                    {
                        type: "selects",
                        label: "词典名称",
                        key: "ClipDictionaryName",
                        selectItem: [
                            { name: "move_f@generic", value: "move_f@generic" },
                            { name: "move_m@generic", value: "move_m@generic" },
                            { name: "move_m@tool_belt@a", value: "move_m@tool_belt@a" },
                            { name: "move_m@shy@a", value: "move_m@shy@a" }
                        ],
                        defaultValue: "move_f@generic"
                    },
                    {
                        type: "selects",
                        label: "走路姿势",
                        key: "MovementClipSet",
                        selectItem: [
                            { name: "ANIM_GROUP_MOVE_BALLISTIC", value: "ANIM_GROUP_MOVE_BALLISTIC" },
                            { name: "ANIM_GROUP_MOVE_LEMAR_ALLEY", value: "ANIM_GROUP_MOVE_LEMAR_ALLEY" },
                            { name: "clipset@move@trash_fast_turn", value: "clipset@move@trash_fast_turn" },
                            { name: "FEMALE_FAST_RUNNER", value: "FEMALE_FAST_RUNNER" },
                            { name: "missfbi4prepp1_garbageman", value: "missfbi4prepp1_garbageman" },
                            { name: "move_characters@franklin@fire", value: "move_characters@franklin@fire" },
                            { name: "move_characters@Jimmy@slow@", value: "move_characters@Jimmy@slow@" },
                            { name: "move_characters@michael@fire", value: "move_characters@michael@fire" },
                            { name: "move_f@flee@a", value: "move_f@flee@a" },
                            { name: "move_f@scared", value: "move_f@scared" },
                            { name: "move_f@sexy@a", value: "move_f@sexy@a" },
                            { name: "move_heist_lester", value: "move_heist_lester" },
                            { name: "move_injured_generic", value: "move_injured_generic" },
                            { name: "move_lester_CaneUp", value: "move_lester_CaneUp" },
                            { name: "move_m@bag", value: "move_m@bag" },
                            { name: "MOVE_M@BAIL_BOND_NOT_TAZERED", value: "MOVE_M@BAIL_BOND_NOT_TAZERED" },
                            { name: "MOVE_M@BAIL_BOND_TAZERED", value: "MOVE_M@BAIL_BOND_TAZERED" },
                            { name: "move_m@brave", value: "move_m@brave" },
                            { name: "move_m@casual@d", value: "move_m@casual@d" },
                            { name: "move_m@drunk@moderatedrunk", value: "move_m@drunk@moderatedrunk" },
                            { name: "MOVE_M@DRUNK@MODERATEDRUNK", value: "MOVE_M@DRUNK@MODERATEDRUNK" },
                            { name: "MOVE_M@DRUNK@MODERATEDRUNK_HEAD_UP", value: "MOVE_M@DRUNK@MODERATEDRUNK_HEAD_UP" },
                            { name: "MOVE_M@DRUNK@SLIGHTLYDRUNK", value: "MOVE_M@DRUNK@SLIGHTLYDRUNK" },
                            { name: "MOVE_M@DRUNK@VERYDRUNK", value: "MOVE_M@DRUNK@VERYDRUNK" },
                            { name: "move_m@fire", value: "move_m@fire" },
                            { name: "move_m@gangster@var_e", value: "move_m@gangster@var_e" },
                            { name: "move_m@gangster@var_f", value: "move_m@gangster@var_f" },
                            { name: "move_m@gangster@var_i", value: "move_m@gangster@var_i" },
                            { name: "move_m@JOG@", value: "move_m@JOG@" },
                            { name: "MOVE_M@PRISON_GAURD", value: "MOVE_M@PRISON_GAURD" },
                            { name: "MOVE_P_M_ONE", value: "MOVE_P_M_ONE" },
                            { name: "MOVE_P_M_ONE_BRIEFCASE", value: "MOVE_P_M_ONE_BRIEFCASE" },
                            { name: "move_p_m_zero_janitor", value: "move_p_m_zero_janitor" },
                            { name: "move_p_m_zero_slow", value: "move_p_m_zero_slow" },
                            { name: "move_ped_bucket", value: "move_ped_bucket" },
                            { name: "move_ped_crouched", value: "move_ped_crouched" },
                            { name: "move_ped_mop", value: "move_ped_mop" },
                            { name: "MOVE_M@FEMME@", value: "MOVE_M@FEMME@" },
                            { name: "MOVE_F@FEMME@", value: "MOVE_F@FEMME@" },
                            { name: "MOVE_M@GANGSTER@NG", value: "MOVE_M@GANGSTER@NG" },
                            { name: "MOVE_F@GANGSTER@NG", value: "MOVE_F@GANGSTER@NG" },
                            { name: "MOVE_M@POSH@", value: "MOVE_M@POSH@" },
                            { name: "MOVE_F@POSH@", value: "MOVE_F@POSH@" },
                            { name: "MOVE_M@TOUGH_GUY@", value: "MOVE_M@TOUGH_GUY@" },
                            { name: "MOVE_F@TOUGH_GUY@", value: "MOVE_F@TOUGH_GUY@" }
                        ],
                        defaultValue: "move_f@generic"
                    },
                    {
                        type: "selects",
                        label: "源数据",
                        key: "CreatureMetadataName",
                        selectItem: [
                            { name: "null", value: "null" },
                            { name: "ambientPed_upperWrinkles", value: "ambientPed_upperWrinkles" },
                            { name: "3Lateral_Facial", value: "3Lateral_Facial" },
                            { name: "MP_CreatureMetadata", value: "MP_CreatureMetadata" }
                        ],
                        defaultValue: "null"
                    },
                    {
                        type: "selects",
                        label: "所属派系",
                        key: "DecisionMakerName",
                        selectItem: [
                            { name: "默认", value: "DEFAULT" },
                            { name: "帮派", value: "GANG" },
                            { name: "警察", value: "COP" }
                        ],
                        defaultValue: "DEFAULT"
                    },
                    {
                        type: "selects",
                        key: "Personality",
                        label: "性格",
                        selectItem: [
                            { name: "Streamed_Male", value: "Streamed_Male" },
                            { name: "Streamed_Female", value: "Streamed_Female" },
                            { name: "FitnessMale", value: "FitnessMale" },
                            { name: "FitnessFemale", value: "FitnessFemale" },
                            { name: "VAGOS", value: "VAGOS" },
                            { name: "MERRYWEATHER", value: "MERRYWEATHER" },
                            { name: "SERVICEMALES", value: "SERVICEMALES" },
                            { name: "SERVICEFEMALES", value: "SERVICEFEMALES" },
                            { name: "YOUNGAVERAGETOUGHWOMAN", value: "YOUNGAVERAGETOUGHWOMAN" },
                            { name: "CONSTRUCTION", value: "CONSTRUCTION" }
                        ],
                        defaultValue: "Streamed_Male"
                    },
                    {
                        type: "selects",
                        key: "CombatInfo",
                        label: "战斗动作",
                        selectItem: [
                            { name: "默认", value: "DEFAULT" },
                            { name: "帮派", value: "GANG" },
                            { name: "警察", value: "COP" }
                        ],
                        defaultValue: "DEFAULT"
                    }
                ]
            }
        },
        {
            id: 9,
            name: "tools",
            installPath: "",
            async install(mod) {
                return true
            },
            async uninstall(mod) {
                return true
            }
        },
        {
            id: 10,
            name: "oiv",
            installPath: "",
            async install(mod) {
                ElMessage.warning("oiv 类型请使用 OpenIV 进行安装")
                return false
            },
            async uninstall(mod) {
                return true
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
        let asi = false
        // let rootFolder = false
        // let folderList = ['x64']
        let gameconfig = false
        let ScriptHookRDR2 = false
        let scripts = false
        let dlc = false
        let yft = false
        let ydd = false
        let oiv = false

        mod.modFiles.forEach(item => {
            // 判断目录是否包含 folderList
            let list = FileHandler.pathToArray(item)
            // if (list.some(item => folderList.includes(item))) rootFolder = true

            if (extname(item) == '.asi') asi = true
            if (extname(item) == '.dll') scripts = true
            if (basename(item) == 'gameconfig.xml') gameconfig = true
            if (basename(item) == 'ScriptHookV.dll') ScriptHookRDR2 = true
            if (basename(item) == 'dlc.rpf') dlc = true
            if (extname(item) == '.yft') yft = true
            if (extname(item) == '.ydd') ydd = true
            if (extname(item) == '.oiv') oiv = true

        })

        if (ScriptHookRDR2) return 4

        if (asi) return 1
        if (gameconfig) return 2
        // if (rootFolder) return 3
        if (scripts) return 5
        if (dlc) return 6
        if (ydd) return 8
        if (yft) return 7
        if (oiv) return 10

        return 99
    }
}
