// 服务器返回的 基础 数据结构
export type apiType<T> = {
	// 状态码
	code: number,
	// 消息
	msg: string,
	// 数据
	data: T
}