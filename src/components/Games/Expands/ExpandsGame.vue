<script lang='ts' setup>
import ExpandsAddTypes from './ExpandsAddTypes.vue'
import ExpandsAddCheckTypes from './ExpandsAddCheckTypes.vue'
import { ipcRenderer } from 'electron';
import { ElMessage } from 'element-plus';

const games = useGames()

const InitialForm = {
    unrealEngineData: {
        bassPath: '',
        useUE4SS: true
    },
    Thunderstore: {
        community_identifier: ''
    }
} as IExpandsSupportedGames
const form = ref<IExpandsSupportedGames>(JSON.parse(JSON.stringify(InitialForm)))

const moreGameExe = ref(false)
const moreStarExe = ref(false)
const gameVisible = ref(false)
const starVisible = ref(false)
const uploadCover = ref(false)

const gameExe = ref({} as IGameExe)
const startExe = ref({} as IStartExe)

const modType = ref('')
const checkModType = ref('')

//#region 主程序名称

watch(moreGameExe, () => {
    form.value.gameExe = moreGameExe.value ? [] : ''
}, { immediate: true })

function addGameExe() {
    if (typeof (form.value.gameExe) == 'object') {
        form.value.gameExe.push(gameExe.value)
        gameExe.value = {} as IGameExe

        gameVisible.value = false
    }
}

function delGameExe(item: IGameExe) {
    const index = (form.value.gameExe as IGameExe[]).indexOf(item);
    (form.value.gameExe as IGameExe[]).splice(index, 1)
}

//#endregion

//#region 启动方式
watch(moreStarExe, () => {
    form.value.startExe = moreStarExe.value ? [] : ''
}, { immediate: true })

function addStartExe() {
    if (typeof (form.value.startExe) == 'object') {
        form.value.startExe.push(startExe.value)
        startExe.value = {} as IStartExe

        starVisible.value = false
    }
}
function delStartExe(item: IStartExe) {
    const index = (form.value.startExe as IStartExe[]).indexOf(item);
    (form.value.startExe as IStartExe[]).splice(index, 1)
}

//#endregion

//#region 类型

watch(modType, () => {
    if (modType.value != 'Custom') {
        form.value.modType = modType.value as "UnityGame.modType" | "UnityGameILCPP2.modType" | "UnrealEngine.modType"
    } else {
        form.value.modType = []
    }
})

watch(checkModType, () => {
    if (checkModType.value != 'Custom') {
        form.value.checkModType = checkModType.value as "UnityGame.checkModType" | "UnityGameILCPP2.checkModType" | "UnrealEngine.checkModType"
    } else {
        form.value.checkModType = []
    }
})

const InitialTypeValue: IType = {
    id: 1,
    name: '',
    installPath: '',
    install: {
        UseFunction: 'Unknown',
        folderName: '',
        isInstall: true,
        include: false,
        spare: false,
        keepPath: false,
        isExtname: false,
        inGameStorage: true,
    },
    uninstall: {
        UseFunction: 'Unknown',
        folderName: '',
        isInstall: false,
        include: false,
        spare: false,
        keepPath: false,
        isExtname: false,
        inGameStorage: true,
    }
}

function addType() {
    const type = ref<IType>(JSON.parse(JSON.stringify(InitialTypeValue)))
    ElMessageBox({
        title: "添加类型",
        draggable: true,
        closeOnClickModal: false,
        message: () => h(ExpandsAddTypes, { modelValue: type.value }),
    }).then(() => {
        (form.value.modType as IType[]).push(type.value)
        type.value = InitialTypeValue
    }).catch(() => {
        type.value = InitialTypeValue
    })
}

function editModType(item: IType) {
    const type = ref<IType>(item)

    ElMessageBox({
        title: "编辑类型",
        draggable: true,
        closeOnClickModal: false,
        message: () => h(ExpandsAddTypes, { modelValue: type.value }),
    }).then(() => {
        type.value = InitialTypeValue
    }).catch(() => {
        type.value = InitialTypeValue
    })
}

function delModTyoe(item: IType) {
    const index = (form.value.modType as IType[]).indexOf(item);
    (form.value.modType as IType[]).splice(index, 1)
}

const InitialCheckModTypeValue: ICheckModType = {
    UseFunction: 'extname',
    Keyword: [],
    TypeId: 0
}

