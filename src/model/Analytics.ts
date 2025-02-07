/**
 * 数据统计
 */




export class AppAnalytics {

    private static generateRandomNum() {
        let randomNum = '';
        for (let i = 0; i < 32; i++) {
            randomNum += Math.floor(Math.random() * 10);//生成0到9之间的随机整数，并拼接到字符串中
        }
        return randomNum;
    }

    public static async getInstanceId() {
        let id = await ElectronStore.getStore('app_instance_id')
        if (!id) {
            id = this.generateRandomNum()
            ElectronStore.setStore('app_instance_id', id)
        }
        return id
    }

    public static async sendEvent(event_name: string, event_value?: any) {

        // console.log(event_name, event_value);
        const user_id = await this.getInstanceId()
        const gmm_login = useUser().user?.id
        const version = (await useMain().getVersion())[0]
        const language = useSettings().settings.language

        fetch(`https://mod.3dmgame.com/gmm/send`, {
            method: "POST",
            body: JSON.stringify({
                event_name, event_value, user_id, gmm_login, version, language
            })
        })
    }
}