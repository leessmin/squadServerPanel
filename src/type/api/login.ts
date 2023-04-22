// 获取验证码 服务器 返回的数据结构
export type captchaType = {
	// 验证码的id
	id: string,
	// 验证码图片
	image: string,
} | undefined