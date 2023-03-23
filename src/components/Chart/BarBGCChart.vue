<template>
    <!-- 带背景色的柱状图  目前只在监控中使用 -->
    <div class="chart" ref="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
// 引入default-passive-events
import 'default-passive-events';
import SubjectChart from './SubjectChart';
import { useThemeStore } from '../../store/useThemeStore';
import { MonitorBarType } from '../../type/monitor/monitor';


// 实例化仓库
const themeStore = useThemeStore()


// 定义接收props
const props = defineProps<{
    // 系统运行的数据
    chartData: MonitorBarType
}>()


// 获取系统 平均负载
let chart = ref<HTMLElement>()
// 配置
let optionDefault: echarts.EChartsOption = {
    xAxis: {
        type: 'category',
        data: props.chartData.date,
        axisLabel: {
            color: themeStore.themeColor.get('--text-color')
        }
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            color: themeStore.themeColor.get('--text-color')
        }
    },
    series: [
        {
            data: props.chartData.data,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            },
            itemStyle: {
                color: themeStore.themeColor.get('--ant-primary-color')
            }
        }
    ]
};
// 储存 echarts
let myChart: SubjectChart<echarts.EChartsOption>;

// 初次 加载图表
onMounted(() => {
    // 初次加载
    myChart = new SubjectChart(optionDefault, chart.value as HTMLElement)
})

// 订阅主题仓库
themeStore.$subscribe((mutation, state) => {
    // 更新图表的颜色
    myChart.setOption((option: echarts.EChartsOption) => {

        let optionTemp: echarts.EChartsOption = {
            xAxis: {
                axisLabel: {
                    color: themeStore.themeColor.get('--text-color')
                }
            },
            yAxis: {
                axisLabel: {
                    color: themeStore.themeColor.get('--text-color')
                }
            },
            series: [
                {
                    itemStyle: {
                        color: themeStore.themeColor.get('--ant-primary-color')
                    }
                }
            ]
        }

        return optionTemp
    })
})
</script>

<style scoped lang="less">
.chart {
    width: 100%;
    height: 100%;
}
</style>