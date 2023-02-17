import { createRouter, createWebHistory } from "vue-router";


const routes = [
    {
        // 控制面板 index 页面
        path: "/",
        name: "index",
        component: () => import("./Index/Index.vue"),
        children: [
            {
                // 首页
                path: "home",
                name: "home",
                component: () => import("./Index/home/Home.vue"),
            },
            {
                // 添加管理组
                path: "adminGroup",
                name: "adminGroup",
                component: () => import("./Index/adminGroup/AdminGroup.vue"),
            },
            {
                // 添加管理员
                path: "adminUser",
                name: "adminUser",
                component: () => import("./Index/adminUser/AdminUser.vue"),
            },
            {
                // 封禁
                path: "ban",
                name: "ban",
                component: () => import("./Index/ban/ban.vue"),
            },
            {
                // 游戏服务设置
                path: "gameServer",
                name: "gameServer",
                component: () => import("./Index/gameServer/GameServer.vue"),
                children: [
                    {
                        // 常规配置
                        path: "GSNormal",
                        name: "GSNormal",
                        component: () => import("./Index/gameServer/GSNormal/GSNormal.vue")
                    }
                ],
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
