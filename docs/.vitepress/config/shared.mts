import { defineConfig } from 'vitepress'

export const shared = defineConfig({
    title: "Gloss Mod Manager",
    ignoreDeadLinks: true,

    markdown: {
        theme: 'material-theme-palenight',
        lineNumbers: true,
    },

    themeConfig: {
        logo: "https://mod.3dmgame.com/static/upload/mod/202405/MOD663ed1e5509eb.png@webp",
        socialLinks: [
            { icon: 'github', link: 'https://github.com/GlossMod/Gloss-Mod-Manager-info' },
        ],
        search: {
            provider: 'local'
        },
        editLink: {
            pattern: 'https://github.com/GlossMod/Gloss-Mod-Manager-info/edit/main/docs/:path'
        },
    },
    head: [
        [
            'script',
            {
                async: "true",
                src: 'https://www.googletagmanager.com/gtag/js?id=G-L04H04RSS7',
            },
        ],
        [
            'script',
            {},
            "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-L04H04RSS7');",
        ],
        [
            'script',
            {},
            `var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?0fba1f3013c5565107a4b39759647150";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();`
        ],
        // [
        //     'script',
        //     {
        //         "async": "true",
        //         'src': 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5978423097771370',
        //     }
        // ],
        ['meta', { name: 'og:site_name', content: 'Gloss Mod Manager' }],
        ['meta', { name: 'og:locale', content: 'zh' }],
        ['meta', { name: 'og:type', content: 'website' }],
        ['meta', { name: 'theme-color', content: '#5f67ee' }],
        [
            'link',
            {
                "rel": "icon",
                "href": "https://mod.3dmgame.com/static/upload/mod/202405/MOD663ed1e5509eb.png@webp",
            }
        ],
        // [
        //     'script',
        //     {
        //         "src": "https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/0.1.0-beta.2/libs/oversea/index.js",
        //         "type": "text/javascript",
        //     }
        // ],
        // [
        //     'script',
        //     {},
        //     `new CozeWebSDK.WebChatClient({
        //         config: {
        //             bot_id: '7368057478376407045',
        //         },
        //         componentProps: {
        //             title: 'Coze',
        //         },
        //     });
        //   `
        // ]
    ],
})