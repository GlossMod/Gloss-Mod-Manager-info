import { defineConfig, type DefaultTheme } from 'vitepress'


export const zh = defineConfig({
    lang: 'zh-Hans',
    description: "一款综合性的现代化游戏模组管理器",

    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '开始使用', link: '/README' }
        ],
        sidebar: [
            {
                text: 'Gloss Mod Manager',
                // collapsed: true,
                items: [
                    { text: "介绍、下载与安装", link: '/README.md' },
                    { text: "运行和使用", link: "/Use.md" },
                    { text: "安装与卸载Mod", link: "/Install.md" },
                    { text: "支持的游戏", link: "/SupportedGames.md" },
                    { text: "翻译软件 | Translate GMM", link: "/Translate.md" },
                    {
                        text: "常见问题",
                        collapsed: true,
                        items: [
                            { text: "无法启动软件", link: "/FQA/CantStart.md" },
                            { text: '没有找到程序的EXE程序', link: "/FQA/NotExe.md" },
                            { text: 'Mod安装后没有效果', link: "/FQA/NotWork.md" },
                            { text: '启动游戏没反应或报错', link: "/FQA/NotStart.md" },
                            { text: "Mod类型未知", link: "/FQA/TypeUnknown.md" },
                            { text: "下载错误", link: "/FQA/DownloadError.md" },
                            { text: "迁移储存位置", link: "/FQA/MoveFolder.md" }
                        ]
                    },
                    {
                        text: "GMM文件",
                        collapsed: true,
                        items: [
                            { text: "制作GMM文件", link: "/GMMFile/Make.md" },
                            { text: "打开GMM文件", link: "/GMMFile/Open.md" },
                        ]
                    },
                    {
                        text: "游戏适配",
                        collapsed: true,
                        items: [
                            { text: "概览", link: "/Expands/README.md" },
                            { text: "TS适配 (1.29.0版本", link: "/Expands/TS.md" },
                            { text: "JSON适配 (1.36.0版本", link: "/Expands/JSON.md" },
                            { text: "属性", link: "/Expands/Property.md" },
                            { text: "类型", link: "/Expands/Type.md" },
                            { text: "开发者模式", link: "/Expands/Dev.md" },
                        ]
                    },
                    {
                        text: "一些游戏的使用方法",
                        collapsed: true,
                        items: [
                            { text: "GTA5", link: "/Use/GTA5.md" },
                            { text: "赛博朋克2077", link: "/Use/Cyberpunk2077.md" },
                            { text: "生化危机", link: "/Use/RERemake.md" },
                            { text: "怪物猎人世界", link: "/Use/MonsterHunterWorld.md" },
                            { text: "怪物猎人崛起", link: "/Use/MonsterHunterRise.md" },
                            { text: "艾尔登法环", link: "/Use/EldenRing.md" },
                            { text: "博德之门3", link: "/Use/BaldursGate3" },
                            { text: "荒野大镖客2", link: "/Use/RedDeadRedemption2.md" },
                            { text: "幻兽帕鲁", link: "/Use/Palworld.md" },
                        ]
                    },
                    { text: "合作", link: "/Cooperation.md" },
                    { text: "反馈", link: "/Feedback.md" },
                ]
            },
        ],
        editLink: {
            text: "在GitHub上编辑此页面",
            pattern: 'https://github.com/GlossMod/Gloss-Mod-Manager-info/edit/main/docs/:path'
        },
        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },
        footer: {
            message: '基于 GPL-3.0 许可发布',
            copyright: `版权所有 © 2023-${new Date().getFullYear()} By 小莫 <br/> `,
            // <a href="https://beian.miit.gov.cn/" target="_blank" rel="nopener norefoerrer" data-v-a41d4df4="">湘ICP备2021011453号-1</a>`,
        },
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        outline: {
            label: '页面导航'
        },
        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式'
    }
})
