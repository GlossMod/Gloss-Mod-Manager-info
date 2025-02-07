import { defineStore } from "pinia";
import { join } from 'path'


export const useArchive = defineStore('Archive', {
    state: () => ({
        archiveList: [] as ITree[],
        backupArchiveList: [] as IArchive[],
    }),
    getters: {
        backupPath() {
            const settings = useSettings()
            return join(settings.settings.modStorageLocation, "~Backup", "Archive", settings.settings.managerGame?.gameName || "")
        },
        archivePath() {
            const settings = useSettings()
            return settings.settings.managerGame?.archivePath
        },
    },
    actions: {

        //#region 游戏存档相关
        async getArchiveList() {
            if (this.archivePath) {
                this.archiveList = Backup.GetFolderList(this.archivePath)
                console.log(this.archiveList);

            }
        },

        async backup(node: any[], name: string) {
            if (this.archivePath) {
                let res = await Backup.ToBackup(node, name, this.backupPath, this.archivePath)
                this.backupArchiveList.push(res)
            }
        },
        //#endregion

        //#region 存档备份相关
        getBackupList() {
            this.backupArchiveList = Backup.GetBackupList(join(this.backupPath, "backup.json"))
        },
        saveBackupList() {
            Backup.SetBackupList(join(this.backupPath, "backup.json"), this.backupArchiveList)
        },
        delBackup(item: IArchive) {
            let index = this.backupArchiveList.findIndex(i => i.zipFile === item.zipFile)
            if (index !== -1) {
                FileHandler.deleteFile(item.zipFile)
                this.backupArchiveList.splice(index, 1)
            }
        },
        restoringBackup(item: IArchive) {
            if (this.archivePath) {
                Backup.RestoreBackup(item, this.archivePath)
            }
        }
        //#endregion

    }
})