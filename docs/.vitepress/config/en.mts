import { defineConfig, type DefaultTheme } from 'vitepress'

export const en = defineConfig({
    lang: 'en',
    description: "A comprehensive modern game mod manager",

    themeConfig: {
        nav: [
            { text: 'Home', link: '/en/' },
            { text: 'Getting Started', link: '/en/README' }
        ],
        sidebar: [
            {
                text: 'Gloss Mod Manager',
                // collapsed: true,
                items: [
                    { text: "Introduction, Download & Install", link: "/en/README.md" },
                    { text: "Running and Using", link: "/en/Use.md" },
                    { text: "Installing & Uninstalling Mods", link: "/en/Install.md" },
                    { text: "Translate GMM Software", link: "/en/Translate.md" },
                    {
                        text: "Frequently Asked Questions",
                        collapsed: true,
                        items: [
                            { text: "Can't Start the Software", link: "/en/FQA/CantStart.md" },
                            { text: 'Can\'t Find the EXE Program', link: "/en/FQA/NotExe.md" },
                            { text: 'Mod Doesn\'t Work After Installation', link: "/en/FQA/NotWork.md" },
                            { text: 'Game Doesn\'t Respond or Gives an Error', link: "/en/FQA/NotStart.md" },
                            { text: "Unknown Mod Type", link: "/en/FQA/TypeUnknown.md" },
                            { text: "Download Error", link: "/en/FQA/DownloadError.md" },
                            { text: "Migrate Storage Location", link: "/en/FQA/MoveFolder.md" }
                        ]
                    },
                    {
                        text: "GMM Files",
                        collapsed: true,
                        items: [
                            { text: "Making GMM Files", link: "/en/GMMFile/Make.md" },
                            { text: "Opening GMM Files", link: "/en/GMMFile/Open.md" },
                        ]
                    },
                    {
                        text: "Game Compatibility",
                        collapsed: true,
                        items: [
                            { text: "Overview", link: "/en/Expands/README.md" },
                            {
                                text: "TS Compatibility (1.29.0 Version",
                                items: [
                                    { text: "Overview", link: "/en/Expands/TS/README.md" },
                                    { text: "Properties", link: "/en/Expands/Property.md" },
                                    { text: "Types", link: "/en/Expands/Type.md" },
                                ],
                                collapsed: true,
                            },
                            { text: "Developer Mode", link: "/en/Expands/Dev.md" },
                        ]
                    },
                    {
                        text: "How to Use Some Games",
                        collapsed: true,
                        items: [
                            { text: "GTA5", link: "/en/Use/GTA5.md" },
                            { text: "Cyberpunk 2077", link: "/en/Use/Cyberpunk2077.md" },
                            { text: "Resident Evil", link: "/en/Use/RERemake.md" },
                            { text: "Monster Hunter World", link: "/en/Use/MonsterHunterWorld.md" },
                            { text: "Monster Hunter Rise", link: "/en/Use/MonsterHunterRise.md" },
                            { text: "Elden Ring", link: "/en/Use/EldenRing.md" },
                            { text: "Baldur's Gate 3", link: "/en/Use/BaldursGate3" },
                            { text: "Red Dead Redemption 2", link: "/en/Use/RedDeadRedemption2.md" },
                            { text: "Palworld", link: "/en/Use/Palworld.md" },
                        ]
                    },
                    { text: "Collaboration", link: "/en/Cooperation.md" },
                    { text: "Feedback", link: "/en/Feedback.md" },
                ]
            },
        ],
        editLink: {
            text: "Edit this page on GitHub",
            pattern: 'https://github.com/GlossMod/Gloss-Mod-Manager-info/edit/main/docs/:path'
        },
        lastUpdated: {
            text: 'Last updated on',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },
        footer: {
            message: 'Published under GPL-3.0 License',
            copyright: `Copyright © 2023-${new Date().getFullYear()} By 小莫 <br/> `,
            // <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" data-v-a41d4df4="">湘ICP备2021011453号-1</a>`,
        },
        docFooter: {
            prev: 'Previous',
            next: 'Next'
        },
        outline: {
            label: 'Page Navigation'
        },
    }
})