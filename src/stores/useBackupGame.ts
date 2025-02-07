import { defineStore } from "pinia";
import { join } from 'path'


export const useBackupGame = defineStore('BackupGame', {
    state: () => ({
        gameFileList: [] as ITree[],
        backupFileList: [] as IArchive[],
    }),
    getters: {
        backupPath() {
            const settings = useSettings()
            return join(settings.settings.modStorageLocation, "~Backup", "Game", settings.settings.managerGame?.gameName || "")
        },
        gamePath() {
            const settings = useSettings()
            return settings.settings.managerGame?.gamePath
        },
    },
    actions: {

        //#region 游戏目录相关

        async getGameFileList() {
            if (this.gamePath) {
                this.gameFileList = Backup.GetFolderList(this.gamePath)
                // 对 this.gameFileList 进行排序, 判断是否有子文件
                this.gameFileList.sort((a, b) => {
                    if (a.children && b.children) {
                        return b.children.length - a.children.length
                    } else {
                        return 0
                    }
                })
            }
        },
        async backup(node: any[], name: string) {
            if (this.gamePath) {
                let res = await Backup.ToBackup(node, name, this.backupPath, this.gamePath)
                this.backupFileList.push(res)
            }
        },
        //#endregion
        //#region 游戏备份相关
        getBackupList() {
            this.backupFileList = Backup.GetBackupList(join(this.backupPath, "backup.json"))
        },
        saveBackupList() {
            Backup.SetBackupList(join(this.backupPath, "backup.json"), this.backupFileList)
        },
        delBackup(item: IArchive) {
            let index = this.backupFileList.findIndex(i => i.zipFile === item.zipFile)
            if (index !== -1) {
                FileHandler.deleteFile(item.zipFile)
                this.backupFileList.splice(index, 1)
            }
        },
        async restoringBackup(item: IArchive) {
            if (this.gamePath) {
                Backup.RestoreBackup(item, this.gamePath)
            }
        }
        //#endregion

    }
})