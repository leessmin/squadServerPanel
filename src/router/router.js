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
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
