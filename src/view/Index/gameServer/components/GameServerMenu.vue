<template>
    <!-- 游戏服务设置 menu -->
    <a-menu mode="horizontal" @select="selectHandle" :theme="isTheme" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="GSNormal">
            <template #icon>
                <control-outlined />
            </template>
            常规配置
        </a-menu-item>
        <a-menu-item key="GSMap">
            <template #icon>
                <retweet-outlined />
            </template>
            地图循环
        </a-menu-item>
        <a-menu-item key="GSDayMessage">
            <template #icon>
                <mail-outlined />
            </template>
            每日消息
        </a-menu-item>
        <a-menu-item key="GSCycleAnnouncement">
            <template #icon>
                <exception-outlined />
            </template>
            循环公告
        </a-menu-item>
        <a-menu-item key="GSLicence">
            <template #icon>
                <file-outlined />
            </template>
            许可证
        </a-menu-item>
    </a-menu>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useThemeStore } from '../../../../store/useThemeStore';
import { ThemeType } from '../../../../type/theme/theme';

// 实例化路由
const router = useRouter()
const route = useRoute()

// 实例化主题仓库
const themeStore = useThemeStore()

let isTheme = ref<ThemeType>(themeStore.isTheme)

// 订阅主题仓库
themeStore.$subscribe((mutation, state) => {
    console.log(state.isTheme);
    isTheme.value = state.isTheme
})



// 导航栏选择的key
const selectedKeys = ref([route.name])

// 菜单选择改变 回调
function selectHandle(args: { item: string, key: string, selectedKeys: string }) {
    console.log(args.key);
    router.push({
        name: args.key
    })
}



// 监听路由
watch(route, (value) => {
    console.log(value);
    selectedKeys.value = [value.name]
})
</script>

<style scoped lang="less"></style>