function addCheckModType() {
    let type = ref<ICheckModType>(JSON.parse(JSON.stringify(InitialCheckModTypeValue)))
    ElMessageBox({
        title: "添加检查类型",
        draggable: true,
        closeOnClickModal: false,
        message: () => h(ExpandsAddCheckTypes, { modelValue: type.value }),
    }).then(() => {
        console.log(type.value);

        (form.value.checkModType as ICheckModType[]).push(type.value)
        type.value = InitialCheckModTypeValue
    }).catch(() => {
        type.value = InitialCheckModTypeValue
    })
}

function editCheckModType(item: ICheckModType) {
    const type = ref<ICheckModType>(item)

    ElMessageBox({
        title: "编辑检查类型",
        draggable: true,
        closeOnClickModal: false,
        message: () => h(ExpandsAddCheckTypes, { modelValue: type.value }),
    }).then(() => {
        type.value = InitialCheckModTypeValue
    }).catch(() => {
        type.value = InitialCheckModTypeValue
    })
}

function delCheckModType(item: ICheckModType) {
    const index = (form.value.checkModType as ICheckModType[]).indexOf(item);
    (form.value.checkModType as ICheckModType[]).splice(index, 1)
}

//#endregion


async function submitCover(base64: string) {
    const file = await fetch(base64).then(res => res.blob()).then(blob => new File([blob], 'Cropped.png', { type: 'image/png' }))
    let fd = new FormData()
    fd.append('file', file)

    fetch('https://mod.3dmgame.com/upload/fileUpload', {
        method: 'POST',
        body: fd
    }).then(res => res.json()).then(data => {
        form.value.gameCoverImg = `https://mod.3dmgame.com/static/upload/mod/${data.url}@webp`
        console.log(form.value.gameCoverImg);
    })
}

function close() {
    form.value = JSON.parse(JSON.stringify(InitialForm))

    modType.value = ''
    checkModType.value = ''
}

function save() {
    console.log(form.value);
    Expands.saveExpands(form.value)
    Expands.init()
    ElMessage.success('添加成功')
    games.showExpandsGame = false
}

// function selectArchivePath() {
//     ipcRenderer.invoke("select-file", {
//         properties: ['openDirectory'],
//     }).then((arg: string[]) => {
//         if (arg.length > 0) {
//             form.value.archivePath = arg[0]
//         }
//     })
// }

function setForm(item: IExpandsSupportedGames) {
    form.value = item
    modType.value = item.modType as string
    checkModType.value = item.checkModType as string
}

defineExpose({
    setForm
})

