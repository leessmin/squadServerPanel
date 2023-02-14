import {createRouter, createWebHistory} from "vue-router";


const routes = [
    {
        // 控制面板 index 页面
        path: "/",
        name: "index",
        component: () => import("./Index/Index.vue"),
        children: [
            {
                path: "home",
                name: "home",
                component:()=> import("./Index/home/Home.vue"),
            },
            {
                path: "adminGroup",
                name: "adminGroup",
                component:()=> import("./Index/home/Home.vue"),
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
