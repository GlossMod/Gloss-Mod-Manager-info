import crypto from 'crypto'
import { join } from 'path'
import { Cryption } from './Cryption';
export class ElectronStore {

    private static key = Buffer.from([53, 109, 4, 104, 98, 90, 156, 151, 117, 28, 6, 141, 146, 10, 31, 84, 179, 240, 115, 0, 55, 244, 208, 228, 99, 23, 107, 149, 54, 213, 136, 157])
    private static iv = Buffer.from([97, 168, 108, 221, 110, 76, 110, 190, 119, 216, 137, 60, 120, 84, 88, 30])
    private static cache = join(Config.configFolder(), 'gmm.cache')

    /**
     *设置本地储存
     * @param key 
     * @param value 
     */
    public static async setStore(key: string, value: any) {
        let data = await FileHandler.readFileSync(this.cache, Cryption.encryptData('{}', this.key, this.iv))
        let json = JSON.parse(Cryption.decryptData(data, this.key, this.iv))
        // console.log(json);
        json[key] = value
        FileHandler.writeFile(this.cache, Cryption.encryptData(JSON.stringify(json), this.key, this.iv))
    }

    /**
     * 获取本地储存
     * @param key 
     * @returns 
     */
    public static async getStore(key: string) {
        let data = await FileHandler.readFileSync(this.cache, Cryption.encryptData('{}', this.key, this.iv))
        let json = JSON.parse(Cryption.decryptData(data, this.key, this.iv))
        return json[key]
    }

    /**
     * 移除本地储存
     * @param key 
     */
    public static async removeStore(key: string) {
        let data = await FileHandler.readFileSync(this.cache, Cryption.encryptData('{}', this.key, this.iv))
        let json = JSON.parse(Cryption.decryptData(data, this.key, this.iv))
        delete json[key]
        FileHandler.writeFile(this.cache, Cryption.encryptData(JSON.stringify(json), this.key, this.iv))
    }

    /**
     * 清空本地储存
     */
    public static async clear() {
        FileHandler.writeFile(this.cache, Cryption.encryptData('{}', this.key, this.iv))
    }

}