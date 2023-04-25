import { defineStore } from "pinia";
import http from "../http/http";
import { apiType } from "../type/api/api";
import { settingConfigType, settingType } from "../type/api/setting";
import { ref } from "vue";
import { message } from "ant-design-vue";
import { dealFormData } from "../util/store/formData";

// 面板的设置
export const useSettingStore = defineStore("setting", () => {

	// 面板的设置
	const cfgSetting = ref<settingConfigType>()

	// 获取面板设置
	async function getSetting() {
		const result = await http().Require<apiType<settingType>>("/BA/panel/get", {})

		if (result?.code != 200) {
			return
		}

		cfgSetting.value = result?.data.config
	}

	// 保存面板配置
	async function saveSetting<T>(key: string, value: T) {
		const obj = {
			[key]: value
		}

		const result = await http().Require<apiType<settingType>>("/BA/panel/update", {
			method: "POST",
			body: JSON.stringify(obj)
		})


		if (result?.code != 200) {
			getSetting()
			return
		}

		message.success("保存成功")
	}

	// 修改账号或密码
	async function editAdmin(username: string, password: string, newUsername: string, newPassword: string) {
		const formData = dealFormData({
			username,
			password,
			newUsername,
			newPassword
		})

		const result = await http().Require<apiType<settingType>>("/auth/updateAuth", {
			method: "POST",
			body: formData
		})

		if (result?.code != 200) {
			return
		}

		// 清空localStorage
		localStorage.clear()

		// 修改密码成功 刷新页面  重新登录，因为token失效了
		location.reload()
	}

	return {
		cfgSetting,
		getSetting,
		saveSetting,
		editAdmin
	}
})