// 封装 myFetch

class MyFetch {
	// 底层的fetch
	private baseUrl: string
	// 超时时间
	private timeOut: number
	// 请求拦截器 集合
	private interceptorsReq: ((url: string, method: RequestInit) => { url: string, method: RequestInit, abort: boolean })[] = []
	// 响应拦截器 集合
	private interceptorsRes: (<T>(result: T) => { result: T, abort: boolean })[] = []
	// 超时处理函数
	private timeOutHandle: (() => void) | undefined

	// 构造函数
	constructor(baseUrl: string, timeOut: number = -1) {
		this.baseUrl = baseUrl
		this.timeOut = timeOut
	}

	// 添加请求拦截器
	addInterceptorsReq(fn: (url: string, method: RequestInit) => { url: string, method: RequestInit, abort: boolean }) {
		this.interceptorsReq.push(fn)
	}

	// 使用请求拦截器
	private useInterceptorsReq(url: string, method: RequestInit): { url: string, method: RequestInit, abort: boolean } {
		let _url = url
		let _method = method
		let _abort = false

		try {
			// 遍历拦截器 集合 使用拦截器
			this.interceptorsReq.forEach(fn => {
				let res = fn(_url, _method)
				_url = res.url
				_method = res.method

				// 判断是否被拦截
				if (res.abort) {
					// 被拦截
					_abort = res.abort
					throw "拦截"
				}
			})
		} catch (err) {
			// 出错
		}

		return { url: _url, method: _method, abort: _abort }
	}

	// 添加 响应拦截器
	addInterceptorsRes(fn: <T>(result: T) => { result: T, abort: boolean }) {
		this.interceptorsRes.push(fn)
	}

	// 使用响应拦截器
	private useInterceptorsRes<T>(result: T): { result: T, abort: boolean } {
		let abort: boolean = false
		try {
			this.interceptorsRes.forEach(fn => {
				let res = fn(result)
				result = res.result

				// 判断是否被拦截
				if (res.abort) {
					throw "被拦截了"
				}
			})
		} catch (err) {
			// 捕获到 拦截
			abort = true
		}

		return { result, abort }
	}

	// 添加 超时处理函数
	addTimeOutHandle(fn: () => void) {
		this.timeOutHandle = fn
	}

	// 发送请求
	async Require<T>(url: string, method: RequestInit): Promise<T | null> {
		// 拼接请求路径
		url = this.pathJoin(this.baseUrl, url)

		// 调用请求拦截器
		let { url: _url, method: _method, abort } = this.useInterceptorsReq(url, method)

		// 判断请求是否被拦截
		if (abort) {
			// 拦截
			return null
		}

		let ab: {
			c: AbortController | null;
			timer: number | null;
		} = {
			c: null,
			timer: null
		}

		// 判断是否写超时时间
		if (this.timeOut != -1) {
			ab = this.controllerTimeOut()

			// 挂载拦截控制器
			_method.signal = ab.c?.signal
		}

		// 没有被拦截，发送请求
		let result = await this.useFetch<T>(_url, _method, ab.timer)

		// 调用响应拦截器
		let res = this.useInterceptorsRes<T>(result)

		// 判断是否拦截， 拦截返回空
		if (res.abort) {
			return null
		}

		return res.result
	}

	// 使用fetch
	async useFetch<T>(url: string, method: RequestInit, timer: number | null): Promise<T> {
		let result = fetch(url, method).then((r: Response) => {
			// 请求完成 关闭定时器
			this.clearController(timer)

			return r
		}).then(r => r.json())
		return result as T
	}

	// 控制超时时间
	private controllerTimeOut(): { c: AbortController, timer: number } {
		// 超时时间的控制器
		let c = new AbortController()

		let timer = window.setTimeout(() => {
			// 超时
			c.abort()
			console.log("fetch请求关闭，原因：超时了");

			// 判断是否存在超时处理函数  存在调用
			if (this.timeOutHandle != undefined) {
				this.timeOutHandle()
			}

		}, this.timeOut);

		return {
			c,
			timer
		}
	}

	// 清空超时时间
	private clearController(timer: number | null) {
		if (timer != null) {
			clearTimeout(timer)
		}
	}

	// 路径拼接
	private pathJoin(...args: string[]): string {
		if (args.length == 0) {
			return ""
		}

		// 储存路径数组
		let pathArr: string[] = []

		// 遍历拼接的路径
		args.forEach(elem => {
			// 判断拼接的字符串中第一个字符是否存在 /
			if (elem[0] == "/") {
				// 删除第一个字符
				elem = elem.substring(1, elem.length)
			} else if (elem[elem.length - 1] == "/") {
				// 删除坠后一个字符
				elem = elem.substring(0, elem.length - 1)
			}

			pathArr.push(elem)
		})

		let path: string = pathArr.join("/")
		return path
	}
}

export default MyFetch