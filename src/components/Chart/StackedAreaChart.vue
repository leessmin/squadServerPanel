<template>
	<!-- 网络的echarts -->
	<div class="chart" ref="chart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useThemeStore } from '../../store/useThemeStore';
// 引入default-passive-events
import 'default-passive-events';
import SubjectChart from './SubjectChart';



// 实例化主题仓库
const themeStore = useThemeStore()
// 实例化props
interface Props {
	uploadSpeed: number,
	downloadSpeed: number,
	thenTime: string
}
const props = defineProps<Props>()


// 获取chart
let chart = ref<HTMLElement>()
// 默认配置
let optionDefault: echarts.EChartOption = {
	title: {
		show: false,
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'cross',
			label: {
				backgroundColor: '#6a7985'
			}
		}
	},
	legend: {
		show: false,
		data: ['上行', '下行']
	},
	grid: {
		height: 200,
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: [
		{
			type: 'category',
			boundaryGap: false,
			axisLabel: {
				color: themeStore.themeColor.get('--text-color')
			},
			data: [],
		}
	],
	yAxis: [
		{
			type: 'value',
			name: "单位Mb",
			nameTextStyle: {
				color: themeStore.themeColor.get('--text-color')
			},
			axisLabel: {
				color: themeStore.themeColor.get('--text-color')
			},
		}
	],
	series: [
		{
			name: '上行',
			type: 'line',
			areaStyle: {
				color: "#f7b54a"
			},
			lineStyle: {
				color: "#f7b54a"
			},
			itemStyle: {
				color: "#f7b54a"
			},
			data: [],
		},
		{
			name: '下行',
			type: 'line',
			areaStyle: {
				color: "#5caeff"
			},
			lineStyle: {
				color: "#5caeff"
			},
			itemStyle: {
				color: "#5caeff"
			},
			data: [],
		},
	]
};
// 储存 设置图表的对象
let myChart: SubjectChart<echarts.EChartOption>

// 加载 echarts 图表
onMounted(() => {
	// 初次加载
	myChart = new SubjectChart(optionDefault, chart.value as HTMLElement)
})


// 数组 储存元素
let uploadArr: number[] = []
let downloadArr: number[] = []
let thenArr: string[] = []

// 监听props
watch(props, (value) => {
	// 入栈
	uploadArr.push(value.uploadSpeed)
	downloadArr.push(value.downloadSpeed)
	thenArr.push(value.thenTime)

	// 判读长度是否大于15
	if (uploadArr.length > 15 || downloadArr.length > 15 || thenArr.length > 15) {
		// 大于15 第一个元素要出栈
		uploadArr.shift()
		downloadArr.shift()
		thenArr.shift()
	}


	// 更新图表
	myChart.setOption((option: echarts.EChartOption) => {
		(option.series as echarts.EChartOption.Series[])[0].data = uploadArr;
		(option.series as echarts.EChartOption.Series[])[1].data = downloadArr;
		(option.xAxis as echarts.EChartOption.XAxis[])[0].data = thenArr;
		return option
	})
})


// 订阅主题仓库状态
themeStore.$subscribe((mutation, state) => {
	// 刷新 主题
	myChart.setOption((option: echarts.EChartOption) => {
		(option.xAxis as echarts.EChartOption.XAxis[])[0].axisLabel!.color = state.themeColor.get('--text-color');
		(option.yAxis as echarts.EChartOption.YAxis[])[0].axisLabel!.color = state.themeColor.get('--text-color');
		(option.yAxis as echarts.EChartOption.YAxis[])[0].nameTextStyle!.color = state.themeColor.get('--text-color');
		return option
	})
})



// 监听页面改变
window.addEventListener("resize", windowResize)

let timer: number | null = null
function windowResize() {
	if (timer != null) {
		clearTimeout(timer)
	}

	timer = window.setTimeout(() => {
		// 重绘图表
		myChart.resize()

	}, 500);
}

// 组件销毁，移除监听
onBeforeUnmount(() => {
	// 组件销毁了
	window.removeEventListener("resize", windowResize)
})
</script>

<style scoped lang="less">
.chart {
	width: 100%;
	height: 100%;
}
</style>