/**
 * 解压文件
 */

import { extractFull, type Data, add, rename } from 'node-7z'
import { ipcRenderer } from 'electron'
import { exec, execSync } from 'child_process';
import path from 'path'
import { ElMessage } from 'element-plus';
export class Unzipper {

    private static async get7zip(): Promise<string> {

        // let zipPath = await ipcRenderer.invoke("get-7z-path")
        let zipPath = path.join(FileHandler.getResourcesPath(), '7z', '7z.exe')
        return zipPath
    }

    /**
     * @description 解压文件
     * @param source 需要解压的文件
     * @param target 解压到的目录
     * @returns 解压状态
     */
    public static unzip(source: string, target: string): Promise<Data[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let files: Data[] = []
                const myStream = extractFull(source, target, {
                    $bin: await this.get7zip(),
                    charset: 'utf-8',
                })
                myStream.on('data', function (data) {
                    files.push(data)
                })
                myStream.on('error', (err) => {
                    ElMessage.error(`错误: ${err}`)
                    reject(err)
                })
                myStream.on('end', function () {
                    resolve(files)
                })
            } catch (error) {
                ElMessage.error(`错误: ${error}`)
                reject(error)
            }
        })
    }

    // 解压文件 
    public static unzip2(source: string, target: string, files: string[]) {
        return new Promise(async (resolve, reject) => {
            try {
                let _7z = await this.get7zip()
                exec(`"${_7z}" x "${source}" -o"${target}" ${files.join(' ')} -y`, (err, stdout, stderr) => {
                    if (err) reject(err)
                    if (stderr) reject(stderr)
                    if (stdout) {
                        resolve(stdout)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
     * 将文件夹压缩为压缩包
     * @param source 需要压缩的目录
     * @param target 压缩后的目录
     * @returns 
     */
    public static async zip(source: string, target: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            let _7z = await this.get7zip()
            exec(`"${_7z}" a "${target}" "${source}\\*"`, (err, stdout, stderr) => {
                if (err) reject(err)
                if (stderr) reject(stderr)
                if (stdout) {
                    resolve(stdout)
                }
            })
        })
    }

    /**
     * 读取zip 中的文件
     * @param zipPath 
     * @param file 
     */
    public static async readZipFile(zipPath: string, file: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const settings = useSettings()
            let target = path.join(settings.settings.modStorageLocation, 'temp')
            console.log(target);
            let _7z = await this.get7zip()
            exec(`"${_7z}" x "${zipPath}" -o"${target}" i ${file}`, (err, stdout, stderr) => {
                if (err) reject(err)
                if (stderr) reject(stderr)
                if (stdout) {
                    let data = FileHandler.readFile(path.join(target, file))
                    FileHandler.deleteFolder(target)
                    resolve(data ?? "")
                }
            })
        })
    }

    /**
     * 创建一个空的zip文件
     * @param zipPath 压缩包路径
     * @param info info.json的内容
     * @returns 
     */
    public static async createZip(zipPath: string, info: any) {
        return new Promise<void>(async (resolve, reject) => {

            FileHandler.deleteFile(zipPath)
            let infoPath = path.join(path.dirname(zipPath), 'info.json')
            await FileHandler.ensureDirectoryExistence(infoPath, JSON.stringify(info))
            const myStream = add(zipPath, infoPath, {
                $bin: await this.get7zip(),
                charset: 'utf-8',
                recursive: true,
            })

            myStream.on('data', function (data) {
                console.log(data);
            })
            myStream.on('error', (err) => {
                reject(err)
            })
            myStream.on('end', function () {
                resolve()
                FileHandler.deleteFile(infoPath)
            })

            // ===================================================================


        })
    }

    /**
     * 添加文件到压缩包
     * @param zipPath zip文件路径
     * @param fileList 文件列表
     * @returns 
     */
    public static async addFileToZip(zipPath: string, fileList: string[] | string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const myStream = add(zipPath, fileList, {
                $bin: await this.get7zip(),
                charset: 'utf-8',
                recursive: true,
            })

            myStream.on('data', function (data) {
                console.log(data);
            })
            myStream.on('error', (err) => {
                reject(err)
            })
            myStream.on('end', function () {
                resolve()
            })
        })
    }

    /**
     * 重命名文件
     * @param zipPath zip文件路径
     * @param name 重命名列表
     */
    public static async renameForZip(zipPath: string, name: string[][]) {
        return new Promise(async (resolve, reject) => {
            // 7z rn 
            let _7z = await this.get7zip()
            name.forEach(item => {
                exec(`"${_7z}" rn "${zipPath}" "${item[0]}" "${item[1]}"`, (err, stdout, stderr) => {
                    if (err) reject(err)
                    if (stderr) reject(stderr)
                    if (stdout) {
                        resolve(stdout)
                    }
                })
            })
        })
    }

    /**
     * 添加并重命名文件
     * @param zipPath zip文件路径
     * @param filePath 文件路径
     * @param name 重命名
     */
    public static async addAndRenameToZip(zipPath: string, filePath: string, name: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            let _7z = await this.get7zip()
            exec(`"${_7z}" a "${zipPath}" "${filePath}"`, (err, stdout, stderr) => {
                if (err) reject(err)
                if (stderr) reject(stderr)
                if (stdout) {
                    // resolve(stdout)
                    exec(`"${_7z}" rn "${zipPath}" "${path.basename(filePath)}" "${name}"`, (err, stdout, stderr) => {
                        if (err) reject(err)
                        if (stderr) reject(stderr)
                        if (stdout) {
                            // console.log(stdout)
                            resolve(stdout)
                        }
                    })
                }
            })

        })
    }

    /**
     * 批量将文件添加到压缩包 (保持路径)
     * @param zip 压缩包地址
     * @param fileList 文件列表
     * @param bassPath 基础目录
     * @returns 
     */
    public static async AddFileListToZip(zip: string, fileList: string[], bassPath: string) {
        return new Promise(async (resolve, reject) => {

            let listFile = path.join(path.dirname(zip), 'list.txt')
            FileHandler.writeFile(listFile, fileList.join('\n'))
            let _7z = await this.get7zip()
            exec(`"${_7z}" a "${zip}" @"${listFile}" -spf`, {
                cwd: bassPath
            }, (err, stdout, stderr) => {

                if (err) reject(err)
                if (stderr) reject(stderr)
                if (stdout) {
                    FileHandler.deleteFile(listFile)
                    resolve(stdout)
                }
            })
        })
    }
}