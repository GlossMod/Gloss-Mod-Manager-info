import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: () => import("@/views/Home/Index.vue"),
        },
        {
            path: "/Manager",
            name: "Manager",
            component: () => import("@/views/Manager/Index.vue"),
        },
        {
            path: "/Backup",
            name: "Backup",
            component: () => import("@/views/Backup/Index.vue"),
        },
        {
            path: "/Games",
            name: "Games",
            component: () => import("@/views/Games/Index.vue"),
        },
        {
            path: "/Explore",
            name: "Explore",
            component: () => import("@/views/Explore/Index.vue"),
            children: [
                {
                    path: "GlossMod/:modId",
                    name: "GlossModContent",
                    component: () => import("@/views/Explore/GlossMod/Content/Content.vue"),
                },
                {
                    path: "ModIo/:modId",
                    name: "ModIoModsContent",
                    component: () => import("@/views/Explore/ModIo/Content/Content.vue")
                },
                {
                    path: "Thunderstore/:namespace/:name/:version",
                    name: "ThunderstoreModsContent",
                    component: () => import("@/views/Explore/Thunderstore/Content/Content.vue")
                },
                {
                    path: "SteamWorkshop/:workshopId",
                    name: "SteamWorkshop",
                    component: () => import("@/views/Explore/SteamWorkshop/Content/Content.vue")
                },
                {
                    path: "CurseForge/:CurseForgeModId",
                    name: "CurseForgeContent",
                    component: () => import("@/views/Explore/CurseForge/Content/Content.vue")
                },
                {
                    path: "GameBanana/:GameBananaModId",
                    name: "GameBananaContent",
                    component: () => import("@/views/Explore/GameBanana/Content/Content.vue")
                }
            ]
        },
        {
            path: "/Download",
            name: "Download",
            component: () => import("@/views/Download/Index.vue"),
        },
        {
            path: "/Settings",
            name: "Settings",
            component: () => import("@/views/Settings/Index.vue"),
        },
        {
            path: "/About",
            name: "About",
            component: () => import("@/views/About/Index.vue"),
        },
        {
            path: "/User",
            name: "User",
            component: () => import("@/views/User/Index.vue"),
        }
    ]
});

// 切换路由时，滚动到顶部
router.afterEach(() => {
    window.scrollTo(0, 0);
});

export default router;