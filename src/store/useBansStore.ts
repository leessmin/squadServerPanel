import { defineStore } from "pinia";
import http from "../http/http";
import { apiType } from "../type/api/api";
import { BansType, BanserType } from "../type/api/bans";
import { computed, ref } from "vue";
import { BanerData } from "../type/ban/ban";
import addKey from "../util/worker/addKey?worker"
import MyWorker from "../util/worker/worker";
import getSteamName from "../util/store/getSteamName";
import dayjs from "dayjs";
import { dealQuery } from "../util/store/queryData";



// 封禁 玩家 仓库
export const useBansStore = defineStore("bans", () => {

	// 封禁玩家的列表
	const banserList = ref<BanerData[]>([])

	// 获取封禁的玩家
	async function getBans() {
		const result = await http().Require<apiType<BansType>>("/BA/bans/get", {})

		if (result?.code != 200) {
			return
		}

		if (result.data.bansPlayers == null) {
			banserList.value = []
			return
		}

		// 创建 添加 key的 worker 线程
		const ak = new addKey()

		// 执行对象
		const w = new MyWorker<BanerData[]>(ak, (e) => {
			// 将结果赋值
			banserList.value = e.data

			// 获取steam 名字
			getSteamName(banserList.value)
		})

		// 发送消息 给worker
		w.sendMsg(result.data.bansPlayers)

	}

	// 添加 或 编辑 封禁玩家
	async function addEditBans(bans: BanerData) {

		// 整理对象 ，发送给服务器
		const sendObj: BanserType = {
			steamId: bans.steamId,
			info: bans.info,
			bansTime: bans.bansTime == null ? '0' : `${bans.bansTime.unix()}`
		}

		const result = await http().Require<apiType<{ bansPlayer: BanserType }>>("/BA/bans/addEdit", {
			method: "POST",
			body: JSON.stringify(sendObj)
		})

		if (result?.code != 200) {
			getBans()
		}

	}

	// 删除 封禁玩家
	async function delBans(bansSteamIds: string[]) {
		let query = dealQuery("steamIds", bansSteamIds)

		const result = await http().Require<apiType<{}>>(`/BA/bans/del?${query}`, {
			method: "DELETE",
		})

		console.log(result);

	}

	// 封禁玩家 列表 将时间转换
	const banserListFormatTime = computed<BanerData[]>(() => {

		const result: BanerData[] = []

		banserList.value.forEach((v) => {
			let obj = JSON.parse(JSON.stringify(v)) as BanerData

			obj.bansTime = dayjs(Number(obj.bansTime) * 1000)


			result.push(obj)
		})

		return result
	})

	return {
		banserList,
		getBans,
		addEditBans,
		banserListFormatTime,
		delBans,
	}
})