import { defineConfig } from 'vitepress'

export const shared = defineConfig({
    title: "Gloss Mod Manager",

    themeConfig: {
        logo: "https://mod.3dmgame.com/static/upload/mod/202405/MOD663ed1e5509eb.png@webp",
        socialLinks: [
            { icon: 'github', link: 'https://github.com/GlossMod/Gloss-Mod-Manager-info' },
        ],
        search: {
            provider: 'local'
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
    ],
})