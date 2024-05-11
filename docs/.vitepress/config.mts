import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Gloss Mod Manager",
    description: "A VitePress Site",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: "https://mod.3dmgame.com/static/upload/mod/202405/MOD663ed1e5509eb.png@webp",
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Examples', link: '/markdown-examples' }
        ],

        sidebar: [
            {
                text: 'Examples',
                items: [
                    { text: 'Markdown Examples', link: '/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/api-examples' }
                ]
            }
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/GlossMod/Gloss-Mod-Manager-info' },
        ],
        search: {
            provider: 'local'
        },
        editLink: {
            text: "在GitHub上编辑此页面",
            pattern: 'https://github.com/3DMXM/wiki.aoe.top/edit/master/:path'
        },
        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },
        footer: {
            message: '基于 MIT 许可发布',
            copyright: `版权所有 © 2022-${new Date().getFullYear()} 小莫 <br/> 
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="nopener norefoerrer" data-v-a41d4df4="">湘ICP备2021011453号-1</a>`,
        },
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        outline: {
            label: '页面导航'
        },
    },
    head: [
        [
            'link',
            {
                "rel": "icon",
                "href": "https://mod.3dmgame.com/static/upload/mod/202405/MOD663ed1e5509eb.png@webp",
            }
        ]
    ]
})
