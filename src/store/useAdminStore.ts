import { defineStore } from "pinia";
import http from "../http/http";
import { apiType } from "../type/api/api";
import { adminGroupType, adminUserType, groupType, userType } from "../type/api/admin";
import addKey from "../util/worker/addKey?worker"
import { computed, ref } from "vue";
import { AdminGroupData } from "../type/adminGroup/adminGroup";
import MyWorker from "../util/worker/worker";
import { AdminUserData, selectType } from "../type/adminUser/adminUser";
import { dealQuery } from "../util/store/queryData";
import getSteamName from "../util/store/getSteamName";



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

		if (result.data.adminGroup == null) {
			adminGroup.value = []
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



	// 管理员列表
	const adminUser = ref<AdminUserData[]>([])

	// 监听 管理组列表 过滤 得到管理组的名字
	const groupNameList = computed((): selectType[] => {

		let result: selectType[] = []

		adminGroup.value?.forEach(v => {
			result.push({
				value: v.groupName,
				label: v.groupName,
			})
		})


		return result
	})


	// 获取 管理员
	async function getAdminUser() {
		// 获取管理组
		getAdminGroup()

		const result = await http().Require<apiType<adminUserType>>("/BA/adminUser/get", {})

		if (result?.code != 200) {
			return
		}

		// 判断是否为空   如果为空赋值空数组
		if (result.data.adminUser == null) {
			adminUser.value = []
			return
		}

		// 创建 添加 key的 worker 线程
		const ak = new addKey()

		// 执行 worker
		const w = new MyWorker<AdminUserData[]>(ak, (e) => {
			// 将结果赋值
			adminUser.value = e.data

			// 获取steam 名字
			getSteamName(adminUser.value)
		})

		// 发送消息 给worker
		w.sendMsg(result.data.adminUser)
	}

	// 添加 或 编辑 管理员
	async function addEditAdminUser(user: AdminUserData) {
		await http().Require<apiType<userType>>("/BA/adminUser/addEdit", {
			method: "POST",
			body: JSON.stringify(user)
		})

		// 刷新数据
		getAdminUser()

	}

	// 删除管理员
	async function delAdminUser(user: string[]) {
		let query = dealQuery("steamIds", user)

		const result = await http().Require<apiType<{}>>(`/BA/adminUser/del?${query}`, {
			method: "DELETE",
		})

		if (result?.code != 200) {
			getAdminUser()
		}
	}



	return {
		adminGroup,
		getAdminGroup,
		addEditAdminGroup,
		delAdminGroup,
		adminUser,
		groupNameList,
		getAdminUser,
		addEditAdminUser,
		delAdminUser,
	}
})