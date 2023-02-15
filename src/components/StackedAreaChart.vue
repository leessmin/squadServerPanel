<template>
    <div class="chart" ref="chart"></div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import * as echarts from 'echarts';
import {useThemeStore} from "../store/useThemeStore.js";
// 引入default-passive-events
import 'default-passive-events';


// 实例化主题仓库
const themeStore = useThemeStore()
// 实例化props
const props = defineProps(['uploadSpeed', 'downloadSpeed', 'thenTime'])


// 获取chart
let chart = ref()

// 配置
let option = {
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
            emphasis: {
                focus: 'series'
            },
            data: [],
            color: "#f7b54a",
        },
        {
            name: '下行',
            type: 'line',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [],
            color: "#5caeff"
        },
    ]
};

// 声明 储存 myChart变量
let myChart

onMounted(() => {
    // console.log(chart.value)
    myChart = echarts.init(chart.value);

    myChart.setOption(option)
})


// 数组 储存元素
let uploadArr = []
let downloadArr = []
let thenArr = []

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
    option.series[0].data = uploadArr
    option.series[1].data = downloadArr
    option.xAxis[0].data = thenArr

    // 更新chart
    myChart.setOption(option)
})


// 订阅主题仓库状态
themeStore.$subscribe((mutation, state) => {
    option.xAxis[0].axisLabel.color = state.themeColor.get('--text-color')
    option.yAxis[0].axisLabel.color = state.themeColor.get('--text-color')
    option.yAxis[0].nameTextStyle.color = state.themeColor.get('--text-color')

    myChart.setOption(option)
})

</script>

<style scoped lang="less">
.chart {
    width: 100%;
    height: 100%;
}
</style>
