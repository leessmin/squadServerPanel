import { defineStore } from "pinia";
import http from "../http/http";
import { captchaType } from "../type/api/login";
import { apiType } from "../type/api/api";
import { Ref, ref } from "vue";

// 登录相关的仓库
export const useLoginStore = defineStore("login", () => {
	// 储存验证码
	const captcha: Ref<captchaType> = ref()

	// 获取 验证码
	async function getCaptcha() {
		// 发送请求 获取验证码
		const result = await http().Require<apiType<captchaType>>("/auth/captcha", {})

		// 请求发送失败
		if (result?.code != 200) {
			return
		}

		// 储存成功的结果
		captcha.value = result.data
	}

	return {
		captcha,
		getCaptcha,
	}
})