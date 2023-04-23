//  worker 往对象 添加key


// 监听消息
self.onmessage = function (e) {
	// 运行函数 将处理的好的结果返回

	let result = e.data

	let i = 0
	result.forEach((e: any) => {
		e.key = `${i}`

		i++
	});

	// 将处理好的信息返回
	self.postMessage(result)
}