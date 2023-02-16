<template>
    <a-config-provider :locale="locale">
        <router-view></router-view>
    </a-config-provider>
</template>

<script setup>
import { setPropertyTheme } from "./hooks/setPropertyTheme.js";
import { useThemeStore } from "./store/useThemeStore.js";
import 'dayjs/locale/zh-cn';
import locale from 'ant-design-vue/lib/locale-provider/zh_CN';








// 实例化主题仓库
const themeStore = useThemeStore()



/*
*
*  主题功能
*
* */

// 初次加载页面就使用主题
setPropertyTheme(themeStore.isTheme)

// 订阅主题仓库
themeStore.$subscribe((mutation, state) => {
    // 改变主题
    setPropertyTheme(state.isTheme)
})



</script>

<style lang="less">

</style>
