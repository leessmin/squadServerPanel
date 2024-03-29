import { defineStore } from "pinia";
import http from "../http/http";
import { captchaType, loginType, verifyType } from "../type/api/login";
import { apiType } from "../type/api/api";
import { Ref, ref } from "vue";
import router from "../router";
import { message } from "ant-design-vue";
import { dealFormData } from "../util/store/formData";

// 登录相关的仓库
export const useLoginStore = defineStore("login", () => {
	// 储存验证码
	const captcha: Ref<captchaType> = ref()
	// 储存token
	const token = ref("")

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

	// 登录
	// 返回number    -1 登录失败   0初次登录   1登录成功
	async function Login(username: string, password: string, captcha_id: string, captcha_code: string): Promise<number> {
		// 整合form-data数据
		const formData = dealFormData({
			username,
			password,
			captcha_id,
			captcha_code
		})

		// 登录
		const result = await http().Require<apiType<loginType>>("/auth/login", {
			method: "Post",
			body: formData
		})

		// 判断是否登录成功
		if (result?.code != 200) {
			return -1
		}

		// 储存token
		token.value = (result?.data.token as string)
		localStorage.setItem("token", token.value)

		return result.data.first ? 0 : 1
	}

	// 初始化 设置
	async function initServer(username: string, password: string, game_serve_path: string) {
		// 整合form-data数据
		const formData = dealFormData({
			username,
			password,
			game_serve_path
		})


		// 初始化设置
		const result = await http().Require<apiType<any>>("/BA/first/init", {
			method: "POST",
			body: formData
		})

		if (result?.code != 200) {
			return
		}

		console.log(result);
		// 初始化成功
		// 清空 localStorage 所有信息
		localStorage.clear()
		token.value = ""

		message.success("初始化设置成功，请重新登录哦")

		// 跳转登录页面 重新登录
		router.push({
			name: "login"
		})
	}

	// 验证token是否有效
	async function verifyToken() {
		// 获取token
		let token = localStorage.getItem("token")

		const result = await http().Require<apiType<verifyType>>("/auth/verify", {
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})

		// 判断token是否有效
		if (result?.code != 200) {
			// token 无效了
			// 清除localStorage，刷新页面
			localStorage.clear()
			location.reload()
		}

	}

	return {
		captcha,
		getCaptcha,
		Login,
		initServer,
		verifyToken
	}
})