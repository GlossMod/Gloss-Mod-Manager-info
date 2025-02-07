import path from 'path'

import fs from 'fs'
import { FileHandler } from './FileHandler'

export class LocalLang {
    public static langFolder = path.join(Config.configFolder(), 'lang')

    public static init() {

        if (!fs.existsSync(this.langFolder)) { return }

        const settings = useSettings()
        LocalLang.getLocalLangData()
        // this.getLocalLangList().then(list => {
        //     settings.langList.push(...list)
        // })
    }

    // private static async getLocalLangList() {
    //     // let list = await FileHandler.readFileSync(path.join(this.langFolder, 'lang.json'), '[]')
    //     // let langList = JSON.parse(list)

    //     // langList.forEach((item: any) => {
    //     //     item.text += "_local";
    //     //     item.value += "_local";
    //     // })
    //     // return langList
    // }

    public static async saveLanguage(data: any) {
        const file = path.join(this.langFolder, data.data.code + '.json')
        FileHandler.writeFile(file, JSON.stringify(data, null, 4))
    }

    public static getLocalLangData() {
        if (!fs.existsSync(this.langFolder)) { return [] }

        const i18n = useI18n()

        // 获取目录中所有文件列表
        let list = FileHandler.getAllFilesInFolder(this.langFolder, true, true, false)
        // let langData: any[] = []
        list.forEach(item => {

            if (path.extname(item) == '.json') {

                let data = JSON.parse(FileHandler.readFile(item, "[]"))
                // langData.push(data)
                let message = i18n.getLocaleMessage(data.data?.code)

                if (message && data.data) {
                    if (Object.keys(message).length > 0) {
                        let newMessage = { ...message, ...data.Language, }
                        i18n.setLocaleMessage(data.data.code, newMessage)
                    } else {
                        console.log(data);

                        i18n.setLocaleMessage(data.data.code, data.Language)
                        const settings = useSettings()
                        settings.langList.push({
                            text: data.data.name,
                            value: data.data.code
                        })
                        console.log(settings.langList);
                    }
                }
            }
        })

        // console.log(i18n);

    }

}