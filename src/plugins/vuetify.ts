import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
export const vuetify = createVuetify({
    components,
    directives,
    // // 暗色模式
    // theme: {
    //     defaultTheme: window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light',
    // }
})