<template>
    <!-- 监控 -->
    <main>
        <SectionPanel class="head-section mt-zero">
            <div class="title-box">
                <h3>监控</h3>
            </div>

            <div class="config-box">
                <div class="information-box">
                    <p>监控模式，只记录当天状态的平均值</p>
                </div>
                <div class="switch-box">
                    <a-form-item label="开启监控" style="margin: 0;">
                        <a-switch v-model:checked="isMonitor" checked-children="开" un-checked-children="关" />
                    </a-form-item>
                </div>
            </div>
        </SectionPanel>

        <SectionPanel class="system-section">
            <div class="title-box">
                <h3>平均负载</h3>
            </div>
            <div class="chart-box">
                <BarBGCChart :chart-data="SystemInfoData"></BarBGCChart>
            </div>
        </SectionPanel>

        <SectionPanel class="traffic-section">
            <div class="title-box">
                <h3>流量</h3>
            </div>
            <div class="chart-box">
                <BarBGCChart :chart-data="TrafficData"></BarBGCChart>
            </div>
        </SectionPanel>

        <SectionPanel class="cpu_memory-section">
            <div class="left content-box">
                <div class="title-box">
                    <h3>cpu</h3>
                </div>
                <div class="chart-box">
                    <BarBGCChart :chart-data="CpuData"></BarBGCChart>
                </div>
            </div>
            <div class="right content-box">
                <div class="title-box">
                    <h3>内存</h3>
                </div>
                <div class="chart-box">
                    <BarBGCChart :chart-data="MemoryData"></BarBGCChart>
                </div>
            </div>
        </SectionPanel>
    </main>
</template>

<script setup lang="ts">
import SectionPanel from '../../../components/Section/SectionPanel.vue';
import BarBGCChart from '../../../components/Chart/BarBGCChart.vue'
import { ref } from 'vue';
import { MonitorBarType } from '../../../type/monitor/monitor';

// 是否开启监控
const isMonitor = ref<boolean>(true)


// 系统平均负载
const SystemInfoData = ref<MonitorBarType>({
    // 时间
    date: ['03/01', '03/02', '03/03', '03/04', '03/05', '03/06', '03/07', '03/08', '03/10', '03/11', '03/12', '03/13', '03/14', '03/15', '03/16', '03/17', '03/18', '03/19', '03/20', '03/21', '03/22', '03/23', '03/24', '03/25', '03/26', '03/27', '03/28', '03/29', '03/30'],
    // 运行时的数据
    data: [10, 88, 66, 70, 70, 40, 55, 10, 88, 66, 70, 70, 40, 55, 10, 88, 66, 70, 70, 40, 55, 10, 88, 66, 70, 70, 40, 55, 55]
})

// 流量
const TrafficData = ref<MonitorBarType>({
    // 时间
    date: ['03/01', '03/02', '03/03', '03/04', '03/05', '03/06', '03/07', '03/08', '03/10', '03/11', '03/12', '03/13', '03/14', '03/15', '03/16', '03/17', '03/18', '03/19', '03/20', '03/21', '03/22', '03/23', '03/24', '03/25', '03/26', '03/27', '03/28', '03/29', '03/30'],
    // 运行时的数据
    data: [100, 88, 66, 70, 70, 40, 55, 10, 88, 66, 70, 70, 40, 55, 10, 188, 66, 70, 70, 40, 55, 10, 88, 66, 70, 70, 40, 55, 55]
})

// cpu平均负载
const CpuData = ref<MonitorBarType>({
    // 时间
    date: ['03/01', '03/02', '03/03', '03/04', '03/05', '03/06', '03/07', '03/08', '03/10', '03/11', '03/12', '03/13', '03/14', '03/15', '03/16', '03/17', '03/18', '03/19', '03/20', '03/21', '03/22', '03/23', '03/24', '03/25', '03/26', '03/27', '03/28', '03/29', '03/30'],
    // 运行时的数据
    data: [10, 88, 66, 70, 70, 40, 55, 10, 88, 66, 70, 70, 40, 55, 10, 88, 66, 70, 70, 40, 55, 10, 88, 66, 70, 70, 40, 55, 55]
})

// 内存平均负载
const MemoryData = ref<MonitorBarType>({
    // 时间
    date: ['03/01', '03/02', '03/03', '03/04', '03/05', '03/06', '03/07', '03/08', '03/10', '03/11', '03/12', '03/13', '03/14', '03/15', '03/16', '03/17', '03/18', '03/19', '03/20', '03/21', '03/22', '03/23', '03/24', '03/25', '03/26', '03/27', '03/28', '03/29', '03/30'],
    // 运行时的数据
    data: [10, 88, 66, 70, 70, 40, 55, 10, 88, 66, 70, 70, 40, 55, 10, 88, 66, 70, 70, 40, 55, 10, 88, 66, 70, 70, 40, 55, 55]
})
</script>

<style scoped lang="less">
main {
    .head-section {

        .config-box {
            padding: 10px;

            .information-box {
                p {
                    color: var(--text-color-secondary);
                }
            }
        }
    }

    .chart-box {
        width: 100%;
        height: 400px;
    }

    .cpu_memory-section {
        display: flex;
        justify-content: center;
        align-items: center;

        .content-box {
            width: 50%;

            h3 {
                margin: 0;
            }

            .chart-box {
                width: 90%;
                height: 300px;
            }
        }
    }
}
</style>