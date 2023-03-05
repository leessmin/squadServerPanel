<template>
    <!-- 网络的echarts -->
    <div class="chart" ref="chart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref, watch } from 'vue';
import { useThemeStore } from '../../store/useThemeStore';
// 引入default-passive-events
import 'default-passive-events';



// 实例化主题仓库
const themeStore = useThemeStore()
interface Props {
    uploadSpeed: number,
    downloadSpeed: number,
    thenTime: string
}
// 实例化props
const props = defineProps<Props>()


// 获取chart
let chart = ref<HTMLElement>()

// 配置
let option: echarts.EChartOption = {
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
            name: "单位kb/s",
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
            areaStyle: {},
            data: [],
        },
        {
            name: '下行',
            type: 'line',
            areaStyle: {},
            emphasis: {

            },
            data: [],
        },
    ]
};

// 声明 储存 myChart变量
let myChart: echarts.EChartsType

onMounted(() => {
    // console.log(chart.value)
    myChart = echarts.init(chart.value as HTMLElement);

    myChart.setOption(option)
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
        // 大于15第一个元素要出栈
        uploadArr.shift()
        downloadArr.shift()
        thenArr.shift()
    }


    // 更新option
    (option.series as echarts.EChartOption.Series[])[0].data = uploadArr;
    (option.series as echarts.EChartOption.Series[])[1].data = downloadArr;
    (option.xAxis as echarts.EChartOption.XAxis[])[0].data = thenArr;

    // 更新chart
    myChart.setOption(option)
})


// 订阅主题仓库状态
themeStore.$subscribe((mutation, state) => {
    // 刷新 主题
    (option.xAxis as echarts.EChartOption.XAxis[])[0].axisLabel!.color = state.themeColor.get('--text-color');
    (option.yAxis as echarts.EChartOption.YAxis[])[0].axisLabel!.color = state.themeColor.get('--text-color');
    (option.yAxis as echarts.EChartOption.YAxis[])[0].nameTextStyle!.color = state.themeColor.get('--text-color');

    myChart.setOption(option)
})
</script>

<style scoped lang="less">
.chart {
    width: 100%;
    height: 100%;
}
</style>