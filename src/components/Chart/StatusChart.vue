<template>
    <!-- 状态的echarts -->
    <div class="chart" ref="chart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref, watch } from 'vue';
import { useThemeStore } from '../../store/useThemeStore';
// 引入default-passive-events
import 'default-passive-events';
import SubjectChart from './SubjectChart'

// 实例化主题仓库
const themeStore = useThemeStore()
// 实例化props
interface Props {
    chartValue: number
    charName: string
}
const props = defineProps<Props>()



// Chart的配置
let optionDefault: echarts.EChartsOption = {
    series: [
        {
            type: 'gauge',
            radius: '90%',
            startAngle: 90,
            endAngle: -270,
            pointer: {
                show: false
            },
            progress: {
                show: true,
                overlap: false,
                roundCap: true,
                clip: false,
                itemStyle: {
                    borderWidth: 1,
                    borderColor: themeStore.themeColor.get("--ant-primary-color"),
                    color: themeStore.themeColor.get("--ant-primary-color")
                }
            },
            axisLine: {
                lineStyle: {
                    color: [
                        [1, (themeStore.themeColor.get("--border-color-base") as string)], // 0~10% 红轴
                    ],
                    width: 4
                }
            },
            splitLine: {
                show: false,
                length: 10
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false,
                distance: 50
            },
            // 数据存放地址
            data: [
                {
                    value: props.chartValue,
                    name: props.charName,
                    detail: {
                        valueAnimation: true,
                        offsetCenter: ['0%', '0%']
                    }
                },
            ],
            title: {
                // 不显示id
                show: false,
            },
            detail: {
                width: 20,
                height: 14,
                fontSize: 20,
                color: themeStore.themeColor.get("--ant-primary-color"),
                // borderColor: 'inherit',
                // borderRadius: 20,
                // borderWidth: 1,
                formatter: '{value}%'

            }
        }
    ]
};

// 获取chart
const chart = ref<HTMLElement>()

// 储存 设置图表的对象
let myChart: SubjectChart<echarts.EChartsOption>

// 加载 echarts 图表
onMounted(() => {
    // 初次加载
    myChart = new SubjectChart(optionDefault, chart.value as HTMLElement)
})


// 监听props
watch(props, (value, oldValue) => {
    // 更新数据
    myChart.setOption((option: echarts.EChartsOption) => {
        let optionTemp: echarts.EChartsOption = {
            series: [
                {
                    data: [
                        {
                            value: value.chartValue,
                            name: value.charName,
                            detail: {
                                valueAnimation: true,
                                offsetCenter: ['0%', '0%']
                            }
                        },
                    ],
                }
            ]
        };
        return optionTemp;
    })
})

// 订阅主题仓库
themeStore.$subscribe((mutation, state) => {
    // 更新主题
    myChart.setOption((option: echarts.EChartsOption) => {
        // 更新主题
        let tempOption: echarts.EChartsOption = {
            series: [
                {
                    progress: {
                        itemStyle: {
                            borderColor: state.themeColor.get("--ant-primary-color"),
                            color: state.themeColor.get("--ant-primary-color")
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: [
                                [1, state.themeColor.get("--border-color-base") as string], // 0~10% 红轴
                            ],
                        }
                    },
                    detail: {
                        color: state.themeColor.get("--ant-primary-color"),
                    }
                }
            ]
        }

        return tempOption
    })
})
</script>

<style scoped lang="less">
.chart {
    width: 140px;
    height: 140px;
}
</style>
