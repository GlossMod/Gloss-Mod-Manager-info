import { defineStore } from "pinia";
import { ipcRenderer } from "electron";
export const useMain = defineStore('Main', {
    state: () => ({
        leftMenu: true,
        leftMenuRail: false,
        host: 'https://mod.3dmgame.com',
        version: "",
        webVersion: null as any,
        start: false
    }),
    getters: {
        lazy_img: (state) => `${state.host}/assets/image/lazy_img.webp`,

    },
    actions: {
        // 格式化数字
        getNumber(num?: number) {
            let number = "";
            if (num) {
                if (num > 9999999) {
                    number = Number((num / 10000000).toFixed(1)) + "kw";
                } else if (num > 9999) {
                    number = Number((num / 10000).toFixed(1)) + "w";
                } else if (num > 999) {
                    number = Number((num / 1000).toFixed(1)) + "k";
                } else {
                    number = num.toString();
                }
            }
            return number;
        },
        // 格式化大小
        formatSiez(b: number) {
            try {
                const units = ['B', 'KB', 'MB', 'GB'];
                let size = b;
                let unitIndex = 0;
                if (!size || size == 0) return "0B"

                while (size >= 1024 && unitIndex < units.length - 1) {
                    size /= 1024;
                    unitIndex++;
                }
                return `${size.toFixed(2)} ${units[unitIndex]}`;
            } catch (error) {
                console.log(b);
                return `${b}B`
            }

        },
        // 获取版本号
        async getVersion() {
            let version = await ipcRenderer.invoke("get-version")
            this.version = version[0]
            this.webVersion = version[1]
            return version
        },
        async sleep(time: number): Promise<void> {
            return new Promise(resolve => setTimeout(resolve, time));
        }
    }
})