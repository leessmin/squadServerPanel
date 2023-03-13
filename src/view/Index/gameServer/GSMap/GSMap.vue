<template>
    <!-- 地图循环 -->
    <a-menu v-model:selectedKeys="current" :theme="isTheme" mode="horizontal">
        <a-menu-item key="LevelList">
            LevelList
        </a-menu-item>
        <a-menu-item key="LayerList">
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

// 实例化主题仓库
const themeStore = useThemeStore()

// 主题颜色
let isTheme = ref<ThemeType>(themeStore.isTheme)

// 订阅主题仓库
themeStore.$subscribe((mutation, state) => {
    console.log(state.isTheme);
    isTheme.value = state.isTheme
})


// 假数据
let selectedLevelList = ['AlBasrah', 'Belaya', 'Chora', 'Fallujah', 'FoolsRoad']
let selectedLayer = ['Al Basrah TC v1', 'Al Basrah TC v1', "Fool's Road Skirmish v1", 'Gorodok AAS v2', "Jensen's Range v1"]
// 未选中的地图
let selectLevelList = ['Yehorivka', 'Tallil', 'Sumari', 'Skorpo']
let selectLayer = ['Al Basrah AAS v1', 'Al Basrah Invasion v2', 'Al Basrah Skirmish v2', 'Al Basrah TC v1', 'Al Basrah TC v1', 'Al Basrah TC v1', 'Al Basrah TC v1']
// map数据
let mapArr: Ref<Map<string, string[]>> = ref(new Map())
mapArr.value.set('selected', selectedLevelList)
mapArr.value.set('select', selectLevelList)



// 选择框选中元素的类型
type currentType = 'LevelList' | 'LayerList'
// 选择框选择的元素
const current = ref<currentType[]>(['LevelList']);

// 监听选择框的元素
watch(current, (newVal, oldVal) => {
    if (newVal[0] === 'LevelList') {
        mapArr.value.set('selected', selectedLevelList)
        mapArr.value.set('select', selectLevelList)
    } else if (newVal[0] === 'LayerList') {
        mapArr.value.set('selected', selectedLayer)
        mapArr.value.set('select', selectLayer)
    }
})



// 保存地图选项
const saveMapHandle = (data: string[]) => {
    // TODO： 通过data发送请求
    console.log(data);
}
</script>

<style scoped lang="less">
.map-box {
    width: 100%;
    height: calc(100vh - 200px);
    padding: 20px;
}
</style>