import crypto from 'crypto'

export class Cryption {
    /**
     * 加密数据
     * @param data 数据
     * @returns 
     */
    public static encryptData(data: any, key: crypto.CipherKey, iv: crypto.BinaryLike) {
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(data, 'utf-8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    /**
     * 解密数据
     * @param encryptedData 数据
     * @returns 
     */
    public static decryptData(encryptedData: any, key: crypto.CipherKey, iv: crypto.BinaryLike) {
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    }
}