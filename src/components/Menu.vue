<template>
    <!-- 控制面板 菜单栏 -->
    <nav>
        <div class="switch-box">
            <a-switch
                    :checked="state.theme === 'dark'"
                    checked-children="Dark"
                    un-checked-children="Light"
                    @change="changeTheme"
            />
        </div>
        <a-menu
                v-model:openKeys="state.openKeys"
                v-model:selectedKeys="state.selectedKeys"
                style="height: calc(100% - 50px)"
                mode="inline"
                :theme="state.theme"
                @select="selectHandle"
        >
            <a-menu-item key="home">
                <template #icon>
                    <home-outlined/>
                </template>
                首页
            </a-menu-item>
            <a-sub-menu key="admin">
                <template #icon>
                    <solution-outlined/>
                </template>
                <template #title>管理</template>
                <a-menu-item key="adminGroup">
                    <template #icon>
                        <usergroup-add-outlined/>
                    </template>
                    添加管理组
                </a-menu-item>
                <a-menu-item key="adminUser">
                    <template #icon>
                        <user-add-outlined/>
                    </template>
                    添加管理员
                </a-menu-item>
            </a-sub-menu>
            <a-menu-item key="ban">
                <template #icon>
                    <stop-outlined/>
                </template>
                封禁
            </a-menu-item>
            <a-menu-item key="gameServer">
                <template #icon>
                    <cloud-server-outlined/>
                </template>
                游戏服务设置
            </a-menu-item>
            <a-menu-item key="monitor">
                <template #icon>
                    <fund-view-outlined/>
                </template>
                监控
            </a-menu-item>
            <a-menu-item key="setting">
                <template #icon>
                    <setting-outlined/>
                </template>
                面板设置
            </a-menu-item>
            <a-menu-item key="exit">
                <template #icon>
                    <export-outlined/>
                </template>
                退出
            </a-menu-item>
        </a-menu>
    </nav>
</template>

<script setup>
import {reactive, watch} from 'vue';
import {
    CloudServerOutlined,
    ExportOutlined,
    FundViewOutlined,
    HomeOutlined,
    SettingOutlined,
    SolutionOutlined,
    StopOutlined,
    UserAddOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons-vue'
import {useRoute, useRouter} from "vue-router";
import {useThemeStore} from "../store/useThemeStore.js";


// 实例化路由
const router = useRouter()
const route = useRoute()
// 实例化切换主题仓库
const themeStore = useThemeStore()



/*
*
* 菜单功能
*
* */

// 菜单的状态
const state = reactive({
    theme: 'light',
    // 当前选中的菜单项 key 数组  初始值就是路由的名字
    selectedKeys: [route.name],
    // 当前展开的 SubMenu 菜单项 key 数组
    openKeys: [],
});


// 菜单选择改变 回调
function selectHandle({item, key, selectedKeys}) {
    console.log(key)
    router.push({
        name: key
    })
}

// 监听路由的变化
watch(route,(value, oldValue)=>{
    // 修改路由状态
    state.selectedKeys = [value.name]
})



/*
*
* 主题功能
*
* */

// 切换主题
const changeTheme = checked => {
    // state.theme = checked ? 'dark' : 'light';

    // 切换主题
    themeStore.switchTheme()
};

// 订阅切换主题仓库
themeStore.$subscribe((mutation, stateStore)=>{
    // 改变菜单的主题
    state.theme = stateStore.isTheme
})
</script>

<style scoped lang="less">
// nav
nav {
    height: 100%;


    // 切换主题按钮 box
    .switch-box {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--body-background) !important;
    }
}
</style>
