<template>
	<!-- 控制面板 菜单栏 -->
	<nav>
		<div class="switch-box">
			<a-switch :checked="menuState.theme === 'dark'" checked-children="Dark" un-checked-children="Light"
				@change="changeTheme" />
		</div>
		<a-menu v-model:openKeys="menuState.openKeys" v-model:selectedKeys="menuState.selectedKeys"
			style="height: calc(100% - 50px)" mode="inline" :theme="menuState.theme" @select="selectHandle">
			<a-menu-item key="home">
				<template #icon>
					<home-outlined />
				</template>
				首页
			</a-menu-item>
			<a-sub-menu key="admin">
				<template #icon>
					<solution-outlined />
				</template>
				<template #title>管理</template>
				<a-menu-item key="adminGroup">
					<template #icon>
						<usergroup-add-outlined />
					</template>
					添加管理组
				</a-menu-item>
				<a-menu-item key="adminUser">
					<template #icon>
						<user-add-outlined />
					</template>
					添加管理员
				</a-menu-item>
			</a-sub-menu>
			<a-menu-item key="ban">
				<template #icon>
					<stop-outlined />
				</template>
				封禁
			</a-menu-item>
			<a-menu-item key="gameServer">
				<template #icon>
					<cloud-server-outlined />
				</template>
				游戏服务设置
			</a-menu-item>
			<!-- TODO:监控
				<a-menu-item key="monitor">
                <template #icon>
                    <fund-view-outlined />
                </template>
                监控
            </a-menu-item>
			-->
			<a-menu-item key="log">
				<template #icon>
					<file-protect-outlined />
				</template>
				日志
			</a-menu-item>
			<a-menu-item key="setting">
				<template #icon>
					<setting-outlined />
				</template>
				面板设置
			</a-menu-item>
			<a-menu-item key="exit">
				<template #icon>
					<export-outlined />
				</template>
				退出
			</a-menu-item>
		</a-menu>
	</nav>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useThemeStore } from '../../../store/useThemeStore';
import { exitPanel } from '../../../util/exitPanel/exitPanel';


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
const menuState = reactive({
	theme: 'light',
	// 当前选中的菜单项 key 数组  初始值就是路由的名字
	selectedKeys: [route.name],
	// 当前展开的 SubMenu 菜单项 key 数组
	openKeys: [],
});


// 菜单选择改变 回调
function selectHandle(args: { item: string, key: string, selectedKeys: string }) {

	// 判断key是否为 exit
	if (args.key == "exit") {
		// 退出登录
		exitPanel()
		return
	}

	console.log(args.key)
	// 跳转至对应的页面
	router.push({
		name: args.key
	})
}

// 监听路由的变化
watch(route, (value, oldValue) => {
	// 修改路由状态
	menuState.selectedKeys = [value.name]
})


/*
*
* 主题功能
*
* */

// 切换主题
const changeTheme = (checked: string) => {
	// state.theme = checked ? 'dark' : 'light';

	// 切换主题
	themeStore.switchTheme()
};

// 订阅切换主题仓库
themeStore.$subscribe((mutation, stateStore) => {
	// 改变菜单的主题
	menuState.theme = stateStore.isTheme
})

</script>

<style scoped lang="less">
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