import { defineStore } from "pinia";
import http from "../http/http";
import { ref } from "vue";
import { TableDataType, logType, loggerType } from "../type/api/logger";
import { apiType } from "../type/api/api";
import addKey from "../util/worker/addKey?worker"
import MyWorker from "../util/worker/worker";

// 日志仓库
export const useLoggerStore = defineStore("logger", () => {

	const logData = ref<TableDataType[]>()

	// 获取日志
	async function getLogger() {
		let result = await http().Require<apiType<loggerType>>("/BA/log/get", {})

		if (result?.code != 200) {
			return
		}

		// 创建 添加 key的 worker 线程
		const ak = new addKey()

		// 执行对象
		const w = new MyWorker<TableDataType[]>(ak, (e) => {
			// 将结果赋值
			logData.value= e.data
		})

		// 发送消息 给worker
		w.sendMsg(result.data.log)

	}


	return {
		logData,
		getLogger
	}
})