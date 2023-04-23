import { defineStore } from "pinia";
import http from "../http/http";
import { apiType } from "../type/api/api";
import { adminGroupType, groupType } from "../type/api/admin";
import worker from "../util/worker/worker?worker"
import { ref } from "vue";
import { AdminGroupData } from "../type/adminGroup/adminGroup";
import { functions } from "lodash-es";

// 管理组  管理员 的仓库
export const useAdminStore = defineStore("admin", () => {

	// 管理组列表
	const adminGroup = ref<AdminGroupData[]>()


	// 获取 管理组
	async function getAdminGroup() {
		const result = await http().Require<apiType<adminGroupType>>("/BA/adminGroup/get", {})

		if (result?.code != 200) {
			return
		}

		// 创建worker 线程
		const w = new worker()

		// 发送要处理的结果
		w.postMessage(result.data.adminGroup)

		// 得到结果
		w.onmessage = function (e) {
			// 将结果赋值
			adminGroup.value = e.data
		}
	}

	// 添加 或 编辑 管理组
	async function addEditAdminGroup(admin: AdminGroupData) {
		const result = await http().Require<apiType<groupType>>("BA/adminGroup/addEdit", {
			method: "POST",
			body: JSON.stringify(admin),
		})

		console.log(result);
		if (result?.code != 200) {
			// 添加失败，刷新数据
			getAdminGroup()
			return
		}
	}

	return {
		adminGroup,
		getAdminGroup,
		addEditAdminGroup
	}
})