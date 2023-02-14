<template>
    <router-view></router-view>
</template>

<script setup>
import {setPropertyTheme} from "./hooks/setPropertyTheme.js";
import {useThemeStore} from "./store/useThemeStore.js";

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
themeStore.$subscribe((mutation, state)=>{
    // 改变主题
    setPropertyTheme(state.isTheme)
})



</script>

<style lang="less">

</style>
