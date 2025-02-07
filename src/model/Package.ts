
export class Package {

    // 生成包代码 base64编码
    public static generatePackageCode(data: IModInfo[]): string {
        return Buffer.from(JSON.stringify(data)).toString('base64')
    }

    // 解析包代码 base64解码
    public static parsePackageCode(code: string): IModInfo[] {
        return JSON.parse(Buffer.from(code, 'base64').toString())
    }

}