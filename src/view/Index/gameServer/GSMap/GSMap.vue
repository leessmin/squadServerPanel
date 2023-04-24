<template>
	<!-- 地图循环 -->
	<a-menu v-model:selectedKeys="current" :theme="isTheme" mode="horizontal">
		<a-menu-item key="Level">
			LevelList
		</a-menu-item>
		<a-menu-item key="Layer">
			LayerList
		</a-menu-item>
	</a-menu>

	<div class="map-box">
		<MapComponents @saveMap="saveMapHandle" :mapArr="mapArr"></MapComponents>
	</div>
</template>

<script setup lang="ts">
import MapComponents from './components/MapComponents.vue';
import { Ref, ref, watch } from 'vue';
import { useThemeStore } from '../../../../store/useThemeStore';
import { ThemeType } from '../../../../type/theme/theme';
import { useSquadServerStore } from '../../../../store/useSquadServerStore';


// 实例化主题仓库
const themeStore = useThemeStore()

// 主题颜色
let isTheme = ref<ThemeType>(themeStore.isTheme)

// 订阅主题仓库
themeStore.$subscribe((mutation, state) => {
	console.log(state.isTheme);
	isTheme.value = state.isTheme
})



// map的数据
let mapArr: Ref<Map<string, string[]>> = ref(new Map([
	["selected", []],
	["select", []]
]))


// 选择框选中元素的类型
type currentType = 'Level' | 'Layer'
// 选择框选择的元素
const current = ref<currentType[]>(['Level']);

// 监听选择框的元素
watch(current, (newVal, oldVal) => {
	SquadStore.getSquadMap(newVal[0])
})



// 保存地图选项
const saveMapHandle = (data: string[]) => {
	// 发送请求
	SquadStore.saveSquadMap(current.value[0], data)
}



// 实例化仓库
const SquadStore = useSquadServerStore()
SquadStore.getSquadMap(current.value[0])

// 订阅仓库
SquadStore.$subscribe((mutation, state) => {
	mapArr.value.set('selected', state.squadMap?.mapSelected as string[])
	mapArr.value.set('select', state.squadMap?.mapSelect as string[])
})
</script>

<style scoped lang="less">
.map-box {
	width: 100%;
	height: calc(100vh - 200px);
	padding: 20px;
}
</style>