</script>
<template>
    <Dialog :draggable="false" v-model="games.showExpandsGame" persistent width="500px" @close="close">
        <template #header>
            <div class="header">
                <h3>{{ $t("Add Game") }} <el-link href="https://gmm.aoe.top/Expands/README.html" :underline="false"
                        target="_blank"><v-icon>mdi-help</v-icon></el-link></h3>
            </div>
        </template>
        <v-card color="#0000">
            <v-card-text>
                <el-form label-width="100">
                    <el-form-item :label="$t('Game ID')" required>
                        <el-input type="number" v-model="form.GlossGameId" :placeholder="$t('Game ID Tip')"> </el-input>
                    </el-form-item>
                    <el-form-item label="Steam Id" required>
                        <el-input type="number" v-model="form.steamAppID" :placeholder="$t('Steam Id Tip')"></el-input>
                    </el-form-item>
                    <el-form-item label="Thunderstore">
                        <el-input v-model="form.Thunderstore!.community_identifier"
                            :placeholder="$t('Thunderstore Tip')"></el-input>
                    </el-form-item>
                    <el-form-item label="Mod.Io Id">
                        <el-input type="number" v-model="form.mod_io" :placeholder="$t('Mod.Io Tip')"></el-input>
                    </el-form-item>
                    <el-form-item label="GameBanana">
                        <el-input type="number" v-model="form.gamebanana"
                            :placeholder="$t('Gamebanana Tip')"></el-input>
                    </el-form-item>
                    <el-form-item label="CurseForge">
                        <el-input type="number" v-model="form.curseforge"
                            :placeholder="$t('CurseForge Tip')"></el-input>
                    </el-form-item>

                    <el-form-item :label="$t('Installation Directory')" required>
                        <el-input v-model="form.installdir" :placeholder="$t('Installation Directory Tip')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('Game Name')" required>
                        <el-input v-model="form.gameName" :placeholder="$t('Game Name Tip')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('Exe Name')" required>
                        <el-row>
                            <el-col :span="24">
                                <el-switch v-model="moreGameExe" inline-prompt
                                    style="--el-switch-on-color: #FF6F00; --el-switch-off-color: #1565C0"
                                    :active-text="$t('Advanced')" :inactive-text="$t('Easy')" />
                            </el-col>
                            <el-col :span="24" v-if="moreGameExe">
                                <el-popover :visible="gameVisible" trigger="click" :width="250" :teleported="false">
                                    <template #reference>
                                        <el-button link @click="gameVisible = true" class="star-exe-list">{{ $t('Add')
                                            }}<el-icon><el-icon-plus></el-icon-plus></el-icon></el-button>
                                    </template>
                                    <v-card color="#0000">
                                        <el-form label-width="80">
                                            <el-form-item :label="$t('Name')">
                                                <el-input v-model="gameExe.name"
                                                    :placeholder="$t('Name Tip')"></el-input>
                                            </el-form-item>
                                            <el-form-item :label="$t('Relative Path')">
                                                <el-input v-model="gameExe.rootPath"
                                                    :placeholder="$t('Relative Path Tip')"></el-input>
                                            </el-form-item>
                                        </el-form>
                                        <template #actions>
                                            <el-button @click="addGameExe">{{ $t('Add') }}</el-button>
                                        </template>
                                    </v-card>
                                </el-popover>
                                <div class="star-exe-list" v-for="item in (form.gameExe as IGameExe[])"
                                    :key="item.name">
                                    {{ item.name }}
                                    <v-icon class="del" @click="delGameExe(item)">mdi-trash-can-outline</v-icon>
                                </div>
                            </el-col>
                            <el-col :span="24" v-else>
                                <el-input v-model="(form.gameExe as string)" placeholder="游戏主程序名称"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item :label="$t('Startup method')" required>
                        <el-row>
                            <el-col :span="24">
                                <el-switch v-model="moreStarExe" inline-prompt
                                    style="--el-switch-on-color: #FF6F00; --el-switch-off-color: #1565C0"
                                    :active-text="$t('Advanced')" :inactive-text="$t('Easy')" />
                            </el-col>
                            <el-col :span="24" v-if="moreStarExe" class="star-exe">
                                <el-popover :visible="starVisible" trigger="click" :width="250" :teleported="false">
                                    <template #reference>
                                        <el-button link @click="starVisible = true"
                                            class="star-exe-list">添加<el-icon><el-icon-plus></el-icon-plus></el-icon></el-button>
                                    </template>
                                    <v-card color="#0000">
                                        <el-form label-width="80">
                                            <el-form-item label="名称">
                                                <el-input v-model="startExe.name" placeholder="显示的名称"></el-input>
                                            </el-form-item>
                                            <el-form-item label="路径">
                                                <el-input v-model="startExe.exePath" placeholder="根目录的相对路径"></el-input>
                                            </el-form-item>
                                            <el-form-item label="启动选项">
                                                <el-input v-model="startExe.options" placeholder="启动项"></el-input>
                                            </el-form-item>
                                            <el-form-item label="cmd">
                                                <el-input v-model="startExe.cmd" placeholder="启动指令"></el-input>
                                            </el-form-item>
                                        </el-form>
                                        <template #actions>
                                            <el-button @click="addStartExe">添加</el-button>
                                        </template>
                                    </v-card>
                                </el-popover>
                                <div class="star-exe-list" v-for="item in (form.startExe as IStartExe[])"
                                    :key="item.name">
                                    {{ item.name }}
                                    <v-icon class="del" @click="delStartExe(item)">mdi-trash-can-outline</v-icon>
                                </div>
                            </el-col>
                            <el-col :span="24" v-else>
                                <el-input v-model="(form.startExe as string)" placeholder="游戏 exe 名称"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item :label="$t('Cover')" required>
                        <el-row>
                            <el-col :span="24">
                                <div class="cover" @click="uploadCover = true">
                                    <el-image v-if="form.gameCoverImg" :src="form.gameCoverImg"></el-image>
                                    <el-icon v-else> <el-icon-plus></el-icon-plus> </el-icon>
                                </div>
                                <Cropped v-model="uploadCover" :title="$t('Upload cover')" @submit="submitCover">
                                </Cropped>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item :label="$t('Type')" required>
                        <el-select v-model="modType">
                            <el-option label="通用 unity" value="UnityGame.modType"></el-option>
                            <el-option label="通用 unity ILCPP2" value="UnityGameILCPP2.modType"></el-option>
                            <el-option label="通用 虚幻" value="UnrealEngine.modType"></el-option>
                            <el-option :label="$t('Customize')" value="Custom"></el-option>
                        </el-select>
                        <v-row>
                            <v-col cols="12" v-if="modType == 'UnrealEngine.modType'">
                                <el-form label-width="100">
                                    <el-form-item label="独特目录">
                                        <el-input v-model="form.unrealEngineData.bassPath"
                                            placeholder="根目录中与其他游戏不同的文件夹"></el-input>
                                    </el-form-item>
                                    <el-form-item label="使用 UE4SS">
                                        <el-switch v-model="form.unrealEngineData.useUE4SS"></el-switch>
                                    </el-form-item>
                                </el-form>
                            </v-col>
                            <v-col cols="12" v-if="modType == 'Custom'" class="mod-type">
                                <div class="add-type">
                                    <el-button link @click="addType">
                                        <el-icon><el-icon-plus></el-icon-plus></el-icon>
                                    </el-button>
                                </div>
                                <v-chip variant="text" label v-for="item in (form.modType as IType[])" :key="item.id"
                                    @click="editModType(item)">
                                    {{ item.name }}
                                    <el-button link
                                        @click.stop="delModTyoe(item)"><v-icon>mdi-trash-can-outline</v-icon></el-button>
                                </v-chip>
                            </v-col>
                        </v-row>
                    </el-form-item>
                    <el-form-item :label="$t('Check type')" required>
                        <el-select v-model="checkModType">
                            <el-option label="通用 unity" value="UnityGame.checkModType"></el-option>
                            <el-option label="通用 unity ILCPP2" value="UnityGameILCPP2.checkModType"></el-option>
                            <el-option label="通用 虚幻" value="UnrealEngine.checkModType"></el-option>
                            <el-option :label="$t('Customize')" value="Custom"></el-option>
                        </el-select>
                        <v-row>
                            <v-col cols="12" v-if="checkModType == 'Custom'" class="mod-type">
                                <div class="add-type">
                                    <el-button link @click="addCheckModType">
                                        <el-icon><el-icon-plus></el-icon-plus></el-icon>
                                    </el-button>
                                </div>
                                <v-chip variant="text" label v-for="item in (form.checkModType as ICheckModType[])"
                                    :key="item.TypeId" @click="editCheckModType(item)">
                                    {{ item.TypeId }}
                                    <el-button link
                                        @click.stop="delCheckModType(item)"><v-icon>mdi-trash-can-outline</v-icon></el-button>
                                </v-chip>
                            </v-col>
                        </v-row>
                    </el-form-item>
                    <!-- <el-form-item label="存档目录">
                        <el-input v-model="form.archivePath" placeholder="存档所在的目录">
                            <template #append>
                                <el-button @click="selectArchivePath"> <el-icon><el-icon-folder /></el-icon>
                                </el-button>
                            </template>
                        </el-input>
                    </el-form-item> -->
                </el-form>
            </v-card-text>
        </v-card>
        <template #footer>
            <el-button @click="games.showExpandsGame = false">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
        </template>
    </Dialog>
</template>
<script lang='ts'>

export default {
    name: 'ExpandsGame',
}
</script>
<style lang='less' scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.star-exe {
    display: flex;

    .star-exe-list {
        margin-right: 10px;
        cursor: pointer;

        &:hover {
            opacity: .6;
        }

        .del:hover {
            color: red;
        }
    }
}

.cover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 65px;
    cursor: pointer;
    border: 1px dashed #d9d9d9;

    &:hover {
        border-color: #409EFF;
    }
}

.mod-type {
    display: flex;
}
</style>
