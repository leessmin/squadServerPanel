<template>
    <main>
        <!-- 面板信息 -->
        <SectionPanel class="panel-info mt-zero">
            <div class="left">
                <div class="img-box">
                    <img src="/squad_logo.png" alt="">
                </div>
            </div>
            <div class="center">
                <h1>Squad服务器管理面板</h1>
            </div>
            <div class="right">
                <a-badge dot :offset="[-12, 10]">
                    <a-button type="link">更新</a-button>
                </a-badge>
                <a-button type="link">修复</a-button>
                <a-button type="link">重启</a-button>
                <a-button type="link">关于</a-button>
            </div>
        </SectionPanel>

        <!-- 系统运行状态 -->
        <SectionPanel class="system-info">
            <div class="title-box">
                <h3>状态</h3>
            </div>
            <ul>
                <li>
                    <div class="content">
                        <p>负载状态</p>
                        <StatusChart :chartValue="statusValue.system"></StatusChart>
                        <p>{{ statusInfo.system }}</p>
                    </div>
                </li>
                <li>
                    <div class="content">
                        <p>CPU使用率</p>
                        <StatusChart :chartValue="statusValue.cpu"></StatusChart>
                        <p>{{ statusInfo.cpu }}</p>
                    </div>
                </li>
                <li>
                    <div class="content">
                        <p>内存使用率</p>
                        <StatusChart :chartValue="statusValue.memory"></StatusChart>
                        <p>{{ statusInfo.memory }}</p>
                    </div>
                </li>
                <li>
                    <div class="content">
                        <p>swap使用率</p>
                        <StatusChart :chartValue="statusValue.swap"></StatusChart>
                        <p>{{ statusInfo.swap }}</p>
                    </div>
                </li>
                <li>
                    <div class="content">
                        <p>硬盘使用率</p>
                        <StatusChart :chartValue="statusValue.disk"></StatusChart>
                        <p>{{ statusInfo.disk }}</p>
                    </div>
                </li>
            </ul>
        </SectionPanel>

        <!-- 流量监控 -->
        <SectionPanel class="flow-monitor">
            <div class="title-box">
                <h3>流量</h3>
            </div>
            <div class="introduce">
                <ul>
                    <li>
                        <div class="top">
                            <div class="dot" style="background-color: #f7b54a;"></div>
                            <span>上行</span>
                        </div>
                        <div class="bottom">
                            <span>{{ flowMonitorInfo.uploadSeed }}kb</span>
                        </div>
                    </li>
                    <li>
                        <div class="top">
                            <div class="dot" style="background-color: #5caeff;"></div>
                            <span>下行</span>
                        </div>
                        <div class="bottom">
                            <span>{{ flowMonitorInfo.downloadSpeed }}kb</span>
                        </div>
                    </li>
                    <li>
                        <div class="top">
                            <span>总发送</span>
                        </div>
                        <div class="bottom">
                            <span>1.6kb</span>
                        </div>
                    </li>
                    <li>
                        <div class="top">
                            <span>总接收</span>
                        </div>
                        <div class="bottom">
                            <span>1.6kb</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="chart-box">
                <StackedAreaChart :thenTime="flowMonitorInfo.thenTime" :downloadSpeed="flowMonitorInfo.downloadSpeed"
                    :uploadSpeed="flowMonitorInfo.uploadSeed"></StackedAreaChart>
            </div>
        </SectionPanel>
    </main>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { reactive } from 'vue';
import StatusChart from '../../../components/Chart/StatusChart.vue';
import StackedAreaChart from '../../../components/Chart/StackedAreaChart.vue';
import SectionPanel from '../../../components/Section/SectionPanel.vue'


// 系统运行状态 类型
type SystemInfoType = "运行流畅" | "运行良好" | "运行拥堵"

// 系统运行状态
const systemInfo: SystemInfoType[] = ["运行流畅", "运行良好", "运行拥堵"]


// 系统状态的数据
let statusValue = reactive({
    system: 20,
    cpu: 20,
    memory: 30,
    swap: 60,
    disk: 55,
})

// 系统状态的详情数据
let statusInfo = reactive({
    system: systemInfo[0],
    cpu: "8核心",
    memory: "489/1980(MB)",
    swap: "489/1980(MB)",
    disk: "12G/40G",
})

// TODO: 模拟数据改变
setInterval(() => {
    statusValue.cpu = Number(Math.floor((Math.random() * 100)).toFixed(2))

    // console.log(statusValue.cpu)
}, 2000)


// 流量监控

// 流量监控的数据
let flowMonitorInfo = reactive({
    uploadSeed: 0,
    downloadSpeed: 0,
    thenTime: dayjs().format('HH:mm:ss'),
})

// TODO: 模拟流量数据改变
setInterval(() => {
    flowMonitorInfo.uploadSeed = Number((Math.random() * 100).toFixed(2))
    flowMonitorInfo.downloadSpeed = Number((Math.random() * 100).toFixed(2))
    flowMonitorInfo.thenTime = dayjs().format('HH:mm:ss')
}, 2000)

</script>

<style scoped lang="less">
main {
    p {
        margin: 0;
    }

    h3 {
        margin: 0;
    }

    .title-box {
        height: 40px;
        padding-left: 10px;
        border-bottom: 1px solid var(--border-color-base);
        line-height: 40px;
        padding-bottom: 10px;
        box-sizing: content-box;

        h3 {
            font-weight: bold;
        }
    }


    // 面板信息
    .panel-info {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
            .img-box {
                height: 40px;

                img {
                    height: 100%;
                }
            }
        }

        .center {
            h1 {
                font-weight: bold;
                margin: 0;
                font-size: 1.5rem;
            }
        }
    }

    // 系统运行状态信息
    .system-info {

        ul {
            display: flex;
            justify-content: space-evenly;
            flex-wrap: wrap;
            padding: 0;
            margin: 0;

            li {
                padding: 30px 0;
                width: 140px;

                .content {
                    width: 100%;
                    text-align: center;

                    .chart {
                        width: 140px;
                        height: 140px;
                    }
                }
            }
        }
    }

    // 流量监控
    .flow-monitor {

        .introduce {
            margin: 30px 0;

            ul {
                display: flex;
                justify-content: space-evenly;

                li {
                    width: 200px;
                    text-align: center;

                    .top {

                        .dot {
                            width: 10px;
                            height: 10px;
                            border-radius: 50%;
                            display: inline-block;
                            margin-right: 4px;
                        }
                    }
                }
            }
        }

        .chart-box {
            width: 100%;
            height: 240px;
        }
    }
}
</style>