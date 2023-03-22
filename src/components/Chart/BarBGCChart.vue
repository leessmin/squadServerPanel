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


// 实例化仓库
const themeStore = useThemeStore()


// 获取系统 平均负载
let chart = ref<HTMLElement>()
// 配置
let optionDefault: echarts.EChartsOption = {
    xAxis: {
        type: 'category',
        data: ['03/01', '03/02', '03/03', '03/04', '03/05', '03/06', '03/07', '03/08', '03/10', '03/11', '03/12', '03/13', '03/14', '03/15', '03/16', '03/17', '03/18', '03/19', '03/20', '03/21', '03/22', '03/23', '03/24', '03/25', '03/26', '03/27', '03/28', '03/29', '03/30'],
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
            data: [10, 88, 66, 70, 70, 40, 55, 10, 88, 66, 70, 70, 40, 55, 10, 88, 66, 70, 70, 40, 55, 10, 88, 66, 70, 70, 40, 55, 55],
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