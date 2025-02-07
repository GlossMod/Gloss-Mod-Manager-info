

import { join } from 'path'
import { ElLoading, ElMessage } from "element-plus";

export class Backup {

    private static buildTree(paths: string[], removePath?: string): ITree[] {
        const root: ITree[] = [];
        // 确保removePath以路径分隔符结束
        if (removePath && !removePath.endsWith('\\')) {
            removePath += '\\';
        }
        paths.forEach(path => {
            // 如果提供了removePath，则从path中移除
            if (removePath && path.startsWith(removePath)) {
                path = path.substring(removePath.length);
            }
            // 分割路径
            const parts = path.split('\\'); // Windows路径分隔符
            let currentLevel = root;
            parts.forEach(part => {
                let existingNode = currentLevel.find(node => node.label === part);
                if (!existingNode) {
                    const newNode: ITree = { label: part, filePath: path, children: [] };
                    currentLevel.push(newNode);
                    existingNode = newNode;
                }
                currentLevel = existingNode.children!;
            });
        });
        return root;
    }

    /**
     * 获取文件夹中的文件列表
     * @param folderPath 文件夹
     * @returns ITree[]
     */
    public static GetFolderList(folderPath: string) {
        let list = FileHandler.getAllFilesInFolder(folderPath, true, true)
        return Backup.buildTree(list, folderPath)
    }

    //#region 备份持久化
    public static GetBackupList(backupFile: string) {
        let data = FileHandler.readFile(backupFile, "[]")
        return JSON.parse(data)
    }

    public static SetBackupList(backupFile: string, data: IArchive[]) {
        FileHandler.writeFile(backupFile, JSON.stringify(data))
    }
    //#endregion

    /**
     * 备份存档
     * @param list 备份列表
     * @param name 备份名称
     * @param backupPath 备份路径
     * @param filePath 文件路径
     * @returns Promise<IArchive>
     */
    public static async ToBackup(list: any[], name: string, backupPath: string, filePath: string,) {

        let backupFileList: string[] = list.map(item => item.filePath)

        // backupFileList 去重
        backupFileList = Array.from(new Set(backupFileList))

        let zip = join(backupPath, `${new Date().getTime()}.zip`)

        const loading = ElLoading.service({
            lock: true,
            text: '正在备份文件',
        })

        // for (let i in backupFileList) {
        //     let item = backupFileList[i]
        //     await Unzipper.addAndRenameToZip(zip, join(filePath, item), item)
        // }
        try {
            await Unzipper.AddFileListToZip(zip, backupFileList, filePath)
        } catch (error) {
            console.log(error);
            ElMessage.error(`错误: ${error}`)
        }

        loading.close()

        return {
            name: name,
            zipFile: zip,
            time: new Date().getTime(),
            files: backupFileList,
            size: await FileHandler.getFileSize(zip)
        }
    }

    /**
     * 还原备份
     * @param item 备份
     * @param folder 还原目录
     */
    public static async RestoreBackup(item: IArchive, folder: string) {
        const loading = ElLoading.service({
            lock: true,
            text: '正在还原文件',
        })
        // console.log(item.zipFile, folder);
        try {
            await Unzipper.unzip(item.zipFile, folder)
        } catch (error) {
            ElMessage.error(`错误: ${error}`)
        }

        loading.close()
    }
}