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
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router