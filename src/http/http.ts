import { message } from "ant-design-vue";
import { apiType } from "../type/api/api";
import MyFetch from "./myFetch";

// 使用MyFetch
let myFetch: MyFetch | undefined

// 底层url
let baseUrl = "http://127.0.0.1:8080/api"

function http(): MyFetch {
	if (myFetch == undefined) {
		myFetch = new MyFetch(baseUrl, 8000)

		// 添加超时处理函数
		myFetch.addTimeOutHandle(timeOutHandle)

		// 添加请求拦截器
		myFetch.addInterceptorsReq(reqHandle)

		// 添加响应拦截器
		myFetch.addInterceptorsRes(resHandle)
	}

	return myFetch
}

// 超时处理函数
function timeOutHandle() {
	message.warning("你的网速有点小慢啊，请刷新页面后重试")
}

// 请求拦截器
function reqHandle(url: string, method: RequestInit): { url: string, method: RequestInit, abort: boolean } {

	// 判断是否为需要鉴权的API
	if (url.includes("BA")) {
		let token = localStorage.getItem("token")

		// 判断是否存在token
		if (token != null) {
			method.headers = {
				...method.headers,
				"Authorization": `Bearer ${token}`
			}
		}
	}

	// 返回处理好的数据
	return { url, method, abort: false }
}

// 响应拦截器
function resHandle<T>(result: T): { result: T, abort: boolean } {
	let r = result as apiType<any>
	// 判断请求是否发送成功
	if (r.code != 200) {
		// 请求失败，提示失败信息
		message.error(r.msg)
	}

	// 返回数据  并且不拦截
	return { result, abort: false }
}

export default http