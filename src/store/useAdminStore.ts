import { defineStore } from "pinia";
import http from "../http/http";
import { apiType } from "../type/api/api";
import { adminGroupType, groupType } from "../type/api/admin";
import addKey from "../util/worker/addKey?worker"
import { ref } from "vue";
import { AdminGroupData } from "../type/adminGroup/adminGroup";
import MyWorker from "../util/worker/worker";

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

		// 创建 添加 key的 worker 线程
		const ak = new addKey()

		// 执行对象
		const w = new MyWorker<AdminGroupData[]>(ak, (e) => {
			// 将结果赋值
			adminGroup.value = e.data
		})

		// 发送消息 给worker
		w.sendMsg(result.data.adminGroup)
	}

	// 添加 或 编辑 管理组
	async function addEditAdminGroup(admin: AdminGroupData) {
		const result = await http().Require<apiType<groupType>>("BA/adminGroup/addEdit", {
			method: "POST",
			body: JSON.stringify(admin),
		})

		if (result?.code != 200) {
			// 添加失败，刷新数据
			getAdminGroup()
			return
		}
	}

	// 删除 管理组
	async function delAdminGroup(groupName: string) {

		const result = await http().Require<apiType<{}>>(`BA/adminGroup/del?groupName=${groupName}`, {
			method: "DELETE",
		})

		if (result?.code != 200) {
			// 删除失败，刷新数据
			getAdminGroup()
			return
		}

	}

	return {
		adminGroup,
		getAdminGroup,
		addEditAdminGroup,
		delAdminGroup
	}
})