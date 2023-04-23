// web worker 封装

export default class MyWorker<T> {
	private worker: Worker

	constructor(w: Worker, fn: (e: MessageEvent<T>) => void) {
		this.worker = w

		// 监听 work发送的信息
		this.worker.onmessage = (e: MessageEvent<T>) => {

			fn(e)

			// 得到消息，销毁worker
			this.destroy()
		}
	}

	// 发送消息给worker
	sendMsg(msg: any) {
		this.worker.postMessage(msg)
	}

	// 销毁 worker
	private destroy() {
		this.worker.terminate()
	}


}