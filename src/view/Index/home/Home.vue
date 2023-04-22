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
						<StatusChart :chartValue="statusValue.system" charName="system"></StatusChart>
						<p>{{ statusInfo.system }}</p>
					</div>
				</li>
				<li>
					<div class="content">
						<p>CPU使用率</p>
						<StatusChart :chartValue="statusValue.cpu" charName="cpu"></StatusChart>
						<p>{{ statusInfo.cpu }}</p>
					</div>
				</li>
				<li>
					<div class="content">
						<p>内存使用率</p>
						<StatusChart :chartValue="statusValue.memory" charName="memory"></StatusChart>
						<p>{{ statusInfo.memory }}</p>
					</div>
				</li>
				<li>
					<div class="content">
						<p>swap使用率</p>
						<StatusChart :chartValue="statusValue.swap" charName="swap"></StatusChart>
						<p>{{ statusInfo.swap }}</p>
					</div>
				</li>
				<li>
					<div class="content">
						<p>硬盘使用率</p>
						<StatusChart :chartValue="statusValue.disk" charName="disk"></StatusChart>
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
							<span>{{ flowMonitorInfo.uploadSeed }}Mbps</span>
						</div>
					</li>
					<li>
						<div class="top">
							<div class="dot" style="background-color: #5caeff;"></div>
							<span>下行</span>
						</div>
						<div class="bottom">
							<span>{{ flowMonitorInfo.downloadSpeed }}Mbps</span>
						</div>
					</li>
					<li>
						<div class="top">
							<span>总发送</span>
						</div>
						<div class="bottom">
							<span>{{ flowMonitorInfo.totalUpload }}GB</span>
						</div>
					</li>
					<li>
						<div class="top">
							<span>总接收</span>
						</div>
						<div class="bottom">
							<span>{{ flowMonitorInfo.totalDownload }}GB</span>
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
import { useMonitorStore } from '../../../store/useMonitorStore';



// 系统运行状态 类型
type SystemInfoType = "运行流畅" | "运行良好" | "运行拥堵"

// 系统运行状态
const systemInfo: SystemInfoType[] = ["运行流畅", "运行良好", "运行拥堵"]


// 系统状态的数据
let statusValue = reactive({
	system: 0,
	cpu: 0,
	memory: 0,
	swap: 0,
	disk: 0,
})

// 系统状态的详情数据
let statusInfo = reactive({
	system: "qwq",
	cpu: "qwq",
	memory: "qwq",
	swap: "qwq",
	disk: "qwq",
})


// 流量监控

// 流量监控的数据
let flowMonitorInfo = reactive({
	uploadSeed: 0,
	downloadSpeed: 0,
	totalUpload: 0,
	totalDownload: 0,
	thenTime: dayjs().format('HH:mm:ss'),
})

// // TODO: 模拟流量数据改变
// setInterval(() => {
//     flowMonitorInfo.uploadSeed = Number((Math.random() * 100).toFixed(2))
//     flowMonitorInfo.downloadSpeed = Number((Math.random() * 100).toFixed(2))
//     flowMonitorInfo.thenTime = dayjs().format('HH:mm:ss')
// }, 2000)




// 实例化 仓库
const monitorStore = useMonitorStore()
// 启动ws
monitorStore.getMonitor()

// 监听仓库
monitorStore.$subscribe((mutation, state) => {
	const s = state.systemInfo

	// 更新状态数据
	statusValue.system = s?.load as number
	statusValue.cpu = s?.cpu.used as number
	statusValue.memory = s?.memory.used_percent as number
	statusValue.swap = s?.swap.used_percent as number
	statusValue.disk = s?.disk.used_percent as number

	// 更新详情数据
	statusInfo.system = systemInfo[Math.floor(statusValue.system / 30) > 3 ? 2 : Math.floor(statusValue.system / 30)]
	statusInfo.cpu = `${s?.cpu.core}核/${s?.cpu.core_logic}线程`
	statusInfo.memory = `${s?.memory.used}/${s?.memory.total}(MB)`
	statusInfo.swap = `${s?.swap.used}/${s?.swap.total}(MB)`
	statusInfo.disk = `${s?.disk.used}/${s?.disk.total}(GB)`

	// 更新流量数据
	flowMonitorInfo.downloadSpeed = s?.net.now_recv as number
	flowMonitorInfo.uploadSeed = s?.net.now_sent as number
	flowMonitorInfo.totalUpload = s?.net.bytes_sent as number
	flowMonitorInfo.totalDownload = s?.net.bytes_recv as number
	flowMonitorInfo.thenTime = s?.time as string
})

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