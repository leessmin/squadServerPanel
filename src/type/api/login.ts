// 获取验证码 服务器 返回的数据结构
export type captchaType = {
	// 验证码的id
	id: string,
	// 验证码图片
	image: string,
} | undefined

// 登录
export type loginType = {
	// 是否为第一次登录
	first: boolean,
	// token
	token: string
}

// 验证token
export type verifyType = {
	token: string
}