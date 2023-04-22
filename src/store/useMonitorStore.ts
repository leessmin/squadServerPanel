import { defineStore } from "pinia";
import { wsUrl } from "../http/config";
import monitor from '../websocket/monitor?worker'
import { dealSystemInfoType } from "../type/api/monitor";
import { ref } from "vue";


// 创建 websocket
const ws = new monitor()

// 获取系统 监控的信息
export const useMonitorStore = defineStore("monitor", () => {

	// 存储系统信息
	const systemInfo = ref<dealSystemInfoType>()

	// 获取监控信息
	function getMonitor() {
		const token = localStorage.getItem("token")

		// 发送 ws url 监听ws
		ws.postMessage(`${wsUrl}/system/info?token=${token}`)

		// 监听 系统信息
		ws.onmessage = function (e) {

			systemInfo.value = e.data as dealSystemInfoType
		}

	}

	return {
		systemInfo,
		getMonitor
	}
})