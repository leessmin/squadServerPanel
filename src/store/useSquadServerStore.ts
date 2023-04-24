import { defineStore } from "pinia";
import http from "../http/http";
import { apiType } from "../type/api/api";
import { squadServerType } from "../type/api/squadConfig";
import { ref } from "vue";
import { ServerConfigType } from "../type/gameServer/gameServer";
import { message } from "ant-design-vue";
import { SquadMapType } from "../type/api/squadMap";

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



	// 地图
	const squadMap = ref<SquadMapType>()

	// 获取 地图
	async function getSquadMap(mapType: string) {
		let result = await http().Require<apiType<SquadMapType>>(`/BA/map/get?mapType=${mapType}`, {})

		if (result?.code != 200) {
			return
		}

		squadMap.value = result.data
	}

	// 编辑地图类型
	async function saveSquadMap(mapType: string, mapList: string[]) {
		// 整理数据
		let obj = {
			mapType,
			mapList
		}

		let result = await http().Require<apiType<{ mapList: string[] }>>(`/BA/map/edit`, {
			method: "POST",
			body: JSON.stringify(obj)
		})

		if (result?.code != 200) {
			getSquadMap(mapType)
		}


		message.success("保存成功")
	}



	// 每日消息
	const dayMsg = ref<string>("")

	// 获取 每日消息
	async function getSquadDayMessage() {

		let result = await http().Require<apiType<{ dayMsg: string }>>(`/BA/dayMsg/get`, {})

		if (result?.code != 200) {
			return
		}

		// 随便赋值 防止dom结构不更新
		dayMsg.value = ""

		dayMsg.value = result.data.dayMsg
	}

	// 保存 每日消息
	async function saveSquadDayMessage(str: string) {
		let result = await http().Require<apiType<{ dayMsg: string }>>(`/BA/dayMsg/edit`, {
			method: "POST",
			body: str
		})

		message.success("保存成功")
		dayMsg.value = result?.data.dayMsg as string

	}



	// 循环公告
	const serverMsg = ref<string[]>([])

	// 获取循环公告
	async function getSquadMsg() {
		let result = await http().Require<apiType<{ serverMsg: string[] }>>(`/BA/serverMsg/get`, {})

		if (result?.code != 200) {
			return
		}

		serverMsg.value = result.data.serverMsg
	}

	// 保存 循环公告
	async function saveSquadMsg(MsgArr: string[]) {
		let result = await http().Require<apiType<{ serverMsg: string[] }>>(`/BA/serverMsg/edit`, {
			method: "POST",
			body: JSON.stringify({
				serverMsg: MsgArr
			})
		})

		if (result?.code != 200) {
			getSquadMsg()
		}

		message.success("保存成功")
		serverMsg.value = result?.data.serverMsg as string[]

	}



	// 许可证
	const License = ref<string>("")

	// 获取许可证
	async function getLicense() {

		let result = await http().Require<apiType<{ license: string }>>(`/BA/license/get`, {})

		if (result?.code != 200) {
			return
		}


		// 随便赋值 防止dom结构不更新
		License.value = ""

		License.value = result.data.license
	}

	// 保存 许可证
	async function saveLicense(str: string) {
		let result = await http().Require<apiType<{ license: string }>>(`/BA/license/edit`, {
			method: "POST",
			body: str
		})

		message.success("保存成功")
		License.value = result?.data.license as string

	}

	return {
		squadConfig,
		getSquadConfig,
		saveSquadConfig,
		getSquadMap,
		squadMap,
		saveSquadMap,
		getSquadDayMessage,
		dayMsg,
		saveSquadDayMessage,
		getSquadMsg,
		serverMsg,
		saveSquadMsg,
		License,
		getLicense,
		saveLicense,
	}
})