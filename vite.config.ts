import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron/simple'
import renderer from 'vite-plugin-electron-renderer'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        electron(
            {
                main: {
                    // Shortcut of `build.lib.entry`.
                    entry: 'electron/main.ts',
                },
                preload: {
                    // Shortcut of `build.rollupOptions.input`.
                    // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
                    input: path.join(__dirname, 'electron/preload.ts'),
                },
                // Ployfill the Electron and Node.js API for Renderer process.
                // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
                // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
                renderer: process.env.NODE_ENV === 'test'
                    // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
                    ? undefined
                    : {},
            }
        ),
        renderer({
            // resolve: {
            //     "electron-edge-js-v33-only": {
            //         type: 'cjs',
            //         build({ cjs }) {
            //             console.log("cjs", cjs);

            //             return cjs('electron-edge-js-v33-only')
            //         }
            //     }
            // }
        }),
        AutoImport({
            imports: ['vue', 'vue-router', 'vue-i18n'],
            resolvers: [
                ElementPlusResolver(),
                // 自动导入图标组件
                IconsResolver({
                    prefix: 'Icon',
                }),
            ],
            dirs: ['src/model', 'src/stores'],
        }),
        Components({
            resolvers: [
                ElementPlusResolver(),
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep'],
                }),
            ],
        }),
        // optimizer({
        //     // 预构建 ipcRenderer 在 Electron 渲染进程中使用
        //     electron: `const { ipcRenderer } = require('electron'); export { ipcRenderer };`,
        //     // 这表示 'fs' 与 'node:fs' 同时支持
        //     // e.g.
        //     //   `import fs from 'fs'`
        //     //   or
        //     //   `import fs from 'node:fs'`
        //     fs: () => ({
        //         // 这与 `alias` 行为一致
        //         find: /^(node:)?fs$/,
        //         code: `const fs = require('fs'); export { fs as default }`;
        //     }),
        // }),
    ],
    // 映射 @src目录
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            // 'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
        }
    },
})
