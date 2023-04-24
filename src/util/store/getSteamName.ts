import http from "../../http/http"
import { AdminUserData } from "../../type/adminUser/adminUser"
import { apiType } from "../../type/api/api"
import { BanerData } from "../../type/ban/ban"


// 获取steam name
export default function getSteamName<T extends AdminUserData[] | BanerData[]>(obj: T) {

	// 遍历 管理员组 获取 steamId
	obj.forEach(async (v) => {
		// 通过steamId发送请求 获取steamName
		const result = await http().Require<apiType<any>>(`/proxy/steam/GetPlayerSummaries?key=1155051B4536156145C47935A24134EB&steamIds=${v.steamId}`, {})

		// 判断是否存在用户 ，如果没有则退出这次循环
		if (result?.data.players.response.players.length == 0) {
			v.steamName = ""
			return
		}

		// 将获取到的用户名存储
		const player = result?.data.players.response.players[0]
		v.steamName = player.personaname
	})
}