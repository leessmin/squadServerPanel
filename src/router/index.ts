import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: readonly RouteRecordRaw[] = [
    {
        // 控制面板 index 页面
        path: "/",
        name: "index",
        component: () => import("../view/Index/Index.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router