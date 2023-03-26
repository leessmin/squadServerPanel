import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: readonly RouteRecordRaw[] = [
    {
        // 控制面板 index 页面
        path: "/",
        name: "index",
        component: () => import("../view/Index/Index.vue"),
        // 重定向
        redirect: { name: 'home' },
        children: [
            {
                // 首页
                path: "home",
                name: "home",
                component: () => import("../view/Index/home/Home.vue")
            },
            {
                // 添加管理组
                path: "adminGroup",
                name: "adminGroup",
                component: () => import("../view/Index/adminGroup/AdminGroup.vue")
            },
            {
                // 添加管理员
                path: "adminUser",
                name: "adminUser",
                component: () => import("../view/Index/adminUser/AdminUser.vue")
            },
            {
                // 封禁
                path: "ban",
                name: "ban",
                component: () => import("../view/Index/ban/Ban.vue")
            },
            {
                // 游戏服务设置
                path: "gameServer",
                name: "gameServer",
                component: () => import("../view/Index/gameServer/GameServer.vue"),
                // 重定向
                redirect: { name: "GSNormal" },
                children: [
                    {
                        // 常规配置
                        path: "GSNormal",
                        name: "GSNormal",
                        component: () => import("../view/Index/gameServer/GSNormal/GSNormal.vue")
                    },
                    {
                        // 地图循环
                        path: "GSMap",
                        name: "GSMap",
                        component: () => import("../view/Index/gameServer/GSMap/GSMap.vue")
                    },
                    {
                        // 每日消息
                        path: "GSDayMessage",
                        name: "GSDayMessage",
                        component: () => import("../view/Index/gameServer/GSDayMessage/GSDayMessage.vue")
                    },
                    {
                        // 循环公告
                        path: "GSCycleAnnouncement",
                        name: "GSCycleAnnouncement",
                        component: () => import("../view/Index/gameServer/GSCycleAnnouncement/GSCycleAnnouncement.vue")
                    },
                    {
                        // 许可证
                        path: "GSLicence",
                        name: "GSLicence",
                        component: () => import("../view/Index/gameServer/GSLicence/GSLicence.vue")
                    }
                ]
            },
            {
                // 监控
                path: "monitor",
                name: "monitor",
                component: () => import("../view/Index/monitor/Monitor.vue")
            },
            {
                // 日志
                path: "log",
                name: "log",
                component: () => import('../view/Index/log/Log.vue')
            },
            {
                // 设置
                path: "setting",
                name: "setting",
                component: () => import("../view/Index/setting/Setting.vue")
            }
        ]
    },
    {
        // 登录页面
        path: "/login",
        name: "login",
        component: () => import("../view/Login/Login.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router