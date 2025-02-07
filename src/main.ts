import { createApp } from 'vue'
import App from '@/App.vue'
// import '@/samples/node-api'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/main.less'
import { vuetify } from '@/plugins/vuetify'
import router from '@/router'
import { createPinia } from 'pinia'
import i18n from '@/lang'


const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(i18n)
app.use(createPinia())

// app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.mount('#app')
    .$nextTick(() => {
        postMessage({ payload: 'removeLoading' }, '*')
    })
