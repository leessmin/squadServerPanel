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
}
const props = defineProps<Props>()

// 数据
const Data = [
    {
        value: props.chartValue,
        name: 'cpu',
        detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '0%']
        }
    },
];

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
            data: Data,
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

// 储存图标类
let myChart: SubjectChart<echarts.EChartsOption>

// 初始化myChart
onMounted(() => {
    /* myChart = echarts.init(chart.value as HTMLElement)
    myChart.setOption(option) */
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
                            name: 'cpu',
                            detail: {
                                valueAnimation: true,
                                offsetCenter: ['0%', '0%']
                            }
                        },
                    ],
                    pointer: {
                        show: false
                    }
                }
            ]
        };
        return optionTemp;
    })
    // 更新option
    // option.series[0].data[0].value = value.chartValue
    // // 更新数据
    // myChart.setOption(option)
})

// 订阅主题仓库
themeStore.$subscribe((mutation, state) => {
    // 更新主题
    let tempOption = {
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
                        borderColor: state.themeColor.get("--ant-primary-color"),
                        color: state.themeColor.get("--ant-primary-color")
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: [
                            [1, state.themeColor.get("--border-color-base")], // 0~10% 红轴
                        ],
                        width: 4
                    }
                },
                splitLine: {
                    show: false,
                    distance: 0,
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
                data: Data,
                title: {
                    // 不显示id
                    show: false,
                },
                detail: {
                    width: 20,
                    height: 14,
                    fontSize: 20,
                    color: state.themeColor.get("--ant-primary-color"),
                    // borderColor: 'inherit',
                    // borderRadius: 20,
                    // borderWidth: 1,
                    formatter: '{value}%'

                }
            }
        ]
    }
    myChart.setOption((option: echarts.EChartsOption) => {
        // 更新主题
        let tempOption: echarts.EChartsOption = {
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
                            borderColor: state.themeColor.get("--ant-primary-color"),
                            color: state.themeColor.get("--ant-primary-color")
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: [
                                [1, state.themeColor.get("--border-color-base") as string], // 0~10% 红轴
                            ],
                            width: 4
                        }
                    },
                    splitLine: {
                        show: false,
                        distance: 0,
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
                    data: Data,
                    title: {
                        // 不显示id
                        show: false,
                    },
                    detail: {
                        width: 20,
                        height: 14,
                        fontSize: 20,
                        color: state.themeColor.get("--ant-primary-color"),
                        // borderColor: 'inherit',
                        // borderRadius: 20,
                        // borderWidth: 1,
                        formatter: '{value}%'

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
