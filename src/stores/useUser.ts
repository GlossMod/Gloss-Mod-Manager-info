import { defineStore } from "pinia";
import { ipcRenderer } from "electron";
import { ElMessage } from "element-plus";
import QRCode from 'qrcode'
import crypto from "crypto";

export const useUser = defineStore('User', {
    state: () => ({
        user: null as IUser | null,
        loginBox: false,
        username: '',
        password: '',
        remember: true,
        code: null as string | null,
        timer: null as NodeJS.Timeout | null,
        collect: {
            list: [] as IMod[],
            page: 1,
            count: 1,
        }
    }),
    getters: {
        getUserAvatar(state) {
            if (state.user?.user_avatar) {
                // 判断是否包含 my.3dmgame.com
                if (state.user.user_avatar.indexOf('my.3dmgame.com') != -1) {
                    return state.user.user_avatar
                } else {
                    return `https://mod.3dmgame.com${state.user.user_avatar}`
                }
            }
        },
        collectLength(state) {
            // 计算页数
            return Math.ceil(state.collect.count / 10)
        }
    },
    actions: {
        async login(username: string, password: string) {
            return new Promise((resolve, reject) => {
                ipcRenderer.invoke("user-login", { username, password }).then((data) => {
                    if (data.code == "00") {
                        // console.log(data);
                        let ueer = data.user[0]
                        this.saveUser(ueer)
                        this.loginBox = false
                        resolve(ueer)
                    } else {
                        ElMessage.error(data.msg)
                        reject(data.msg)
                    }
                })
            })
        },
        async logout() {
            // LocalStorageHelper.removeItem("user")
            ElectronStore.removeStore("user")
            this.user = null
            ElMessage.success('登出成功.')
        },
        saveUser(user: IUser) {
            this.user = user
            // 15 天
            let timeout = new Date().getTime() + (1000 * 60 * 60 * 24 * 15)
            user.timeout = timeout
            ElectronStore.setStore("user", user)
            ElMessage.success('登录成功.')
        },

        async getUser() {
            let user = await ElectronStore.getStore("user")
            if (user) {
                // console.log(user.timeout, new Date().getTime());
                if (user.timeout < new Date().getTime()) {
                    // 登录过期, 清除登录信息
                    ElectronStore.removeStore("user")
                    this.user = null
                } else {
                    this.user = user
                }
            }
        },
        async getQrcode(canvas: HTMLCanvasElement) {
            let code = this.createCode()
            QRCode.toCanvas(canvas, code, {
                version: 5,
                errorCorrectionLevel: 'high',
                maskPattern: 7,
                width: 256,
                color: {
                    dark: "#fff",
                    light: "#212121"
                }
            })
        },
        createCode() {
            if (!this.code) {
                const time = new Date().getTime()
                const InstanceId = AppAnalytics.getInstanceId()
                this.code = crypto.createHash('md5').update(`${InstanceId}${time}`).digest('hex')
                this.code = `3dmmod://${this.code}`
            }
            return this.code
        },
        async checkQrcodeLogin() {
            if (this.user) {
                clearInterval(this.timer!)
            }
            let code = this.createCode()
            fetch(`https://mod.3dmgame.com/gmm/checkLogin`, {
                method: "POST",
                body: JSON.stringify({ code })
            }).then(async (res) => {
                let text = JSON.parse(await res.text())
                if (text.code == '00') {
                    this.saveUser(text.user)
                    this.loginBox = false
                    this.code = null
                    clearInterval(this.timer!)
                }
            })
        },
        getCollectList() {
            ipcRenderer.invoke("get-favorite-list", { page: this.collect.page, pageSize: 10, userId: this.user?.id }).then((data) => {
                console.log(data);
                if (data.code == '00') {
                    this.collect.list = data.data.mod
                    this.collect.count = data.data.count
                } else {
                    ElMessage.warning(data.msg)
                }

            })
        }
    }
})