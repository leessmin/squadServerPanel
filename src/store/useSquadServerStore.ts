import { defineStore } from "pinia";
import http from "../http/http";
import { apiType } from "../type/api/api";
import { squadServerType } from "../type/api/squadConfig";
import { ref } from "vue";
import { ServerConfigType } from "../type/gameServer/gameServer";
import { message } from "ant-design-vue";

// squad 服务器设置相关
export const useSquadServerStore = defineStore("squadServer", () => {

	// squad 常规 配置
	const squadConfig = ref<ServerConfigType>()

	// 获取 squad 配置
	async function getSquadConfig() {
		let result = await http().Require<apiType<squadServerType>>("/BA/squadServer/get", {})

		if (result?.code != 200) {
			return
		}


		squadConfig.value = result.data.serverConfig

	}

	// 保存 squad 配置
	async function saveSquadConfig(config: ServerConfigType) {
		let result = await http().Require<apiType<{ config: ServerConfigType }>>("/BA/squadServer/edit", {
			method: "POST",
			body: JSON.stringify(config)
		})

		if (result?.code != 200) {
			return
		}

		message.success("保存成功")
		squadConfig.value = result.data.config

	}

	return {
		squadConfig,
		getSquadConfig,
		saveSquadConfig,
	}
})