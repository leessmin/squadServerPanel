<template>
    <!-- 监控 -->
    <main>
        <SectionPanel class="head-box">
            <div class="title-box">
                <h3>监控</h3>
            </div>

            <div class="config-box">
                <div class="switch-box">
                    <a-form-item label="开启监控" style="margin: 0;">
                        <a-switch v-model:checked="isMonitor" checked-children="开" un-checked-children="关" />
                    </a-form-item>
                </div>
            </div>
        </SectionPanel>

        <SectionPanel>
            <div class="title-box">
                <h3>平均负载</h3>
            </div>
            <div class="chart-box">
                <BarBGCChart></BarBGCChart>
            </div>
        </SectionPanel>
    </main>
</template>

<script setup lang="ts">
import SectionPanel from '../../../components/Section/SectionPanel.vue';
import BarBGCChart from '../../../components/Chart/BarBGCChart.vue'
import { ref } from 'vue';

// 是否开启监控
const isMonitor = ref<boolean>(true)

</script>

<style scoped lang="less">
main {
    .head-box {

        .config-box{
            padding: 10px;
        }
    }

    .chart-box {
        width: 100%;
        height: 400px;
    }
}
</style>