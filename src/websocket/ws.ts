// 封装 websocket
export default class MyWS {
	// 存储websocket
	private ws: WebSocket
	// 接收到websocket的消息后回调函数
	private msgHandles: ((e: MessageEvent) => void)[] = []
	// 存储MyWS
	private static myWS: MyWS

	constructor(ws: WebSocket) {
		this.ws = ws

		// 监听消息
		ws.onmessage = this.messageListen()
	}

	// 添加接收消息回调
	addMsg(fn: (e: MessageEvent) => void) {
		this.msgHandles.push(fn)
	}

	// 监听消息
	private messageListen(): (e: MessageEvent) => void {

		return (e: MessageEvent) => {

			this.msgHandles.forEach(fn => {
				fn(e)
			});
		}

	}

	// 创建MyWS
	static createMyWS(url: string) {
		if (this.myWS == undefined) {
			let w = new WebSocket(url)
			this.myWS = new MyWS(w)
		}

		return this.myWS
	}
}